import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";
import { User } from "./user.entity";

@Entity()
export class Shelter {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Pet, pet => pet.shelter)
    pets: Pet[];

    @OneToOne(() => User, user => user.shelter, {eager: true})
    @JoinColumn()
    user: User;
}