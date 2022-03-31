import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Age } from "./age.entity";
import { Photo } from "./photo.entity";
import { Race } from "./race.entity";
import { Shelter } from "./shelter.entity";
import { Type } from "./type.entity";
import { User } from "./user.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Type, type => type.pets, {nullable: false, eager: true})
    type: Type;

    @ManyToOne(() => Race, race => race.pets, {nullable: false, eager: true})
    race: Race;

    @ManyToOne(() => Age, age => age.pets, {nullable: false, eager: true})
    age: Age;

    @Column()
    gender:string;

    @ManyToOne(() => Shelter, shelter => shelter.pets)
    shelter: Shelter;

    @OneToMany(() => Photo, photo => photo.pet)
    photos: Photo[];

    @ManyToOne(() => User, user => user.pets, {nullable: false, onDelete: "CASCADE"})
    user: User;
}                                                                                                                                                                                                                                                                        