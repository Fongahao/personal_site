import React, { useState, useEffect } from 'react';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import Link from 'next/link';
import Head from 'next/head';
import { Row, Col, List, Breadcrumb } from 'antd';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import ContentHeader from '../components/ContentHeader';
import '../styles/pages/comm.css';

const Postlist = (list) => {

    const [mylist, setMylist] = useState(list.data);

    return (
        <>
            <Head>
                <title>文章列表</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <List
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <ContentHeader
                                        addTime={markdown.addTime}
                                        typeName={markdown.typeName}
                                        view_count={markdown.view_count}
                                    />
                                    <div className="list-context">{item.context}</div>
                                </List.Item>
                            )}
                        />

                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert />
                </Col>
            </Row>
            <Footer />
        </>
    );

}

Postlist.getInitialProps = async (context) => {

    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getListById + id).then(
            (res) => resolve(res.data)
        )
    })
    return await promise
}

export default Postlist;