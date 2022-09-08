import {Component, Input, OnInit} from '@angular/core';
import {ISegment} from "../../model/Segment";

@Component({
  selector: 'app-editor-segment',
  templateUrl: './editor-segment.component.html',
  styleUrls: ['./editor-segment.component.scss']
})
export class EditorSegmentComponent implements OnInit {
  @Input() segment!: ISegment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
