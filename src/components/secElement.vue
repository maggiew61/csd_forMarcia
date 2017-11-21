<template>
  <div style="width:1200px; margin:0 auto" >

    <div style="margin:100px 0 30px 0; text-align:center; font-size:30px;font-weight:bold; ">
      產品排行榜
    </div>

    <div class="row">
      <div class="col s12 m12">
        <div class="currWrap card">
          <div class="card-content">
            <div>
              <p>產品項目：</p>
              <v-select :options="options" placeholder="請選擇" v-model="category"></v-select>
            </div>
            <div>
              <p>時間區間:</p>
              <v-select :options="options2" placeholder="請選擇" v-model="interval"></v-select>
            </div>
            <div>
              <p>貿易資訊</p>
              <v-select :options="options3" placeholder="請選擇" v-model="tradeinfo"></v-select>
            </div>
          </div>
        </div>
      </div>

      <div class="col s12 m12" >

        <div class="card">
          <div class="card-content" v-if="chartData"  >
            <div style="font-size:30px; font-weight:bold; text-align:center; border-bottom:1px dotted grey">
              {{this.interval.label}}
            </div>
            <legend-control :data="chartLegend" v-model="highlight"></legend-control>
            <line-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="lineChartOptions"
                        :id="'lc-chart'">
            </line-chart>
            <bar-chart :data="barChartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="barChartOptions"
                        :id="'bc-chart'">
            </bar-chart>

            <!-- <h5>Pie chart: 2009</h5>
            <pie-chart :data="pieChartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="pieChartOptions"
                        :id="'bc-chart'">
            </pie-chart> -->

          </div>
          <div class="card-content" v-if="!chartData">
            <div style="font-size:30px; font-weight:bold; text-align:center; border-bottom:1px dotted grey">
              時間區間
            </div>
            無資料
          </div>
        </div>

<!--
        <div class="card" style="margin-left:1%; width:48%;float:right">
          <div class="card-content" v-if="chartData">
            <div style="font-size:30px; font-weight:bold; text-align:center; border-bottom:1px dotted grey">
              季
            </div>
            <legend-control :data="chartLegend" v-model="highlight"></legend-control>
            <line-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="lineChartOptions"
                        :id="'lc-chart'">
            </line-chart>
            <bar-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="barChartOptions"
                        :id="'bc-chart'">
            </bar-chart> -->

            <!-- <h5>Pie chart: 2009</h5>
            <pie-chart :data="pieChartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="pieChartOptions"
                        :id="'bc-chart'">
            </pie-chart>
 -->
          <!-- </div>
          <div class="card-content" v-if="!chartData">
            <div style="font-size:30px; font-weight:bold; text-align:center; border-bottom:1px dotted grey">
              季
            </div>
            無資料
          </div>
        </div> -->

        <div style="font-size:24px; text-align:center">
          「資料來源：ITC」
        </div>

      </div>

    </div>
  </div>
</template>


<script>
import vSelect from 'vue-select';
// import rangeInput from './rangeInput.vue';
// import pieChart from './pieChart.vue';
import textTable from './textTable.vue';
import legendControl from './legendControl.vue';
import lineChart from './lineChart.vue';
import barChart from './barChart.vue';
import data from '../js/store/year.json';
// data of charts
import yearExqty from '../js/store/JSON_year_ex_qty.json';
import yearExval from '../js/store/JSON_year_ex_val.json';
import yearImqty from '../js/store/JSON_year_im_qty.json';
import yearImval from '../js/store/JSON_year_im_val.json';
import hyearExqty from '../js/store/JSON_half_year_ex_qty.json';
import hyearExval from '../js/store/JSON_half_year_ex_val.json';
import hyearImqty from '../js/store/JSON_half_year_im_qty.json';
import hyearImval from '../js/store/JSON_half_year_im_val.json';
import quarterExqty from '../js/store/JSON_quarter_ex_qty.json';
import quarterExval from '../js/store/JSON_quarter_ex_val.json';
import quarterImqty from '../js/store/JSON_quarter_im_qty.json';
import quarterImval from '../js/store/JSON_quarter_im_val.json';


