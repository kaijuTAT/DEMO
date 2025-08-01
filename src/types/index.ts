/**
 * 定义任务对象的结构。
 * @interface Task
 * @property id - 任务的唯一标识符。
 * @property title - 任务的标题或描述。
 * @property completed - 布尔值，指示任务是否已完成。
 */
export interface Task {
    id: number;
    title: string;
    completed: boolean;
}
