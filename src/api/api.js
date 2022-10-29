/**
 * 項目api管理
 */

import request from './request'

export default {
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            data: params,
            //trut為線上的地址,false為本地的地址
            mock: false
        })
    },
    addUser(params){
        return request({
            url:'/user/add',
            method:'post',
            mock:false,
            data:params
        })
    },
    editUser(params){
        return request({
            url:'/user/edit',
            method:'post',
            mock:false,
            data:params
        })
    },
    deleteUser(params){
        return request({
            url:'/user/delete',
            method:'get',
            mock:false,
            data:params
        })
    },
    //根據用戶名不同返回不同的菜單
    getMenu(params){
        return request({
            url:'/permission/getMenu',
            method:'post',
            mock:false,
            data:params
        })
    }
}