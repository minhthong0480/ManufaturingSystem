import React, { useState, useEffect } from 'react';
import logo from '../image/PhuongHaiJSCAvata.jpg'
import { Layout, Avatar, Menu, Dropdown  } from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import '../Style/HeaderUI.css';

const { Header } = Layout;

const HeaderUI = () => {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('your-api-url-here');
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    const menu = (
<<<<<<< HEAD
      <Menu>
        <Menu.Item key="1"><a href="/">Trang chủ</a></Menu.Item>
        <Menu.Item key="2"><a href="/employee">Quản Lý Người Dùng</a></Menu.Item>
        <Menu.Item key="3"><a href="/customer">Quản Lý Khách Hàng</a></Menu.Item>
=======
      <Menu >
        <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
        <Menu.Item key="2"><a href="#">Quản Lý Người Dùng</a></Menu.Item>
        <Menu.Item key="3"><a href="#">Quản Lý Khách Hàng</a></Menu.Item>
>>>>>>> Thong
        <Menu.Item key="4"><a href="/contract">Quản Lý Hợp Đồng</a></Menu.Item>
        <Menu.Item key="5"><a href="#">Quản Lý Nhân Sự Sản Xuất</a></Menu.Item>
        <Menu.Item key="6"><a href="#">Quản Lý Vật Tư</a></Menu.Item>
        <Menu.Item key="7"><a href="#">Quản Lý Cấu Hình</a></Menu.Item>
        {/* <Menu.Item key="8"><a href="#">Option 7</a></Menu.Item>
        <Menu.Item key="9"><a href="#">Option 8</a></Menu.Item> */}
      </Menu>
    );

  return (
    <Header className="app-header" >
      <div className="company-container">
        <a href="/">
        <Avatar classname="avata-company" src={logo} size='large' />
        <span className="company-name">PHUONG HAI JSC</span>
        </a>
      </div>

      <div className='user-container'>
        <Dropdown overlay={menu} placement="bottomRight">
            <button className="menu-button"><MenuOutlined /></button>
        </Dropdown>
        <div className="avatar-container" >
            <Avatar className='user-avata' src={userData.avatar} size="large" />
            <span className="user-name">username non-click click{userData.name}</span>
        </div>
      </div>

    </Header>
  );
};

export default HeaderUI;