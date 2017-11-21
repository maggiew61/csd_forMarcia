<template>
  <div class="container" style="margin-bottom:30px">
    <div style="margin:100px 0 30px 0; text-align:center; font-size:30px;font-weight:bold; ">
      家禽文字雲
    </div>

    <div style="width:80%; margin: 0 auto 30px auto;">
      <template v-for="v,i in buttons">
      <button  v-if="i==current_btn" class="astyle crnt"  @click="display = v.d">{{v.c}}</button>
      <button   v-else  style="margin-left:1%"  class="astyle" @click="display = v.d">{{v.c}}</button>
      </template>
    </div>
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
       addClass:false,
     isActive: true,
  display:'chicken',
  buttons : [
    {c:'雞', d:'chicken'},
    {c:'鴨', d:'duck'},
    {c:'鵝', d:'Goose'},
    {c:'禽流感', d:'bird flu & Avian Influenza'},
    {c:'蘇丹紅毒蛋', d:'Sudan egg'},
    {c:'芬普尼', d:'Fipronil'},
    {c:'蛋黃', d:'yolk'},
    {c:'毒蛋', d:'tainted egg'},
  ],
  current_btn: 0,
  // a: this.on_button_rotate
    }
  },
  // created(){
  //   setTimeout(this.on_button_rotate, 40000)
  // },
  // watch:{
  //   display:function(){
  //     clearTimeout(a,2000)
  //     console.log('changed')
  //   }
  // },
  mounted(){
    if (this.isActive===true){
      this.$refs.test2.addClass=" crnt"
      console.log('hi')
    }
  },
  methods: {
    test2(){
      this.isActive=true
    },
    on_button_rotate() {
      // this.current_btn = (this.current_btn + 1) % 8
      this.current_btn += 1
      if (this.current_btn >7){
        this.current_btn =0
      }
      this.display = this.buttons[this.current_btn].d
      // setTimeout(this.on_button_rotate, 60000)
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
    padding: 1% 3%;
    letter-spacing: 2px;
    font-size: 14px;
    font-family: futura-pt-n4,futura-pt,sans-serif;
    font-style: normal;
    font-weight: 400;
    background-color:pink;
    font-family:Microsoft JhengHei;

  font-size:18px
}
/*.active{
  transition: 2s;
  background-color:blue

}*/
.green{
  background-color:green
}
</style>
