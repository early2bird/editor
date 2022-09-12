import {INode} from "./Node";
import {IStyle} from "./IStyle";

export class ISegment extends INode {
  static create(data: any) {
    const {id, text, style, parentId} = data;
    return new ISegment(id, parentId, text, style)
  }

  public text = '';
  public style;
  public id;
  public type = 'segment';
  public parentId;

  constructor(id: string, parentId: string, text: string, style: IStyle) {
    super(id, parentId, 'segment');
    this.text = text || '';
    this.id = id;
    this.style = style;
    this.parentId = parentId;
  }

  insetText(offset: number, text: string) {
    if (offset < 0 || offset > this.text.length) { // 边界处理
      return;
    }
    if (!text) {
      return;
    }
    this.text = this.text.slice(0, offset) + text + this.text.slice(offset);
  }

  // 删除的起始位置，删除的数量（选中多个可以删除多个）
  deleteText(offset: number, length: number = 1) {
    if (offset < 0 || offset > this.text.length) { // 边界处理
      return;
    }
    this.text = this.text.slice(0, offset) + this.text.slice(offset + length);
    // 如果没有数据删除segment对象啊
    return this.text.length;
  }

  addStyle(style: IStyle) {
    Object.assign(this.style, style)
  }

  split(index: number) {
    const before = this.text.slice(0, index);
    const after = this.text.slice(index);
    this.text = before;
    // 第一个是当前也就是before
    return [
      this,
      ISegment.create({
        text: after,
        style: after ? {...this.style} : {} // 不能直接赋值，直接赋值是引用,没有内容style重置
      })
    ]
  }

  toggleBold(style: IStyle) {
    Object.assign(this.style, style);
  }

  clearStyle() {
    this.style = {};
  }

}
