import fs from "fs";

const dbPath = "db.json";

/**
 *
 * @param {string} tableName Name table to read
 * @returns {Array<T>} element in table
 */
function readTableDB(tableName) {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data)[tableName];
  } catch (error) {
    console.error("Error leyendo la base de datos:", error.message);
    return { [tableName]: [] };
  }
}

function readDB() {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo la base de datos:", error.message);
    return {};
  }
}

function writeTableDB(tableName, data) {
  try {
    const dataTable = readDB();
    const newData = { ...dataTable, [tableName]: data };
    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2), "utf-8");
  } catch (error) {
    console.error("Error escribiendo la base de datos:", error.message);
  }
}

/**
 *
 * @param {string} tableName Name table to read
 * @param {Record<any,any>} dataToUpdate new object to save
 * @param {string | number} keyToCompare identifier to find unique element in table
 * @returns {Array}
 */
function updateTableDB(tableName, dataToUpdate, keyToCompare = "id") {
  try {
    const dataTable = readTableDB(tableName);
    const updated = dataTable.map((data) =>
      data[keyToCompare] === dataToUpdate[keyToCompare] ? dataToUpdate : data
    );

    writeTableDB(tableName, updated);
    return dataToUpdate;
  } catch (error) {
    console.error("Error actualizando la base de datos:", error.message);
  }
}

/**
 *
 * @param {string} tableName name table
 * @param {string|number} value unique value to find element to remove
 * @param {string?} keyToCompare identifier to find unique element in table
 * @returns {Record<any,any>} Element removed
 */
function deleteTableDB(tableName, value, keyToCompare = "id") {
  try {
    const dataTable = readTableDB(tableName);
    const removed = dataTable.filter((data) => data[keyToCompare] !== value);

    writeTableDB(tableName, removed);
    return { removed: value };
  } catch (error) {
    console.error("Error actualizando la base de datos:", error.message);
  }
}

/**
 *
 * @param {string} tableName name table in BD
 * @param {Record<any,any>} object Element to insert in table
 * @returns Object inserted
 */
function addObjectInTable(tableName, object) {
  try {
    const table = readTableDB(tableName);
    const newInventoryObject = {
      id: table.length > 0 ? table[table.length - 1].id + 1 : 1,
      ...object,
    };
    table.push(newInventoryObject);
    writeTableDB(tableName, table);
    return newInventoryObject;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

let db = {
  addObjectInTable,
  readTableDB,
  updateTableDB,
  deleteTableDB,
};
export default db;
