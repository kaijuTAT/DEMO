/**
 * @class UI
 * @desc 负责处理所有与用户界面（DOM）相关的操作。这个类是“视图层”，
 *       它不关心数据如何存储，只关心如何将数据渲染到页面上。
 */
class UI {
    /**
     * @desc 根据给定的任务数组，重新渲染整个任务列表。
     * @param {Task[]} tasks - 要渲染的任务数组。
     */
    static displayTasks(tasks) {
        const taskList = document.querySelector(Selectors.TASK_LIST);
        // 在重绘之前，清空现有列表，这是一个简单直接的策略。
        taskList.innerHTML = '';

        tasks.forEach(task => UI.addTaskToLi(task));
    }

    /**
     * @desc 创建一个任务列表项（li）的 HTML 结构并添加到列表中。
     * @param {Task} task - 要添加的任务对象。
     */
    static addTaskToLi(task) {
        const taskList = document.querySelector(Selectors.TASK_LIST);
        const listItem = document.createElement('li');
        
        // 根据任务状态添加 CSS 类，用于样式控制。
        listItem.className = 'task-item';
        if (task.completed) {
            listItem.classList.add('completed');
        }
        // 将任务的 ID 存储在 DOM 元素的 data-* 属性中，方便之后在事件处理中获取。
        listItem.setAttribute('data-id', task.id);

        // 使用模板字符串构建 HTML，代码更直观。
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
     * @desc 清空“添加任务”的输入框。
     */
    static clearInputField() {
        document.querySelector(Selectors.TASK_INPUT).value = '';
    }

    /**
     * @desc 向用户显示一条提示信息（如加载中或错误）。
     * @param {string} message - 要显示的信息文本。
     * @param {string} type - 信息类型，目前支持 'loading' 或 'error'。
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
     * @desc 隐藏所有的提示信息。
     */
    static hideMessages() {
        document.querySelector('#loading-message').style.display = 'none';
        document.querySelector('#error-message').style.display = 'none';
    }

    /**
     * @desc 从 UI 中平滑地移除一个任务列表项。
     * @param {HTMLElement} element - 要移除的列表项 DOM 元素。
     */
    static removeTaskFromUI(element) {
        // 这里可以添加一些 CSS 动画效果，让删除更自然，例如：
        // element.classList.add('fade-out');
        // setTimeout(() => element.remove(), 500);
        element.remove(); // 目前为了简单，直接移除。
    }
}
