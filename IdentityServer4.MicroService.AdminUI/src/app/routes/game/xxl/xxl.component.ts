import { Component, OnInit } from '@angular/core';
import { ListTable } from '@shared/helper/list-table';

@Component({
  selector: 'app-xxl',
  templateUrl: './xxl.component.html',
  styleUrls: ['./xxl.component.scss']
})
export class XxlComponent extends ListTable implements OnInit {
  dataSource: any;
  constructor() { super();}

  ngOnInit() {
    this.dataSource = {
      "ImageOptions": [
        { "name": "rect1", "description": "消除方块造型1", "pixel": "" },
        { "name": "rect2", "description": "消除方块造型2", "pixel": "" },
        { "name": "rect3", "description": "消除方块造型3", "pixel": "" },
        { "name": "rect4", "description": "消除方块造型4", "pixel": "" },
        { "name": "rect5", "description": "消除方块造型5", "pixel": "" },
        { "name": "rect6", "description": "消除方块造型6", "pixel": "" },
        { "name": "eggbtn", "description": "彩蛋按钮图片（下载app藏的链接）", "pixel": "" },
        { "name": "indexfigure", "description": "首页人物图像", "pixel": "" },
        { "name": "readybg", "description": "首页背景图", "pixel": "" },
        { "name": "playbg", "description": "游戏页背景图", "pixel": "" },
        { "name": "rankbtn", "description": "排行榜按钮图片", "pixel": "" },
        { "name": "startbtn", "description": "开始按钮图片", "pixel": "" },
        { "name": "indextitle", "description": "首页标题图片", "pixel": "" },
        { "name": "face", "description": "默认头像图片", "pixel": "" }],
      "AudioOptions": [{ "name": "bgmusic", "description": "背景音乐" }]
    }
  }

}
