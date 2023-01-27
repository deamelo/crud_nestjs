import { IsIn, IsNotEmpty, IsNumberString, IsOptional, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'NOME precisa ser informado' })
  nome: string;

  @IsNotEmpty({ message: 'SEXO precisa ser informado' })
  @IsIn(["M", "F"])
  sexo: string;

  @IsOptional()
  data_de_nascimento?: string;

  @IsNotEmpty({ message: 'CPF precisa ser informado' })
  @IsNumberString()
  @Length(11, 11, { message: 'CPF precisa ter 11 números' })
  cpf: string;

  @IsNotEmpty({ message: 'ENDEREÇO precisa ser informado' })
  endereco: string;
}
