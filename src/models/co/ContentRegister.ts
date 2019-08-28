export class ContentRegister {
  public title: string | null;
  public description: string | null;
  public public: any;
  public hash_tag: string | null | any[];
  public image: any | null;
  public content: string | null;

  constructor(title: string | null, description: string | null, statusPublic: any, image: any | null, content: string | string, hash_tag: string | null | any[]) {
    this.title = title;
    this.description = description;
    this.public = statusPublic;
    this.hash_tag = hash_tag;
    this.image = image;
    this.content = content;
  }
}
