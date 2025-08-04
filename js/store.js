/**
 * @class Store
 * @desc 负责管理所有任务数据的类，是应用的“数据层”。
 *       它封装了所有与 localStorage 的交互细节，使得其他模块
 *       无需关心数据究竟是如何被存储的。
 */
class Store {
    /**
     * @desc 从 localStorage 获取任务列表。
     *       这是一个静态方法，因为操作的是全局唯一的 localStorage，
     *       无需为 Store 创建实例。
     * @returns {Task[]} 一个包含任务对象的数组。
     */
    static getTasks() {
        const tasks = localStorage.getItem('tasks');
        // 如果 localStorage 中没有任务，返回一个空数组，避免后续操作出错。
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
     * @desc 根据 ID 从 localStorage 中移除一个任务。
     * @param {number} id - 要移除的任务的 ID。
     */
    static removeTask(id) {
        let tasks = Store.getTasks();
        // 使用 filter 方法可以优雅地创建一个不包含目标 ID 的新数组。
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * @desc 更新 localStorage 中的一个现有任务。
     * @param {Task} updatedTask - 包含了更新后信息的任务对象。
     */
    static updateTask(updatedTask) {
        const tasks = Store.getTasks();
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        
        // 确保找到了要更新的任务，避免意外错误。
        if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}
