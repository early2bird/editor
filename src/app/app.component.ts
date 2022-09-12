import {Component} from '@angular/core';
import {IDocument} from "../model/Document";
import {Event} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rich-editor';
  doc!: IDocument;
  isChineseInput = false;

  ngOnInit() {
    this.doc = IDocument.create({
      id: '1', nodes: [
        {
          type: 'paragraph',
          id: '11',
          parentId: '1',
          segments: [
            {
              parentId: '11',
              type: 'segment',
              id: "111",
              text: 'abc',
              style: {
                fontWeight: 'bold',
                color: 'red'
              }
            },
            {
              parentId: '11',
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
          parentId: '1',
          type: 'paragraph',
          segments: [
            {
              parentId: '12',
              type: 'segment',
              id: '121',
              text: '第二段',
              style: {
                color: 'red'
              }
            },
            {
              parentId: '12',
              type: 'segment',
              id: '122',
              text: '第二段',
              style: {
                color: 'green'
              }
            },
            {
              parentId: '13',
              type: 'segment',
              id: '122',
              text: '第三段',
              style: {
                color: 'blue'
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
    if (this.isChineseInput || event.key === 'Process') { // process在中文输入法输入的第一次会触发
      return;
    }
    // 这里如果考虑兼容性可以不使用字符串，可以使用对应编码来判断
    if (['Shift', 'Control', 'Alt', 'Mate', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(event.key)) {
      return;
    }
    event.preventDefault();
    if (event.code === 'Backspace') {
      this.deleteText(true);
    } else if (event.code === 'Delete') {
      this.deleteText(false);
    } else if (event.key === 'b' && (event.metaKey || event.ctrlKey)) { // 行内样式
      this.toggleBold();
    } else if (event.key === 'c' && event.metaKey || event.ctrlKey) { // 添加段落样式
      this.applyCenter();
    } else if (event.key === 'Enter') {
      this.splitParagraph();
    } else if (event.key === 'ArrowLeft' && event.ctrlKey) {
      console.log('向左旋')
    } else {
      this.insertText(event.key);
    }

  }

  // 不切输入法不会触发
  compositionstart(event: any) {
    this.isChineseInput = true;
  }

  compositionend(event: any) {
    this.isChineseInput = false;
    this.insertChineseText(event.data);
  }

  // 根据id和偏移量插入到对应的segment中
  insertText(text: string) {
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
    const startOffset = range.startOffset;
    this.doc.insertText(id, startOffset, text);
    // setTimeout
    setTimeout(() => {
      // 更新range，更新selection
      range.setEnd(startContainer, startOffset + text.length);
      range.setStart(startContainer, startOffset + text.length);
      selection.addRange(range);
    })
  }

  insertChineseText(text: string) {
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
    const startOffset = range.startOffset - text.length;
    this.doc.insertText(id, startOffset, text);
    // setTimeout
    setTimeout(() => {
      // 更新range，更新selection
      range.setEnd(startContainer, startOffset + text.length);
      range.setStart(startContainer, startOffset + text.length);
      selection.addRange(range);
    })
  }

  // 退格删除，删除的是前面的元素，delete删除删除的是后面元素
  deleteText(back: boolean) {
    const selection = window.getSelection();
    if (!selection || !selection.getRangeAt(0)) {
      return;
    }
    const range = selection.getRangeAt(0);
    let startContainer = range.startContainer;
    const parentElement = startContainer.parentElement;

    if (!range.collapse) {
      return;
    }
    if (!parentElement) {
      return;
    }
    const id = parentElement.id;
    const startOffset = range.startOffset;
    // 删除前一个 delete删除后一个
    let start = back ? startOffset - 1 : startOffset;
    if (start < 0) {
      return;
    }
    // 一次只能删除一个
    const result = this.doc.deleteText(id, start, 1);
    if (result?.prevSegment) { // 处理删除有个segment后鼠标重新定位
      const segmentEle = document.getElementById(result.prevSegment.id);
      if (segmentEle?.lastChild) {
        startContainer = segmentEle?.lastChild;
        start = result.prevSegment.text.length || 0;
      }
    }
    // 删除一个段落后(段落是否可以删除)
    setTimeout(() => {
      // 更新range，更新selection
      range.setEnd(startContainer, start);
      range.setStart(startContainer, start);
      selection.addRange(range);
    })
  }

  toggleBold() {
    const selection = window.getSelection();
    if (!selection || !selection.getRangeAt(0)) {
      return;
    }
    const range = selection.getRangeAt(0);
    let startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const startParentElement = startContainer.parentElement;
    const endParentElement = endContainer.parentElement;
    if (!startParentElement || !endParentElement) {
      return;
    }
    const startId = startParentElement?.id;
    const endId = endParentElement?.id;
    this.doc.toggleBold(startId, endId, startOffset, endOffset, {
      fontWeight: "bold"
    })
    this.doc = IDocument.create(this.doc);
  }

  applyCenter() {
    const selection = window.getSelection();
    if (!selection || !selection.getRangeAt(0)) {
      return;
    }
    const range = selection.getRangeAt(0);
    let startContainer = range.startContainer;
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const startParentElement = startContainer.parentElement;
    const endParentElement = endContainer.parentElement;
    if (!startParentElement || !endParentElement) {
      return;
    }
    const startId = startParentElement?.id;
    const endId = endParentElement?.id;
    this.doc.addParagraphStyle(startId, startOffset, endId, endOffset, {
      textIndent: "40px"
    })
    this.doc = IDocument.create(this.doc);

  }

  splitParagraph() {
    const selection = window.getSelection();
    if (!selection || !selection.getRangeAt(0)) {
      return;
    }
    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    const parentElement = startContainer.parentElement;

    if (!range.collapse) {
      return;
    }
    if (!parentElement) {
      return;
    }
    const id = parentElement.id;
    const startOffset = range.startOffset;
    console.log(id, startOffset, '切分位置')
    this.doc.splitParagraph(id, startOffset);
    this.doc = IDocument.create(this.doc);
    console.log(this.doc,'重新计算')
    setTimeout(() => {
      // 更新range，更新selection
      range.setEnd(startContainer, startOffset );
      range.setStart(startContainer, startOffset);
      selection.addRange(range);
    })
  }
}
