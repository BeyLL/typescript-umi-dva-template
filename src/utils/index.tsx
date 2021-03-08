/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-03-01 10:38:07
 * @Description: 工具类
 * @LastEditTime: 2021-03-05 13:38:41
 */


export const deleteNull = (values:object) => {
    Object.keys(values).forEach(param => {
        if (typeof values[param] === 'undefined') delete values[param]
    })
}

//formData转化
export const formData = (body:Object) => {
    let form = new FormData();
    for (let i in body) form.append(i, body[i] == undefined ? "" : body[i]);
    return form;
  }