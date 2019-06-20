<template>
  <div id="app">

    <div class="loader-wrap loader-wrap-bg" :class="{'loader-show': dialogService.isLoaderVisible()}">
      <div class="loader-overlay"></div>
      <div class="loader">
        <i class="fa fa-spinner fa-pulse fa-2x fa-fw loader-icon"></i>
        <p class="loader-text">{{$t('LOADING')}}...</p>
      </div>
    </div>

    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {DialogService} from './services/dialog.service'
  import RegistrationService from './services/registration.service'

  @Component({
    components: {},
  })
  export default class App extends Vue {
    dialogService = new DialogService();
    public listUser = [];

    beforeCreate() {
    }

    created() {
      console.log(process.env.VUE_APP_API_URL);
      console.log(process.env);
      console.log('create');
      this.dialogService.setLoaderVisible(true);
      setTimeout(() => {
        this.dialogService.setLoaderVisible(false);
      }, 3000);

      this.getListUser();
    }

    getListUser() {
      RegistrationService.getListUser()
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }
</script>

<style lang="scss">
  /*@import './assets/style/import';*/
  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .loader-wrap {
    display: none;
  }

  .loader-wrap .loader-overlay {
    display: none;
    position: fixed;
    width: 100%;
    height: calc(100% + 50px);
    background: rgba(0, 0, 0, 0.2);
    z-index: 1031;
    top: -50px;
  }

  .loader-wrap .loader {
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    position: fixed;
    top: calc(50% - 50px);
    left: 50%;
    z-index: 1032;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .loader-wrap .loader-icon {
    color: #777;
  }

  .loader-wrap .loader-text {
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 0.875rem;
  }

  .loader-wrap-bg .loader-overlay {
    display: block;
  }

  .loader-wrap.loader-show {
    display: block;
  }
</style>
