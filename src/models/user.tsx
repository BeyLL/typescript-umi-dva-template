/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-02-24 15:58:01
 * @Description: 
 * @LastEditTime: 2021-02-25 16:40:13
 */

import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Subscription } from 'dva';
import router from 'umi/router';
import Cookie from 'js-cookie'

import { getUser } from '@/services/user'

//定义状态接口
export interface userModelState {
    userList: Array<any>;
    // [x: string]: string   //任意属性值都应该是string类型
}

//定义类型
export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T }
) => void;

//定义接口
export interface userModelType {
    namespace: string;
    state: userModelState;
    effects: {
        getUser: Effect;
    };
    reducers: {
        updateState: Reducer<userModelState>;
    };
    subscriptions: { setup: Subscription };
}


const LoginModel: userModelType = {
    namespace: 'user',
    state: {
        userList: {}
    },
    effects: {
        *getUser({ payload }, { put, call }) {
            const { data, success } = yield call(getUser, payload)
            if (success) {
                yield put({ type: 'updateState', payload: { userList: data || [] } })
            }
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