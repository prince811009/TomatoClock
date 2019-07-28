<template>
  <div class="countDownViewWrapper" :class="getThemeClass()">
    <div class="todolist">
      <todo-creator />
      <div class="countDown" v-if="doing">
        <todo-list :todoList="[doing]" showTomatoes :tomatoes="tomatoes" @onCheckTodo="resetCountDown"/>
        <div class="countDownTime">{{ formatedRemainTime }}</div>
      </div>
      <p v-else>新增一個 TODO 吧 !</p>
      <div class="bottom">
        <div v-if="todoQueue.length > 0">
          <todo-list :todoList="todoQueue" />
        </div>
      </div>
    </div>
    <div class="clockController" :class="getClockStatusClass()">
      <button class="countDownBtn" @click="startCountDown" :style="`background: conic-gradient(${getProgressbar()}, transparent 0);`">
        <div class="countDownBtnIcon">
          <icon-pause v-if="isContinue" />
          <icon-play v-else />
        </div>
        <button @click.stop="resetCountDown" class="resetBtn"></button>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import IconPlay from "vue-material-design-icons/Play.vue";
import IconPause from "vue-material-design-icons/Pause.vue";
import TodoCreator from '../components/NewTodo.vue';
import TodoList from '../components/TodoList.vue';

export default {
  components: {
    IconPlay, IconPause, TodoCreator, TodoList,
  },
  data() {
    return {
      defaultWorkTIme: 25 * 60,
      defaultBreakTime: 5 * 60,
      tomatoRemainTime: 25 * 60,
      tomatoBreakTime: 5 * 60,
      isContinue: false,
      tomatoes: 0,
      timer: [],
      selected: '',
    }
  },
  computed: {
    ...mapState(['todosAll']),
    formatedRemainTime() {
      const r = this.tomatoRemainTime >= 0 ? this.tomatoRemainTime : this.tomatoBreakTime;
      let mins = Math.floor(r/60);
      mins = (mins < 10) ? `0${mins}` : mins;
      const secs = (r%60) < 10 ? `0${r%60}` : r%60;
      return `${mins}:${secs}`;
    },
    todos() {
      return this.todosAll.filter(item => !item.done);
    },
    doing() {
      if (this.todos) return this.todos[0];
      return null;
    },
    todoQueue() {
      return this.todos.filter((item, index) => index > 0 && index < 4);
    },
  },
  methods: {
    getProgressbar(){
      const status = this.tomatoRemainTime >= 0 ? '#FF4384' : '#00A7FF';
      const percentage = this.tomatoRemainTime >= 0
        ? (this.defaultWorkTIme - this.tomatoRemainTime) / this.defaultWorkTIme
        : (this.defaultBreakTime - this.tomatoBreakTime) / this.defaultBreakTime
      return `${status} 0 ${percentage * 100}%`;
    },
    getThemeClass() {
      return this.tomatoRemainTime >= 0 ? 'theme-pink' : 'theme-blue';
    },
    getClockStatusClass() {
      return this.isContinue ? 'status-continue' : 'status-pause';
    },
    startCountDown() {
      this.timer.forEach(id => clearInterval(id));
      this.isContinue = !this.isContinue;
      if (!this.isContinue) return;
      this.timer.push(
          setInterval(() => {
          if (this.tomatoRemainTime > 0) {
            this.tomatoRemainTime -= 1;
          } else {
            this.tomatoRemainTime = -1
            if (this.tomatoBreakTime > 0) {
              this.tomatoBreakTime -= 1;
            } else {
              this.tomatoes += 1;
              this.resetCountDown();
              this.startCountDown();
            }
          }
        }, 1000)
      )
    },
    pauseCountDown() {
      this.timer.forEach(id => clearInterval(id));
    },
    resetCountDown() {
      this.timer.forEach(id => clearInterval(id));
      this.isContinue = false;
      this.tomatoRemainTime = 25;
      this.tomatoBreakTime = 6;
    },
  },
  mounted() {
    if (this.todos) {
      this.tomatoes = this.doing.tomatoes;
    }
  }
}
</script>

