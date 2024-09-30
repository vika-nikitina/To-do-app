<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Управление Ролями</h3>
            </div>
            <div>
                <input class="search" type="text" v-model="searchQuery" @input="searchUsers"
                    placeholder="Имя пользователя" />
            </div>
            <div class="modal-body">
                <ul>
                    <li v-for="user in filteredUsers" :key="user.id">
                        <div @click="toggleUserDropdown(user.id)">
                            {{ user.name }} ({{ user.email }})
                            <button @click.stop="toggleRoles(user.id)">...</button>
                        </div>
                        <div v-if="user.showDropdown">
                            <div v-if="user.showRoles">
                                <label v-for="role in roles" :key="role">
                                    <input type="checkbox" :checked="user.roles.includes(role)"
                                        @change="toggleRole(user.id, role)" />
                                    {{ role }}
                                </label>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="modal-footer">
                <button class="close" @click="closeModalUser">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isVisible', 'users', 'roles'],
    data() {
        return {
            searchQuery: '',
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },
    methods: {
        closeModalUser() {
            this.$emit('close');
        },
        searchUsers() {
            this.$emit('search-users', this.searchQuery);
        },
        toggleUserDropdown(userId) {
            this.$emit('toggle-user-dropdown', userId);
        },
        toggleRoles(userId) {
            this.$emit('toggle-roles', userId);
        },
        toggleRole(userId, role) {
            this.$emit('toggle-role', { userId, role });
        }
    }
}
</script>


<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    /* Уменьшенная ширина */
    max-width: 90%;
    background-color: #FCF3E3
}

.modal-header,
.modal-body,
.modal-footer {
    margin-bottom: 10px;
    color: #013D5A;
    box-sizing: border-box;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search {
    width: 100%;
    font-size: 15px;
    padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    background-color: #FCF3E3
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}

.close {
    width: 100%;
    font-size: 15px;
    padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
    background-color: #fb9c48;
    color: white;
    border: none;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
    cursor: pointer;
    /* Указатель курсора при наведении */
}

label {
    display: block;
}
</style>
