/**
 * Defines the structure of a Task object.
 * @interface Task
 * @property id - Unique identifier for the task.
 * @property title - The title or description of the task.
 * @property completed - Boolean indicating if the task is completed.
 */
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}