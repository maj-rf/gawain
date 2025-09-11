import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, boolean, integer, uuid, primaryKey, pgEnum } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .defaultNow()
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
});

export const board = pgTable('board', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const roleEnum = pgEnum('role', ['owner', 'member']);

export const boardMember = pgTable(
  'board_member',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    boardId: uuid('board_id')
      .notNull()
      .references(() => board.id, { onDelete: 'cascade' }),
    role: roleEnum('role').notNull().default('member'),
  },
  (table) => [primaryKey({ columns: [table.userId, table.boardId] })]
);

export const column = pgTable('column', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  boardId: uuid('board_id')
    .notNull()
    .references(() => board.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const card = pgTable('card', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  columnId: uuid('column_id')
    .notNull()
    .references(() => column.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relations
export const boardRelations = relations(board, ({ many }) => ({
  member: many(boardMember),
  column: many(column),
}));

export const boardMemberRelations = relations(boardMember, ({ one }) => ({
  user: one(user, {
    fields: [boardMember.userId],
    references: [user.id],
  }),
  board: one(board, {
    fields: [boardMember.boardId],
    references: [board.id],
  }),
}));

export const columnRelations = relations(column, ({ one, many }) => ({
  board: one(board, {
    fields: [column.boardId],
    references: [board.id],
  }),
  card: many(card),
}));

export const cardRelation = relations(card, ({ one }) => ({
  column: one(column, {
    fields: [card.columnId],
    references: [column.id],
  }),
}));

export type TBoard = typeof board.$inferSelect;
export type TColumn = typeof column.$inferSelect;
export type TCard = typeof card.$inferSelect;
