export const createDrizzleMock = () => ({
  query: {
    boards: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    departments: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    priorities: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    responsibles: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    tags: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    notes: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  transaction: jest.fn((cb) =>
    cb({
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
    }),
  ),
});
