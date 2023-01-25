import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  nome: string;
  sexo: string;
  data_de_nascimento?: Date;
  cpf: string;
  endereco: string;
}
