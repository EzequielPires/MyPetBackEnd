import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";

@Entity()
export class Age {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Pet, pet => pet.age)
    pets: Pet[];
}