/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-02-25 13:39:23
 * @Description: 
 * @LastEditTime: 2021-02-25 15:50:41
 */
import request from '@/utils/request';
const json = require('./api.json')
export interface SendUser {
    username?: string;
    password?: string,
    remember?: boolean
}

//登录提交个人信息
export async function sendLogin(data: SendUser): Promise<any> {
    return request({
        url:json['login'],
        method:'post',
        data
    })
}