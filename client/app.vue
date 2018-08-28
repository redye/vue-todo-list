<template>
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
          <loading></loading>
        </div>
        <Header></Header>
        <!-- <p>counter: {{counter}}</p>
        <p>fullName: {{fullName}}</p>
        <p>textC: {{textC}}</p> -->
        <!-- <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link> -->
      
        <!-- <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link> -->
        <!-- <Todo></Todo> -->
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
        <!-- <button @click="notify">click me!</button> -->
        <!-- <notification content="test notify" /> -->
        <Footer></Footer>
        <!-- <router-view name="a" /> -->
    </div>
</template>


<script>
import {
  mapState
  // mapGetters,
  // mapActions,
  // mapMutations
} from 'vuex'

import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Redye\'s Todo App'
  },
  components: {
    Header,
    Footer,
    Loading
    // Todo
  },
  mounted () {
    // console.log(`store => ${this.$store}`)
    // let i = 1
    // setInterval(() => {
    //   // this.$store.commit('updateCount', i++)
    //   this.updateCount(i++)
    // }, 1000)

    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })

    // this['a/updateText'](4254)
  },
  methods: {
    // ...mapActions(['updateCountAsync']),
    // ...mapMutations(['updateCount', 'a/updateText'])
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  computed: {
    // ...mapState(['count']), // ... 的语法需要 babel-preset-stage-1 支持
    // ...mapState({ // 不同名的时候使用对象
    //   // counter: 'count'
    //   counter: (state) => state.count,
    //   textC: (state) => state.c.text
    // }),
    // ...mapGetters(['fullName'])
    // count: function () {
    //   return this.$store.state.count
    // },
    // fullName: function () {
    //   return this.$store.getters.fullName
    // }
    ...mapState(['loading'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #999999
  opacity .9
  z-index -1
}
#loading {
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>



