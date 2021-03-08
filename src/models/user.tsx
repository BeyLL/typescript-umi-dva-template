/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-02-24 15:58:01
 * @Description: 
 * @LastEditTime: 2021-03-08 10:57:53
 */

import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Subscription } from 'dva';
import { getUser } from '@/services/user'
import {Pagination} from '@/components/Pagination'

//定义状态接口
export interface userModelState {
    userList: Array<any>;
    userListPages:Object;
    // [x: string]: string   //任意属性值都应该是string类型
}

//定义类型
/**typescript中的&是交叉类型并不是按位与 */
export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: InitState) => T) => T }
) => void;


interface InitState {
    [modelState: string]: any
}

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
        userList: [],
        userListPages:new Pagination({dispatchType:'getUser',showSizeChanger:true})
    },
    effects: {
        *getUser({ payload }: any, { put, call }) {
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