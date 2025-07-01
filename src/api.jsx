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

export const login = async (username, password) => {
    try {
        const result = await invoke("login_user", {
            username: username,
            password: password,
        })

        return { success: true, data: result }
    }
    catch (e) {
        return { success: false, error: e.toString() };
    }
}

export const signup = async (username, name, password) => {
    try {
        const id = await invoke('insert_user', {
            username: username,
            name: name,
            password: password,
        });
        return { success: true, data: id };
    } catch (err) {
        console.log(err);

        return { success: false, error: err.toString() };
    }
}

// Mission API

export const getAllMissions = async (user_id) => {
    const result = await invoke("get_all_missions", { user_id });
    return result;
}

export const getMission = async (id) => {
    const result = await invoke('get_mission', { id });
    const task = JSON.parse(JSON.stringify(result));
    return task;
}

export const insertMission = async (mission) => {
    try {
        const id = await invoke('insert_mission', {
            title: mission.title,
            user_id: mission.userId,
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const editMission = async (mission) => {
    try {
        const id = await invoke('edit_mission', {
            id: mission.id,
            title: mission.title,
            user_id: mission.userId,
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const deleteMission = async (id) => {
    try {
        await invoke('delete_mission', {
            id: id
        });
        return "Successfully Deleted Mission";
    } catch (err) {
        return err + "";
    }
}

// Rewards API

export const getAllRewards = async (user_id) => {
    const result = await invoke("get_all_rewards", { user_id });
    return result;
}

export const getReward = async (id) => {
    const result = await invoke('get_reward', { id });
    const task = JSON.parse(JSON.stringify(result));
    return task;
}

export const insertReward = async (reward) => {
    try {
        const id = await invoke('insert_reward', {
            rew_name: reward.name,
            rew_point: reward.points,
            rew_status: reward.status,
            user_id: reward.userId
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const editReward = async (reward) => {
    try {
        const id = await invoke('edit_mission', {
            id: reward.id,
            rew_name: reward.name,
            rew_point: reward.points,
            rew_status: reward.status,
            user_id: reward.userId
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const deleteReward = async (id) => {
    try {
        await invoke('delete_reward', {
            id: id
        });
        return "Successfully Deleted Reward";
    } catch (err) {
        return err + "";
    }
}

// Session Check

export const checkSession = async () => {
    try {
        const result = await invoke("get_session")
        if (result) {
            return result
        } else {
            return null;
        }
    } catch (error) {
        return error
    }
}


export const saveSession = async (user_id, token) => {
    try {
        console.log(user_id + " : " + token);

        const id = await invoke('save_session', {
            user_id, token,
        });
        console.log(id);

        return id;
    } catch (err) {
        console.log(err);

        return err + "";
    }
};

export const clearSession = async () => {
    try {
        await invoke("clear_session");
        return true
    } catch (err) {
        return err + ""
    }
}