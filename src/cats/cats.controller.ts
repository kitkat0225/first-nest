import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) {

	}

	@Post()
	@Roles('admin')
	async create(@Body() createCatDto: CreateCatDto) {
		this.catsService.create(createCatDto);
	}

	@Get()
	async findAll(): Promise<Cat[]> {
		return this.catsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', new ParseIntPipe()) id:number) {
		return 'This action returns a #${ id } cat';
	}

	// @Put(':id')
	// update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
	// 	return 'This action updates a #${ id } cat';
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return 'This actions removes a #${id} cat';
	// }
}