/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-02-24 15:58:01
 * @Description: 
 * @LastEditTime: 2021-03-01 11:27:03
 */

import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Subscription } from 'dva';
import router from 'umi/router';

import Cookie from 'js-cookie'
import {sendLogin} from '@/services/login'
//定义状态接口
export interface LoginModelState {
    name: string;
    // [x: string]: string   //任意属性值都应该是string类型
}

//定义类型
export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T }
) => void;

//定义接口
export interface LoginModelType {
    namespace: string;
    state: LoginModelState;
    effects: {
        loginInfo: Effect;
    };
    reducers: {
        updateState: Reducer<LoginModelState>;
    };
    subscriptions: { setup: Subscription };
}


const LoginModel: LoginModelType = {
    namespace: 'login',
    state: {
        name: 'zhang'
    },
    effects: {
        *loginInfo({ payload }, { put, call }) {
            const { password } = payload
            // const data = yield call(sendLogin,payload)
            
            if (password == 'admin') router.push('/')
            Cookie.set('Authorization', 'zhang')

        }
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    subscriptions: {
        setup(history) {
            // console.log(history)
        }
    }
}

export default LoginModel;