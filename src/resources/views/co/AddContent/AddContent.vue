<template src="./AddContent.html" />

<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "@/components/PageHeader/PageHeader.vue";
  import ImageCropper from "@/components/ImageCropper/ImageCropper.vue";

  import {DialogResult} from "@/models/DialogParams";
  import {ContentRegister} from "@/models/co/ContentRegister";

  import ContentService from '@/services/content.service';
  import DialogService from '@/services/dialog.service';
  import ShareValueService from '@/services/shareValue.service';

  import { PublicContent, TypeImageCropper } from "@/common/ContentCommon";
  import { Validator } from '@/common/Validator';
  import { VUE_APP_API_URL_IMAGE } from '@/common/Helper';

  import moment from 'moment';
  import vSelect from 'vue-select';

  import { VueEditor } from 'vue2-editor';

  @Component({
    components: {
      PageHeader,
      VueEditor,
      ImageCropper,
      vSelect
    }
  })
  export default class AddContent extends Vue {
    public TypeImageCropper: typeof TypeImageCropper = TypeImageCropper;
    public PublicContent: typeof PublicContent = PublicContent;
    public content = new ContentRegister('', '', PublicContent.PRIVATE, '', '', []);
    public checkValidate = false;
    public userSession = {};
    public listHashTag = [];
    public errorHashTag = false;

    public customToolbar = [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image", "code-block"]
    ];

    public link_image_content = VUE_APP_API_URL_IMAGE;

    created() {
      this.$emit('update:layout', LayoutDefault);
      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      );
    }

    onSearchHashTag(search, loading) {
      if (!search) {
        this.listHashTag = [];
        return;
      }

      loading(true);
      const model = {
        hashTag: search
      };
      this.listHashTag = [];
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

    imageAdded(file: any, Editor: any, cursorLocation: any) {
      // console.log('file: ' + file);
      // console.log('Editor: ' + Editor);
      // console.log('cursorLocation: ' + cursorLocation);

      const formData = new FormData();
      const fileName = this.userSession['id'] + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + file.name;
      formData.append('image', file, fileName);

      DialogService.setLoaderVisible(true);
      ContentService.uploadImageContent(formData).then((res) => {
        DialogService.setLoaderVisible(false);
        Editor.insertEmbed(cursorLocation, 'image', this.link_image_content + fileName);
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
      });
    }

    imageRemoved(url: any, Editor: any, cursorLocation: any) {
      const index = url.lastIndexOf('/');
      const nameImage = url.substr(index + 1);
      DialogService.setLoaderVisible(true);
      ContentService.removeImageContent(nameImage).then((res) => {
        DialogService.setLoaderVisible(false);
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
      });
    }

    checkValidateContent() {
      this.checkValidate = true;
    }

    postContent(image: any) {
      this.checkValidate = false;
      const formData = new FormData();

      if (image) {
        const fileName = this.userSession['id'] + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + image.name;
        formData.append('image', image, fileName);
        this.content.image = fileName;
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
          ContentService.addContent(this.content).then((res) => {

            if (this.content.image) {
              ContentService.uploadImageContent(formData).then((res) => {
                DialogService.setLoaderVisible(false);

                DialogService.showSuccess(this.$t('CO.ADD_CONTENT.MSG.ADD_CONTENT_SUCCESS'), this.$t('BTN.OK')).subscribe(
                  (res: DialogResult) => {
                    if (res.isOk()) {
                      this.$router.push('/co/listContent');
                    }
                  }
                );
              }).catch((error) => {
                // Todo upload image fail
                DialogService.setLoaderVisible(false);
                DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
              });
            } else {
              DialogService.setLoaderVisible(false);
              DialogService.showSuccess(this.$t('CO.ADD_CONTENT.MSG.ADD_CONTENT_SUCCESS'), this.$t('BTN.OK')).subscribe(
                (res: DialogResult) => {
                  if (res.isOk()) {
                    this.$router.push('/co/listContent');
                  }
                }
              );
            }
          }).catch((error) => {
            DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
            DialogService.setLoaderVisible(false);
          });

        }
      });
    }
  }
</script>

<style lang="scss" src="./AddContent.scss" />
