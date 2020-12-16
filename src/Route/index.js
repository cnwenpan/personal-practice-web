import Home from '@/pages/Home'
import Program from "@/pages/Program";
import ProgramEdit from '@/pages/ProgramEdit'
import Diary from '@/pages/Diary'

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
    {
        path: '/diary',
        name: '日记清单',
        hidden:false,
        component: Diary
    },

]

export default routes
