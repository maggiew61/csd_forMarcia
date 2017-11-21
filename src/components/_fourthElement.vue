<template>
  <div style="width:1200px; margin: 0 auto">
    <div style="margin:100px 0 30px 0; text-align:center; font-size:30px;font-weight:bold; ">
      本類產品前十大國家及台灣進出口平均產品價格
    </div>
    <div class="row">
      <div class="col s8 m8">
        <div class="currWrap card">
          <div class="card-content">
            <p>類別：</p>
            <v-select :options="options" placeholder="請選擇" v-model="category"></v-select>
          </div>
        </div>
      </div>
      <div class="col s4 m4">
        <div class="currWrap card">
          <div class="card-content">
            <p>年份：</p>
            <v-select :options="yearoptions" placeholder="請選擇" v-model="year"></v-select>
          </div>
        </div>
      </div>
      <div class="col s4 m4">
        <div class="currWrap card">
          <div class="card-content">
            <p>貿易資訊：</p>
            <v-select :options="yearoptions" placeholder="請選擇" v-model="year"></v-select>
          </div>
        </div>
      </div>
      <div class="col s12 m12" >

        <div class="card" style="float:left; width:49%; ">
          <div class="card-content" v-if="chartData">
            <legend-control :data="legend" v-model="highlight"></legend-control>
            <scatter-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="scatterChartOptions"
                        :id="'sc-chart'">
            </scatter-chart>
           </div>
          <div class="card-content" v-if="!chartData">
            無資料
          </div>
        </div>
        <div class="card" style="margin-left:2%; float:right;width:49%; ">
          <div class="card-content" v-if="chartData">
            <legend-control :data="legend" v-model="highlight"></legend-control>
            <scatter-chart :data="chartData"
                        :height="'450px'"
                        :width="'100%'"
                        :options="scatterChartOptions"
                        :id="'sc-chart'">
            </scatter-chart>
           </div>
          <div class="card-content" v-if="!chartData">
            無資料
          </div>
        </div>

        <TextTableBobo v-bind="textTableData" />


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
import scatterChart from './scatterChart.vue';
import data from '../js/store/trading_amt_scatter_20171026.json';
import TextTableBobo from "@/components/textTableBobo"

export default {
//  name: 'linePlatform',
  components: {
    TextTableBobo,
    vSelect,
    legendControl,
    scatterChart,
  },
  data() {
    return {
      data,
      category: '',
      year: '',
      highlight: '',
    };
  },
  updated(){
    console.log("categoryvalue:",this.category.value)

    console.log("yearvalue:",this.year.value)

  },
  computed: {
    //computer: 動態data的改變, methods都要分開寫
    //watch: 某一個職改, 另外一個職跟著改
    textTableData() {
      let k = this.category.value + '-' + this.year.value
      //user的行為
      console.log("value of k:",k)
      let rows = []
      let dd = null
      try {  //如果try的東西失敗, 就顯示return的東西
        //server side跟client side互相傳的都是string的東西
        //用api接回來的已經會是string的東西, json.parse就好
        dd = JSON.parse(JSON.stringify(this.data.data[k]))
        //這裡是在湊json裡面的格式
        console.log("data.datak:",this.data.data[k])
      }
      catch(e) {
        return {
          columns: ['排名', '國家', '進口值', '進口量', '平均單價'],
        }
      }
      for(let i in dd) { //i是0,1,2,3..
        console.log('dd', i, typeof(i), dd)
        let row = [parseInt(i)+1, dd[i].v.legend, dd[i].v.v[0], dd[i].v.v[1], dd[i].v.v[2]]
        //湊table row的顯示方式
        console.log(row)
        rows.push(row)
      }
      return {
        columns: ['排名', '國家', '進口值', '進口量', '平均單價'],
        rows,
      }
    },
    options() {
      return this.data.meta.filters[0].map(d => ({ value: d[0], label: d[1] }));
      //這裡是把json的東西丟上去到template的option裡面
      //value也在這裡, 可改, appple也可; 所以上面的options裡面有儲存value的資料
      //d只是隨便給的array名稱

      //arrow function: es6的寫法:
      //=>(這裡不能有this), 所以必須謝承
      //let self=這裡不能有this
      //return.... =>(..self. 來代表this)
    },
    yearoptions() {
      return this.data.meta.filters[1].map(d => ({ value: String(d), label: String(d) }));
    },
    legend() {
      // this.category ? this.data.value_data[this.category.value].meta.x[1] :
      return this.category && this.year ? this.data.meta.legends : [];
    },
    scatterChartOptions() {
      const fn = (c) => {
        const colorSet = this.highlight.colorSet;
        return colorSet.find(d => d.label === c).color;
      };
      return {
        legend: false, // 使用 legendControl 控制時 關閉 自有的 legend
        highlight: this.highlight.highlight,
        XaxisUnit: this.data.meta.axis[0],
        YaxisUnit: this.data.meta.axis[1],
        color: fn, // 使用 legendControl 使用 legendControl 自帶 colorSet
      };
    },
    chartLegend() {
      return this.chartData.map(d => d.name);
    },
    chartData() {
      if (!this.category || !this.year) return null;
      const obj = [];
      const keyName = `${this.category.value}-${this.year.value}`;
      const chdata = this.data.data[keyName];
      // name
      const names = this.legend;
      for (let i = 0; i < names.length; i += 1) {
        const map = [];
        const datas = chdata.find(d => d.v.legend === names[i]);
         // 應保留單一legend 多組的可能性。
        const m = {};
        m.name = names[i]; // legend
        m.axis = datas ? datas.v.v[0] : 0; // axis X 軸
        m.value = datas ? datas.v.v[1] : 0; // axis Y 軸
        m.amount = datas ? datas.v.v[2] : 0; // 大小
        m.info = datas ? datas.info : [['無資料', '--']];
        map.push(m);
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
