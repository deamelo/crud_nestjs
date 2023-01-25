import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
// import { Pet } from './entities/pet.entity';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() createPetDto: CreatePetDto) {
    const user = createPetDto.user;
    return await this.petsService.save(createPetDto, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.petsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.petsService.findOneOrFail(id);
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async findByUser(@Param('userId') userId: number) {
    return await this.petsService.findByUser(userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return await this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.petsService.remove(id);
  }
}
