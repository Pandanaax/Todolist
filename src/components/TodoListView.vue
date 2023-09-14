<template>
  <div>
    <h1 class="fun-title">Add a Todo</h1>
    <div class="input-group">
      <input type="text" v-model="newTodoText" @keyup.enter="addTodo" placeholder="New Todo" />
      <span class="input-group-button">
        <button @click="addTodo">
          <i class="fa fa-plus"></i> Add
        </button>
      </span>
    </div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <label class="todo-label">
          <input type="checkbox" v-model="todo.is_complete" @change="updateTodoStatus(todo)" />
          <span class="todo-text">{{ todo.text }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import * as api from '../../api.js';

export default {
  data() {
    return {
      todos: [],
      newTodoText: '',
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      this.todos = api.getItems();
    },
    updateTodoStatus(todo) {
      api.updateItem(todo);
    },
    addTodo() {
      if (this.newTodoText.trim() !== '') {
        api.addItem({ text: this.newTodoText, is_complete: false });
        this.newTodoText = '';
        this.fetchTodos();
        this.updateDataJsonLocally();
      }
    },
    async updateDataJsonLocally() {
      const todos = this.todos.map((todo) => ({ id: todo.id, text: todo.text, is_complete: todo.is_complete }));
      const jsonData = { items: todos };
      const jsonString = JSON.stringify(jsonData, null, 2);
      try {
        await window.api.writeFile('./public/data.json', jsonString, 'utf-8');
        console.log('data.json updated locally.');
      } catch (error) {
        console.error('Error updating data.json:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Styles specific to the AddTodoView.vue component */

.fun-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 36px;
  color: #FF5750;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.input-group {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.input-group input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 16px
}

.input-group button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.input-group button:hover {
  background-color: #0056b3;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.todo-label {
  display: flex;
  align-items: center;
}

.todo-label input[type="checkbox"] {
  margin-right: 10px;
}

.todo-text {
  font-size: 18px;
  flex-grow: 1;
}
</style>
