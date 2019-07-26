<template src="./ChangePassword.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import RegistrationService from '../../../../services/registration.service'

  @Component({
    components: {
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
          RegistrationService.changePassword(this.password, this.passwordConfirm).then(
            (res) => {
              console.log('success');
            }
          ).catch((error) => {
            console.log(error);
          });
        }
      });

    }
  }
</script>

<style lang="scss" src="./ChangePassword.scss"/>
