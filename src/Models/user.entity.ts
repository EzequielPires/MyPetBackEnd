import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Shelter } from "./shelter.entity";
import {hashSync} from "bcrypt"
import { Pet } from "./pet.entity";

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @OneToOne(() => Shelter, shelter => shelter.user)
    shelter: Shelter;

    @OneToMany(() => Pet, pet => pet.user)
    pets: Pet[];

    /* @BeforeInsert()
    hashPassword() {
      this.password = hashSync(this.password, 10);
    } */
}