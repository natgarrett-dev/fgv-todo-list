<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">👤</div>
        <h1>Meu Perfil</h1>
      </div>

      <div class="profile-info">
        <div class="info-item">
          <span class="label">Nome:</span>
          <span class="value">Usuário</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">usuario@email.com</span>
        </div>
      </div>

      <div class="stats">
        <h2>📊 Estatísticas</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-number">{{ totalCount() }}</div>
            <div class="stat-label">Total de Tarefas</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-number">{{ completedCount() }}</div>
            <div class="stat-label">Concluídas</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-number">{{ totalCount() - completedCount() }}</div>
            <div class="stat-label">Pendentes</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-number">{{ completionRate }}%</div>
            <div class="stat-label">Taxa de Conclusão</div>
          </div>
        </div>
      </div>

      <router-link to="/" class="btn-back"> ← Voltar para Tarefas </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
const { completedCount, totalCount } = todoStore

const completionRate = computed(() => {
  const total = totalCount()
  if (total === 0) return 0
  return Math.round((completedCount() / total) * 100)
})
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.profile-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 100%;
  max-width: 700px;
}

.profile-header {
  text-align: center;
  margin-bottom: 40px;
}

.avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  margin: 0 auto 20px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.profile-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.profile-info {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 40px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #666;
  font-size: 16px;
}

.value {
  color: #333;
  font-size: 16px;
}

.stats {
  margin-bottom: 30px;
}

.stats h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.btn-back {
  display: block;
  width: 100%;
  padding: 15px;
  background: #667eea;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-back:hover {
  background: #5568d3;
}

@media (max-width: 600px) {
  .profile-card {
    padding: 30px 20px;
  }

  .profile-header h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .avatar {
    width: 100px;
    height: 100px;
    font-size: 50px;
  }
}
</style>
