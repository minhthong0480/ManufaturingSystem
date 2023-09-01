import React from "react";
import "../Style/HomepagesNew.css";
import { Card } from "antd";

import userManagementImg from "../image/user-management.jpg";
import clientManagementImg from "../image/client-management.jpg";
import contractManagementImg from "../image/contract-manage.jpg";
import employeeManagementImg from "../image/employee-manage.png";
import productManagementImg from "../image/product-manage.jpg";
import settingManagementImg from "../image/setting-manage.png";

const cardData = [
  {
    id: 1,
    imageSrc: userManagementImg,
    url: "/employee",
    name: "Quản Lý Người Dùng",
  },
  {
    id: 2,
    imageSrc: clientManagementImg,
    url: "/customer",
    name: "Quản Lý Khách Hàng",
  },
  {
    id: 3,
    imageSrc: contractManagementImg,
    url: "/contract",
    name: "Quản Lý Hợp Đồng",
  },
  {
    id: 4,
    imageSrc: employeeManagementImg,
    url: "#",
    name: "Quản Lý Nhân Sự Sản Xuất",
  },
  {
    id: 5,
    imageSrc: productManagementImg,
    url: "/material",
    name: "Quản Lý Vật Tư",
  },
  {
    id: 6,
    imageSrc: settingManagementImg,
    url: "#",
    name: "Quản Lý Cấu Hình",
  },
];

function Homepage() {
  return (
    <div className="card-container">
      <div className="card-row">
        {cardData.map((card) => (
          <Card hoverable key={card.id} className="card">
            <a href={card.url} className="card-link">
              <img src={card.imageSrc} alt={`From ${card.id}`} className="card-image" />
              <div className="card-name">{card.name}</div>
            </a>
        </Card>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
