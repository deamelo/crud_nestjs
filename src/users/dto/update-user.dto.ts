import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  nome: string;
  sexo: string;
  data_de_nascimento?: string;
  cpf: string;
  endereco: string;
}
