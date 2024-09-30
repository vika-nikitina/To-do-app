<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="kanban__task" draggable="true" :data-task-id="task.id"
      @dragstart="handleDragStart" @dragend="handleDragEnd">
      <div class="task__header">
        <h3 class="task__title">{{ task.title }}</h3>
        <div class="task__actions">
          <button @click="() => handleEditTask(task)" class="task__action-button">✎</button>
          <button @click="() => handleDeleteTask(task.id)" class="task__action-button">✘</button>
        </div>
      </div>
      <p>{{ task.description }}</p>
      <p>Дата: {{ task.dueDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTasks',
  props: {
    tasks: Array,
  },
  data() {
    return {
      dragging: false,
    };
  },
  methods: {
    handleEditTask(task) {
      this.$emit('edit-task', task);
    },
    handleDeleteTask(taskId) {
      this.$emit('delete-task', taskId);
    },
    handleDragStart(event) {
      this.dragging = true;
      event.dataTransfer.setData("taskId", event.target.closest('.kanban__task').dataset.taskId);
      this.$emit('drag-start', event);
    },
    handleDragEnd(event) {
      this.dragging = false;
      this.$emit('drag-end', event);
    }
  }
}
</script>


<style scoped>
.kanban__task {
  background-color: #BDD3CE;
  color: #013D5A;
  margin: 10px 5px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.task__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.task__title {
  margin: 0;
  font-size: 1.2rem;
}

.task__actions {
  display: flex;
  gap: 10px;
}

.task__action-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.task__action-button:hover {
  color: #000;
}
</style>