<template>
  <div class="home">

      <div>
        <b-carousel
          id="carousel-1"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            caption="First slide"
            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
            img-src="https://picsum.photos/1024/480/?image=52"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
            <h1>Hello world!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <img
              slot="img"
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="https://picsum.photos/1024/480/?image=55"
              alt="image slot"
            >
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
        </b-carousel>
      </div>

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


    <div class="mt-5 d-flex">
      <select class="form-control">
        <option value="111111">111111</option>
        <option value="2222222">2222222</option>
        <option value="333333">333333</option>
        <option value="4444444">4444444</option>
      </select>
      <input type="text" class="form-control" placeholder="Search user" style="width: 200px"/>
      <date-picker class="ml-2" v-model="date2" lang="en" @change="changeDate()" :clearable="false"></date-picker>
      <date-picker v-model="time2" lang="en" type="time" format="HH:mm" placeholder="Select Time" :clearable="false"></date-picker>
    </div>

    <div class="mt-5">
      <v-select v-model="tags" label="userName" :filterable="false" @keyup="addTag($event)" :multiple="true"
                :clearable="false"
                maxHeight="50px"
      />
    </div>

    <p>{{ nameUser| ToLowerCaseFilter }}</p>
    <p>{{ nameUser| ToUpperCaseFilter }}</p>
    <p> {{ '2018-12-01T08:00+07:00' | DateTimeFilter('YYYY-MM-DD (dd)') }}</p>
    <p> {{ '2018-12-01T08:00+07:00' | DateTimeFilter('YYYY-MM-DD (ddd)') }}</p>


    <div class="form-check-inline">
      <b-form-checkbox id="checkbox-1" v-model="checkBox1" name="checkbox-1">
        I accept the terms and use
      </b-form-checkbox>

      <!--<label class="custom-control custom-checkbox mr-4">-->
        <!--<input type="checkbox" class="custom-control-input" v-model="checkBox.me" :checked="checkbox.me">-->
        <!--<span class="custom-control-indicator"></span>-->
        <!--<span class="custom-control-description">me1</span>-->
      <!--</label>-->

      <!--<label class="custom-control custom-checkbox mr-4">-->
        <!--<input type="checkbox" class="custom-control-input" v-model="checkBox.me2" :checked="checkbox.me2">-->
        <!--<span class="custom-control-indicator"></span>-->
        <!--<span class="custom-control-description">me3</span>-->
      <!--</label>-->

      <!--<label class="custom-control custom-checkbox mr-4">-->
        <!--<input type="checkbox" class="custom-control-input" v-model="checkBox.me3">-->
        <!--<span class="custom-control-indicator"></span>-->
        <!--<span class="custom-control-description">me3</span>-->
      <!--</label>-->
    </div>

    <div>
      <b-form-group label="Radios using sub-components">
        <b-form-radio-group id="radio-group-2" v-model="selectedRadio" name="radio-sub-component">
          <b-form-radio value="first">Toggle this custom radio</b-form-radio>
          <b-form-radio value="second">Or toggle this other custom radio</b-form-radio>
          <b-form-radio value="third" disabled>This one is Disabled</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>

    <div class="form-check-inline">
      <label class="custom-control custom-checkbox mr-4">
        <input type="checkbox" class="custom-control-input" v-model="checkBox1" :checked="checkBox1">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">me1</span>
      </label>

      <label class="custom-control custom-checkbox mr-4">
        <input type="checkbox" class="custom-control-input" v-model="checkBox2" :checked="checkBox2">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">me3</span>
      </label>

      <label class="custom-control custom-checkbox mr-4">
        <input type="checkbox" class="custom-control-input" v-model="checkBox3">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">me3</span>
      </label>
    </div>


    <div class="overflow-auto">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav>
    </div>

    <div class="mt-5 d-flex">
      <date-picker v-model="value1" valueType="format" lang="en" ></date-picker>
    </div>

    <MiniProfile :userInfo="{lastName: 'sssssssss', firstName: '', avatar: user.avatar, timePost: date1}" :profileOptions="{iconSize: 55, timePost: true}" />
    <MiniProfile :userInfo="{lastName: 'sssssssss', firstName: '', avatar: user.avatar, timePost: date1}" :profileOptions="{iconSize: 50, timePost: true}" />
    <MiniProfile :userInfo="{lastName: 'sssssssss', firstName: '', avatar: user.avatar, timePost: date1}" :profileOptions="{iconSize: 40, timePost: true}" />

    <!--<i class="fa fa-edit"></i>-->
    <!--<button v-popover:foo>Toggle popover</button>-->

    <!--<popover ref="foo">-->
      <!--Hello-->
    <!--</popover>-->
    <button v-tooltip="'You have new messages.'">button</button>
    <p>ll</p>
    <p></p>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LayoutDefaultMain from '@/resources/layouts/LayoutDefaultMain.vue';
import LayoutDefault from '@/resources/layouts/LayoutDefault.vue';
import FaceIcon from '@/components/FaceIcon/FaceIcon.vue';
import RegistrationService from '@/services/registration.service';
import MiniProfile from '@/components/MiniProfile/MiniProfile.vue';

import vSelect from 'vue-select';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';

@Component({
  components: {
    FaceIcon,
    vSelect,
    VueTimepicker,
    DatePicker,
    MiniProfile
  },
  directives: {
  }
})
export default class Home extends Vue {
  // vSelect
  public checkBox = {
    me: true,
  };
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
  public date2 = moment().format('YYYY-MM-DD');
  public time2 = '';
  public date3 = '';

  public tags = [];
  public nameUser = "anh bang";

  public checkBox1 = true;
  public checkBox2 = false;
  public checkBox3 = true;

  public selectedRadio = 'first';
  public value1 = '';

  created() {
    this.$emit('update:layout', LayoutDefault);
  }

  onSearch(search: any, loading: any) {
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

  clickOutsideDatePicker() {
    // mx-datepicker-popup
    $('.mx-datepicker-popup').hide();
  }

  addTag(event: any) {
    console.log(event);
  }

  linkGen(pageNum: number) {
    // console.log(pageNum);
    return pageNum === 1 ? '?' : `?page=${pageNum}`
  }

  checkClickOutSide() {
    console.log('click outside');
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
  /*.mx-datepicker {*/
    /*width: 130px !important;*/
    /*.mx-input {*/
      /*padding: 0px 0px;*/
      /*text-align: center;*/
      /*height: 32px !important;*/
      /*font-size: 1rem;*/
      /*color: #495057 !important;*/
    /*}*/
    /*.mx-input-append {*/
      /*display: none;*/
    /*}*/
  /*}*/
</style>
