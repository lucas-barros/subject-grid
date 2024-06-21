import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Sex, Status } from "../../../domain/entities/subject.entity";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: "enum",
    enum: Sex,
  })
  sex!: Sex;

  @Column({ type: "timestamptz" })
  diagnosisDate!: Date;

  @Column({
    type: "enum",
    enum: Status,
  })
  status!: Status;
}
