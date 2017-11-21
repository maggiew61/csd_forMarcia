<template>
  <div class="hello"  >


      <!-- banner -->
      <div class="container" id="banner" >
        <div id="myCarousel" style="height:250px" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner">
            <div class="item active">
              <img src="../img/banner.png" alt="a" style="width:100%;height:250px">
            </div>

            <div class="item">
              <img src="../img/banner.png" alt="b" style="width:100%;height:250px">
            </div>

            <div class="item">
              <img src="../img/banner.png" alt="c" style="width:100%;height:250px">
            </div>
          </div>
          <!-- Left and right controls -->
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>

            <!-- main -->
        <div id="main" class="container" >
          <article class="col-4" style="border:2px solid grey">
            <section >
                  <i class="material-icons" style="float:left;font-size:40px">trending_up</i>
                  <span style="float:left">
                    外匯資訊
                  </span>
            </section>

<!-- transform: rotateY(20deg) translate(-44px,0px) -->

            <div  >
                <foreign-exchange style="height:500px"></foreign-exchange>
            </div>
          </article>
          <article class="col-8" >
            <section>
                <div>
                  <a href="./mapUpdated" >產品進出口貿易資訊</a>
                </div>
                <div>
                  <a href="./product_ranking" >產品排行榜</a>
                </div>
                <div>
                  <a href="./csd_TopFivePieChart" >本類產品前五大國家</br>
                  及台灣進出口來源分析</a>
                </div>
            </section>
            <section>
                <div class="btm-row">
                  <a href="./top_ten" >本類產品前十大國家</br>
                  及台灣進出口平均產品價格</a>
                </div>
                <div class="btm-row">
                  <a href="./commodity" >大宗物資資訊-原物料商品行情</a>
                </div>
                <div class="btm-row">
                  <section style="width:50%; float: left; text-align:left; ">
                    <a href="./Poultry" >家禽文字雲</a>
                  </section>
                  <section style="width:50%; float: left;text-align:left;border-left:2px solid grey ">
                    <a href="./mothOrchid" >蝴蝶蘭文字雲</a>
                  </section>
                </div>
            </section>
          </article>
        </div>

        <!-- 2 colomns -->
        <div id="two-col" class="container" style="padding: 20px 50px; margin-top:20px;background-color:pink;">
          <p style="text-align:center">
            情境式應用
          </p>
            <div style="margin-top:10px;width:49%;float:left;">
              <router-link :to="{ name: 'flower_exportworld'}">蘭花切花-台灣的出口全球地圖及前五大出口市場消長</router-link></br>
              <router-link :to="{ name: 'flower_export5'}">蘭花切花-台灣前五大出口國的進口來源與台灣之近5年競爭分析</router-link></br>
              <router-link :to="{ name: 'flower_worldrank'}">蘭花切花-全球出口領先國的出口全球地圖及其前五大出口市場消長</router-link></br>
              <router-link :to="{ name: 'flowerseed_export'}">蘭花苗-台灣出口國的進口來源與台灣之近5年競爭分析</router-link></br>
              <router-link :to="{ name: 'flowerseed_worldrank'}">蘭花苗-全球出口領先國的前五大出口市場消長</router-link>
            </div>
            <div style="margin-top:10px;width:49%;float:right">
              <router-link :to="{ name: 'poultryegg_worldrank'}">家禽加工去殼的蛋-全球出口領先國的前五大出口市場消長</router-link></br>
              <router-link :to="{ name: 'poultryegg_export5'}">家禽加工去殼的蛋-台灣出口國的進口來源與台灣之近5年競爭分析</router-link></br>
              <router-link :to="{ name: 'poultryleg_worldrank'}">家禽油雞腿-全球出口領先國的前五大出口市場消長</router-link></br>
              <router-link :to="{ name: 'poultryleg_export5'}">家禽油雞腿-台灣出口國的進口來源與台灣之近5年競爭分析</router-link></br>
              <router-link :to="{ name: 'poultryessence_export5'}">家禽滴雞精-台灣出口國的進口來源與台灣之近5年競爭分析</router-link></br>
              <router-link :to="{ name: 'poultryessence_worldrank'}">家禽滴雞精-全球出口領先國的前五大出口市場消長</router-link>
            </div>
        </div>

        <!-- footer -->
