import { React, useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { updateContract } from "../../actions/contract";
import { Row, Col, Select, DatePicker, Button, Input, Steps } from "antd";
import FilterableSelect from "../Commons/FilterableSelection";
import { CustomerService } from "../../services/customer-service";
import { ContractService } from "../../services/contract-service";
import { ProductsService } from "../../services/products-service";
import { CategoryService } from "../../services/category-service";
import { useDispatch, useSelector } from "react-redux";
import ContractProductList from "./ContractProductList";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import "../../styles/Common.css";
import {
  showErrorMessage,
  showSuccessMessage,
  formatCurrency,
} from "../../commons/utilities";
import * as dayjs from "dayjs";

const ContractEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const auth = useSelector((state) => state.auth);
  const [contract, setContract] = useState({
    id: null,
    customerId: null,
    dateStart: null,
    deadline: null,
    products: [],
    number: null,
    total: 0,
    statusId: null,
    products: [],
  });
  const [editContractErrors, setEditContractErrors] = useState({});
  const [customerSelections, setCustomerSelections] = useState([]);
  const [productSelections, setProductSelections] = useState([]);
  const [contractStatusList, setContractStatusList] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentStatus, setCurrentStatus] = useState({
    id: null,
    code: null,
    description: null,
    name: null,
    next_stage_ids: null,
    previous_stage_ids: null,
    next_stages: [],
    previous_stages: [],
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const asyncLoad = async () => {
      const getProductResult = await ProductsService.getAll();
      const getContractResult = await ContractService.get(params.id);
      const allCategories = await CategoryService.getAll();

      let rawContract = null;
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
      } else {
        showErrorMessage("An error is occurred while loading products!");
      }

      if (
        getContractResult &&
        getContractResult.code == 200 &&
        getContractResult.data
      ) {
        const c = getContractResult.data.data;
        const newState = {
          total: c.total,
          number: c.contractNumber,
          id: c.id,
          customerId: c.customerId,
          statusId: c.statusId,
          dateStart: dayjs(c.dateStart, "YYYY-MM-DD"),
          deadline: dayjs(c.deadline, "YYYY-MM-DD"),
          products: c.contractItems.map((e) => ({
            id: e.id,
            productId: e.productId,
            quantity: e.quantity,
          })),
        };

        rawContract = c;
        setContract(newState);
      } else {
        showErrorMessage("An error is occurred while loading contract!");
      }

      if (
        rawContract != null &&
        products != null &&
        rawContract.contractItems != null &&
        rawContract.contractItems.length > 0
      ) {
        for (let i = 0; i < rawContract.contractItems.length; i++) {
          let item = rawContract.contractItems[i];
          let product = products.find((e) => e.id == item.productId);
          if (product != null) {
            item.id = product.id;
            item.supplier = product.supplier;
            item.category_id = product.category_id;
            item.unit = product.unit;
            item.cost = product.cost;
            item.price = product.price;
            item.category = product.category;
          }
        }

        const newState = {
          id: rawContract.id,
          customerId: rawContract.customerId,
          dateStart: dayjs(rawContract.dateStart, "YYYY-MM-DD"),
          deadline: dayjs(rawContract.deadline, "YYYY-MM-DD"),
          number: rawContract.contractNumber,
          total: rawContract.total,
          statusId: rawContract.statusId,
          products: rawContract.contractItems.map((e) => ({
            id: e.id,
            productId: e.productId,
            quantity: e.quantity,
            supplier: e.supplier,
            category: e.category,
            unit: e.unit,
            cost: e.cost,
            price: e.price,
          })),
        };
        setContract(newState);
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
      } else {
        showErrorMessage(
          "An error is occurred while loading customer information!"
        );
      }
    });
  }, []);

  useEffect(() => {
    ContractService.getStatus().then((data) => {
      if (data.code < 400 && data.data) {
        const lst = data.data.data.map((e) => ({
          id: e.id,
          code: e.code,
          description: e.description,
          name: e.name,
          next_stage_ids: e.next_stage_ids,
          previous_stage_ids: e.previous_stage_ids,
          next_stages: [],
          previous_stages: [],
        }));
        setContractStatusList(lst.sort((a, b) => a.id - b.id));
      } else {
        showErrorMessage("An error is occurred while loading contract status!");
      }
    });
  }, []);

  useEffect(() => {
    if (contractStatusList.length > 0 && contract.statusId != null) {
      const status = contractStatusList.find((e) => e.id == contract.statusId);
      if (status != null && status.previous_stage_ids != null) {
        const previousStatusIds = status.previous_stage_ids.split(",");
        status.previous_stages = [];
        for (let p = 0; p < previousStatusIds.length; p++) {
          let pStatus = contractStatusList.find(
            (e) => e.id == Number.parseInt(previousStatusIds[p])
          );
          if (pStatus != null) {
            status.previous_stages.push(pStatus);
          }
        }
      }

      if (status != null && status.next_stage_ids != null) {
        const nextStatusIds = status.next_stage_ids.split(",");
        status.next_stages = [];
        for (let n = 0; n < nextStatusIds.length; n++) {
          let pStatus = contractStatusList.find(
            (e) => e.id == Number.parseInt(nextStatusIds[n])
          );
          if (pStatus != null) {
            status.next_stages.push(pStatus);
          }
        }
      }
      setCurrentStatus(status);
    }
  }, [contractStatusList, contract]);

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

    let total = 0;
    for (var p = 0; p < newProducts.length; p++) {
      const price = Number.parseInt(newProducts[p].price);
      const quantity = Number.parseInt(newProducts[p].quantity);
      total += price * quantity;
    }
    setContract({ ...contract, products: newProducts, total: total });
  };

  const handleOnSelectProduct = (product, value) => {
    const isSelectedExistedProduct = contract.products.findIndex(
      (e) => e.productId == value
    );
    if (isSelectedExistedProduct >= 0) {
      showErrorMessage(
        "The selected product is already in the product list, please choose another product!"
      );
      return;
    }
    const index = contract.products.findIndex((e) => e.id == product.id);
    const selectedProduct = products.find((e) => e.id == value);
    const editedProduct = {
      ...product,
      productId: value,
      supplier: selectedProduct.supplier,
      cost: selectedProduct.cost,
      price: selectedProduct.price,
      category: selectedProduct.category,
    };
    const newProducts = [
      ...contract.products.slice(0, index),
      editedProduct,
      ...contract.products.slice(index + 1),
    ];

    let total = 0;
    for (var p = 0; p < newProducts.length; p++) {
      const price = Number.parseInt(newProducts[p].price);
      const quantity = Number.parseInt(newProducts[p].quantity);
      total += price * quantity;
    }

    setContract({ ...contract, products: newProducts, total: total });
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

    let total = 0;
    for (var p = 0; p < newProducts.length; p++) {
      const price = Number.parseInt(newProducts[p].price);
      const quantity = Number.parseInt(newProducts[p].quantity);
      total += price * quantity;
    }
    setContract({ ...contract, products: newProducts, total: total });
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
    data.dateStart = contract.dateStart
      ? contract.dateStart.format("YYYY-MM-DD")
      : null;
    data.deadline = contract.deadline
      ? contract.deadline.format("YYYY-MM-DD")
      : null;

    data.contractItems = contract.products.map((e) => ({
      productId: e.productId,
      quantity: e.quantity,
      contractId: contract.id,
    }));

    let total = 0;
    for (let p = 0; p < contract.products.length; p++) {
      const price = Number.parseInt(contract.products[p].price);
      const quantity = Number.parseInt(contract.products[p].quantity);
      total += price * quantity;
    }
    data.total = total;

    const errors = handleEditValidation(data);
    if (Object.keys(errors).length > 0) {
      return;
    }

    dispatch(updateContract(data));
  };

  const handleInforChange = (name, e) => {
    const contractData = { ...contract };
    contractData[name] = e;
    setContract(contractData);
  };

  function handleEditClick() {
    if (!disabled) {
      window.location.reload();
    } else setDisabled(!disabled);
  }

  function getStatusPercentage() {
    if (currentStatus != null) {
      let totalStatus =
        currentStatus.previous_stages.length + currentStatus.next_stages.length;
      let percentage =
        (currentStatus.previous_stages.length /
          (totalStatus == 0 ? 1 : totalStatus)) *
        100;
      return percentage;
    }
    return 0;
  }

  function getCurrentStatusPosition() {
    if (currentStatus != null && contractStatusList != null) {
      const index = contractStatusList.findIndex(
        (e) => e.id == currentStatus.id
      );
      return index < 0 ? 0 : index;
    }
    return 0;
  }

  const handleEditValidation = (submitData) => {
    const errors = {};
    if (!submitData.contractNumber || submitData.contractNumber.length == 0)
      errors.contractNumber = "Please fill out Contract Number";
    if (!submitData.customerId)
      errors.customerId = "Please fill out Customer Id";

    if (
      submitData.dateStart &&
      submitData.deadline &&
      submitData.dateStart > submitData.deadline
    )
      errors.date = "Deadline must not before Date Start";

    try {
      const total = Number.parseFloat(submitData.total);
      if (total < 0 || !total)
        errors.cost = "Please Total can not be negative or empty";
    } catch (error) {
      errors.cost = "Please Total can be positive and a number only";
    }

    setEditContractErrors(errors);
    return errors;
  };

  function handleOnClickValidate() {
    ContractService.validate(contract.id).then((data) => {
      if (data && data.code < 400) {
        showSuccessMessage();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        showErrorMessage("An error is occurred while validating the contract!");
      }
    });
  }
  return (
    <div>
      <div>
        <div className="text-align-right">
          <Button type="primary" onClick={handleEditClick}>
            {disabled ? "Chỉnh sửa" : "Huỷ chỉnh sửa"}
          </Button>
        </div>
        <Typography variant="h4" className="m-top--1rem">
          {disabled ? "Chi tiết Hợp Đồng" : "Chỉnh sửa Hợp Đồng"}
        </Typography>
      </div>
      <div className="m-top--2rem main-content-container">
        <Row>
          <Steps
            current={getCurrentStatusPosition()}
            percent={getStatusPercentage()}
            items={[
              ...currentStatus.previous_stages,
              {
                name: currentStatus.name,
                description: currentStatus.description,
              },
              ...currentStatus.next_stages,
            ].map((e) => ({ title: e.name, description: e.description }))}
          />
        </Row>
        {currentStatus &&
          currentStatus.next_stages != null &&
          currentStatus.next_stages.length > 0 && (
            <Row className="justify-content--right">
              <Button
                onClick={handleOnClickValidate}
                disabled={disabled}
                type="primary"
              >
                Validate
              </Button>
            </Row>
          )}
      </div>
      <div className="main-content-container m-top--3rem">
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
              disabled={disabled}
              defaultOptions={customerSelections}
              value={contract.customerId}
              className="w-100"
              placeholder="Select an option"
            />
            {editContractErrors.customerId && (
              <span className="error">{editContractErrors.customerId}</span>
            )}
          </Col>
          <Col span={12}>
            <div>
              <label>Created By</label>
              <span className="input--required">(*)</span>
            </div>
            <Select
              disabled={true}
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
              disabled={disabled}
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
              onSelect={(e) => {
                console.log(e);
                handleInforChange("deadline", e);
              }}
              disabled={disabled}
              className="w-100"
              placeholder="Select Deadline"
              value={contract.deadline}
              format="YYYY-MM-DD"
            />
            {editContractErrors.date && (
              <span className="error">{editContractErrors.date}</span>
            )}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Contract Number</label>
              <span className="input--required">(*)</span>
            </div>
            <Input
              disabled={disabled}
              value={contract.number}
              onChange={(e) => handleInforChange("number", e.target.value)}
              type="string"
              placeholder="Contract Number"
            />
            {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )}
          </Col>
          <Col span={12}>
            <div>
              <label>Total</label>
            </div>
            <Input
              disabled={true}
              value={formatCurrency(contract.total)}
              type="text"
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
          <Button type="primary" onClick={handleAddProduct} disabled={disabled}>
            <PlusOutlined />
            Add Product
          </Button>
        </div>
        <ContractProductList
          className="m-top--1rem"
          disabled={disabled}
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
            onClick={handleSaveContract}
            disabled={disabled}
          >
            <SaveOutlined />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractEdit;
