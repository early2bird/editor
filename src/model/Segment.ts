import {INode} from "./Node";
import {IStyle} from "./IStyle";

export class ISegment extends INode {
  public text;
  public style;

  constructor(id: string, text: string, style: IStyle) {
    super(id, 'segment');
    this.text = text;
    this.style = style;
  }

}
