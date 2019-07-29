<template src="./ListDepartment.html"/>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import DialogService from '../../../../services/dialog.service'
  import RegistrationService from '../../../../services/registration.service'
  import ShareValueService from '../../../../services/shareValue.service'
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
  export default class ListDepartment extends Vue {
    public listDepartment = [];
    public userSession = {};

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartment();

      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      ).catch((error) => {
        console.log(error);
      });
    }

    getDepartment() {
      DialogService.setLoaderVisible(true);
      RegistrationService.getListDepartment().then(
        (res) => {
          DialogService.setLoaderVisible(false);
          this.listDepartment = res['data']['departments'];
        }
      ).catch((error) => {
        DialogService.setLoaderVisible(false);
        console.log(error);
      });
    }

    deleteDepartment(departmentId: number) {
      const model = {
        departmentId: departmentId
      };
      DialogService.setLoaderVisible(true);
      RegistrationService.deleteDepartment(model).then(
        (res) => {
          DialogService.setLoaderVisible(false);
          console.log('success');

          this.getDepartment();
        }
      ).catch((error) => {
        DialogService.setLoaderVisible(false);
        console.log(error);
      });
    }

    updateDepartment(department: any) {
      DialogService.setLoaderVisible(true);
      RegistrationService.updateDepartment(department).then(
        (res) => {
          DialogService.setLoaderVisible(false);
          console.log('success');
        }
      ).catch((error) => {
        DialogService.setLoaderVisible(false);
        console.log(error);
      });
    }
  }
</script>

<style lang="scss" src="./ListDepartment.scss"/>
