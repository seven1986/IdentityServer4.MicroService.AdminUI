import { Component, OnInit } from '@angular/core';
import { ListTable } from '@shared/helper/list-table';
import { CampaignCoreIdentityClient } from 'campaign.core.identity'
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiResourcesPublishComponent } from '../api-resources-publish/api-resources-publish.component';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-api-resources',
  templateUrl: './api-resources.component.html',
  styleUrls: ['./api-resources.component.scss']
})
export class ApiResourcesComponent extends ListTable implements OnInit {

  // filter 
  f: any =
  {
    'q.Name': '',
  };

  constructor(
    private message: NzMessageService,
    private api: CampaignCoreIdentityClient,
    private modalHelper: ModalHelper,
    public msgSrv: NzMessageService,
    protected http: Http) {
    super();
  }

  products: any = [];
  authServers: any = [];
  supportedClients: any = [];

  ngOnInit() {
    this.api.ApiResourceProducts().subscribe(r => this.products = r.data.value);
    this.api.AuthorizationServers().subscribe(r => this.authServers = r.data.value);
    this.http.get('https://generator.swagger.io/api/gen/clients')
      .map(r => r.ok ? r.json() : r.statusText)
      .subscribe(r => this.supportedClients = r);

    this.getData();
  }

  status: any = [];

  confirm = (id) => {
    this.api.ApiResourceDelete(id).subscribe(r => {
      this.message.success('删除成功')
      this.getData();
    });
  }

  getData() {
    if (this._loading) { return; }

    this._loading = true;

    let skip = this.q.pageSize * (this.q.pageIndex - 1);

    this.api.ApiResourceGet(
      this.f['q.Name'],
      this.q.orderby,
      this.q.asc,
      skip,
      this.q.pageSize)
      .subscribe(r => this.vm = r)
      .add(() => { this._loading = false; });
  }

  edit(aid) {
    this.modalHelper.static(ApiResourcesPublishComponent, { aid, products: this.products, authServers: this.authServers }).subscribe(() => {
      this.msgSrv.info('回调，重新发起列表刷新');
    });
  }

  openPage(id, _type) {
    if (_type == 1)
    {
      window.open('https://portal.ixingban.com/docs/services/' + id);
    }
    else if (_type == 2) {
      window.open('https://portal.ixingban.com/docs/services/' + id + '/export?DocumentFormat=Swagger');
    }
  }
}
