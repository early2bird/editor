import {INode} from "./Node";
import {IStyle} from "./IStyle";

export class ISegment extends INode {
  static create(data: any) {
    const {id, text, style} = data;
    return new ISegment(id, text, style)
  }

  public text;
  public style;

  constructor(id: string, text: string, style: IStyle) {
    super(id, 'segment');
    this.text = text;
    this.style = style;
  }

}
