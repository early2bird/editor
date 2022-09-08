import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorParagraphComponent} from './editor-paragraph.component';
import {EditorSegmentModule} from "../editor-segment/editor-segment.module";


@NgModule({
  declarations: [
    EditorParagraphComponent
  ],
  imports: [
    CommonModule,
    EditorSegmentModule
  ],
  exports: [EditorParagraphComponent]
})
export class EditorParagraphModule {
}
