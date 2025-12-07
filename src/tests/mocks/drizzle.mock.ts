import { vi } from 'vitest';

export const createDrizzleMock = () => ({
  query: {
    boards: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
    departments: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
    priorities: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
    responsibles: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
    tags: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
    notes: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
    },
  },
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  transaction: vi.fn((cb) =>
    cb({
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      returning: vi.fn(),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    }),
  ),
});
