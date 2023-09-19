import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency } from '../../commons/utilities'
import { Row, Col, Select, DatePicker, Button, Input, Steps, Tabs } from "antd";
import { InventoryService } from "../../services/inventory-service";

const DeliveryNoteItems = ({
  disabled,
  deliveryNoteItems,
  productListSelections,
  onRemoveItem,
  onSelectProduct,
  onQuantityChange,
  onRemarkChange,
  onUnitPriceChange
}) => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    searchText: "",
    data: [],
    totalRows: 0,
    page: 1,
    pageSize: 10,
    isActive: true,
  });

  useEffect(() => {
    triggerFilter(filter.page, filter.pageSize, filter.searchText);
  }, []);

  const triggerFilter = async (page, pageSize, term) => {
    const filterResult = await InventoryService.filter(page, pageSize, term);
    if (filterResult.code >= 400) {
      showErrorMessage('An error is occurred while searching, please try again!')
      return
    }
    console.log(filterResult)
    setFilter({ ...filter, totalRows: filterResult.data.totalRows, data: [...filterResult.data.data] })
  }

  const pageChange = (page) => {
    setFilter({ ...filter, page });
    triggerFilter(page, filter.pageSize, filter.searchText);
  };

  const pageSizeChange = (pageSize) => {
    setFilter({ ...filter, pageSize });
    triggerFilter(filter.page, pageSize, filter.searchText);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (_, record) => {
        return (
          <div>
            <Select
              className="w-100"
              placeholder="Select a product"
              disabled={disabled}
              onChange={(e) => {
                if (onSelectProduct) onSelectProduct(record, e);
              }}
              value={record.productId > 0 ? record.productId : null}
            >
              {!productListSelections
                ? ""
                : productListSelections.map((e) => (
                  <Select.Option key={e.value} value={e.value}>
                    {e.key}{" "}
                  </Select.Option>
                ))}

            </Select>
            {record.errors && (
              <span className="error">{record.errors.productId}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Remarks",
      render: (_, record) => {
        return (
          <div>
            <Input
              placeholder="Remarks"
              disabled={disabled}
              type="text"
              onChange={(e) => {
                if (onRemarkChange) onRemarkChange(record, e);
              }}
              value={record.remarks}
            />
            {record.errors && (
              <span className="error">{record.errors.remarks}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Quantity",
      render: (_, record) => {
        return (
          <div>
            <Input
              placeholder="Quantity"
              disabled={disabled}
              type="number"
              onChange={(e) => {
                if (onQuantityChange) onQuantityChange(record, e);
              }}
              value={record.quantity}
            />
            {record.errors && (
              <span className="error">{record.errors.quantity}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Unit Price",
      render: (_, record) => {
        return (
          <div>
            <Input
              placeholder="Unit Price"
              disabled={disabled}
              type="number"
              onChange={(e) => {
                if (onUnitPriceChange) onUnitPriceChange(record, e);
              }}
              value={record.unitPrice}
            />
            {record.errors && (
              <span className="error">{record.errors.unitPrice}</span>
            )}
          </div>
        );
      },
    },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="contract-list-actions--flex">
          <DeleteOutlined
            disabled={disabled}
            onClick={() => onRemoveItem(record)}
            style={disabled ? { marginLeft: "10px", fontSize: "20px", color: "#d9d9d9" } : { marginLeft: "10px", fontSize: "20px", color: "red" }}
          >
            Delete
          </DeleteOutlined>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <h1>Quan li Inventory</h1>

      <PaginatedTable
        columns={columns}
        pageSize={filter.pageSize}
        totalRows={filter.totalRows}
        data={deliveryNoteItems}
        pageChange={pageChange}
        pageSizeChange={pageSizeChange}
      />
    </Fragment>
  );
};

export default DeliveryNoteItems;
