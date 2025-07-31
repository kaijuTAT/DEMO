<script setup lang="ts">
import { ref } from 'vue';

/**
 * Defines the events that this component can emit.
 * @event addTask - Emitted when a new task is to be added, carrying the task title.
 */
const emit = defineEmits<{ (e: 'addTask', title: string): void }>();

// Reactive reference for the task input field.
const title = ref('');

/**
 * Handles the form submission event.
 * Prevents default form submission, validates the input,
 * prompts for confirmation, emits the 'addTask' event, and clears the input.
 */
const handleSubmit = () => {
  // Prevent adding empty tasks.
  if (!title.value.trim()) return;
  
  // Confirmation dialog before adding the task.
  if (confirm('确定要添加此任务吗？')) {
    console.log('AddTaskForm: Form submitted, emitting addTask event.');
    emit('addTask', title.value);
    title.value = ''; // Clear the input field after submission.
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      v-model="title"
      placeholder="添加新任务"
    />
    <button type="submit">添加</button>
  </form>
</template>

<style scoped>
/* You can add component-specific styles here if needed */
</style>
