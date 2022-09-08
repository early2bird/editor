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

  /**
   * 如何编辑文档，是文档有我们预定义的结构一样，直接设置外层的div为可编辑的contenteditable=true
   * 这种编辑不会响应到组件内部的数据，并且也不会自动分隔段落样式等  数据和视图没有对应
   *
   * 拦截可编辑div的 输入文字拦截keyDown事件 eventHandler 并且设置preventdevault,
   * 拦截后修改IDocument对象
   * 组织keydown一个事件还不够，中文输入依旧可以输入
   */
  keyDown(event: Event) {
    console.log(event)
  }
}
