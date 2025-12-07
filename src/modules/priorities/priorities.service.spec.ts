import { Test, TestingModule } from '@nestjs/testing';
import { PrioritiesService } from './priorities.service';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { createDrizzleMock } from '../../tests/mocks/drizzle.mock';
import { NotFoundException } from '@nestjs/common';
import { CreatePrioritySchema } from './dto/create-priority.dto';

describe('PrioritiesService', () => {
  let service: PrioritiesService;
  let dbMock: any;

  beforeEach(async () => {
    dbMock = createDrizzleMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrioritiesService,
        {
          provide: DATABASE_CONNECTION,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<PrioritiesService>(PrioritiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a priority', async () => {
      const dto = { value: 5, description: 'Medium', boardId: 'uuid' };
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
    it('should return an array of priorities', async () => {
      const resultMock = [{ id: '1', value: 1, description: 'Low' }];
      dbMock.query.priorities.findMany.mockResolvedValue(resultMock);

      const result = await service.findAll();
      expect(result).toEqual(resultMock);
    });
  });

  describe('findOne', () => {
    it('should return a priority if found', async () => {
      const resultMock = { id: '1', value: 1, description: 'Low' };
      dbMock.query.priorities.findFirst.mockResolvedValue(resultMock);

      const result = await service.findOne('1');
      expect(result).toEqual(resultMock);
    });

    it('should throw NotFoundException if not found', async () => {
      dbMock.query.priorities.findFirst.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a priority', async () => {
      const dto = { value: 8, description: 'High', boardId: 'uuid' };
      const resultMock = { id: '1', ...dto, createdAt: new Date() };

      dbMock.update.mockReturnValue(dbMock);
      dbMock.set.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([resultMock]);

      const result = await service.update('1', dto);
      expect(result).toEqual(resultMock);
      expect(dbMock.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if priority not found during update', async () => {
      const dto = { value: 8, description: 'High', boardId: 'uuid' };

      dbMock.update.mockReturnValue(dbMock);
      dbMock.set.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([]);

      await expect(service.update('1', dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a priority', async () => {
      const resultMock = { id: '1', value: 1, description: 'Low' };

      dbMock.delete.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([resultMock]);

      const result = await service.remove('1');
      expect(result).toEqual(resultMock);
      expect(dbMock.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if priority not found during removal', async () => {
      dbMock.delete.mockReturnValue(dbMock);
      dbMock.where.mockReturnValue(dbMock);
      dbMock.returning.mockResolvedValue([]);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('DTO Validation', () => {
    it('should pass validation for valid values (0-10)', () => {
      const validCases = [0, 5, 10];
      validCases.forEach((val) => {
        const result = CreatePrioritySchema.safeParse({
          value: val,
          description: 'Valid',
          boardId: '123e4567-e89b-12d3-a456-426614174000',
        });
        expect(result.success).toBe(true);
      });
    });

    it('should fail validation for value < 0', () => {
      const result = CreatePrioritySchema.safeParse({
        value: -1,
        description: 'Invalid',
        boardId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          'Value must be between 0 and 10',
        ); // or default zod message, but we customized it
      }
    });

    it('should fail validation for value > 10', () => {
      const result = CreatePrioritySchema.safeParse({
        value: 11,
        description: 'Invalid',
        boardId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          'Value must be between 0 and 10',
        );
      }
    });
  });
});
