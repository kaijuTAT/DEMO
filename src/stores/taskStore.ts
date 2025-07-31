import { defineStore } from 'pinia';
import type { Task } from '../types';
import { getTasks, addTaskApi, updateTaskApi, deleteTaskApi } from '../services/taskApi';

/**
 * Defines the Pinia store for managing tasks.
 * It handles fetching, adding, updating, and deleting tasks,
 * and manages loading and error states.
 */
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[], // Array to hold all task objects.
    loading: false,      // Boolean to indicate if tasks are currently being loaded.
    error: null as string | null, // Stores any error message during API calls.
  }),
  actions: {
    /**
     * Fetches tasks from the API and updates the store's state.
     * Sets loading state, handles potential errors, and populates the tasks array.
     */
    async fetchTasks() {
      this.loading = true;
      this.error = null; // Clear previous errors
      try {
        this.tasks = await getTasks();
      } catch (err) {
        // Type guard for error handling
        this.error = err instanceof Error ? err.message : 'An unknown error occurred during fetch.';
        console.error('Failed to fetch tasks:', err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Adds a new task to the task list.
     * Calls the API to add the task, then re-fetches the entire list to ensure consistency.
     * @param title The title of the new task to be added.
     */
    async addTask(title: string) {
      console.log('taskStore: addTask action called.');
      try {
        const newTask = await addTaskApi(title);
        console.log('taskStore: New task received from API:', newTask);
        // Re-fetch all tasks to ensure consistency with mock API after adding.
        // This is crucial for localStorage persistence.
        await this.fetchTasks(); 
        console.log('taskStore: Tasks re-fetched after adding.', this.tasks);
      } catch (err) {
        console.error('Failed to add task:', err);
        this.error = err instanceof Error ? err.message : 'An unknown error occurred during add.';
      }
    },

    /**
     * Toggles the completion status of a task.
     * Calls the API to update the task, then re-fetches the entire list.
     * @param id The ID of the task to toggle.
     */
    async toggleComplete(id: number) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      if (taskToUpdate) {
        // Create a new object to avoid direct mutation of state before API call.
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        try {
          await updateTaskApi(updatedTask);
          // Re-fetch all tasks to ensure consistency with mock API after update.
          await this.fetchTasks();
        } catch (err) {
          console.error('Failed to update task completion status:', err);
          this.error = err instanceof Error ? err.message : 'An unknown error occurred during toggle.';
        }
      }
    },

    /**
     * Edits the title of an existing task.
     * Calls the API to update the task, then re-fetches the entire list.
     * @param id The ID of the task to edit.
     * @param newTitle The new title for the task.
     */
    async editTask(id: number, newTitle: string) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      if (taskToUpdate) {
        // Create a new object to avoid direct mutation of state before API call.
        const updatedTask = { ...taskToUpdate, title: newTitle };
        try {
          await updateTaskApi(updatedTask);
          // Re-fetch all tasks to ensure consistency with mock API after update.
          await this.fetchTasks();
        } catch (err) {
          console.error('Failed to edit task:', err);
          this.error = err instanceof Error ? err.message : 'An unknown error occurred during edit.';
        }
      }
    },

    /**
     * Deletes a task from the task list.
     * Calls the API to delete the task, then updates the local state by filtering.
     * Note: For delete, direct filtering is often sufficient as the item is removed.
     * @param id The ID of the task to delete.
     */
    async deleteTask(id: number) {
      try {
        await deleteTaskApi(id);
        // Update local state directly after delete, as re-fetching might be overkill for a removal.
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (err) {
        console.error('Failed to delete task:', err);
        this.error = err instanceof Error ? err.message : 'An unknown error occurred during delete.';
      }
    },
  },
});