import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PetEntity } from 'src/pets/entities/pet.entity';

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  sexo: string;

  @Column({ nullable: true, type: 'date' })
  data_de_nascimento: string;

  @Column({ nullable: false, unique: true, length: 14 })
  cpf: string;

  @Column({ nullable: false })
  endereco: string;

  @OneToMany(() => PetEntity, (pet) => pet.user, { eager: true })
  pets: PetEntity[];
}
