<template>
  <h2>404</h2>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import LayoutDefaultMain from '../layouts/LayoutDefaultMain.vue';

  @Component({
    components: {
    },
  })
  export default class PageNotFound extends Vue {
    created() {
      this.$emit('update:layout', LayoutDefaultMain);
    }
  }
</script>
