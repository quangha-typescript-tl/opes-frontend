export class Departmenrt {
  public id: number | null;
  public departmentName: string | null;
  public description: string | null;

  constructor(id: number | null, departmentName: string | null, description: string | null) {
    this.id = id;
    this.departmentName = departmentName;
    this.description = description;
  }
}
