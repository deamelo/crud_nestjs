import { PetEntity } from 'src/pets/entities/pet.entity';

export class CreateUserDto {
  nome: string;
  sexo: string;
  data_de_nascimento?: string;
  cpf: string;
  endereco: string;
  // pets: PetEntity[];
}
