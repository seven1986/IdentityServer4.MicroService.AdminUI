import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './auth.service'
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate()
    {
        let isLoggedIn = this.authService.isLoggedInObs();

        isLoggedIn.subscribe((loggedin) => {
            if (!loggedin) {
                this.authService.startSigninMainWindow();
            }
        });
        return isLoggedIn;
    }
}
