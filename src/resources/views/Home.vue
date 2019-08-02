<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->

    <!--vSelect-->
    <div class="select ml-5">

      <div class="mt-5">
        <v-select class="style-chooser" placeholder="Select user" v-model="user" :options="listUser" label="userName" :reduce="u => u.id" :filterable="false" @search="onSearch">
          <template slot="no-options">
            Not Found User
          </template>

          <template slot="option" slot-scope="u">
            <FaceIcon :avatar="u.avatar" :iconSize="40" />
            {{ u.userName }}
          </template>

          <template slot="selected-option" slot-scope="u">
            <FaceIcon :avatar="u.avatar" :iconSize="30" />
            {{ u.userName }}
          </template>
        </v-select>
      </div>

      <div class="mt-5">
        <v-select class="style-chooser-1" v-model="user" :reduce="u => u.id" label="userName" :filterable="false" @search="onSearch"
                  :options="listUser"
                  maxHeight="50px">
          <template slot="no-options">
            Not Found User
          </template>

          <template slot="option" slot-scope="u">
            <FaceIcon :avatar="u.avatar" :iconSize="40" />
            {{ u.userName }}
          </template>

          <template slot="selected-option" slot-scope="u">
            <FaceIcon :avatar="u.avatar" :iconSize="30" />
            {{ u.userName }}
          </template>
        </v-select>
      </div>

      <div class="mt-5">
        <!--maxHeight: không set trong version > 3.-->
        <v-select v-model="user" label="userName" :filterable="false" @search="onSearch"
                  :options="listUser"
                  :reduce="u => u.id"
                  :clearable="false"
                  maxHeight="50px"
        />
      </div>

      <div class="mt-5">
        <v-select v-model="users" label="userName" :filterable="false" @search="onSearch" :multiple="true"
                  :options="listUser"
                  :reduce="u => u.id"
                  :clearable="false"
                  maxHeight="50px"
        />
      </div>
    </div>

    <!--vSelect-->


    <div class="mt-5 d-flex">
      <input type="text" class="form-control" placeholder="Search user" style="width: 200px"/>
      <date-picker class="ml-2" v-model="date1" lang="en" @change="changeDate()" :clearable="false"></date-picker>
      <vue-timepicker class="ml-2" v-model="time" format="hh:mm" :minute-interval="5" :hide-clear-button="true" ></vue-timepicker>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import LayoutDefaultMain from '../layouts/LayoutDefaultMain.vue'
import FaceIcon from '@/components/FaceIcon/FaceIcon.vue'
import RegistrationService from '@/services/registration.service'

import vSelect from 'vue-select'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import DatePicker from 'vue2-datepicker'
import moment from 'moment'

@Component({
  components: {
    HelloWorld,
    FaceIcon,
    vSelect,
    VueTimepicker,
    DatePicker
  },
  directives: {
  }
})
export default class Home extends Vue {
  // vSelect
  public listUser = [];
  public users = [];
  public user = '';
  public userSelect = null;
  public conditionsSearch = {
    name: ''
  };

  // Vue Time picker
  public time = {
    hh: '08',
    mm: '00'
  };

  public date1 = moment().format('YYYY-MM-DD');
  public date2 = '';
  public date3 = '';

  created() {
    this.$emit('update:layout', LayoutDefaultMain);
  }

  onSearch(search, loading) {
    if (!search) {
      this.listUser = [];
      return;
    }

    loading(true);
    this.conditionsSearch.name = search;

    RegistrationService.getListUser(this.conditionsSearch).then((res) => {
      this.listUser = res['data']['users'];
      loading(false);
    }).catch((error) => {
      console.log(error);
      loading(false);
    });

  }

  changeDate() {
    // console.log(event);
    this.date1 = moment(this.date1).format('YYYY-MM-DD');
  }
}
</script>

<style lang="scss">
  .select {
    width: 500px;
    margin: auto 0px;
  }

  .style-chooser {
    .vs__search {
      height: 30px !important;
    }

    .vs__no-options {
      padding: 3px 0px;
    }

    .vs__dropdown-menu {
      border: 1px solid rgba(60,60,60,.26);
      padding: 0px;

      .vs__dropdown-option {
        border-bottom: 1px solid rgba(60,60,60,.26);
      }
    }
  }

  .style-chooser-1 {
    .vs__dropdown-menu {
      border: 1px solid rgba(60, 60, 60, .26);
    }
  }

  // custom css time-picker
  .time-picker {
    width: 6em;
    .display-time {
      width: 6em !important;
      height: 32px !important;
      text-align: center;
      border-radius: 0.25rem;
      color: #495057;
    }
    .dropdown {
      width: 6em;
      .select-list {
        width: 6em;
      }

      ul.hours {
        border-left: 1px solid #fff;
      }

      ul {
        li.active, li.active:hover {
          background: #007bff;
        }
      }
    }
  }

  // custom css date-picker
  .mx-datepicker {
    width: 130px !important;
    .mx-input {
      padding: 0px 0px;
      text-align: center;
      height: 32px !important;
      font-size: 1rem;
      color: #495057 !important;
    }
    .mx-input-append {
      display: none;
    }
  }
</style>
