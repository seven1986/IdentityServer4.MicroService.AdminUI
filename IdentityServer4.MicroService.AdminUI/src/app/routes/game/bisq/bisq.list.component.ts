import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'bisqlist',
    templateUrl: './bisq.list.component.html',
    styleUrls: ['./bisq.component.scss']
})
export class BisqListComponent implements OnInit {
    vm: any = {
        game: {},

        gameimage: {}
    };
    _loading: boolean = false;
    gameinstance: any = {};
    _allChecked = false;
    _indeterminate = false;
    _displayData = [];
    data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        disabled: true,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }];

    _displayDataChange($event) {
        this._displayData = $event;
        this._refreshStatus();
    };

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.disabled || value.checked);
        const allUnChecked = this._displayData.every(value => value.disabled || !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    };

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => {
                if (!data.disabled) {
                    data.checked = true;
                }
            });
        } else {
            this._displayData.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    };

    constructor(private message: NzMessageService) { }
    ngOnInit() {
        this.getDate();

        let d = {
            instanceId: 0,
            gameId: "874539ee-e130-11e6-80c2-00155d454321",
            instanceType: 1,
            instanceName: "test",
            instanceDetails: "test",
            instanceRules: "test",
            instanceInstructions: "test",
            rankingExpired: 1,
            rankingKeepHighest: true,
            status: 1,
            startDate: "2017-10-25T00:00:00",
            endDate: "2017-10-31T00:00:00",
            createDate: "2017-10-25T05:27:01.6804813",
            createUser: "wz",
            updateDate: "2017-10-25T05:27:01.6804813",
            updateUser: "wz",
            isDeleted: false,
            isApproved: true
        };
        // 更新
        let dd = {
            instanceId: 0,
            instanceName: "test",
            instanceDetails: "test",
            instanceRules: "test",
            instanceInstructions: "test",
            status: 1,
            startDate: "2017-10-25T00:00:00",
            endDate: "2017-10-31T00:00:00",
            creator: "wz",
        };
    }
    getDate() {
        this._loading = true;
        //this.api.AdminGameInstances('874539ee-e130-11e6-80c2-00155d454321', 100).subscribe(x => {
        //    this.gameinstance = x;
        //    this._loading = false;
        //}).add(r => { this._loading = false; });
        //this.api.AdminGameInstance('2').subscribe(r => {
        //    this._loading = false;
        //    this.gameinstance = r.dataArray;
            
        //});
    }
    //删除
    confirm = (d) => {
        //this.api.AdminGameDeleteInstance(d).subscribe(x => {
        //    this.message.info('click confirm');
        //    this.getDate();
        //});
    }
    //取消删除
    cancel = function () {
        //this.message.info('click cancel')
    }

    //tabs = [
    //    {
    //        index: 1,
    //        Content:'qqqqqq',
    //    },
    //    {
    //        index: 2,
    //        Content: 'wwww',
    //    },
    //    {
    //        index: 3,
    //        Content: 'eeee',
    //    }
    //  ];
    //data = [{
    //    key: '1',
    //    name: 'APPID',
    //    string:'wx055f4c254d110e41',
    //}, {
    //    key: '2',
    //    name: '测试APPKEY',
    //    string:'lgDi5Mkx4z8qlXFJjQgwfCHiIE0VVh9Y-JWVJ2cagx45CHV5kBvYuEVbghpM490qGwNaLWxX4szO0f0a_64hTg',
    //}, {
    //    key: '3',
    //    name: '正式APPKEY',
    //    string: '6BgrN8uSZngLuqoJVJ8dH_uz7fiXgpqh8z7HLCDrMynYNUNfd_bntUTt4VDTECMEU4fuXKrKIGDzHer3MjyCZA',
    //}, {
    //    key: '4',
    //    name: 'APPTAG',
    //    string: '1(games.ixingban.com) 2(www.ichenxiao.com)',
    //}, {
    //    key: '5',
    //    name: '接口调用地址cpServer',
    //    string: 'https://openapis.ixingban.com/game',
    //}, {
    //    key: '6',
    //    name: '用户信息正式地址jxServer',
    //    string: 'https://www.jixiuapp.com',
    //}, {
    //    key: '6',
    //    name: '用户信息测试地址jxServer',
    //    string: 'https://jixiuapp-staging-proxy.azurewebsites.net',
    //}, {
    //    key: '6',
    //    name: 'serverEnv',
    //    string: 'production(正式) staging(测试) 接口调用环境转换',
    //}, {
    //    key: '6',
    //    name: 'appKey',
    //    string: 'ef2fca94d6434ad4b0486c62fbc0db0b 接口调用密匙',
    //}


    //];
}
