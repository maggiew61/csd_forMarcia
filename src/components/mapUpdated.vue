<template>
  <div class="platform " >
    <div class="nav">
      <div class="row">
        <div style="margin:100px 0 50px 0; text-align:center; font-size:30px;font-weight:bold; ">
          產品進出口貿易資訊
        </div>
        <!-- <div class="col s12 card-tabs">
          <ul class=" tabs tabs-fixed-width blue_tabs">
            <li class="tab mytab" :class="{active: show === 'currency'}">
               <a href="#" @click="show = 'currency'"
                  :class="{active: show === 'currency'}">currency-list</a>
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
      <div>
        <map-box :data="TradingData"/>
      </div>
     <div class="clearfiX"></div>
     </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import mapBox from './mapBox.vue';
// import currencyList from './currencyList.vue';
// import linePlatform from './linePlatform.vue';
// import linebarsPlatform from './lineBarsPlatform.vue';
// import scatterPlatform from './scatterPlatform.vue';

export default {
  // name: 'mapUpdated',
  data() {
    return {
      show: 'map',
    };
  },
  created() {
    this.getCurrency_dashboard();
    this.getTrading_amt();
  },
  components: {
    mapBox,
//    currencyList,
    // linePlatform,
    // linebarsPlatform,
    // scatterPlatform,
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
    height: 110vh;
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
    background: #ededed;
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
