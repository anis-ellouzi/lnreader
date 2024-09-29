//import SQLite from 'react-native-sqlite-storage';
//const db = SQLite.openDatabase({ name: 'lnreader.db', location: 'default' });

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('lnreader.db');
export default db;
