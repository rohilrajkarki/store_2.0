import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("products.db");

export const initDB = () => {
  db.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      fromDealer TEXT,
      shelfCount INTEGER,
      shelfCapacity INTEGER,
      stockCount INTEGER,
      reducedCount INTEGER,
      totalCount INTEGER,
      toOrderCount INTEGER,
      expiryDate TEXT
    );`
  );
};

export const insertProduct = async (product: {
  name: string;
  from: string;
  shelfCount: string;
  shelfCapacity: string;
  stockCount: string;
  reducedCount: string;
  totalCount: string;
  toOrderCount: string;
  expiryDate: string;
}) => {
  await db.runAsync(
    `INSERT INTO products 
     (name, fromDealer, shelfCount,shelfCapacity, stockCount, reducedCount, totalCount, toOrderCount,expiryDate )
     VALUES (?, ?, ?, ?, ?, ?, ?,?,?);`,
    [
      product.name,
      product.from,
      parseInt(product.shelfCount),
      parseInt(product.shelfCapacity),
      parseInt(product.stockCount),
      parseInt(product.reducedCount),
      parseInt(product.totalCount),
      parseInt(product.toOrderCount),
      product.expiryDate,
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
    shelfCapacity: number;
    stockCount: number;
    reducedCount: number;
    totalCount: number;
    toOrderCount: number;
    expiryDate: string;
  }
) => {
  await db.runAsync(
    `UPDATE products SET 
      name = ?, 
      fromDealer = ?, 
      shelfCount = ?, 
      shelfCapacity = ?, 
      stockCount = ?, 
      reducedCount = ?, 
      totalCount = ?, 
      toOrderCount = ?,
      expiryDate = ?
     WHERE id = ?`,
    [
      updatedProduct.name,
      updatedProduct.fromDealer,
      updatedProduct.shelfCount,
      updatedProduct.shelfCapacity,
      updatedProduct.stockCount,
      updatedProduct.reducedCount,
      updatedProduct.totalCount,
      updatedProduct.toOrderCount,
      updatedProduct.expiryDate,
      id,
    ]
  );
};

export const getDb = () => db;
