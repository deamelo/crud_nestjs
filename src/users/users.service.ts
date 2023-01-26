import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AppError } from 'src/errors/appError';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async save(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (
      !createUserDto.nome ||
      !createUserDto.sexo ||
      !createUserDto.cpf ||
      !createUserDto.endereco
    ) {
      throw new AppError(400, 'Necessário informar nome, sexo, cpf e endereco');
    }

    try {
      return await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
    } catch {
      throw new AppError(400, 'CPF já cadastrado');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneOrFail(id: number): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new AppError(404, `ID ${id} não encontrado`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneOrFail(id);
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.findOneOrFail(id);
    await this.usersRepository.delete(id);
  }
}
