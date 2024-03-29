import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Space, Table } from "antd";
import "../../styles//CustomerTable.css";
import Search from "antd/es/input/Search";
import CustomerModal from "./CustomerModal";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  saveCustomer,
} from "../../actions/customer.js";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const CustomerTable = () => {
  const [bottom, setBottom] = useState("bottomLeft");
  const [dataSource, setDataSource] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const fetchAllCustomer = async () => {
    const { data } = await getAllCustomer();
    setDataSource(data.sort((a, b) => a.id - b.id).filter((c) => c.isActive));
  };

  useEffect(() => {
    fetchAllCustomer();
  }, [deleteID]);

  const [count, setCount] = useState(2);
  const [editCustomer, setEditCustomer] = useState(true);

  const handleDelete = async (key) => {
    const { data } = await deleteCustomer(key.id);
    setDeleteID(data?.id);
  };
  const handleAdd = async (form) => {
    try {
      const { data } = await createCustomer(form);
      toast.success("Customer added");
      setDataSource([...dataSource, data]);
    } catch (error) {
      toast.error("Fail to create new Customer");
    }
  };
  const handleSave = async (form) => {
    console.log(form);
    try {
      const { data } = await saveCustomer(editCustomer.id, form);
      toast.success("Customer added");
      setDataSource(
        dataSource.map((customer) =>
          customer.id === editCustomer.id ? data : customer
        )
      );
    } catch (error) {
      toast.error("Fail to create new Customer");
    }
  };

  const defaultColumns = [
    {
      title: "Customer ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Tax Number",
      dataIndex: "taxNumber",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                setEditCustomer(record);
                showModal();
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <DeleteOutlined
                style={{ marginLeft: "10px", fontSize: "20px" }}
              />
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const onSearch = (value) => {
    if (!value) {
      fetchAllCustomer();
    } else {
      setDataSource(dataSource.filter((data) => data.name.includes(value)));
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Search
          placeholder="Search name"
          onSearch={onSearch}
          enterButton
          style={{ width: 304 }}
        />
        <Button
          classname="create-button"
          onClick={() => {
            showModal();
            setEditCustomer(null);
          }}
          type="primary"
          style={{ width: "200px" }}
        >
          Add a new customer
        </Button>
      </div>

      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: [bottom] }}
      />
      <CustomerModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleAdd={handleAdd}
        handleSave={handleSave}
        editCustomer={editCustomer}
      />
    </div>
  );
};
export default CustomerTable;
