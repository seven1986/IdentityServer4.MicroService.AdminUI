import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

// Campaign Core Identity SDK
import { IdentityServerClient } from 'shingsou.identityserver';

import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { ApiResourcesComponent } from './api-resources/api-resources.component';
import { IdentityResourcesComponent } from './identity-resources/identity-resources.component';
import { DevComponent } from './dev/dev.component';

import { IdentityResourcesDetailComponent } from './identity-resources-detail/identity-resources-detail.component';
import { ApiResourcesDetailComponent } from './api-resources-detail/api-resources-detail.component';
import { TenancyComponent } from './tenancy/tenancy.component';
import { TenancyDetailComponent } from './tenancy-detail/tenancy-detail.component';
import { ApiResourcesPublishComponent } from './api-resources-publish/api-resources-publish.component';

const appRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'users/detail/:id', component: UsersDetailComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'clients/detail/:id', component: ClientsDetailComponent },
    { path: 'apiresources', component: ApiResourcesComponent },
    { path: 'apiresources/detail/:id', component: ApiResourcesDetailComponent },
    { path: 'identityresources', component: IdentityResourcesComponent },
    { path: 'identityresources/detail/:id', component: IdentityResourcesDetailComponent },
    { path: 'tenancy', component: TenancyComponent },
    { path: 'tenancy/detail/:id', component: TenancyDetailComponent },
    { path: 'dev', component: DevComponent },
];

const COMPONENTS_NOROUNT = [ApiResourcesPublishComponent];

@NgModule({
  providers: [
    IdentityServerClient,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [UsersComponent, ClientsComponent, DevComponent, UsersDetailComponent, ApiResourcesComponent, IdentityResourcesComponent, ClientsDetailComponent, IdentityResourcesDetailComponent, ApiResourcesDetailComponent, TenancyComponent, TenancyDetailComponent, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class OpenPortalModule { }
