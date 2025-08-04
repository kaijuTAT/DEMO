<script setup lang="ts">
import { ref } from 'vue';

/**
 * @desc 定义该组件可以发出的事件。
 * @event addTask - 当需要添加新任务时发出，携带任务标题。
 */
const emit = defineEmits<{ (e: 'addTask', title: string): void }>();

// 任务输入字段的响应式引用。
const title = ref('');

/**
 * @desc 处理表单提交事件。
 *       阻止默认的表单提交，验证输入，
 *       弹出确认提示，发出 'addTask' 事件，并清除输入框。
 */
const handleSubmit = () => {
    // 防止添加空任务。
    if (!title.value.trim()) return;
    
    // 添加任务前弹出确认对话框。
    if (confirm('确定要添加此任务吗？')) {
        console.log('AddTaskForm: 表单已提交，正在发出 addTask 事件。');
        emit('addTask', title.value);
        title.value = ''; // 提交后清除输入字段。
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
/* 如果需要，可以在这里添加组件特定的样式 */
</style>