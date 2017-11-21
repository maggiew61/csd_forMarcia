<template>
  <div >
      <div >
          <div >
            <App v-if="logged_in" v-on:logout="onSignOut" />
            <div v-if="!(logged_in)" id="test2" style="height: 100vh;  padding-top:250px">
              <div id="box"  >
                  <div style=" margin:0 auto">
                    <img src="./img/csd_logo_footer.png" alt="a" style="padding: 0 71px; " />
                  </div>
                  <div class="example" style="text-align:center;font-size:24px;color:black;margin:30px 0;font-family: Microsoft JhengHei;">
                    智慧農業企業商情平台 登入
                  </div>
                  <div class="container container-table" style="width:62%; margin:50px auto 0 auto;">
                    <!-- Errors -->
                    <div v-if=response class="text-red">
                      <p>{{response}}</p>
                    </div>

                    <!-- login Button -->
                    <button v-on:click="signIn">
                        SIGN IN WITH GOOGLE
                    </button>
                  </div>
              </div>
          </div>

          </div>
      </div>


  </div>
</template>

<script>

import Vue from 'vue'
import App from './App'



export default {
  name: 'sso',
  components: {
    App,
  },
  computed: {
  },
  data() {
    return {
      section: 'Login',
      loading: '',
      response: '',
      logged_in: this.isLoggedIn()
    };
  },
  methods: {
    isLoggedIn() {
      var gu = this.$cookies.get("googleUser")
      console.log('gu is',gu)
      return !(gu == null)
    },

    onSignOut() {
      console.log('onSignOut()')
      var vm = this

      Vue.googleAuth().signOut(function () {
        // things to do when sign-out succeeds
        console.log('signOut() OK')
        vm.$cookies.remove("googleUser")
        vm.logged_in = false
      }, function (error) {
        // things to do when sign-out fails
        console.log('signOut() Fail')
      })
    },
    signIn: function () {
      Vue.googleAuth().directAccess()
      Vue.googleAuth().signIn(this.onSignInSuccess, this.onSignInError) //things to do when when sign in success
    },
    onSignInSuccess: function (googleUser) {
      this.toggleLoading()
      this.resetResponse()
      // this.$store.state.googleUser = googleUser
      this.$cookies.set("googleUser", {loggedIn:true})
      this.logged_in = true

      console.log('signIn() OK')
      console.log(googleUser)
      var prof = googleUser.getBasicProfile()
      console.log(prof, prof.getName(), prof.getEmail(), prof.getId())
      console.log(googleUser.getId())
      console.log(googleUser.isSignedIn())
    },
    onSignInError: function (error) {
      this.response = 'Failed to sign-in'
      console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
    },
    toggleLoading: function () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse: function () {
      this.response = ''
    }
  }
}

</script>
<style scoped>
#box{
  height:276px;
  border:2px solid grey;
  background-color:white;
  opacity: 0.8;
  width:429px;
   margin: 0 auto;
   box-shadow: 10px 10px 5px #888888;
}
#box:hover {
    opacity: 1;
}
#test2{
  background-image: url("./img/abstract.png");
}
button{
  background-color:#ff6666;
    border: 0;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    color: #fff;
    padding: 10px 48px;
    letter-spacing: 2px;
    font-size: 14px;
    font-family: futura-pt-n4,futura-pt,sans-serif;
    font-style: normal;
    font-weight: 400;
}
button:hover{
  background-color:red

}
a{
  color:white
}
a:hover{
   text-decoration: none;
}
.example {
  color: red;
}
</style>
