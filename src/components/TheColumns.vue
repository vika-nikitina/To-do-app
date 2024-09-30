<template>
    <div class="kanban">
        <div v-if="columns.length === 0" class="empty-columns">
            <p>У вас еще нет колонок. Добавьте новую колонку, чтобы начать работу.</p>
        </div>
        <div v-else class="board-columns">
            <div v-for="column in columns" :key="column.id" class="kanban__column" @dragover.prevent="handleDragOver"
                @drop="(event) => handleDrop(event, column.id)">
                <div class="column-header">
                    <input v-model="column.title" :placeholder="'Введите название колонки'" class="column-title"
                        @blur="handleUpdateColumn(column)">
                    <div class="column-icons">
                        <PlusIcon class="header__icon header__icon--add" @click="() => handleOpenModal(column.id)" />
                        <TheBinIcon @click="() => handleDeleteColumn(column.id)" />
                    </div>
                </div>
                <TheTasks :tasks="getTasksForColumn(column.id)" @edit-task="handleEditTask"
                    @delete-task="handleDeleteTask" @dragstart="handleDragStart" @dragend="handleDragEnd" />
            </div>
        </div>
    </div>
</template>

<script>
import TheTasks from './TheTasks.vue';
import PlusIcon from './images/PlusIcon.vue';
import TheBinIcon from './images/TheBinIcon.vue';

export default {
    name: 'TheColumns',
    components: {
        TheTasks,
        PlusIcon,
        TheBinIcon,
    },
    props: {
        columns: Array,
        tasks: Array
    },
    methods: {
        getTasksForColumn(columnId) {
            return this.tasks.filter(task => task.columnId === columnId);
        },
        handleOpenModal(columnId) {
            this.$emit('open-modal', columnId);
        },
        handleEditTask(task) {
            this.$emit('edit-task', task);
        },
        handleDeleteTask(taskId) {
            this.$emit('delete-task', taskId);
        },
        handleUpdateColumn(column) {
            this.$emit('update-column', column);
        },
        handleDeleteColumn(columnId) {
            this.$emit('delete-column', columnId);
        },
        handleDragStart(event) {
            const taskId = event.target.closest('.kanban__task').dataset.taskId;
            event.dataTransfer.setData("taskId", taskId);
            console.log('Dragging task ID:', taskId);
            event.target.classList.add('selected');
            this.$emit('drag-start', event);
        },
        handleDragEnd(event) {
            event.target.classList.remove('selected');
        },
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDrop(event, columnId) {
            event.preventDefault();
            const taskId = event.dataTransfer.getData("taskId");
            console.log('Dropped task ID:', taskId);
            if (taskId) {
                this.$emit('move-task', { taskId, columnId });
            } else {
                console.error('taskId not found');
            }
        },
    }
}
</script>



<style scoped>
.kanban {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.board-columns {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
}

.kanban__column {
    background-color: #013D5A;
    padding: 10px;
    border-radius: 15px;
    width: calc(33.333% - 14px);
    /* 3 колонки с учетом отступов */
    min-width: 250px;
    /* Минимальная ширина колонки */
    box-sizing: border-box;
}

@media (max-width: 1200px) {
    .kanban__column {
        width: calc(50% - 10px);
        /* 2 колонки на средних экранах */
    }
}

@media (max-width: 768px) {
    .kanban__column {
        width: 100%;
        /* 1 колонка на маленьких экранах */
    }
}

.column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 10px;
}

.header__icon {
    cursor: pointer;
}

.header__icon--add {
    font-size: 1.5rem;
}

.column-title {
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    border: none;
    background: transparent;
    padding: 5px;
    color: #FCF3E3;
    border-radius: 5px;
}

.column-title:hover,
.column-title:focus {
    background-color: rgba(255, 255, 255, 0.2);
    outline: none;
}

.kanban__icon {
    width: 100%;
    height: auto;
    margin: 0px 7px;
}

.empty-columns {
    width: 100%;
    text-align: center;
    padding: 20px;
    background-color: #BDD3CE;
    border-radius: 15px;
    color: #013D5A;
}

.column-icons {
    display: flex;
    align-items: center;
}

.selected {
    border: 2px dashed #000;
}
</style>