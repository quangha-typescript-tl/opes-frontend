import {PublicContent} from "@/common/ContentCommon";

export class Content {
  public id: number | null;
  public title: string | null;
  public description: string | null;
  public public: PublicContent;
  public hash_tag: any[];
  public image: string | null;
  public content: string | null;
  public created_at: string | null;
  public updated_at: string | null;
  public user_created: number | null;

  constructor(id: number | null, title: string | null, description: string | null, statusPublic: PublicContent, hash_tag: any[], image: string | null, content: string | string,
              created_at: string | null, update_at: string | null, user_create: number | null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.public = statusPublic;
    this.hash_tag = hash_tag;
    this.image = image;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = update_at;
    this.user_created = user_create;
  }
}
