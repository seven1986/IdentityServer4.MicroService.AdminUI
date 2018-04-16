import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    FormArray
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IdentityServer4MicroServiceClient } from 'jixiu.identityserver.angular2';
import { allCountryCodes } from './country-code';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  _loading: boolean = false;

  id: any = 0;

  roles: any = [];

  countryCodes: any;

  validateForm: FormGroup;
      
    constructor(
        private msg: NzMessageService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private api: IdentityServer4MicroServiceClient) {
      this.countryCodes = allCountryCodes;
    }

    ngOnInit() {
        this.initForm();

        this.api.RoleGet().subscribe(r => this.roles = r);

        this.id = parseInt(this.route.snapshot.paramMap.get('id'));

        if (!isNaN(this.id) && this.id > 0)
        {
          this.initData();
        }
    }

    initData()
    {
      this._loading = true;
      this.api.UserDetail(this.id).subscribe(r => {
        this._loading = false;
        this.initFormByData(r.data);
      });
    }

    initForm()
    {
      let _time = new Date();
      let _currentTime = _time.getFullYear() + '-' + (_time.getMonth() + 1) + '-' + _time.getDate();

      this.validateForm = this.fb.group({
        id: [0],
        email: [null, [Validators.email]],
        passwordHash: [null, [Validators.required]],
        userName: [null, [Validators.required]],
        phoneNumberPrefix: ['86'],
        phoneNumber: [null],
        normalizedUserName: [null, [Validators.required]],
        parentUserID: [0, [Validators.required]],

        lineageIDs: [null],
        lineage: [null],
        normalizedEmail: [null, [Validators.required]],
        securityStamp: [null, [Validators.required]],
        concurrencyStamp: [null, [Validators.required]],
        accessFailedCount: [0, [Validators.required]],

        isDeleted: [false],
        emailConfirmed: [false],
        phoneNumberConfirmed: [false],
        twoFactorEnabled: [false],
        lockoutEnd: [null],
        lockoutEnabled: [false],
        avatar: [null],
        roles: [null],
        claims: this.fb.array([]),
        logins: this.fb.array([]),
        tokens: this.fb.array([]),
        properties: this.fb.array([]),

        files: [null],
        nickName: [null],
        gender: [null],
        address: [null],
        birthday: [_currentTime],
        stature: [0],
        weight: [0],
        description: [null],
        createDate: [_currentTime],
        lastUpdateTime: [_currentTime] 
      });
    }

    initFormByData(entity)
    {
      for (var k in entity) {
        let v = entity[k];

        if (k == 'roles') {
          this.validateForm.controls['roles'].setValue(v.map(x=>x.roleId));
          continue;
        }

        else if (k == 'claims') {
          let claimFormGroup = v.map(x => this.fb.group(x));
          let claimFormArray = this.fb.array(claimFormGroup);
          this.validateForm.setControl('claims', claimFormArray);
          continue;
        }

        else if (k == 'logins') {
          let loginFormGroup = v.map(x => this.fb.group(x));
          let loginFormArray = this.fb.array(loginFormGroup);
          this.validateForm.setControl('logins', loginFormArray);
          continue;
        }

        else if (k == 'properties') {
          let propertiesFormGroup = v.map(x => this.fb.group(x));
          let propertiesFormArray = this.fb.array(propertiesFormGroup);
          this.validateForm.setControl('properties', propertiesFormArray);
          continue;
        }

        if (this.validateForm.contains(k)) {

          this.validateForm.controls[k].setValue(v);
        }
      }
    }

    getFormControl(name) {
      if (this.validateForm.controls) {
        return this.validateForm.controls[name];
      }
    }

    get claims(): FormArray {
      return this.validateForm.get('claims') as FormArray;
    }
    addClaim() {
      this.claims.push(this.fb.group({
        id: 0,
        userId: 0,
        claimType: "",
        claimValue: ""
      }));
    }
    delClaim(index)
    {
      this.claims.removeAt(index);
    }

    get properties(): FormArray {
    return this.validateForm.get('properties') as FormArray;
  }
    addProperties() {
    this.properties.push(this.fb.group({
      id: 0,
      key: '',
      value: ''
    }));
  }
    delProperties(index) {
    this.properties.removeAt(index);
  }

    get logins(): FormArray {
      return this.validateForm.get('logins') as FormArray;
    }

    AddOrUpdate() {

      for (const i in this.validateForm.controls){
        this.validateForm.controls[i].markAsDirty();
      }

      if (!this.validateForm.valid) {
        return
      }

      let v = this.validateForm.value;

      if (v.roles != null && v.roles.length > 0)
      {
        v.roles = v.roles.map(x => { return { userId: v.id, roleId: x } });
      }

      v.claims.forEach(x => x.userId = v.id);

      let result = this.id > 0 ? this.api.UserPut(v) : this.api.UserRegister(v);

      let onOK = r =>
      {
        this._loading = false;

        if (r.code == 200)
        {
          this.msg.success('提交成功');
        }

        else
        {
          this.msg.error(r.error_msg);
        }

        this.initData();
      }

      this._loading = true;

      result.subscribe(onOK);
    }

    uploadSuccess(src)
    {
      this.validateForm.controls['avatar'].setValue(src);
    }
}
