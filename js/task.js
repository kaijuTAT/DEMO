/**
 * @class Task
 * @desc 任务数据模型。定义了任务对象的基本结构。
 */
class Task {
    /**
     * @param {string} title - 任务标题。
     * @param {boolean} [completed=false] - 任务完成状态，默认为 false。
     */
    constructor(title, completed = false) {
        // 使用时间戳作为唯一 ID，简单且有效。
        this.id = Date.now();
        this.title = title;
        this.completed = completed;
    }
}
