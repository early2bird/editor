import {INode} from "./Node";
import {ISegment} from "./Segment";
import {IStyle} from "./IStyle";

export class IParagraph extends INode {
  static create(data: any) {
    const {id, nodes, style} = data;
    const segments: ISegment[] = nodes.map((item: INode) => item);
    return new IParagraph(id, segments, style)
  }

  public segments: ISegment[];
  public style: IStyle;

  constructor(id: string, segments: ISegment[], style: IStyle) {
    super(id, 'paragraph');
    this.segments = segments;
    this.style = style;
  }
}
