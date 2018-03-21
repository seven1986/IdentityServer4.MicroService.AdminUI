import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    FormArray
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//import { CampaignCoreIdentityClient } from 'campaign.core.identity';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
    selector: 'bisq-detail',
    templateUrl: './bisq-detail.component.html',
    styleUrls: ['./bisq.component.scss']
})
export class BisqDetailComponent implements OnInit {
    _loading: boolean = false;

    id: any = 0;

    roles: any = [];
    gameinstance;
    countryCodes: any;
    initUpdate;
    validateForm: FormGroup;
    public publish: any = {};
    public update: any = {};
    constructor(
        private msg: NzMessageService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,) {
    }

    ngOnInit() {
        this.initForm();
        //this.initData();
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));

        if (!isNaN(this.id) && this.id > 0) {
            this.initData();
        }
    }

    initData() {
        this._loading = true;
       
        //this.api.AdminGameInstance('874539ee-e130-11e6-80c2-00155d454321').subscribe(r => {
        //    this._loading = false;
        //    this.gameinstance = r.dataArray;
        //    this.initFormByData(r.dataArray);
        //    for (let i = 0; i < r.dataArray.length; i++) {
        //        if (r.dataArray[i].instanceId == this.id) {
        //            this.update = r.dataArray[i];
        //        }
        //    }
        //});
        
    }

    initForm() {

        this.validateForm = this.fb.group({
            instanceId: [0],
            gameId: ["874539ee-e130-11e6-80c2-00155d454321"],
            instanceType: [1],
            instanceName: [null, [Validators.required]],
            instanceDetails: [null, [Validators.required]],
            instanceRules: [null, [Validators.required]],
            instanceInstructions: [null, [Validators.required]],
            rankingExpired: [1],
            rankingKeepHighest: [true],
            status: [1],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            createDate: [null, [Validators.required]],
            createUser: [null, [Validators.required]],
            updateDate: [null, [Validators.required]],
            updateUser: [null, [Validators.required]],
            isDeleted: [false],
            isApproved: [true],
        });
    }

    initFormByData(entity) {
        for (var k in entity) {
            let v = entity[k];

            //if (k == 'roles') {
            //    this.validateForm.controls['roles'].setValue(v.map(x => x.roleId));
            //    continue;
            //}

            //else if (k == 'claims') {
            //    let claimFormGroup = v.map(x => this.fb.group(x));
            //    let claimFormArray = this.fb.array(claimFormGroup);
            //    this.validateForm.setControl('claims', claimFormArray);
            //    continue;
            //}

            //else if (k == 'logins') {
            //    let loginFormGroup = v.map(x => this.fb.group(x));
            //    let loginFormArray = this.fb.array(loginFormGroup);
            //    this.validateForm.setControl('logins', loginFormArray);
            //    continue;
            //}

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
            id: null,
            userId: null,
            claimType: "",
            claimValue: ""
        }));
    }
    delClaim(index) {
        this.claims.removeAt(index);
    }

    get logins(): FormArray {
        return this.validateForm.get('logins') as FormArray;
    }

    AddOrUpdate() {

        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
 
        }

        if (!this.validateForm.valid) {
            return
        }

        let v = this.validateForm.value;
        console.log(this.validateForm.value +'1');
        if (v.roles != null && v.roles.length > 0) {
            v.roles = v.roles.map(x => { return { userId: v.id, roleId: x } });
        }

        //v.claims.forEach(x => x.userId = v.id);

        //let result = this.id > 0 ? this.api.UserPut(v) : this.api.UserPost(v);

        let onOK = r => {
            this._loading = false;

            if (r.code == 200) {
                //this.submit();
                this.msg.success('提交成功');
            }

            else {
                this.msg.error(r.error_msg);
            }

            this.initData();
        }

        //this._loading = true;

        //result.subscribe(onOK);
    }
    submit() {
        if (!isNaN(this.id) && this.id > 0) {
            //更新
            this.validateForm.value.instanceId = this.update.instanceId;
            //this.api.AdminGameEditInstance(this.validateForm.value).subscribe(x => {
            //    this.initUpdate = x;
            //    this.initData();
            //    this._loading = false;
            //})
        } else {
            //创建
            

            this.validateForm.value.instanceId = 0;
            //this.api.AdminGamePostInstance(this.validateForm.value).subscribe(r => {
            //    this.publish = r;
            //    this.router.navigate(['/game/bisq']);
            //});
        }
    }
    //图片上传
    uploadSuccess(src) {
        this.validateForm.controls['avatar'].setValue(src);
    }
}
