import React, {Component} from 'react';
import {Layout, Menu, Spin} from 'antd';
import {Link} from 'react-router-dom';

import axios from "axios";

const {Sider} = Layout;


const SideStyle = {
    textAlign: 'center'
};


class SideMenu extends Component {
    constructor(props, state) {
        super(props, state);

        this.state = {

            loading: true,
            categories: []

        };

    }
    componentDidMount() {
        axios.get("http://localhost:5000/marketplaces/getAllMarketplaces")
        .then(response => {
         this.setState({
        categories: response.data,
                    loading: false
                });

            });
     
    }

    renderCategories = () => {

        if (this.state.loading) {
            return (
                <div style={SideStyle}>
                    <Spin size="large" tip="Loading Categories..."/>
                </div>
            );
        }

        if (!this.state.categories || this.state.categories.length === 0) {
            return <p>No categories to show</p>
        }

        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%'}}
            >
                <Menu.Item key="1">
                <Link to="/listOfAllProducts">
                                  
                           All
                              </Link>  
                </Menu.Item>
                {
                    this.state.categories.map((category) => {
                        return ( 
                            <Menu.Item key={category._id}>
                                <Link to={`/category/${category._id}`}>
                                  
                                    { 
                                        category.country 
                                    } 
                                </Link>
                            </Menu.Item>
                        );
                    })
                }

            </Menu>
        );

    };

    render() {

        return (
            <Sider width={220}
                   style={{background: '#fff'}}
            >

                <h2>Filter By Country
                </h2>

                {this.renderCategories()}

            </Sider>

        );
    }
}

export default SideMenu;
