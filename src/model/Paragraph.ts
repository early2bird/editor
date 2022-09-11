import {INode} from "./Node";
import {ISegment} from "./Segment";
import {IStyle} from "./IStyle";

export class IParagraph extends INode {
  static create(data: any) {
    const {id, segments, style, parentId} = data;
    const newSegments: ISegment[] = segments.map((item: INode) => item);
    return new IParagraph(id, parentId, newSegments, style)
  }

  public type = 'paragraph';
  public segments: ISegment[];
  public style: IStyle;
  public id;
  public parentId;

  constructor(id: string, parentId: string, segments: ISegment[], style: IStyle) {
    super(id, parentId, 'paragraph');
    this.parentId = parentId;
    this.id = id;
    this.style = style;
    this.segments = segments.map((segment, index) => {
      return ISegment.create({...segment, id: `${this.id}${index}`, parentId: this.id})
    });

  }

  /**
   * 切分segments 返回结果为一个数组，第一项是分割符号之前，第二个是分隔符之后
   * @param id
   * @param offset
   */
  split(id: string, offset: number, splitSelf?: boolean) {
    const segmentIndex = this.segments.findIndex((segment) => segment.id === id);
    if (segmentIndex < 0) {
      return [];
    }
    const [before, after] = this.segments[segmentIndex].split(offset)
    const head = this.segments.slice(0, segmentIndex); // 不包含当前
    const tail = this.segments.slice(segmentIndex + 1); // 不报含当前
    if (splitSelf) { // 段落切分
      this.segments = head.concat([before]); // 前半部部分作为当前段落
      return [this, IParagraph.create({ //后半部分作为新段落
        style: this.style,
        segments: [after].concat(tail)
      })]
    } else {
      this.segments = head.concat([before, after]).concat(tail);
      return [before, after]
    }
  }

  deleteSegment(id: string) {
    const index = this.segments.findIndex(segment => segment.id === id);
    this.segments.splice(index, 1);
    return this.segments[index - 1]; // 返回前一个segment，重新定位鼠标
  }

  addStyle(style: IStyle) {
    this.style = {...this.style, ...style};
  }

}
