SELECT
  name
FROM
  sqlite_schema
WHERE
  TYPE = 'table'
  AND name NOT LIKE 'sqlite_%';