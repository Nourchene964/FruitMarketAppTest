import React, { Component, Fragment } from 'react';
import { Spin, List, Card, Button,notification ,Alert,Descriptions, InputNumber,Row, Col,Modal,Select } from 'antd';
import axios from "axios";
import Banane from '../img/banane.jpg';
import Fraise from '../img/fraise.jpg';
import Cerise from '../img/cerise.jpg';
import Mandarine from '../img/mandarine.jpg';
import Pomme from '../img/pomme.jpg';
import Orange from '../img/orange.jpg';
const { Meta } = Card;
const { Option } = Select;
let defaultHeaders = {
    params: {},
    withCredentials: true,
};

class ProductList extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {
            category_id: null,
            products: [],
            loading: false,
            currentPage: 1,
            category: [],
            previewVisible:false,
            prodPourTransfert:null,
            totalprod:0,
            Quantite:null,
            errormessage: "",
            countryForTransfer:null
        }
    }
     openNotification = () => {
        notification.success({
          message: 'Success',
          description:
            'Stock updated successfully',
          
        });
      };

    fetchProducts = (category_id, page) => {
        this.setState({
            loading: true,
            products: [],
            category_id
        });

        var tot=0;
        axios.get('http://localhost:5000/products/getProductsByMarketplace/'+category_id,defaultHeaders).then(response => {
            response.data.forEach(element => {
            tot=tot+element.stock;   
            });
            this.setState({
                products: response.data,
                loading: false,
                currentPage: page,
                totalprod:tot
            });
        });
    };
    

    transfert(item){
        this.setState({previewVisible : true});
        this.setState({prodPourTransfert:item});

    }

    componentDidUpdate() {
        if (this.state.category_id !== this.props.match.params.id) {
       
            this.fetchProducts(this.props.match.params.id, 1);
         
         }
    }
    onChange = (page) => {
        this.fetchProducts(this.state.category_id, page);
    }
    confirmTransfer(){
        console.log(this.state.Quantite)
        console.log(this.state.countryForTransfer)
        if(this.state.Quantite==null){
            this.setState({errormessage:"You must select a quantity"});
        }
        if(this.state.countryForTransfer==null){
            this.setState({errormessage:"You must select a country"});
        }
        axios.get("http://localhost:5000/marketplaces/getAllMarketplaces")
        .then(response => {
    
            response.data.forEach(element => {
                if(this.state.prodPourTransfert.marketplace==element._id){
                
                    if(element.country==this.state.countryForTransfer){
                        this.setState({errormessage:"You can't Transfer to the same Country"});
                    }
                 
                }
            });
                
            });
      
        if(this.state.Quantite!=null&&this.state.countryForTransfer!=null){
            console.log(this.state.prodPourTransfert)
        axios.post("http://localhost:5000/products/TransferFromCountryToAnother",
            {
                "Quantity":this.state.Quantite,
                 "CountryForTransfert":this.state.countryForTransfer,
                 "prod":{"_id":this.state.prodPourTransfert._id,
                 "name":this.state.prodPourTransfert.name}
         })
        .then(response => {
            this.setState({previewVisible : false});
          
        })
        .catch(error => {
            console.log(error);
                });
          
  axios.post("http://localhost:5000/products/UpdateTheQuantityOfCountry",
            {
                "Quantity":this.state.Quantite,
                 "CountryForTransfert":this.state.countryForTransfer,
                 "prod":{"_id":this.state.prodPourTransfert._id,
                 "name":this.state.prodPourTransfert.name}  
         })
        .then(response => {
           this.openNotification();
           this.fetchProducts(response.data._id, 1)
        })
        .catch(error => {
            console.log(error);
                });

        }

         }
    handleChange = qt => {
        this.setState({ Quantite:qt });
      };
      handleChangeCountry = country => {
        this.setState({ countryForTransfer:country });
      };

    renderProducts = () => {
        if (this.state.loading) {
            return (
                <Spin size="large" tip="Loading Products..." />
            );
        }
        return (
        <Fragment>

             <Modal visible={this.state.previewVisible} 
                footer={[
                    <Button key="back" onClick={() => this.setState({previewVisible : false})}>
                      Annuler
                    </Button>,
                    <Button key="submit" type="danger" onClick={() => this.confirmTransfer()}>
                      Confirmer
                    </Button>
                  ]}
                onCancel={() => this.setState({previewVisible : false})} >
                 {this.state.errormessage=="You must select a quantity" ?
                <Alert message={this.state.errormessage} type="error" />:null
                 }
                {this.state.errormessage=="You must select a country" ?
                <Alert message={this.state.errormessage} type="error" />:null
                 }
                    {this.state.errormessage=="You can't Transfer to the same Country" ?
                <Alert message={this.state.errormessage} type="error" />:null
                 }
                 
                 
    
              <div className="gx-form-group">
              <Descriptions title="Choose the quantity:">
             </Descriptions>
             <InputNumber min={1} max={10} 
             onChange={this.handleChange}
             />
             <Descriptions title="Choose the destination country :">
             </Descriptions>
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Choose a country"
                optionFilterProp="children"
                onChange={this.handleChangeCountry}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                <Option value='Paris' >Paris</Option>
                <Option  value='Nice'>Nice</Option>
                <Option value='Dijon' >Dijon</Option>
                <Option  value='Marseille'>Marseille</Option>
                <Option  value='Lille'>Lille</Option>
                </Select>
                </div>
                </Modal>
            
                <Row style={{marginBottom: 20}}>
                </Row>
       
                <Row>
                    <Col>
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={this.state.products}
                            renderItem={item => (
                                <List.Item>
                                        <Card
                                            actions={[
                                                <Button type="danger"  onClick={() => this.transfert(item)}>Transfèrer</Button>
                                            ]}>                                    
                                            <Meta
                                                title={item.name}
                                            />  
                                {item.name=="Banane"?
                                    <img src={Banane} alt="Banane" width="150px" height="150px"/>:null
                                }
                                {item.name=="Fraise"?
                                    <img src={Fraise} alt="Fraise" width="150px" height="150px" />:null
                                }
                                {item.name=="Cerise"?
                                    <img src={Cerise} alt="Cerise" width="150px" height="150px" />:null
                                }
                                {item.name=="Pomme"?
                                    <img src={Pomme} alt="Pomme" width="150px" height="150px" />:null
                                }
                                {item.name=="Orange"?
                                    <img src={Orange} alt="Orange" width="150px" height="150px" />:null
                                }
                                {item.name=="Mandarine"?
                                    <img src={Mandarine} alt="Mandarine" width="150px" height="150px" />:null
                                }
                                <h4>Stock : {item.stock}</h4>
                                </Card> 
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>  
            </Fragment>
        );
    };
    render() {

        return (
            <div>
               <h1> Total Stock  : {this.state.totalprod} </h1>
                {this.renderProducts()}
            </div>
        );
    }
}



export default(ProductList);
