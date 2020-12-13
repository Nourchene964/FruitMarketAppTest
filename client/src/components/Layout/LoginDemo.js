import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, message,Card} from 'antd';
import NormalLoginForm from './Forms/LoginForm';
import { login } from '../../apis/sessions';
import Logo from '../../img/logo.png'

class LoginDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

    }
    updateUser=(e)=>{
        //console.log(e.target.value);
        this.setState({
            email: e.target.value
        });
    }

    updatePass=(e)=>{
        //console.log(e.target.value);
        this.setState({
            password: e.target.value
        });
    }

    render() {

        return (
            <Card type="flex" justify="center" align="middle" gutter={16} className="row">
            {this.props.error ? message.error('There was an error logging in \n' + this.props.error): null }
            <Col span={8}>
                
                </Col>
            <Col span={8}>
                <img src={Logo} alt="" height="50px"/>
                <Divider orientation="left"></Divider>
                <NormalLoginForm email={this.state.email} password={this.state.password}
                                 updateUser={this.updateUser} updatePass={this.updatePass}
                                 onLogin={this.props.onLogin}
                />
            </Col>
         
           </Card>
        );
    }
}

    const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userData, cb) => { dispatch(login(userData, cb)); },
    }

    }
const mapStateToProps = (state) => {
    return {
    
        session: state.session,
        error: state.error,
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginDemo);