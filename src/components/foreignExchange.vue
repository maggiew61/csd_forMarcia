<template>
  <div class="platform" >
    <div class="nav">
      <div class="row">
        <!-- <div class="col s12 card-tabs">
          <ul class=" tabs tabs-fixed-width blue_tabs">
            <li class="tab mytab" :class="{active: show === 'currency'}">
              <a href="#" @click="show = 'currency'"
                  :class="{active: show === 'currency'}">currency-list2</a>
            </li>
            <li class="tab mytab" :class="{active: show === 'map'}">
              <a href="#" @click="show = 'map'"
                  :class="{active: show === 'map'}">map</a>
            </li>
            <li class="tab mytab" :class="{active: show === 'lineChart'}">
              <a href="#" @click="show = 'lineChart'"
                  :class="{active: show === 'lineChart'}">lineChart</a>
            </li>
            <li class="tab mytab" :class="{active: show === 'linenbarChart'}">
              <a href="#" @click="show = 'linenbarChart'"
                  :class="{active: show === 'linenbarChart'}">line&BarChart</a>
            </li>
            <li class="tab mytab" :class="{active: show === 'scartterChart'}">
              <a href="#" @click="show = 'scartterChart'"
                  :class="{active: show === 'scartterChart'}">scartterChart</a>
            </li>
          </ul>
        </div> -->
      </div>
    </div>

    <div class="main">
      <div class="mainWarp"  v-if="show==='currency'">
        <div  >
          <div >
            <div  >
              <currency-list2  :id="'t1'" :data="CurrencyData"></currency-list2>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show==='map'" >
        <map-box :data="TradingData"></map-box>
      </div>
      <div v-if="show==='lineChart'" >
        <line-platform></line-platform>
      </div>
      <div v-if="show==='linenbarChart'" >
        <linebars-platform></linebars-platform>
      </div>
      <div v-if="show==='scartterChart'" >
        <scatter-platform></scatter-platform>
      </div>
     <div class="clearfiX"></div>
     </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import currencyList2 from './currencyList2.vue';
import mapBox from './mapBox.vue';
import linePlatform from './linePlatform.vue';
import linebarsPlatform from './lineBarsPlatform.vue';
import scatterPlatform from './scatterPlatform.vue';

export default {
  // name: 'platform',
  data() {
    return {
      show: 'currency',
    };
  },
  created() {
    this.getCurrency_dashboard();
    this.getTrading_amt();
  },
  components: {
    currencyList2,
    mapBox,
    linePlatform,
    linebarsPlatform,
    scatterPlatform,
  },
  computed: {
    ...mapGetters(['showLoading', 'CurrencyData', 'TradingData']),
  },
  methods: {
    ...mapActions(['logout', 'getCurrency_dashboard', 'getTrading_amt']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .platform{
    height: calc(100vh);
    // height: calc(100vh - 320px);
    overflow: hidden;
  }
  hr{
    margin: 10px 0;
    background: #ccc;
  }
  .row{
    margin: 0;
  }
  .nav{
    // height: 65px;
    overflow: hidden;
  }
  .main{
    height: calc(100vh - 50px);
    // background: #ededed;
  }
  .mainWarp{
    height: calc(100vh - 50px);
    overflow: auto;
  }
  .tabs .tab a {
    color: #91aec5;
    transition: .3s .1s;
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
</style>
