<template>
  <div class="boards-container">
    <div v-if="boards.length === 0" class="empty-state">
      <h3>У вас еще нет досок</h3>
      <p>Создайте новую доску, чтобы начать работу.</p>
      <button @click="createNewBoard">Создать новую доску</button>
    </div>
    <div v-else-if="!selectedBoard" class="boards-grid">
      <div v-for="board in boards" :key="board.id" class="board-card" @click="selectBoard(board)">
        <div class="board-header">
          <input v-model="board.title" placeholder="Название доски" class="board-title" @click.stop>
          <TheBinIcon @click.stop="deleteBoard(board.id)" class="delete-board-button" />
        </div>
        <textarea v-model="board.description" placeholder="Описание доски" class="board-description"
          @click.stop></textarea>
        <button @click.stop="openModalUser(board.id)" type="button">Управление ролями</button>
      </div>
      <div class="board-card new-board" @click="createNewBoard">
        <span class="plus-icon">+</span>
        <span>Создать новую доску</span>
      </div>
    </div>
    <div v-else class="board-content">
      <div class="board-header">
        <button @click="goBack" class="back-button">Вернуться назад</button>
        <input v-model="selectedBoard.title" placeholder="Введите название доски" class="board-title">
        <button @click="addNewColumn" class="add-column-button">Добавить новую колонку</button>
      </div>
      <TheColumns :columns="selectedBoard.columns" :tasks="selectedBoard.tasks" @open-modal="openModal"
        @edit-task="editTask" @delete-task="deleteTask" @update-column="updateColumn" @delete-column="deleteColumn"
        @move-task="handleMoveTask" />
    </div>
    <TheModal v-if="isModalVisible" :columns="selectedBoard ? selectedBoard.columns : []" :task="currentTask"
      :isEditing="isEditing" :isVisible="isModalVisible" :initialColumnId="currentColumnId" @close="closeModal"
      @save-task="saveTask" />
    <TheModalUser v-if="isModalUserVisible" :isVisible="isModalUserVisible" :users="users" :roles="roles"
      @close="closeModalUser" @search-users="searchUsers" @toggle-user-dropdown="toggleUserDropdown"
      @toggle-roles="toggleRoles" @toggle-role="toggleRole" />
  </div>
</template>

<script>
import TheColumns from './TheColumns.vue';
import TheModal from './TheModal.vue';
import TheBinIcon from './images/TheBinIcon.vue';
import TheModalUser from './TheModalUser.vue';

