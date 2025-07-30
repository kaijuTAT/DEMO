import type { Task } from '../types';

const tasks: Task[] = [
  { id: 1, title: '学习 Vue', completed: true },
  { id: 2, title: '学习 Pinia', completed: false },
  { id: 3, title: '构建一个很棒的 Vue 应用', completed: false },
];

export const getTasks = async (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random error
      if (Math.random() > 0.8) {
        reject(new Error('Failed to fetch tasks.'));
      } else {
        resolve(tasks);
      }
    }, 1000);
  });
};

export const addTaskApi = async (title: string): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      tasks.push(newTask);
      resolve(newTask);
    }, 300);
  });
};

export const updateTaskApi = async (task: Task): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasks[index] = task;
      }
      resolve(task);
    }, 300);
  });
};

export const deleteTaskApi = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = tasks.findIndex((t) => t.id === id);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
      resolve();
    }, 300);
  });
};
