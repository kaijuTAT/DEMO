<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'addTask', title: string): void }>();

const title = ref('');

const handleSubmit = () => {
  if (!title.value.trim()) return;
  emit('addTask', title.value);
  title.value = '';
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
