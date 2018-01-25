import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../oidc/services/auth.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {

    data: any;
    onloading: boolean = false;

    constructor(
        private auth: AuthService) { }

    ngOnInit() {
    }

    ddd() {
       
    }
}
