import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  raca: string;

  @Column({ nullable: false })
  sexo: string;

  @ManyToOne(() => User, (user) => user.pets, { onDelete: 'CASCADE' })
  user: User;
}
