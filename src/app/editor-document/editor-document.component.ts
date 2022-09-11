import {Component, Input, OnInit} from '@angular/core';
import {IDocument} from "../../model/Document";

@Component({
  selector: 'app-editor-document',
  templateUrl: './editor-document.component.html',
  styleUrls: ['./editor-document.component.scss']
})
export class EditorDocumentComponent implements OnInit {
  @Input()
  iDocument!: IDocument;

  constructor() {
  }

  ngOnInit(): void {
  }

  tracByFn(item: any) {
    return item.id;
  }
}
