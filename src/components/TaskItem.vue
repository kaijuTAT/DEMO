<script setup lang="ts">
import type { Task } from '../types';
import { ref } from 'vue';

interface TaskItemProps {
  task: Task;
}

const props = defineProps<TaskItemProps>();
const emit = defineEmits<{ (e: 'toggleComplete', id: number): void; (e: 'delete', id: number): void; (e: 'edit', id: number, newTitle: string): void; }>();

const isEditing = ref(false);
const newTitle = ref(props.task.title);

const handleEdit = () => {
  isEditing.value = true;
};

const handleSave = () => {
  emit('edit', props.task.id, newTitle.value);
  isEditing.value = false;
};

const handleCancel = () => {
  newTitle.value = props.task.title;
  isEditing.value = false;
};
</script>

<template>
  <li :class="[`task-item`, { completed: props.task.completed }]">
    <input
      type="checkbox"
      :checked="props.task.completed"
      @change="emit('toggleComplete', props.task.id)"
      class="task-item-checkbox"
    />
    <input
      v-if="isEditing"
      type="text"
      v-model="newTitle"
    />
    <span v-else>{{ props.task.title }}</span>

    <div class="task-item-button-group">
      <template v-if="isEditing">
        <button @click="handleSave" class="task-item-button">保存</button>
        <button @click="handleCancel" class="task-item-button">取消</button>
      </template>
      <template v-else>
        <button @click="handleEdit" class="task-item-button">编辑</button>
        <button @click="emit('delete', props.task.id)" class="task-item-button">删除</button>
      </template>
    </div>
  </li>
</template>

<style scoped>
/* You can add component-specific styles here if needed */
</style>
