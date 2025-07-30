<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskItem from '../components/TaskItem.vue';
import AddTaskForm from '../components/AddTaskForm.vue';

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

const handleAddTask = (title: string) => {
  taskStore.addTask(title);
};

const handleToggleComplete = (id: number) => {
  taskStore.toggleComplete(id);
};

const handleEdit = (id: number, newTitle: string) => {
  taskStore.editTask(id, newTitle);
};

const handleDelete = (id: number) => {
  taskStore.deleteTask(id);
};
</script>

<template>
  <h1>任务列表</h1>
  <AddTaskForm @add-task="handleAddTask" />

  <div v-if="taskStore.loading" class="loading-message">加载中...</div>
  <div v-else-if="taskStore.error" class="error-message">错误: {{ taskStore.error }}</div>
  <ul v-else>
    <TaskItem
      v-for="task in taskStore.tasks"
      :key="task.id"
      :task="task"
      @toggle-complete="handleToggleComplete"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </ul>
</template>

<style scoped>
/* You can add component-specific styles here if needed */
</style>
