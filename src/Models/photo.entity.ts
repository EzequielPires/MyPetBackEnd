import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";

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
}