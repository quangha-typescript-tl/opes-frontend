<template src="./FaceIcon.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class FaceIcon extends Vue {
    @Prop() avatar: any;
    @Prop() iconSize: any;

    private _defaultPath = '/img/user-no-image.png';
    public iconPath = this._defaultPath;

    public firstName: string | undefined;
    public lastName: string | undefined;
    public officeName: string | undefined;
    public jobName: string | undefined;
    public mail: string | undefined;

    created() {
      this.updateFaceIcon();
    }

    updateFaceIcon() {
      if (! this.avatar) {
        return;
      }
      this.iconPath = this.avatar;
    }
  }
</script>

<style lang="scss" src="./FaceIcon.scss"/>
