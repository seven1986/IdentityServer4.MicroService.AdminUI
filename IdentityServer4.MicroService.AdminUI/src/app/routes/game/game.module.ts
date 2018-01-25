import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { BisqComponent } from './bisq/bisq.component';
import { BisqDetailComponent } from './bisq/bisq-detail.component';
import { BisqListComponent } from './bisq/bisq.list.component';
import { XxlComponent } from './xxl/xxl.component';
import { FaceCompareComponent } from './face-compare/face-compare.component';
import { TestComponent } from './test/test.component';
import { HitBossComponent } from './hit-boss/hit-boss.component';
import { PosterComponent } from './poster/poster.component';


// Campaign Core Identity SDK
import { AUTH_INTERCEPTOR } from '@core/net/auth.interceptor';
import { CampaignCoreGameClient } from 'campaign.core.game'
import { CampaignCoreIdentityClient } from 'campaign.core.identity'


const appRoutes: Routes = [
    { path: 'bisq', component: BisqComponent },
    { path: 'bisq/bisqlist/:appId', component: BisqListComponent },
    { path: 'bisq/bisqlist/:appId/detail/:id', component: BisqDetailComponent },
    { path: 'xxl', component: XxlComponent },
    { path: 'facecompare', component: FaceCompareComponent },
    { path: 'test', component: TestComponent },
    { path: 'hitboss', component: HitBossComponent },
    { path: 'poster', component: PosterComponent },
];

@NgModule({
  providers: [
    CampaignCoreGameClient,
    CampaignCoreIdentityClient,
    AUTH_INTERCEPTOR,
  ],
    imports: [
      SharedModule,
      RouterModule.forChild(appRoutes),
  ],
    declarations: [FaceCompareComponent, TestComponent, XxlComponent, BisqComponent, BisqListComponent, HitBossComponent, BisqDetailComponent, PosterComponent]
})
export class GameModule { }
