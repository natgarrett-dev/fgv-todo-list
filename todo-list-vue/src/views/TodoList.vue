<template>
  <div class="todo-container">
    <div class="todo-card">
      <header class="header">
        <h1>📝 Minhas Tarefas</h1>
        <router-link to="/profile" class="profile-link"> 👤 Perfil </router-link>
      </header>

      <!-- Formulário para adicionar tarefa -->
      <form @submit.prevent="handleAddTodo" class="add-form">
        <input
          v-model="newTodoTitle"
          type="text"
          placeholder="Digite uma nova tarefa..."
          class="input-field"
          :disabled="loading"
        />
        <button type="submit" class="btn btn-add" :disabled="loading || !newTodoTitle.trim()">
          Adicionar
        </button>
      </form>

      <!-- Mensagem de erro -->
      <div v-if="error" class="error-message">⚠️ {{ error }}</div>

      <!-- Loading -->
      <div v-if="loading && todos.length === 0" class="loading">Carregando tarefas...</div>

      <!-- Lista de tarefas -->
      <div v-else-if="todos.length > 0" class="todo-list">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="handleToggleTodo(todo.id)"
            class="checkbox"
            :disabled="loading"
          />
          <span class="todo-title">{{ todo.title }}</span>
          <button @click="handleDeleteTodo(todo.id)" class="btn btn-delete" :disabled="loading">
            🗑️
          </button>
        </div>
      </div>

      <!-- Lista vazia -->
      <div v-else class="empty-state">
        <p>Nenhuma tarefa ainda. Adicione uma nova!</p>
      </div>

      <!-- Contador -->
      <div class="footer">
        <span>Total: {{ totalCount() }} tarefas</span>
        <span>Concluídas: {{ completedCount() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { todos, loading, error } = storeToRefs(todoStore)
const { fetchTodos, addTodo, toggleTodo, deleteTodo, completedCount, totalCount } = todoStore

const newTodoTitle = ref('')

onMounted(() => {
  fetchTodos()
})

async function handleAddTodo() {
  if (newTodoTitle.value.trim()) {
    await addTodo(newTodoTitle.value.trim())
    newTodoTitle.value = ''
  }
}

async function handleToggleTodo(id: number) {
  await toggleTodo(id)
}

async function handleDeleteTodo(id: number) {
  await deleteTodo(id)
}
</script>

<style scoped>
.todo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.todo-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 30px;
  width: 100%;
  max-width: 600px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.profile-link {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
}

.profile-link:hover {
  background: #5568d3;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-add {
  background: #4caf50;
  color: white;
}

.btn-add:hover:not(:disabled) {
  background: #45a049;
}

.btn-delete {
  background: #f44336;
  color: white;
  padding: 8px 12px;
}

.btn-delete:hover:not(:disabled) {
  background: #da190b;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #eeeeee;
}

.todo-item.completed {
  opacity: 0.6;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-title {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
  color: #666;
  font-size: 14px;
}

@media (max-width: 600px) {
  .todo-card {
    padding: 20px;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .add-form {
    flex-direction: column;
  }
}
</style>
