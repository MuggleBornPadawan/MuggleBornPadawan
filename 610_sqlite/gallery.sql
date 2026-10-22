PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE artwork (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price REAL
);
INSERT INTO artwork VALUES(1,'Chola Bronze Shiva',4500.5);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('artwork',1);
COMMIT;
