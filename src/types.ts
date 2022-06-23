import { Category } from './enums';
import { createCustomer, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

// type Book = {
//     id: number;
//     title: string;
//     category: Category;
//     author: string;
//     available: boolean;
// };

export type BookProperties = keyof Book;

export type PersonBook = Person & Book;
export type BookOrUndefined = Book | undefined;

export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;

type TEmail = 'email';
export type AuthorWoEmail = Omit<Author, TEmail>;

export type CreateCustomerFunctionType = typeof createCustomer;

type fn = (p1: string, p2: number, p3: boolean) => symbol;
type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;
type P4 = Param3<number>;

// interface Book {
//     id: number;
//     title: string;
//     category: Category;
//     author: string;
//     available: boolean;
//     pages?: number;
//     // markDamaged?: (reason: string) => void;
//     // markDamaged?(reason: string): void;
//     markDamaged?: DamageLogger;
// };

// RequiredProps<Book> // id | title | author | available | category
// OptionalProps<Book> // pages | markDamaged

type RequiredProps<T extends object> =
    { [prop in keyof T]: {} extends Pick<T, prop> ? never : prop }[keyof T];

type OptionalProps<T extends object> =
    { [prop in keyof T]: {} extends Pick<T, prop> ? prop : never }[keyof T];

type OptionalFields = OptionalProps<Book>;
type RequiredFields = RequiredProps<Book>;
// type RequiredFields = RequiredProps<number>;

type RemoveProps<T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

type BookRequiredPropsType = RemoveProps<Book, OptionalFields>;
type BookOptionalPropsType = RemoveProps<Book, RequiredFields>;

export type Unpromisify<T> = T extends Promise<infer R> ? R : never;

type FN = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;
