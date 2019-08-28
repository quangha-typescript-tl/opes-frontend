<template src="./AdminContent.html" />

<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "@/components/PageHeader/PageHeader.vue";

  import ContentService from '@/services/content.service';
  import DialogService from '@/services/dialog.service';
  import { VUE_APP_API_URL_IMAGE, URL_IMAGE_CONTENT_DEFAULT } from '@/common/Helper';

  @Component({
    components: {
      PageHeader,
    }
  })
  export default class AdminContent extends Vue {
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

    deleteContent(content: any) {
      DialogService.setLoaderVisible(true);
      const model = {
        contentId: content.id,
        // image: content.image
      };
      ContentService.deleteContent(model).then((res) => {
        DialogService.setLoaderVisible(false);
        DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
          this.$router.push('/co/listContent');
        });
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      });
    }

    editContent(contentId: number) {
      this.$router.push('/co/editContent/' + contentId);
    }

    detailContent(contentId: number) {
      this.$router.push('/co/detailContent/' + contentId);
    }
  }
</script>

<style lang="scss" src="./AdminContent.scss" />
