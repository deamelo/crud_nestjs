import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({name: 'pets'})
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  especie: string;

  @Column({ nullable: false })
  raca: string;

  @Column({ nullable: false })
  sexo: string;

  @ManyToOne(() => UserEntity, (user) => user.pets, { onDelete: 'CASCADE' })
  user: UserEntity;
}
