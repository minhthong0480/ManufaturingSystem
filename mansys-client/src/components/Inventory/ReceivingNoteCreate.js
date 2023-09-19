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
import { SupplierService } from "../../services/supplier-service";
import { useDispatch } from "react-redux";
import { createReceivingNote } from "../../actions/receiving-note";
import {
  showErrorMessage,
  showSuccessMessage,
  formatCurrency,
} from "../../commons/utilities";
import { useNavigate, useParams } from "react-router-dom";
import { ReceivingNoteService } from "../../services/receiving-note-service"
import { ProductsService } from "../../services/products-service";
import ReceivingNoteItems from "./ReceivingNoteItems";
import { LOCAL_STORAGE_USER, USER_ROLE_ADMIN } from "../../commons/enum"

const ReceivingNoteCreate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [receivingNote, setReceivingNote] = useState({
    id: null,
    supplierId: null,
    receiptDate: new Date().toISOString().substring(0, 10),
    purchaseOrder: null,
    receivedBy: null,
    remarks: null,
    approval: false,
    receivingNoteItems: [],
  });
  const [receivingNoteError, setReceivingNoteError] = useState([]);
  const [productSelections, setProductSelections] = useState([]);
  const [supplierSelections, setSupplierSelections] = useState([]);

  const loadData = async () => {
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

    const getAllSupplier = await SupplierService.getAll();
    if (getAllSupplier.status == 200 && getAllSupplier.data) {
      const mappedData = getAllSupplier.data.data.map((e) => ({
        key: e.name,
        value: e.id,
      }));
      setSupplierSelections(mappedData);
    } else {
      showErrorMessage("An error is occurred while loading suppliers!");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const onSaveReceivingNote = () => {
    const data = {
      supplierId: null,
      receiptDate: null,
      purchaseOrder: null,
      receivedBy: null,
      remarks: null,
      receivingNoteItems: [],
    };

    data.supplierId = receivingNote.supplierId;
    data.purchaseOrder = receivingNote.purchaseOrder;
    data.receiptDate = receivingNote.receiptDate;
    data.receivedBy = receivingNote.receivedBy;
    data.remarks = receivingNote.remarks;
    data.receivingNoteItems = receivingNote.receivingNoteItems;

    const errors = handleEditValidation(data);
    if (Object.keys(errors).length > 0) {
      return;
    }

    dispatch(createReceivingNote(data, navigate));
  };

  const handleInforChange = (name, e) => {
    const data = { ...receivingNote };
    data[name] = e;
    setReceivingNote(data);
  };

  const handleEditValidation = (data) => {
    const errors = {};

    if (!data.supplierId)
      errors.supplierId = "Please fill out Supplier ID";

    if (!data.receiptDate)
      errors.receiptDate = "Please fill out Receipt Date";

    if (!data.receivedBy)
      errors.receivedBy = "Please fill out Received By";

    if (!data.remarks)
      errors.remarks = "Please fill out Remarks";

    if (!data.purchaseOrder)
      errors.purchaseOrder = "Please fill out Purchase Orders";

    if (data.receivingNoteItems) {
      data.receivingNoteItems.forEach(item => handleEditItemValidation(errors, item))
    }

    setReceivingNoteError(errors);
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

  const handleAddItem = (e) => {
    let nextId = receivingNote.receivingNoteItems.length + 1;
    nextId = nextId == 0 ? -1 : -nextId;
    const nextItem = { id: nextId, quantity: 0, unitPrice: 0, remarks: "", totalPrice: 0, receivingNoteId: Number.parseInt(receivingNote.id) };
    setReceivingNote({ ...receivingNote, receivingNoteItems: [...receivingNote.receivingNoteItems, nextItem] });
  };

  const onRemoveItem = function (item) {
    if (disabled) return;
    const index = receivingNote.receivingNoteItems.findIndex((e) => e.id == item.id);
    const newItems = [
      ...receivingNote.receivingNoteItems.slice(0, index),
      ...receivingNote.receivingNoteItems.slice(index + 1),
    ];

    setReceivingNote({ ...receivingNote, receivingNoteItems: newItems });
  };

  const handleOnSelectProduct = (item, value) => {
    const isSelectedExistedProduct = receivingNote.receivingNoteItems.findIndex(
      (e) => e.productId == value
    );
    if (isSelectedExistedProduct >= 0) {
      showErrorMessage(
        "The selected product is already in the product list, please choose another product!"
      );
      return;
    }
    const index = receivingNote.receivingNoteItems.findIndex((e) => e.id == item.id);
    const editedItem = {
      ...item,
      productId: value,
    };
    const newItems = [
      ...receivingNote.receivingNoteItems.slice(0, index),
      editedItem,
      ...receivingNote.receivingNoteItems.slice(index + 1),
    ];

    setReceivingNote({ ...receivingNote, receivingNoteItems: newItems });
  };

  const handleOnQuantityChange = (item, e) => {
    const index = receivingNote.receivingNoteItems.findIndex((e) => e.id == item.id);
    const editedItem = {
      ...item,
      quantity: Number.parseInt(e.target.value),
      totalPrice: Number.parseInt(e.target.value) * Number.parseInt(item.unitPrice)
    };
    const newItems = [
      ...receivingNote.receivingNoteItems.slice(0, index),
      editedItem,
      ...receivingNote.receivingNoteItems.slice(index + 1),
    ];

    setReceivingNote({ ...receivingNote, receivingNoteItems: newItems });
  };

  const onUnitPriceChange = (item, e) => {
    const index = receivingNote.receivingNoteItems.findIndex((e) => e.id == item.id);
    const editedItem = {
      ...item,
      unitPrice: Number.parseInt(e.target.value),
      totalPrice: Number.parseInt(e.target.value) * Number.parseInt(item.quantity)
    };
    const newItems = [
      ...receivingNote.receivingNoteItems.slice(0, index),
      editedItem,
      ...receivingNote.receivingNoteItems.slice(index + 1),
    ];

    setReceivingNote({ ...receivingNote, receivingNoteItems: newItems });
  };

  const handleOnRemarkChange = (item, e) => {
    const index = receivingNote.receivingNoteItems.findIndex((e) => e.id == item.id);
    const editedItem = {
      ...item,
      remarks: e.target.value,
    };
    const newItems = [
      ...receivingNote.receivingNoteItems.slice(0, index),
      editedItem,
      ...receivingNote.receivingNoteItems.slice(index + 1),
    ];

    setReceivingNote({ ...receivingNote, receivingNoteItems: newItems });
  };

  const handleApproval = () => {
    const user = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_USER));
    if (user.roles.includes(USER_ROLE_ADMIN)) {
      doApprove()
    }
  }

  const doApprove = async () => {
    const approveRequest = await ReceivingNoteService.approve(receivingNote.id);
    if (approveRequest.isSuccess) window.location.reload()
  }

  return (
    <Fragment>
      <div className="main-content-container">
        <h1 className="m-top--1rem">
            Create Receiving Note
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
              value={receivingNote.id}
              type="string"
              placeholder="delivery note id"
            />
          </Col>
          <Col span={4}>
            <div>
              <label>Supplier ID</label>
            </div>
            <Select
              className="w-100"
              placeholder="Select a Supplier"
              disabled={disabled}
              onSelect={(e) => handleInforChange("supplierId", e)}
              value={receivingNote.supplierId > 0 ? receivingNote.supplierId : null}
            >
              {!supplierSelections
                ? ""
                : supplierSelections.map((e) => (
                  <Select.Option key={e.value} value={e.value}>
                    {e.key}{" "}
                  </Select.Option>
                ))}

            </Select>
            {receivingNoteError.supplierId && (
              <span className="error">{receivingNoteError.supplierId}</span>
            )}
          </Col>
          <Col span={2}>
            <div>
              <label>Purchase Orders</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("purchaseOrder", e.target.value)}
              disabled={disabled}
              value={receivingNote.purchaseOrder}
              type="string"
              placeholder="Purchase Order"
            />
            {receivingNoteError.purchaseOrder && (
              <span className="error">{receivingNoteError.purchaseOrder}</span>
            )}
          </Col>
          <Col span={10}>
            <div>
              <label>Remarks</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("remarks", e.target.value)}
              disabled={disabled}
              value={receivingNote.remarks}
              type="string"
              placeholder="Remarks"
            />
            {receivingNoteError.remarks && (
              <span className="error">{receivingNoteError.remarks}</span>
            )}
          </Col>
          <Col span={4}>
            <div>
              <label>Reveived By</label>
            </div>
            <Input
              onChange={(e) => handleInforChange("receivedBy", e.target.value)}
              disabled={disabled}
              value={receivingNote.receivedBy}
              type="string"
              placeholder="Reveived By"
            />
            {receivingNoteError.receivedBy && (
              <span className="error">{receivingNoteError.receivedBy}</span>
            )}
          </Col>
          <Col span={2}>
            <div>
              <label>Receipt Date</label>
            </div>
            <Input
              disabled={disabled}
              value={receivingNote.receiptDate}
              onChange={(e) => handleInforChange("receiptDate", e.target.value)}
              type="date"
              placeholder="Receipt Date"
            />
            {receivingNoteError.receiptDate && (
              <span className="error">{receivingNoteError.receiptDate}</span>
            )}
          </Col>

        </Row>

      </div>
      <div className="main-content-container m-top--2rem">
        <div className="text-align-right">
          <Button type="primary" onClick={handleAddItem} disabled={disabled}>
            <PlusOutlined />
            Add Items
          </Button>
        </div>
        <ReceivingNoteItems
          className="m-top--1rem"
          disabled={disabled}
          deliveryNoteItems={receivingNote.receivingNoteItems}
          productListSelections={productSelections}
          onRemoveItem={onRemoveItem}
          onSelectProduct={handleOnSelectProduct}
          onQuantityChange={handleOnQuantityChange}
          onRemarkChange={handleOnRemarkChange}
          onUnitPriceChange={onUnitPriceChange}
        />
      </div>
      <div className="m-top--2rem">
        <div className="main-content-container text-align-right">
          <Button
            id="saveBtn"
            type="primary"
            onClick={onSaveReceivingNote}
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
export default ReceivingNoteCreate;
