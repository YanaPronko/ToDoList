'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('.todo__form');
  const addInput = todoForm.querySelector('.todo__input');
  const addBtn = todoForm.querySelector('.todo__button');
  const todoList = document.querySelector('.todo__list');
  const filterContainer = document.querySelector('.todo__buttons');

  let dataTasks = JSON.parse(localStorage.getItem('todo')) || [];
  let filter = getData("filter") || '';

  initToDo(filter, dataTasks);

  if (todoForm) todoForm.addEventListener('submit', (e) => e.preventDefault());

  if (addInput) {
    addInput.addEventListener('input', () => {
      addBtn.disabled = false;
    });
  }

  if (addBtn) addBtn.addEventListener('click', addTask);
  if (todoList) todoList.addEventListener('click', handleListClick);
  if (filterContainer) filterContainer.addEventListener('click', handleFilter);

  function addTask() {
    if (!addInput.value.trim()) {
      addBtn.disabled = true;
    } else {
      const data = {
        id: Date.now(),
        text: addInput.value.trim(),
      };
      dataTasks.push(data);
      saveData(dataTasks);
      const savedFilter = getData('filter');
      sortTask(savedFilter, dataTasks);
      // renderDataTasks(dataTasks);
      addBtn.disabled = true;
      addInput.value = '';
    }
  }

  function saveData(list) {
    localStorage.setItem('todo', JSON.stringify(list));
  }

  function getData(key) {
    return localStorage.getItem(key);
  }

  function renderDataTasks(arr) {
    const tasksForRender = arr.map(createTask);
    updateTodoList(tasksForRender);
    return tasksForRender;
  }

  function createTask(item) {
    const task = document.createElement('li');
    task.classList.add('todo__task', 'task');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = item.id;
    if (item.done) {
      input.setAttribute('checked', null);
    }
    input.classList.add('task__checkbox');
    const label = `<label for=${item.id} class="task__label">${item.text}</label>`;
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task__input-wrapper');
    taskWrapper.append(input);
    taskWrapper.innerHTML += label;
    const span = `<span class="delete"><i class="fa-regular fa-rectangle-xmark"></i></span>`;
    task.append(taskWrapper);
    task.innerHTML += span;
    return task;
  }

  function handleListClick(e) {
    const savedFilter = getData('filter');
    const deleteBtn = e.target.closest('.delete');
    if (deleteBtn) {
      const input = deleteBtn.parentElement.querySelector('input');
      dataTasks = dataTasks.filter((task) => task.id !== parseInt(input.id));
      saveData(dataTasks);
      sortTask(savedFilter, dataTasks);
    }

    const task = e.target.closest('.task__input-wrapper');
    if (task) {
      const input = task.querySelector('input');
      const inputStatus = input.checked;
      const inputId = parseInt(input.id);
      const index = dataTasks.findIndex((item) => item.id === inputId);
      if (index !== -1) {
        dataTasks[index].done = inputStatus;
      }
      saveData(dataTasks);
      sortTask(savedFilter, dataTasks);
    }
    return;
  }

  function handleFilter(e) {
    const optionFilter = e.target.value;
    localStorage.setItem('filter', optionFilter);
    const savedFilter = getData('filter');
    sortTask(savedFilter, dataTasks);
  }

  function updateTodoList(items) {
    todoList.innerHTML = '';
    items.forEach((item) => {
      return todoList.append(item);
    });
  }

  function sortTask(filter, arr) {
    switch (filter) {
      case 'all':
        renderDataTasks(arr);
        break;
      case 'done':
        const checkedTasks = arr.filter(item => item.done === true);
        renderDataTasks(checkedTasks);
        break;
      case 'not':
        const activeTasks = arr.filter(item => !item.done);
        renderDataTasks(activeTasks);
        break;
      default:
        renderDataTasks(arr);
    }
  }

  function initToDo(filter, arr) {
    sortTask(filter, arr);
    const filterOptions = [...filterContainer.children];
    filterOptions.forEach(option => {
      option.firstElementChild.checked = false;
      if (option.firstElementChild.value === filter) {
        option.firstElementChild.checked = true;
      };
    })
  }
});
