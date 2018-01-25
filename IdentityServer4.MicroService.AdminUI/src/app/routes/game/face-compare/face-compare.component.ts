import { Component, OnInit } from '@angular/core';
import { ListTable } from '@shared/helper/list-table';

@Component({
  selector: 'app-face-compare',
  templateUrl: './face-compare.component.html',
  styleUrls: ['./face-compare.component.scss']
})
export class FaceCompareComponent extends ListTable implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
