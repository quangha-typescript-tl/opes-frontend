<template>

  <nav class="navbar navbar-toggleable-md navbar-inverse navbar-global">
    <div class="header-wrap header-wrap-opes">

      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
              data-target="#nav-content"
              aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Brand -->
      <a class="navbar-brand">
        <img class="navbar-brand-logo" src="../../assets/img/logo-ominext.png">
      </a>

      <!-- Links -->
      <div class="collapse navbar-collapse justify-content-end" id="nav-content">
        <ul class="navbar-nav">

          <li class="nav-item dropdown support-dropdown-item">
            <a class="nav-link dropdown-toggle" href="#" id="support-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FaceIcon :avatar="''" :iconSize="40" />
              <span class="mini-profile-userinfo-name font-weight-bold">admin 1</span>
            </a>

            <div class="dropdown-menu" aria-labelledby="support-dropdown">
              <div class="dropdown-item dropdown-profile">
                <MiniProfile :userInfo="{lastName: 'admin', firstName: '1', avatar: ''}" :profileOptions="{iconSize: 75}" />
              </div>
              <div class="dropdown-divider"></div>

              <a class="dropdown-item" href="#" target="_blank">{{ $t('HEADER.PROFILE') }}</a>
              <a class="dropdown-item" href="#" target="_blank">{{ $t('HEADER.CHANGE_PASS') }}</a>
              <div class="dropdown-divider"></div>

              <a class="dropdown-item" href="#" target="_blank">{{ $t('LOGOUT') }}</a>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MiniProfile from '../../components/MiniProfile/MiniProfile.vue'
  import FaceIcon from "@/components/FaceIcon/FaceIcon.vue";

  @Component({
    components: {
      FaceIcon,
      MiniProfile
    }
  })
  export default class Header extends Vue {

    public userInfo = {
      lastName: 'admin',
      avatar: ''
    };

    created() {
      console.log('Header');
    }
  }
</script>

