import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorDocumentComponent} from './editor-document.component';
import {EditorParagraphModule} from "../editor-paragraph/editor-paragraph.module";


@NgModule({
  declarations: [
    EditorDocumentComponent
  ],
  imports: [
    CommonModule,
    EditorParagraphModule
  ],
  exports: [EditorDocumentComponent]
})
export class EditorDocumentModule {
}
