<template src="./FaceIcon.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import {VUE_APP_API_URL_AVATAR} from '@/common/Helper';

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
      console.log(2);
      this.updateFaceIcon();
    }

    beforeUpdate() {
      console.log(1);
      this.updateFaceIcon();
    }

    updateFaceIcon() {
      console.log(this.avatar);
      if (!this.avatar) {
        return;
      }
      this.iconPath = VUE_APP_API_URL_AVATAR + this.avatar;
    }
  }
</script>

<style lang="scss" src="./FaceIcon.scss"/>
