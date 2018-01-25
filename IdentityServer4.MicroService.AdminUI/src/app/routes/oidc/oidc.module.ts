import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { LogoutCallbackComponent } from './logout-callback/logout-callback.component';

const appRoutes: Routes = [
    { path: 'auth-callback', component: AuthCallbackComponent },
    { path: 'logout-callback', component: LogoutCallbackComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        NgZorroAntdModule,
    ],
    declarations: [AuthCallbackComponent, LogoutCallbackComponent]
})
export class OidcModule { }
