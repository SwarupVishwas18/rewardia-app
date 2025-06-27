use rusqlite::{Connection, Result, params};
use std::path::Path;
use serde_json::{Value, json};
const DB_PATH: &str = "rewardia.db";
const DB_SCHEMA: &str = include_str!("schema.sql");
use chrono::Local;
use serde::Serialize;

#[derive(Serialize)]
pub struct User {
   id: i64,
    name: String,
    username: String,
    password: String,
}

#[derive(Serialize)]
pub struct Mission {
    id: i64,
    title: String,
    user_id: i64,
}

#[derive(Serialize)]
pub struct Task {
    id: i64,
    mission: i64,
    task_name: String,
    user_id: i64,
    points: i64,
    due_date: String,
    is_completed: i64, 
}

#[derive(Serialize)]
pub struct Reward {
    id: i64,
    rew_name: String,
    rew_point: i64,
    rew_status: String,
    user_id: i64,
}


fn sqlite_value_to_json(val: rusqlite::types::Value) -> Value {
    use rusqlite::types::Value::*;
    match val {
        Null => Value::Null,
        Integer(i) => json!(i),
        Real(f) => json!(f),
        Text(t) => json!(t),
        Blob(b) => json!(b), // Optionally base64-encode if needed
    }
}

#[tauri::command]
pub fn init_database() -> Result<String, String>  {

    let db_exists = Path::new(DB_PATH).exists();
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    if !db_exists {
        conn.execute_batch(DB_SCHEMA).map_err(|e| e.to_string())?;
    }

    Ok("Base file created.".into())
}

// Task CRUD Function

#[tauri::command]
pub fn get_all_tasks(user_id: i64) -> Result<Vec<Task>, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT * FROM task WHERE user_id = ?")
        .map_err(|e| e.to_string())?;

    let task_iter = stmt
        .query_map([user_id], |row| {
            Ok(Task {
                id: row.get(0),
                mission: row.get(1),
                task_name: row.get(2),
                user_id: row.get(3),
                points: row.get(4),
                due_date: row.get(5),
                is_completed: row.get(6), 

            })
        })
        .map_err(|e| e.to_string())?;
    let mut tasks = Vec::new();
    for task in task_iter {
        tasks.push(task.map_err(|e| e.to_string())?);
    }
    Ok(task)
}

#[tauri::command]
pub fn get_task(id: i32) -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare("SELECT * FROM task WHERE id = ?").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let task = stmt.query_row([id], |row| {
        let mut obj = serde_json::Map::new();
        for (i, col_name) in column_names.iter().enumerate() {
            let value: rusqlite::types::Value = row.get(i)?;
            obj.insert(col_name.to_string(), sqlite_value_to_json(value));
        }
        Ok(Value::Object(obj))
    });
    match task {
        Ok(task_data) => Ok(task_data),
        Err(rusqlite::Error::QueryReturnedNoRows) => Err("No task found with the given ID.".to_string()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn insert_task(mission: String, task_name: String, user_id: i64, points: i64, due_date: String) -> Result<i64, String> {
    let is_completed = 0;
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO task (mission, task_name, user_id, points, due_date, is_completed) VALUES (?1,?2,?3,?4,?5,?6)",
        params![
            mission,
            task_name ,
            user_id,
            points,
            due_date,
            is_completed 
        ],
    ).map_err(|e| e.to_string())?;

    // Get the id of the just-inserted record
    let id = conn.last_insert_rowid();
    Ok(id)
}

#[tauri::command]
pub fn edit_task(id:i32,mission: String, task_name: String, user_id: i64, points: i64, due_date: String, is_completed: i64) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE task SET
            mission = ?2,
            task_name = ?3,
            user_id = ?4,
            points = ?5,
            due_date = ?6,
            is_completed = ?7,
            WHERE id = ?1",
        params![
            id,
            mission,
            task_name,
            user_id,
            points,
            due_date,
            is_completed,
            ],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn delete_task(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "DELETE FROM task WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;
    Ok(())
    
}


// User CRUD Function

#[tauri::command]
pub fn get_user(username: String) -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare("SELECT * FROM user WHERE username = ?").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let user = stmt.query_row([username], |row| {
        let mut obj = serde_json::Map::new();
        for (i, col_name) in column_names.iter().enumerate() {
            let value: rusqlite::types::Value = row.get(i)?;
            obj.insert(col_name.to_string(), sqlite_value_to_json(value));
        }
        Ok(Value::Object(obj))
    });
    match user {
        Ok(user_data) => Ok(user_data),
        Err(rusqlite::Error::QueryReturnedNoRows) => Err("No user found with the given ID.".to_string()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn insert_user(username: String, name: String, password: String) -> Result<i64, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    conn.execute(
        "INSERT INTO user (username, name, password) VALUES (?1,?2,?3)",
        params![
            username,
            name ,
            password,
        ],
    ).map_err(|e| e.to_string())?;

    // Get the id of the just-inserted record
    let id = conn.last_insert_rowid();
    Ok(id)
}

// Mission CRUD Function

#[tauri::command]
pub fn get_all_missions(user_id: i64) -> Result<Vec<Mission>, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT * FROM mission WHERE user_id = ?")
        .map_err(|e| e.to_string())?;

    let mission_iter = stmt
        .query_map([user_id], |row| {
            Ok(Task {
                id: row.get(0),
                title: row.get(1),
                user_id: row.get(2),
            })
        })
        .map_err(|e| e.to_string())?;
    let mut missions = Vec::new();
    for mission in mission_iter {
        missions.push(mission.map_err(|e| e.to_string())?);
    }
    Ok(missions)
}

#[tauri::command]
pub fn get_mission(id: i32) -> Result<Value, String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare("SELECT * FROM mission WHERE id = ?").map_err(|e| e.to_string())?;
    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let mission = stmt.query_row([id], |row| {
        let mut obj = serde_json::Map::new();
        for (i, col_name) in column_names.iter().enumerate() {
            let value: rusqlite::types::Value = row.get(i)?;
            obj.insert(col_name.to_string(), sqlite_value_to_json(value));
        }
        Ok(Value::Object(obj))
    });
    match mission {
        Ok(mission_data) => Ok(mission_data),
        Err(rusqlite::Error::QueryReturnedNoRows) => Err("No mission found with the given ID.".to_string()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn insert_mission(title: String,  user_id: i64) -> Result<i64, String> {
    let is_completed = 0;
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO mission (title, user_id) VALUES (?1,?2)",
        params![
            title,
            user_id,
        ],
    ).map_err(|e| e.to_string())?;

    // Get the id of the just-inserted record
    let id = conn.last_insert_rowid();
    Ok(id)
}

#[tauri::command]
pub fn edit_mission(id:i32,title: String, user_id: i64) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE mission SET
            title = ?2,
            user_id = ?3,
            WHERE id = ?1",
        params![
            id,
            title,
            user_id,
            ],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn delete_mission(id:i32) -> Result<(), String> {
    let conn = Connection::open(DB_PATH).map_err(|e| e.to_string())?;
    conn.execute(
        "DELETE FROM mission WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;
    Ok(())
}
