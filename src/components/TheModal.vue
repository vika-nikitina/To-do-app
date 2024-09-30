<template>
    <div class="modal">
        <div class="modal__container">
            <form @submit.prevent="submitForm">
                <input class="modal_input" v-model="title" type="text" placeholder="Введите заголовок задачи" />
                <textarea class="modal_input" v-model="description" placeholder="Введите описание задачи"></textarea>
                <input class="modal_input" v-model="dueDate" type="date" placeholder="Выберите дату" />
                <button type="submit" class="save-button">Сохранить</button>
                <button type="button" class="cancel-button" @click="close">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheModal',
    props: {
        columns: Array,
        task: Object,
        isEditing: Boolean,
        initialColumnId: Number
    },
    data() {
        return {
            title: this.task?.title || '',
            description: this.task?.description || '',
            dueDate: this.task?.dueDate || '',
            columnId: this.task?.columnId || this.initialColumnId
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submitForm() {
            const updatedTask = {
                id: this.task?.id || Date.now(),
                title: this.title.trim() || 'Без заголовка',
                description: this.description.trim() || 'Без описания',
                dueDate: this.dueDate || 'Без даты',
                columnId: this.columnId
            };
            console.log('Отправка задачи:', updatedTask);
            this.$emit('save-task', updatedTask);
            this.close();
        },
        resetForm() {
            this.title = '';
            this.description = '';
            this.dueDate = '';
        }
    },
    watch: {
        task: {
            handler(newTask) {
                if (newTask) {
                    this.title = newTask.title;
                    this.description = newTask.description;
                    this.dueDate = newTask.dueDate;
                }
            },
            immediate: true
        }
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal__container {
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #BDD3CE
}

.modal__container form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.modal_input {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: #FCF3E3;
    border: 1px;
    border-radius: 5px;
}

.modal__container button {
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}

.save_button {
    padding: 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    /* Добавлено свойство для границы */
    border-radius: 4px;
    background-color: #4CAF50;
    /* Цвет фона кнопки */
    color: white;
    /* Цвет текста кнопки */
}

.modal__container .cancel-button {
    background: #f0f0f0;
    color: #013D5A;
}
</style>
