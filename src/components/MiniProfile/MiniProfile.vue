<template src="./MiniProfile.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import FaceIcon from '../FaceIcon/FaceIcon.vue';
  import moment from 'moment';

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
    public timePost: string | undefined;
    public mail: string | undefined;
    public officeName: string | undefined;
    public jobName: string | undefined;

    created() {
      this.updateInfo();
    }

    beforeUpdate() {
      this.updateInfo();
    }

    updateInfo() {
      if (!this.userInfo) {
        return;
      }
      this.firstName = this.userInfo.firstName;
      this.lastName = this.userInfo.lastName;
      this.avatar = this.userInfo.avatar;
      this.timePost = this.profileOptions.timePost ? moment(this.userInfo.timePost).format('DD-MM-YYYY HH:mm:ss') : '';
      // this.mail = this.profileOptions.mail ? this.userInfo.mail: '';
      // this.officeName = this.profileOptions.officeName ? this.userInfo.officeName: '';
      // this.jobName = this.profileOptions.jobName ? this.userInfo.jobName : '';
    }
  }
</script>

<style lang="scss" src="./MiniProfile.scss"/>
