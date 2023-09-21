import { React, useState, useEffect, Fragment } from "react";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Input,
  Steps,
  TextArea,
} from "antd";
import { ProductsService } from "../../services/products-service";
import { useDispatch, useSelector } from "react-redux";
import { createInventory} from "../../actions/inventory";
import {
  showErrorMessage,
  showSuccessMessage,
  formatCurrency,
} from "../../commons/utilities";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryService } from "../../services/inventory-service"
import DeliveryNoteItems from "./DeliveryNoteItems";
import { LOCAL_STORAGE_USER, USER_ROLE_ADMIN } from "../../commons/enum"

const InventoryCreate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [disabled, setDisabled] = useState(false);
  const [inventory, setInventory] = useState({
    id: null,
    productId: null,
    lastUpdate: null,
    location: null,
    beginBalance: null,
    endBalance: null,
    stockOut: 0,
    stockIn: 0,
  });
  const [deliverNoteError, setDeliveryNoteError] = useState([]);
  const [productSelections, setProductSelections] = useState([]);

  const loadData = async () => {
    const getInventory = await InventoryService.get(params.id);
    if (getInventory.isSuccess && getInventory.data && getInventory.data.data) {
      const inventory = getInventory.data.data;
      console.log(inventory)
      setInventory(inventory);
    }

    const getAllProduct = await ProductsService.getAll();
    if (getAllProduct.status == 200 && getAllProduct.data) {
      const mappedData = getAllProduct.data.map((e) => ({
        key: e.name,
        value: e.id,
      }));
      setProductSelections(mappedData);
    } else {
      showErrorMessage("An error is occurred while loading products!");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const onSaveDeliveryNote = () => {
    const data = {
      id: null,
      productId: null,
      lastUpdate: null,
      location: null,
      beginBalance: null,
      endBalance: null,
      stockOut: false,
      stockIn: false,
    };

    data.id = inventory.id;
    data.productId = inventory.productId;
    data.location = inventory.location;
    data.lastUpdate = inventory.lastUpdate;
    data.beginBalance = Number.parseInt(inventory.beginBalance);
    data.endBalance = Number.parseInt(inventory.endBalance);
    data.stockIn = inventory.stockIn;
    data.stockOut = inventory.stockOut;

    const errors = handleEditValidation(data);
    if (Object.keys(errors).length > 0) {
      return;
    }

    dispatch(createInventory(data, navigate));
  };

  const handleInforChange = (name, e) => {
    const data = { ...inventory };
    data[name] = e;
    setInventory(data);
  };

  const handleEditValidation = (data) => {
    const errors = {};
    if (!data.productId)
      errors.productId = "Please fill out Customer ID";

    if (!data.location)
      errors.location = "Please fill out Location";

    if (!data.beginBalance)
      errors.beginBalance = "Please fill out Begin Balance";

    if (!data.endBalance)
      errors.endBalance = "Please fill out End Balance";

    setDeliveryNoteError(errors);
    return errors;
  };

  const handleEditItemValidation = (errorsValidation, data) => {
    const errors = {};
    if (!data.productId) {
      errors.productId = "Please choose Product"
    }

    if (!data.remarks)
      errors.remarks = "Please fill out Remarks";

    if (Number.parseInt(data.quantity) < 0) {
      errors.quantity = "Quantity must be higher than 0"
    }

    if (Number.parseInt(data.unitPrice) < 0) {
      errors.unitPrice = "Unit Price must be higher than 0"
    }

    data.errors = errors;
    if (Object.keys(errors).length > 0) {
      errorsValidation.item = true;
    }
    return data;
  }

  return (
    <Fragment>
      <div className="main-content-container">
        <h1 className="m-top--1rem">
          Tạo Inventory
        </h1>
      </div>
      <div className="main-content-container m-top--3rem">
        <Row gutter={16} className="m-top--1rem">
          <Col span={8}>
            <div>
              <label>Product</label>
            </div>
            <Select
              className="w-100"
              placeholder="Select a Product"
              disabled={disabled}
              onSelect={(e) => handleInforChange("productId", e)}
              value={inventory.productId > 0 ? inventory.productId : null}
            >
              {!productSelections
                ? ""
                : productSelections.map((e) => (
                  <Select.Option key={e.value} value={e.value}>
                    {e.key}{" "}
                  </Select.Option>
                ))}
            </Select>
            {deliverNoteError.productId && (
              <span className="error">{deliverNoteError.productId}</span>
            )}
          </Col>
          <Col span={16}>
            <div>
              <label>Location</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("location", e.target.value)}
              disabled={disabled}
              value={inventory.location}
              type="string"
              placeholder="location"
            />
            {deliverNoteError.location && (
              <span className="error">{deliverNoteError.location}</span>
            )}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={6}>
            <div>
              <label>Begin Balance</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("beginBalance", e.target.value)}
              disabled={disabled}
              value={inventory.beginBalance}
              type="number"
              placeholder="beginBalance"
            />
            {deliverNoteError.beginBalance && (
              <span className="error">{deliverNoteError.beginBalance}</span>
            )}
          </Col>
          <Col span={6}>
            <div>
              <label>End Balance</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("endBalance", e.target.value)}
              disabled={disabled}
              value={inventory.endBalance}
              type="number"
              placeholder="endBalance"
            />
            {deliverNoteError.endBalance && (
              <span className="error">{deliverNoteError.endBalance}</span>
            )}
          </Col>
          <Col span={6}>
            <div>
              <label>Stock In</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("stockIn", e.target.value)}
              disabled={true}
              value={inventory.stockIn}
              type="number"
              placeholder="stockIn"
            />
            {deliverNoteError.stockIn && (
              <span className="error">{deliverNoteError.stockIn}</span>
            )}
          </Col>
          <Col span={6}>
            <div>
              <label>Stock Out</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("deliveryBy", e.target.value)}
              disabled={true}
              value={inventory.stockOut}
              type="number"
              placeholder="stockOut"
            />
            {deliverNoteError.stockOut && (
              <span className="error">{deliverNoteError.stockOut}</span>
            )}
          </Col>
        </Row>

      </div>
      <div className="m-top--2rem">
        <div className="main-content-container text-align-right">
          <Button
            id="saveBtn"
            type="primary"
            onClick={onSaveDeliveryNote}
            disabled={disabled}
          >
            <SaveOutlined />
            Save
          </Button>
        </div>
      </div>

    </Fragment>
  );
};
export default InventoryCreate;
