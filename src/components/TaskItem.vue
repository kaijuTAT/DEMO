<script setup lang="ts">
import type { Task } from '../types';
import { ref } from 'vue';

/**
 * @desc TaskItem 组件的 props 接口。
 * @property task - 要显示的任务对象。
 */
interface TaskItemProps {
    task: Task;
}

/**
 * @desc 定义该组件接收的 props。
 */
const props = defineProps<TaskItemProps>();

/**
 * @desc 定义该组件可以发出的事件。
 * @event toggleComplete - 当任务的完成状态切换时发出。
 * @event delete - 当任务需要被删除时发出。
 * @event edit - 当任务的标题被编辑时发出。
 */
const emit = defineEmits<{ 
    (e: 'toggleComplete', id: number): void; 
    (e: 'delete', id: number): void; 
    (e: 'edit', id: number, newTitle: string): void; 
}>();

// 管理任务项编辑模式的响应式状态。
const isEditing = ref(false);
// 在编辑期间持有新标题的响应式状态。
const newTitle = ref(props.task.title);

/**
 * @desc 处理“编辑”按钮的点击事件。
 *       将组件设置为编辑模式。
 */
const handleEdit = () => {
    isEditing.value = true;
};

/**
 * @desc 处理编辑期间“保存”按钮的点击事件。
 *       验证新标题，发出 'edit' 事件，并退出编辑模式。
 */
const handleSave = () => {
    // 防止保存空的任务标题。
    if (!newTitle.value.trim()) {
        alert('任务标题不能为空！');
        return;
    }
    emit('edit', props.task.id, newTitle.value);
    isEditing.value = false;
};

/**
 * @desc 处理编辑期间“取消”按钮的点击事件。
 *       将新标题重置为原始任务标题，并退出编辑模式。
 */
const handleCancel = () => {
    newTitle.value = props.task.title;
    isEditing.value = false;
};

/**
 * @desc 处理“删除”按钮的点击事件。
 *       在发出 'delete' 事件前弹出确认提示。
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
                <button 
                    @click="handleSave" 
                    class="task-item-button"
                >
                    保存
                </button>
                <button 
                    @click="handleCancel" 
                    class="task-item-button"
                >
                    取消
                </button>
            </template>
            <template v-else>
                <button 
                    @click="handleEdit" 
                    class="task-item-button"
                >
                    编辑
                </button>
                <button 
                    @click="handleDeleteClick" 
                    class="task-item-button"
                >
                    删除
                </button>
            </template>
        </div>
    </li>
</template>

<style scoped>
/* 如果需要，可以在这里添加组件特定的样式 */
</style>
