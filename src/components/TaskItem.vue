<script setup lang="ts">
import type { Task } from '../types';
import { ref } from 'vue';

/**
 * Props interface for the TaskItem component.
 * @property task - The task object to display.
 */
interface TaskItemProps {
  task: Task;
}

/**
 * Defines the props received by this component.
 */
const props = defineProps<TaskItemProps>();

/**
 * Defines the events that this component can emit.
 * @event toggleComplete - Emitted when the task's completion status is toggled.
 * @event delete - Emitted when the task is to be deleted.
 * @event edit - Emitted when the task's title is edited.
 */
const emit = defineEmits<{ 
  (e: 'toggleComplete', id: number): void; 
  (e: 'delete', id: number): void; 
  (e: 'edit', id: number, newTitle: string): void; 
}>();

// Reactive state to manage the editing mode of the task item.
const isEditing = ref(false);
// Reactive state to hold the new title during editing.
const newTitle = ref(props.task.title);

/**
 * Handles the click event for the Edit button.
 * Sets the component into editing mode.
 */
const handleEdit = () => {
  isEditing.value = true;
};

/**
 * Handles the click event for the Save button during editing.
 * Validates the new title, emits the 'edit' event, and exits editing mode.
 */
const handleSave = () => {
  // Prevent saving an empty task title.
  if (!newTitle.value.trim()) {
    alert('任务标题不能为空！');
    return;
  }
  emit('edit', props.task.id, newTitle.value);
  isEditing.value = false;
};

/**
 * Handles the click event for the Cancel button during editing.
 * Resets the new title to the original task title and exits editing mode.
 */
const handleCancel = () => {
  newTitle.value = props.task.title;
  isEditing.value = false;
};

/**
 * Handles the click event for the Delete button.
 * Prompts for confirmation before emitting the 'delete' event.
 */
const handleDeleteClick = () => {
  if (confirm('确定要删除此任务吗？')) {
    emit('delete', props.task.id);
  }
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
        <button @click="handleDeleteClick" class="task-item-button">删除</button>
      </template>
    </div>
  </li>
</template>

<style scoped>
/* You can add component-specific styles here if needed */
</style>