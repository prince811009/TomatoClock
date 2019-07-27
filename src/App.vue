<template>
  <div id="app" class="application">
    <menu-item v-show="menuSelected" />
    <main class="main">
      <TodoListView v-if="isTodoListView" />
      <AnalyticsView v-else-if="isAnalyticsView"/>
      <CountDownView v-else />
    </main>
    <menu-icon :isNavOpen="menuSelected"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CountDownView from '@/views/CountDownView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import TodoListView from '@/views/TodoListView.vue'
import MenuItem from '@/components/menu/MenuItem.vue'
import MenuIcon from '@/components/menu/MenuIcon.vue'

export default {
  name: 'app',
  components: {
    CountDownView,
    AnalyticsView,
    TodoListView,
    MenuItem,
    MenuIcon
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['menuSelected']),
    isAnalyticsView() {
      return this.menuSelected === 'analytics'
    },
    isTodoListView() {
      return this.menuSelected === 'todo'
    }
  }
  // ...mapState(['menuSelected']) 這一段是和以下同樣意思嗎 ?
  // computed: mapState({
  // })
  // 而 ... 意思是"使用展開運算符將 mapState 一起放到外部物件中"
  // 請問是把什麼事情放到外部物件中 ? 不太懂 ><
  // 意思是把 'menuSelected' 一起都放進去
  // computed: mapState({
  // })
  // 之後，讓 mapState 計算你現在的屬性是 'menuSelected' 現在的哪一種 state 嗎?
  // 而要找目前是屬於哪一種 'menuSelected' 再去 'store.js':105-106 行中的以下這段程式碼嗎 ?
  // onClickMenu(state, selected) {
  //     state.menuSelected = selected;
  // }

  // 而為什麼不用
  // computted: {
  //   isAnalyticsView() {
  //     return store.state.menuSelected
  // }
  // 而是用以下這段
  // ...mapState(['menuSelected']) 
  // 是因為同時有兩個(或更多) function 要一起存取 'menuSelected' 的關係嗎~
  // 因為在
  // 'MenuIcon.vue', 'MenuItem.vue' and 'ClockChart.vue'
  // 有需要用到選擇動作的頁面都直接套用這段程式碼
  // computed: {
  //   ...mapState(['menuSelected']),
  // }
  
  // "CountDownView.vue": 68-69 行中
  // 預想是希望 todolist 每次新增一筆都能在頁面上看到
  // 但是如果在新增第 2 筆資訊的時候, todolist 的 item 並不會出現
  // 他的新增和刪除都是跟著第 3 筆資訊的 ( 好奇怪 >< )
  // 
  // <p v-else>新增一個 TODO 吧 !</p>
  //   <div class="bottom">
  //     <div v-if="todoQueue.length > 1">
  //       <todo-list :todoList="todoQueue" />
  //     </div>
  //   </div>
  // 如果大於一筆資料的話就會將 todolist 放到 "todoQueue"
  
  // todoQueue() {
  //   return this.todos.filter((item, index) => index > 0 && index <= 3);
  // }
  // 然後下放的 todos 可以放的範圍設定成 0~3 筆資料了~
  // 有想說是倒數計時的數字擋到版面而使得他沒有顯示出 todolist 的資料
  // 不過看 devtool 中裡面沒有資料 ><

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

.application {
  width: 100%;
  height: 100vh;
  background-color: #FFEDF7;
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  .main {
    flex: 1;
  }
}

// reset
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
