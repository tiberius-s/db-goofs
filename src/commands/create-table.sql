CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text,
  email text UNIQUE,
  PASSWORD text,
  CONSTRAINT email_unique UNIQUE (email)
)