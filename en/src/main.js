import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './components/app.vue';
import preloader from './components/preloader.vue';
import start from './views/main.vue';
import raiting from './views/raiting.vue';
import works from './views/works.vue';
import contacts from './views/contacts.vue';
import fail from './views/fail.vue';
import team from './views/team.vue';
import team_member from './views/team_member.vue';
import VueTouch from 'vue-touch';
import VeeValidate from 'vee-validate';


Vue.use(VueRouter);
Vue.use(VueTouch);
Vue.use(VeeValidate);


const router = new VueRouter({
  routes:[
    { 
      path: '/', 
      component: start,
      meta: {title: 'Main', parent: true}
    },
    { path: '/raiting', component: raiting, meta: {title: 'About', parent: true}},
    { path: '/works', component: works, meta: {title: 'Works', parent: true}},
    { path: '/contacts', component: contacts, meta: {title: 'Contacts', parent: true}},
    { path: '/team', component: team, meta: {title: 'Team', parent: false}},
    { path: '/team/:id', component: team_member, meta: {title: 'Team', parent: false}},
    { path: '/404', component: fail, meta: {title: 'Error', parent: true}},
    { path: '*', redirect: '/404' }
  ]
});

router.beforeEach((to, from, next) => {
  setTimeout(() => {$('.page-title span').text(to.meta.title);}, 100);
  next();
});

let App = new Vue({
  el: '#app',
  router: router,
  data(){
    return{
      
    }
  },
  components:{
    preloader,
    app
  }
})
