import {INode} from "./Node";
import {IParagraph} from "./Paragraph";
import {ISegment} from "./Segment";
import {IStyle} from "./IStyle";

export class IDocument extends INode {


  static create(data: any) {
    const {id, nodes} = data;
    // 将数据转为段落
    const paragraphs: IParagraph[] = nodes.map((item: INode) => item);
    return new IDocument(id, paragraphs)
  }

  // 文档的子节点是段落
  public nodes: IParagraph[];
  public id = '';
  public type = 'document';

  constructor(id: string, nodes: IParagraph[] = []) {
    super(id, 'document');
    this.id = id;
    this.nodes = nodes.map(node => {
      return IParagraph.create(node);
    })
  }

  insertText(id: string | number, offset: number, text: string) {
    const node: INode | any = this.findNodeById(id);
    if (node?.type === 'document') { // 创建段落，创建片段插入内容
    } else if (node?.type === 'paragraph') { // 创建片段插入内容
    } else if (node?.type === 'segment') { // 直接插入内容
      (node as ISegment).insetText(offset, text);
    }
  }

  deleteText(id: string | number, offset: number, length: number) {
    const node: INode | any = this.findNodeById(id);
    if (!node || !(node instanceof ISegment)) {
      return;
    }
    // 删除片段中的内容
    (node as ISegment).deleteText(offset, length)
  }

  toggleBold(startId: string, endId: string, startOffset: number, endOffset: number, style: IStyle) {
    this.addInlineStyle(startId, startOffset, endId, endOffset, style);
  }

  /**
   * 添加行内样式添加startId到endId之间的所有segment都需要添加样式，第一个的startOffset左侧的内容不需要填，需要切分segment,最有一个segment的endoffset右侧不需要填，需要切分样式
   * @param startId
   * @param startOffset
   * @param endId
   * @param endOffset
   * @param style
   */
  addInlineStyle(startId: string, startOffset: number, endId: string, endOffset: number, style: IStyle) {
    const nodes: Array<ISegment> = this.findSegmentsByStartAndEnd(startId, endId);
    if (nodes?.length < 1) {
      return;
    }
    // 处理第一个
    const first = nodes[0];
    const firstParent = this.findParentNodeById(first.id) as IParagraph;
    // 第一个的前一个节点样式不变只处理后面的
    const [, after] = firstParent.split(first.id, startOffset);
    (after as ISegment).addStyle(style);
    if (nodes.length !== 1) {
      // 处理最后一个
      const last = nodes[nodes.length - 1];
      const lastParent = this.findParentNodeById(last.id) as IParagraph;
      const [before,] = lastParent.split(last.id, endOffset);
      (before as ISegment).addStyle(style);
    }


    // 处理其余节点都是直接添加样式
    nodes.slice(1, nodes.length - 1).forEach((segment) => {
      (segment as ISegment).addStyle(style);
    })
    // return [after.id, 0, before.id, endOffset];
  }

  /**
   * 从顶层开始遍历先遍历
   * @param startId
   * @param endId
   */
  findSegmentsByStartAndEnd(startId: string, endId: string): Array<ISegment> {
    const result = [];
    // 第一个标记,后面的继续push，找到最后一个id结束
    let firstStart = false;
    for (const paragraph of this.nodes) {
      for (const segment of paragraph.segments) {
        if (segment.id === startId) {
          result.push(segment);
          firstStart = true;
          continue;
        }
        if (segment.id === endId) {
          result.push(segment);
          return result;
        }
        if (firstStart) {
          result.push(segment);
        }
      }
    }
    return result;
  }

  // 找到父节点
  findParentNodeById(id: string) {
    let parent;
    for (const paragraph of this.nodes) {
      for (const segment of paragraph.segments) {
        if (id === segment.id) {
          parent = paragraph;
        }
      }
    }
    return parent;
  }

  // 逐级别的插入id,document,paragraph segment 根据不同的类型进行操作
  // 此处可以使用树的深度遍历来处理，因为文档对象就是一颗树
  findNodeById(id: string | number): INode | void {
    if (this.id === id) {
      return this;
    }
    for (const node of this.nodes) {
      if (node.id === id) {
        return node as IParagraph;
      }
      if (node.type === 'paragraph') { // 段落下的segment
        for (const segment of node.segments) {
          if (segment.id === id) {
            return segment as ISegment;
          }
        }
      }
    }
  }

}
