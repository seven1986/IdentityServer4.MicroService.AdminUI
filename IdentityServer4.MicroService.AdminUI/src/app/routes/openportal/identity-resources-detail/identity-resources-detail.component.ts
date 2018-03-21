import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IdentityServerClient } from 'shingsou.identityserver';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-identity-resources-detail',
  templateUrl: './identity-resources-detail.component.html',
  styles: []
})
export class IdentityResourcesDetailComponent implements OnInit {

  _loading: boolean = false;

  id: any = 0;

  validateForm: FormGroup;

  constructor(
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private api: IdentityServerClient) {
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
    this.api.identityresource_detail(this.id).subscribe(r => {
      this._loading = false;
      this.initFormByData(r.data);
    });
  }

  initForm() {
    this.validateForm = this.fb.group({
      id: [0],
      name: [null, [Validators.required]],
      displayName: [null],

      enabled: [false],
      required: [false],
      emphasize: [false],
      showInDiscoveryDocument: [false],
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

  AddOrUpdate() {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    if (!this.validateForm.valid) {
      return
    }

    let v = this.validateForm.value;
  
    v.userClaims.forEach(x => x.id = v.id);

    let result = this.id > 0 ? this.api.identityresource_put(v) : this.api.identityresource_post(v);

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
