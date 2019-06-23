<template>

<!--  <LayoutDefault>-->
    <div class="about">
      <h1>This is an about page</h1>
      <p>{{ $t('HELLO', {msg: 'anhbang'}) }}</p>
      <p>{{ $t('LOGIN') }}</p>
      <p>hhhh</p>
    </div>
<!--  </LayoutDefault>-->
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import LayoutDefault from '../layouts/LayoutDefault.vue';

  @Component({
    components: {
    },
  })
  export default class About extends Vue {

    created() {
      this.$emit('update:layout', LayoutDefault);
    }

  }
</script>
