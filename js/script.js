'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('.todo__form');
  const addInput = todoForm.querySelector('.todo__input');
  const addBtn = todoForm.querySelector('.todo__button');
  const todoList = document.querySelector('.todo__list');
  const filterContainer = document.querySelector('.todo__buttons');

  // initToDo();

  let id = 0;
  let allTasks = [];

  if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
    })
  }

  if (addInput) {
    addInput.addEventListener('input', () => {
      addBtn.disabled = false;
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', addTask);
  }

  if (todoList) {
    todoList.addEventListener('click', handleListClick);
  }

  if (filterContainer) {
    filterContainer.addEventListener('click', handleFilter);
  }

  // function initToDo() {
  //   const content = localStorage.getItem("todoList");
  //   if (content) {
  //     todoList.innerHTML = content;
  //   }
  // }

  function addTask() {
    if (!addInput.value.trim()) {
      addBtn.disabled = true;
    } else {
      const task = createTask();
      todoList.append(task);
      allTasks.push(task);
      addBtn.disabled = true;
      addInput.value = '';
      saveData(allTasks);
    }
  }

  function saveData(list) {
    localStorage.setItem("todoList", JSON.stringify(list));
  }

  function createTask() {
    const task = document.createElement("li");
    task.id = ++id;
    task.classList.add("todo__task", "task");
    task.innerHTML = `
            <div class="task__input-wrapper">
              <input id=${++id} type="checkbox" class="task__checkbox">
              <label for=${id} class="task__label">${addInput.value.trim()}</label>
            </div>
            <span class="delete"><i class="fa-regular fa-rectangle-xmark"></i></span>
          `;
    return task;
  }

  function handleListClick(e) {
    const deleteBtn = e.target.closest('.delete');
    if (deleteBtn) {
      deleteBtn.parentElement.remove();
      allTasks = allTasks.filter(task => task.id !== deleteBtn.parentElement.id);
    }
    const listItem = e.target.closest(".todo__task");
    const li = allTasks.find(item => item.id === listItem.id);
    li.querySelector('input').checked = listItem.querySelector('input').checked;
    saveData(allTasks);
    return;
  }

  function handleFilter(e) {
    const option = e.target.closest('.todo__option');
    console.log(option.firstElementChild.value);
    sortTask(option.firstElementChild.value, allTasks);
  }

  function updateTodoList(items) {
    todoList.innerHTML = "";
    items.forEach((item) => {
      return todoList.append(item);
    });
  }

  function sortTask(filter, arr) {
    switch (filter) {
      case 'all':
        updateTodoList(arr);
        break;
      case 'done':
        const checkedTasks = arr.filter(item => item.querySelector("input:checked"));
        console.log(checkedTasks);
        updateTodoList(checkedTasks);
        break;
      case 'not':
        const activeTasks = arr.filter(item => !item.querySelector('input:checked'))
        updateTodoList(activeTasks);
        break;
    }
  }

});




