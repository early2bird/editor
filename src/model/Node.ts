export class INode {
  public id: string;
  public type: string;
  public parentId: string;

  constructor(id: string, parentId: string, type: 'document' | 'paragraph' | 'segment') {
    this.id = id;
    this.type = type;
    this.parentId = parentId;
  }

}
