BEGIN TRANSACTION;

-- User table
CREATE TABLE User (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Category table
CREATE TABLE Mission (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Task table
CREATE TABLE Task (
    id INTEGER PRIMARY KEY,
    mission INTEGER,
    task_name TEXT,
    user_id INTEGER,
    points INTEGER,
    due_date TEXT,        -- store as TEXT (YYYY-MM-DD)
    is_completed INTEGER DEFAULT 0,
    FOREIGN KEY (category) REFERENCES Mission(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Reward table
CREATE TABLE Reward (
    id INTEGER PRIMARY KEY,
    rew_name TEXT NOT NULL,
    rew_point INTEGER,
    rew_status TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

COMMIT;
