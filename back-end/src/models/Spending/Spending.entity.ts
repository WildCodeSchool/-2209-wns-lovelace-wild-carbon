import dayjs from "dayjs";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Category from "../Category/Category.entity";

@Entity()
@ObjectType()
export default class Spending {
  constructor(
    title: string,
    date: Date,
    unit: number,
    weight: number,
    category: Category
  ) {
    this.title = title;
    this.date = date;
    this.unit = unit;
    this.weight = weight;
    this.category = category;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  date: Date;

  @Field(() => String)
  localizedDate() {
    return dayjs(this.date).format("DD/MM/YYYY");
  }

  @Column()
  @Field()
  unit: number;

  @Column()
  @Field()
  weight: number;

  @ManyToOne(() => Category, (category) => category.spendings, {
    eager: true,
    onDelete: "CASCADE",
  })
  @Field(() => Category)
  category: Category;

  @Field(() => String)
  getCaracsSpending() {
    if(this.category.categoryName === "Multimédia") {
    return `${this.weight}kWh - ${this.unit}kg/CO2`} else return `${this.weight}km - ${this.unit}kg/CO2`
  }

  @Field(() => String)
  getDisplaySpending() {
    return `[${this.localizedDate()} - ${this.getCaracsSpending()}] ${this.title
    } - ${this.category.categoryName}`;
  }
}
