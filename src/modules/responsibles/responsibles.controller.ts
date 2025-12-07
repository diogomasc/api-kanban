import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Responsibles')
@Controller('responsibles')
export class ResponsiblesController {
  constructor(private readonly responsiblesService: ResponsiblesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new responsible' })
  create(@Body() createResponsibleDto: CreateResponsibleDto) {
    return this.responsiblesService.create(createResponsibleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all responsibles' })
  findAll() {
    return this.responsiblesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a responsible by id' })
  findOne(@Param('id') id: string) {
    return this.responsiblesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a responsible' })
  update(
    @Param('id') id: string,
    @Body() createResponsibleDto: CreateResponsibleDto,
  ) {
    return this.responsiblesService.update(id, createResponsibleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a responsible' })
  remove(@Param('id') id: string) {
    return this.responsiblesService.remove(id);
  }
}
