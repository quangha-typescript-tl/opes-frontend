<template>
  <div id="app">

    <div class="loader-wrap loader-wrap-bg" :class="{'loader-show': isLoaderVisible}">
      <div class="loader-overlay"></div>
      <div class="loader">
        <i class="fa fa-spinner fa-pulse fa-2x fa-fw loader-icon"></i>
        <p class="loader-text">{{$t('LOADING')}}...</p>
      </div>
    </div>

    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>

    <Modal></Modal>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import DialogService from './services/dialog.service';
  import Modal from '@/components/Modal/Modal.vue';

  @Component({
    components: {
      Modal
    },
  })
  export default class App extends Vue {
    public listUser = [];
    public layout = 'div';
    public isLoaderVisible: boolean = false;

    created() {
      DialogService.showLoader.subscribe((res: boolean) => {
          this.isLoaderVisible = res;
        }
      );
    }
  }
</script>

<style lang="scss">
  @import './assets/style/_import.scss';
  @import './assets/style/style.scss';

  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  @import '../node_modules/vue-select/dist/vue-select.css';
  @import '../node_modules/cropperjs/dist/cropper.min.css';
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
