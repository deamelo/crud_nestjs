import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PetEntity } from './entities/pet.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, UserEntity])],
  controllers: [PetsController],
  providers: [PetsService, UsersService],
  exports: [PetsService]
})
export class PetsModule {}
