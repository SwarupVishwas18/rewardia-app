// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![database::init_database, database::get_all_tasks, database::get_task, database::insert_task, database::edit_task, database::delete_task, database::login_user, database::insert_user, database::get_all_missions, database::get_mission, database::insert_mission, database::delete_mission, database::get_all_rewards, database::get_reward, database::insert_reward, database::edit_reward, database::delete_reward,database::save_session,database::get_session,database::clear_session, database::get_user, database::get_user_points, database::edit_user_points ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
