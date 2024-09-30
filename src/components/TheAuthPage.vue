<template>
    <div class="container">
        <div class="auth-box">
            <h2>{{ 'Авторизация' }}</h2>
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div>
                    <label for="password">Пароль:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button type="submit">{{ 'Войти' }}</button>
                <button type="button" @click="toggleMode">
                    {{ 'Перейти к регистрации' }}
                </button>
            </form>
            <p v-if="error">{{ error }}</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent(
    {
        data() {
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async handleSubmit() {
                this.error = '';
                try {
                    const response = await axios.post('https://todo-list.edu-playground.ru/api/v1/auth/signin', {
                        "formData": {
                            "email": this.email,
                            "password": this.password
                        }
                    })
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    this.$router.push('/');

                } catch (err) {
                    this.error = err.response?.data?.message || 'Произошла ошибка';
                }
            },
            toggleMode() {
                this.$router.push('/register')
            }
        }
    }
)
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #013D5A;
}

.auth-box {
    background-color: #FCF3E3;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    color: #013D5A;
}

.auth-box h1 {
    margin-bottom: 20px;
}

.auth-box div {
    margin-bottom: 15px;
}

.auth-box label {
    display: block;
    margin-bottom: 5px;
}

.auth-box input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 5px;
}

.auth-box button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #6b9161;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.auth-box button[type="button"] {
    background-color: #fb9c48;
}

.auth-box p {
    color: red;
    margin-top: 10px;
}
</style>
