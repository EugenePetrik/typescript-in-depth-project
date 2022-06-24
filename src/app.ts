import { ReferenceItem, UL, RefBook, Shelf } from './classes';
import { Book, Librarian, Logger, Magazine } from './interfaces';
import { createCustomer, getAllBooks, getBooksByCategory, getBooksByCategoryPromise, getObjectProperty, logCategorySearch, logSearchResults, printRefBook, purge } from './functions';
import { Category } from './enums';
import { Library } from './classes/library';
import { BookRequiredFields, CreateCustomerFunctionType, Unpromisify, UpdatedBook } from './types';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// Task 02-01
// logFirstAvailable(getAllBooks());

// Task 02-06
// logBookTitles(getBookTitlesByCategory(Category.JavaScript));

// Task 02-08
// console.log(getBookAuthorByIndex(0));
// console.log(getBookAuthorByIndex(10));

// Task 02-10
// console.log(calcTotalPages());

// Task 03-01
// let myId: string = createCustomerId('Ann', 10);
// console.log(myId);

// let idGenerator: (p1: string, p2: number) => string;
// idGenerator: (name: string, id: number) => `${id}-${name}`;
// idGenerator = createCustomerId;

// myId = idGenerator('Ann', 10);
// console.log(myId);

// let idGenerator2: typeof createCustomerId;
// let t = typeof createCustomerId;

// Task 03-02
// createCustomer('Ann');
// createCustomer('Ann', 30);
// createCustomer('Ann', 30, 'Lviv');

// console.log(getBookTitlesByCategory());
// logFirstAvailable();

// console.log(getBookById(1));

// const myBooks = checkoutBooks('Anna', 1, 2, 4);
// console.log(myBooks);

// Task 03-03
// let checkedOutBooks;
// checkedOutBooks = getTitles(false);
// console.log(checkedOutBooks);
// checkedOutBooks = getTitles(1, true);
// console.log(checkedOutBooks);
// checkedOutBooks = getTitles('Evan Burchard');
// console.log(checkedOutBooks);

// Task 03-04
// console.log(bookTitleTransform('TypeScript'));
// console.log(bookTitleTransform(100));

// Task 04-01
// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason: string) => console.log(`Damaged ${reason}`),
//     // markDamaged(reason: string) {
//     //     console.log(`Damaged ${reason}`);
//     // },
// };

// printBook(myBook);
// myBook.markDamaged('Missing back cover');

// Task 04-02
// const logDamage: DamageLogger = (reason: string) => console.log(`Damaged ${reason}`);
// const logDamage: Logger = (reason: string) => console.log(`Damaged ${reason}`);
// logDamage('Missing back cover');

// Task 04-03
// const favoriteAuthor: Author = {
//     name: 'Anna',
//     email: 'anna@example.com',
//     numBooksPublished: 3,
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Boris',
//     email: 'boris@example.com',
//     department: 'Classical Literature',
//     assistCustomer(custName: string, bookTitle: string): void {
//         console.log(`CustNameL ${custName}, ${bookTitle}`);
//     }
// };

// Task 04-04
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//         authors: [{ name: 'Anna' }],
//     },
// };

// console.log(offer?.magazine); // undefined
// console.log(offer.magazine?.getTitle()); // undefined
// console.log(offer.book.getTitle?.()); // undefined
// console.log(offer.book.authors?.[1]); // undefined
// console.log(offer.book.authors?.[1]?.name); // undefined

// Task 04-05
// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));

// Task 05-01
// const ref = new ReferenceItem(1, 'Learn TypeScript', 2020);
// ref.printItem();

// ref.publisher = 'abc print';
// console.log(ref.publisher);

// console.log(ref.getID());
// console.log(ref);

// Task 05-02, 05-03
// const refBook = new RefBook(1, 'Learn TypeScript', 2020, 2);
// refBook.printItem();
// refBook.printCitation();
// console.log(refBook);

// Task 05-04
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn TypeScript');

// Task 05-05
// const personBook: PersonBook = {
//     id: 1,
//     author: 'Anna',
//     available: false,
//     category: Category.Angular,
//     email: 'anna@gmail.com',
//     name: 'Anna',
//     title: 'Learn TypeScript',
// };

// const o: TOptions = {
//     duration: 0,
// };

// console.log(setDefaultConfig(o));

// Task 06-03
// const refBook = new RefBook(1, 'Learn TypeScript', 2020, 2);
// printRefBook(refBook);

