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

    created() {
      this.$emit('update:layout', LayoutDefault);
    }

    changePassword() {

    }
  }
</script>

<style lang="scss" src="./ChangePassword.scss"/>
