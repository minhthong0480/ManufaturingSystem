import Layout from "antd/es/layout/layout";
import { Button, Form, Input, Select, Col, Modal, InputNumber, notification, Typography } from "antd";
import { omitBy, isNil, isNumber } from 'lodash';
import { getAllProducts, createProducts } from "../actions/products";
import { getAllCategory } from "../actions/category";
import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import MyTable from "./MyTable/MyTable";
import { PlusSquareOutlined } from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeContext';
import moment from "moment";
import '../styles/Product.css';

const { Search } = Input;
const { Option } = Select;
const { Paragraph, Text } = Typography;
const currencyFormat = (num) => {
    return (
        Math.round(num)
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
};
const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'id',
        key: 'id',
        showSorterTooltip: false,
        sortOrder: "descend",
        sorter: (a, b) => a.id - b.id,
        render: (item, record) => {
            return (
                <Paragraph
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: 'more'
                    }}>
                    {record.name}
                </Paragraph >
            )
        }
    },
    {
        title: 'Giá (VND)',
        dataIndex: 'price',
        key: 'price',
        render: (amount) => currencyFormat(amount),
    },
    {
        title: 'Thông tin',
        dataIndex: 'description',
        key: 'description',
        render: (item) => {
            return (
                item
            )
        }
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
        render: (date) => moment(date).format('DD/MM/YYYY')
    },
];

const Products = () => {
    const { setLoading } = useContext(ThemeContext);
    const [dataTable, setDataTale] = useState([]);
    const [dataTableSearch, setDataTableSearch] = useState([]);
    const [dataSelect, setdataSelect] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingDataTable, setIsLoadingDataTable] = useState(true);
    const [form] = Form.useForm();
    const [formSearch] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const validateMessages = {
        required: 'Vui lòng nhập ${label}!',
    };

    const onSuccessCreate = (value) => {
        setLoading(false);
        switch (value.code) {
            case 200:
                notification.success(value)
                break;
            default:
                notification.error(value)
                break;
        }
    }
    const handleOk = () => {

        form.validateFields().then((values) => {
            values.cost = values.price;
            dispatch(createProducts({
                ...values,
                onSuccess: onSuccessCreate,
            }));
            setLoading(true);
            setIsModalOpen(false);
        })
            .catch((err) => {
                console.log(err);
                return;
            });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dispatch = useDispatch();
    const onSuccessProducts = (dataTable) => {
        setDataTale(dataTable?.data || [])
    }
    const onSuccessCategory = (dataSelect) => {
        setdataSelect(dataSelect?.data || [])
    }
    const itemSelect = (item) => (
        <Option key={item.id} value={item.id}>
            {item.name}
        </Option>
    );

    useEffect(() => {
        dispatch(getAllProducts({ onSuccess: onSuccessProducts }));
        dispatch(getAllCategory({ onSuccess: onSuccessCategory }));
    }, [])

    const onSeach = () => {
        formSearch.validateFields()
            .then((values) => {
                values = omitBy(values, isNil)
                console.log(values);
                const result = dataTable.filter(f => {
                    for (var key in values) {
                        switch (isNumber(f[key])) {
                            case true:
                                if (f[key] != values[key])
                                    return false
                                break;
                            default:
                                if (f[key].toLowerCase().trim().includes(values[key].toLowerCase().trim()) == false)
                                    return false
                                break;
                        }
                    }
                    return true;
                })
                setDataTableSearch(result);
                setIsLoadingDataTable(false)
            })
            .catch((err) => {
                return;
            });
    }

    useEffect(() => {
        onSeach()
    }, [dataTable])

    return (
        <Layout>
            <Col span={24}>
                <Form layout="inline" form={formSearch}>
                    <Col span={12}>
                        <Form.Item name="name">
                            <Search
                                placeholder="Tìm kiếm tên sản phẩm"
                                allowClear
                                onSearch={onSeach}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="category_id">
                            <Select
                                placeholder="--- Vui lòng chọn thể loại sản phẩm ---"
                                allowClear
                                onChange={onSeach}
                            >
                                {dataSelect.map((item) => itemSelect(item))}
                            </Select>
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
                dataSource={dataTableSearch}
                columns={columns}
                isLoading={isLoadingDataTable}
            />
            <Modal title="Thêm sản phẩm"
                width="60vw"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closeIcon={false}
            >
                <Form
                    validateMessages={validateMessages}
                    layout="horizontal"
                    form={form}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                >
                    <Form.Item label="Tên sản phẩm" name="name" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>
                    <Form.Item label="Giá" name="price"
                        rules={[
                            {
                                type: 'number',
                            },
                            {
                                required: true,
                            }
                        ]}>
                        <InputNumber placeholder="nhập giá" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Thông tin sản phẩm" name="description" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input placeholder="Nhập thông tin sản phẩm" />
                    </Form.Item>
                    <Form.Item label="Nhà cung cấp" name="supplier" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Input placeholder="Nhập nhà cung câp" />
                    </Form.Item>
                    <Form.Item label="Thể loại sản phẩm" name="category_id" rules={[
                        {
                            required: true,
                        },
                    ]}>
                        <Select placeholder="--- Vui lòng chọn ---" >
                            {dataSelect.map((item) => itemSelect(item))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Products;
