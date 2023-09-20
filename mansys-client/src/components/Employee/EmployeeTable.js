import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Space, Table } from "antd";
import { showErrorMessage, formatCurrency, showSuccessMessage } from '../../commons/utilities'
import { LOCAL_STORAGE_USER, USER_ROLE_ADMIN } from "../../commons/enum"
import "../../styles//EmployeeTable.css";
import Search from "antd/es/input/Search";
import EmployeeModal from "./EmployeeModal";
import {
  createUser,
  deleteUser,
  getAllUser,
  saveUser,
} from "../../actions/user";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
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

const EmployeeTable = () => {
  const [bottom, setBottom] = useState("bottomLeft");
  const [dataSource, setDataSource] = useState([]);
  const [deleteID, setDeleteID] = useState();

  const fetchAllUser = async () => {
    const { data } = await getAllUser();
    setDataSource(data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    fetchAllUser();
  }, [deleteID]);

  const user = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_USER));
  const [count, setCount] = useState(2);
  const [editEmployee, setEditEmployee] = useState(true);
  const handleDelete = async (key) => {
    const { data } = await deleteUser(key.id);
    setDeleteID(key.id);
  };
  const handleAdd = async (form) => {
    try {
      const { data, status } = await createUser(form);

      if (status === 201) {
        toast.success("Customer added");
        setDataSource([...dataSource, data]);
      }
    } catch (error) {
      toast.error("Fail to create new Customer");
    }
  };
  const handleSave = async (form) => {
    try {
      const { data, status } = await saveUser(editEmployee.id, form);
      if (status === 200) {
        toast.success("Customer added");
        setDataSource(
          dataSource.map((customer) =>
            customer.id === editEmployee.id ? data : customer
          )
        );
      }
    } catch (error) {
      toast.error("Fail to create new Customer");
    }
  };

  const defaultColumns = [
    {
      title: "Employee ID",
      dataIndex: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
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
      title: "Role",
      dataIndex: "roles",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        user.roles.includes(USER_ROLE_ADMIN) &&
          dataSource.length >= 1 ? (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                setEditEmployee(record);
                showModal();
              }}
            >
              Edit
            </Button>
            {
              (record.username == 'admin') ? <span></span>
                :
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record)}
                >
                  <DeleteOutlined
                    style={{ marginLeft: "10px", fontSize: "20px" }}
                  />
                </Popconfirm>
            }
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
      fetchAllUser();
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
      <div className="button-container">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          style={{ width: 304 }}
        />
        <Button
          classname="create-button"
          onClick={() => {
            showModal();
            setEditEmployee(null);
          }}
          type="primary"
          style={{ width: "200px" }}
        >
          Add a new employee
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
      <EmployeeModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleAdd={handleAdd}
        handleSave={handleSave}
        editEmployee={editEmployee}
      />
    </div>
  );
};
export default EmployeeTable;
