import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Layout} from 'antd';
import AboutUs from './components/AboutUs';
import Shopping from "./components/ShoppingFruit";
import LoginDemo from './components/Layout/LoginDemo';
import { Switch } from "react-router";
import ListOfAllProducts from './components/ListOfAllProducts';


const {Content} = Layout;

const Index = () => <h2>Home</h2>;
const Contact = () => <h2>Contact Us</h2>;

class App extends Component {
    render() {
        return (
            <Layout>
                                     <Router>
                                     {/* <Switch> */}
                                     <Route exact path="/">
                                     <LoginDemo />
                                    </Route>
                                    <Route path="/category/:id" component={Shopping}/>
                                    <Route path="/shopping" component={Shopping}/>
                                    <Route path="/about/" component={AboutUs}/>
                                    <Route path="/contact/" component={Contact}/>
                                    <Route path="/login" component={LoginDemo}/>
                                    <Route path="/listOfAllProducts" component={ListOfAllProducts}/>
                                    {/* </Switch>     */}
                        </Router>
                    
         </Layout>

        );
    }
}

export default App;
