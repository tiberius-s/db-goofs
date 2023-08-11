import { readFileSync } from "fs";
import { resolve } from "path";

export enum StatementFile {
  CreateTable,
  ListTables,
}

const loadCommand = (path: string) => {
  const { pathname } = new URL(
    resolve("./src/commands", path),
    import.meta.url
  );
  return readFileSync(pathname, "utf8");
};

const commands = new Map<number, string>([
  [StatementFile.CreateTable, loadCommand("create-table.sql")],
  [StatementFile.ListTables, loadCommand("list-tables.sql")],
]);

export function getSqlStatement(statement: StatementFile) {
  const sql = commands.get(statement);
  if (!sql) throw Error(`${statement} not found`);
  return sql;
}
