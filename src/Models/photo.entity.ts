import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";
import { User } from "./user.entity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fieldname: string;

    @Column()
    originalname: string;

    @Column()
    mimetype: string;

    @Column()
    destination: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    size: number;

    @ManyToOne(() => Pet, pet => pet.photos, {onDelete: "CASCADE"})
    pet: Pet;

    @ManyToOne(() => User, user => user.photos)
    user: User;
}