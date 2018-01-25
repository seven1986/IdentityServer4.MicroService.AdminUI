import { Component, OnInit } from '@angular/core';
import { CampaignCoreGameClient } from 'campaign.core.game'
import { AuthService } from '../../oidc/services/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private api: CampaignCoreGameClient, public auth: AuthService) {
  }

  vm: any = {
    game: {},
    gameinstance: {},
    gameimage: {}
  };

  a(src)
  {
  alert(src);
}

  ngOnInit() {
    
    //this.api.AdminGameGet('c01e39ee-e130-11e6-80c2-00155d45a9f5',
    //  'lgDi5Mkx4z8qlXFJjQgwfCHiIE0VVh9Y-JWVJ2cagx45CHV5kBvYuEVbghpM490qGwNaLWxX4szO0f0a_64hTg').subscribe(x => this.vm.game = x);

    // 列表
    //this.api.AdminGameInstance('874539ee-e130-11e6-80c2-00155d454321').subscribe(x => this.vm.gameinstance = x);

    // 创建
    //let d = {
    //  instanceId: 0,
    //  gameId: "874539ee-e130-11e6-80c2-00155d454321",
    //  instanceType: 1,
    //  instanceName: "test",
    //  instanceDetails: "test",
    //  instanceRules: "test",
    //  instanceInstructions: "test",
    //  rankingExpired: 1,
    //  rankingKeepHighest: true,
    //  status: 1,
    //  startDate: "2017-10-25T00:00:00",
    //  endDate: "2017-10-31T00:00:00",
    //  createDate: "2017-10-25T05:27:01.6804813",
    //  createUser: "wz",
    //  updateDate: "2017-10-25T05:27:01.6804813",
    //  updateUser: "wz",
    //  isDeleted: false,
    //  isApproved: true
    //};
    // 创建
    //this.api.AdminGamePostInstance(d).subscribe(x => this.vm.gameimage = x);


    // 更新
    let dd = {
      instanceId: 2,
      instanceName: "test",
      instanceDetails: "test",
      instanceRules: "test",
      instanceInstructions: "test",
      status: 1,
      startDate: "2017-10-25T00:00:00",
      endDate: "2017-10-31T00:00:00",
    };

    //this.api.AdminGameEditInstance(dd).subscribe(x => {
      
    //})

    //删除
    //this.api.AdminGameDeleteInstance(10).subscribe(x => {
    //  debugger
    //});

  }

}
