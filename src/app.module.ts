import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pets/entities/pet.entity';
import { PetsModule } from './pets/pets.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
require("dotenv").config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, PetEntity],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
  ],
})
export class AppModule {}
