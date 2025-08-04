/**
 * @file app.js
 * @desc 应用的主入口文件，负责初始化和事件监听。
 */

// 静态选择器，避免魔法字符串
const Selectors = {
    TASK_FORM: '#task-form',
    TASK_INPUT: '#task-input',
    TASK_LIST: '#task-list',
    SEARCH_INPUT: '#search-input',
    TASK_ITEM: '.task-item',
    DELETE_BTN: '.delete-btn',
    EDIT_BTN: '.edit-btn',
    CHECKBOX: '.task-item-checkbox',
    TITLE: '.task-title'
};

/**
 * @desc 处理删除任务的逻辑。
 * @param {number} id - 任务 ID。
 * @param {HTMLElement} taskItemElement - 任务项的 DOM 元素。
 */
function handleDelete(id, taskItemElement) {
    if (confirm('确定要删除此任务吗？')) {
        Store.removeTask(id);
        UI.removeTaskFromUI(taskItemElement);
    }
}

/**
 * @desc 处理切换任务完成状态的逻辑。
 * @param {number} id - 任务 ID。
 * @param {HTMLElement} taskItemElement - 任务项的 DOM 元素。
 */
function handleToggleComplete(id, taskItemElement) {
    const task = Store.getTasks().find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        Store.updateTask(task);
        taskItemElement.classList.toggle('completed');
    }
}

/**
 * @desc 处理编辑任务的逻辑。
 * @param {number} id - 任务 ID。
 * @param {HTMLElement} taskItemElement - 任务项的 DOM 元素。
 */
function handleEdit(id, taskItemElement) {
    const titleSpan = taskItemElement.querySelector(Selectors.TITLE);
    const currentTitle = titleSpan.textContent;
    const newTitle = prompt('请输入新的任务标题：', currentTitle);

    if (newTitle !== null && newTitle.trim() !== '') {
        const task = Store.getTasks().find(t => t.id === id);
        if (task) {
            task.title = newTitle.trim();
            Store.updateTask(task);
            titleSpan.textContent = newTitle.trim();
        }
    }
}

// DOMContentLoaded 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    UI.displayTasks(Store.getTasks());
});

// 监听添加任务的表单
document.querySelector(Selectors.TASK_FORM).addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector(Selectors.TASK_INPUT).value.trim();

    if (title === '') {
        UI.showMessage('任务标题不能为空！', 'error');
        return;
    }

    // 添加任务前弹出确认对话框
    if (confirm('确定要添加此任务吗？')) {
        const task = new Task(title);
        Store.addTask(task);
        UI.addTaskToLi(task);
        UI.clearInputField();
        UI.hideMessages();
    }
});

// 事件委托：处理任务列表中的所有点击事件
document.querySelector(Selectors.TASK_LIST).addEventListener('click', (e) => {
    const target = e.target;
    const taskItem = target.closest(Selectors.TASK_ITEM);

    if (!taskItem) {
        return;
    }

    const id = Number(taskItem.getAttribute('data-id'));

    if (target.matches(Selectors.DELETE_BTN)) {
        handleDelete(id, taskItem);
    } else if (target.matches(Selectors.CHECKBOX)) {
        handleToggleComplete(id, taskItem);
    } else if (target.matches(Selectors.EDIT_BTN)) {
        handleEdit(id, taskItem);
    }
});

// 监听搜索框的输入事件
document.querySelector(Selectors.SEARCH_INPUT).addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();
    const tasks = Store.getTasks();
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchText)
    );
    UI.displayTasks(filteredTasks);
});
