<template>
  <div class="currencyList card">
    <div class="title" style="padding:0px">
     <span class="flow-text" > {{title}}</span>
    </div>
    <div class="col s12 card-tabs" >
      <ul class=" tabs tabs-fixed-width blue_tabs" style="height:50px">
        <li class="tab mytab" v-for="(tab , index) in listindex"  :class="{active: activeIndex === tab}" v-bind:key="index"  style="font-size:14px">
          <a :href="'#'+tab"
             :class="{active: activeIndex === tab}"
             @click="setActive(tab)"
             >{{tab}}</a>
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <div class="listWrap ">

<!-- marcia -->
<div class="list" v-for="(li , index) in listcontent" v-bind:key="index">
  <div class="listContent" style="padding: 0px 70px 0px 30px">
      <div class="listTop col s12 m6">
        <!-- <div class="title col s12">{{li.title}}</div> -->
        <router-link   style="padding-top:10px; font-wight:bold;font-size:17px;float:left" :to="{ name: 'csd-linePlatform', params: { selectedCurrency: li.title}}">{{li.title}}</router-link>
        <div :title="li.now" style="padding-top:10px;margin-left:5%;font-size:17px;width:30%;float:left">
          {{Math.round(li.now * 10000)/10000}}
        </div>

        <!-- currency arrow -->
        <div  style="float:right; ">
          <div v-if="li.growth"
              class="col s12 text-right growth listli"
              :class="{incrs: li.growth >  0, decrs: li.growth <  0}">
            <span :title="li.growth" class="growth" style="font-size:15px">{{Math.round(li.growth * 10000)/10000}}</span>
            <i class="material-icons iconsVa ">{{li.icon}}</i>
          </div>
          <div v-if="!li.growth" class="col s12 text-right" title="無資料"> --- </div>
        </div>
        <div class="clearfix"></div>



        <div class="listli">
          <div class="currencySparklinesBox">
            <!--改line height-->
            <currency-sparklines v-if="li.growth" :data="li.hist" :id="id +'-'+li.title+'-'+activeIndex+'-'+ index" height="30px"></currency-sparklines>
          </div>
        </div>
      </div>

  </div>
<!-- marcia -->


      </div>
    </div>
    <div :data-id="id" class="d3tooltip"></div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import currencySparklines from './currencySparklines.vue';
import csdLinePlatform from './csd-linePlatform.vue';




export default {
  // name: 'currencyList',
  components: {
    currencySparklines,
    csdLinePlatform
  },
  data() {
    return {
      activeIndex: '',
      tooltip: '',
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['CurrencyData']),
    title() {
      // return '貨幣';
    },
    listindex() {
      const list = [];
      for (let i = 0; i < this.CurrencyData.length; i += 1) {
        for (let j = 0; j < this.CurrencyData[i].data.length; j += 1) {
          if (list.indexOf(this.CurrencyData[i].data[j].title) < 0) {
            list.push(this.CurrencyData[i].data[j].title);
          }
        }
      }
      this.activeIndex = list[0];
      return list;
    },
    listcontent() {
      return this.activeIndex ? this.CurrencyData.map((d) => {
        const AcrtiveData = d.data.find(active => active.title === this.activeIndex);
        const icon = AcrtiveData.growth > 0 ? 'arrow_drop_up' : 'arrow_drop_down';
        return {
          title: d.title,
          now: AcrtiveData.now,
          hist: AcrtiveData.hist || [],
          growth: AcrtiveData.growth,
          icon,
        };
      }) : [];
    },
  },
  methods: {
    setActive(tab) {
      this.activeIndex = tab;
    },
  },
};
</script>
<style scoped lang="scss">
  .currencyList {
    // min-width: 360px;
    // overflow: hidden;
  }
  .title, .listli{
    padding: 5px;
  }
  .tabs .tab a {
    color: #91aec5;
    transition: .3s .1s;
    font-size:10px
  }
  .mytab.active {
    border-bottom: 4px solid #2c67c3;
  }
  .tabs .tab  a.active {
    color: #2c67c3;
    font-weight: 600;
  }
  .tabs .tab  a:hover {
    background: rgba(0,0,0,0.05);
  }
  .incrs{
    color : #557555;
  }
  .decrs{
    color: #f76565;
  }
  .growth{
    transform: translateX(5px);
    display: inline-block;
    vertical-align: middle;
    font-size: .95em;
  }
  .iconsVa{
    vertical-align: middle;
    font-size: 20px;
  }
  .listWrap .list:nth-child(2n){
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .listWrap .list:first-child{
    border-top: 1px solid rgba(0,0,0,0.05);
  }
  .listWrap .list:last-child {
    border-top: 1px solid rgba(0,0,0,0);
  }

  .listWrap .list:nth-child(2n){
    background: rgba(0,0,0,0.05);
  }
  .listContent{
    display: block;
    padding: 5px 0 ;
  }
  .listTop{
    .title{
      color: #4e79bd;
    }
  }
</style>
