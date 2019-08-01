<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->


    <!--<div id="app">-->
      <!--<h1>Vue Select - Ajax</h1>-->
      <!--<v-select label="name" :filterable="false" :options="options" @search="onSearch">-->
        <!--<template slot="no-options">-->
          <!--type to search GitHub repositories..-->
        <!--</template>-->
        <!--<template slot="option" slot-scope="option">-->
          <!--<div class="d-center">-->
            <!--<img :src='option.owner.avatar_url'/>-->
            <!--{{ option.full_name }}-->
          <!--</div>-->
        <!--</template>-->
        <!--<template slot="selected-option" slot-scope="option">-->
          <!--<div class="selected d-center">-->
            <!--<img :src='option.owner.avatar_url'/>-->
            <!--{{ option.full_name }}-->
          <!--</div>-->
        <!--</template>-->
      <!--</v-select>-->
    <!--</div>-->

    <!--vSelect-->
    <div class="select">

      <v-select v-model="user" :options="listUser" :filterable="false" @search="onSearch" />

      <v-select v-model="value3" label="country"
                :options="countrys"
                :clearable="false"
                maxHeight="50px"
      />
      <!--maxHeight: không set trong version > 3.-->

      <v-select v-model="value2" label="country"
                :options="countrys"
                :reduce="country => country.id"
                :clearable="false"
                maxHeight="50px"
                />


      <v-select :options="listDocs" label="title" placeholder="Select">

        <template slot="option" slot-scope="doc">
          <span class="fa" :class="doc.icon"></span>
          {{ doc.title }}
        </template>

      </v-select>

      <!--<v-select :options="options" label="title">-->
        <!--<template slot="option" slot-scope="option">-->
          <!--<span :class="option.icon"></span>-->
          <!--{{ option.title }}-->
        <!--</template>-->
      <!--</v-select>-->


    </div>

    <!--vSelect-->

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LayoutDefaultMain from '../layouts/LayoutDefaultMain.vue';

// import VueAutosuggest from "vue-autosuggest";
import vSelect from 'vue-select'

@Component({
  components: {
    HelloWorld,
    vSelect
  },
})
export default class Home extends Vue {
  public listUser = [];
  public user = '';
  public value1 = '';
  public value2: any = '';
  public value3: any = {};
  public countrys = [
    {
      country: "aaa1",
      id: "a1"
    },
    {
      country: "aaa2",
      id: "a2"
    },
    {
      country: "aaa3",
      id: "a3"
    },
    {
      country: "aaa4",
      id: "a4"
    },
    {
      country: "aaa1",
      id: "a1"
    },
    {
      country: "aaa2",
      id: "a2"
    },
    {
      country: "aaa3",
      id: "a3"
    },
    {
      country: "aaa4",
      id: "a4"
    },{
      country: "aaa1",
      id: "a1"
    },
    {
      country: "aaa2",
      id: "a2"
    },
    {
      country: "aaa3",
      id: "a3"
    },
    {
      country: "aaa4",
      id: "a4"
    },
    {
      country: "aaa4",
      id: "a4"
    },{
      country: "aaa1",
      id: "a1"
    },
    {
      country: "aaa2",
      id: "a2"
    },
    {
      country: "aaa3",
      id: "a3"
    },
    {
      country: "aaa4",
      id: "a4"
    },
    {
      country: "aaa4",
      id: "a4"
    },{
      country: "aaa1",
      id: "a1"
    },
    {
      country: "aaa2",
      id: "a2"
    },
    {
      country: "aaa3",
      id: "a3"
    },
    {
      country: "aaa4",
      id: "a4"
    }
  ];


  public listDocs = [
    {
      title: 'Read the Docs',
      icon: 'fa-book',
      url: 'https://codeclimate.com/github/sagalbot/vue-select'
    },
    {
      title: 'View on GitHub',
      icon: 'fa-github',
      url: 'https://codeclimate.com/github/sagalbot/vue-select'
    },
    {
      title: 'View on NPM',
      icon: 'fa-database',
      url: 'https://codeclimate.com/github/sagalbot/vue-select'
    },
    {
      title: 'View Codepen Examples',
      icon: 'fa-pencil',
      url: 'https://codeclimate.com/github/sagalbot/vue-select'
    }
  ];

  created() {
    this.$emit('update:layout', LayoutDefaultMain);
  }

  onSearch(textSearch, loading) {
    console.log(textSearch);
    loading(true);

    setTimeout(() => {
      this.listUser = ['1', '2', '3'];
      loading(false);
    });



      // fetch(
      //   `https://api.github.com/search/repositories?q=${escape(search)}`
      // ).then(res => {
      //   res.json().then(json => (this.listUser = json.items));
      //   loading(false);
      // });

  }
}
</script>

<style lang="scss">
  .select {
    width: 500px;
    margin: auto 0px;
  }

  .dropdown li a {
    padding: 10px 20px;
    display: flex;
    width: 100%;
    align-items: center;
    font-size: 1.25em;
  }

  .dropdown li a .fa {
    padding-right: 0.5em;
  }
</style>
