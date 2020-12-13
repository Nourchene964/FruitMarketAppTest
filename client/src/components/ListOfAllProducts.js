import React, {Component, Fragment} from 'react';
import {Table,Layout } from 'antd';
import {Row, Col} from 'antd';
import SideMenu from './Layout/SideMenu';
import AppHeader from './Layout/AppHeader';
import axios from "axios";
const {Content} = Layout;
const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'ville',
    },
    {
      title: 'Pomme',
      dataIndex: 'Pomme',
      key: 'Pomme',
    },
    {
      title: 'Cerise',
      dataIndex: 'Cerise',
      key: 'Cerise',
    },
    {
        title: 'Banane',
        dataIndex: 'Banane',
        key: 'Banane',
      },
      {
        title: 'Orange',
        dataIndex: 'Pomme',
        key: 'Pomme',
      },
      {
        title: 'Mandarine',
        dataIndex: 'Mandarine',
        key: 'Mandarine',
      },
      {
        title: 'Fraise',
        dataIndex: 'Fraise',
        key: 'Fraise',
      },
      {
        title: 'Stock Total',
        dataIndex: 'stocktot',
        key: 'stocktot',
      },
  ];
  let defaultHeaders = {
    params: {},
    withCredentials: true,
};



class ListOfAllProducts extends Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
        category_id: null,
        products: [],
        stockPomme:[],
        stockCerise:[],
        stockBanane:[],
        stockOrange:[],
        stockMandarine:[],
        stockFraise:[]
    }}
    componentDidMount(){
      axios.get("http://localhost:5000/marketplaces/getAllMarketplaces")
      .then(response => {
        let table=[];
        response.data.forEach(element => {
         
          axios.get('http://localhost:5000/products/getProductsByMarketplace/'+element._id,defaultHeaders)
          .then(response => {
         
            console.log("element")
            let stockmandarine;
            let stockOrange;
            let stockCerise;
            let stockBanane;
            let stockFraise;
            let stockPomme;
            let stockTot=0;
     
            response.data.forEach(element => {
              if(element.name=="Mandarine"){
                stockmandarine=element.stock;
              }
              if(element.name=="Orange"){
                stockOrange=element.stock;
              }
              if(element.name=="Cerise"){
                stockCerise=element.stock;
              }
              if(element.name=="Banane"){
                stockBanane=element.stock;
              }
              if(element.name=="Pomme"){
                stockPomme=element.stock;
              }
              if(element.name=="Fraise"){
                stockFraise=element.stock;
              }
              
              stockTot=stockTot+element.stock;
            });
            var obj={
              "country":element.country,
              "Banane":stockBanane,
              "Pomme":stockPomme,
              "Orange":stockOrange,
              "Fraise":stockFraise,
              "Cerise":stockCerise,
              "Mandarine":stockmandarine,
              "stocktot":stockTot
            }

           
            table.push(obj);
            this.setState({products:table});
            console.log(table)
        });
        });
      });


    }

    render() {
        return(
            <Layout>
            <Fragment>
            <Content style={{padding: '0 20px'}}>
            <AppHeader/>
            <Layout style={{padding: '24px 0', background: '#fff'}}>
           <SideMenu/>
           <Content style={{padding: '0 24px', minHeight: 280}}>
           <Row>
           <Col span={20}>
           <Table     dataSource={this.state.products} columns={columns} >
            
             
           </Table>
           </Col>
            </Row>
             </Content>
            </Layout>
            </Content> 
             </Fragment>
            </Layout>
        
        );
    }

}


export default  ListOfAllProducts;


