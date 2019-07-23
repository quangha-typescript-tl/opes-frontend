<template>
  <div class="layout-default">

    <Header/>

    <div class="page-wrap">
      <main class="content-wrap ml-0">
         <slot/>
      </main>
    </div>

    <!-- <footer class="footer">
      &copy; Awesome Company 1
    </footer> -->

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from './Header.vue';

  @Component({
    components: {
      Header
    }
  })
  export default class LayoutDefaultMain extends Vue {

    created() {
      console.log('layout default 1');
    }
  }
</script>

<style lang="scss">
  .content-wrap {
    padding-top: 0px;
    position: relative;
  }

  .ml-0 {
    margin-left: 0 !important;
  }
</style>

