/**
 * @class UI
 * @desc 封装所有 DOM 操作，作为应用的“视图层”。
 *       该类不包含任何业务逻辑，仅负责接收数据并渲染到页面。
 */
class UI {
    /** @desc 根据任务数组，重绘整个任务列表。 */
    static displayTasks(tasks) {
        const taskList = document.querySelector(Selectors.TASK_LIST);
        // 每次重绘前清空，这是一个简单有效的策略。
        taskList.innerHTML = '';
        tasks.forEach(task => UI.addTaskToLi(task));
    }

    /** @desc 创建单个任务的 DOM 元素并添加到列表中。 */
    static addTaskToLi(task) {
        const taskList = document.querySelector(Selectors.TASK_LIST);
        const listItem = document.createElement('li');
        
        listItem.className = 'task-item';
        if (task.completed) {
            listItem.classList.add('completed');
        }
        // 将任务 ID 存入 data-* 属性，便于在事件处理中快速获取。
        listItem.setAttribute('data-id', task.id);

        listItem.innerHTML = `
            <input type="checkbox" class="task-item-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-title">${task.title}</span>
            <div class="task-item-button-group">
                <button class="task-item-button edit-btn">编辑</button>
                <button class="task-item-button delete-btn">删除</button>
            </div>
        `;

        taskList.appendChild(listItem);
    }

    /** @desc 清空输入框。 */
    static clearInputField() {
        document.querySelector(Selectors.TASK_INPUT).value = '';
    }

    /** @desc 向用户显示提示信息。 */
    static showMessage(message, type = 'error') {
        const errorDiv = document.querySelector('#error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    /** @desc 隐藏提示信息。 */
    static hideMessages() {
        document.querySelector('#error-message').style.display = 'none';
    }

    /** @desc 从 DOM 中移除一个任务项。 */
    static removeTaskFromUI(element) {
        element.remove();
    }
}
