export default {
  updateCount (state, num) { // mutations 只接收两个参数，第二个参数可以是个对象
    state.count = num
  },
  fillTodos (state, todos) {
    state.todos = todos
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo (state, {id, todo}) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1,
      todo
    )
  },
  deleteTodo (state, {id}) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1
    )
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  doLogin (state, user) {
    state.user = user
  }
}
