<template>
  <div class="layout-default">

    <Header/>

    <div class="page-wrap">
      <nav class="side-menu side-menu-hide">
        <div class="search search-side-menu">
          <form class="search-side-menu-form ng-untouched ng-pristine ng-valid">
            <input class="search-input ng-pristine ng-valid ng-touched" type="text"  placeholder="Searching">
            <button class="search-btn" type="submit">
              <i aria-hidden="true" class="fa fa-search"></i>
            </button>

<!--            <ul>-->
<!--              <li><router-link to="/listUser">List User</router-link></li>-->
<!--              <li><router-link to="/addUser">Add User</router-link></li>-->
<!--              <li>List User</li>-->
<!--              <li>List User</li>-->
<!--            </ul>-->

          </form>

          <div class="layout-blog">
            <div class="sidebar">
              <div class="inner">
                <ul class="primary-menu">
                  <li class="javascript"><router-link to="/re/listUser">List User</router-link></li>
                  <li class="javascript"><router-link to="/re/adminUser">Admin User</router-link></li>
                  <li class="javascript"><router-link to="/re/listDepartment">List Department</router-link></li>
                  <li class="javascript"><router-link to="/re/addUser">Add User</router-link></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </nav>

      <main class="content-wrap">
         <slot/>
      </main>
    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from './Header.vue';

  @Component({
    components: {
      Header
    }
  })
  export default class LayoutDefault extends Vue {

    created() {
      console.log('layout default');
    }
  }
</script>

<style lang="scss">
  .side-menu {
    position: fixed;
    width: 292px;
    top: 50px;
    bottom: 0;
    border-right: 1px solid #EEE;
    overflow-y: auto;
    z-index: 999;
    padding: 20px 0 20px 20px;
    background-color: #FFF;
    will-change: transform;
    transition: left 300ms;
  }

  .content-wrap {
    padding-top: 0px;
    position: relative;
    margin-left: 292px;
    top: 50px;
  }

  .layout-blog {
    position: relative;
    .sidebar {
      /*position: fixed;*/
      /*left: 0;*/
      /*top: 0;*/
      /*bottom: 0;*/
      /*z-index: 3;*/
      /*width: 200px;*/
      .inner {
        padding: 20px 10px 10px;
      }
    }
  }

  .primary-menu {
    list-style: none;
    border-top: 1px solid #777;
    padding-left: 0px;
    li {
      border-bottom: 1px solid #777;;
      position: relative;
      padding: 9px 0 12px;
      line-height: 1;
      font-size: 1.2em;
      cursor: pointer;
      font-family: avo_bold,avo,arial,sans-serif;

      a {
        color: #777;
      }
      &:hover {
        color: #f47631;
        background: #fbceb6;
        // padding-left: 10px;
      }
    }
  }
  
  @media (max-width: 991px) {
    .side-menu {
      left: -292px; }

    .side-menu.side-menu-show {
      left: 0; }
  }
</style>

