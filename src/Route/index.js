import Home from '@/pages/Home'
import Program from "@/pages/Program";
import ProgramEdit from '@/pages/ProgramEdit'


const routes = [
    {
        path: '/home',
        name: '首页',
        component: Home
    },
    {
        path: '/program',
        name: '项目列表',
        component: Program
    },
    {
        path: '/program_edit',
        name: '项目列表',
        hidden:true,
        component: ProgramEdit
    },

]

export default routes
