import { Component, OnInit, Inject } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../../../../routes/oidc/services/auth.service';
import { SettingsService } from '@delon/theme';

@Component({
    selector: 'header-user',
    template: `
   <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
            {{settings.user.name}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
            <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent implements OnInit {
  constructor(
    private confirmServ: NzModalService,
    private authService: AuthService,
    public settings: SettingsService) {}

    ngOnInit(): void {
    
    }

  logout() {
    let t = this;
    this.confirmServ.confirm({
      nzTitle: '提示',
      nzContent: '是否确认退出？',
      nzOkText: '确认',
      nzCancelText: '取消',
      nzOnOk: () => { t.authService.startSignoutMainWindow(); }
    });
    }
}
