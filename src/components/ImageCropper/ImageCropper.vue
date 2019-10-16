<template src="./ImageCropper.html" />

<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import FaceIcon from '../FaceIcon/FaceIcon.vue';
  import $ from 'jquery';
  import {Subject} from 'rxjs';
  import Cropper from 'cropperjs';
  import {TypeImageCropper} from '@/common/ContentCommon';

  const MAX_SIZE = 5 * 1024 * 1024;

  @Component({
    components: {
      FaceIcon
    }
  })
  export default class ImageCropper extends Vue {
    public TypeImageCropper: typeof TypeImageCropper = TypeImageCropper;
    @Prop() imageCropperOptions: any;
    @Prop() checkValidate: boolean;
    @Prop() imageUrl: string;
    // output
    // flagImgUpload, flagImgDestroy

    public imagePath: string = '';
    public dammyImagePath: any = {
      default: '/img/image-cropper-card-en-cn.png',
      over: '/img/image-cropper-card-over-en-cn.png'
    };
    public btnsDisabledFlag: boolean = true;
    public originName: string;

    public windowURL: any = (<any>window).URL || (<any>window).webkitURL;
    public imgData: string = '';

    public mouseFlag = true;
    private getCroppedCanvasOption: any = {};

    public cropper: any;
    public imageUrlCropper = '';

    created() {
      if (this.imageCropperOptions.typeImageCropper === TypeImageCropper.AVATAR) {
        this.dammyImagePath = {
          default: '/img/image-cropper-avatar-en.png',
          over: '/img/image-cropper-avatar-over-en.png'
        };
      } else {
        this.dammyImagePath = {
          default: '/img/image-cropper-card-en-cn.png',
          over: '/img/image-cropper-card-over-en-cn.png'
        };
      }
      this.imagePath = this.dammyImagePath.default;
      this.btnsDisabledFlag = true;
      this.getCroppedCanvasOption.fillColor = '#fff';
    }

    beforeUpdate() {
      if (this.checkValidate) {
        this.getImageUrl(this.imageCropperOptions.id);

        this.getImageUrl(this.imageCropperOptions.id).subscribe((res) => {
          this.$emit('imageContent', res);
        }, (error) => {
          this.$emit('imageContent', null);
        });
      }

      if (this.imageUrl && this.imageUrl !== this.imageUrlCropper) {
        this.imageUrlCropper = this.imageUrl;
        if($('.image-cropper-picture').attr('src')){
          this.loadImage(this.imageUrl, this.imageCropperOptions.id);
        }
      }
    }

    clickImport() {
      document.getElementById('fileInput').click();
      $('#fileInput').val('');
    }

    setOption() {
      const self = this;
      const aspectRatio = this.imageCropperOptions.typeImageCropper === TypeImageCropper.AVATAR ? 1 : (420/240);
      const minCropBoxWidth = this.imageCropperOptions.typeImageCropper === TypeImageCropper.AVATAR ? 120 : 200;

      // const aspectRatio = 420/240;
      // const minCropBoxWidth = 200;

      const configImage = {
        center: true,
        highlight: true,
        dragMode: 'move',
        zoomOnWheel: false,
        autoCropArea: 1,
        zoomable: true,
        rotatable: true,
        cropBoxResizable: false,
        autoCrop: true,
        aspectRatio: aspectRatio,
        minCropBoxHeight: 120,
        minCropBoxWidth: minCropBoxWidth,
        checkCrossOrigin: false,
        ready: function(e: any) {
          console.log(e.type);
        },
        cropstart: function(e: any) {
          console.log(e.type, e.detail.action);
        },
        cropmove: function(e: any) {
          console.log(e.type, e.detail.action);
        },
        cropend: function(e: any) {
          console.log(e.type, e.detail.action);
        },
        // crop: this.cropend,
        crop: function(e: any) {
          var data = e.detail;
          self.cropend(e);
        },
        zoom: function(e: any) {
          console.log(e.type, e.detail.ratio);
        },
        rotate: function(e: any) {
          console.log(e.type);
        },
      };

      return configImage;
    }

    loadImage(imageUrl: string, id: string) {
      if (imageUrl && id) {
        const $image = $('#' + id).find('.image-cropper-picture');
        this.cropper = new Cropper($image[0], this.setOption());
        this.cropper.replace(imageUrl);
        this.btnsDisabledFlag = null;
      }
    }

    errorLoadImage(event) {
      // this.loadImage(this.noImage, this.imageCropperOptions.id, true);
    }

    cropend(e: any) {
      // emit event
      const id = $(e.target).parents('.image-cropper-inner-wrap');
      let event;
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('imageChange', true, true, id);
      window.dispatchEvent(event);
    }

    getCropper(event: any) {
      const $cropper = $(event.target).parents('.image-cropper-inner-wrap');
      const $image = $cropper.find('.image-cropper-picture');
      const $file = $cropper.find('.image-cropper-upload');
      return {cropper: $cropper, image: $image, file: $file};
    }

    onMouseClick(event: any) {
      const obj = this.getCropper(event);
      this.mouseFlag = false;
      obj.file.click();
    }

    onMouseOver() {
      if (this.btnsDisabledFlag && this.mouseFlag) {
        this.imagePath = this.dammyImagePath.over;
      }
    }

    onMouseOut() {
      if (this.btnsDisabledFlag && this.mouseFlag) {
        this.imagePath = this.dammyImagePath.default;
      }
    }

    imageUpload(event: any) {
      const obj = this.getCropper(event);
      const files = obj.file[0].files[0];
      this.originName = files.name;
      if (files.size > MAX_SIZE) {
        // this.flagImgUpload.emit(false);
        this.$emit('flagImgUpload', false);
        return;
      } else {
        // this.flagImgUpload.emit(true);
        this.$emit('flagImgUpload', true);
      }
      const reader: FileReader = new FileReader();
      const URL = (<any>window).URL || (<any>window).webkitURL;
      if (!(files.type && files.type.match(/^image\/(png|jpeg|gif)$/))) {
        return false;
      }
      if (URL) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(files);
        img.onload = () => {
          // this.setCropper(obj);
          // obj.image.cropper('replace', URL.createObjectURL(files));
          this.cropper = new Cropper(obj.image[0], this.setOption());
          this.cropper.replace(URL.createObjectURL(files));
          this.btnsDisabledFlag = null;
        };
        img.onerror = () => {
          return;
        };

      } else if (reader) {
        reader.readAsDataURL(files);
        reader.onload = () => {
          // this.setCropper(obj);
          // obj.image.cropper('replace', reader.result);
          const cropper = new Cropper(obj.image[0], this.setOption());
          cropper.replace(reader.result);
          this.btnsDisabledFlag = null;
        };
      }
    }

    transformValue(e: any) {
      if (e === 'none') {
        return false;
      }
      let values = e.split('(')[1];
      values = values.split(')')[0];
      values = values.split(', ');
      const matrix = {
        'scale-x': values[0],
        'rotate-p': values[1],
        'rotate-m': values[2],
        'scale-y': values[3],
        'transform-x': values[4],
        'transform-y': values[5]
      };
      return matrix;
    }

    imageRoundZoom(event: any, option: number) {
      const obj = this.getCropper(event);
      const _round = obj.cropper.find('.cropper-crop-box');
      const _width = _round.width() + Number(option);
      const _height = _round.height() + Number(option);
      const _matrix = this.transformValue(_round.css('transform'));
      const _left = Number(_matrix['transform-x']) - Number(option) / 2;
      const _top = (_matrix['transform-y']) ? Number(_matrix['transform-y']) - Number(option) / 2 : 0 - Number(option) / 2;
      this.cropper.setCropBoxData({ left: _left, top: _top , width: _width, height: _height });
    }

    imageZoomIn() {
      this.cropper.zoom(0.1);
    }

    imageZoomOut() {
      this.cropper.zoom(-0.1);
    }

    imageRotateLeft() {
      this.cropper.rotate(-15);
    }

    imageRotateRight() {
      this.cropper.rotate(15);
    }

    imageDelete(event: any) {
      this.mouseFlag = true;
      // this.$emit('flagImgUpload', true);
      // this.$emit('flagImgDestroy', true);
      const obj = this.getCropper(event);
      this.cropper.destroy();
      obj.file.val('');
      obj.image.attr('src', this.dammyImagePath.default);
      this.cropend(event);
      this.btnsDisabledFlag = true;
    }

    getImageUrl(id: string): any {
      let imageObj;
      imageObj = $('#' + id).find('.image-cropper-picture');
      if (!id) {
        imageObj = $('.image-cropper-inner-wrap').find('.image-cropper-picture');
      }
      const src = imageObj.attr('src');
      const subject = new Subject();
      if (imageObj.length <= 0 || this.btnsDisabledFlag != null || !this.cropper) {
        subject.next();
        subject.error('no image');

      } else {
        this.cropper.getCroppedCanvas(this.getCroppedCanvasOption)
          .toBlob((blob) => {

            if (this.imgData) {
              this.windowURL.revokeObjectURL(this.imgData);
            }
            blob['src'] = src;
            if (id) {
              blob['name'] = this.originName;
            }
            this.imgData = this.windowURL.createObjectURL(blob);
            blob['imgData'] = this.imgData;
            subject.next(blob);
            subject.complete();
          }, 'image/jpeg');
      }
      return subject;
    }
  }
</script>

<style lang="scss" src="./ImageCropper.scss"/>
