import request from '@/utils/request'
const apiJson = require('./api.json')
const { api } = apiJson
console.log(api)
interface UserOption {
    [key: string]: any
}

export async function getUser(data: UserOption): Promise<any> {
    return request({
        url: api['userlist'],
        method:'POST',
        data
    })
}