import { React, useState, useEffect } from "react";
import { Row, Col, Select, Button, Table, Input } from 'antd';
import { DeleteOutlined, SaveOutlined  } from "@ant-design/icons";
import '../../styles/Common.css';

const ContractProductList = ({className, productLists, productListSelections, onRemoveProduct, onSelectProduct, onQuantityChange}) => {

    const columns = [
        { 
        title: "Product", 
        dataIndex: "product",
        render : (_, record) => {
            return (
                <Select
                className="w-100"
                placeholder="Select a product"
                onChange={(e) => {if(onSelectProduct) onSelectProduct(record, e)}}
                defaultValue={record.id > 0 ? record.id : null}
                >
                {!productListSelections ? '' : productListSelections.map(e => (
                    <Select.Option key={e.value} value={e.value}>{e.key} </Select.Option>
                ))}
            </Select>
            )
        } 
        },
        { title: "Supplier", dataIndex: "supplier", key: "supplier" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Quantity", 
          render : (_, record) => {
            return (
               <Input placeholder="Quantity" type="number" onChange={(e) => {if(onQuantityChange) onQuantityChange(record, e)}} defaultValue={record.quantity}/>
            )
          }
        },
        { title: "Unit(s)", dataIndex: "uom", key: "uom" },
        { title: "Cost", dataIndex: "cost", key: "cost" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Action(s)", 
          render: (_ , record) => {
            return (
                <DeleteOutlined
                onClick={() => {if(onRemoveProduct) onRemoveProduct(record)}}
                >
                Delete
              </DeleteOutlined>
            )
          }
        },
    ]
    return (
        <Table
        className={className || ''}
        columns={columns}
        dataSource={productLists}
        />
    )
}
export default ContractProductList;