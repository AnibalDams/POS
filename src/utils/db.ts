// db.js
import Dexie from 'dexie';


// Db initialization
export const db:any = new Dexie('myDatabase');
db.version(1).stores({
  sale:"id++, date, paid, customerId, employeeId, total",
  salesProducts:"id++, saleId, productId, dateAdded, amount",
  salePayments:"id++, saleId, date, amount, type",
  friends: '++id, name, age' // Primary key and indexed props
});