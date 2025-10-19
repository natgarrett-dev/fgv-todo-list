# 📝 Todo List - Vue.js + TypeScript

Um aplicativo completo de gerenciamento de tarefas construído com Vue.js 3, TypeScript, Pinia e Vue Router. Este projeto demonstra as melhores práticas de desenvolvimento frontend com uma arquitetura moderna e escalável.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?style=flat&logo=pinia&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat&logo=vite&logoColor=white)

## ✨ Funcionalidades

- ✅ **CRUD Completo de Tarefas**
  - Criar novas tarefas
  - Marcar tarefas como concluídas/pendentes
  - Deletar tarefas
  - Visualizar lista de tarefas

- 👤 **Perfil de Usuário**
  - Estatísticas em tempo real
  - Total de tarefas
  - Taxa de conclusão
  - Tarefas pendentes

- 🎨 **Interface Moderna**
  - Design responsivo
  - Animações suaves
  - Gradientes e sombras
  - Estados de loading e erro

- 🧪 **Testes Unitários**
  - Cobertura da store Pinia
  - Mocks de API
  - Vitest + Testing Library

## 🚀 Tecnologias Utilizadas

- **[Vue.js 3](https://vuejs.org/)** - Framework progressivo para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Pinia](https://pinia.vuejs.org/)** - Gerenciamento de estado oficial do Vue
- **[Vue Router](https://router.vuejs.org/)** - Roteamento oficial do Vue
- **[Vite](https://vitejs.dev/)** - Build tool rápido e moderno
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários
- **[JSON Server](https://github.com/typicode/json-server)** - API REST simulada
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Linting e formatação de código

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 20.19.0 ou >= 22.12.0
- **npm** >= 8.0.0 (incluído com Node.js)
- Um editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd todo-list-vue
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados local**

O arquivo `db.json` já está configurado na raiz do projeto com dados iniciais:
```json
{
  "todos": [
    {
      "id": "1",
      "title": "Aprender JS",
      "completed": false
    },
    {
      "id": "2",
      "title": "Aprender Python",
      "completed": false
    }
  ]
}
```

## 🎮 Como Executar

### Desenvolvimento (Aplicação + API)

Execute ambos os servidores simultaneamente:

```bash
npm run dev:all
```

Isso iniciará:
- **Aplicação Vue.js**: http://localhost:5173
- **JSON Server (API)**: http://localhost:3000

### Apenas a Aplicação

```bash
npm run dev
```

### Apenas o JSON Server

```bash
npm run json-server
```

## 🧪 Executar Testes

### Testes Unitários

```bash
npm run test:unit
```

### Testes em Modo Watch

```bash
npm run test:unit -- --watch
```

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
todo-list-vue/
├── src/
│   ├── views/              # Páginas/Views
│   │   ├── TodoList.vue    # Lista de tarefas
│   │   └── UserProfile.vue # Perfil do usuário
│   ├── stores/             # Gerenciamento de estado (Pinia)
│   │   ├── __tests__/      # Testes da store
│   │   └── todo.ts         # Store de tarefas
│   ├── router/             # Configuração de rotas
│   │   └── index.ts
│   ├── App.vue             # Componente raiz
│   └── main.ts             # Ponto de entrada
├── db.json                 # Banco de dados JSON Server
├── vite.config.ts          # Configuração do Vite
├── vitest.config.ts        # Configuração do Vitest
├── tsconfig.json           # Configuração TypeScript
└── package.json            # Dependências e scripts
```

## 🎨 Recursos da Interface

### Página de Tarefas
- Formulário para adicionar novas tarefas
- Lista interativa de tarefas
- Checkbox para marcar como concluída
- Botão de deletar tarefas
- Contador de tarefas total e concluídas
- Estados de loading e erro
- Design responsivo

### Página de Perfil
- Avatar do usuário
- Informações básicas
- Estatísticas em cards coloridos:
  - Total de tarefas
  - Tarefas concluídas
  - Tarefas pendentes
  - Taxa de conclusão percentual

## 🔌 API Endpoints

O JSON Server expõe os seguintes endpoints:

- `GET /todos` - Lista todas as tarefas
- `POST /todos` - Cria uma nova tarefa
- `PATCH /todos/:id` - Atualiza uma tarefa
- `DELETE /todos/:id` - Deleta uma tarefa

## 🧩 Arquitetura e Padrões

### Composition API
O projeto utiliza a Composition API do Vue 3, proporcionando:
- Melhor organização de código
- Reutilização de lógica
- Melhor suporte ao TypeScript

### Pinia Store Pattern
```typescript
export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref<Todo[]>([])
  
  // Actions
  async function fetchTodos() { /* ... */ }
  
  // Getters
  const completedCount = () => todos.value.filter(t => t.completed).length
  
  return { todos, fetchTodos, completedCount }
})
```

### TypeScript Interfaces
```typescript
export interface Todo {
  id: number
  title: string
  completed: boolean
}
```

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview da build de produção |
| `npm run test:unit` | Executa testes unitários |
| `npm run lint` | Verifica e corrige problemas de lint |
| `npm run format` | Formata código com Prettier |
| `npm run json-server` | Inicia apenas o JSON Server |
| `npm run dev:all` | Inicia aplicação + API simultaneamente |

## 🎯 Conceitos Aprendidos

Este projeto aborda:

1. **Vue.js Fundamentals**
   - Composition API
   - Reactive refs
   - Computed properties
   - Lifecycle hooks (onMounted)
   - Event handling
   - Two-way binding (v-model)
   - Conditional rendering (v-if, v-else)
   - List rendering (v-for)

2. **State Management (Pinia)**
   - Definição de stores
   - State, actions e getters
   - Integração com componentes (storeToRefs)

3. **Routing (Vue Router)**
   - Configuração de rotas
   - Navegação programática
   - RouterLink e RouterView

4. **TypeScript**
   - Interfaces e tipos
   - Tipagem de funções e variáveis
   - Type safety em Vue components

5. **API Integration**
   - Fetch API
   - Async/await
   - Tratamento de erros
   - Loading states

6. **Testing**
   - Testes unitários com Vitest
   - Mocking de APIs
   - Testing stores

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto foi criado para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como projeto prático para aprendizado de Vue.js, TypeScript e arquitetura de frontend moderno.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

## 📚 Recursos Adicionais

- [Documentação Vue.js](https://vuejs.org/)
- [Documentação Pinia](https://pinia.vuejs.org/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Guia Vue Router](https://router.vuejs.org/guide/)
- [Documentação Vitest](https://vitest.dev/)
