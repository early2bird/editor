import {INode} from "./Node";
import {IStyle} from "./IStyle";

export class ISegment extends INode {
  static create(data: any) {
    const {id, text, style} = data;
    return new ISegment(id, text, style)
  }

  public text = '';
  public style;
  public id;
  public type = 'segment';

  constructor(id: string, text: string, style: IStyle) {
    super(id, 'segment');
    this.text = text || '';
    this.id = id;
    this.style = style;
  }

  insetText(offset: number, text: string) {
    console.log('insert')
    if (offset < 0 || offset > this.text.length) { // 边界处理
      return;
    }
    if (!text) {
      return;
    }
    this.text = this.text.slice(0, offset) + text + this.text.slice(offset);
    console.log(this.text)
  }

}
