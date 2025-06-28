import { invoke } from "@tauri-apps/api";

export const initDatabase = async () => {
    try {
        const message = await invoke("init_database");
        return message;
    } catch (e) {
        return "Error occured : " + e;
    }
}

// Task API

export const getAllTasks = async (user_id) => {
    const result = await invoke("get_all_tasks", { user_id });
    return result;
}

export const getTask = async (id) => {
    const result = await invoke('get_task', { id });
    const task = JSON.parse(JSON.stringify(result));
    return task;
}

export const insertTask = async (task) => {
    try {
        const id = await invoke('insert_task', {
            mission: task.missionId,
            task_name: task.taskName,
            user_id: task.userId,
            points: task.points,
            due_date: task.dueDate,
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const editTask = async (task) => {
    try {
        const id = await invoke('edit_task', {
            id: task.id,
            mission: task.missionId,
            task_name: task.taskName,
            user_id: task.userId,
            points: task.points,
            due_date: task.dueDate,
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const deleteTask = async (id) => {
    try {
        await invoke('delete_task', {
            id: id
        });
        return "Successfully Deleted Task";
    } catch (err) {
        return err + "";
    }
}

// Users API

export const login = async (loginCreds) => {
    try {
        const result = await invoke("login_user", {
            username: loginCreds.username,
            password: loginCreds.password,
        })

        return result
    }
    catch (e) {
        return '' + e;
    }
}

export const signup = async (signupCreds) => {
    try {
        const id = await invoke('insert_user', {
            username: signupCreds.username,
            name: signupCreds.name,
            password: signupCreds.password,
        });
        return id;
    } catch (err) {
        return err + "";
    }
}

// Mission API