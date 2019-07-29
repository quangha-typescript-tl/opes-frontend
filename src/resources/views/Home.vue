<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LayoutDefaultMain from '../layouts/LayoutDefaultMain.vue';

@Component({
  components: {
    HelloWorld
  },
})
export default class Home extends Vue {
  created() {
    this.$emit('update:layout', LayoutDefaultMain);
  }
}
</script>
