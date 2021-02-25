import React from 'react'
// import PropTypes from 'prop-types'
import { Redirect } from 'dva/router'
import Cookies from 'js-cookie'


const AuthRouter: React.FC = props => {
    // 判断是否登录， 即是否有token
    const isLogin = !!Cookies.get('Authorization')
    if (isLogin) {
        // todo:删除跳转登录之前的页面
        return <div style={{ height: '100%' }}>{props.children}</div>
    } else {
        // todo:保存跳转登录之前的页面
        return (<Redirect to="/login" />)
    }
}

export default AuthRouter