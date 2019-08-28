<template src="./EditContent.html" />

<script lang="ts">
  // component
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import ImageCropper from "@/components/ImageCropper/ImageCropper.vue";
  import { VUE_APP_API_URL_IMAGE } from '@/common/Helper';

  // service
  import ContentService from '@/services/content.service';
  import DialogService from '@/services/dialog.service';
  import ShareValueService from '@/services/shareValue.service';

  // model
  import {Content} from "@/models/co/Content";
  import {UserSession} from "@/models/re/UserSession";

  import { PublicContent } from '@/common/ContentCommon';
  import { Validator } from '@/common/Validator';

  // script
  import moment from 'moment';
  import { VueEditor } from "vue2-editor";
  import vSelect from 'vue-select';

  @Component({
    components: {
      PageHeader,
      VueEditor,
      ImageCropper,
      vSelect
    }
  })
  export default class EditContent extends Vue {
    public PublicContent: typeof PublicContent = PublicContent;
    public contentId: string = '';
    public link_image_content = VUE_APP_API_URL_IMAGE;

    public content = new Content(null, null, null, PublicContent.PRIVATE, [], null, null, null, null, null);
    public checkValidate = false;
    public userSession = {};
    public errorHashTag = false;
    public listHashTag: any[] = [];

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.contentId = this.$route.params['contentId'];

      if (this.contentId) {
        this.getDetailContent();
      }

      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      );
    }

    getDetailContent() {
      DialogService.setLoaderVisible(true);
      ContentService.getDetailContent(this.contentId).then((res) => {
        DialogService.setLoaderVisible(false);
        this.content = res['data']['content'];

        this.content.image = this.content.image ? this.link_image_content + this.content.image : '';
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      });
    }

    onSearchHashTag(search: any, loading: any) {
      if (!search) {
        this.listHashTag = [];
        return;
      }

      loading(true);
      const model = {
        hashTag: search
      };
      ContentService.getListHashTag(model).then((res) => {
        this.listHashTag = res['data']['hashTag'];
        if (!res['data']['exit']) {
          this.listHashTag.push({hash_tag: search});
        }
        loading(false);
      }).catch((error) => {
        loading(false);
      });

    }

    setSelected(value: any) {
      console.log(value);
      this.content.hash_tag = value;
    }

    checkValidateContent() {
      this.checkValidate = true;
    }

    saveContent(image: any) {
      this.checkValidate = false;
      const formData = new FormData();

      if (image) {
        const fileName = this.content.user_created + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + image.name;
        formData.append('image', image, fileName);
        this.content.image = fileName
      } else {
        this.content.image = '';
      }

      this.errorHashTag = false;
      for (let i = 0; i < this.content.hash_tag.length; i++) {
        const checkHashTag = Validator.hashTagRegex.test(this.content.hash_tag[i]['hash_tag']);
        if (!checkHashTag) {
          this.errorHashTag = true;
          break;
        }
      }

      this.$validator.validateAll().then((re) => {
        // check validate success
        if (re && !this.errorHashTag) {
          DialogService.setLoaderVisible(true);
          ContentService.editContent(this.content).then((res) => {

            if (this.content.image) {
              ContentService.uploadImageContent(formData).then((res) => {
                DialogService.setLoaderVisible(false);
                DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
                  this.$router.push('/co/adminContent');
                });
              }).catch((error) => {
                DialogService.setLoaderVisible(false);
                DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
              });
            } else {
              DialogService.setLoaderVisible(false);
              DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe((res: any) => {
                this.$router.push('/co/adminContent');
              });
            }

          }).catch((error) => {
            DialogService.setLoaderVisible(false);
            DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
          });

        }
      });
    }
  }
</script>

<style lang="scss" src="./EditContent.scss" />
