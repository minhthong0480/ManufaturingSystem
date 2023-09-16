import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Button, Row, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "../../styles/Contract.css";
import "../../styles/PaginatedTable.css";
import { ContractService } from "../../services/contract-service";
import { PaginatedTable } from '../Commons/PaginatedTable'
import { showErrorMessage, formatCurrency } from '../../commons/utilities'
const Inventory = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <h1>Iventory</h1>

    </Fragment>
  );
};

export default Inventory;