<style lang="scss" scoped>
.countDownViewWrapper {
  width: 100%;
  height: 100%;
  color: #003164;
  display: flex;
  font-size: 24px;
  font-weight: bold;
  &.theme-pink {
    background-color: #FFEDF7;
    /deep/ .newTodoArea {
      .newTodoDesc {
        color: #FF4384;
      }
      ::placeholder {
        color: #FF4384;
      }
      .plusIcon svg path {
        fill: #FF4384;
      }
    }
    .countDownTime {
      color: #FF4384;
    }
    .clockController {
      &.status-continue {
        .countDownBtn {
          background-color: #FF4384;
          &::before {
            border: 3.5px solid #FF4384;
            background-color: #fff;
          }
          .countDownBtnIcon {
            background-color: #FF4384;
            /deep/ svg path {
              fill: #fff;
            }
          }
        }
        .resetBtn {
          background-color: #FF4384;
        }
      }
      &.status-pause {
        .countDownBtn {
          background-color: transparent;
          &::before {
            background-color: #FF4384;
          }
          .countDownBtnIcon {
            background-color: #fff;
            /deep/ svg path {
              fill: #FF4384;
            }
          }
        }
        .resetBtn {
          background-color: #fff;
        }
      }
      .countDownBtn {
        transition: all .3s ease;
        border: 3.5px solid #FF4384;
      }
    }
  }
  &.theme-blue {
    background-color: #E5F3FF;
    /deep/ .newTodoArea {
      .newTodoDesc {
        color: #00A7FF;
      }
      ::placeholder {
        color: #00A7FF;
      }
      .plusIcon svg path {
        fill: #00A7FF;
      }
    }
    .countDownTime {
      color: #00A7FF;
    }
    .clockController {
      &.status-continue {
        .countDownBtn {
          background-color: #00A7FF;
          &::before {
            border: 3.5px solid #00A7FF;
            background-color: #fff;
          }
          .countDownBtnIcon {
            background-color: #00A7FF;
            /deep/ svg path {
              fill: #fff;
            }
          }
        }
        .reset-btn {
          background-color: #00A7FF;
        }
      }
      &.status-pause {
        .countDownBtn {
          background-color: transparent;
          &::before {
            background-color: #00A7FF;
          }
          .countDownBtnIcon {
            background-color: #fff;
            /deep/ svg path {
              fill: #00A7FF;
            }
          }
        }
        .resetBtn {
          background-color: #fff;
        }
      }
      .countDownBtn {
        border: 3.5px solid #00A7FF;
        &::before {
          background-color: #00A7FF;
        }
        /deep/ svg path {
          fill: #00A7FF;
        }
      }
    }
  }
}

.todolist {
  flex: 1;
  padding: 48px 48px 0 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .countDown {
    margin-top: 70px;
    .countDownTime {
      font-size: 176px;
      padding: 30px 0;
    }
  }
}
.clockController {
  flex-basis: 540px;
  padding-right: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    width: calc(50% + 39px);
    background-color: #003164;
  }
  .countDownBtn {
    width: 540px;
    height: 540px;
    border-radius: 50%;
    background-color: transparent;
    outline: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease;
    &:hover {
      transform: scale(1.05);
    }
    .countDownBtnIcon {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      /deep/ svg {
        transform: scale(2.5);
      }
    }
    &::before {
      content: '';
      width: 508px;
      height: 508px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
  }
  .resetBtn {
    width: 12px;
    height: 12px;
    outline: none;
    border: none;
    position: absolute;
    top: calc(50% + 32px);
    right: calc(50% - 70px);
  }
}
.bottom {
  flex: 0 0 300px;
  padding-bottom: 120px;
}

</style>


