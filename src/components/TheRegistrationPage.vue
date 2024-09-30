<template>
  <div class="container">
    <div class="reg_box">
      <h2>{{ 'Регистрация' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirmPassword">Повторите пароль:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit">{{ 'Зарегистрироваться' }}</button>
        <button type="button" @click="toggleMode">
          {{ 'Перейти ко входу' }}
        </button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent(
  {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
      }
    },
    methods: {
      async handleSubmit() {
        this.error = '';
        if (password.value !== confirmPassword.value) {
          this.error = 'Пароли не совпадают';
          return;
        }
        try {
          const response = await axios.put('https://todo-list.edu-playground.ru/api/v1/auth/signup', {
            "formData": {
              "name": this.username,
              "email": this.email,
              "password": this.password,
              "confirm_password": this.confirmPassword
            }
          })
          if (response.status === 200) {
            const response_auth = await axios.post('https://todo-list.edu-playground.ru/api/v1/auth/signin', {
              "formData": {
                "email": this.email,
                "password": this.password
              }
            })
            localStorage.setItem('token', response_auth.data.token);
            localStorage.setItem('userId', response_auth.data.userId);
            this.$router.push('/');
          }
          else { this.error = 'Произошла ошибка' }
        } catch (err) {
          console.log(err)
          this.error = err.response?.data?.message || 'Произошла ошибка';
        }
      },
      toggleMode() {
        this.$router.push('/auth')
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

.reg_box {
  background-color: #FCF3E3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  color: #013D5A;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #6b9161;
  color: white;
  border: none;
  border-radius: 5px;
}

button[type="button"] {
  background-color: #fb9c48;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
