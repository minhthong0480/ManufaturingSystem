import { React } from "react";
import { Select, Button, Table, Input } from "antd";
import { formatCurrency } from '../../commons/utilities'
import "../../styles/Common.css";

const ProducMaterial = ({
  className,
  disabled,
  billList,
  materialList,
  productListSelections,
  onRemoveProduct,
  handleOnSelectMaterial,
  handleOnQuantityChange,
  handleOnRemoveMaterial
}) => {
  const columns = [
    {
      title: "Material",
      dataIndex: "material",
      render: (_, record) => {
        return (
          <Select
            className="w-100"
            placeholder="Select a material"
            disabled={disabled}
            onChange={(e) => {
              console.log(e)
              if (handleOnSelectMaterial) handleOnSelectMaterial(record, e);
            }}
            defaultValue={record.material_id > 0 ? record.material_id : null}
          >
            {!materialList
              ? ""
              : materialList.map((e) => (
                <Select.Option key={e.value} value={e.value}>
                  {e.key}{" "}
                </Select.Option>
              ))}
          </Select>
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (_, record) => {
        return (
          <span>
            {record.brand}
          </span>
        );
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
      render: (_, record) => {
        return (
          <span>
            {record.cost}
          </span>
        );
      },
    },
    {
      title: "Quantity",
      render: (_, record) => {
        return (
          <Input
            placeholder="Quantity"
            disabled={disabled}
            type="number"
            onChange={(e) => {
              if (handleOnQuantityChange) handleOnQuantityChange(record, e);
            }}
            defaultValue={record.quantity}
          />
        );
      },
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
              if (handleOnRemoveMaterial) handleOnRemoveMaterial(record);
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
      dataSource={billList}
    />
  );
};
export default ProducMaterial;
