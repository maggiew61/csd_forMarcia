<template>
  <div  style="width:1200px; margin: 0 auto">
    <div style="margin:100px 0 30px 0; text-align:center; font-size:30px;font-weight:bold; ">
      本類產品前五大國家及台灣進出口來源分析
    </div>

    <div >
          <div class="topLeft">
            <div class="currWrap card">
              <div class="card-content" >
                <p>產品項目：</p>
                <v-select :options="options" placeholder="請選擇" v-model="category"></v-select>
              </div>
            </div>
          </div>
          <div  class="topRight">
            <div class="currWrap card">
              <div class="card-content" >
                <p>年份：</p>
                <v-select :options="options2" placeholder="請選擇" v-model="year" ></v-select>
              </div>
            </div>
          </div>
          <div  class="topRight">
            <div class="currWrap card">
              <div class="card-content" >
                <p>貿易資訊：</p>
                <v-select :options="options3" placeholder="請選擇" v-model="tradeinfo" ></v-select>
              </div>
            </div>
          </div>
      <div style="clear:both"></div>
      <div class="col s12 m12">
        <div class="card">
          <div class="card-content" v-if="chartData">
            <legend-control :data="chartLegend" v-model="highlight"></legend-control>
            <!-- <line-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="lineChartOptions"
                        :id="'lc-chart'">
            </line-chart> -->
            <!-- <bar-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="barChartOptions"
                        :id="'bc-chart'">
            </bar-chart> -->
            <!-- <h5>Pie chart: 2009</h5> -->
            <pie-chart :data="pieChartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="pieChartOptions"
                        :id="'bc-chart'">
            </pie-chart>
           </div>

          <div class="card-content" v-if="!chartData">
            無資料
          </div>
        </div>

        <!-- table test -->
        <test :data="textTableData2"
                    :height="'450px'"
                    :width="'100%'"
                    :options="pieChartOptions"
                    :id="'bc-chart'">
        </test>
        <!-- <test v-bind="textTableData2" /> -->


      </div>
      <div style="font-size:24px; text-align:center">
        「資料來源：ITC」
      </div>


    </div>
  </div>
</template>


<script>
import vSelect from 'vue-select';
import rangeInput from './rangeInput.vue';
import textTable from './textTable.vue';
import legendControl from './legendControl.vue';
import lineChart from './lineChart.vue';
import barChart from './barChart.vue';
import pieChart from './pieChart.vue';
import test from './test.vue';



import data from '../js/store/mock_trading_amt_barchart.json';
// import data from '../js/store/JSON_year_ex_qty.json';
import exqty from '../js/store/JSON_year_ex_qty.json';
import exval from '../js/store/JSON_year_ex_val.json';
import imqty from '../js/store/JSON_year_im_qty.json';
import imval from '../js/store/JSON_year_im_val.json';

export default {
  // name: 'linePlatform',
  components: {
    vSelect,
    legendControl,
    lineChart,
    barChart,
    pieChart,
    test
  },
  data() {
    return {
      show: '',
      data,
      category: '',
      highlight: '',
      filter2:[
        ["0","2009"],
        ["1","2010"],
        ["2","2011"],
        ["3","2012"],
        ["4","2013"],
        ["5","2014"],
        ["6","2015"],
        ["7","2016"],
        ["8","2017"]
      ],
      filter3: [
        ["imval","進口值(US Dollar)"],
        ["imqty","進口量(KG)"],
        ["exval","出口值(US Dollar)"],
        ["exqty","出口量(KG)"]
      ],
      year: '',
      tradeinfo: ''
    };
  },
  updated(){
    console.log(this.data.filter_options.map(d => ({ value: d[0], label: d[1] })))
    console.log(this.data)
    console.log('value of obj:',this.obj)

  },
  watch: {
    tradeinfo: function(){
      if (this.tradeinfo.value == 'imval') {
          this.data = imval;
      } else if (this.tradeinfo.value == 'imqty') {
          this.data = imqty;
      } else if (this.tradeinfo.value == 'exval') {
          this.data = exval;
      } else if (this.tradeinfo.value == 'exqty') {
          this.data = exqty;
      }
  }
  },
  computed: {
    textTableData2() {
      if (!this.category | !this.year | !this.tradeinfo) return null;
      const obj = [];
      const chdata = this.data.value_data[this.category.value].values;
      const axises = this.data.value_data[this.category.value].meta.x[0];
      const names = this.hightLightOptions;
      for (let i = 0; i < names.length; i += 1) {
        const map = [];
        for (let j = 0; j < axises.length; j += 1) {
          let yearResult = parseInt(this.year.label)
          if (axises[j] === yearResult) {
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
      const Unit = Object.values(this.data.value_data)[0].meta.axis;
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
        console.log("click:",click);
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
    chartData() {
      if (!this.category) return null;
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
    pieChartData() {
      if (!this.category | !this.year | !this.tradeinfo) return null;
      const obj = [];
      const chdata = this.data.value_data[this.category.value].values;
      const axises = this.data.value_data[this.category.value].meta.x[0];
      const names = this.hightLightOptions;
      for (let i = 0; i < names.length; i += 1) {
        const map = [];
        for (let j = 0; j < axises.length; j += 1) {
          let yearResult = parseInt(this.year.label)
          if (axises[j] === yearResult) {
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

<style  lang="scss" scoped>
  .topLeft{
    width:45%;
    float: left;
  }
  .topRight{
     margin-left:2%;
     width:25%;
     float:left
  }
  .main-container{
    height: 100vh;
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
</style>
