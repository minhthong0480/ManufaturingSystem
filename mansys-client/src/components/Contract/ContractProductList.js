import { React } from "react";
import { Select, Button, Table, Input } from "antd";
import {formatCurrency} from '../../commons/utilities'
import "../../styles/Common.css";

const ContractProductList = ({
  className,
  disabled,
  productLists,
  productListSelections,
  onRemoveProduct,
  onSelectProduct,
  onQuantityChange,
}) => {
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (_, record) => {
        return (
          <Select
            className="w-100"
            placeholder="Select a product"
            disabled={disabled}
            onChange={(e) => {
              if (onSelectProduct) onSelectProduct(record, e);
            }}
            defaultValue={record.productId > 0 ? record.productId : null}
          >
            {!productListSelections
              ? ""
              : productListSelections.map((e) => (
                  <Select.Option key={e.value} value={e.value}>
                    {e.key}{" "}
                  </Select.Option>
                ))}
          </Select>
        );
      },
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      render: (_, record) => {
        return <span>{record.supplier}</span>;
      },
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Quantity",
      render: (_, record) => {
        return (
          <Input
            placeholder="Quantity"
            disabled={disabled}
            type="number"
            onChange={(e) => {
              if (onQuantityChange) onQuantityChange(record, e);
            }}
            defaultValue={record.quantity}
          />
        );
      },
    },
    {
      title: "Unit(s)",
      dataIndex: "uom",
      key: "uom",
      render: (_, record) => {
        return <span>1</span>;
      },
    },
    { title: "Cost",
     dataIndex: "cost",
     render: (_, record) => {
      return (
        <span>
          { formatCurrency(record.cost)}
        </span>
      )
     } },
    { title: "Price",
     dataIndex: "price",
     render: (_, record) => {
      return (
        <span>
          { formatCurrency(record.price)}
        </span>
      )
     }
    },
    {
      title: "Action(s)",
      render: (_, record) => {
        return (
          <Button
            disabled={disabled}
            type="text"
            style={
              disabled
                ? {
                    color: "grey",
                  }
                : {
                    color: "red",
                  }
            }
            onClick={() => {
              if (onRemoveProduct) onRemoveProduct(record);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <Table
      className={className || ""}
      columns={columns}
      dataSource={productLists}
    />
  );
};
export default ContractProductList;
