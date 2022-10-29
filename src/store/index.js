import { createStore } from 'vuex'
import Cookie from 'js-cookie'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tableList: [
            {
                path: '/',
                name: 'home',
                label: '首頁',
                icon: 'home'
            }
        ],
        //後台給的菜單列表
        menu: [],
        token: ""
    },
    mutations: {
        //菜單展開／收起
        updataIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        //路由判斷
        selectMenu(state, val) {
            if (val.name == 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                let result = state.tableList.findIndex(item => item.name === val.name)
                result == -1 ? state.tableList.push(val) : ''
            }
        },
        closeTab(state, val) {
            let res = state.tableList.findIndex(item => item.name === val.name)
            state.tableList.splice(res, 1)
        },
        //儲存後台返回菜單
        setMenu(state, val) {
            state.menu = val;
            //本地持久化存儲刷新不丟失,登出刪除
            localStorage.setItem('menu', JSON.stringify(val))
        },
        //獲取菜單，根據菜單添加路由
        addMenu(state, router) {
            if (!localStorage.getItem('menu')) { return }
            const menu = JSON.parse(localStorage.getItem('menu'));
            state.menu = menu;
            const menuArray = [];
            //遍歷菜單
            menu.forEach(item => {
                //查找是否有子路由children
                if (item.children) {
                    //有則將map()返回一個新數組(children:[])
                    item.children = item.children.map(item => {
                        //定義component的路徑
                        let url = `../views/${item.url}.vue`;
                        item.component = () => import(url)
                        //添加完畢後返回給children:[]
                        return item
                    })
                    //添加到新數組中
                    menuArray.push(...item.children)
                } else {
                    //設置沒有children的頁面路徑
                    let url = `../views/${item.url}.vue`;
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            });

            //將新路由添加到中router頁面設置中的路由參數
            menuArray.forEach(item => {
                router.addRoute('home1', item)
            })

        },
        setToken(state, val) {
            state.token = val;
            Cookie.set('token', val)
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        },
        //登出刪除登錄存儲訊息
        logoutRemove(state) {
            state.menu = []
            localStorage.removeItem('menu')
        },
    }
})