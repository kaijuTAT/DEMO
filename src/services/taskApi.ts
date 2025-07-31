import type { Task } from '../types';

// Key used to store tasks in localStorage
const LOCAL_STORAGE_KEY = 'my-task-app-tasks';

/**
 * Saves the current list of tasks to localStorage.
 * This ensures data persistence across browser sessions.
 * @param tasks The array of tasks to be saved.
 */
const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

/**
 * Loads tasks from localStorage.
 * If no tasks are found, an empty array is returned.
 * @returns An array of tasks loaded from localStorage.
 */
const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return []; // Return empty array if nothing is stored
};

// Initial default tasks to populate if localStorage is empty on first load.
const defaultTasks: Task[] = [
  { id: 1, title: '学习 Vue', completed: true },
  { id: 2, title: '学习 Pinia', completed: false },
  { id: 3, title: '构建一个很棒的 Vue 应用', completed: false },
];

/**
 * Simulates fetching tasks from a backend API.
 * Data is loaded from localStorage, or initialized with default tasks if empty.
 * Includes a simulated delay and random error for demonstration purposes.
 * @returns A Promise that resolves with an array of tasks.
 */
export const getTasks = async (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random network error to demonstrate error handling in UI.
      if (Math.random() > 0.8) {
        reject(new Error('Failed to fetch tasks due to network error.'));
      } else {
        let currentTasks = loadTasksFromLocalStorage();
        // If localStorage is empty, populate with default tasks and save them.
        if (currentTasks.length === 0) {
          currentTasks = defaultTasks;
          saveTasksToLocalStorage(currentTasks);
        }
        resolve(currentTasks);
      }
    }, 1000); // Simulate network latency
  });
};

/**
 * Simulates adding a new task to the backend API.
 * The new task is added to the localStorage and the updated list is saved.
 * @param title The title of the new task.
 * @returns A Promise that resolves with the newly created task.
 */
export const addTaskApi = async (title: string): Promise<Task> => {
  const currentTasks = loadTasksFromLocalStorage();
  const newTask: Task = {
    id: Date.now(), // Generate a unique ID based on current timestamp.
    title,
    completed: false,
  };
  currentTasks.push(newTask);
  saveTasksToLocalStorage(currentTasks);
  console.log('taskApi: New task created and added to localStorage:', newTask);
  return Promise.resolve(newTask);
};

/**
 * Simulates updating an existing task in the backend API.
 * The task is updated in localStorage and the modified list is saved.
 * @param task The task object with updated properties.
 * @returns A Promise that resolves with the updated task.
 */
export const updateTaskApi = async (task: Task): Promise<Task> => {
  const currentTasks = loadTasksFromLocalStorage();
  const index = currentTasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    currentTasks[index] = task;
    saveTasksToLocalStorage(currentTasks);
  }
  return Promise.resolve(task);
};

/**
 * Simulates deleting a task from the backend API.
 * The task is removed from localStorage and the updated list is saved.
 * @param id The ID of the task to be deleted.
 * @returns A Promise that resolves when the task is successfully deleted.
 */
export const deleteTaskApi = async (id: number): Promise<void> => {
  let currentTasks = loadTasksFromLocalStorage();
  currentTasks = currentTasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage(currentTasks);
  return Promise.resolve();
};