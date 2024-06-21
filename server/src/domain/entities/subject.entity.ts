export enum Sex {
  Male = "Male",
  Female = "Female",
}

export enum Status {
  Screening = "Screening",
  Enrolled = "Enrolled",
  Failed = "Failed",
}

export class Subject {
  private id?: number;
  private name: string;
  private sex: Sex;
  private diagnosisDate: Date;
  private status: Status;

  constructor({
    id,
    name,
    sex,
    diagnosisDate,
    status,
  }: {
    id?: number;
    name: string;
    sex: Sex;
    diagnosisDate: Date;
    status: Status;
  }) {
    this.id = id;
    this.name = name;
    this.diagnosisDate = diagnosisDate;
    this.sex = sex ?? Sex.Male;
    this.status = status ?? Status.Enrolled;
  }
}
