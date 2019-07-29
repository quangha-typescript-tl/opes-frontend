<template src="./Login.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import LayoutDefaultMain from '../../../layouts/LayoutDefaultMain.vue'
  // import DialogService from '../../../../services/dialog.service'
  import RegistrationService from '../../../../services/registration.service'
  import ShareValueService from '../../../../services/shareValue.service'

  @Component({
    components: {
    }
  })
  export default class Login extends Vue {
    public email = '';
    public password = '';

    created() {
      this.$emit('update:layout', LayoutDefaultMain);
      // ShareValueService.fetchUserSession().then((res) => {
      //   if (res) {
      //     this.$router.push('/re/listUser');
      //   }
      // });
    }

    login() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          RegistrationService.login(this.email, this.password).then((res) => {

            ShareValueService.setAccessToken(res['data']['access_token']);
            ShareValueService.fetchUserSession().then();
            this.$router.push('/re/listUser');

          }).catch((error) => {
            console.log(error);
          });
        }
      });
    }
  }
</script>

<style lang="scss" src="./Login.scss"/>
