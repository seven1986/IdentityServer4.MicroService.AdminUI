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
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styles: [`
.cardItem{ border-bottom: solid 1px #eee;
    margin-bottom: 15px;}
.mgbtm15{margin-bottom: 15px}
`]
})
export class ClientsDetailComponent implements OnInit {
  _loading: boolean = false;

  id: any = 0;

  allowedGrantTypes: any =
  [
    { label: 'implicit', grantType: 'implicit' },
    { label: 'implicit&client_credentials', grantType: 'client_credentials&implicit' },
    { label: 'code', grantType: 'authorization_code' },
    { label: 'code&client_credentials', grantType: 'authorization_code&client_credentials' },
    { label: 'hybrid', grantType: 'hybrid' },
    { label: 'hybrid&client_credentials', grantType: 'client_credentials&hybrid' },
    { label: 'password', grantType: 'password' },
    { label: 'password&client_credentials', grantType: 'client_credentials&password' },
    { label: 'client_credentials', grantType: 'client_credentials' },
  ];

  accessTokenType: any = [
    { id: 0, name: 'Jwt' },
    { id: 1, name: 'Reference' }];

  protocolTypes: any = [
    { id: 'oidc', name: 'OpenIdConnect' },
    { id: 'wsfed', name: 'WsFederation' },
    { id: 'saml2p', name: 'Saml2p' }];

  tokenTypes: any = [
    { id: 'id_token', name: 'IdentityToken' },
    { id: 'access_token', name: 'AccessToken' }];

  tokenExpiration: any = [
    { id: 0, name: 'Sliding' },
    { id: 1, name: 'Absolute' }];

  tokenUsage: any = [
    { id: 0, name: 'ReUse' },
    { id: 1, name: 'OneTimeOnly' }];

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

