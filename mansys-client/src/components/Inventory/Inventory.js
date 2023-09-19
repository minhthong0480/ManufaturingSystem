import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { ContractService } from "../../services/contract-service";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency } from '../../commons/utilities'
import { Row, Col, Select, DatePicker, Button, Input, Steps, Tabs } from "antd";
import InventoryList from './InventoryList';
import DeliveryNote from "./DeliveryNote";
import ReceivingNote from "./ReceivingNote";

const Inventory = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: '1',
      label: 'Inventory',
      children: <InventoryList></InventoryList>,
    },
    {
      key: '2',
      label: 'Receiving Note',
      children: <ReceivingNote></ReceivingNote>,
    },
    {
      key: '3',
      label: 'Delivery Note',
      children: <DeliveryNote></DeliveryNote>,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Fragment>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Fragment>
  );
};

export default Inventory;
