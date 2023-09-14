import { createRouter, createWebHistory } from 'vue-router';
import TodoListView from '../components/TodoListView.vue'
import AddTodoView from '../components/AddTodoView.vue';

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoListView,
  },
  {
    path: '/add',
    name: 'AddTodo',
    component: AddTodoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
