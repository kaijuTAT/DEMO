/**
 * @file app.js
 * @desc 应用主入口与事件协调器。
 */

// 统一管理 CSS 选择器，避免在代码中使用硬编码的“魔法字符串”。
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

// --- 业务逻辑处理器 ---

/** @desc 处理删除任务的逻辑。 */
function handleDelete(id, taskItemElement) {
    if (confirm('确定要删除此任务吗？')) {
        Store.removeTask(id);
        UI.removeTaskFromUI(taskItemElement);
    }
}

/** @desc 处理切换任务完成状态的逻辑。 */
function handleToggleComplete(id, taskItemElement) {
    const task = Store.getTasks().find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        Store.updateTask(task);
        // 直接操作 classList 比重绘整个列表性能更好。
        taskItemElement.classList.toggle('completed');
    }
}

/** @desc 处理编辑任务的逻辑。 */
function handleEdit(id, taskItemElement) {
    const titleSpan = taskItemElement.querySelector(Selectors.TITLE);
    const currentTitle = titleSpan.textContent;
    const newTitle = prompt('请输入新的任务标题：', currentTitle);

    if (newTitle && newTitle.trim() !== '') {
        const task = Store.getTasks().find(t => t.id === id);
        if (task) {
            task.title = newTitle.trim();
            Store.updateTask(task);
            titleSpan.textContent = newTitle.trim();
        }
    }
}

// --- 事件监听器 ---

// 确保 DOM 完全加载后再执行脚本。
document.addEventListener('DOMContentLoaded', () => {
    UI.displayTasks(Store.getTasks());
});

// 处理新任务的创建。
document.querySelector(Selectors.TASK_FORM).addEventListener('submit', (e) => {
    e.preventDefault(); // 阻止页面刷新
    const title = document.querySelector(Selectors.TASK_INPUT).value.trim();

    if (!title) {
        UI.showMessage('任务标题不能为空！', 'error');
        return;
    }

    if (confirm('确定要添加此任务吗？')) {
        const task = new Task(title);
        Store.addTask(task);
        UI.addTaskToLi(task);
        UI.clearInputField();
        UI.hideMessages();
    }
});

// 使用事件委托处理列表内的所有点击事件，以提升性能并支持动态元素。
document.querySelector(Selectors.TASK_LIST).addEventListener('click', (e) => {
    const target = e.target;
    const taskItem = target.closest(Selectors.TASK_ITEM);

    if (!taskItem) return;

    const id = Number(taskItem.getAttribute('data-id'));

    // 根据目标元素的 class，分发到不同的处理器。
    if (target.matches(Selectors.DELETE_BTN)) {
        handleDelete(id, taskItem);
    } else if (target.matches(Selectors.CHECKBOX)) {
        handleToggleComplete(id, taskItem);
    } else if (target.matches(Selectors.EDIT_BTN)) {
        handleEdit(id, taskItem);
    }
});

// 处理实时搜索。
document.querySelector(Selectors.SEARCH_INPUT).addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();
    const allTasks = Store.getTasks();
    const filteredTasks = allTasks.filter(task => 
        task.title.toLowerCase().includes(searchText)
    );
    UI.displayTasks(filteredTasks);
});
