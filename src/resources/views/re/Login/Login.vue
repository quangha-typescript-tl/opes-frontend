<template src="./Login.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import LayoutDefaultMain from '../../../layouts/LayoutDefaultMain.vue';
  import DialogService from '../../../../services/dialog.service';
  import RegistrationService from '../../../../services/registration.service';
  import ShareValueService from '../../../../services/shareValue.service';

  @Component({
    components: {
    }
  })
  export default class Login extends Vue {
    public email = '';
    public password = '';

    created() {
      this.$emit('update:layout', LayoutDefaultMain);
    }

    login() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          DialogService.setLoaderVisible(true);
          RegistrationService.login(this.email, this.password).then((res) => {
            DialogService.setLoaderVisible(false);
            ShareValueService.setAccessToken(res['data']['access_token']);
            ShareValueService.fetchUserSession().then();
            this.$router.push('/re/listUser');

          }).catch((error) => {
            DialogService.setLoaderVisible(false);
            DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
          });
        }
      });
    }
  }
</script>

<style lang="scss" src="./Login.scss" />
