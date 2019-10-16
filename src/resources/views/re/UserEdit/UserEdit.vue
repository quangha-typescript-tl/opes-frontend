<template src="./UserEdit.html" />


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import DialogService from '../../../../services/dialog.service';
  import RegistrationService from '../../../../services/registration.service';
  import ShareValueService from '../../../../services/shareValue.service';

  import {UserInfo} from "@/models/re/UserInfo";
  import ImageCropper from "@/components/ImageCropper/ImageCropper.vue";
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import {TypeImageCropper} from '@/common/ContentCommon';
  import {VUE_APP_API_URL_AVATAR} from '@/common/Helper';

  import moment from 'moment';
  @Component({
    components: {
      ImageCropper,
      PageHeader
    }
  })
  export default class UserEdit extends Vue {
    public TypeImageCropper: typeof TypeImageCropper = TypeImageCropper;
    public user = new UserInfo(null, null, null, null, null, null, null);
    public listDepartment = [];
    public checkValidate = false;

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
      const userId = this.$route.params['userId'];
      if (userId) {
        this.getDetailUser(userId);
      } else {
        ShareValueService.fetchUserSession().then((res: any) => {
            this.getDetailUser(res.id);
          }
        );
      }
    }

    getDepartments() {
      RegistrationService.getDepartments().then((res) => {
        this.listDepartment = res['data']['departments'];
      });
    }

    getDetailUser(userId: string) {
      RegistrationService.getDetailUser(userId).then((res: any) => {
        this.user = res['data'];
        if (this.user.avatar) {
          this.user.avatar = VUE_APP_API_URL_AVATAR + this.user.avatar;
        }
      }).catch((error: any) => {
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      })
    }

    checkValidateUser() {
      this.checkValidate = true;
    }

    saveUser(image: any) {
      this.checkValidate = false;
      const formData = new FormData();

      if (image) {
        const fileName = this.user.id + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + image.name;
        formData.append('image', image, fileName);
        this.user.avatar = fileName
      } else {
        this.user.avatar = '';
      }

      this.$validator.validateAll().then((re) => {
        // check validate success
        if (re) {
          DialogService.setLoaderVisible(true);
          RegistrationService.updateUser(this.user).then((res: any) => {

            if (this.user.avatar) {
              RegistrationService.uploadUserAvatar(formData).then((res) => {
                DialogService.setLoaderVisible(false);
                DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
                  // this.$router.push('/co/adminContent');
                });
              }).catch((error) => {
                DialogService.setLoaderVisible(false);
                DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
              });
            } else {
              DialogService.setLoaderVisible(false);
              DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
                // this.$router.push('/co/adminContent');
              });
            }

          }).catch((error) => {
            DialogService.setLoaderVisible(false);
            DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
          });

        }
      });
    }
  }
</script>

<style lang="scss" src="./UserEdit.scss" />
