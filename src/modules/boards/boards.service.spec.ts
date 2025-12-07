import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { createDrizzleMock } from '../../tests/mocks/drizzle.mock';
import { NotFoundException } from '@nestjs/common';

describe('BoardsService', () => {
  let service: BoardsService;
  let dbMock: any;

  beforeEach(async () => {
    dbMock = createDrizzleMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a board', async () => {
      const dto = { name: 'Test Board' };
      const resultMock = { id: '1', ...dto, createdAt: new Date() };

      dbMock.insert.mockReturnValue(dbMock);
      dbMock.values.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([resultMock]);

      const result = await service.create(dto);
      expect(result).toEqual(resultMock);
      expect(dbMock.insert).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of boards', async () => {
      const resultMock = [{ id: '1', name: 'Board 1' }];
      dbMock.query.boards.findMany.mockResolvedValue(resultMock);

      const result = await service.findAll();
      expect(result).toEqual(resultMock);
    });
  });

  describe('findOne', () => {
    it('should return a board if found', async () => {
      const resultMock = { id: '1', name: 'Board 1' };
      dbMock.query.boards.findFirst.mockResolvedValue(resultMock);

      const result = await service.findOne('1');
      expect(result).toEqual(resultMock);
    });

    it('should throw NotFoundException if not found', async () => {
      dbMock.query.boards.findFirst.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a board', async () => {
      const dto = { name: 'Updated Board' };
      const resultMock = { id: '1', ...dto, createdAt: new Date() };

      dbMock.update.mockReturnValue(dbMock);
      dbMock.set.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([resultMock]);

      const result = await service.update('1', dto);
      expect(result).toEqual(resultMock);
      expect(dbMock.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if board not found during update', async () => {
      const dto = { name: 'Updated Board' };

      dbMock.update.mockReturnValue(dbMock);
      dbMock.set.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([]);

      await expect(service.update('1', dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a board', async () => {
      const resultMock = { id: '1', name: 'Board 1' };

      dbMock.delete.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([resultMock]);

      const result = await service.remove('1');
      expect(result).toEqual(resultMock);
      expect(dbMock.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if board not found during removal', async () => {
      dbMock.delete.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([]);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
