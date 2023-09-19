import { Descriptions, Modal, List, Typography } from "antd";
import { React, useState, useEffect, Fragment } from "react";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import moment, { now } from "moment";
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
import { createDeliveryNote } from "../../actions/delivery-note";
import {
    showErrorMessage,
    showSuccessMessage,
    formatCurrency,
} from "../../commons/utilities";
import { useNavigate, useParams } from "react-router-dom";
import { DeliveryNoteService } from "../../services/delivery-note-service"
import DeliveryNoteItems from "./DeliveryNoteItems";
import { LOCAL_STORAGE_USER, USER_ROLE_ADMIN } from "../../commons/enum"

const DeliveryNoteCreate = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(false);
    const [deliveryNote, setDeliveryNote] = useState({
        id: null,
        customerId: null,
        deliveryDate: new Date().toISOString().substring(0,10),
        salesOrder: null,
        deliveryBy: null,
        remarks: null,
        approval: false,
        deliveryNoteItems: [],
    });
    const [billList, setBillList] = useState([]);
    const [deliverNoteError, setDeliveryNoteError] = useState([]);
    const [productSelections, setProductSelections] = useState([]);

    const loadData = async () => {
        const getDeliveryNote = await DeliveryNoteService.get();
        if (getDeliveryNote.isSuccess && getDeliveryNote.data && getDeliveryNote.data.data) {
            const deliveryNote = getDeliveryNote.data.data;
            setDeliveryNote(deliveryNote);
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
            customerId: null,
            deliveryDate: null,
            salesOrder: null,
            deliveryBy: null,
            remarks: null,
            deliveryNoteItems: [],
        };

        data.customerId = Number.parseInt(deliveryNote.customerId);
        data.salesOrder = deliveryNote.salesOrder;
        data.deliveryDate = deliveryNote.deliveryDate;
        data.deliveryBy = deliveryNote.deliveryBy;
        data.remarks = deliveryNote.remarks;
        data.deliveryNoteItems = deliveryNote.deliveryNoteItems;

        const errors = handleEditValidation(data);
        if (Object.keys(errors).length > 0) {
            return;
        }

        dispatch(createDeliveryNote(data, navigate));
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

    const handleEditValidation = (data) => {
        const errors = {};
        if (!data.customerId)
            errors.customerId = "Please fill out Customer ID";

        if (!data.deliveryDate)
            errors.deliveryDate = "Please fill out Delivery Date";

        if (!data.deliveryBy)
            errors.deliveryBy = "Please fill out Delivery By";

        if (!data.remarks)
            errors.remarks = "Please fill out Remarks";

        if (!data.salesOrder)
            errors.salesOrder = "Please fill out Sale Orders";

        if (data.deliveryNoteItems) {
            data.deliveryNoteItems.forEach(item => handleEditItemValidation(errors, item))
        }

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

    const handleAddItem = (e) => {
        let nextId = deliveryNote.deliveryNoteItems.length + 1;
        nextId = nextId == 0 ? -1 : -nextId;
        const nextItem = { id: nextId, quantity: 0, unitPrice: 0, remarks: "", totalPrice: 0};
        setDeliveryNote({ ...deliveryNote, deliveryNoteItems: [...deliveryNote.deliveryNoteItems, nextItem] });
    };

    const onRemoveItem = function (item) {
        if (disabled) return;
        const index = deliveryNote.deliveryNoteItems.findIndex((e) => e.id == item.id);
        const newItems = [
            ...deliveryNote.deliveryNoteItems.slice(0, index),
            ...deliveryNote.deliveryNoteItems.slice(index + 1),
        ];

        setDeliveryNote({ ...deliveryNote, deliveryNoteItems: newItems });
    };

    const handleOnSelectProduct = (item, value) => {
        const isSelectedExistedProduct = deliveryNote.deliveryNoteItems.findIndex(
            (e) => e.productId == value
        );
        if (isSelectedExistedProduct >= 0) {
            showErrorMessage(
                "The selected product is already in the product list, please choose another product!"
            );
            return;
        }
        const index = deliveryNote.deliveryNoteItems.findIndex((e) => e.id == item.id);
        const editedItem = {
            ...item,
            productId: value,
        };
        const newItems = [
            ...deliveryNote.deliveryNoteItems.slice(0, index),
            editedItem,
            ...deliveryNote.deliveryNoteItems.slice(index + 1),
        ];

        setDeliveryNote({ ...deliveryNote, deliveryNoteItems: newItems });
    };

    const handleOnQuantityChange = (item, e) => {
        const index = deliveryNote.deliveryNoteItems.findIndex((e) => e.id == item.id);
        const editedItem = {
            ...item,
            quantity: Number.parseInt(e.target.value),
            totalPrice: Number.parseInt(e.target.value) * Number.parseInt(item.unitPrice)
        };
        const newItems = [
            ...deliveryNote.deliveryNoteItems.slice(0, index),
            editedItem,
            ...deliveryNote.deliveryNoteItems.slice(index + 1),
        ];

        setDeliveryNote({ ...deliveryNote, deliveryNoteItems: newItems });
    };

    const onUnitPriceChange = (item, e) => {
        const index = deliveryNote.deliveryNoteItems.findIndex((e) => e.id == item.id);
        const editedItem = {
            ...item,
            unitPrice: Number.parseInt(e.target.value),
            totalPrice: Number.parseInt(e.target.value) * Number.parseInt(item.quantity)
        };
        const newItems = [
            ...deliveryNote.deliveryNoteItems.slice(0, index),
            editedItem,
            ...deliveryNote.deliveryNoteItems.slice(index + 1),
        ];

        setDeliveryNote({ ...deliveryNote, deliveryNoteItems: newItems });
    };

    const handleOnRemarkChange = (item, e) => {
        const index = deliveryNote.deliveryNoteItems.findIndex((e) => e.id == item.id);
        const editedItem = {
            ...item,
            remarks: e.target.value,
        };
        const newItems = [
            ...deliveryNote.deliveryNoteItems.slice(0, index),
            editedItem,
            ...deliveryNote.deliveryNoteItems.slice(index + 1),
        ];

        setDeliveryNote({ ...deliveryNote, deliveryNoteItems: newItems });
    };

    const handleApproval = () => {
        const user = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_USER));
        if (user.roles.includes(USER_ROLE_ADMIN)) {
            doApprove()
        }
    }

    const doApprove = async () => {
        const approveRequest = await DeliveryNoteService.approve(deliveryNote.id);
        if (approveRequest.isSuccess) window.location.reload()
    }

    return (
        <Fragment>
            <div className="main-content-container">
                <h1 className="m-top--1rem">
                    Tạo Delivery Note
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
                            placeholder="AutoID"
                        />
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
                        {deliverNoteError.customerId && (
                            <span className="error">{deliverNoteError.customerId}</span>
                        )}
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
                            placeholder="Sale Orders"
                        />
                        {deliverNoteError.salesOrder && (
                            <span className="error">{deliverNoteError.salesOrder}</span>
                        )}
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
                            placeholder="Remarks"
                        />
                        {deliverNoteError.remarks && (
                            <span className="error">{deliverNoteError.remarks}</span>
                        )}
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
                            placeholder="Deliver By"
                        />
                        {deliverNoteError.deliveryBy && (
                            <span className="error">{deliverNoteError.deliveryBy}</span>
                        )}
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
                        {deliverNoteError.deliveryDate && (
                            <span className="error">{deliverNoteError.deliveryDate}</span>
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
                <DeliveryNoteItems
                    className="m-top--1rem"
                    disabled={disabled}
                    deliveryNoteItems={deliveryNote.deliveryNoteItems}
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
export default DeliveryNoteCreate;
