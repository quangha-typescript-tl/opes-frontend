<template src="./AddUser.html" />


<script lang="ts">
  import {Component, Vue, Prop } from 'vue-property-decorator'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import PageHeader from "@/components/PageHeader/PageHeader.vue"
  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '@/services/dialog.service'
  import {UserRegister} from "@/models/re/UserRegister"
  import $ from 'jquery'
  import XLSX from 'xlsx'

  @Component({
    components: {
      PageHeader
    }
  })
  export default class AddUser extends Vue {
    public listUser: Array<UserRegister> = [];
    public listDepartment: Array<any> = [];

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
    }

    getDepartments() {
      const department = {id: '', departmentName: 'Select department', description: ''};
      DialogService.setLoaderVisible(true);
      RegistrationService.getDepartments().then((res) => {
        DialogService.setLoaderVisible(false);
        this.listDepartment = res['data']['departments'];
        this.listDepartment.unshift(department);
      }).catch((error) => {
        DialogService.setLoaderVisible(false);
        this.listDepartment.unshift(department);
      });
    }

    clickBtnImport() {
      document.getElementById('fileInput').click();
      $('#fileInput').val('');
    }

    //vue-json-excel
    downloadCsv() {
      const data = [["User Name", "Email", "Department"]];
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "users");
      XLSX.writeFile(wb, "addUser.xlsx");
    }

    onChangeFile(event: any) {
      const file = event.target.files[0];
      if (!(file.name.match(/.+(\.xlsx|\.csv|\.xls)$/))) {
        console.log('select file');
        return false;
      }
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const bstr: any = e.target;
        const result = bstr.result;
        const wb = XLSX.read(result, {type:'binary'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: any[] = XLSX.utils.sheet_to_json(ws, {header:1});

        const listUser = [];

          for (let r = 1; r < data.length; r++) {
            if (data.length > 1000) {
              break;
            }

            const user: any[] = data[r];
            const department = user[2];

            let departmentId;
            if(department && this.listDepartment.filter(item => item.departmentName === department).length === 1){
              departmentId = this.listDepartment.filter(item => item.departmentName === department)[0].id;
            }else{
              departmentId = this.listDepartment[0].id;
            }

            const row = {
              userName: (user[0]) ? user[0] : '',
              email: (user[1]) ? user[1] : '',
              department: departmentId ? departmentId : ''
            };
            listUser.push(row);
          }

          this.listUser = listUser;
      };
    }

    deleteUser(index: number) {
      this.listUser.splice(index, 1);
    }

    addUser() {
      this.listUser.push(new UserRegister('', '', ''));
    }

    registerUser() {
      this.$validator.validateAll().then((re) => {
          // check validate success
        if (re) {

          // Todo check duplicate same
          const model = {users: this.listUser};
          DialogService.setLoaderVisible(true);
          RegistrationService.addUsers(model).then((res) => {
            DialogService.setLoaderVisible(false);
            console.log('register user success');

          }).catch((error) => {
            DialogService.setLoaderVisible(false);
            console.log('error');

          });
        }

      });
    }
  }
</script>

<style lang="scss" src="./AddUser.scss"/>