<style lang="scss">
  @import '../../assets/style/_import.scss';
  .navbar {
    padding: 0 !important;
  }

  .navbar-global {
    min-height: 50px;
    padding: 0;

    .navbar-toggler {
      padding: 2px 6px 3px;
      z-index: 999;
      right: 6px;
    }

    .navbar-inverse {
      .navbar-toggler {
        border-color: white;
      }

      .navbar-toggler-icon {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        vertical-align: middle;
        content: "";
        background: no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }

  .header-wrap-opes {
    padding: 0 1rem;
    min-height: 50px;
    width: 100%;
    align-items: center;
    //background-color: $opes-symbol-color;
    display: -ms-flexbox !important;
    display: flex !important;
  }

  .navbar-brand {
    padding: 0;

    .navbar-brand-logo {
      height: 50px !important;
    }
  }

  .navbar-nav {
    .nav-link {
      position: relative;
      padding: 0.8em 1em;
      color: #555 !important;

      &:hover, &:active {
        color: $opes-symbol-color !important;
      }

      .fa {
        font-size: _rem(20px);
      }

      span {
        font-size: 14px;
        font-weight: 600;
        padding: 0 10px;
        color: #555;

        &:hover, &:active {
          color: $opes-symbol-color !important;
        }
      }
    }
  }

  .nav-link-action-logo {
    border: 1px solid $white;
    padding: 2px 4px 1px;
    text-align: center;
    line-height: 1;
    display: inline-block;
    margin-right: 2px;
  }

  .nav-link-action-point {
    font-size: _rem(14px);
  }

  .nav-link-info {
    &-badge {
      font-size: _rem(10px);
      position: absolute;
      bottom: .5rem;
      white-space: nowrap;
    }
  }

  .nav-link-drjoy-info {
    &-circle {
      position: absolute;
      left: .4rem;
      top: 1rem;
      background: #D21D29;
      border-radius: 50%;
      padding: 1px;
      width: 6px;
      height: 6px;
    }
  }

  .drjoy-info {
    .balloon {
      display: inline-block;
      width: 36px;
      position: relative;

      &-orange {
        text-align: center;
        display: block;
        width: 30px;
        height: 20px;
        font-size: _rem(14px);
        vertical-align: middle;
        color: $white;
        background-color: $gray;

        &:after {
          content: " ";
          border-left: 6px solid $gray;
          border-bottom: 6px solid transparent;
          position: absolute;
          left: 50%;
          bottom: -6px;
        }
      }

      &-left {
        right: 52px;
      }

      &-orange {
        background-color: $orange;

        &:after {
          border-left-color: $orange;
        }
      }
    }
  }

  .navbar-toggler {
    padding: 2px 6px 3px;
    z-index: 999;
    right: 6px;
  }

  .hospital-dropdown-item .fa {
    display: none;
  }

  .support-dropdown-item .fa {
    display: none;
  }

  .nav-link-checklist-label {
    display: none;
  }

  .nav-link-info-label {
    display: none;
  }

  .settings-dropdown-item {
    display: none;
  }

  .logout-item .fa {
    display: none;
  }

  .dropdown-item-active {
    color: $opes-symbol-color;
  }

  @media (min-width: 992px) {
  /*!*@include media-breakpoint-up(lg) {*/
    .navbar-toggleable-md .navbar-collapse {
      display: -ms-flexbox !important;
      display: flex !important;
      width: 100%;
    }

    .navbar-toggleable-md .navbar-nav {
      -ms-flex-direction: row;
      flex-direction: row;
    }

    .navbar-brand {
      padding: 0;
      .navbar-brand-logo {
        height: 30px;
      }
    }
    .navbar-nav {
      .dropdown-menu {
        left: -45%;
        width: 300px;
        right: auto;
        position: absolute !important;
        transform: translate(-50%, 0);
        >:before,
        >:after {
          content: "";
          position: absolute !important;
          left: 80%;
          display: block;
          width: 0;
          height: 0;
          border-style: solid;
        }
        >:before {
          top: -9px;
          margin-left: -9px;
          border-width: 0 9px 9px 9px;
          border-color: transparent transparent $white transparent;
          z-index: 0;
        }
        >:after {
          top: -10px;
          margin-left: -10px;
          border-width: 0 10px 10px 10px;
          border-color: transparent transparent rgba(0, 0, 0, 0.05) transparent;
          z-index: -1;
        }

        .dropdown-profile {
          padding: 0.25rem 1rem;
        }
      }
    }
  }

  @media (max-width: 991px) {
  //nclude media-breakpoint-down(md) {
    .nav-link-drjoy-info {
      &-circle {
        left: 1.6rem;
        top: .6rem;
      }
    }
    .navbar-brand {
      position: absolute;
      left: _rem(50px);
      margin: 0;
      z-index: 997;
    }
    .navbar-nav {
      border-top: 1px solid $white;
      overflow-y: auto;
      $nav-item-height: 40px;
      $nav-item-length: 6;
      $navbar-nav-border-height: 2px;
      margin-top: 44px;
      .nav-item {
        padding: 0 1rem;
      }
    }
    .nav-link .fa {
      margin-right: _rem(10px);
    }
    .nav-link-action-logo {
      margin-left: _rem(2px);
      margin-right: _rem(14px);
    }
    .hospital-dropdown-item .fa {
      display: inline-block;
    }
    .support-dropdown-item .fa {
      display: inline-block;
    }
    .nav-link-checklist-label {
      display: inline-block;
    }
    .nav-link-info-label {
      display: inline-block;
    }
    .logout-item .fa {
      display: inline-block;
    }
    .info-panel-item {
      display: none;
    }
    .settings-panel-item {
      display: none;
    }
    .settings-dropdown-item {
      display: block;
    }
    .fa-star {
      &:before {
        font-size: 1rem;
      }
      &-o {
        &:before {
          font-size: 1rem;
        }
      }
    }
  }
</style>

