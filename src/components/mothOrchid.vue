<template>
  <div class="container" style="margin-bottom:30px">
    <div style="margin:100px 0 30px 0; text-align:center; font-size:30px;font-weight:bold; ">
      蝴蝶蘭文字雲
    </div>
    <div style="width:30%; margin: 0 auto 30px auto;">
      <template v-for="v,i in buttons">
      <button  v-if="i==current_btn" class="astyle crnt" @click="display = v.d">{{v.c}}</button>
      <button  style="margin-left:1%" v-else class="astyle" @click="display = v.d">{{v.c}}</button>
      </template>
    </div>

    <!-- <div style="width:65%; margin: 0 auto 30px auto;">
      <button class="astyle" @click="display = 'Phalaenopsis'">蝴蝶蘭</button>
      <button class="astyle" @click="display = 'Orchid cut flowers'">蘭花切花</button>
      <button class="astyle" @click="display = 'Orchid tissue culture'">蘭花苗</button>
    </div> -->
    <section>
        <iframe height="500"  style="float:left" width="50%" frameborder="1" :src="timelineSourceCountryUrl" />
        <iframe height="500"  style="float:left" width="50%" frameborder="1" :src="wordCloudUrl" />
    </section>
    <section>
        <iframe height="500"  style="float:left" width="50%" frameborder="1" :src="imagesUrl" />
        <iframe height="500" style="float:left" width="50%" frameborder="1" :src="articlesUrl" />
    </section>
  </div>
</template>

<script>
export default {
  // name: 'gdelt',
  props: ['keyword','test'],
  data () {
    return {
  display:'Phalaenopsis',
  buttons : [
    {c:'蝴蝶蘭', d:'Phalaenopsis'},
    {c:'蘭花切花', d:'Orchid cut flowers'},
    {c:'蘭花苗', d:'Orchid tissue culture'},
  ],
  current_btn: 0,
  }
  },
  created(){
    setTimeout(this.on_button_rotate, 40000)
  },
  methods: {
    on_button_rotate() {
      // this.current_btn = (this.current_btn + 1) % 8
      this.current_btn += 1
      if (this.current_btn >2){
        this.current_btn =0
      }
      this.display = this.buttons[this.current_btn].d
      setTimeout(this.on_button_rotate, 60000)
    },

    gdelt_url_from_params(params) {
      var qstr = []
      for(let k in params) {
        qstr.push(k +　'=' + params[k])
      }
      return ('http://api.gdeltproject.org/api/v2/doc/doc?' + qstr.join('&'))
    },
  },
  computed: {
    timelineSourceCountryUrl() {
      // http://api.gdeltproject.org/api/v2/doc/doc?query=Phalaenopsis&mode=TimelineSourceCountry
      return this.gdelt_url_from_params({
        query: encodeURI(this.display),
        mode: 'TimelineSourceCountry',
      })
    },
    imagesUrl() {
      // http://api.gdeltproject.org/api/v2/doc/doc?query=Phalaenopsis&mode=ImageCollageInfo&maxrecords=50&dropdup=true
      return this.gdelt_url_from_params({
        query: encodeURI(this.display),
        mode: 'ImageCollageInfo',
        maxrecords: 50,
        dropdup: 'true',
      })
    },
    articlesUrl() { // articles list
      // http://api.gdeltproject.org/api/v2/doc/doc?query=tone>0 Phalaenopsis&mode=artlist&maxrecords=250&trans=googtrans&sort=tonedesc
      return this.gdelt_url_from_params({
        query: encodeURI(this.display),
        mode: 'artlist',
        maxrecords: 250,
        trans: 'googtrans',
        //sort: 'tonedesc',
      })
    },
    wordCloudUrl() {
      // http://api.gdeltproject.org/api/v2/doc/doc?query=Phalaenopsis&mode=wordcloudenglish
      return this.gdelt_url_from_params({
        query: encodeURI(this.display),
        mode: 'wordcloudenglish',
      })
    },
  },
}
</script>

<style scoped>
.astyle {
    margin-bottom: 5px;
    border: 0;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    color: #fff;
    padding: 10px;
    letter-spacing: 2px;
    font-size: 14px;
    font-family: futura-pt-n4,futura-pt,sans-serif;
    font-style: normal;
    font-weight: 400;
    background-color:#f9aeae;
    font-family:Microsoft JhengHei;

  font-size:18px
}
.astyle:hover{
  background-color:red;
}
.active{
  transition: 2s;
  background-color:blue

}
.crnt{
  background-color:RED
}
</style>
