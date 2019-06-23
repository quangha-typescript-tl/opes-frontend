<template>
  <div class="layout-default">

    <nav class="nav">
      <!--      <router-link to="/">Home</router-link> |-->
      <!--      <router-link to="/about">About</router-link>-->
    </nav>

    <main class="main">
      <slot/>
    </main>

    <footer class="footer">
      &copy; Awesome Company 1
    </footer>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    }
  })
  export default class LayoutDefault1 extends Vue {

    created() {
      console.log('layout default 1');
    }
  }
</script>

