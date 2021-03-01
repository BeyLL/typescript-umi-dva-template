/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-03-01 10:38:07
 * @Description: 工具类
 * @LastEditTime: 2021-03-01 11:23:27
 */


export const deleteNull = (values:object) => {
    Object.keys(values).forEach(param => {
        if (typeof values[param] === 'undefined') delete values[param]
    })
}