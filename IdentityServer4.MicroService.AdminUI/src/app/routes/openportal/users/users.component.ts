import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ListTable } from '@shared/helper/list-table';
import { IdentityServerClient } from 'shingsou.identityserver';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends ListTable implements OnInit {

  // filter 
  f: any =
  {
    'q.Role': '',
    'q.PhoneNumber': '',
    'q.Name': '',
    'q.Email': '',
  };

  roles: any = { data: [] };

  constructor(
    private message: NzMessageService,
    private api: IdentityServerClient) {
    super(); 
  }

  ngOnInit() {
    this.api.role_get().subscribe(r => this.roles = r);
    this.getData();
  }

  getData() {
    if (this._loading) { return; }
    this._loading = true;
    let skip = this.q.pageSize * (this.q.pageIndex - 1);
    this.api.user_get(
      this.f['q.Role'] || 0,
      this.f['q.PhoneNumber'],
      this.f['q.Name'],
      this.f['q.Email'],
      this.q.orderby,
      this.q.asc,
      skip,
      this.q.pageSize)
      .subscribe(r => this.vm = r)
      .add(() => { this._loading = false; });
  }

  confirm = (id) => {
    this.api.user_delete(id).subscribe(r => {
      this.message.success('删除成功')
      this.getData();
    });
  }
}
