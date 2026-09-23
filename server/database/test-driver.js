import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { config } from '../config.js';

const dataDir = path.dirname(config.dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(config.uploadsDir)) {
  fs.mkdirSync(config.uploadsDir, { recursive: true });
}

const rawDb = new sqlite3.Database(config.dbPath);

// Criar interface compatível com prepare().all(), get(), run(), exec()
class StatementWrapper {
  constructor(sql) {
    this.sql = sql;
  }

  get(...params) {
    // Usar sincronia via Deasync ou sqlite3 síncrono ou preparar métodos
    return new Promise((resolve, reject) => {
      rawDb.get(this.sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(...params) {
    return new Promise((resolve, reject) => {
      rawDb.all(this.sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  run(...params) {
    return new Promise((resolve, reject) => {
      rawDb.run(this.sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastInsertRowid: this.lastID, changes: this.changes });
      });
    });
  }
}
