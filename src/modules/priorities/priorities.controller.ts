import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Priorities')
@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new priority' })
  create(@Body() createPriorityDto: CreatePriorityDto) {
    return this.prioritiesService.create(createPriorityDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all priorities' })
  findAll() {
    return this.prioritiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a priority by id' })
  findOne(@Param('id') id: string) {
    return this.prioritiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a priority' })
  update(
    @Param('id') id: string,
    @Body() createPriorityDto: CreatePriorityDto,
  ) {
    return this.prioritiesService.update(id, createPriorityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a priority' })
  remove(@Param('id') id: string) {
    return this.prioritiesService.remove(id);
  }
}
