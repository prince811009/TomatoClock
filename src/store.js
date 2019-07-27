/* eslint-disable linebreak-style */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = window.localStorage;
const defaultData = [
  {
    id: 1,
    desc: 'the First thing to do today',
    tomatoes: 2,
    done: true,
    sort: 1,
    finishDate: '7/20',
  },
  {
    id: 2,
    desc: 'the second thing to do today',
    tomatoes: 2,
    done: false,
    sort: 2,
  },
  {
    id: 3,
    desc: 'the third thing to do today',
    tomatoes: 5,
    done: true,
    sort: 2,
    finishDate: '7/7',
  },
  {
    id: 4,
    desc: 'the fourth thing to do today',
    tomatoes: 5,
    done: true,
    sort: 2,
    finishDate: '7/19',
  },
  {
    id: 5,
    desc: 'the fifth thing to do today',
    tomatoes: 5,
    done: true,
    sort: 2,
    finishDate: '7/20',
  },
];
// 將預設資料永續儲存
defaultData.forEach((item, index) => {
  storage.setItem(`tmt-default-${index}`, JSON.stringify(item));
});

const todosAll = [];
for (let i = 0; i < storage.length; i += 1) {
  if (storage.key(i).includes('tmt-')) {
    const todo = JSON.parse(storage.getItem(storage.key(i)));
    todosAll.push(todo);
  }
}


export const store = new Vuex.Store({
  state: {
    menuSelected: '',
    todosAll,
  },
  mutations: {
    finishTodo(state, id) {
      state.todosAll.filter((t) => {
        if (t.id === id) {
          t.done = true;
          const d = new Date();
          t.finishDate = `${d.getMonth() + 1}/${d.getDate()}`;
          storage.setItem(`tmt-${t.id}`, JSON.stringify(t));
          return t;
        }
        return t;
      });
    },
    addTodo(state, desc) {
      const id = new Date().getTime();
      const todo = {
        desc,
        done: false,
        sort: id,
        id,
      };
      state.todosAll.push(todo);
      storage.setItem(`tmt-${id}`, JSON.stringify(todo));
    },
    onEditTodo(state, payload) {
      state.todosAll.filter((t) => {
        if (t.id === payload.id) {
          t.desc = payload.newDesc;
          storage.setItem(`tmt-${t.id}`, JSON.stringify(t));
        }
        return t;
      });
    },
    onDeleteTodo(state, id) {
      state.todosAll = state.todosAll.filter(item => item.id !== id);
      storage.removeItem(`tmt-${id}`);
    },
    onClickMenu(state, selected) {
      state.menuSelected = selected;
    },
  },
});

export default store;
