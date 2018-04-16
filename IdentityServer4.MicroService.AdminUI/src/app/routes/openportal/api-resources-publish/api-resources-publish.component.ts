import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { IdentityServer4MicroServiceClient } from 'jixiu.identityserver.angular2';
import { copy } from '@delon/abc';
import { debug } from 'util';

@Component({
  selector: 'app-api-resources-publish',
  templateUrl: './api-resources-publish.component.html',
  styles: []
})
export class ApiResourcesPublishComponent implements OnInit {
  aid: any;
  products: any;
  authServers: any;

  vm: any = {
    productId: '',
    swaggerUrl: '',
    suffix: '',
    authorizationServerId: '',
    scope: '',
    openid: '',
    policy: `<policies>
                 <inbound>
                   <cors>
                     <allowed-origins>
                       <origin>*</origin>
                     </allowed-origins>
                     <allowed-methods>
                         <method>*</method>
                     </allowed-methods>
                     <allowed-headers>
                       <header>*</header>
                     </allowed-headers>
                   </cors>
                 </inbound>
                 <backend>
                   <base />
                 </backend>
                 <outbound>
                   <base />
                 </outbound>
               </policies>`,
    selectedRevision: '',
    selectedVersion: '',
    newVersionNumber:''
  };
  versions: any = [];
  subscriptions: any = [];

  constructor(
    private api: IdentityServer4MicroServiceClient,
    private subject: NzModalService,
    public msgSrv: NzMessageService,) { }

  ngOnInit() {
    this.getPublishConfiguration();
    this.getVersions();
  }

  loading_getPublishConfiguration: boolean = false;
  getPublishConfiguration() {
    if (this.loading_getPublishConfiguration == true) { return; }
    this.loading_getPublishConfiguration = true;
    this.api.ApiresourcePublishconfiguration(this.aid).subscribe(r => {
      this.loading_getPublishConfiguration = false;
      if (r.data) {
        this.vm = r.data;
      }
    });
  }

  loading_getVersions: boolean = false;
  getVersions() {
    if (this.loading_getVersions == true) { return; }
    this.loading_getVersions = true;
    this.api.ApiresourceVersions(this.aid).subscribe(r => {
      this.loading_getVersions = false;
      if (r.data) {
        r.data.forEach(v => {
          v.revisions = v.revisions.sort(r => r.apiRevision);
        });
        this.versions = r.data;
      }
    });
  }

  loading_getReleases: boolean = false;
  getReleases()
  {
    if (this.versions.length < 1) { this.loading_getReleases = false; return; }

    if (this.loading_getReleases == true) { return; }

    this.loading_getReleases = true;

    this.versions.forEach((v,index) =>
    {
      this.api.ApiresourceReleases(this.aid, v.id.replace('/apis/', '')).subscribe(x =>
      {
        if (index+1 == this.versions.length) { this.loading_getReleases = false;}
        v.releases = x.data;
      });
    });
  }

  loading_getSubscriptions: boolean = false;
  getSubscriptions() {
    if (this.loading_getSubscriptions == true) { return; }
    this.loading_getSubscriptions = true;
    this.api.ApiresourceSubscriptions(this.aid).subscribe(r => {
      this.loading_getSubscriptions = false;
      this.subscriptions = r.data;
    });
  }

  close() {
    this.subject.closeAll();
  }

