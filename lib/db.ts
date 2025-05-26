import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("products.db");

export const initDB = () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      fromDealer TEXT,
      shelfCount INTEGER,
      stockCount INTEGER,
      reducedCount INTEGER,
      totalCount INTEGER,
      toOrderCount INTEGER
    );`
  );
};

export const insertProduct = async (product: {
  name: string;
  from: string;
  shelfCount: string;
  stockCount: string;
  reducedCount: string;
  totalCount: string;
  toOrderCount: string;
}) => {
  await db.runAsync(
    `INSERT INTO products 
     (name, fromDealer, shelfCount, stockCount, reducedCount, totalCount, toOrderCount)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      product.name,
      product.from,
      parseInt(product.shelfCount),
      parseInt(product.stockCount),
      parseInt(product.reducedCount),
      parseInt(product.totalCount),
      parseInt(product.toOrderCount),
    ]
  );
};

export const getProducts = async () => {
  return await db.getAllAsync(`SELECT * FROM products`);
};

export const getDb = () => db;
