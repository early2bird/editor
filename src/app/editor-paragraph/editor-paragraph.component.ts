import {Component, Input, OnInit} from '@angular/core';
import {IParagraph} from "../../model/Paragraph";

@Component({
  selector: 'app-editor-paragraph',
  templateUrl: './editor-paragraph.component.html',
  styleUrls: ['./editor-paragraph.component.scss']
})
export class EditorParagraphComponent implements OnInit {
  @Input() paragraph!: IParagraph

  constructor() {
  }

  ngOnInit(): void {
  }

}
