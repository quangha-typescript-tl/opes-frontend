export class Departmenrt {
  public id: number | null;
  public departmentNamr: string | null;
  public description: string | null;

  constructor(id: number | null, departmentNamr: string | null, description: string | null) {
    this.id = id;
    this.departmentNamr = departmentNamr;
    this.description = description;
  }
}
