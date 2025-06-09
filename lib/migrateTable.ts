import { openDatabase } from "expo-sqlite/next"; // ✅ use 'next'

const db = openDatabase("products.db"); // async-compatible db

export const migrateProductsTable = async () => {
  const columnsToAdd = [
    { name: "shelfCapacity", type: "INTEGER" },
    { name: "expiryDate", type: "TEXT" },
  ];

  for (const col of columnsToAdd) {
    try {
      await db.execAsync([
        {
          sql: `ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`,
          args: [],
        },
      ]);
      console.log(`✅ Column '${col.name}' added.`);
    } catch (error: any) {
      if (error.message.includes("duplicate column name")) {
        console.log(`⚠️ Column '${col.name}' already exists.`);
      } else {
        console.error(`❌ Error adding column '${col.name}':`, error);
      }
    }
  }
};
