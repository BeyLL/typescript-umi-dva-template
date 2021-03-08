import request from '@/utils/request'

//工具
import {formData} from '@/utils'
//bianlian
const apiJson = require('./api.json')
const { api } = apiJson
interface UserOption {
    [key: string]: any
}

export async function getUser(data: UserOption): Promise<any> {
    return request({
        url: api['userlist'],
        method:'POST',
        data:formData(data)
    })
}