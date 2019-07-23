<template src="./AddUser.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import PageHeader from "@/components/PageHeader/PageHeader.vue"

  @Component({
    components: {
      PageHeader
    }
  })
  export default class AddUser extends Vue {
    public items = [
      { userName: 'Cuka', email: 'Cuka mahal', department: 1 },
      { userName: 'Kubis', email: 'Kubis enak', department: 2 },
    ];

    created() {
      this.$emit('update:layout', LayoutDefault);
    }

    add() {
      this.items.push({ userName: '', email: '', department: 1 });
    }

    removeUser(index: number) {
      this.items.splice(index, 1);
    }

    saveUser(index: number) {
      this.$validator.validateAll().then(
        (re) => {
          if (re) {
            alert('Form Submitted!');
            return;
          }
        }
      )
    }

  }
</script>

<style lang="scss" src="./AddUser.scss"/>
