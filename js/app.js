/**
 * @file app.js
 * @desc 应用的主入口文件。可以把它想象成项目的“总指挥”，
 *       它负责监听用户的操作，然后调用其他模块（UI、Store）来完成具体工作。
 */

// 为了代码的可维护性，我们将所有用到的 CSS 选择器集中在这里管理。
// 这样做的好处是，如果未来 HTML 结构变了，我们只需要修改这里一处，
// 而不是在代码的海洋里到处寻找和替换“魔法字符串”。
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

// --- 辅助函数：将具体操作封装起来，让主逻辑更清晰 ---

/**
 * @desc 处理删除任务的逻辑。被主事件监听器调用。
 * @param {number} id - 要删除的任务的 ID。
 * @param {HTMLElement} taskItemElement - 该任务对应的 DOM 元素。
 */
function handleDelete(id, taskItemElement) {
    // 在执行敏感操作前，给用户一个反悔的机会。
    if (confirm('确定要删除此任务吗？')) {
        Store.removeTask(id); // 先更新数据
        UI.removeTaskFromUI(taskItemElement); // 再更新视图
    }
}

/**
 * @desc 处理切换任务完成状态的逻辑。
 * @param {number} id - 任务的 ID。
 * @param {HTMLElement} taskItemElement - 该任务对应的 DOM 元素。
 */
function handleToggleComplete(id, taskItemElement) {
    const task = Store.getTasks().find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        Store.updateTask(task);
        // 直接在 DOM 元素上切换样式，比重绘整个列表性能更好。
        taskItemElement.classList.toggle('completed');
    }
}

/**
 * @desc 处理编辑任务的逻辑。
 * @param {number} id - 任务的 ID。
 * @param {HTMLElement} taskItemElement - 该任务对应的 DOM 元素。
 */
function handleEdit(id, taskItemElement) {
    const titleSpan = taskItemElement.querySelector(Selectors.TITLE);
    const currentTitle = titleSpan.textContent;
    
    // 使用 prompt 提供一个简单的编辑界面。
    const newTitle = prompt('请输入新的任务标题：', currentTitle);

    // 确保用户输入了内容，并且没有点击“取消”。
    if (newTitle !== null && newTitle.trim() !== '') {
        const task = Store.getTasks().find(t => t.id === id);
        if (task) {
            task.title = newTitle.trim();
            Store.updateTask(task);
            titleSpan.textContent = newTitle.trim(); // 同样，只更新需要改变的 DOM 部分。
        }
    }
}

// --- 主事件监听器：程序的起点 ---

/**
 * 监听 DOMContentLoaded 事件，确保在执行 JS 代码时，
 * 页面的 HTML 已经完全加载并解析完毕，避免操作到不存在的元素。
 */
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载后，立即从 Store 获取任务并显示它们。
    UI.displayTasks(Store.getTasks());
});

/**
 * 监听“添加任务”表单的提交事件。
 */
document.querySelector(Selectors.TASK_FORM).addEventListener('submit', (e) => {
    // 阻止表单的默认提交行为，因为我们不想让页面刷新。
    e.preventDefault();
    
    const title = document.querySelector(Selectors.TASK_INPUT).value.trim();

    if (title === '') {
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

/**
 * 核心技巧：事件委托 (Event Delegation)。
 * 我们不在每个按钮（删除、编辑）上都单独绑定事件，
 * 而是只在它们的父容器（ul#task-list）上绑定一个事件监听器。
 * 当点击事件发生时，我们检查被点击的元素（e.target）来判断用户的意图。
 * 好处：
 * 1. 性能更高：只需一个监听器，而不是几十上百个。
 * 2. 动态内容友好：即使是后来动态添加的任务，这个监听器也同样有效。
 */
document.querySelector(Selectors.TASK_LIST).addEventListener('click', (e) => {
    const target = e.target;
    const taskItem = target.closest(Selectors.TASK_ITEM);

    // 如果点击的不是任务项内的元素，则直接忽略。
    if (!taskItem) {
        return;
    }

    const id = Number(taskItem.getAttribute('data-id'));

    // 根据被点击元素的 class，分发到不同的处理函数。
    if (target.matches(Selectors.DELETE_BTN)) {
        handleDelete(id, taskItem);
    } else if (target.matches(Selectors.CHECKBOX)) {
        handleToggleComplete(id, taskItem);
    } else if (target.matches(Selectors.EDIT_BTN)) {
        handleEdit(id, taskItem);
    }
});

/**
 * 监听搜索框的实时输入事件 (keyup)。
 */
document.querySelector(Selectors.SEARCH_INPUT).addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();
    const allTasks = Store.getTasks();
    
    // 这是一个纯粹的客户端筛选。
    const filteredTasks = allTasks.filter(task => 
        task.title.toLowerCase().includes(searchText)
    );
    
    // 用筛选后的结果重新渲染列表。
    UI.displayTasks(filteredTasks);
});
