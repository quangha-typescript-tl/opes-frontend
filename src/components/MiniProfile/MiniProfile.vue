<template src="./MiniProfile.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import FaceIcon from '../FaceIcon/FaceIcon.vue'

  @Component({
    components: {
      FaceIcon
    }
  })
  export default class MiniProfile extends Vue {
    @Prop() userInfo: any;
    @Prop() profileOptions: any;
    // {
    //   iconSize: 55,
    //   officeName: false,
    //   jobName: false,
    //   mail: false
    // };

    public firstName: string | undefined;
    public lastName: string | undefined;
    public avatar: string | undefined;
    public mail: string | undefined;
    public officeName: string | undefined;
    public jobName: string | undefined;

    created() {
      this.updateInfo();
    }

    updateInfo() {
      if (! this.userInfo) {
        return;
      }
      this.firstName = this.userInfo.firstName;
      this.lastName = this.userInfo.lastName;
      this.avatar = this.userInfo.avatar;
      // this.mail = this.profileOptions.mail ? this.userInfo.mail: '';
      // this.officeName = this.profileOptions.officeName ? this.userInfo.officeName: '';
      // this.jobName = this.profileOptions.jobName ? this.userInfo.jobName : '';
    }
  }
</script>

<style lang="scss" src="./MiniProfile.scss"/>
