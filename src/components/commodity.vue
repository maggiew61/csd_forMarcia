<template>
  <div class="main-container " >
<div style="width:1200px; margin: 0 auto">

  <div style="margin:100px 0 50px 0; text-align:center; font-size:30px;font-weight:bold; ">
    大宗物資資訊-原物料商品行情
  </div>
  <div style="width: 100%; height:180px">
       <div style="width: 45%; float:left">
          <div class="dateWrap card" style="height:125px">
            <div class="card-content" style="height:125px ">
                <div style="float:left;border-bottom:2px solid grey">
                   時間區間:
                </div>
                <div style="float:left;width:63%;margin-left:4%">
                    <div>開始日期 : {{startDate}} <span v-if="startDate"> ~ </span></div>
                    <div>結束日期 : {{endDate}}</div>
                    <div>
                        <range-input :mutiple="true" :min="0" :max="this.dateoptions.length - 1" v-model="date"></range-input>
                    </div>
                </div>
             </div>
          </div>
       </div>
       <div style="width: 45%;float:right">
         <div class="currWrap card" style="height:125px">
           <div style="padding-top:20px; height:125px; width:80%; margin:0 auto">
                 <div  style="float:left;border-bottom:2px solid grey; " >
                   產品項目:
                 </div>
                 <div class="card-content" style="float:left;padding:0px; margin-left:5%">
                     <v-select :options="['USD']" placeholder="請選擇貨幣" v-model="currency"></v-select>
                 </div>
           </div>
         </div>
       </div>
     </div>

      <div >
        <div class="card">
          <div class="card-content">
            <div class="LinechartWrap"  v-for="(d, index) in chartData">
              <line-chart :title="d.title"
                          :data="d.data"
                          :height="'400px'"
                          :width="'100%'"
                          :options="{
                            legend: false,
                          }"
                          :id="'lc-'+ index">
              </line-chart>
            </div>
             <div class="textTableWrap">
                <text-table :data="filterData"></text-table>
             </div>
           </div>
        </div>
      </div>
    </div>
    <div style="font-size:24px; text-align:center">
      「資料來源：StockQ」
    </div>



  </div>
  </div>
</template>


<script>
import vSelect from 'vue-select';
import rangeInput from './rangeInput.vue';
import textTable from './textTable.vue';
import lineChart from './lineChart.vue';
import data from '../js/store/agri_info.json';

export default {
  // name: 'newComponent',
  components: {
    rangeInput,
    vSelect,
    lineChart,
    textTable,
  },
  props: {
  },
  data() {
    return {
      date: '',
      currency: '小麥',
      data,
    };
  },
  computed: {
    dateoptions() {
      const date = [];
      for (let i = 0; i < this.data.length; i += 1) {
        for (let j = 0; j < this.data[i].data.length; j += 1) {
          if (date.indexOf(this.data[i].data[j][0]) < 0) {
            date.push(this.data[i].data[j][0]);
          }
        }
      }
      return date;
    },
    startDate() {
      return this.dateoptions[this.date[0]];
    },
    endDate() {
      return this.dateoptions[this.date[1]];
    },
    filterData() {
      const clone = JSON.parse(JSON.stringify(this.data));
      for (let i = 0; i < clone.length; i += 1) {
        clone[i].data = clone[i].data.slice(this.date[0], this.date[1]);
      }
      return clone;
    },
    chartData() {
      const chartDatas = [];
      for (let i = 0; i < this.filterData.length; i += 1) {
        const datas = [];
        // 第一個為 資料日期
        for (let j = 1; j < this.filterData[i].columns.length; j += 1) {
          const dataSet = {};
          dataSet.name = this.filterData[i].columns[j];
          dataSet.data = this.filterData[i].data.map(d => ({ axis: d[0], value: d[j] }));
          datas.push(dataSet);
        }
        const chartData = {
          title: this.filterData[i].title,
          data: datas,
        };
        chartDatas.push(chartData);
      }
      console.log(chartDatas);
      return chartDatas;
    },
  },
};

</script>

<style  lang="scss" scoped>

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
    display: none;
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
  }
</style>
