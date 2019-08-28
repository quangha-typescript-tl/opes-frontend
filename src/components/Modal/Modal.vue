<template src="./Modal.html" />

<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator';
  import { Subject } from 'rxjs';
  import $ from 'jquery';

  import { DialogParams, DialogResult } from '@/models/DialogParams';
  import DialogService from '@/services/dialog.service';
  import ModalInput from '@/components/ModalInput/ModalInput.vue';
  import ModalCheckBox from '@/components/ModalCheckBox/ModalCheckBox.vue';

  @Component({
    components: {
      ModalInput,
      ModalCheckBox
    }
  })
  export default class Modal extends Vue {
    public dialog = new DialogParams('', null, null, null, null, null, null, null, new Subject(), {}, null, null);

    created() {
      DialogService.showModalPopup.subscribe((res: DialogParams) => {
          this.dialog = res;
          (<any>$('#theModal')).modal('show');
        }
      );
    }

    close() {
      this.dialog = new DialogParams(null, null, null, null, null, null, null, null, new Subject(), {}, null, null);
      (<any>$('#theModal')).modal('hide');
    }

    onClickPositive() {
      switch (this.dialog.componentType) {
        case 'ModalCheckBox':
          if (this.dialog.extraParams.checkBox) {
            this.dialog.subject.next(new DialogResult('ok', null));
            this.dialog.subject.complete();
            this.close();
          }
          break;
        default:
          this.dialog.subject.next(new DialogResult('ok', null));
          this.dialog.subject.complete();
          this.close();
          break;
      }
    }

    onClickNegative() {
      this.dialog.subject.next(new DialogResult('cancel', null));
      this.dialog.subject.complete();
      this.close();
    }

    onClickOther() {
      this.dialog.subject.next(new DialogResult('other', null));
    }
  }
</script>

<style lang="scss" src="./Modal.scss" />
