<template>
  <div class="newTodoArea">
    <input
      class="newTodoText"
      type="text"
      v-model="newTodoDesc"
      placeholder="ADD A NEW MISSION..."
      @keydown.enter="onClickAddTodo"
    >
    <plus-icon class="plusIcon" @click="onClickAddTodo"/>
  </div>
</template>

<script>
import PlusIcon from "vue-material-design-icons/Plus.vue";

export default {
  components: {
    PlusIcon,
  },
  data() {
    return {
      newTodoDesc: '',
    }
  },
  methods: {
    onClickAddTodo() {
      if (!this.newTodoDesc) {
        return '';
      }
      this.$store.commit('addTodo', this.newTodoDesc);
      this.newTodoDesc = '';
    }
  },
}
</script>

<style lang="scss" scoped>
.newTodoArea {
  position: relative;
}
.newTodoText {
  width: calc(100% - 20px);
  height: 56px;
  border: none;
  padding: 10px;
  font-style: italic;
  outline: none;
  text-indent: 20px;
  font-size: 16px;
  font-weight: bold;
}
.plusIcon {
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
}
.newTodoText::placeholder {
  font-size: 16px;
  font-weight: bold;
  padding-left: 20px;
  text-indent: 0;
  color: #FF4384;
}
</style>


