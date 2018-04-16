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
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-api-resources-detail',
  templateUrl: './api-resources-detail.component.html',
  styles: ['./api-resources-detail.component.scss']
})
export class ApiResourcesDetailComponent implements OnInit {
  _loading: boolean = false;

  id: any = 0;

  validateForm: FormGroup;

  constructor(
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private api: IdentityServer4MicroServiceClient) {
  }

  ngOnInit() {
    this.initForm();

    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(this.id) && this.id > 0) {
      this.initData();
    }
  }

  initData() {
    this._loading = true;
    this.api.ApiresourceDetail(this.id).subscribe(r => {
      this._loading = false;
      this.initFormByData(r.data);
    });
  }

  initForm() {
    this.validateForm = this.fb.group({
      id: [0],
      name: [null, [Validators.required]],
      displayName: [null],
      description: [null],

      enabled: [false],
      scopes: this.fb.array([]),
      secrets: this.fb.array([]),
      userClaims: this.fb.array([]),
    });
  }

  initFormByData(entity) {
    for (var k in entity) {
      let v = entity[k];
      if (k == 'userClaims') {
        let claimFormGroup = v.map(x => this.fb.group(x));
        let claimFormArray = this.fb.array(claimFormGroup);
        this.validateForm.setControl('userClaims', claimFormArray);
        continue;
      }
      else if (k == 'scopes') {

        // 改造点
        let scopeFormGroup = v.map(x => {
          let userClaimsGroup = x.userClaims.map(xx => {
            let _g = this.fb.group(xx);
            _g.get('type').setValidators(Validators.required);
            return _g;
          });
          let userClaimsArray = this.fb.array(userClaimsGroup)
          let scopeGroup = this.fb.group(x);
          scopeGroup.setControl('userClaims', userClaimsArray);
          return scopeGroup;
        });

        let scopeFormArray = this.fb.array(scopeFormGroup);
        this.validateForm.setControl('scopes', scopeFormArray);
        continue;
      }
      else if (k == 'secrets') {
        let secretFormGroup = v.map(x => this.fb.group(x));
        let secretFormArray = this.fb.array(secretFormGroup);
        this.validateForm.setControl('secrets', secretFormArray);
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

  get userClaims(): FormArray {
    return this.validateForm.get('userClaims') as FormArray;
  }
  addClaim() {
    this.userClaims.push(this.fb.group({
      id: 0,
      type: ""
    }));
  }
  delClaim(index) {
    this.userClaims.removeAt(index);
  }

  get scopes(): FormArray {
    return this.validateForm.get('scopes') as FormArray;
  }
  addScope() {
    this.scopes.push(this.fb.group(
      {
        id: 0,
        name: '',
        displayName: '',
        description: '',
        required: false,
        emphasize: false,
        showInDiscoveryDocument: true,
        userClaims: []
      }));
  }
  delScope(index) {
    this.scopes.removeAt(index);
  }

  addScopeOfUserClaims(scopeItem) {
    let userClaims = scopeItem.get('userClaims');
    userClaims.push(this.fb.group(
      {
        id: 0,
        type: ['', Validators.required]
      }));
  }
  delScopeOfUserClaims(scopeItem,index) {
    let userClaims = scopeItem.get('userClaims');
    userClaims.removeAt(index);
  }

  get secrets(): FormArray {
    return this.validateForm.get('secrets') as FormArray;
  }
  addSecret() {
    this.secrets.push(this.fb.group(
      {
        description: null,
        expiration: null,
        id: 0,
        type: "SharedSecret",
        value: ''
      }));
  }
  delSecret(index) {
    this.secrets.removeAt(index);
  }

  AddOrUpdate() {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    if (!this.validateForm.valid) {
      return
    }

    let v = this.validateForm.value;

    let result = this.id > 0 ? this.api.ApiresourcePut(v) : this.api.ApiresourcePost(v);

    let onOK = r => {
      this._loading = false;

      if (r.code == 200) {
        this.msg.success('提交成功');
      }

      else {
        this.msg.error(r.error_msg);
      }

      this.initData();
    }

    this._loading = true;

    result.subscribe(onOK);
  }
}
