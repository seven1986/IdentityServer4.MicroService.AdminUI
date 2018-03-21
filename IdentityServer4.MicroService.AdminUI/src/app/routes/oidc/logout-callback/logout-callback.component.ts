import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
    selector: 'app-logout-callback',
    templateUrl: './logout-callback.component.html',
    styleUrls: ['./logout-callback.component.css']
})
export class LogoutCallbackComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        let _router = this.router;
      this.authService.endSignoutMainWindow().then(res => {
            _router.navigate(['passport/login']);
      }).catch(err => {
        debugger
        console.error(err);
        _router.navigate(['passport/login']);
        });
    }
}
