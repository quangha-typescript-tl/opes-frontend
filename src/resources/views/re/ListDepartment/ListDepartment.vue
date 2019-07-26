<template src="./ListDepartment.html"/>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  // import DialogService from '../../../../services/dialog.service'
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
      RegistrationService.getListDepartment().then(
        (res) => {
          this.listDepartment = res['data']['departments'];
        }
      ).catch((error) => {
        console.log(error);
      });
    }

    deleteDepartment(id: number) {
      console.log(id);
    }

    updateDepartment(department: any) {
      RegistrationService.updateDepartment(department).then(
        (res) => {
          console.log('success');
        }
      ).catch((error) => {
        console.log(error);
      })
    }
  }
</script>

<style lang="scss" src="./ListDepartment.scss"/>
