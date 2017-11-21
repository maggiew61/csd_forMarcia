<template>
  <table >
<caption v-if="columns.length<1">
  no data.
</caption>
      <tr><th v-for="c in columns">{{c}}</th></tr>
      <tr v-for="row in rows">
          <td v-for="v in row">{{v}}</td>
      </tr>
  </table>
</template>

<script>
export default {
  props: ['columns', 'rows'],
  data: function() {
      return {}
    return {
        columns: ['排名', '國家', '進口值', '進口量', '平均單價'],
        rows: [
            [1, 'Belgium', 2056598.0, 651186304.0, 0.00315823289565742],
            [2, '2Belgium', 20568.0, 6186304.0, 0.003189565742],
            [1, 'Belgium', 2056598.0, 651186304.0, 0.00315823289565742],
            [2, '2Belgium', 20568.0, 6186304.0, 0.003189565742],
        ],
    }
  },
}
</script>
<style scoped>
table,th,td{
  border-collapse: separate;
  border: 1px solid #999;
}
</style>