        if (!isNaN(this.id) && this.id > 0)
        {
          this.initData();
        }
    }

    initData()
    {
      this._loading = true;
      this.api.ClientDetail(this.id).subscribe(r => {
        this._loading = false;
        this.initFormByData(r.data);
      });
    }

    initForm()
    {
        this.validateForm = this.fb.group({
            id: [0],
            enabled: [true],
            clientId: [null, [Validators.required]],
            protocolType: ['oidc', [Validators.required]],

            requireClientSecret: [true],
            clientName: [null, [Validators.required]],
            description: [null],
            clientUri: [null],
            logoUri: [null],
            requireConsent: [true],
            allowRememberConsent: [true],
            alwaysIncludeUserClaimsInIdToken: [true],
          
            requirePkce: [false],
            allowPlainTextPkce: [false],
            allowAccessTokensViaBrowser: [true],

            frontChannelLogoutUri: [null],
            frontChannelLogoutSessionRequired: [false],
            backChannelLogoutUri: [null],
            backChannelLogoutSessionRequired: [false],
            allowOfflineAccess: [true],
            identityTokenLifetime: [300],
            accessTokenLifetime: [3600],
            authorizationCodeLifetime: [300],
            consentLifetime: [null],
            absoluteRefreshTokenLifetime: [2592000],
            slidingRefreshTokenLifetime: [1296000],
            refreshTokenUsage: [1],
            updateAccessTokenClaimsOnRefresh: [false],
            refreshTokenExpiration: [1],
            accessTokenType: [0],
            enableLocalLogin: [true],

            includeJwtId: [false],

            claims: this.fb.array([]),
            allowedCorsOrigins: this.fb.array([]),
            properties: this.fb.array([]),
            redirectUris: this.fb.array([]),
            postLogoutRedirectUris: this.fb.array([]),
            identityProviderRestrictions: this.fb.array([]),
            allowedScopes: this.fb.array([]),
            clientSecrets: this.fb.array([]),
            allowedGrantTypes: [null],

            alwaysSendClientClaims: [true],
            clientClaimsPrefix: [null],
            pairWiseSubjectSalt: [null],
        });
    }

    initFormByData(entity)
    {
      let arrProperties = [
        'claims',
        'allowedCorsOrigins',
        'properties',
        'redirectUris',
        'postLogoutRedirectUris',
        'identityProviderRestrictions',
        'allowedScopes',
        'clientSecrets'];


      for (var k in entity)
      {
        if (k == undefined || entity[k] == null) { continue }

        if (k == 'allowedGrantTypes') {
          let valueStr = entity[k].map(x => x.grantType).sort().join('&');
          this.validateForm.controls['allowedGrantTypes'].setValue(valueStr);
          continue;
        }

        if (arrProperties.indexOf(k) > -1 && entity[k].length > 0) {
          let P_formGroup = entity[k].map(x => this.fb.group(x));
          let P_formArray = this.fb.array(P_formGroup);
          this.validateForm.setControl(k, P_formArray);
          continue;
        }

        if (this.validateForm.contains(k)) {
          try {
            this.validateForm.controls[k].setValue(entity[k]);
          }
          catch (err)
          {
            debugger
          }
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

    get clientSecrets(): FormArray {
      return this.validateForm.get('clientSecrets') as FormArray;
    }
    addClientSecrets() {
      this.clientSecrets.push(this.fb.group({
        description: null,
        expiration: null,
        id: 0,
        type: "SharedSecret",
        value: "",
      }));
    }
    delClientSecrets(index) {
      this.clientSecrets.removeAt(index);
    }

    get redirectUris(): FormArray {
      return this.validateForm.get('redirectUris') as FormArray;
    }
    addRedirectUris() {
      this.redirectUris.push(this.fb.group({
        id: 0,
        redirectUri: ""
      }));
    }
    delRedirectUris(index) {
      this.redirectUris.removeAt(index);
    }

    get allowedScopes(): FormArray {
      return this.validateForm.get('allowedScopes') as FormArray;
    }
    addAllowedScopes() {
      this.allowedScopes.push(this.fb.group({
        id: 0,
        scope: ""
      }));
    }
    delAllowedScopes(index) {
      this.allowedScopes.removeAt(index);
    }

    get postLogoutRedirectUris(): FormArray {
      return this.validateForm.get('postLogoutRedirectUris') as FormArray;
    }
    addPostLogoutRedirectUris() {
      this.postLogoutRedirectUris.push(this.fb.group({
        id: 0,
        postLogoutRedirectUri: ""
      }));
    }
    delPostLogoutRedirectUris(index) {
      this.postLogoutRedirectUris.removeAt(index);
    }

    get identityProviderRestrictions(): FormArray {
      return this.validateForm.get('identityProviderRestrictions') as FormArray;
    }
    addIdentityProviderRestrictions() {
      this.identityProviderRestrictions.push(this.fb.group({
        id: 0,
        provider: ""
      }));
    }
    delIdentityProviderRestrictions(index) {
      this.identityProviderRestrictions.removeAt(index);
    }

    get allowedCorsOrigins(): FormArray {
      return this.validateForm.get('allowedCorsOrigins') as FormArray;
    }
    addAllowedCorsOrigins() {
      this.allowedCorsOrigins.push(this.fb.group({
        id: 0,
        origin: ""
      }));
    }
    delAllowedCorsOrigins(index) {
      this.allowedCorsOrigins.removeAt(index);
    }

    get properties(): FormArray {
      return this.validateForm.get('properties') as FormArray;
    }
    addProperties() {
      this.properties.push(this.fb.group({
        id: 0,
        key: '',
        value:''
      }));
    }
    delProperties(index) {
      this.properties.removeAt(index);
    }
  
    AddOrUpdate() {

      for (const i in this.validateForm.controls){
        this.validateForm.controls[i].markAsDirty();
      }

      if (!this.validateForm.valid) {
        return
      }

      let v = this.validateForm.value;

      v.allowedGrantTypes = v.allowedGrantTypes.split('&').map(x => { return { grantType: x } });

      let result = this.id > 0 ? this.api.ClientPut(v) : this.api.ClientPost(v);

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
      this.validateForm.controls['logoUri'].setValue(src);
    }
}
