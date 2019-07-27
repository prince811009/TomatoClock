<template>
  <ol class="todoItemWrapper"
    :class="{'showTomatoes': showTomatoes, 'done': done}">
    <li class="todoItem" v-for="todo in todoList" :key="todo.id">
      <label>
        <input type="checkbox" class="todoItemCheckbox">
        <span class="checkmark" @click.stop="onCheckTodo(todo.id)"></span>
        <h3 class="todoLabel">
          <p class="desc">{{ todo.desc }}</p>
        </h3>
        <div class="tomatoesWrapper">
          <span class="tomatoes" v-for="(t, i) in tomatoes" :key="i"></span>
          <span class="tomatoes transparent"></span>
        </div>
      </label>
      <icon-pencil class="icon" v-show="!showTomatoes" @click.stop="onEditTodo(todo.id, todo.desc)"/>
      <icon-delete class="icon" v-show="!showTomatoes" @click.stop="onDeleteTodo(todo.id)"/>
    </li>
  </ol>
</template>

<script>
import IconDelete from "vue-material-design-icons/Delete.vue";
import IconPencil from "vue-material-design-icons/Pencil.vue";

export default {
  components: { IconDelete, IconPencil },
  props:{
    todoList: {
      type: Array,
      default: [],
    },
    showTomatoes: {
      type: Boolean,
      default: false,
    },
    tomatoes: {
      type: Number,
      default: 0,
    },
    done: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onDeleteTodo(id) {
      this.$store.commit('onDeleteTodo', id);
    },
    onCheckTodo(id) {
      this.$store.commit('finishTodo', id);
    },
    onEditTodo(id, desc) {
      const newDesc = prompt('編輯 Todo', desc);
      if (newDesc) {
        this.$store.commit('onEditTodo', {id, newDesc});
      } else {
        alert('請輸入事項');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.navMenu {
  width: 100%;
}

.todoItemWrapper {
  padding-left: 0;
  &.showTomatoes {
    .todoItem {
      .todoLabel {
        margin-left: 30px;
        .desc {
          font-size: 30px;
        }
      }
      .checkmark {
        width: 50px;
        height: 50px;
        &::after {
          display: none !important;
        }
      }
      .tomatoesWrapper {
        display: block;
        width: 100%;
        height: 20px;
        margin-left: 30px;
        margin-top: 5px;
        .tomatoes {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 100%;
          border: 1px solid #003164;
          background-color: #003164;
          &+.tomatoes {
            margin-left: 8px;
          }
          &.transparent {
            background-color: transparent;
          }
        }
      }
    }
    &::after {
      display: none;
    }
  }
  &.done {
    .desc {
      text-decoration: line-through;
      font-style: italic;
    }
  }
  label {
    width: 100%;
    .todoLabel {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 0;
      .desc {
        flex: 1;
        text-indent: 10px;
        font-size: 20px;
      }
    }
  }
}
.todoItemWrapper:not(.showTomatoes) {
  .todoItem {
    font-size: 14px;
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #00000031;
    cursor: pointer;
    &+.todo-item {
      margin-top: 20px;
    }
  }
}
.tomatoesWrapper {
  display: none;
  padding-left: 10px;
}

.icon {
  width: 24px;
  height: 24px;
  /deep/ .material-design-icon__svg {
    width: 100%;
    height: 100%;
  }
  &+.icon {
    margin-left: 6px;
  }
}
// custom checkbox
.todoItem {
  display: block;
  list-style: none;
  position: relative;
  padding-left: 35px;
  padding-bottom: 10px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.todoItem .todoItemCheckbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #003164;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.todoItem .todoItemCheckbox:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.todo-item .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid #003164;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>


