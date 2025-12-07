import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all departments' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a department by id' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a department' })
  update(
    @Param('id') id: string,
    @Body() createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.departmentsService.update(id, createDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department' })
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
