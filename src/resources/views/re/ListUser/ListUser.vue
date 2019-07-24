<template src="./ListUser.html"/>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  // import DialogService from '../../../../services/dialog.service'
  import RegistrationService from '../../../../services/registration.service'
  import ShareValueService from '../../../../services/shareValue.service'
  import FaceIcon from "@/components/FaceIcon/FaceIcon.vue"
  import MiniProfile from "@/components/MiniProfile/MiniProfile.vue"
  import PageHeader from "@/components/PageHeader/PageHeader.vue"
  import axios from 'axios';

  @Component({
    components: {
      FaceIcon,
      MiniProfile,
      PageHeader
    }
  })
  export default class ListUser extends Vue {
    // public listUser = [
    //   {
    //     id: 1,
    //     userName: 'user 1',
    //     email: 'email@gmail.com',
    //     departmentName: 'departmentName',
    //     avatar: ''
    //   },
    //   {
    //     id: 1,
    //     userName: 'user 1',
    //     email: 'email@gmail.com',
    //     departmentName: 'departmentName',
    //     avatar: ''
    //   },
    //   {
    //     id: 1,
    //     userName: 'user 1',
    //     email: 'email@gmail.com',
    //     departmentName: 'departmentName',
    //     avatar: ''
    //   },
    //   {
    //     id: 1,
    //     userName: 'user 1',
    //     email: 'email@gmail.com',
    //     departmentName: 'departmentName',
    //     avatar: ''
    //   },
    //   {
    //     id: 1,
    //     userName: 'user 1',
    //     email: 'email@gmail.com',
    //     departmentName: 'departmentName',
    //     avatar: ''
    //   },
    //   {
    //     id: 1,
    //     userName: 'user 1',
    //     email: 'email@gmail.com',
    //     departmentName: 'departmentName',
    //     avatar: ''
    //   }
    // ];
    public listUser = [];
    public userSession = {};

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getListUser();

      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      ).catch((error) => {
        console.log(error);
      });
    }

    getListUser() {
      console.log('11111111111111');
      RegistrationService.getListUser().then(
        (res) => {
          this.listUser = res['data']['users'];
        }
      ).catch((error) => {
        console.log(error);
      })
    }

    deleteUser(id: number) {
      console.log(id);
    }

    editUser(id: number) {
      console.log(id);
    }

    showDetailUser(id: number) {
      console.log(id);
    }
  }
</script>

<style lang="scss" src="./ListUser.scss"/>
