import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, Affix, Breadcrumb } from 'antd';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import axios from 'axios';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import ContentHeader from '../components/ContentHeader';
import Tocify from '../components/tocify.tsx';
import '../styles/pages/detailed.css';
import servicePath from '../config/apiUrl';




const Detailed = (content) => {
    // console.log(content, '内容');
    let markdown = content;

    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,

        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });

    let html = marked(markdown.article_content);

    return (
        <>
            <Head>
                <title>博客详细页</title>
            </Head>

            <Header />

            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a href="/list">文章列表</a></Breadcrumb.Item>
                            <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div>
                        <div className="detailed-title">
                            阿蚝的个人网站
                        </div>
                        <ContentHeader
                            addTime={markdown.addTime}
                            typeName={markdown.typeName}
                            view_count={markdown.view_count} />
                        <div className="detailed-content"
                            dangerouslySetInnerHTML={{ __html: html }}
                        >
                        </div>
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>

                    <Author />
                    <Advert />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>

            <Footer />
        </>
    )
}

Detailed.getInitialProps = async (context) => {

    // console.log(context.query.id, '22222222222')
    let id = context.query.id
    const promise = new Promise((resolve) => {

        axios(servicePath.getArticleById, {
            params: {
                id: id
            }
        }).then((res) => {
            // console.log(res.data, 'ahao')
            resolve(res.data.data[0])
        }
        )
    })

    return await promise
}
export default Detailed