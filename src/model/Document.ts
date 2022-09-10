import {INode} from "./Node";
import {IParagraph} from "./Paragraph";
import {ISegment} from "./Segment";

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
