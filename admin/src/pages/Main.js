import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import AdminIndex from './AdminIndex';
// import AddArticle from './AddArticle';
// import ArticleList from './ArticleList';


// 所有的路由配置
const Main = () => {
    return (
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/index/"  component={AdminIndex} />
            {/* <Route path="/index/add/" exact component={AddArticle} />
            <Route path="/index/add/:id" exact component={AddArticle} />
            <Route path="/index/list/" component={ArticleList} /> */}
        </Router>
    )
}

export default Main;