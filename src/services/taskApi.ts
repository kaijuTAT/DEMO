import type { Task } from '../types';

// 用于在 localStorage 中存储任务的键
const LOCAL_STORAGE_KEY = 'my-task-app-tasks';

/**
 * 将当前任务列表保存到 localStorage。
 * 这确保了数据在浏览器会话之间持久化。
 * @param tasks 要保存的任务数组。
 */
const saveTasksToLocalStorage = (tasks: Task[]): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

/**
 * 从 localStorage 加载任务。
 * 如果未找到任务，则返回一个空数组。
 * @returns 从 localStorage 加载的任务数组。
 */
const loadTasksFromLocalStorage = (): Task[] => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
        return JSON.parse(storedTasks);
    }
    return []; // 如果没有存储任何内容，则返回空数组
};

// 首次加载时，如果 localStorage 为空，则用于填充的初始默认任务。
const defaultTasks: Task[] = [
    { id: 1, title: '学习 Vue', completed: true },
    { id: 2, title: '学习 Pinia', completed: false },
    { id: 3, title: '构建一个很棒的 Vue 应用', completed: false },
];

/**
 * 模拟从后端 API 获取任务。
 * 数据从 localStorage 加载，如果为空，则使用默认任务进行初始化。
 * 包括用于演示目的的模拟延迟和随机错误。
 * @returns 一个解析为任务数组的 Promise。
 */
export const getTasks = async (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟随机网络错误，以演示 UI 中的错误处理。
            if (Math.random() > 0.8) {
                reject(new Error('由于网络错误，获取任务失败。'));
            } else {
                let currentTasks = loadTasksFromLocalStorage();
                // 如果 localStorage 为空，则使用默认任务填充并保存它们。
                if (currentTasks.length === 0) {
                    currentTasks = defaultTasks;
                    saveTasksToLocalStorage(currentTasks);
                }
                resolve(currentTasks);
            }
        }, 1000); // 模拟网络延迟
    });
};

/**
 * 模拟向后端 API 添加新任务。
 * 新任务被添加到 localStorage 中，并保存更新后的列表。
 * @param title 新任务的标题。
 * @returns 一个解析为新创建任务的 Promise。
 */
export const addTaskApi = async (title: string): Promise<Task> => {
    const currentTasks = loadTasksFromLocalStorage();
    const newTask: Task = {
        id: Date.now(), // 根据当前时间戳生成唯一 ID。
        title,
        completed: false,
    };
    currentTasks.push(newTask);
    saveTasksToLocalStorage(currentTasks);
    console.log('taskApi: 新任务已创建并添加到 localStorage:', newTask);
    return Promise.resolve(newTask);
};

/**
 * 模拟在后端 API 中更新现有任务。
 * 任务在 localStorage 中更新，并保存修改后的列表。
 * @param task 具有更新属性的任务对象。
 * @returns 一个解析为更新后任务的 Promise。
 */
export const updateTaskApi = async (task: Task): Promise<Task> => {
    const currentTasks = loadTasksFromLocalStorage();
    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
        currentTasks[index] = task;
        saveTasksToLocalStorage(currentTasks);
    }
    return Promise.resolve(task);
};

/**
 * 模拟从后端 API 删除任务。
 * 任务从 localStorage 中移除，并保存更新后的列表。
 * @param id 要删除的任务的 ID。
 * @returns 一个在任务成功删除时解析的 Promise。
 */
export const deleteTaskApi = async (id: number): Promise<void> => {
    let currentTasks = loadTasksFromLocalStorage();
    currentTasks = currentTasks.filter((task) => task.id !== id);
    saveTasksToLocalStorage(currentTasks);
    return Promise.resolve();
};
