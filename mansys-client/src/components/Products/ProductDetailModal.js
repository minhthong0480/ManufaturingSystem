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
import { updateProduct } from "../../actions/products";
import ProducMaterial from "./ProductMaterial"
import {
  showErrorMessage,
  showSuccessMessage,
  formatCurrency,
} from "../../commons/utilities";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const { Text } = Typography;
  const { isModalOpen, record, setIsModalDetailOpen, dataCategory, onSuccessSave } = props;

  const [disabled, setDisabled] = useState(true);
  const [product, setProduct] = useState({
    name: record.name,
    price: record.price,
    cost: record.cost,
    description: record.description,
    category_id: record.category_id,
    category: record.category,
    supplier_id: record.supplier_id,
    supplier: record.supplier,
  });
  const [supplierSelections, setSupplierSelections] = useState([]);
  const [billList, setBillList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  useEffect(() => {
    setProduct({
      id: record.id,
      name: record.name,
      price: record.price,
      cost: record.cost,
      description: record.description,
      category_id: record.category_id,
      category: record.category,
      supplier_id: record.supplier_id,
      supplier: record.supplier,
    });

    const loadData = async () => {
      const allSupplers = await SupplierService.getAll();
      if (allSupplers.isSuccess && allSupplers.data && allSupplers.data.data) {
        const mappedSuppliers = allSupplers.data.data.map((e) => ({
          key: e.name,
          value: e.id,
        }));
        setSupplierSelections(mappedSuppliers);
      }

      if (record.id) {
        const allBills = await ProductsService.getProductBill(record.id);
        if (allBills.isSuccess && allBills.data) {
          const mapped = allBills.data.data.map(bill => {
            const material = bill.material;
            delete bill.material
            return {
              ...bill,
              name: material.name,
              brand: material.brand,
              cost: material.cost
            }
          })
          setBillList(mapped);
          console.log(mapped)
        }
      }

      const allMaterial = await MaterialService.getAll();
      if (allMaterial.isSuccess && allMaterial.data) {
        const mapped = allMaterial.data.map((e) => ({
          key: e.name,
          value: e.id,
          brand: e.brand,
          cost: e.cost
        }));
        setMaterialList(mapped);
      }
    };
    loadData();
  }, [record]);

  const handleChangeCategory = (category_id) => {
    setProduct({
      ...product,
      category_id: category_id,
    });
  };

  const handleChangeSupplier = (supplier_id) => {
    setProduct({
      ...product,
      supplier_id: supplier_id,
      supplier: supplierSelections.find((e) => e.value == supplier_id).key,
    });
  };

  const handleOnSelectMaterial = (material, value) => {
    const isSelectedExistedMaterial = billList.findIndex(
      (e) => e.material_id == value
    );
    if (isSelectedExistedMaterial >= 0) {
      showErrorMessage(
        "The selected product is already in the product list, please choose another product!"
      );
      return;
    }
    const index = billList.findIndex((e) => e.id == material.id);
    const selectedMaterial = materialList.find((e) => e.value == value);
    const editedMaterial = {
      ...material,
      material_id: selectedMaterial.value,
      brand: selectedMaterial.brand,
      cost: selectedMaterial.cost,
    };

    const newProducts = [
      ...billList.slice(0, index),
      editedMaterial,
      ...billList.slice(index + 1),
    ];
    setBillList(newProducts);

    let total = 0;
    for (var p = 0; p < newProducts.length; p++) {
      const price = Number.parseInt(newProducts[p].cost);
      const quantity = Number.parseInt(newProducts[p].quantity);
      total += price * quantity;
    }
    setProduct({ ...product, cost: total })
  };

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
    setProduct({ ...product, cost: total })
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
    setProduct({ ...product, cost: total })
  };

  const handleAddMaterial = (e) => {
    let nextId = billList.length + 1;
    nextId = nextId == 0 ? -1 : -nextId;
    const nextBill = { id: nextId, quantity: 0 };
    setBillList([...billList, nextBill])
    // document.getElementById("saveBtn").scrollIntoView({ behavior: "smooth" });
  };

  const handleInforChange = (name, e) => {
    const productData = { ...product };
    productData[name] = e.target.value;
    setProduct(productData);
  };

  const handleOk = () => {
    setIsModalDetailOpen(false);
  };

  const handleSave = () => {
    const update = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      cost: product.cost,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      materials: billList
    };
    setDisabled(!disabled);
    dispatch(updateProduct(update, onSuccessSave));
    onSuccessSave(update)
  };

  const handleCancel = () => {
    setIsModalDetailOpen(false);
  };

  function handleEditClick() {
    if (!disabled) {
      resetData();
    } else setDisabled(!disabled);
  }

  function resetData() {
    // TODO
    setDisabled(!disabled);
  }

  return (
    <Modal
      title="Thông tin chi tiết sản phẩm"
      width="60vw"
      open={isModalOpen}
      onOk={disabled ? handleOk : handleSave}
      okText={disabled ? "Ok" : "Save"}
      onCancel={handleCancel}
      closeIcon={false}
    >
      <div className="text-align-right">
        <Button type="primary" onClick={handleEditClick}>
          {disabled ? "Chỉnh sửa" : "Huỷ chỉnh sửa"}
        </Button>
      </div>
      <div className="main-content-container m-top--3rem">
        <Row gutter={16} className="m-top--1rem">
          <Col span={2}>
            <div>
              <label>Id</label>
            </div>
            <Input
              disabled={true}
              value={product.id}
              type="string"
              placeholder="Product Id"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
          <Col span={11}>
            <div>
              <label>Cost</label>
            </div>
            <Input
              onChange={(e) => {
                handleInforChange("cost", e);
              }}
              disabled={true}
              value={disabled ? formatCurrency(product.cost) : product.cost}
              type="string"
              placeholder="Contract Total"
            />
          </Col>
          <Col span={11}>
            <div>
              <label>Price</label>
            </div>
            <Input
              onChange={(e) => {
                handleInforChange("price", e);
              }}
              disabled={disabled}
              value={disabled ? formatCurrency(product.price) : product.price}
              type="text"
              placeholder="Contract Total"
            />
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={24}>
            <div>
              <label>Name</label>
              {/* <span className="input--required">(*)</span> */}
            </div>
            <Input
              onChange={(e) => {
                handleInforChange("name", e);
              }}
              disabled={disabled}
              value={product.name}
              type="string"
              placeholder="Product Name"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={24}>
            <div>
              <label>Description</label>
              {/* <span className="input--required">(*)</span> */}
            </div>
            <Input.TextArea
              onChange={(e) => {
                handleInforChange("description", e);
              }}
              rows={4}
              disabled={disabled}
              defaultValue={record.description}
              type="text"
              placeholder="Product Name"
            />
            {/* {editContractErrors.contractNumber && (
              <span className="error">{editContractErrors.contractNumber}</span>
            )} */}
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={12}>
            <div>
              <label>Category</label>
            </div>
            <FilterableSelect
              onChange={(e) => {
                handleChangeCategory(e);
              }}
              disabled={disabled}
              defaultOptions={dataCategory}
              value={product.category_id}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
          <Col span={12}>
            <div>
              <label>Supllier</label>
            </div>
            <FilterableSelect
              onChange={(e) => {
                handleChangeSupplier(e);
              }}
              disabled={disabled}
              defaultOptions={supplierSelections}
              value={product.supplier_id}
              className="w-100"
              placeholder="Select an option"
            />
          </Col>
        </Row>
        <Row gutter={16} className="m-top--1rem">
          <Col span={24}>
            <div className="m-top--2rem">
              <h4 variant="h4" className="m-top--1rem">
                Danh sách Material
              </h4>
            </div>
            <div className="text-align-right">
              <Button type="primary" onClick={handleAddMaterial} disabled={disabled}>
                <PlusOutlined />
                Add Material
              </Button>
            </div>
          </Col>
        </Row>

        <Row gutter={16} className="m-top--1rem">
          <Col span={24}>
            <ProducMaterial
              billList={billList}
              materialList={materialList}
              handleOnSelectMaterial={handleOnSelectMaterial}
              handleOnQuantityChange={handleOnQuantityChange}
              handleOnRemoveMaterial={handleOnRemoveMaterial}
              disabled={disabled}
            ></ProducMaterial>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default ProductDetail;
