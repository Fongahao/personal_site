// let ipUrl = 'http://127.0.0.1:7001/default/';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const host = `${publicRuntimeConfig.HOST}`
// const ipUrl = 'http://react_blog_service:9002/default/';
// const API = 'http://127.0.0.1:9002/default/';
// const API = 'http://127.0.0.1:9000/';

const serviceAPI = {
    getArticleList: `http://${host}:9002/default/getArticleList`,
    getArticleById: `http://${host}:9002/default/getArticleById`,
    getTypeInfo: `http://${host}:9002/default/getTypeInfo`,
    getListById: `http://${host}:9002/default/getListById`,
}
const clientAPI = {
    getArticleList: `http://${host}:9002/default/getArticleList`,
    getArticleById: `http://${host}:9002/default/getArticleById`,
    getTypeInfo: `http://${host}:9002/default/getTypeInfo`,
    getListById: `http://${host}:9002/default/getListById`,
}

export { serviceAPI, clientAPI };