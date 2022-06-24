import { Category } from './enums';
import { Book, Callback, LibMgrCallback, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function setDefaultConfig(options: TOptions): TOptions {
    options.duration ??= 100;
    options.speed ??= 60;
    return options;
}

export function getAllBooks(): ReadonlyArray<Book> {
    const books = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            category: Category.JavaScript,
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];

    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books - ${books.length}`);
    const title = books.find(({ available }) => available)?.title;
    console.log(`First available book - ${title}`);
}

export function getBookTitlesByCategory(categoryToFilter: Category = Category.JavaScript): string[] {
    const books = getAllBooks();

    return books.filter(({ category }) => category === categoryToFilter).map(({ title }) => title);
}

export function logBookTitles(titles: string[]): void {
    for (const title of titles) {
        console.log(title);
    }
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] ?? {};
    return [title, author];
}

export function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    const result = data.reduce((acc: bigint, { books, avgPagesPerBook }) => {
        return acc + BigInt(books) * BigInt(avgPagesPerBook);
    }, 0n);

    return result;
}

export function createCustomerId(name: string, id: number): string {
    return `${id}-${name}`;
}

export function createCustomer(name: string, age?: number, city?: string) {
    console.log(`Customer name: ${name}`);
    if (age) console.log(`Customer age: ${age}`);
    if (city) console.log(`Customer city: ${city}`);
}

export function getBookById(bookId: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(({ id }) => id === bookId);
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);

    return bookIDs
        .map(id => getBookById(id))
        .filter(({ available }) => available)
        .map(({ title }) => title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(({ author }) => author === arg).map(({ title }) => title);
        } else if (typeof arg === 'boolean') {
            return books.filter(({ available }) => available === arg).map(({ title }) => title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(({ title }) => title);
        }
    }
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Value should have been a string');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function bookTitleTransform(title: any) {
    assertStringValue(title);
    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}

export function getObjectProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    const value = obj[prop];
    return typeof value === 'function' ? value.name : value;
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

// export function getBooksByCategory(category: Category, callback: Callback<string[]> ): void {
export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });

    return p;
}

export async function logSearchResults(category: Category) {
    // await Promise.all([]);
    // await Promise.race([]);
    // await Promise.allSettled([]);
    // await Promise.any([]);

    const result: Awaited<Promise<string[]>> = await getBooksByCategoryPromise(category);
    console.log(result.length);
    return result;
}
