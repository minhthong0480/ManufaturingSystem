import React from 'react';
import '../Style/Homepages.css'
import { Card } from 'antd';

import userManagementImg from '../image/user-management.jpg';
import clientManagementImg from '../image/client-management.jpg';

const cardData = [
  {
    id: 1,
    imageSrc: userManagementImg,
    url: '#',
    name:"Quản Lý Người Dùng",
    
  },
  {
    id: 2,
    imageSrc: clientManagementImg,
    url: '#',
    name:"Quản Lý Khách Hàng",
  },
  {
    id: 3,
    imageSrc: userManagementImg,
    url: '/contract',
    name:"Quản Lý Hợp Đồng",
  },
  {
    id: 4,
    imageSrc: userManagementImg,
    url: '#',
    name:"Quản Lý Nhân Sự Sản Xuất",
  },
  {
    id: 5,
    imageSrc: userManagementImg,
    url: '#',
    name:"Quản Lý Vật Tư",
  },
  {
    id: 6,
    imageSrc: userManagementImg,
    url: '#',
    name:"Quản Lý Cấu Hình",
  },
  {
    id: 7,
    imageSrc: userManagementImg,
    url: '#',
    name:"Option 7",
  },
  {
    id: 8,
    imageSrc: userManagementImg,
    url: '#',
    name:"Option 8",
  },
];

function Homepage() {

    return (
        <div className="card-container">
            <div className="card-row">
                {cardData.map(card => (
                    <Card hoverable key={card.id} className="card" >
                        <img src={card.imageSrc} alt={`From ${card.id}`} />
                        <a href={card.url}>{card.name}</a>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Homepage;

