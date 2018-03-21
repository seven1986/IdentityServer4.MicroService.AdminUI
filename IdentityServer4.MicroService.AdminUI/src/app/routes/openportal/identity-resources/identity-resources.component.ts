import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ListTable } from '@shared/helper/list-table';
import { IdentityServerClient } from 'shingsou.identityserver';

@Component({
  selector: 'app-identity-resources',
  templateUrl: './identity-resources.component.html',
  styleUrls: ['./identity-resources.component.scss']
})
export class IdentityResourcesComponent extends ListTable implements OnInit {

// filter 
  f: any =
  {
    'q.Name': '',
  };

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
    this.api.identityresource_delete(id).subscribe(r => {
      this.message.success('删除成功')
      this.getData();
    });
  }

  getData() {
    if (this._loading) { return; }

    this._loading = true;

    let skip = this.q.pageSize * (this.q.pageIndex - 1);

    this.api.identityresource_get(
      this.f['q.Name'],
      this.q.orderby,
      this.q.asc,
      skip,
      this.q.pageSize)
      .subscribe(r => this.vm = r)
      .add(() => { this._loading = false; });
  }

}
