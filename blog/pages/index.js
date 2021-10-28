import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, List } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import ContentHeader from '../components/ContentHeader';
import '../styles/pages/index.css';
import { serviceAPI, clientAPI } from '../config/apiUrl';



const Home = ({ list, postType }) => {
  console.log('list', list)
  const [mylist, setMylist] = useState(list.data);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });

  // let html = marked(mylist.introduce);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header postType={postType} />
      <Author />
      <Row className="comm-main" type="flex" justify="center">

        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>

                <div className="list-title">
                  <Link href={{
                    pathname: '/detailed',
                    query: { id: item.id }
                  }}>
                    <a>{item.title + item.id}</a>
                  </Link>
                </div>
                <ContentHeader
                  addTime={item.addTime}
                  typeName={item.typeName}
                  view_count={item.view_count}
                />
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
          <Author />
          {/* <Advert /> */}
        </Col>
      </Row>
      <Footer />
    </>
  )
}

// Home.getInitialProps = async () => {

//   const promise = new Promise((resolve) => {
//     axios(servicePath.getArticleList).then((res) => {
//       console.log('远程获取数据结果:', res.data.data);
//       resolve(res.data);
//     }
//     )
//   })

//   return await promise;
// }


// This gets called on every request
// 静态生成 在 build构建时就发接口获取数据 然后控制容器开启比较麻烦，就先这样吧。
export async function getServerSideProps() {
  try {

    console.log('index页面请求URL:', serviceAPI.getArticleList);
    const res = await axios(serviceAPI.getArticleList)
    console.log('index页面请求文章列表:', res.data);
    const list = res.data
    // const list = await res.json()

    return {
      props: { list, },
    }
  } catch (e) {

    console.error(e)
    // throw e
    return {
      props: { list: [], },
    }
  }
}

// export async function getStaticProps() {
//   try {
//     const res = await axios(serviceAPI.getTypeInfo)
//     console.log('这里是Header:', res)
//     const postType = res
//     return {
//       props: { postType, },
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }

export default Home