<!-- new -->
    <div class="container" id="footer">
      <section style="color:white;">
        <div class="col-3" style="padding-top:11px;float:left;">
          <img src="../img/argi.png" style="width:70% "/>
        </div>
        <div class="col-3" style="float:left;">
          <img src="../img/csd_logo_footer.png" style="float:left; " />
        </div>
        <div class="col-6" style="padding-top:10px;float:left;">
          <p style=" font-size:14px;">
            瀏覽人數: 6666
          </p>
          <p style="font-size:12px;">
            行政院農業委員會版權所有&copy; 2017 COA All Rights Reserved 財團法人中衛發展中心
          </p>

        </div>
      </section>
  </div>

  </div>
</template>

<script>
// import currencyList from './currencyList.vue';
// import thirdElement from './thirdElement.vue';
import foreignExchange from './foreignExchange.vue';
import test from './test.vue';



export default {
  // name: 'home',
  components: {
    foreignExchange,
    test
},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      "showtest": false
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div{
   font-family: Microsoft JhengHei;
   font-size:24px;
   font-weight:bold
}

/*navigation*/
/*source: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp*/
/* Add a black background color to the top navigation */
.topnav {
    background-color: red;
    overflow: hidden;
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    z-index: 10000;
}
/* Style the links inside the navigation bar */
.topnav .container a{
  font-size: 20px;
  padding-top:22px;
}
.topnav a{
    float: right;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}
.topnav a:first-child{
  color:white;
  font-size: 30px;
  float: left;
  padding-top:13px
}
.topnav a:hover {
    color: white;
    text-decoration: none
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
    display: none;
}

/*banner*/
#banner{
  /*height:219px;
  background-size: 100% 100%;*/
  margin: 90px auto 0 auto
}


/*main*/
#main{
  margin: 20px auto 0 auto
}
#main article.col-4{
  float:left
}
#main article.col-4 section{
  height:50px;
  text-align: center;
  width: 68%;
  margin: 0 auto;
}
#main article.col-8{
  float:left;
}
#main article.col-8 .btm-row{
  margin-top:20px
}
#main article.col-8 section div{
  background-image: url("../img/gradient.jpg");
  background-size: cover;
  border: 1px #b6bac1 solid;
  border-radius:20px;
  width:31%;
  margin-left:2%;
  float:left;
  padding: 84px 5px 0 5px;
  height:267px;
  font-size:21px;
  text-align: center
}
#main article.col-8 section a{
  color:black
}
#main article.col-8 section a:hover{
  text-decoration: none;
  color:	#0000FF
}



/*2 colomns*/

/*footer*/
#footer{
  background-color:#CD5C5C;
  margin:20px auto 0 auto;
}
#footer .container{
  margin-top:20px;
}
#footer .container section{
  margin: 20px auto 20px auto;
}


/*pink carousel*/
/*ref: https://codepen.io/johnlouie04/pen/BqyGb*/


/*** Content ***/

.slider-container
{
	margin: 0 auto;
  padding-top:80px;
	width: 430px;
  min-height: 180px;
  /*border-bottom: 1px solid #ccc;*/
  /*outline: 5px solid green*/
  text-align: center
}

/*** target hooks ****/

@-webkit-keyframes slide-animation {
	0% {opacity:0;}
	2% {opacity:1;}
	20% {left:0px; opacity:1;}
	22.5% {opacity:0.6;}
	25% {left:-600px; opacity:1;}
	45% {left:-600px; opacity:1;}
	47.5% {opacity:0.6;}
	50% {left:-1200px; opacity:1;}
	70% {left:-1200px; opacity:1;}
	72.5% {opacity:0.6;}
	75% {left:-1800px; opacity:1;}
	95% {opacity:1;}
	98% {left:-1800px; opacity:0;}
	100% {left:0px; opacity:0;}
}

#slider ul
{
	-webkit-animation: slide-animation 25s infinite;
}

/* use to paused the content on mouse over */

#slider ul:hover
{
	-moz-animation-play-state: paused;
	-webkit-animation-play-state: paused;
}


/*rwd*/
* {
    box-sizing: border-box;
}
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}


</style>
