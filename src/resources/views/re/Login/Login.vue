<template src="./Login.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import LayoutDefaultMain from '../../../layouts/LayoutDefaultMain.vue'
  // import DialogService from '../../../../services/dialog.service'
  import RegistrationService from '../../../../services/registration.service'
  import axios from 'axios';

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
      console.log(this.email);
      console.log(this.password);


      this.$validator.validateAll().then((result) => {
        if (result) {
          RegistrationService.login(this.email, this.password).then(
            (res) => {
              console.log(res);
              localStorage.setItem('access_token', res['data']['access_token']);

              this.$router.push('/re/listUser');
            }
          ).catch((error) => {
            console.log(error);
          });
        }
      });
    }
  }
</script>

<style lang="scss" src="./Login.scss"/>
