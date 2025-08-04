/**
 * @class Task
 * @desc 创建一个任务对象，作为应用的数据模型。
 */
class Task {
    /**
     * @param {string} title - 任务的标题。
     * @param {boolean} [completed=false] - 任务是否完成，默认为 false。
     */
    constructor(title, completed = false) {
        /**
         * @property {number} id - 任务的唯一标识符，使用时间戳生成。
         */
        this.id = Date.now();

        /**
         * @property {string} title - 任务的标题。
         */
        this.title = title;

        /**
         * @property {boolean} completed - 任务的完成状态。
         */
        this.completed = completed;
    }
}
