import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from 'src/pets/entities/pet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  sexo: string;

  @Column({ nullable: true })
  data_de_nascimento: Date;

  @Column({ nullable: false, unique: true, length: 14 })
  cpf: string;

  @Column({ nullable: false })
  endereco: string;

  @OneToMany(() => Pet, (pet) => pet.user, { eager: true })
  pets: Pet[];
}
