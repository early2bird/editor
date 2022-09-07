import {INode} from "./Node";
import {ISegment} from "./Segment";
import {IStyle} from "./IStyle";

export class IParagraph extends INode {
  public segments: ISegment[];
  public style: IStyle;

  constructor(id: string, segments: ISegment[], style: IStyle) {
    super(id, 'paragraph');
    this.segments = segments;
    this.style = style;
  }
}
