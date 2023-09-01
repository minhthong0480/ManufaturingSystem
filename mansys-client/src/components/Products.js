import Layout from "antd/es/layout/layout";
import React from "react";
import { Table, Form, Input, Select, Col } from "antd";
import MyTable from "./MyTable/MyTable";
const { Search } = Input;

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const Products = () => {
    return (
        <Layout>
            <Col span={24}>
                <Form layout="inline" >
                    <Col span={16}>
                        <Form.Item >
                            <Search placeholder="Search" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item >
                            <Select />
                        </Form.Item>
                    </Col>
                </Form>
            </Col>
            <MyTable
                dataSource={dataSource}
                columns={columns}
            />;
        </Layout>
    );
};

export default Products;
