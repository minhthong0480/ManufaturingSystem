import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { createContract } from "../../actions/contract";
import { Row, Col, Select, DatePicker, Button, Input } from 'antd';
import  FilterableSelect  from '../Commons/FilterableSelection'
import { CustomerService } from '../../services/customer-service'
import { ProductsService } from '../../services/products-service'
import { useDispatch, useSelector } from 'react-redux'
import ContractProductList from './ContractProductList'
import { PlusOutlined, SaveOutlined  } from "@ant-design/icons";
import '../../styles/Common.css';
import { showErrorMessage , formatCurrency} from "../../commons/utilities";
import * as dayjs from 'dayjs';

const ContractCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = useSelector(state => state.auth)
  const [contract, setContract] = useState({
    customerId : null,
    dateStart: dayjs(),
    deadline: dayjs(),
    products : [],
    number : null,
    total : 0
  })
  const [customerSelections, setCustomerSelections] = useState([])
  const [productSelections, setProductSelections] = useState([])
  const [productList, setProductList] = useState([])

  useEffect(() => {
    CustomerService.getAll().then((data) => {
      if(data && data.code < 400 && data.data){
        const mappedData = data.data.map(e => ({
          key : e.name,
          value: e.id
        }))
        setCustomerSelections(mappedData)
      }else {
        showErrorMessage('An error is occurred while loading customers!')
      }
    })
  } , [])

  useEffect(() => {
    ProductsService.getAll().then((data) => {
      if(data && data.status == 200 && data.data){
        const mappedData = data.data.map(e => ({
          key : e.name,
          value: e.id
        }))
        setProductSelections(mappedData)
        setProductList(data.data)
      }else {
        showErrorMessage('An error is occurred while loading products!')
      }
    })
  } , [])

  const handleAddProduct = (e) => {
    let nextId = contract.products.length + 1
    nextId = nextId == 0 ? -1 : -nextId
    const nextProduct = {id : nextId, quantity: 0}
    setContract({...contract, products : [...contract.products, nextProduct]})
    document.getElementById('saveBtn').scrollIntoView({ behavior: 'smooth' });
  }

  const onRemoveProduct = function(product) {
    const index = contract.products.findIndex((e) => e.id == product.id)
    const newProducts = [...contract.products.slice(0,index), ...contract.products.slice(index+1)]
    let total = 0
    for(var p = 0; p < newProducts.length; p++){
      const price = Number.parseInt(newProducts[p].price)
      const quantity = Number.parseInt(newProducts[p].quantity)
      total+= price * quantity
    }
    setContract({...contract, products: newProducts, total: total})
  }

  const handleOnSelectProduct = (product, value) => {
    const isSelectedExistedProduct = contract.products.findIndex((e) => e.productId == value)
    if(isSelectedExistedProduct >= 0) {
      showErrorMessage('The selected product is already in the product list, please choose another product!')
      return
    }
    const index = contract.products.findIndex((e) => e.id == product.id) 
    const refProduct = productList.find((e) => e.id == value)
    const editedProduct = {
      id: value,
      ...product,
      supplier: refProduct.supplier,
      category : refProduct.category,
      unit: refProduct.unit,
      cost: refProduct.cost,
      price: refProduct.price,
      productId: refProduct.id
    }
    const newProducts = [...contract.products.slice(0,index), editedProduct , ...contract.products.slice(index+1)]
    let total = 0
    for(var p = 0; p < newProducts.length; p++){
      const price = Number.parseInt(newProducts[p].price)
      const quantity = Number.parseInt(newProducts[p].quantity)
      total+= price * quantity
    }
    setContract({...contract, products : newProducts, total : total})
  }

  const handleOnQuantityChange = (product, e) => {
    const index = contract.products.findIndex((e) => e.id == product.id) 
    const editedProduct = {
      ...product,
      quantity: Number.parseInt(e.target.value)
    }
    const newProducts = [...contract.products.slice(0,index), editedProduct , ...contract.products.slice(index+1)]
    
    let total = 0
    for(var p = 0; p < newProducts.length; p++){
      const price = Number.parseInt(newProducts[p].price)
      const quantity = Number.parseInt(newProducts[p].quantity)
      total+= price * quantity
    }
    setContract({...contract, products : newProducts, total : total})
  }

  const handleSaveContract = () => {
    const data = {
      contractNumber : null,
      customerId : null,
      userId :  auth.id,
      dateStart : null,
      deadline : null,
      total : 0,
      contractItems : [],
      isActive : true
    }

    data.contractNumber = contract.number
    data.customerId = contract.customerId
    data.dateStart = contract.dateStart ? contract.dateStart.format('YYYY-MM-DD') : null
    data.deadline = contract.deadline ? contract.deadline.format('YYYY-MM-DD') : null
    data.total = contract.total || 0 
    data.contractItems = contract.products.map(e => {
      return {
        productId : e.productId,
        quantity : e.quantity,
        isActive: true
      }
    })
    dispatch(createContract(navigate, data))
  }

  const handleInforChange = (name, e) => {
    const contractData = {...contract}
    contractData[name] = e
    setContract(contractData)
  }

  return (
    <div>
      <div>
        <Typography variant="h4" className="m-top--1rem">
            Tạo Mới Hợp Đồng
        </Typography>
      </div>
      <div className="main-content-container">
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Customer</label>
                  <span className="input--required">(*)</span>
                </div>
                <FilterableSelect 
                onChange={(e) => {handleInforChange("customerId", e)}}
                defaultOptions={customerSelections} 
                className="w-100" 
                placeholder="Select an option"/>
          </Col>
          <Col span={12}>
                <div>
                  <label>Created By</label>
                  <span className="input--required">(*)</span>
                </div>
                <Select
                  className="w-100"
                  placeholder="Select an option"
                  value={auth.username}>
                    <Select.Option key={auth.username} value={auth.username}/>
                  </Select>
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Date Start</label>
                  <span className="input--required">(*)</span>
                </div>
                <DatePicker
                    onSelect={(e) => {handleInforChange("dateStart", e)}}
                    className="w-100"
                    placeholder="Select Date Start"
                    value={contract.dateStart}
                    format="YYYY-MM-DD"
                  />
          </Col>
          <Col span={12}>
                <div>
                  <label>Deadline</label>
                  <span className="input--required">(*)</span>
                </div>
              <DatePicker
                    onSelect={(e) => {handleInforChange("deadline", e)}}
                    className="w-100"
                    placeholder="Select Deadline"
                    value={contract.deadline}
                    format="YYYY-MM-DD"
              />
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
                <div>
                  <label>Contract Number</label>
                  <span className="input--required">(*)</span>
                </div>
                <Input 
                onChange={(e) => handleInforChange('number', e.target.value)}
                type="string"  
                placeholder="Contract Number"/>
          </Col>
          <Col span={12}>
                <div>
                  <label>Total</label>
                </div>
              <Input
              disabled={true}
              value={formatCurrency(contract.total)} 
              type="text" 
              placeholder="Contract Total"/>
          </Col>
        </Row>
      </div>
      <div className="m-top--2rem">
        <Typography variant="h4" className="m-top--1rem">
            Danh sách sản phẩm
          </Typography>
      </div>
      <div className="main-content-container">
        <div className="text-align-right">
          <Button
              type="primary"
              onClick={handleAddProduct}>
                <PlusOutlined />
                Add Product
          </Button>
        </div>
        <ContractProductList 
        className="m-top--1rem"
        productLists={contract.products}
        productListSelections={productSelections}
        onRemoveProduct={onRemoveProduct}
        onSelectProduct={handleOnSelectProduct}
        onQuantityChange={handleOnQuantityChange}
        />
      </div>
      <div className="m-top--2rem">
        <div className="main-content-container text-align-right">
            <Button
            id="saveBtn"
            type="primary"
            onClick={handleSaveContract}>
              <SaveOutlined />
              Save
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractCreate;
