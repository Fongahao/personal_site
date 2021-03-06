import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../static/css/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = (props) => {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent_md, setArticleContent_md] = useState('')  //markdown的编辑内容
    const [articleContent_html, setArticleContent_html] = useState('') //html内容
    const [introduce_md, setIntroduce_md] = useState()            //简介的markdown内容
    const [introduce_html, setIntroduce_html] = useState('') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    // const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })

    // 文章内容
    const changeContent = (e) => {
        setArticleContent_md(e.target.value);
        let html = marked(e.target.value);
        setArticleContent_html(html);
    }

    // 文章简介
    const changeIntroduce = (e) => {
        setIntroduce_md(e.target.value);
        let html = marked(e.target.value);
        setIntroduce_html(html);
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true,
        }).then(
            (res) => {
                console.log('AddAticle组件:', '\n', '向中台请求文章分类报文体:', res.request, '\n', '文章分类数据:', res.data);
                if (res.data.data === "没有登录") {
                    localStorage.removeItem('openId');
                    props.history.push('/');
                } else {
                    setTypeInfo(res.data.data);
                }
            }
        )
    }

    const selectTypeHandler = (value) => {
        setSelectType(value);
    }

    // 通过文章ID获取文章详情
    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            (res) => {
                //let articleInfo= res.data.data[0]
                console.log('获取文章详情接口:', res)
                setArticleTitle(res.data.data[0].title)
                setArticleContent_md(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                setArticleContent_html(html)
                setIntroduce_md(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroduce_html(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)

            }
        )
    }

    useEffect(() => {
        getTypeInfo();
        let tmpId = props.match.params.id;
        if (tmpId) {
            setArticleId(tmpId);
            getArticleById(tmpId);
        }
    }, [])

    // 保存文章
    const saveArticle = () => {

        // markedContent()
        if (!selectedType) {
            message.error('请选择文章类别');
            return false;
        } else if (!articleTitle) {
            message.error('文章名称不能为空');
            return false;
        } else if (!articleContent_md) {
            message.error('文章内容不能为空');
            return false;
        } else if (!introduce_md) {
            message.error('文章简介不能为空');
            return false;
        } else if (!showDate) {
            message.error('文章发布时间不能为空');
            return false
        }

        const dataProps = {};
        dataProps.type_id = selectedType;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent_md;
        dataProps.introduce = introduce_md;
        console.log('发布日期showDate', showDate)
        const datetext = showDate.replace(/-/g, '/'); // 把字符串转成时间戳
        console.log('发布日期datetext', datetext)
        dataProps.addTime = (new Date(datetext).getTime()) / 1000;
        console.log('文章数据', dataProps)

        // dataProps.part_count = partCount;
        // dataProps.article_content_html = articleContent_html;
        // dataProps.introduce_html = introduce_html;

        console.log(articleId, '文章的ID')

        if (articleId === 0) {

            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true,
            }).then(
                (res) => {
                    console.log(res.data, 'resData走到了添加文章')
                    setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('文章添加成功')
                    } else {
                        message.error('文章添加失败');
                    }

                }
            )
        } else {
            console.log('走到了更新文章');
            dataProps.id = articleId;
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                headers: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true,
            }).then(
                (res) => {
                    console.log(res.data, 'resData走到了更新文章')
                    if (res.data.isSuccess) {
                        message.success('文章更新成功');
                    } else {
                        message.error('文章更新失败')
                    }
                }
            )
        }

    }


    return (
        <div>
            <Row gutter={5}>
                {/* 左边 */}
                <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                    <Row gutter={10} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={20}>
                            <Input
                                value={articleTitle}
                                onChange={(e) => {
                                    setArticleTitle(e.target.value)
                                }}
                                placeholder="博客标题"
                                size="large" />
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent_md}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: `文章内容${articleContent_html}` }}
                            >
                            </div>

                        </Col>
                    </Row>
                </Col>

                {/* 右边 */}
                <Col xs={0} sm={0} md={0} lg={0} xl={6}>
                    <Row>

                        <Col span={24} >
                            <Button size="large" onClick={'占位符'}>暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>

                        <Col span={24}>
                            <br />
                            <TextArea
                                value={introduce_md}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                rows={4}
                                placeholder="文章简介"
                            ></TextArea>
                            <br />
                            <br />
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: `文章简介${introduce_html}` }}
                            ></div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>

                    </Row>


                </Col>

            </Row>
        </div>
    )
}

export default AddArticle;