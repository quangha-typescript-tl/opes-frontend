<template src="./ListDepartment.html"/>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import DialogService from '../../../../services/dialog.service';
  import RegistrationService from '../../../../services/registration.service';
  import ShareValueService from '../../../../services/shareValue.service';
  import FaceIcon from "@/components/FaceIcon/FaceIcon.vue";
  import MiniProfile from "@/components/MiniProfile/MiniProfile.vue";
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import {Department} from "@/models/re/Department";

  @Component({
    components: {
      FaceIcon,
      MiniProfile,
      PageHeader
    }
  })
  export default class ListDepartment extends Vue {
    public listDepartment : Array<Department> = [];
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
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
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
          DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
            this.getDepartment();
          });
        }
      ).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      });
    }

    updateDepartment(department: any) {
      DialogService.setLoaderVisible(true);
      RegistrationService.updateDepartment(department).then(
        (res) => {
          DialogService.setLoaderVisible(false);
          DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
        }
      ).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      });
    }

    addDepartment() {
      const department = new Department(null, null, null);
      this.listDepartment.push(department);
    }

    saveDepartment(department: Department) {
      DialogService.setLoaderVisible(true);
      RegistrationService.saveDepartment(department).then((res) => {
        DialogService.setLoaderVisible(false);
        DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      })
    }
  }
</script>

<style lang="scss" src="./ListDepartment.scss" />
