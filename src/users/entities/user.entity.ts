import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PetEntity } from '../../pets/entities/pet.entity';

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

  @Column({ nullable: false, unique: true, length:11 })
  cpf: string;

  @Column({ nullable: false })
  endereco: string;

  @OneToMany(() => PetEntity, (pet) => pet.user, { eager: true })
  pets: PetEntity[];

  constructor(user?: Partial<UserEntity>){
    this.id = user?.id
    this.nome = user?.nome
    this.sexo = user?.sexo
    this.data_de_nascimento = user?.data_de_nascimento
    this.cpf = user?.cpf
    this.endereco = user?.endereco
    this.pets = user?.pets
  }
}
