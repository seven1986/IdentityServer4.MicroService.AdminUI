import { Component } from '@angular/core';
import { AuthService } from '../../../routes/oidc/services/auth.service';
import { SettingsService } from '@delon/theme';
import { environment } from '@env/environment';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  //providers: [ SocialService ]
})
export class UserLoginComponent {

  constructor(
    public authService: AuthService,
    private settings: SettingsService)
  {
     
  }

  login() {
    this.authService.startSigninMainWindow();
  }
}
