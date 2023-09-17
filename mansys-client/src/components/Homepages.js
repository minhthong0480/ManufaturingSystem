import React from "react";
import "../styles/HomepagesNew.css";
import userManagementImg from "../images/user-management.jpg";
import { Card, Layout, Row, Col } from "antd";
import { useNavigate } from 'react-router-dom';
import "../styles/HomepagesNew.css";
// import userManagementImg from "../image/user-management.jpg";
// import clientManagementImg from "../image/client-management.jpg";
// import contractManagementImg from "../image/contract-manage.jpg";
// import employeeManagementImg from "../image/employee-manage.png";
// import productManagementImg from "../image/product-manage.jpg";
// import settingManagementImg from "../image/setting-manage.png";
import {
  TeamOutlined, SolutionOutlined, ContainerOutlined,
  AuditOutlined, HddOutlined, ToolOutlined, InboxOutlined
} from '@ant-design/icons';


const cardData = [
  {
    id: 1,
    // imageSrc: userManagementImg,
    imageSrc: <TeamOutlined />,
    url: "/employee",
    name: "Quản Lý Người Dùng",
  },
  {
    id: 2,
    // imageSrc: clientManagementImg,
    imageSrc: <SolutionOutlined />,
    url: "/customer",
    name: "Quản Lý Khách Hàng",
  },
  {
    id: 3,
    imageSrc: <TeamOutlined />,
    url: "/contracts",
    name: "Quản Lý Hợp Đồng",
  },
  {
    id: 4,
    // imageSrc: employeeManagementImg,
    imageSrc: <AuditOutlined />,
    url: "#",
    name: "Quản Lý Nhân Sự Sản Xuất",
  },
  {
    id: 5,
    // imageSrc: productManagementImg,
    imageSrc: <HddOutlined />,
    url: "/material",
    name: "Quản Lý Vật Tư",
  },
  {
    id: 6,
    // imageSrc: settingManagementImg,
    imageSrc: <ToolOutlined />,
    url: "#",
    name: "Quản Lý Cấu Hình",
  },
  {
    id: 6,
    // imageSrc: settingManagementImg,
    imageSrc: <InboxOutlined />,
    url: "/products",
    name: "Quản Lý sản phẩm",
  },
  {
    id: 7,
    imageSrc: <InboxOutlined />,
    url: "/inventory",
    name: "Quản Lý Iventory",
  },
];

function Homepage() {
  var navigate = useNavigate();

  return (
    // <div className="card-container">
    //   <div className="card-row">
    //     {cardData.map((card) => (
    //       <Card hoverable key={card.id} className="card">
    //         <a href={card.url} className="card-link">
    //           <img src={card.imageSrc}
    //             alt={`From ${card.id}`}
    //             className="card-image" />
    //           {/* <Image
    //             src={card.imageSrc}
    //             width={200}
    //           /> */}
    //           <div className="card-name">{card.name}</div>
    //         </a>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
    <Layout>
      <Row gutter={16}>
        {cardData.map((card) => (
          <Col span={8} style={{ padding: '1rem' }}>
            <Card title={card.name}
              hoverable
              bordered={true}
              onClick={() => { navigate(card.url) }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "5rem" }}> {card.imageSrc}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Homepage;
