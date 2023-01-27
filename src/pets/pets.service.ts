import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetEntity } from './entities/pet.entity';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AppError } from '../errors/appError';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private readonly petsRepository: Repository<PetEntity>,
    private usersService: UsersService,
  ) {}

  async save(createPetDto: CreatePetDto, user: UserEntity): Promise<PetEntity> {
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

  async findAll(): Promise<PetEntity[]> {
    return await this.petsRepository.find();
  }

  async findOneOrFail(id: number): Promise<PetEntity> {
    try {
      return await this.petsRepository.findOneByOrFail({id});
    } catch {
      throw new AppError(404, `ID ${id} não encontrado`);
    }
  }

  async findByUser(userId: number): Promise<PetEntity[]> {
    const user = await this.usersService.findOneOrFail(userId);
    if (user.pets.length === 0) {
      return [];
    } else {
      return await this.petsRepository.findBy(user.pets);
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<PetEntity> {
    const pet = await this.findOneOrFail(id);
    this.petsRepository.merge(pet, updatePetDto);
    return await this.petsRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    await this.findOneOrFail(id);
    await this.petsRepository.delete(id);
  }
}
