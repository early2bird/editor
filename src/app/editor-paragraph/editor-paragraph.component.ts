import {Component, Input, OnInit} from '@angular/core';
import {IParagraph} from "../../model/Paragraph";
import {ISegment} from "../../model/Segment";

@Component({
  selector: '.editor-paragraph',
  templateUrl: './editor-paragraph.component.html',
  styleUrls: ['./editor-paragraph.component.scss']
})
export class EditorParagraphComponent implements OnInit {
  @Input() paragraph!: IParagraph

  constructor() {
  }

  ngOnInit(): void {
  }

  tracByFn(item: any) {
    return item.id
  }

}
