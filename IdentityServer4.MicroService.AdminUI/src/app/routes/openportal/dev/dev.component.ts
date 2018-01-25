import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../oidc/services/auth.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit, OnDestroy {

    _user: any;
    loadedUserSub: any;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {

        this.loadedUserSub = this.authService.userLoadededEvent
            .subscribe(user => {
                this._user = user;
            });

        this.authService.getUser();
    }

    ngOnDestroy() {
        if (this.loadedUserSub.unsubscribe()) {
            this.loadedUserSub.unsubscribe();
        }
    }
}