// const favoriteLibrarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);

// Task 06-05
// const flag = true;

// if (flag) {
//     const obj = await import('./classes');

//     const reader = new obj.Reader();
//     reader.name = 'Anna';
//     console.log(reader);
// }

// if (flag) {
//     import('./classes')
//         .then((obj => {
//             const reader = new obj.Reader();
//             reader.name = 'Anna';
//             console.log(reader);
//         }));
// }

// Task 06-06
// let lib: Library = {
//     id: 1,
//     address: 'unknown',
//     name: 'Anna',
// };

// Task 07-01
// const inventory: Book[] = [
//     { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
// ];

// const books = purge<Book>(inventory);
// console.log(books);

// const result = purge<number>([1, 2, 3, 4, 5]);
// console.log(result);

// Task 07-02
// const bookShelf = new Shelf<Book>();
// inventory.forEach((book) => bookShelf.add(book));
// console.log(bookShelf.getFirst().title);

// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' }
// ];

// const magazineShelf = new Shelf<Magazine>();
// magazines.forEach((magazine) => magazineShelf.add(magazine));
// console.log(magazineShelf.getFirst().title);

// Task 07-03
// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));

// console.log(getObjectProperty(magazines[0], 'title')); // 'title' | 'publisher'
// console.log(getObjectProperty(magazines[0], 'id')); // Argument of type '"id"' is not assignable to parameter of type 'keyof Magazine'.

// Task 07-04
// const bookRequiredFields: BookRequiredFields = {
//     id: 10,
//     title: 'The C Programming Language',
//     author: 'K & R',
//     available: true,
//     category: Category.Software,
//     pages: 200,
//     markDamaged: null,
// };

// const updateBook: UpdatedBook = {};

// const params1: Parameters<CreateCustomerFunctionType> = ['Anna'];
// createCustomer(...params1);

// const params2: Parameters<CreateCustomerFunctionType> = ['Anna', 30, 'Kyiv'];
// createCustomer(...params2);

// Task 08-01
// const u = new UL.UniversityLibrarian();
// // UL.UniversityLibrarian['a'] = 1; // Error

// u['m'] = function () { };
// console.log(u);

// const proto = Object.getPrototypeOf(u);
// console.log(proto);
// proto['m'] = function () { }; // Error

// Task 08-02
// const fLibrarian = new UL.UniversityLibrarian();
// console.log(fLibrarian);

// fLibrarian.name = 'Anna';
// fLibrarian['printLibrarian']();
// console.log(fLibrarian.a); // undefined
// console.log(fLibrarian.b); // undefined

// Task 08-03
// const fLibrarian = new UL.UniversityLibrarian();
// console.log(fLibrarian);

// fLibrarian.assistFaculty = null;
// fLibrarian.teachCommunity = null; // error

// Task 08-04
// const refBook = new RefBook(1, 'Learn TypeScript', 2020, 2);
// refBook.printItem();

// Task 08-05
// const fLibrarian = new UL.UniversityLibrarian();
// fLibrarian.name = 'Anna';
// fLibrarian.assistCustomer('Boris', getAllBooks[0].title);
// console.log(fLibrarian);

// Task 08-06
// const fLibrarian = new UL.UniversityLibrarian();
// fLibrarian.name = 'Anna';
// fLibrarian.assistCustomer('Boris', getAllBooks[0].title);
// console.log(fLibrarian);

// Task 08-07
// const refBook = new RefBook(1, 'Learn TypeScript', 2020, 2);
// refBook.copies = 10;
// refBook.copies = -10; // error
// refBook.copies = 0; // error
// refBook.copies = 2.5; // error
// console.log(refBook);

// Task 09-01
// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log('End');

// Task 09-02
// console.log('Begin');
// getBooksByCategoryPromise(Category.JavaScript)
//     .then((titles: Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>) => {
//         console.log(titles);
//         return Promise.resolve(titles.length);
//     })
//     .catch(err => console.log(err))
//     .then(n => console.log(`n: ${n}`))
//     .catch(err => console.log(err));
// getBooksByCategoryPromise(Category.Software)
//     .then(titles => console.log(titles))
//     .catch(err => console.log(err));;
// console.log('End');

// Task 09-03
console.log('Begin');
logSearchResults(Category.JavaScript);
logSearchResults(Category.Software)
    .catch(err => console.log(err));
console.log('End');
