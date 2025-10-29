// db.js
import Dexie from 'dexie';

export const db:any = new Dexie('myDatabase');
db.version(1).stores({
  friends: '++id, name, age' // Primary key and indexed props
});