  loading_publish: boolean = false;
  publish() {

    if (this.loading_publish == true) { return; }

    let onOk = r => {
      this.loading_publish = false;
      this.msgSrv.success('发布成功');
      this.close();
    };

    // 首次发布
    if (this.versions.length < 1)
    {
      this.msgSrv.success('首次发布');
      this.loading_publish = true;
      this.api.ApiresourcePublish(this.aid,
        {
          name: this.vm.name,
          description: this.vm.description,
          apiId: this.aid,
          suffix: this.vm.suffix,
          swaggerUrl: this.vm.swaggerUrl,
          productId: this.vm.productId,
          authorizationServerId: this.vm.authorizationServerId,
          scope: this.vm.scope,
          openid: this.vm.openid,
          policy: this.vm.policy,
        }).subscribe(onOk);
    }
    else
    {

      // 发布新版本
      if (this.vm.selectedVersion == 'newVersion')
      {
        if (this.vm.newVersionNumber == undefined)
        {
          this.msgSrv.error('请填写新的版本号');
          return;
        }

        var model = {
          revisionId: '',
          apiVersionName: this.vm.newVersionNumber
        };

        //新版本的设置默认从最后一个版本获取
        let lastVersionRevisions = this.versions[this.versions.length - 1].revisions;
        model.revisionId = lastVersionRevisions[lastVersionRevisions.length - 1].apiId.replace('/apis/', '');

        this.loading_publish = true;
        this.api.ApiresourcePublishversion(this.aid, model).subscribe(onOk);
      }

      else
      {
        if (this.vm.selectedVersion == undefined) {
          this.msgSrv.error('请选择版本');
          return;
        }

        // 发新修订版
        if (this.vm.selectedVersion.indexOf('.newRevision') > -1)
        {
          this.msgSrv.success('发布新修订版');
          var apiId = this.vm.selectedVersion.split('.newRevision')[0].replace('/apis/','');

          this.loading_publish = true;
          this.api.ApiresourcePublishrevision(this.aid,
            {
              apiId: apiId,
              swaggerUrl: this.vm.swaggerUrl,
              releaseNote: ''
            }).subscribe(onOk);
        }

        // 更新指定版本
        else {
          
          this.msgSrv.success('更新指定版本');

          this.loading_publish = true;
          this.api.ApiresourcePublish(this.aid,
            {
              name: this.vm.name,
              description: this.vm.description,
              apiId: this.vm.selectedVersion.replace('/apis/',''),
              suffix: this.vm.suffix,
              swaggerUrl: this.vm.swaggerUrl
            }).subscribe(onOk);
        }
      }
    }
  }

  onCopy(txt) {
    copy(txt).then(() => this.msgSrv.success('拷贝成功'));
  }

  releaseRevision(aid)
  {
    this.api.ApiresourceSetonlineversion(this.aid, aid.replace('/apis/', '')).subscribe(x => {
      if (x.code == 200) { this.msgSrv.success('上线成功'); this.getVersions(); }
      else {
        this.msgSrv.error(x.message);
      }
    });
  }
  releasesItem: any = [];
  createRelease(aid,itemIndex) {
    let notes = this.releasesItem[itemIndex];
    this.api.ApiresourcePostrelease(this.aid, { aid: aid.replace('/apis/',''), notes: notes }).subscribe(x => {
      if (x.code == 200) { this.msgSrv.success('创建成功'); this.getReleases();}
      else
      {
        this.msgSrv.error(x.message);
      }
    });
  }
  updateRelease(item) {
    var ids = item.id.split('/');
    this.api.ApiresourcePutrelease(this.aid, ids[ids.length - 1], { notes: item.notes }).subscribe(x => {
      if (x.code == 200) { this.msgSrv.success('更新成功'); this.getReleases();}
      else {
        this.msgSrv.error(x.message);
      }
    });;
  }
  removeRelease(releaseId) {
    var ids = releaseId.split('/');
    this.api.ApiresourceDeleterelease(this.aid, ids[ids.length - 1]).subscribe(x => {
      if (x.code == 200) { this.msgSrv.success('删除成功'); this.getReleases(); }
      else {
        this.msgSrv.error(x.message);
      }
    });
  }

  releasePackage(aid, language = 0) {
    this.api.CodegenReleasesdk({
      platform: 0,
      language: language,
      apiId: this.aid,
      swaggerUrl: 'https://portal.ixingban.com/docs/services/' + aid.replace('/apis/', '') + '/export?DocumentFormat=Swagger'
    }).subscribe(r => {
      if (r.code == 200) { this.msgSrv.success('发布成功'); }
      else {
        this.msgSrv.error(r.message);
      }
    });
  }

  openPage(aid) {
      window.open('https://portal.ixingban.com/docs/services/' + aid.replace('/apis/',''));
  }

  loading_getNPMOptions: boolean = false;
  npmOptions: any = {};
  npmOptionsLanguageKey = 0;
  getNPMOptions()
  {
    if (this.loading_getNPMOptions == true) { return; }

    this.loading_getNPMOptions = true;

    this.api.CodegenNpmoptions(this.aid, this.npmOptionsLanguageKey).subscribe(r =>
    {
      this.loading_getNPMOptions = false;
      if (r.code == 200) {
        this.npmOptions = r.data;
      } else {
        this.msgSrv.error(r.message);
      }
    });
  }
  setNPMOptions() {
    if (this.loading_getNPMOptions == true) { return; }

    this.loading_getNPMOptions = true;

    this.api.CodegenPutnpmoptions(this.aid, this.npmOptionsLanguageKey, this.npmOptions).subscribe(r =>
    {
      this.loading_getNPMOptions = false;
      if (r.code == 200) { this.msgSrv.success('更新成功'); this.getReleases(); }
      else {
        this.msgSrv.error(r.message);
      }
    });
  }
}
