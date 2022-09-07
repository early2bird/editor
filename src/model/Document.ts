import {INode} from "./Node";
import {IParagraph} from "./Paragraph";

export class IDocument extends INode {
  // 文档的子节点是段落
  public nodes: IParagraph[];

  constructor(id: string, nodes: IParagraph[] = []) {
    super(id, 'document');
    this.nodes = nodes;
  }

}
