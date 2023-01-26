import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  nome: string;
  especie: string;
  raca: string;
  sexo: string;
}
