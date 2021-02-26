import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
    treeShaking: true,
    routes: [
        { path: '/login', component: '../pages/login' },
        { path: '/register', component: '../pages/register', name: '注册' },
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                { path: '/', redirect: '/home/index' },
                {
                    path: '/home',
                    component: '../pages/_layout',
                    routes: [
                        { path: '/home/index', name: '首页', icon: 'home', component: '../pages/index' },
                        { path: '/home/user', component: '../pages/user', name: '用户列表', icon: 'github' },
                        {
                            path: '/home/form', name: '表单', icon: 'form', routes: [
                                { path: '/home/form/pay', component: '../pages/form/formpay', name: '支付页' },
                                { path: '/home/form/paylist', component: '../pages/form/paylist', name: '支付列表' }
                            ]
                        }
                    ],
                },

            ]
        },

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