export default {
  // name: 'secElement',
  components: {
    vSelect,
    legendControl,
    lineChart,
    barChart,
//    pieChart,
  },
  data() {
    return {
      data,
      barData: this.data,
      filter2: [
          ["year", "年"],
          ["hyear", "半年"],
          ["q", "季"]
      ],
      filter3: [
          ["import", "進口"],
          ["export", "出口"]
      ],
      category: '',
      highlight: '',
      interval: '',
      tradeinfo: '',
      changeData: ''
    };
  },
  updated() {
    console.log('options: ', this.options)
    console.log(this.tradeinfo.label)
    console.log(this.barData)
  },
  watch:{
    tradeinfo: function() {
        if (this.interval.value == 'year' && this.tradeinfo.value == 'import') {
            this.data = yearImval;
            this.barData = yearImqty;
        } else if (this.interval.value == 'year' && this.tradeinfo.value == 'export') {
            this.data = yearExval;
            this.barData = yearExqty;
        } else if (this.interval.value == 'hyear' && this.tradeinfo.value == 'import') {
            this.data = hyearImval;
            this.barData = hyearImqty;
        } else if (this.interval.value == 'hyear' && this.tradeinfo.value == 'export') {
            this.data = hyearExval;
            this.barData = hyearExqty;
        } else if (this.interval.value == 'q' && this.tradeinfo.value == 'import') {
            this.data = quarterImval;
            this.barData = quarterImqty;
        } else if (this.interval.value == 'q' && this.tradeinfo.value == 'export') {
            this.data = quarterExval;
            this.barData = quarterExqty;
        }
    },
    interval: function() {
        if (this.interval.value == 'year' && this.tradeinfo.value == 'import') {
            this.data = yearImval;
            this.barData = yearImqty;
        } else if (this.interval.value == 'year' && this.tradeinfo.value == 'export') {
            this.data = yearExval;
            this.barData = yearExqty;
        } else if (this.interval.value == 'hyear' && this.tradeinfo.value == 'import') {
            this.data = hyearImval;
            this.barData = hyearImqty;
        } else if (this.interval.value == 'hyear' && this.tradeinfo.value == 'export') {
            this.data = hyearExval;
            this.barData = hyearExqty;
        } else if (this.interval.value == 'q' && this.tradeinfo.value == 'import') {
            this.data = quarterImval;
            this.barData = quarterImqty;
        } else if (this.interval.value == 'q' && this.tradeinfo.value == 'export') {
            this.data = quarterExval;
            this.barData = quarterExqty;
        }
    }
  },
  computed: {
    options() {
      return this.data.filter_options.map(d => ({ value: d[0], label: d[1] }));
    },
    options2() {
      return this.filter2.map(d => ({ value: d[0], label: d[1] }));
    },
    options3() {
      return this.filter3.map(d => ({ value: d[0], label: d[1] }));
    },
    hightLightOptions() {
      return this.category ? this.data.value_data[this.category.value].meta.x[1] : null;
    },
    lineChartOptions() {
      const fn = (c) => {
        const colorSet = this.highlight.colorSet;
        return colorSet.find(d => d.label === c).color || '#111';
      };
      const Unit = Object.values(this.data.value_data)[0].meta.axis;
      return {
        legend: false, // 使用 legendControl 控制時 關閉 自有的 legend
        highlight: this.highlight.highlight,
        XaxisUnit: Unit[0],
        YaxisUnit: Unit[1],
        color: fn, // 使用 legendControl 使用 legendControl 自帶 colorSet
      };
    },
    barChartOptions() {
      const fn = (c) => {
        const colorSet = this.highlight.colorSet;
        return colorSet.find(d => d.label === c).color || '#111';
      };
      const Unit = Object.values(this.barData.value_data)[0].meta.axis;
      return {
        type: 'barX', // 垂直堆疊
        legend: false, // 使用 legendControl 控制時 關閉 自有的 legend
        highlight: this.highlight.highlight,
        XaxisUnit: Unit[0],
        YaxisUnit: Unit[1],
        color: fn, // 使用 legendControl 使用 legendControl 自帶 colorSet
      };
    },
    pieChartOptions() {
      const fn = (c) => {
        const colorSet = this.highlight.colorSet;
        return colorSet.find(d => d.label === c).color || '#111';
      };
      const clickfn = (click) => {
        alert('click arc! data info in console.log');
        console.log(click);
      };
      return {
        legend: false, // 使用 legendControl 控制時 關閉 自有的 legend
        highlight: this.highlight.highlight,
        clickfn, // 自定義 function
        outerRadius: 120,
        innerRadius: 0,
        textOffset: 2.6,
        color: fn, // 使用 legendControl 使用 legendControl 自帶 colorSet
      };
    },
    chartLegend() {
      return this.chartData.map(d => d.name);
    },

    //畫圖的function
    chartData() {
      if (!this.category | !this.interval | !this.tradeinfo) return null;
      const obj = [];
      const chdata = this.data.value_data[this.category.value].values;
      const category = this.data.value_data[this.category.value].meta.x[0];
      const names = this.hightLightOptions;
      for (let i = 0; i < names.length; i += 1) {
        const map = [];
        for (let j = 0; j < category.length; j += 1) {
          const m = {};
          const datas = chdata[`${category[j]}-${names[i]}`];
          m.axis = category[j];
          m.value = datas ? datas[0] : 0;
          m.info = datas ? datas[1] : [['無資料', '--']];
          m.name = names[i];
          map.push(m);
        }
        const o = {
          name: names[i],
          data: map,
        };
        obj.push(o);
      }
      return obj;
    },
    barChartData() {
      if (!this.category | !this.interval | !this.tradeinfo) return null;
      const obj = [];
      const chdata = this.barData.value_data[this.category.value].values;
      const category = this.barData.value_data[this.category.value].meta.x[0];
      const names = this.hightLightOptions;
      for (let i = 0; i < names.length; i += 1) {
        const map = [];
        for (let j = 0; j < category.length; j += 1) {
          const m = {};
          const datas = chdata[`${category[j]}-${names[i]}`];
          m.axis = category[j];
          m.value = datas ? datas[0] : 0;
          m.info = datas ? datas[1] : [['無資料', '--']];
          m.name = names[i];
          map.push(m);
        }
        const o = {
          name: names[i],
          data: map,
        };
        obj.push(o);
      }
      return obj;
    },
    pieChartData() {
      if (!this.category) return null;
      const obj = [];
      const chdata = this.data.value_data[this.category.value].values;
      const axises = this.data.value_data[this.category.value].meta.x[0];
      const names = this.hightLightOptions;
      for (let i = 0; i < names.length; i += 1) {
        const map = [];
        for (let j = 0; j < axises.length; j += 1) {
          if (axises[j] === 2009) {
            const m = {};
            const datas = chdata[`${axises[j]}-${names[i]}`];
            m.axis = axises[j];
            m.value = datas ? datas[0] : 0;
            m.info = datas ? datas[1] : [['無資料', '--']];
            m.name = names[i];
            map.push(m);
          }
        }
        const o = {
          name: names[i],
          data: map,
        };
        obj.push(o);
      }
      return obj;
    },
  },
};

</script>

<style lang="scss" scoped>

  .main-container{
    height: calc(100vh);
    overflow: auto;
    padding: 0 0.75rem;
  }
  .filterWrap{
    width: 50%;
  }
  .textTableWrap{
    padding: 20px;
    margin: auto;
  }
  .LinechartWrap{
    margin: 5px auto;
    padding: 10px;
    border-bottom: 1px solid #f3f3f3;
    overflow: auto;
    &:last-child{
      border-bottom: 1px solid transparent;
    }
  }
  .textTableWrap{
    overflow: auto;
    margin: 5px auto;
    padding: 10px;
  }
  // .fil-content {
  //   width: 40%;
  //   display: inline-block;
  //   margin-top: 8px;
  //   p {
  //     display:inline-block;
  //     vertical-align: middle;
  //   }
  //   .filter {
  //     display: inline-block;
  //     width: 80%;
  //     vertical-align: middle;
  //   }
  // }

</style>
