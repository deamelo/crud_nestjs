import { User } from 'src/users/entities/user.entity';

export class CreatePetDto {
  nome: string;
  raca: string;
  sexo: string;
  user: User;
}
