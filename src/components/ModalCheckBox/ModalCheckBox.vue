<template>
  <div>
    <b-form-checkbox v-model="model.checkBox" @change="changeValue($event)">Confirm</b-form-checkbox>
  </div>
</template>

<script lang="ts">
  import {Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class ModalCheckBox extends Vue {
    public model = {};

    created() {
      this.model = this.$attrs['extraParams'];
    }

    changeValue(checkBox: boolean) {
        this.model['disable'] = !checkBox;
    }
  }
</script>
