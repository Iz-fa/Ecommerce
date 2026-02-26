import { Sequelize } from 'sequelize';
import sqlJsAsSqlite3 from 'sql.js-as-sqlite3';
import fs from 'fs';


export let sequelize;

sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: sqlJsAsSqlite3,
  logging: false
});

// Save database to file after write operations.
sequelize.addHook('afterCreate', saveDatabaseToFile);
sequelize.addHook('afterDestroy', saveDatabaseToFile);
sequelize.addHook('afterUpdate', saveDatabaseToFile);
sequelize.addHook('afterSave', saveDatabaseToFile);
sequelize.addHook('afterUpsert', saveDatabaseToFile);
sequelize.addHook('afterBulkCreate', saveDatabaseToFile);
sequelize.addHook('afterBulkDestroy', saveDatabaseToFile);
sequelize.addHook('afterBulkUpdate', saveDatabaseToFile);


export async function saveDatabaseToFile() {
  const dbInstance = await sequelize.connectionManager.getConnection();
  const binaryArray = dbInstance.database.export();
  const buffer = Buffer.from(binaryArray);
  fs.writeFileSync('database.sqlite', buffer);
}
