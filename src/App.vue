<template>
  <div id="app">
    <!-- navigation -->
      <div class="topnav" id="myTopnav"  >
        <div class="container " id="navigation" >
            <a href="./" id="navfirst">智慧農業企業商情平臺</a>
            <a href="./"  >關於我們</a>
            <a @click="logoutGmail" >登出</a>
            <a href="./"  >訂閱電子報</a>
            <a href="./"  >首頁</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">&#9776;</a>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
// export default {
//   name: 'app'
// }

export default {
  name: 'app',
  data() {
    return {
      profile: {}
    }
  },
  methods: {
    getProfile() {
      let vm = this
      FB.api('/me?fields=name,id,email', function (response) {
        vm.$set(vm, 'profile', response)
      })
    },
    login() {
      let vm = this
      FB.login(function (response) {
        vm.statusChangeCallback(response)
      }, {
          scope: 'email, public_profile',
          return_scopes: true
        })
    },
    logoutGmail() {
      console.log('on logoutGmail()')
      this.$emit('logout')
    },
    logout() {
      let vm = this
      FB.logout(function (response) {
        vm.statusChangeCallback(response)
      })
    },
    statusChangeCallback(response) {
      let vm = this
      if (response.status === 'connected') {
        vm.authorized = true
        vm.getProfile()
        // top.location.href = "http://csd.crowdinsight.com.tw/home/"
      } else {
        vm.authorized = false
      }
    }
  },
  mounted() {
    let vm = this

    // facebook 初始化
    window.fbAsyncInit = function () {
      FB.init({
        appId: '283681062124636',
        cookie: true,
        xfbml: true,
        version: 'v2.9'
      });
      FB.AppEvents.logPageView();

      // Get FB Login Status
      FB.getLoginStatus(response => {
        vm.statusChangeCallback(response)
      })
    };
  }
}

</script>

<style  lang="sass">
@import ./assets/style/style
@import ./assets/style/materialize
body
  font-family: Microsoft JhengHei
.topnav
  background-color: red
  overflow: hidden
  position: fixed
  top: 0px
  right: 0px
  left: 0px
  z-index: 10000
  .container
  a
    font-size: 24px
    padding-top: 22px
    float: right
    display: block
    color: black
    text-align: center
    padding: 14px 16px
    text-decoration: none
  #navfirst
    color: white
    font-size: 30px
    float: left
    padding-top: 13px
  a:hover
    color: white
    text-decoration: none
  .icon
    display: none
</style>
