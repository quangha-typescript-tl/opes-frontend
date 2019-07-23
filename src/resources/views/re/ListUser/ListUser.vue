<template src="./ListUser.html"/>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  // import DialogService from '../../../../services/dialog.service'
  import RegistrationService from '../../../../services/registration.service'
  import FaceIcon from "@/components/FaceIcon/FaceIcon.vue"
  import MiniProfile from "@/components/MiniProfile/MiniProfile.vue"
  import PageHeader from "@/components/PageHeader/PageHeader.vue"

  @Component({
    components: {
      FaceIcon,
      MiniProfile,
      PageHeader
    }
  })
  export default class ListUser extends Vue {
    public listUser = [
      {
        id: 1,
        userName: 'user 1',
        email: 'email@gmail.com',
        departmentName: 'departmentName',
        avatar: ''
      },
      {
        id: 1,
        userName: 'user 1',
        email: 'email@gmail.com',
        departmentName: 'departmentName',
        avatar: ''
      },
      {
        id: 1,
        userName: 'user 1',
        email: 'email@gmail.com',
        departmentName: 'departmentName',
        avatar: ''
      },
      {
        id: 1,
        userName: 'user 1',
        email: 'email@gmail.com',
        departmentName: 'departmentName',
        avatar: ''
      },
      {
        id: 1,
        userName: 'user 1',
        email: 'email@gmail.com',
        departmentName: 'departmentName',
        avatar: ''
      },
      {
        id: 1,
        userName: 'user 1',
        email: 'email@gmail.com',
        departmentName: 'departmentName',
        avatar: ''
      }
    ];

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getListUser();
    }

    getListUser() {
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
