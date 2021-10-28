import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { serviceAPI, clientAPI } from '../config/apiUrl';
import '../styles/components/header.css';
import { Row, Col, Menu } from 'antd';
import {
    HomeOutlined,
    ReadOutlined,
    SolutionOutlined,
} from '@ant-design/icons';


const Header = (props) => {
    console.log('这里是头部Header', props.postType)
    const style = { fontSize: 18 };

    const [navArray, setNavArray] = useState([]);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios('http://www.ahao.com:9000/default/getTypeInfo').then(
                    (res) => {
                        console.log('res这里是Header:', res)
                        setNavArray(res.data.data);
                        return res.data.data;
                    }
                )
            }
            fetchData();
        } catch (e) {
            console.error(e)
        }
    }, []);

    //跳转到列表页
    // const handleClick = (e) => {
    //     if (e.key == 0) {
    //         Router.push('./index')
    //     } else {
    //         Router.push('/list?id=' + e.id)
    //     }
    // }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">
                        {/* <Link href={{ pathname: '/' }}> */}
                        <a href="/">Fong阿蚝</a>
                        {/* </Link> */}
                    </span>
                    <span className="header-txt">fongahao的个人网站</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu
                        mode="horizontal"
                    // onClick={handleClick}
                    >
                        <Menu.Item key="home">
                            <HomeOutlined style={style} />
                            <a href="/">首页</a>
                        </Menu.Item>
                        <Menu.Item key="list">
                            <ReadOutlined style={style} />
                            <a href="/list">文章列表</a>
                        </Menu.Item>
                        <Menu.Item key="detailed">
                            <SolutionOutlined style={style} />
                            <a href="/detailed">文章详情</a>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}



export default Header