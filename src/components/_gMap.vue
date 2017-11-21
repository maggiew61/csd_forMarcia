<template>
  <div class="mapWarp">
    <div :id="mapName" class="mapBox"></div>
    <div v-if="tooltipHtml" v-html="tooltipHtml" :style="{ 'top': tooltipPosition.y +'px', 'left': tooltipPosition.x  +'px'}" class="gmaptooltip"></div>
  </div>
</template>


<script>

import * as d3 from 'd3';
import loadingAni from './LoadingAni';
import countries from '../js/store/countries.json';
import mapStyle from '../js/googleMapStyle.json';

let map = null;

export default {
  // name: 'gMap',
  created() {
  },
  data() {
    return {
      countries,
      mapName: this.name + '-map',
      geoJsonData: null,
      tooltipHtml: '',
      tooltipPosition: { x: 0, y: 0 },
    };
  },
  props: {
    name: {
      type: String,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  components: {
    loadingAni,
  },
  mounted() {
    this.initMap();
  },
  watch: {
    data() {
      this.mapData();
    },
  },
  methods: {
    initMap() {
      // 初始化地圖
      const element = document.getElementById(this.mapName);
      const options = {
        zoom: 3,
        center: new google.maps.LatLng(32, 90),
        styles: mapStyle,
      };
      map = new google.maps.Map(element, options);
    },
    mapData() {
      // 轉換成 DataLayer 需要的格式
      const countrykey = Object.keys(this.data);
      const features = [];
      for (let i = 0; i < countrykey.length; i += 1) {
        const geo = this.countries.find(d => d.name === countrykey[i]);
        const properties = {
          name: countrykey[i],
          country: geo.country || null,
          value: this.data[countrykey[i]],
        };
        const geometry = {
          type: 'Point',
          coordinates: [geo.longitude, geo.latitude],
        };
        const obj = {
          type: 'Feature',
          properties,
          geometry,
        };
        features.push(obj);
      }
      const geoJsonData = {
        type: 'FeatureCollection',
        features,
      };
      // 清空上一次地圖結果
      if (this.geoJsonData) {
        map.data.forEach((feature) => {
          map.data.remove(feature);
        });
      }
      // 調整標示圓形大小層級
      const Max = d3.max(Object.values(this.data));
      const Min = d3.min(Object.values(this.data));
      const Scale = d3.scaleLinear()
        .domain([Min, Max])
        .range([5, 100]);
      // 得到地圖標點形狀
      function getCircle(value) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#2678a6',
          fillOpacity: 0.4,
          scale: Math.round(Scale(value) * 1000) / 1000,
          strokeColor: 'white',
          strokeWeight: 0.5,
        };
      }
      // 加入圖形
      map.data.setStyle((feature) => {
        const value = feature.getProperty('value');
        return {
          icon: getCircle(value),
        };
      });
      // save geoJsonData
      this.geoJsonData = geoJsonData;
      map.data.addGeoJson(geoJsonData);
      // tooltip 滑鼠事件
      map.data.addListener('mouseover', (event) => {
        map.data.overrideStyle(event.feature, { strokeWeight: 8 });
        const name = event.feature.getProperty('name');
        const value = event.feature.getProperty('value');
        this.tooltipHtml = `<div><span>國家：</span><span>${name}</span> </div> <div><span>數量：</span><span>${value}</span> <div`;
        this.tooltipPosition = { x: event.va.x + 5, y: event.va.y + 5 };
      });
      map.data.addListener('mouseout', (event) => {
        map.data.revertStyle();
        this.tooltipHtml = '';
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .mapBox, .mapWarp{
    height: inherit;
  }

  .gmaptooltip{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    color: #ffffff;
    border-radius: 2px;
    padding: 4px 10px;
  }

</style>
