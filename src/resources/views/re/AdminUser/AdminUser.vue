<template src="./AdminUser.html" />

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import RegistrationService from '../../../../services/registration.service';
  import FaceIcon from '@/components/FaceIcon/FaceIcon.vue';
  import DialogService from '@/services/dialog.service';
  import {UserStatus} from '@/common/RegistrationCommon';
  import {DialogResult} from "@/models/DialogParams";

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
      RegistrationService.getListUser(this._conditionsSearch).then((res: any) => {
        DialogService.setLoaderVisible(false);
        this.listUser = res['data']['users'];
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
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
        DialogService.showSuccess(this.$t('RE.ADMIN_USER.MSG.DELETE_USER_SUCCESS'), this.$t('BTN.OK')).subscribe(
          (res: DialogResult) => {
            if (res.isOk()) {
              this.getListUser();
            }
          }
        )
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      })
    }

    setUserStatus(userId: number, status: UserStatus) {
      const model = {
        userId: userId,
        status: status
      };

      if (status === UserStatus.BLOCK) {
        DialogService.showModal('warning', false, this.$t('RE.ADMIN_USER.BLOCK_USER'), null, null, this.$t('BTN.OK'), this.$t('BTN.CANCEL'), 'ModalCheckBox',
          {checkBox: false, disable: true}, null, null, null).subscribe(
          (res: DialogResult) => {
            if (res.isOk()) {
              this.postUserStatus(model);
            }
          });
      } else {
        this.postUserStatus(model);
      }
    }

    postUserStatus(model: any) {
      DialogService.setLoaderVisible(true);
      RegistrationService.setUserStatus(model).then((res) => {
        DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
          this.getListUser();
        });
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
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
              DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
            }).catch((error) => {
              DialogService.setLoaderVisible(false);
              DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
            })
          }

        }
      )
    }

  }
</script>

<style lang="scss" src="./AdminUser.scss" />
