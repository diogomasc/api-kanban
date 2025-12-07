import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all boards' })
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a board by id' })
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a board' })
  update(@Param('id') id: string, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.update(id, createBoardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board' })
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
