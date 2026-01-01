import { book, bookRelations } from './book';
import { bookAuthor, bookAuthorRelations } from './book-author';
import { page } from './page';
import { user, userRelations } from './user';

export * from './book';
export * from './book-author';
export * from './columns';
export * from './page';
export * from './user';

export const tables = { bookAuthor, book, user, page } as const;
export const relations = { bookAuthorRelations, bookRelations, userRelations } as const;

export type Tables = typeof tables;
export type TableNames = keyof Tables;
export type Table<TableName extends TableNames> = Tables[TableName];
export type InsertedRecord<TableName extends TableNames> = Table<TableName>['$inferInsert'];
export type ReturnedRecord<TableName extends TableNames> = Table<TableName>['$inferSelect'];
