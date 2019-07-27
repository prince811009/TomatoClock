<template>
  <nav class="navMenu d-flex flex-direction-column;">
    <ul class="navIconWrapper" v-if="menuSelected">
      <li class="navIcon" @click="onClickMenuIcon('')">
        <icon-close-btn class="icon"/>
      </li>
    </ul>
    <ul class="navIconWrapper" v-else>
      <li class="navIcon d-flex align-items-center justify-content-flex-start;" @click="onClickMenuIcon('todo')">
        <icon-todo-list class="icon"/>
      </li>
      <li class="navIcon d-flex align-items-center justify-content-flex-start" @click="onClickMenuIcon('analytics')">
        <icon-bar-chart class="icon"/>
      </li>
    </ul>
    <h1 class="logo">POMODORO</h1>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import IconCloseBtn from "vue-material-design-icons/WindowClose.vue"
import IconTodoList from "vue-material-design-icons/FormatListBulleted.vue"
import IconBarChart from "vue-material-design-icons/PollBox.vue"

export default {
  components: {
    IconCloseBtn,
    IconTodoList,
    IconBarChart
  },
  data() {
    return {
    }
  },
  methods: {
    onClickMenuIcon(selected){
      this.$store.commit('onClickMenu', selected);
    },
  },
  //what's that mean?
  computed: {
    ...mapState(['menuSelected']),
  }
}
</script>

<style lang="scss" scoped>
.navMenu {
  background-color: #003164;
  padding: 0 80px;
}
.navIconWrapper {
  flex: 1;
}
.navIcon {
  list-style: none;
  margin: 50px 0;
  height: 50px;
}
.icon {
  width: 2em;
  height: 2em;
  /deep/ .material-design-icon__svg {
    width: 100%;
    height: 100%;
  }
}
.logo {
  writing-mode: vertical-rl;
  margin-top: 200px;
  color: white;
}
</style>


