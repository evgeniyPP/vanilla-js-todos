/** @type {HTMLTemplateElement} */
const template = document.querySelector('#todolist-item-template');
const templateContent = template.content;
const todolistItemEl = templateContent.querySelector('.todolist-item');
const todolistItemsEl = document.querySelector('.todolist-items');
/** @type {HTMLFormElement} */
const formEl = document.querySelector('.todolist-form');

const initialTodos = [
  {
    id: 1,
    value: 'Hello World!',
  },
  {
    id: 2,
    value: 'How are you?',
  },
];

initialTodos.forEach(function (item) {
  const newTodo = createTodo(item.value);
  todolistItemsEl.prepend(newTodo);
});

function createTodo(value) {
  const newTodo = todolistItemEl.cloneNode(true);

  /** @type {HTMLSpanElement} */
  const textEl = newTodo.querySelector('.todolist-item__text');
  textEl.textContent = value;

  /** @type {HTMLButtonElement} */
  const copyButton = newTodo.querySelector('.todolist-item__copy');
  copyButton.addEventListener('click', function () {
    const copiedTodoEl = createTodo(value);
    todolistItemsEl.prepend(copiedTodoEl);
  });

  /** @type {HTMLButtonElement} */
  const deleteButton = newTodo.querySelector('.todolist-item__del');
  deleteButton.addEventListener('click', function () {
    todolistItemsEl.removeChild(newTodo);
  });

  return newTodo;
}

formEl.addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const value = values['new-todo-value'];

  const newTodo = createTodo(value);
  todolistItemsEl.prepend(newTodo);

  form.reset();
});
