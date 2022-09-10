export class INode {
  public id: string;
  public type: string;

  constructor(id: string, type: 'document' | 'paragraph' | 'segment') {
    this.id = id;
    this.type = type;
  }

}
