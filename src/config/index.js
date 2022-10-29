/**
 * 環境配置文件
 * 開發環境development
 * 測試環境test
 * 線上環境pro
 */ 

// 當前的環境
const env =import.meta.env.MODE || 'prod'

const EnvConfig ={
    development:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/fd1c72a657d36851118afde2d2c406d6/api',
    },
    test:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/fd1c72a657d36851118afde2d2c406d6/api',
    },
    pro:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/fd1c72a657d36851118afde2d2c406d6/api',
    },
}

export default{
    env,
    //moke總開關
    mock:true,
    ...EnvConfig[env]
}