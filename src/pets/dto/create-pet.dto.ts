import { IsIn, IsNotEmpty } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';

export class CreatePetDto {
  @IsNotEmpty({ message: 'NOME precisa ser informado' })
  nome: string;

  @IsNotEmpty({ message: 'ESPÉCIE precisa ser informado' })
  especie: string;

  @IsNotEmpty({ message: 'RAÇA precisa ser informado' })
  raca: string;

  @IsNotEmpty({ message: 'SEXO precisa ser informado' })
  @IsIn(["M", "F"])
  sexo: string;

  @IsNotEmpty({ message: 'USER precisa ser informado' })
  user: UserEntity;
}
