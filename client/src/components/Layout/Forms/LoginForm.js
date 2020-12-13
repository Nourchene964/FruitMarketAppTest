import React, {Component} from 'react';
import { Form, Icon, Input, Button,Row } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;

class LoginForm extends Component {
    constuctor() {
        this.routeChange = this.routeChange.bind(this);
      }
    handleSubmit = (e) => {
     e.preventDefault();
     this.props.onLogin(this.props,()=>{this.props.history.push('/listOfAllProducts')});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your email!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Email" onChange={(e)=>{this.props.updateUser(e)}} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password" onChange={(e)=>{this.props.updatePass(e)}}
                        />
                    )}
                </FormItem>
                <FormItem>
                <Row type="flex" justify="center" align="middle" gutter={16} className="row">
                    <Button type="primary" htmlType="submit" className="login-form-button"
                    >Log in</Button>
                    </Row>
                </FormItem>
            </Form>
        );
    }

}

const NormalLoginForm = Form.create()(LoginForm);

const select = state => ({
    session: state.session
});

export default  withRouter(connect(select)(NormalLoginForm));