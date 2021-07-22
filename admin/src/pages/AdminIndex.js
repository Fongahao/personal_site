import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import '../static/css/AdminIndex.css';
import { Route, Link } from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };


    // const handleClickArticle = (e) => {
    //     console.log(e.key)
    //     if (e.key === 'addArticle') {
    //         props.history.push('/index/add')
    //     } else {
    //         props.history.push('/index/list')
    //     }

    // }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <SmileOutlined />
                        <span>工作台</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <SmileOutlined />
                        <span>添加文章</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        // onClick={handleClickArticle}
                        title={
                            <span>
                                <SmileOutlined />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="addArticle">
                            <Link to="/index/add">添加文章</Link>
                        </Menu.Item>
                        <Menu.Item key="articleList">
                            <Link to="/index/list">文章列表</Link>
                        </Menu.Item>

                    </SubMenu>

                    <Menu.Item key="9">
                        <SmileOutlined />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }} className={'ahao'}>
                        <div>
                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add/" exact component={AddArticle} />
                            <Route path="/index/add/:id" exact component={AddArticle} />
                            <Route path="/index/list/" exact component={ArticleList} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>fongahao.com</Footer>
            </Layout>
        </Layout>
    )

}


export default AdminIndex;