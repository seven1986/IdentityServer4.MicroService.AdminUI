import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { MenuService, SettingsService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { debug } from 'util';

@Component({
    selector: 'app-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

    constructor(
private menuService: MenuService,
private authService: AuthService, 
private router: Router,
private settingService: SettingsService,
private aclService: ACLService,) { }

  ngOnInit() {
        let _router = this.router;

        this.authService.endSigninMainWindow().then(user =>
        {
            this.settingService.setUser({
                name: user.profile.name,
                avatar: "./assets/img/zorro.svg",
                email: user.profile.name
          });
          
            if (user.profile.permission) {

              var permissions = user.profile.permission.split(',');

              if (permissions.indexOf('all') > -1) {
                this.aclService.setFull(true);
              }
              else {
                this.aclService.add({
                  role: user.profile.role,
                  ability: permissions
                });

                this.menuService.resume((item) => {
                  item.hide = item.acl && !this.aclService.can(item.acl);
                });
              }
            }
          _router.navigate(['']);

        }).catch(err => {
          console.error(err);
          _router.navigate(['passport/login']);
        });
    }
}
