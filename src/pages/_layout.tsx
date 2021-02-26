import React, { useState } from 'react';
import Link from 'umi/link'

//component
import { Layout, Menu, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

//constant
import logo from '@/assets/yay.jpg';

//style
import _style from './index.less';

const Home: React.FC = props => {

    const [collapsed, setCollaped] = useState<boolean | undefined>(false)

    const { route, children }: any = props;


    //渲染element
    const renderMenu = (data: Array<any>) => {
        return data.map((item, index) => {
            if (item.name) {
                if (item.routes) {
                    return (
                        <SubMenu
                            key={item.path}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </span>
                            }
                        >
                            {renderMenu(item.routes)}
                        </SubMenu>
                    );
                }
                return (
                    <Menu.Item key={item.path} title={item.name} >
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });
    }

    //切换收起展开
    const toggle = () => {
        setCollaped(!collapsed)
    }
    return (
        <Layout>
            <Sider collapsible trigger={null} collapsed={collapsed} className={_style.sider}>
                <div className={_style.logo} key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {renderMenu(route.routes)}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className={_style.trigger}
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                </Header>
                <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2004~2021 by UWay. All Rights Reserved. 优网科技 版权所有</Footer>
            </Layout>
        </Layout>
    );
};

export default Home;