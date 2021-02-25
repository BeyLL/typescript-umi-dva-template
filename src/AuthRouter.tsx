import React from 'react'
// import PropTypes from 'prop-types'
import { Redirect } from 'dva/router'
import Cookies from 'js-cookie'


//手动配置路由进入页面 main/shop
const AuthRouter: React.FC = props => {
    // 判断是否登录， 即是否有token
    const isLogin = !!Cookies.get('Authorization')
    if (isLogin) {
        // 删除跳转登录之前的页面
        window.sessionStorage.removeItem('from_router')

        return <div style={{ height: '100%' }}>{props.children}</div>
    } else {
        // 保存跳转登录之前的页面
        const hash = window.location.hash
        const fromRouter = hash ? hash.slice(1) : ''
        window.sessionStorage.setItem('from_router', fromRouter)
        // 跳转登录页面
        return (<Redirect to="/login" />)
    }
}

export default AuthRouter