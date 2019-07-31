import {UserStatus} from "../../../../common/RegistrationCommon";
<template src="./AdminUser.html" />


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import PageHeader from "@/components/PageHeader/PageHeader.vue"
  import RegistrationService from '../../../../services/registration.service'
  import FaceIcon from '@/components/FaceIcon/FaceIcon.vue'
  import DialogService from '@/services/dialog.service'
  import {UserStatus} from '@/common/RegistrationCommon'

  @Component({
    components: {
      PageHeader,
      FaceIcon
    }
  })
  export default class AdminUser extends Vue {
    public UserStatus: typeof UserStatus = UserStatus;
    public listUser: Array<any> = [];
    public listDepartment: Array<any> = [];
    public conditionsSearch : any = {
      name: '',
      department: ['ALL'],
      status: ['ALL']
    };
    private _conditionsSearch: any;

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
      this.searchUser();
    }

    searchUser() {
      let department: any[] | string = this.conditionsSearch.department;
      let status: any[] | string = this.conditionsSearch.status;
      const departmentAll = this.conditionsSearch.department.filter((de: any) => {
        return de == 'ALL'
      });
      if (departmentAll.length > 0) {
        department = ''
      }

      const statusAll = this.conditionsSearch.status.filter((st: any) => {
        return st == 'ALL'
      });
      if (statusAll.length > 0) {
        status = ''
      }

      this._conditionsSearch = {
        name: this.conditionsSearch.name,
        department: department,
        status: status
      };

      this.getListUser();
    }

    getListUser() {
      DialogService.setLoaderVisible(true);
      RegistrationService.getListUser(this._conditionsSearch).then((res) => {
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
