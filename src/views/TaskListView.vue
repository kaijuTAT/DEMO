<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskItem from '../components/TaskItem.vue';
import AddTaskForm from '../components/AddTaskForm.vue';

/**
 * @desc 用于显示和管理任务列表的主视图组件。
 *       与 Pinia 任务存储集成以进行数据管理。
 */

// 初始化 Pinia 任务存储。
const taskStore = useTaskStore();
// 搜索输入字段的响应式引用。
const searchQuery = ref('');

/**
 * @desc 生命周期钩子：在组件挂载后调用。
 *       从存储中启动任务获取。
 */
onMounted(() => {
    taskStore.fetchTasks();
});

/**
 * @desc 一个计算属性，根据搜索查询筛选任务。
 *       如果搜索查询为空，则返回所有任务。
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
 * @desc 处理从 AddTaskForm 发出的 'addTask' 事件。
 *       在任务存储中分派 addTask 操作。
 * @param { string } title - 新任务的标题。
 */
const handleAddTask = (title: string) => {
    console.log('TaskListView: 收到 addTask 事件，调用 store.addTask。');
    taskStore.addTask(title);
};

/**
 * @desc 处理从 TaskItem 发出的 'toggleComplete' 事件。
 *       在任务存储中分派 toggleComplete 操作。
 * @param { number } id - 要切换的任务的 ID。
 */
const handleToggleComplete = (id: number) => {
    taskStore.toggleComplete(id);
};

/**
 * @desc 处理从 TaskItem 发出的 'edit' 事件。
 *       在任务存储中分派 editTask 操作。
 * @param { number } id - 要编辑的任务的 ID。
 * @param { string } newTitle - 任务的新标题。
 */
const handleEdit = (id: number, newTitle: string) => {
    taskStore.editTask(id, newTitle);
};

/**
 * @desc 处理从 TaskItem 发出的 'delete' 事件。
 *       在任务存储中分派 deleteTask 操作。
 * @param { number } id - 要删除的任务的 ID。
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

        <div 
            v-if="taskStore.loading" 
            class="loading-message"
        >
            加载中...
        </div>
        <div 
            v-else-if="taskStore.error" 
            class="error-message"
        >
            错误: {{ taskStore.error }}
        </div>
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