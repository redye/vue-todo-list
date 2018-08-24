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
          v-model="inputContent"
          placeholder="接下去要做什么"
          @keyup.enter="addTodo"
      />
      <Item         
          :todo="todo" 
          v-for="todo in filteredTodos"
          :key="todo.id"
          @del="deleteTodo"
      />
      <Helper 
          :filter="filter" 
          :todos="todos"
          @clearAllCompleted="clearAllCompleted"
      />
    </section>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'

let id = 0
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
      todos: [],
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
  },
  computed: {
    filteredTodos: function () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo: function (e) {
      let value = e.target.value.trim()
      if (value.length <= 0) {
        // alert('你什么都没有添加哦~')
        return
      }
      this.todos.unshift({
        id: id++,
        content: value,
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo: function (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id))
    },
    // toggleFilter: function (state) {
    //   this.filter = state
    // },
    clearAllCompleted: function () {
      this.todos = this.todos.filter(todo => !todo.completed)
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




