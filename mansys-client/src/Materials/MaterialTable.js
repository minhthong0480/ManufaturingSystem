//create a material table similar to contract table

import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Button, Row, Input } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import "../styles/PaginatedTable.css"
import { deactivateContract } from "../actions/contract";
import { ContractService } from "../services/contract-service";
import { PaginatedTable } from '../components/Commons/PaginatedTable';

const Material = () => {
  const dispatcher = useDispatch();
  const [material, setMaterial] = useState([]);
  const [filter, setFilter] = useState({
    searchText: '',
    data : [],
    totalRows : 0,
    page: 1,
    pageSize: 10
  })
}

const keySearch = () => {
  if(window.materialSearchTimer){
    window.clearTimeout(window.materialSearchTimer)
  }
}

export default Material;