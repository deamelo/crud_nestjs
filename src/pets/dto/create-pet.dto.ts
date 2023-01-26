import { UserEntity } from 'src/users/entities/user.entity';

export class CreatePetDto {
  nome: string;
  especie: string;
  raca: string;
  sexo: string;
  user: UserEntity;
}
