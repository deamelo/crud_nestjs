import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AppError } from 'src/errors/appError';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
    private usersService: UsersService,
  ) {}

  async save(createPetDto: CreatePetDto, user: User): Promise<Pet> {
    if (
      !createPetDto.nome ||
      !createPetDto.raca ||
      !createPetDto.sexo ||
      !createPetDto.user
    ) {
      throw new AppError(400, 'Necessário informar nome, raça, sexo e user');
    }

    const userId = await this.usersService.findOneOrFail(user.id);

    if (!userId) {
      throw new AppError(404, `ID ${user.id} não encontrado`);
    } else {
      createPetDto.user = user;
      return await this.petsRepository.save(
        this.petsRepository.create(createPetDto),
      );
    }
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  async findOneOrFail(id: number): Promise<Pet> {
    try {
      return await this.petsRepository.findOneByOrFail({ id });
    } catch {
      throw new AppError(404, `ID ${id} não encontrado`);
    }
  }

  async findByUser(userId: number): Promise<Pet[]> {
    const user = await this.usersService.findOneOrFail(userId);
    if (user.pets.length === 0) {
      return [];
    } else {
      return await this.petsRepository.findBy(user.pets);
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOneOrFail(id);
    this.petsRepository.merge(pet, updatePetDto);
    return await this.petsRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    await this.findOneOrFail(id);
    await this.petsRepository.delete(id);
  }
}
