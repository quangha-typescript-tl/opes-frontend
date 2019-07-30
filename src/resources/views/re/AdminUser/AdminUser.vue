<template src="./AdminUser.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import PageHeader from "@/components/PageHeader/PageHeader.vue"
  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '@/services/dialog.service'

  @Component({
    components: {
      PageHeader
    }
  })
  export default class AdminUser extends Vue {
    public listUser: Array<any> = [];
    public listDepartment: Array<any> = [];


    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
      this.getListUser();
    }

    getListUser() {
      DialogService.setLoaderVisible(true);
      RegistrationService.getListUser().then((res) => {
        DialogService.setLoaderVisible(false);
        this.listUser = res['data']['users'];
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        console.log(error);
      })
    }

    getDepartments() {
      RegistrationService.getDepartments().then((res) => {
        this.listDepartment = res['data']['departments'];
      });
    }

    deleteUser(userId: number) {
      const model = {
        userId: userId
      };

      DialogService.setLoaderVisible(true);
      RegistrationService.deleteUser(model).then((res) => {
        console.log('delete user success');

        this.getListUser();
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        console.log('error');
      })
    }

    saveUser(user: any) {
      this.$validator.validateAll().then(
        (re) => {
          // check validate success
          if (re) {
            const model = {
              userId: user.id,
              userName: user.userName,
              email: user.email,
              department: user.department
            };
            DialogService.setLoaderVisible(true);
            RegistrationService.updateUser(model).then((res) => {
              DialogService.setLoaderVisible(false);
              console.log('update user success');
            }).catch((error) => {
              DialogService.setLoaderVisible(false);
              console.log('error');
            })
          }

        }
      )
    }

  }
</script>

<style lang="scss" src="./AdminUser.scss"/>
