/**
 * @class Store
 * @desc 负责管理所有任务数据的类，包括与 localStorage 的交互。
 */
class Store {
    /**
     * @desc 从 localStorage 获取任务列表。
     * @returns {Task[]} 一个包含任务对象的数组。
     */
    static getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    /**
     * @desc 将一个新任务添加到 localStorage。
     * @param {Task} task - 要添加的任务对象。
     */
    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * @desc 从 localStorage 中移除一个任务。
     * @param {number} id - 要移除的任务的 ID。
     */
    static removeTask(id) {
        let tasks = Store.getTasks();
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * @desc 更新 localStorage 中的一个任务。
     * @param {Task} updatedTask - 更新后的任务对象。
     */
    static updateTask(updatedTask) {
        const tasks = Store.getTasks();
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}
