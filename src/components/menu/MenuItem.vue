<template>
  <ul class="navItemWrapper d-flex flex-direction-column;">
    <li class="navItem d-flex align-items-center justify-content-flex-start;" :class="{'is-selected': selected('todo')}" @click="onClickMenuItem('todo')">
      <icon-todo-list class="icon"/>
      <span class="label">TODO-LIST</span>
    </li>
    <li class="navItem d-flex align-items-center justify-content-flex-start;" :class="{'is-selected': selected('analytics')}" @click="onClickMenuItem('analytics')">
      <icon-bar-chart class="icon"/>
      <span class="label">ANALYTICS</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import IconTodoList from "vue-material-design-icons/FormatListBulleted.vue"
import IconBarChart from "vue-material-design-icons/PollBox.vue"

export default {
  components: {
    IconTodoList,
    IconBarChart
  },
  data() {
    return {
    }
  },
  methods: {
    onClickMenuItem(selected){
      this.$store.commit('onClickMenu', selected);
    },
    selected(el) {
      return this.menuSelected === el;
    }
  },
  computed: {
    ...mapState(['menuSelected']),
  }
}
</script>

<style lang="scss" scoped>

.navItemWrapper {
  padding: 48px 80px 0 40px;
  background-color:#003164;
}
.navItem {
  width: 200px;
  list-style: none;
  opacity: 0.6;
  &+.navItem {
    margin-top: 40px;
  }
  &.is-selected {
    opacity: 1;
    color: #FF4384;
  }
}
.icon {
  width: 2em;
  height: 2em;
  /deep/ .material-design-icon__svg {
    width: 100%;
    height: 100%;
  }
}
.label {
  font-size: 24px;
  // font-weight: bold;
  margin-left: 20px;
  letter-spacing: 0.5px;
}
</style>


