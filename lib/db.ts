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

export const getProductById = async (id: number) => {
  const result = await db.getFirstAsync(`SELECT * FROM products WHERE id = ?`, [
    id,
  ]);
  return result;
};

export const deleteProduct = async (id: number) => {
  await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
};

export const updateProduct = async (
  id: number,
  updatedProduct: {
    name: string;
    fromDealer: string;
    shelfCount: number;
    stockCount: number;
    reducedCount: number;
    totalCount: number;
    toOrderCount: number;
  }
) => {
  await db.runAsync(
    `UPDATE products SET 
      name = ?, 
      fromDealer = ?, 
      shelfCount = ?, 
      stockCount = ?, 
      reducedCount = ?, 
      totalCount = ?, 
      toOrderCount = ?
     WHERE id = ?`,
    [
      updatedProduct.name,
      updatedProduct.fromDealer,
      updatedProduct.shelfCount,
      updatedProduct.stockCount,
      updatedProduct.reducedCount,
      updatedProduct.totalCount,
      updatedProduct.toOrderCount,
      id,
    ]
  );
};

export const getDb = () => db;
