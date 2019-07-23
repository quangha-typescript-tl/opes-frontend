<template src="./PageHeader.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'

  @Component({
    components: {
    }
  })
  export default class PageHeader extends Vue {
    @Prop() title: any;

    created() {

    }
  }
</script>

<style lang="scss" src="./PageHeader.scss"/>
