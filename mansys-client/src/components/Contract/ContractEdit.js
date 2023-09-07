import { React, useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { updateContract } from "../../actions/contract";
import { Row, Col, Select, DatePicker, Button, Input } from "antd";
import FilterableSelect from "../Commons/FilterableSelection";
import { CustomerService } from "../../services/customer-service";
import { ContractService } from "../../services/contract-service";
import { ProductsService } from "../../services/products-service";
import { CategoryService } from "../../services/category-service";
import { useDispatch, useSelector } from "react-redux";
import ContractProductList from "./ContractProductList";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import moment from "moment";
import "../../styles/Common.css";
import { showErrorMessage } from '../../commons/utilities'

const ContractEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const auth = useSelector((state) => state.auth);
  const [contract, setContract] = useState({
    id: null,
    customerId: null,
    dateStart: moment(),
    deadline: moment(),
    products: [],
    number: null,
    total: null,
    statusId : null
  });
  const [customerSelections, setCustomerSelections] = useState([]);
  const [productSelections, setProductSelections] = useState([]);
  const [categorySelections, setCategorySelections] = useState([]);
  const [contractStatusList, setContractStatusList] = useState([])
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const asyncLoad = async () => {
      const getProductResult = await ProductsService.getAll();
      const getContractResult = await ContractService.get(params.id);
      const allCategories = await CategoryService.getAll();
      setCategorySelections(allCategories.data);

      let contract = null;
      let products = null;

      if (
        getProductResult &&
        getProductResult.status == 200 &&
        getProductResult.data
      ) {
        const mappedData = getProductResult.data.map((e) => ({
          key: e.name,
          value: e.id,
        }));
        setProductSelections(mappedData);
        setProducts(getProductResult.data);
        products = getProductResult.data;
      }else {
        showErrorMessage('An error is occurred while loading products!')
      }

      if (
        getContractResult &&
        getContractResult.code == 200 &&
        getContractResult.data
      ) {
        const c = getContractResult.data.data;
        setContract({
          ...contract,
          total: c.total,
          number: c.contractNumber,
          id: c.id,
          customerId: c.customerId,
          products: c.contractItems.map((e) => ({
            id: e.id,
            productId: e.productId,
            quantity: e.quantity,
          })),
        });

        contract = getContractResult.data.data;
      }else {
        showErrorMessage('An error is occurred while loading contract!')
      }

      if (contract != null && products != null) {
        if (
          contract.contractItems != null &&
          contract.contractItems.length > 0
        ) {
          for (let i = 0; i < contract.contractItems.length; i++) {
            let item = contract.contractItems[i];
            let product = products.find((e) => e.id == item.productId);
            if (product != null) {
              item.supplier = product.supplier;
              item.category_id = product.category_id;
              item.unit = product.unit;
              item.cost = product.cost;
              item.price = product.price;
            }
          }

          setContract({
            ...contract,
            total: contract.total,
            number: contract.contractNumber,
            id: contract.id,
            customerId: contract.customerId,
            products: contract.contractItems.map((e) => ({
              id: e.id,
              productId: e.productId,
              quantity: e.quantity,
              supplier: e.supplier,
              category: getCategoryName(allCategories.data, e.category_id),
              unit: e.unit,
              cost: e.cost,
              price: e.price,
            })),
          });
        }
      }else {
          showErrorMessage('An error is occurred while loading product list information!')
      }
    };

    asyncLoad();
  }, []);

  useEffect(() => {
    CustomerService.getAll().then((data) => {
      if (data && data.code == 200 && data.data) {
        const mappedData = data.data.map((e) => ({
          key: e.name,
          value: e.id,
        }));
        setCustomerSelections(mappedData);
      }
      else {
        showErrorMessage('An error is occurred while loading customer information!')
      }
    });
  }, []);

  useEffect(() => {
    ContractService.getStatus().then((data) => {
      if(data.code < 400 && data.data){
        setContractStatusList(data.data.data)
      }else {
        showErrorMessage('An error is occurred while loading contract status!')
      }
    })
  }, [])

  const getCategoryName = (categories, category_id) => {
    return categories.find((c) => c.id == category_id).name;
  };

  const handleAddProduct = (e) => {
    let nextId = contract.products.length + 1;
    nextId = nextId == 0 ? -1 : -nextId;
    const nextProduct = { id: nextId, quantity: 0 };
    setContract({ ...contract, products: [...contract.products, nextProduct] });
    document.getElementById("saveBtn").scrollIntoView({ behavior: "smooth" });
  };

  const onRemoveProduct = function (product) {
    const index = contract.products.findIndex((e) => e.id == product.id);
    const newProducts = [
      ...contract.products.slice(0, index),
      ...contract.products.slice(index + 1),
    ];
    setContract({ ...contract, products: newProducts });
  };

  const handleOnSelectProduct = (product, value) => {
    const index = contract.products.findIndex((e) => e.id == product.id);
    const selectedProduct = products.find((e) => e.id == value);
    const editedProduct = {
      ...product,
      productId: value,
      supplier: selectedProduct.supplier,
      cost: selectedProduct.cost,
      price: selectedProduct.price,
      category: getCategoryName(
        categorySelections,
        selectedProduct.category_id
      ),
    };
    const newProducts = [
      ...contract.products.slice(0, index),
      editedProduct,
      ...contract.products.slice(index + 1),
    ];
    setContract({ ...contract, products: newProducts });
  };

  const handleOnQuantityChange = (product, e) => {
    const index = contract.products.findIndex((e) => e.id == product.id);
    const editedProduct = {
      ...product,
      quantity: Number.parseInt(e.target.value),
    };
    const newProducts = [
      ...contract.products.slice(0, index),
      editedProduct,
      ...contract.products.slice(index + 1),
    ];
    setContract({ ...contract, products: newProducts });
  };

  const handleSaveContract = () => {
    const data = {
      id: null,
      contractNumber: null,
      customerId: null,
      userId: auth.id,
      dateStart: null,
      deadline: null,
      total: 0,
      contractItems: [],
      isActive: true,
    };

    data.id = contract.id;
    data.contractNumber = contract.number;
    data.customerId = contract.customerId;
    data.dateStart = contract.dateStart ? contract.dateStart : null;
    data.deadline = contract.deadline ? contract.deadline : null;
    data.total = contract.total || 0;
    data.contractItems = contract.products.map((e) => {
      return {
        productId: e.productId,
        quantity: e.quantity,
        contractId: contract.id,
      };
    });

    dispatch(updateContract(navigate, data));
  };

  const handleInforChange = (name, e) => {
    const contractData = { ...contract };
    contractData[name] = e;
    setContract(contractData);
  };

  const getContractStatus = () => {
    console.log(contractStatusList.length > 0, contractStatusList, contract)
    if(contractStatusList.length > 0 && contract.statusId != null){
      const status = contractStatusList.find((e) => e.id == contract.statusId)
      console.log(status)
      return status.name
    }
    return ''
  }
  return (
    <div>
      <div>
        <Typography variant="h4" className="m-top--1rem">
          Chỉnh sửa Hợp Đồng
        </Typography>
      </div>
      <div className="m-top--2rem timeline-container">
        {
          contract.statusId && contractStatusList.length > 0 && 
          (
            <Fragment>
                 <div class="timeline-previous-status">
                    <h2>Left Column</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div class="timeline-next-status">
                    <div class="right-subcolumn">
                        <h2>Right Subcolumn 1</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div class="right-subcolumn">
                        <h2>Right Subcolumn 2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
            </Fragment>
          )
        }
      </div>
      <div className="main-content-container">
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Customer</label>
              <span className="input--required">(*)</span>
            </div>
            <FilterableSelect
              onChange={(e) => {
                handleInforChange("customerId", e);
              }}
              defaultOptions={customerSelections}
              value={contract.customerId}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Created By</label>
              <span className="input--required">(*)</span>
            </div>
            <Select
              className="w-100"
              placeholder="Select an option"
              value={auth.username}
            >
              <Select.Option key={auth.username} value={auth.username} />
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
              onSelect={(e) => {
                handleInforChange("dateStart", e);
              }}
              className="w-100"
              placeholder="Select Date Start"
              defaultValue={contract.dateStart}
              format="DD-MM-YYYY"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Deadline</label>
              <span className="input--required">(*)</span>
            </div>
            <DatePicker
              onSelect={(e) => {
                handleInforChange("deadline", e);
              }}
              className="w-100"
              placeholder="Select Deadline"
              defaultValue={contract.deadline}
              format="DD-MM-YYYY"
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
              value={contract.number}
              onChange={(e) => handleInforChange("number", e.target.value)}
              type="string"
              placeholder="Contract Number"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Total</label>
            </div>
            <Input
              value={contract.total}
              onChange={(e) => handleInforChange("total", e.target.value)}
              type="number"
              placeholder="Contract Total"
            />
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
          <Button type="primary" onClick={handleAddProduct}>
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
          <Button id="saveBtn" type="primary" onClick={handleSaveContract}>
            <SaveOutlined />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractEdit;
