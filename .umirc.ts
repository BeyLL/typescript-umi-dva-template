import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
    treeShaking: true,
    routes: [
        { path: '/login', component: '../pages/login' },
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                { path: '/', name: '首页', icon: 'home', component: '../pages/index' },
                { path: '/user', component: '../pages/user', name: '用户列表', icon: 'github' },
                {
                    path: '/form', name: '表单', icon: 'form', routes: [
                        { path: '/form/pay', component: '../pages/form/formpay', name: '支付页' },
                        { path: '/form/paylist', component: '../pages/form/paylist', name: '支付列表' }
                    ]
                }
            ]
        }
    ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: false,
            title: 'typescript-umi-admin',
            dll: false,

            routes: {
                exclude: [
                    /components\//,
                ],
            },
        }],
    ],

    proxy: {
        "/inspection": {
            'target': 'http://192.168.8.190:9090/',
            'changeOrigin': true,
            // 'pathRewrite': { '^/api': '' },
        }

    }
}

export default config;
