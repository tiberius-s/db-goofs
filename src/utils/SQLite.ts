import { URL } from "url";
import { join } from "path";
import sqlite, { RunResult } from "sqlite3";

export enum Connection {
  DEFAULT = "default.db",
}

export class SQLite {
  db: sqlite.Database;

  private constructor(db: sqlite.Database) {
    this.db = db;
  }

  static async open(fileName: Connection) {
    const { pathname } = new URL(join("../dbs", fileName), import.meta.url);
    return new Promise<SQLite>((resolve, reject) => {
      const db = new sqlite.Database(pathname, function (err) {
        if (err) return reject(err);
        resolve(new SQLite(db));
      });
    });
  }

  close() {
    return new Promise<void>((resolve, reject) => {
      this.db.close(function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  run(sql: string, params?: unknown[]) {
    return new Promise<RunResult>((resolve, reject) => {
      this.db.run(sql, params, function (err: Error) {
        if (err) return reject(err);
        resolve(this);
      });
    });
  }

  get<T>(sql: string, params?: unknown[]) {
    return new Promise<T | undefined>((resolve, reject) => {
      this.db.get(sql, params, function (err: Error, row?: T) {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  all<T>(sql: string, params?: unknown[]) {
    return new Promise<T[]>((resolve, reject) => {
      this.db.all(sql, params, function (err: Error, rows: T[]) {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  each<T>(sql: string, params: unknown[], callback: (row: T) => unknown) {
    return new Promise<T | number | void>((resolve, reject) => {
      this.db.each(
        sql,
        params,
        function (err: Error, row: T) {
          if (err) return reject(err);
          try {
            callback(row);
          } catch (error) {
            reject(error);
          }
        },
        function (err: Error, count: number) {
          if (err) return reject(err);
          resolve(count);
        },
      );
    });
  }

  exec(sql: string) {
    return new Promise<void>((resolve, reject) => {
      this.db.exec(sql, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  prepare(sql: string, params?: unknown[]) {
    return new Promise<sqlite.Statement>((resolve, reject) => {
      const statement = this.db.prepare(sql, params, function (err) {
        if (err) return reject(err);
      });
      resolve(statement);
    });
  }

  interrupt() {
    this.db.interrupt();
  }
}

export class SQLiteStatement {
  stmt: sqlite.Statement;

  constructor(stmt: sqlite.Statement) {
    this.stmt = stmt;
  }

  bind(...params: unknown[]) {
    return new Promise<sqlite.Statement>((resolve, reject) => {
      this.stmt.bind(params, (err: Error) => {
        if (err) return reject(err);
        resolve(this.stmt);
      });
    });
  }

  reset() {
    return new Promise<sqlite.Statement>((resolve) => {
      this.stmt.reset(() => {
        resolve(this.stmt);
      });
    });
  }

  finalize() {
    return new Promise<void>((resolve, reject) => {
      this.stmt.finalize((err: Error) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  run(...params: unknown[]) {
    return new Promise<RunResult>((resolve, reject) => {
      this.stmt.run(params, function (err: Error) {
        if (err) return reject(err);
        resolve(this);
      });
    });
  }

  get<T>() {
    return new Promise<T | undefined>((resolve, reject) => {
      this.stmt.get(function (err: Error, row?: T) {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  all<T>() {
    return new Promise<T[]>((resolve, reject) => {
      this.stmt.all(function (err: Error, rows: T[]) {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  each<T>(params: unknown[], callback: (row: T) => unknown) {
    return new Promise<T | number | void>((resolve, reject) => {
      this.stmt.each(
        params,
        function (err: Error, row: T) {
          if (err) return reject(err);
          try {
            callback(row);
          } catch (error) {
            reject(error);
          }
        },
        function (err: Error, count: number) {
          if (err) return reject(err);
          resolve(count);
        },
      );
    });
  }
}
