import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { I18NService } from '../i18n/i18n.service';
import { AuthService } from '../../routes/oidc/services/auth.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import "rxjs/add/Observable/empty";
import 'rxjs/add/observable/fromPromise';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private injector: Injector,
        private authService: AuthService) { }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            this.httpClient.get('assets/app-data.json')
                           .subscribe((res: any) => {
                               // 应用信息：包括站点名、描述、年份
                                this.settingService.setApp(res.app);
                                // 用户信息：包括姓名、头像、邮箱地址
                                // this.settingService.setUser(res.user);
                                // ACL：设置权限为全量
                                // this.aclService.setFull(true);
                                // 初始化菜单
                                this.menuService.add(res.menu);
                                // i18n：设置默认语言
                                this.i18n.use(this.settingService.layout.lang);
                                // 设置页面标题的后缀
                                this.titleService.suffix = res.app.name;

                                // 如果已经登陆，设置权限和重置菜单
                                this.authService.isLoggedInObs().filter(islogined => !!islogined).subscribe(() => {

                                  let p = this.authService.user.profile;

                                  this.settingService.setUser({
                                    name: p.name,
                                    avatar: "./assets/img/zorro.svg",
                                    email: p.name
                                  });

                                  if (p.permission == 'all') {
                                    this.aclService.setFull(true);
                                  }
                                  else {
                                    this.aclService.add({
                                      role: p.role,
                                      ability: p.permission.split(' ')
                                    });
                                  }

                                  this.menuService.resume((item) => {
                                    item.hide = item.acl && !this.aclService.can(item.acl);
                                  });
                                });

                                resolve(res);
                            }, (err: HttpErrorResponse) => {
                                resolve(null);
                            });
        });
    }
}
