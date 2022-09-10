import {INode} from "./Node";
import {ISegment} from "./Segment";
import {IStyle} from "./IStyle";

export class IParagraph extends INode {
  static create(data: any) {
    const {id, segments, style} = data;
    const newSegments: ISegment[] = segments.map((item: INode) => item);
    return new IParagraph(id, newSegments, style)
  }

  public type = 'paragraph';
  public segments: ISegment[];
  public style: IStyle;
  public id;

  constructor(id: string, segments: ISegment[], style: IStyle) {
    super(id, 'paragraph');
    this.segments = segments.map(segment => {
      return ISegment.create(segment)
    });
    this.id = id;
    this.style = style;
  }
}
