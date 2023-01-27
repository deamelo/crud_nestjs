// import { Test, TestingModule } from '@nestjs/testing';
import { PetEntity } from '../pets/entities/pet.entity';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// describe('UsersController', () => {
//   let controller: UsersController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });


describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let user = {
    nome: "Teste",
    sexo: "M",
    data_de_nascimento: "2000-10-10",
    cpf: "000.000.000-00",
    endereco: "rua 10",
    pets: PetEntity
  }

  beforeEach(() => {
    // usersService = new UsersService();
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = ['test'];
      // jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

      expect(await usersController.findAll()).toBe(result);
    });
  });
});