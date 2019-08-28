<template>
  <div>
    <input type="text" v-model="model.textInput" />
  </div>
</template>

<script lang="ts">
  import {Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class ModalInput extends Vue {
    public model = {};

    created() {
      this.model = this.$attrs['extraParams'];
    }
  }
</script>s
