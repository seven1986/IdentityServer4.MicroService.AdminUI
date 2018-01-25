import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { CampaignCoreIdentityClient } from 'campaign.core.identity';

@Component({
  selector: 'app-api-resources-publish',
  templateUrl: './api-resources-publish.component.html',
  styles: []
})
export class ApiResourcesPublishComponent implements OnInit {
  aid: any;
  products: any;
  authServers: any;
  loading = false;

  vm: any = {
    id: 0,
    productId: '',
    swaggerUrl: '',
    suffix: '',
    authorizationServerId: '',
    scope: '',
    openid: '',
    policy: '',
  };

  policyExample = `<policies>
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
               </policies>`;

  constructor(
    private api: CampaignCoreIdentityClient,
    private subject: NzModalSubject,
    public msgSrv: NzMessageService,) { }

  ngOnInit() {
    this.vm.id = this.aid;
    this.getData();
  }

  getData() {
    if (this.loading == true) { return; }

    this.loading = true;

    this.api.ApiResourcePublishSetting(this.aid).subscribe(r => { this.loading = false; if (r.data) { this.vm = r.data; }});
  }

  close() {
    this.subject.destroy();
  }

  save() {
    if (this.loading == true) { return; }
    this.loading = true;
    this.api.ApiResourcePublish(this.vm).subscribe(r => {
      this.loading = false;
      this.msgSrv.success('保存成功，只是模拟，实际未变更');
      this.subject.next('true');
      this.close();
    })
  }
}
