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
          id: '11',
          segments: [
            {
              type: 'segment',
              id: "111",
              text: 'abc',
              style: {
                fontWeight: 'bold',
                color: 'red'
              }
            },
            {
              type: 'segment',
              id: "112",
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
          id: '12',
          type: 'paragraph',
          segments: [
            {
              type: 'segment',
              id: '121',
              text: '第二段',
              style: {
                color: 'red'
              }
            },
            {
              type: 'segment',
              id: '122',
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
    });
    console.log(this.doc, 'init')
  }

  /**
   * 如何编辑文档，是文档有我们预定义的结构一样，直接设置外层的div为可编辑的contenteditable=true
   * 这种编辑不会响应到组件内部的数据，并且也不会自动分隔段落样式等  数据和视图没有对应
   *
   * 拦截可编辑div的 输入文字拦截keyDown事件 eventHandler 并且设置preventdevault,
   * 拦截后修改IDocument对象
   * 组织keydown一个事件还不够，中文输入依旧可以输入
   */
  keyDown(event: KeyboardEvent) {
    // 这里如果考虑兼容性可以不使用字符串，可以使用对应编码来判断
    if (['Shift', 'Ctrl', 'Alt', 'Mate'].includes(event.code)) {
      return;
    }
    event.preventDefault();
    if (event.code === 'Backspace') {
      this.deleteText();
    } else if (event.code === 'Delete') {
      this.deleteText();
    } else if (event.key === 'b' && event.metaKey) {
      this.toggleBold();
    } else if (event.key === 'c' && event.metaKey && event.shiftKey) {
      this.applyCenter();
    } else if (event.code === 'Enter') {
      this.splitParagraph();
    } else {
      this.insertText(event);
    }

  }

  // 根据id和偏移量插入到对应的segment中
  insertText(event: KeyboardEvent) {
    const selection = window.getSelection();
    if (!selection || !selection.getRangeAt(0)) {
      return;
    }
    const range = selection.getRangeAt(0);
    // 拿到鼠标所在位置的元素，是文本内容
    const startContainer = range.startContainer;
    // 获得span元素根据span元素的id计算segment对象
    const parentElement = startContainer.parentElement;

    if (!range.collapse) {
      return;
    }
    if (!parentElement) {
      return;
    }
    const id = parentElement.id;
    console.log(id, '元素id')
    const startOffset = range.startOffset;
    const text = event.key;
    this.doc.insertText(id, startOffset, text);
    // 插入完成后处理指针
    setTimeout(() => {
      // 更新range，更新selection
      range.setEnd(startContainer, startOffset + text.length);
      range.setStart(startContainer, startOffset + text.length);
      selection.addRange(range);
    })
  }

  deleteText() {
  }

  toggleBold() {
  }

  applyCenter() {
  }

  splitParagraph() {
  }
}
