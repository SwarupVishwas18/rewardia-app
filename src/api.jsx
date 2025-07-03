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

export const getAllTasks = async (user_id, mission) => {
    const result = await invoke("get_all_tasks", { userId: user_id, mission: mission });
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
            mission: parseInt(task.missionId),
            taskName: task.taskName,
            userId: parseInt(task.userId),
            points: parseInt(task.points),
            dueDate: task.due_date,
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
            mission: parseInt(task.missionId),
            taskName: task.task_name,
            userId: parseInt(task.userId),
            points: parseInt(task.points),
            dueDate: task.due_date,
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
    const result = await invoke("get_all_missions", { userId: user_id });
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
            userId: mission.userId,
        });
        return id;
    } catch (err) {
        return err + "";
    }
};

export const editMission = async (mission) => {
    try {
        const id = await invoke('edit_mission', {
            id: parseInt(mission.id),
            title: mission.title,
            userId: mission.userId,
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

export const getAllRewards = async (user_id, status) => {
    console.log(user_id);

    const result = await invoke("get_all_rewards", {
        userId: parseInt(user_id),
        status: status
    });
    console.log(result);

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
            name: reward.name,
            points: parseInt(reward.points),
            status: parseInt(reward.status),
            userId: reward.userId
        });
        console.log(id);

        return id;
    } catch (err) {
        return err + "";
    }
};

export const editReward = async (reward) => {
    try {
        console.log(reward);

        const id = await invoke('edit_reward', {
            id: reward.id,
            name: reward.name,
            points: parseInt(reward.points),
            status: parseInt(reward.status),
            userId: reward.userId
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
            userId: user_id, token: token,
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