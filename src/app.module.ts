import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { Pet } from './pets/entities/pet.entity';
import { PetsModule } from './pets/pets.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // ConfigModule.forRootasync(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dea',
      password: '1234',
      database: 'pets',
      entities: [User, Pet],
      synchronize: true,
    }),
    UsersModule,
    PetsModule,
  ],
})
export class AppModule {}
