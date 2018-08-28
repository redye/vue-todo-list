<template>
    <section class="real-app">
      <div class="tab-container">
        <tabs :value="filter" @change="handleChangeTab">
          <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab">
          </tab>
        </tabs>
      </div>
      <input
          type="text"
          class="add-input"
          autofocus="autofocus"
          placeholder="接下去要做什么"
          @keyup.enter="handleAdd"
      />
      <Item         
          :todo="todo" 
          v-for="todo in filteredTodos"
          :key="todo.id"
          @del="deleteTodo"
          @toggle="toggleTodoState"
      />
      <Helper 
          :filter="filter" 
          :todos="todos"
          @clearAllCompleted="clearAllCompleted"
      />
    </section>
</template>

<script>

import {
  mapState,
  // mapMutations,
  mapActions
} from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  components: {
    Item,
    Helper
  },
  // props: ['id'],
  data: function () {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(`beforeRouteEnter`)
  //   next((vm) => {
  //     console.log(`vm id is ${vm.id}`)
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(`beforeRouteUpdate: ${this.id}`)
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log(`beforeRouteLeave`)
  //   next()
  // },
  mounted () {
    // setTimeout(() => {
    //   this.tabValue = '2'
    // }, 2000)
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  asyncData ({ store, router }) {
    if (store.user) {
      return store.dispatch('fetchTodos')
    }
    router.push('/login')
    return Promise.resolve()
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos: function () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    handleAdd: function (e) {
      let content = e.target.value.trim()
      if (content.length <= 0) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // toggleFilter: function (state) {
    //   this.filter = state
    // },
    toggleTodoState: function (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    clearAllCompleted: function () {
      // this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      this.filter = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width 600px
  margin 0 auto 
  box-shadow 0 0 5px #666
}
.add-input {
  positon:relative;
  margin 0px
  width 100%
  font-size 24px
  font-family  inherit 
  font-weight:inherit
  line-height 1.4rem
  border 0;
  outline none 
  color inherit
  padding 6px
  border 1px solid #999
  box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
  box-sizing border-box
  font-smoothing:antialiased;
  padding 16px 16px 16px 60px
  border none  
}
.tab-container {
  background-color #fff
  padding 0 15px
}
</style>




