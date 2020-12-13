import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Row, Col} from 'antd';
import ProductList from './ProductList';
import SideMenu from './Layout/SideMenu';
import {Layout} from 'antd';
import { withRouter } from "react-router";
import AppHeader from './Layout/AppHeader';
const {Content} = Layout;
const Shopping = (props) => {
    return (
        <Layout>
            <Fragment>
            <Content style={{padding: '0 20px'}}>
            <AppHeader/>
            <Layout style={{padding: '24px 0', background: '#fff'}}>
           <SideMenu/>
           <Content style={{padding: '0 24px', minHeight: 280}}>
           <Row>
           <Col span={14}>
               <ProductList {...props} />
           </Col>
            </Row>
             </Content>
            </Layout>
            </Content> 
             </Fragment>
            </Layout>
  
    );
};

export default Shopping;
