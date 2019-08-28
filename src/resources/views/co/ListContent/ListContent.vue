<template src="./ListContent.html" />

<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import { VUE_APP_API_URL_IMAGE, URL_IMAGE_CONTENT_DEFAULT } from '@/common/Helper';

  import ContentService from '@/services/content.service';
  import DialogService from '@/services/dialog.service';

  @Component({
    components: {
      PageHeader,
    }
  })
  export default class ListContent extends Vue {
    public contents: any[] = [];
    public link_image_content = VUE_APP_API_URL_IMAGE;
    public link_image_content_default = URL_IMAGE_CONTENT_DEFAULT;

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.listContent();
    }

    listContent() {
      DialogService.setLoaderVisible(true);
      ContentService.getListContent().then((res) => {
        DialogService.setLoaderVisible(false);
        this.contents = res['data']['contents'];

      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      });
    }

    detailContent(contentId: number) {
      this.$router.push('/co/detailContent/' + contentId);
    }
  }
</script>

<style lang="scss" src="./ListContent.scss" />
