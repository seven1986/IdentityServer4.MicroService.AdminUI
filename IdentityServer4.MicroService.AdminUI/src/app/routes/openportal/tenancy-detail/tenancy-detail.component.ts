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
  selector: 'app-tenancy-detail',
  templateUrl: './tenancy-detail.component.html',
  styles: []
})
export class TenancyDetailComponent implements OnInit {
  _loading: boolean = false;

  id: any = 0;

  validateForm: FormGroup;

  tenantStatus: any = [
    { id: 0, label: '待激活' },
    { id: 1, label: '启用' },
    { id: 2, label: '禁用' }
  ];

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
    this.api.TenantDetail(this.id).subscribe(r => {
      this._loading = false;
      this.initFormByData(r.data);
    });
  }

  _default_properties = [
    //common configuration
    'WebSite',
    'PortalSite',
    'AdminSite',
    'Keywords',
    'Summary',
    'Description',
    'EnterpriseEmail',
    'Tracking',
    'Favicon',

    // used for auth login
    'Amazon:ClientId',
    'Amazon:ClientSecret',

    'Facebook:ClientId',
    'Facebook:ClientSecret',

    'GitHub:ClientId',
    'GitHub:ClientSecret',

    'Gitter:ClientId',
    'Gitter:ClientSecret',

    'Google:ClientId',
    'Google:ClientSecret',

    'Instagram:ClientId',
    'Instagram:ClientSecret',

    'LinkedIn:ClientId',
    'LinkedIn:ClientSecret',

    'Microsoft:ClientId',
    'Microsoft:ClientSecret',

    'Paypal:ClientId',
    'Paypal:ClientSecret',

    'QQ:ClientId',
    'QQ:ClientSecret',

    'Reddit:ClientId',
    'Reddit:ClientSecret',

    'Salesforce:ClientId',
    'Salesforce:ClientSecret',

    'Twitter:ClientId',
    'Twitter:ClientSecret',

    'Visual Studio Online:ClientId',
    'Visual Studio Online:ClientSecret',

    'Weibo:ClientId',
    'Weibo:ClientSecret',

    'Weixin:ClientId',
    'Weixin:ClientSecret',

    'WordPress:ClientId',
    'WordPress:ClientSecret',


    // used for AzureApiManagement
    'Azure:ApiManagement:Host',
    'Azure:ApiManagement:ApiId',
    'Azure:ApiManagement:ApiKey',
    'Azure:ApiManagement:AuthorizationServerId',
    'Azure:ApiManagement:ProductId',
    'Azure:ApiManagement:PortalUris',
    'Azure:ApiManagement:DelegationKey',


  ];

  initForm() {
    let _time = new Date();
    let _currentTime = _time.getFullYear() + '-' + (_time.getMonth() + 1) + '-' + _time.getDate();

    this.validateForm = this.fb.group({
      id: [0],
      ownerUserId: [0],
      cacheDuration: [3600, Validators.required],
      name: ['default', Validators.required],
      theme: ['default', Validators.required],
      status: [1, Validators.required],
      identityServerIssuerUri: ['ids.ixingban.com', Validators.required],
      createDate: [_currentTime, Validators.required],
      lastUpdateTime: [_currentTime, Validators.required],

      hosts: this.fb.array([
        this.fb.group({ id: 0, appTenantId: 0, hostName: 'localhost:44347' })
      ]),
      claims: this.fb.array([]),
      properties: this.fb.array(
        this._default_properties.map(x => this.fb.group({ 'key': x, 'value': [''], 'default': [true] }))
      ),
    });
  }

  initFormByData(entity) {
    for (var k in entity) {
      let v = entity[k];

      if (k == 'claims') {
        let claimFormGroup = v.map(x => this.fb.group(x));
        let claimFormArray = this.fb.array(claimFormGroup);
        this.validateForm.setControl('claims', claimFormArray);
        continue;
      }

      else if (k == 'properties') {
        let propertyFormGroup = v.map(x =>
        {
          if (this._default_properties.indexOf(x.key) > -1) {
            x['default'] = true;
          }
          return this.fb.group(x)
        });

        let propertyFormArray = this.fb.array(propertyFormGroup);

        this.validateForm.setControl('properties', propertyFormArray);

        continue;
      }

      else if (k == 'hosts') {
        let hostFormGroup = v.map(x => this.fb.group(x));
        let hostFormArray = this.fb.array(hostFormGroup);
        this.validateForm.setControl('hosts', hostFormArray);
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
      appTenantId: 0,
      claimType: '',
      claimValue: '',
    }));
  }
  delClaim(index) {
    this.claims.removeAt(index);
  }

  get properties(): FormArray {
    return this.validateForm.get('properties') as FormArray;
  }
  addProperty() {
    this.properties.push(this.fb.group({
      id: 0,
      appTenantId: 0,
      key: '',
      value: '',
    }));
  }
  delProperty(index) {
    this.properties.removeAt(index);
  }

  get hosts(): FormArray {
    return this.validateForm.get('hosts') as FormArray;
  }
  addHost() {
    this.hosts.push(this.fb.group({
      id: 0,
      appTenantId: 0,
      hostName: ''
    }));
  }
  delHost(index) {
    this.hosts.removeAt(index);
  }

  AddOrUpdate() {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    if (!this.validateForm.valid) {
      return
    }

    let v = this.validateForm.value;

    let result = this.id > 0 ? this.api.TenantPut(v) : this.api.TenantPost(v);

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
