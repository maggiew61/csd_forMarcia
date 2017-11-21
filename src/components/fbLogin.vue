<template>
  <div id="app" style="margin-top:200px">
    <div class="login-box">
      <div class="login-logo">
        <a href="">
          <b>智慧農業企業商情平臺</b>
        </a>
      </div>
      <button class="loginBtn loginBtn--facebook" @click="login">使用 Facebook 帳號登入</button>
    </div>
  </div>
</template>

<script>
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
          top.location.href = "http://test-csd.crowdinsight.com.tw:8080/home"  //fblogin之後要導入的位置
          // top.location.href = "/"
          // $router.go('/home');
          // top.location.href = "/home"
        } else {
          vm.authorized = false
          console.log('logout2')
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

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  button {
    cursor: pointer;
  }

  body {
    padding: 2em;
  }

  /* Shared */

  .loginBtn {
    box-sizing: border-box;
    position: relative;
    /* width: 13em;  - apply for fixed size */
    margin: 0.2em;
    padding: 0 15px 0 46px;
    border: none;
    text-align: left;
    line-height: 34px;
    white-space: nowrap;
    border-radius: 0.2em;
    font-size: 16px;
    color: #FFF;
  }

  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }

  .loginBtn:focus {
    outline: none;
  }

  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }


  /* Facebook */

  .loginBtn--facebook {
    background-color: #4C69BA;
    background-image: linear-gradient(#4C69BA, #3B55A0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354C8C;
  }

  .loginBtn--facebook:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }

  .loginBtn--facebook:hover,
  .loginBtn--facebook:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
  }
</style>
