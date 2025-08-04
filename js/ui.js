/**
 * @class UI
 * @desc 负责处理所有与用户界面（DOM）相关的操作。
 */
class UI {
    /**
     * @desc 渲染任务列表到页面。
     * @param {Task[]} tasks - 要渲染的任务数组。
     */
    static displayTasks(tasks) {
        const taskList = document.querySelector(Selectors.TASK_LIST);
        taskList.innerHTML = ''; // 清空现有列表

        tasks.forEach(task => UI.addTaskToLi(task));
    }

    /**
     * @desc 创建一个任务列表项（li）并添加到列表中。
     * @param {Task} task - 要添加的任务对象。
     */
    static addTaskToLi(task) {
        const taskList = document.querySelector(Selectors.TASK_LIST);
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        if (task.completed) {
            listItem.classList.add('completed');
        }
        listItem.setAttribute('data-id', task.id);

        listItem.innerHTML = `
            <input
                type="checkbox"
                class="task-item-checkbox"
                ${task.completed ? 'checked' : ''}
            >
            <span class="task-title">${task.title}</span>
            <div class="task-item-button-group">
                <button class="task-item-button edit-btn">编辑</button>
                <button class="task-item-button delete-btn">删除</button>
            </div>
        `;

        taskList.appendChild(listItem);
    }

    /**
     * @desc 清空添加任务的输入框。
     */
    static clearInputField() {
        document.querySelector(Selectors.TASK_INPUT).value = '';
    }

    /**
     * @desc 显示提示信息（加载或错误）。
     * @param {string} message - 要显示的信息。
     * @param {string} type - 信息类型（'loading' 或 'error'）。
     */
    static showMessage(message, type) {
        const loadingDiv = document.querySelector('#loading-message');
        const errorDiv = document.querySelector('#error-message');

        if (type === 'loading') {
            loadingDiv.textContent = message;
            loadingDiv.style.display = 'block';
            errorDiv.style.display = 'none';
        } else if (type === 'error') {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            loadingDiv.style.display = 'none';
        }
    }

    /**
     * @desc 隐藏所有提示信息。
     */
    static hideMessages() {
        document.querySelector('#loading-message').style.display = 'none';
        document.querySelector('#error-message').style.display = 'none';
    }

    /**
     * @desc 从 UI 中移除一个任务列表项。
     * @param {HTMLElement} element - 要移除的列表项元素。
     */
    static removeTaskFromUI(element) {
        element.remove();
    }
}
