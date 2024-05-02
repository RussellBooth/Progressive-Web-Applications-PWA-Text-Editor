import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//export a function we will use to update the database
export const putDb = async (content) => {
  console.log('PUT to the database');

    //create connection to the database and version we want to use
    const jateDB = await openDB('jate', 1);
    
    //create new transaction and specify database and privileges used
    const tx = jateDB.transaction('jate', 'readwrite');

    //open up the desried stored object
    const store = tx.objectStore('jate');

    //update specified data in database with the .put() method
    const request = store.put({id: 1, value: content });

    //confirmation of the GET request
    const result = await request;

    console.log('Data saved to the database', result); 
}; 

// TODO: Add logic for a method that gets all the content from the database
//export a function we will use to GET the database
export const getDb = async () => {
  console.log('GET all from database');

  //create connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);

  //create new transaction and specify database and privileges used
  const tx = jateDB.transaction('jate', 'readonly');

  //open up the desired stored object
  const store = tx.objectStore('jate');

  //get all data in database with the .getAll() method
  const request = store.get(1);

  //confirmation of the GET request
  const result = await request;

  console.log('result.value', result);
  
  return result.value;
}; 

initdb();
