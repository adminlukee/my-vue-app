import Moke from 'mockjs'
import homeApi from './mokeData/home'
import userApi from './mokeData/user'
import permissionApi from './mokeData/permission'
//  攔截請求
Moke.mock('/home/getData',homeApi.getHomeData)

//本地獲取user的數據
Moke.mock(/user\/getUser/,'get',userApi.getUserList)
Moke.mock(/user\/add/,'post',userApi.createUser)
Moke.mock(/user\/edit/,'post',userApi.updateUser)
Moke.mock(/user\/delete/,'get',userApi.deleteUser)

Moke.mock(/permission\/getMenu/,'post',permissionApi.getMenu)

