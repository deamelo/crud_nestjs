import { Pet } from 'src/pets/entities/pet.entity';

export class CreateUserDto {
  nome: string;
  sexo: string;
  data_de_nascimento?: Date;
  cpf: string;
  endereco: string;
  pets: Pet[];
}
