<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import RegistrationService from '../services/registration.service'

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  created() {
    console.log(process.env.VUE_APP_API_URL);
    console.log(process.env);
    console.log('create');
    this.getListUser();
  }

  getListUser() {
    RegistrationService.getListUser()
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }
}
</script>
