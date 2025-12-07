import { pgTable, uuid, text, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- Tables ---

export const boards = pgTable('boards', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const departments = pgTable('departments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  boardId: uuid('board_id').references(() => boards.id).notNull(),
});

export const priorities = pgTable('priorities', {
  id: uuid('id').defaultRandom().primaryKey(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  boardId: uuid('board_id').references(() => boards.id).notNull(),
});

export const responsibles = pgTable('responsibles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  departmentId: uuid('department_id').references(() => departments.id).notNull(),
});

export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  boardId: uuid('board_id').references(() => boards.id).notNull(),
});

export const notes = pgTable('notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  dueDate: timestamp('due_date'),
  priorityId: uuid('priority_id').references(() => priorities.id).notNull(),
  boardId: uuid('board_id').references(() => boards.id).notNull(),
});

export const noteTags = pgTable('note_tags', {
  noteId: uuid('note_id').references(() => notes.id).notNull(),
  tagId: uuid('tag_id').references(() => tags.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.noteId, t.tagId] }),
}));

export const noteResponsibles = pgTable('note_responsibles', {
  noteId: uuid('note_id').references(() => notes.id).notNull(),
  responsibleId: uuid('responsible_id').references(() => responsibles.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.noteId, t.responsibleId] }),
}));

// --- Relations ---

export const boardsRelations = relations(boards, ({ many }) => ({
  departments: many(departments),
  priorities: many(priorities),
  tags: many(tags),
  notes: many(notes),
}));

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  board: one(boards, { fields: [departments.boardId], references: [boards.id] }),
  responsibles: many(responsibles),
}));

export const prioritiesRelations = relations(priorities, ({ one, many }) => ({
  board: one(boards, { fields: [priorities.boardId], references: [boards.id] }),
  notes: many(notes),
}));

export const responsiblesRelations = relations(responsibles, ({ one, many }) => ({
  department: one(departments, { fields: [responsibles.departmentId], references: [departments.id] }),
  notes: many(noteResponsibles),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
  board: one(boards, { fields: [tags.boardId], references: [boards.id] }),
  notes: many(noteTags),
}));

export const notesRelations = relations(notes, ({ one, many }) => ({
  board: one(boards, { fields: [notes.boardId], references: [boards.id] }),
  priority: one(priorities, { fields: [notes.priorityId], references: [priorities.id] }),
  tags: many(noteTags),
  responsibles: many(noteResponsibles),
}));

export const noteTagsRelations = relations(noteTags, ({ one }) => ({
  note: one(notes, { fields: [noteTags.noteId], references: [notes.id] }),
  tag: one(tags, { fields: [noteTags.tagId], references: [tags.id] }),
}));

export const noteResponsiblesRelations = relations(noteResponsibles, ({ one }) => ({
  note: one(notes, { fields: [noteResponsibles.noteId], references: [notes.id] }),
  responsible: one(responsibles, { fields: [noteResponsibles.responsibleId], references: [responsibles.id] }),
}));
