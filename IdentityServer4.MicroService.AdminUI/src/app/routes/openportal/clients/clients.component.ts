import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ListTable } from '@shared/helper/list-table';
import { CampaignCoreIdentityClient } from 'campaign.core.identity'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent extends ListTable implements OnInit {


  constructor(
    private message: NzMessageService,
    private api: CampaignCoreIdentityClient) {
      super(); 
  }

  ngOnInit() {
    this.getData();
  }

  status:any=[];

  confirm = (id) => {
    this.api.ClientDelete(id).subscribe(r => {
      this.message.success('删除成功')
      this.getData();
    });
  }

  getData() {
    if (this._loading) { return; }

    this._loading = true;

    let skip = this.q.pageSize * (this.q.pageIndex - 1);

    this.api.ClientGet('', '', this.q.orderby, this.q.asc, skip, this.q.pageSize)
      .subscribe(r => this.vm = r)
      .add(() => { this._loading = false; });
  }


}
