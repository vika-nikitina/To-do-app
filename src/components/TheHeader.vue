<template>
  <header class="header" id="board">
    <div class="container header__container">
      <h1 class="header__title">To-Do List</h1>
      <div class="header__option">
        <button class="header__user-button" @click="handleUserClick">Сменить пользователя</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    handleUserClick() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push('/auth');
    }
  }
};
</script>


<style scoped>
.header {
  width: 100%;
  background-color: #013D5A;
  color: #FCF3E3;
  border-radius: 0px 0px 40px 40px;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
}

.header__title {
  font-size: 24px;
  font-weight: bold;
}

.header__option {
  display: flex;
  align-items: center;
}

.header__icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.header__user-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #FCF3E3;
  color: #013D5A;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  margin-right: 10px;
}
</style>
