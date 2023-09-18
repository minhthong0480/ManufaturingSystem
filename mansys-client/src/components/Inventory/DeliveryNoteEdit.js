import { Descriptions, Modal, List, Typography } from "antd";
import { React, useState, useEffect, Fragment } from "react";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import moment from "moment";
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
import FilterableSelect from "../Commons/FilterableSelection";
import { SupplierService } from "../../services/supplier-service";
import { ProductsService } from "../../services/products-service";
import { MaterialService } from "../../services/material-service";
import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryNote } from "../../actions/delivery-note";
import {
  showErrorMessage,
  showSuccessMessage,
  formatCurrency,
} from "../../commons/utilities";
import { useNavigate, useParams } from "react-router-dom";
import { DeliveryNoteService } from "../../services/delivery-note-service"

const DeliveryNoteEdit = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [disabled, setDisabled] = useState(true);
  const [deliveryNote, setDeliveryNote] = useState({
    id: null,
    customerId: null,
    deliveryDate: null,
    salesOrder: null,
    deliveryBy: null,
    remarks: null,
    deliveryNoteItems: [],
  });
  const [supplierSelections, setSupplierSelections] = useState([]);
  const [billList, setBillList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  const loadData = async () => {
    const getDeliveryNote = await DeliveryNoteService.get(params.id);
    if (getDeliveryNote.isSuccess && getDeliveryNote.data && getDeliveryNote.data.data) {
      const deliveryNote = getDeliveryNote.data.data;
      setDeliveryNote(deliveryNote);
      console.log(deliveryNote)
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleOnQuantityChange = (bill, e) => {
    const index = billList.findIndex((e) => e.id == bill.id);
    const editedBill = {
      ...bill,
      quantity: Number.parseInt(e.target.value),
    };
    const newBillList = [
      ...billList.slice(0, index),
      editedBill,
      ...billList.slice(index + 1),
    ];

    let total = 0;
    for (var p = 0; p < newBillList.length; p++) {
      const price = Number.parseInt(newBillList[p].cost);
      const quantity = Number.parseInt(newBillList[p].quantity);
      console.log(price, " ", quantity)
      total += price * quantity;
    }
    setBillList(newBillList);
    setDeliveryNote({ ...deliveryNote, cost: total })
  };

  const handleOnRemoveMaterial = function (bill) {
    const index = billList.findIndex((e) => e.id == bill.id);
    const newBillList = [
      ...billList.slice(0, index),
      ...billList.slice(index + 1),
    ];

    let total = 0;
    for (var p = 0; p < newBillList.length; p++) {
      const price = Number.parseInt(newBillList[p].cost);
      const quantity = Number.parseInt(newBillList[p].quantity);
      console.log(price, " ", quantity)
      total += price * quantity;
    }
    setBillList(newBillList);
    setDeliveryNote({ ...deliveryNote, cost: total })
  };

  const handleAddMaterial = (e) => {
    let nextId = billList.length + 1;
    nextId = nextId == 0 ? -1 : -nextId;
    const nextBill = { id: nextId, quantity: 0 };
    setBillList([...billList, nextBill])
  };

  const onSaveDeliveryNote = () => {
    const data = {
      id: null,
      customerId: null,
      deliveryDate: null,
      salesOrder: null,
      deliveryBy: null,
      remarks: null,
      deliveryNoteItems: [],
    };

    data.id = deliveryNote.id;
    data.customerId = deliveryNote.customerId;
    data.salesOrder = deliveryNote.salesOrder;
    data.deliveryDate = deliveryNote.deliveryDate;
    data.deliveryBy = deliveryNote.deliveryBy;
    data.remarks = deliveryNote.remarks;
    data.deliveryNoteItems = deliveryNote.deliveryNoteItems;

    dispatch(updateDeliveryNote(data));
  };

  const handleInforChange = (name, e) => {
    const data = { ...deliveryNote };
    data[name] = e;
    setDeliveryNote(data);
  };

  function handleEditClick() {
    if (!disabled) {
      resetData();
    } else setDisabled(!disabled);
  }

  function resetData() {
    setDisabled(!disabled);
    loadData();
  }

  return (
    <Fragment>
      <div>
        <div className="text-align-right">
          <Button type="primary" onClick={handleEditClick}>
            {disabled ? "Chỉnh sửa" : "Huỷ chỉnh sửa"}
          </Button>
        </div>
        <h1 className="m-top--1rem">
          {disabled ? "Chi tiết Delivery Note" : "Chỉnh sửa Delivery Note"}
        </h1>
      </div>
      <div className="main-content-container m-top--3rem">
        <Row gutter={16} className="m-top--1rem">
          <Col span={2}>
            <div>
              <label>ID</label>
            </div>
            <Input
              disabled={true}
              value={deliveryNote.id}
              type="string"
              placeholder="delivery note id"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={4}>
            <div>
              <label>Customer ID</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("customerId", e.target.value)}
              disabled={disabled}
              value={deliveryNote.customerId}
              type="string"
              placeholder="Customer Id"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={2}>
            <div>
              <label>Sale Orders</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("salesOrder", e.target.value)}
              disabled={disabled}
              value={deliveryNote.salesOrder}
              type="string"
              placeholder="Deliver Date"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={10}>
            <div>
              <label>Remarks</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("remarks", e.target.value)}
              disabled={disabled}
              value={deliveryNote.remarks}
              type="string"
              placeholder="Deliver Date"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={4}>
            <div>
              <label>Delivery By</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("deliveryBy", e.target.value)}
              disabled={disabled}
              value={deliveryNote.deliveryBy}
              type="string"
              placeholder="Deliver Date"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={2}>
            <div>
              <label>Delivery Date</label>
            </div>
            <Input
              disabled={disabled}
              value={deliveryNote.deliveryDate}
              onChange={(e) => handleInforChange("deliveryDate", e.target.value)}
              type="date"
              placeholder="Deliver Date"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
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
export default DeliveryNoteEdit;
