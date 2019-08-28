<template src="./ChangePassword.html" />

<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import RegistrationService from '../../../../services/registration.service';
  import PageHeader from '@/components/PageHeader/PageHeader.vue';
  import DialogService from '@/services/dialog.service';

  @Component({
    components: {
      PageHeader
    }
  })
  export default class ChangePassword extends Vue {
    public password = '';
    public passwordConfirm = '';

    created() {
      this.$emit('update:layout', LayoutDefault);
    }

    changePassword() {

      this.$validator.validateAll().then((result) => {
        if (result) {
          DialogService.setLoaderVisible(true);
          RegistrationService.changePassword(this.password, this.passwordConfirm).then(
            (res) => {
              DialogService.setLoaderVisible(false);
              DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
            }
          ).catch((error) => {
            DialogService.setLoaderVisible(false);
            DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
          });
        }
      });

    }
  }
</script>

<style lang="scss" src="./ChangePassword.scss" />