export default {
  components: {
    TheColumns,
    TheModal,
    TheBinIcon,
    TheModalUser
  },
  data() {
    return {
      boards: [],
      selectedBoard: null,
      isModalVisible: false,
      isModalUserVisible: false,
      currentTask: null,
      isEditing: false,
      currentColumnId: null,
      users: [],
      roles: ['редактор', 'наблюдатель', 'участник']
    };
  },
  methods: {
    createNewBoard() {
      const newBoard = {
        id: Date.now(),
        title: '',
        description: '',
        columns: [],
        tasks: []
      };
      this.boards.push(newBoard);
      this.saveBoards();
    },
    selectBoard(board) {
      this.selectedBoard = board;
    },
    saveBoards() {
      localStorage.setItem('boards', JSON.stringify(this.boards));
    },
    loadBoards() {
      const savedBoards = localStorage.getItem('boards');
      if (savedBoards) {
        this.boards = JSON.parse(savedBoards);
      }
    },
    openModal(columnId) {
      this.currentColumnId = columnId;
      this.currentTask = null;
      this.isEditing = false;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.currentTask = null;
      this.isEditing = false;
    },
    saveTask(task) {
      if (this.selectedBoard) {
        if (this.isEditing) {
          const taskIndex = this.selectedBoard.tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            this.selectedBoard.tasks[taskIndex] = { ...task, columnId: this.currentColumnId };
          }
        } else {
          this.selectedBoard.tasks.push({
            ...task,
            columnId: this.currentColumnId
          });
        }
        console.log('Обновленные задачи:', this.selectedBoard.tasks);
        this.saveBoards();
      }
      this.closeModal();
    },
    editTask(task) {
      this.currentTask = task;
      this.isEditing = true;
      this.isModalVisible = true;
    },
    deleteTask(taskId) {
      if (this.selectedBoard) {
        this.selectedBoard.tasks = this.selectedBoard.tasks.filter(t => t.id !== taskId);
        this.saveBoards();
      }
    },
    goBack() {
      this.selectedBoard = null;
    },
    addNewColumn() {
      if (this.selectedBoard) {
        const newColumnId = this.selectedBoard.columns.length > 0
          ? Math.max(...this.selectedBoard.columns.map(c => c.id)) + 1
          : 1;

        const currentRow = Math.floor((this.selectedBoard.columns.length) / 3) + 1;

        const newColumn = {
          id: newColumnId,
          title: `Новая колонка ${newColumnId}`,
          row: currentRow
        };

        this.selectedBoard.columns.push(newColumn);
        this.saveBoards();
      }
    },
    updateColumn(updatedColumn) {
      if (this.selectedBoard) {
        const columnIndex = this.selectedBoard.columns.findIndex(c => c.id === updatedColumn.id);
        if (columnIndex !== -1) {
          this.selectedBoard.columns[columnIndex] = { ...updatedColumn };
          this.saveBoards();
        }
      }
    },
    deleteColumn(columnId) {
      if (this.selectedBoard) {
        this.selectedBoard.columns = this.selectedBoard.columns.filter(c => c.id !== columnId);
        this.selectedBoard.tasks = this.selectedBoard.tasks.filter(t => t.columnId !== columnId);
        this.saveBoards();
      }
    },
    deleteBoard(boardId) {
      this.boards = this.boards.filter(board => board.id !== boardId);
      this.saveBoards();
    },
    handleMoveTask({ taskId, columnId }) {
      const task = this.selectedBoard.tasks.find(task => task.id === parseInt(taskId));
      if (task) {
        task.columnId = columnId;
      }
    },
    openModalUser(boardId) {
      this.isModalUserVisible = true;
    },
    closeModalUser() {
      this.isModalUserVisible = false;
    },
    searchUsers(query) {
    },
    toggleUserDropdown(userId) {
      const user = this.users.find(user => user.id === userId);
      user.showDropdown = !user.showDropdown;
    },
    toggleRoles(userId) {
      const user = this.users.find(user => user.id === userId);
      user.showRoles = !user.showRoles;
    },
    toggleRole({ userId, role }) {
      const user = this.users.find(user => user.id === userId);
      const roleIndex = user.roles.indexOf(role);
      if (roleIndex > -1) {
        user.roles.splice(roleIndex, 1);
      } else {
        user.roles.push(role);
      }
    },
  },
  created() {
    this.loadBoards();
  }
};
</script>


<style scoped>
.boards-container {
  width: 100%;
  padding: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #013D5A;
}

.add_new_board {
  background-color: #013D5A;
  color: #FCF3E3;
}

.boards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.board-card {
  position: relative;
  background-color: #BDD3CE;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;
  height: fit-content;
}

.board-card:hover {
  background-color: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.board-card .board-title {
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: transparent;
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  position: relative;
}

.board-title-main {
  background-color: #BDD3CE;
  color: #013D5A;
  font-size: 18px;
  font-weight: bold;
  border: 2px;
  background: transparent;
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  position: relative;
}

.board-card .board-description {
  font-size: 14px;
  resize: none;
  border: none;
  background: transparent;
  height: 80px;
  width: 100%;
  padding: 5px;
  position: relative;
  justify-content: center;
  /* Центрирование по вертикали */
  align-items: center;
  /* Центрирование по горизонтали */
}

.board-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.new-board {
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #BDD3CE;
  color: #FCF3E3;
}

.new-board:hover {
  background-color: #BDD3CE;
}

.new-board .plus-icon {
  font-size: 36px;
  margin-bottom: 10px;
  color: #013D5A;
}

.new-board .plus-icon_text {
  font-size: 17px;
  margin-bottom: 10px;
  color: #013D5A;
}

.board-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.board-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  flex-grow: 1;
}

button {
  background-color: #BDD3CE;
  color: #FCF3E3;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #BDD3CE;
}

.back-button {
  background-color: #013D5A;
  color: #FCF3E3;
  margin-right: 20px;
}

.back-button:hover {
  background-color: #013D5A;
}

.add-column-button {
  background-color: #013D5A;
  margin-left: 20px;
}

.add-column-button:hover {
  background-color: #013D5A;
}

.board-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.column {
  flex: 0 0 calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
}

.board-card .delete-icon {
  cursor: pointer;
  margin-left: 10px;
  position: relative;
  z-index: 1;
}
</style>