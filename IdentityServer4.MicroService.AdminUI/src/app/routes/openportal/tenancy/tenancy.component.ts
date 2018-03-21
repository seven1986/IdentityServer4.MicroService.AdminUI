import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ListTable } from '@shared/helper/list-table';
import { IdentityServerClient } from 'shingsou.identityserver';

@Component({
  selector: 'app-tenancy',
  templateUrl: './tenancy.component.html'
})
export class TenancyComponent extends ListTable implements OnInit {

  // filter 
  f: any =
  {
    'q.Host': '',
  };

  listTableHead: any =
  [
    { name: 'name', title:'租户', sort: true },
    { name: 'status', title: '状态', sort: true },
    { name: 'theme', title: '风格', sort: true },
    { name: 'cacheDuration', title: '缓存', sort: true },
    { name: 'identityServerIssuerUri', title: '认证服务器', sort: true },
  ]

  tenantStatus: any = [
    { id: 0, label: '待激活' },
    { id: 1, label: '启用' },
    { id: 2, label: '禁用' }
  ];

  constructor(
    private message: NzMessageService,
    private api: IdentityServerClient) {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  status: any = [];

  confirm = (id) => {
    this.api.tenant_delete(id).subscribe(r => {
      this.message.success('删除成功')
      this.getData();
    });
  }

  getData() {
    if (this._loading) { return; }

    this._loading = true;

    let skip = this.q.pageSize * (this.q.pageIndex - 1);

    this.api.tenant_get(
      this.f['q.Host'],
      this.q.orderby,
      this.q.asc,
      skip,
      this.q.pageSize)
      .subscribe(r => this.vm = r)
      .add(() => { this._loading = false; });
  }

}
