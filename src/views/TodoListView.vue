<template>
  <div class="todoListView">
    <section class="todoCreatorBlock">
      <todo-creator />
    </section>
    <section class="todoListBlock">
      <div class="blockHeader">
        <h2 class="blockTitle">TO-DO</h2>
        <menu-up v-if="isTodoPanelOpen" class="icon" @click="toggleTodoPanelOpen" />
        <menu-down v-else class="icon" @click="toggleTodoPanelOpen"/>
      </div>
      <div class="blockList" v-show="isTodoPanelOpen">
        <todo-list :todoList="queueTodo"/>
      </div>
    </section>
    <section class="doneListBlock">
      <div class="blockHeader">
        <h2 class="blockTitle">DONE</h2>
        <menu-up v-if="isDonePanelOpen" class="icon" @click="toggleDonePanelOpen" />
        <menu-down v-else class="icon" @click="toggleDonePanelOpen"/>
      </div>
      <div class="blockList" v-show="isDonePanelOpen">
        <todo-list class="bottom" done :todoList="doneTodo"/>
      </div>
    </section>
  </div>  
</template>

<script>
import { mapState } from 'vuex';

import TodoCreator from '../components/NewTodo.vue';
import TodoList from '../components/TodoList.vue';
import MenuUp from "vue-material-design-icons/MenuUp.vue";
import MenuDown from "vue-material-design-icons/MenuDown.vue";

export default {
  components: {
    TodoCreator,
    TodoList,
    MenuUp,
    MenuDown
  },
  data() {
    return {
      newTodoDate: '2019-07-29',
      isTodoPanelOpen: true,
      isDonePanelOpen: true,
    }
  },
  computed: {
    ...mapState(['todosAll']),
    queueTodo() {
      return this.todosAll.filter(item => !item.done)
    },
    doneTodo() {
      return this.todosAll.filter(item => item.done)
    }
  },
  methods: {
    toggleTodoPanelOpen() {
      this.isTodoPanelOpen = !this.isTodoPanelOpen;
    },
    toggleDonePanelOpen() {
      this.isDonePanelOpen = !this.isDonePanelOpen;
    }
  }
}
</script>

<style lang="scss" scoped>
.todoListView {
  width: 100%;
  height: 100%;
  background-color: #003164;
  padding: 48px 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .todoCreatorBlock {
    margin-bottom: 0px;
    [class^=new-todo] {
      display: block;
    }
  }
  .todoListBlock {
    flex: 0 0 30%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .doneListBlock {
    flex: 0 0 calc(50% - 40px);
    overflow: auto;
    display: flex;
    flex-direction: column;    
  }
  .blockHeader {
    flex: 0 0 40px;
    display: flex;
    padding: 10px;
    color: #FF4384;
    background-color: #225385;
    margin-bottom: 20px;
    text-indent: 5px;
    .blockTitle {
      flex: 1;
    }
    /deep/ .icon {
      width: 20px;
      height: 20px;
      color: white;
      svg {
        width: 100%;
        height: 100%;
        path {
          fill: white;
        }
      }
    }
  }
  .blockList {
    padding-right: 20px;
    flex: 1;
    overflow: auto;
    /deep/ .checkmark {
      border: 2px solid white;
    }
    &::-webkit-scrollbar-track {
      background-color: #225385;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #FF4384;
      border-radius: 20px solid #555555;
    }
  }
}

/deep/ .todoItemWrapper {
  .todoItem {
    border-bottom: 1px solid #ffffff61 !important;
    margin-bottom: 10px;
  }
}
</style>


