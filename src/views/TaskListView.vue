<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskItem from '../components/TaskItem.vue';
import AddTaskForm from '../components/AddTaskForm.vue';

/**
 * Main view component for displaying and managing the task list.
 * Integrates with the Pinia task store for data management.
 */

// Initialize the Pinia task store.
const taskStore = useTaskStore();
// Reactive reference for the search input field.
const searchQuery = ref('');

/**
 * Lifecycle hook: Called after the component has been mounted.
 * Initiates fetching tasks from the store.
 */
onMounted(() => {
  taskStore.fetchTasks();
});

/**
 * A computed property that filters the tasks based on the search query.
 * Returns all tasks if the search query is empty.
 */
const filteredTasks = computed(() => {
  if (!searchQuery.value) {
    return taskStore.tasks;
  }
  const query = searchQuery.value.toLowerCase();
  return taskStore.tasks.filter(task =>
    task.title.toLowerCase().includes(query)
  );
});

/**
 * Handles the 'addTask' event emitted from AddTaskForm.
 * Dispatches the addTask action in the task store.
 * @param title The title of the new task.
 */
const handleAddTask = (title: string) => {
  console.log('TaskListView: Received addTask event, calling store.addTask.');
  taskStore.addTask(title);
};

/**
 * Handles the 'toggleComplete' event emitted from TaskItem.
 * Dispatches the toggleComplete action in the task store.
 * @param id The ID of the task to toggle.
 */
const handleToggleComplete = (id: number) => {
  taskStore.toggleComplete(id);
};

/**
 * Handles the 'edit' event emitted from TaskItem.
 * Dispatches the editTask action in the task store.
 * @param id The ID of the task to edit.
 * @param newTitle The new title for the task.
 */
const handleEdit = (id: number, newTitle: string) => {
  taskStore.editTask(id, newTitle);
};

/**
 * Handles the 'delete' event emitted from TaskItem.
 * Dispatches the deleteTask action in the task store.
 * @param id The ID of the task to delete.
 */
const handleDelete = (id: number) => {
  taskStore.deleteTask(id);
};
</script>

<template>
  <div>
    <h1>任务列表</h1>
    <AddTaskForm @add-task="handleAddTask" />

    <input
      type="text"
      v-model="searchQuery"
      placeholder="搜索任务..."
      class="search-input"
    />

    <div v-if="taskStore.loading" class="loading-message">加载中...</div>
    <div v-else-if="taskStore.error" class="error-message">错误: {{ taskStore.error }}</div>
    <ul v-else>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-complete="handleToggleComplete"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </ul>
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1.1em;
  margin-bottom: 20px;
  box-sizing: border-box;
}
</style>
