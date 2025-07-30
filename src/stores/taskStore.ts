import { defineStore } from 'pinia';
import type { Task } from '../types';
import { getTasks, addTaskApi, updateTaskApi, deleteTaskApi } from '../services/taskApi';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        this.tasks = await getTasks();
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An unknown error occurred';
      } finally {
        this.loading = false;
      }
    },
    async addTask(title: string) {
      try {
        const newTask = await addTaskApi(title);
        this.tasks.push(newTask);
      } catch (err) {
        console.error('Failed to add task:', err);
      }
    },
    async toggleComplete(id: number) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        try {
          await updateTaskApi(updatedTask);
          const index = this.tasks.findIndex(task => task.id === id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        } catch (err) {
          console.error('Failed to update task:', err);
        }
      }
    },
    async editTask(id: number, newTitle: string) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, title: newTitle };
        try {
          await updateTaskApi(updatedTask);
          const index = this.tasks.findIndex(task => task.id === id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        } catch (err) {
          console.error('Failed to edit task:', err);
        }
      }
    },
    async deleteTask(id: number) {
      try {
        await deleteTaskApi(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    },
  },
});
