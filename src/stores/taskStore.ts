import { defineStore } from 'pinia';
import type { Task } from '../types';
import { getTasks, addTaskApi, updateTaskApi, deleteTaskApi } from '../services/taskApi';

/**
 * 定义用于管理任务的 Pinia store。
 * 它处理获取、添加、更新和删除任务，
 * 并管理加载和错误状态。
 */
export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[], // 用于存放所有任务对象的数组。
        loading: false,      // 布尔值，指示当前是否正在加载任务。
        error: null as string | null, // 存储 API 调用期间的任何错误消息。
    }),
    actions: {
        /**
         * 从 API 获取任务并更新 store 的状态。
         * 设置加载状态，处理潜在错误，并填充任务数组。
         */
        async fetchTasks() {
            this.loading = true;
            this.error = null; // 清除以前的错误
            try {
                this.tasks = await getTasks();
            } catch (err) {
                // 错误处理的类型保护
                this.error = err instanceof Error ? err.message : '获取期间发生未知错误。';
                console.error('获取任务失败:', err);
            } finally {
                this.loading = false;
            }
        },

        /**
         * 将新任务添加到任务列表。
         * 调用 API 添加任务，然后重新获取整个列表以确保一致性。
         * @param title 要添加的新任务的标题。
         */
        async addTask(title: string) {
            console.log('taskStore: addTask 操作已调用。');
            try {
                const newTask = await addTaskApi(title);
                console.log('taskStore: 从 API 接收到新任务:', newTask);
                // 添加后重新获取所有任务以确保与模拟 API 的一致性。
                // 这对于 localStorage 的持久性至关重要。
                await this.fetchTasks(); 
                console.log('taskStore: 添加后重新获取的任务。', this.tasks);
            } catch (err) {
                console.error('添加任务失败:', err);
                this.error = err instanceof Error ? err.message : '添加期间发生未知错误。';
            }
        },

        /**
         * 切换任务的完成状态。
         * 调用 API 更新任务，然后重新获取整个列表。
         * @param id 要切换的任务的 ID。
         */
        async toggleComplete(id: number) {
            const taskToUpdate = this.tasks.find(task => task.id === id);
            if (taskToUpdate) {
                // 创建一个新对象以避免在 API 调用之前直接修改状态。
                const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
                try {
                    await updateTaskApi(updatedTask);
                    // 更新后重新获取所有任务以确保与模拟 API 的一致性。
                    await this.fetchTasks();
                } catch (err) {
                    console.error('更新任务完成状态失败:', err);
                    this.error = err instanceof Error ? err.message : '切换期间发生未知错误。';
                }
            }
        },

        /**
         * 编辑现有任务的标题。
         * 调用 API 更新任务，然后重新获取整个列表。
         * @param id 要编辑的任务的 ID。
         * @param newTitle 任务的新标题。
         */
        async editTask(id: number, newTitle: string) {
            const taskToUpdate = this.tasks.find(task => task.id === id);
            if (taskToUpdate) {
                // 创建一个新对象以避免在 API 调用之前直接修改状态。
                const updatedTask = { ...taskToUpdate, title: newTitle };
                try {
                    await updateTaskApi(updatedTask);
                    // 更新后重新获取所有任务以确保与模拟 API 的一致性。
                    await this.fetchTasks();
                } catch (err) {
                    console.error('编辑任务失败:', err);
                    this.error = err instanceof Error ? err.message : '编辑期间发生未知错误。';
                }
            }
        },

        /**
         * 从任务列表中删除任务。
         * 调用 API 删除任务，然后通过筛选更新本地状态。
         * 注意：对于删除，直接筛选通常就足够了，因为项目已被移除。
         * @param id 要删除的任务的 ID。
         */
        async deleteTask(id: number) {
            try {
                await deleteTaskApi(id);
                // 删除后直接更新本地状态，因为对于移除操作来说，重新获取可能有点过头了。
                this.tasks = this.tasks.filter(task => task.id !== id);
            } catch (err) {
                console.error('删除任务失败:', err);
                this.error = err instanceof Error ? err.message : '删除期间发生未知错误。';
            }
        },
    },
});
