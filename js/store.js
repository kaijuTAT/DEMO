/**
 * @class Store
 * @desc 封装与 localStorage 的交互，作为应用的“数据持久化层”。
 *       所有方法均为静态，因为 localStorage 是全局唯一的。
 */
class Store {
    /** @desc 从 localStorage 获取任务列表。 */
    static getTasks() {
        const tasks = localStorage.getItem('tasks');
        // 若无数据，返回空数组以保证类型一致性。
        return tasks ? JSON.parse(tasks) : [];
    }

    /** @desc 将新任务添加到 localStorage。 */
    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /** @desc 根据 ID 从 localStorage 移除任务。 */
    static removeTask(id) {
        let tasks = Store.getTasks();
        // 使用 filter 创建一个不含目标 ID 的新数组，实现不可变操作。
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /** @desc 更新 localStorage 中的一个现有任务。 */
    static updateTask(updatedTask) {
        const tasks = Store.getTasks();
        const index = tasks.findIndex(task => task.id === updatedTask.id);
        
        if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}
