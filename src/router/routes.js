import loginIndex from "@/views/login"
import homePage from  "@/views/Home"
import RecommendSchool from "@/components/recomSchool";


const routes = [
    {
        name: 'loginIndex',
        path: '/',
        component: loginIndex
    },
    {
        name: 'home',
        path: '/home',
        component: homePage
    },
    {
        name: 'schoolList',
        path: '/schoolList',
        component: RecommendSchool
    },

];
export default routes
