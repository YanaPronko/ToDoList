'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('.todo__form');
  const addInput = todoForm.querySelector('.todo__input');
  const addBtn = todoForm.querySelector('.todo__button');
  const todoList = document.querySelector('.todo__list');
  let id = 0;

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

  function addTask() {
    if (!addInput.value.trim()) {
      addBtn.disabled = true;
    } else {
      const task = document.createElement('li');
      task.classList.add('todo__task', 'task');
      task.innerHTML = `
            <input id=${++id} type="checkbox" class="task__checkbox">
            <label for=${id} class="task__label">${addInput.value.trim()}</label>
            <span><i class="fa-regular fa-rectangle-xmark"></i></span>
          `;
      todoList.append(task);
      addBtn.disabled = false;
      addInput.value = '';
    }
  }
});
