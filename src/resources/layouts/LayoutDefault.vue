<template>
  <div class="layout-default">

    <Header/>

    <main class="content-wrap">
      <slot/>
    </main>

    <footer class="footer">
      &copy; Awesome Company
    </footer>

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
  export default class LayoutDefault extends Vue {

    created() {
      console.log('layout default');
    }
  }
</script>

<style lang="scss">
</style>

