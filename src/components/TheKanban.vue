TheKanban:
<template>
  <div class="page-container">
    <Header></Header>
    <main class="main-container">
      <TheBoards @update-board="updateBoard" />
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './TheHeader.vue';
import TheBoards from './TheBoards.vue';
import Footer from './TheFooter.vue';

export default {
  name: 'Kanban',
  components: {
    Header,
    TheBoards,
    Footer
  },
  data() {
    return {
      board: null
    };
  },
  methods: {
    updateBoard(newBoard) {
      this.board = newBoard;
    }
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
}

.kanban__header {
  text-align: center;
  margin-bottom: 20px;
}

.kanban__header h3 {
  font-size: 1.5rem;
  margin: 0;
}
</style>