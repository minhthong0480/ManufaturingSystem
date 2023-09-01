import Layout from "antd/es/layout/layout";
import { Button, Form, Input, Select, Col, Modal } from "antd";
import { getAllProducts } from "../actions/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MyTable from "./MyTable/MyTable";
import { PlusSquareOutlined } from '@ant-design/icons';
const { Search } = Input;

const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Thông tin',
        dataIndex: 'description',
        key: 'description',
    },

    {
        title: 'Nhà cung cấp',
        dataIndex: 'supplier',
        key: 'supplier',
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'createDate',
        key: 'createDate',
    },
];

const Products = () => {
    const [dataTable, setDataTale] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    const onSuccess = (dataTable) => {
        setDataTale(dataTable?.data || [])
    }
    useEffect(() => {
        dispatch(getAllProducts({ onSuccess: onSuccess }));
    }, [])
    return (
        <Layout>
            <Col span={24}>
                <Form layout="inline" >
                    <Col span={12}>
                        <Form.Item >
                            <Search placeholder="Search" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item >
                            <Select />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button type="default" icon={<PlusSquareOutlined />} style={{ width: "100%" }} onClick={() => { showModal() }} >
                            Add
                        </Button>
                    </Col>
                </Form>
            </Col>
            <MyTable
                dataSource={dataTable}
                columns={columns}
            />
            <Modal title="Thêm sản phẩm"
                // footer={false}
                width="60vw"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closeIcon={false}
            >
                <Form
                    layout="horizontal"
                    form={form}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                >
                    <Form.Item label="Tên sản phẩm">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Giá">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Thông tin">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Nhà cung cấp">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Products;
