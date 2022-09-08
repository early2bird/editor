import {Component} from '@angular/core';
import {IDocument} from "../model/Document";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rich-editor';
  doc!: IDocument;

  ngOnInit() {
    this.doc = IDocument.create({
      id: '1', nodes: [
        {
          type: 'paragraph',
          segments: [
            {
              text: 'abc',
              style: {
                fontWeight: 'bold',
                color: 'red'
              }
            },
            {
              text: 'def',
              style: {
                fontWeight: 'normal',
                color: 'green'
              }
            }
          ],
          style: {
            textAlign: 'center'
          }
        },
        {
          type: 'paragraph',
          segments: [
            {
              text: '第二段',
              style: {
                color: 'red'
              }
            },
            {
              text: '第二段',
              style: {
                color: 'green'
              }
            }
          ],
          style: {
            textAlign: 'left'
          }
        }
      ]
    })
  }
}
