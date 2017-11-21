<template>
<div>
  <table style="margin-top:100px">
  <caption v-if="columns.length<1">
  no data.
  </caption>
      <tr><th v-for="c in columns">{{c}}</th></tr>
      <tr v-for="row in rows">
          <td v-for="v in row">{{v}}</td>
      </tr>
  </table>
  <div>
    {{data}}
  </div>
</div>
</template>

<script>
export default {
  // props: ['columns', 'rows'],
  data:function(){
    return {
      data2: this.data
    }
  },
  updated(){
    watch:this.
    console.log('data2 is:',this.data2)
    console.log('data is:',this.data)

  },
  props:['data'],
  // props: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   width: {
  //     type: String,
  //     required: true,
  //   },
  //   height: {
  //     type: String,
  //     required: true,
  //   },
  //   title: String,
  //   data: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  //   options: {
  //     type: Object,
  //     default() {
  //       return {};
  //     },
  //   },
  // },
}
</script>
<style scoped>
table,th,td{
  border-collapse: separate;
  border: 1px solid #999;
}
</style>
