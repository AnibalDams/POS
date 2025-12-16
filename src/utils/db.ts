// db.js
import Dexie from 'dexie';


// Db initialization
export const db:any = new Dexie('myDatabase');
db.version(1).stores({
  sale:"id++, date, paid, customerId, employeeId, total, profit",
  salesProducts:"id++, saleId, productId, dateAdded, amount",
  salePayments:"id++, saleId, date, amount, type",
  paymentMethods:"id++, name, description, icon, active",
  products: '++id, code, name, cost, price, stock, createdAt, updatedAt, profit',

});