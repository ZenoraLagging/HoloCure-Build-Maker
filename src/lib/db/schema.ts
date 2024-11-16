import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
  });

  
export const buildsTable = pgTable('builds_table', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' }),
    build_key: text('build_key').notNull().default(''),
    build_string: text('build_string').notNull().default(''),
    name: text('name').notNull(),
    description: text('description'),
    character: text('character').notNull(),
    weapons: text('weapons').array().notNull().default(sql`ARRAY['','','','','']::text[]`),
    bannedWeapon: boolean('banWeapon').notNull().default(false),
    items: text('items').array().notNull().default(sql`ARRAY['','','','','','']::text[]`),
    stamps: text('stamps').array().notNull().default(sql`ARRAY['','','']::text[]`),
    bannedStamp: boolean('banStamp').notNull().default(false),
    stats: text('stats').array().notNull().default(sql`ARRAY[]::text[]`),
    supportItem: text('supportItem').notNull().default(''),
    foodDish: text('foodDish').notNull().default(''),
    prism: text('prism').notNull().default(''),
    weaponSlots: integer('weaponSlots').notNull().default(6),
    itemSlots: integer('itemSlots').notNull().default(6),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });
  

export const commentsTable = pgTable('comments_table', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    buildId: integer('build_id')
    .notNull()
    .references(() => buildsTable.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertBuild = typeof buildsTable.$inferInsert;
export type SelectBuild = typeof buildsTable.$inferSelect;
export type InsertComment = typeof commentsTable.$inferInsert;
export type SelectComment = typeof commentsTable.$inferSelect;