import {INode} from "./Node";
import {IParagraph} from "./Paragraph";

export class IDocument extends INode {
  static create(data: any) {
    const {id, nodes} = data;
    // 将数据转为段落
    const paragraphs: IParagraph[] = nodes.map((item: INode) => item);
    return new IDocument(id, paragraphs)
  }

  // 文档的子节点是段落
  public nodes: IParagraph[];

  constructor(id: string, nodes: IParagraph[] = []) {
    super(id, 'document');
    this.nodes = nodes;
  }

}
