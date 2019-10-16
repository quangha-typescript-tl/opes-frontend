<template src="./DetailContent.html" />

<script lang="ts">
  import {Component, Vue, Prop, Watch  } from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import MiniProfile from '@/components/MiniProfile/MiniProfile.vue';
  import { VUE_APP_API_URL_IMAGE } from '@/common/Helper';

  import ContentService from '@/services/content.service';
  import DialogService from '@/services/dialog.service';

  import moment from 'moment';

  @Component({
    components: {
      PageHeader,
      MiniProfile
    }
  })
  export default class DetailContent extends Vue {
    public content: any = {};
    public contentId: string = '';
    public link_image_content = VUE_APP_API_URL_IMAGE;
    public contentRelated = [];

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newVal: any) {
      if (this.contentId !== this.$route.params['contentId']) {
        this.contentId = this.$route.params['contentId'];
        if (this.contentId) {
          this.getDetailContent();
        }
        this.getTopContentRelated();
      }
    }

    created() {
      this.$emit('update:layout', LayoutDefault);
    }

    getDetailContent() {
      DialogService.setLoaderVisible(true);
      ContentService.getDetailContent(this.contentId).then((res) => {
        DialogService.setLoaderVisible(false);
        this.content = res['data']['content'];

        this.content.created_at = moment(this.content.created_at).format('YYYY-MM-DDTHH:mm');
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      });
    }

    getTopContentRelated() {
      const model = {
        contentId: this.contentId
      };
      ContentService.getTopContentRelated(model).then((res) => {
        this.contentRelated = res['data']['contentRelated'];
      }).catch((error) => {
        console.log(error);
      });
    }

    detailContent(contentId: string) {
      this.$router.push('/co/detailContent/' + contentId);
    }

    detailContentUser() {
      this.$router.push({path: '/co/contentUser', query: {userId: this.content.user_created, hashTag: null}});
    }
  }
</script>

<style lang="scss" src="./DetailContent.scss" />
