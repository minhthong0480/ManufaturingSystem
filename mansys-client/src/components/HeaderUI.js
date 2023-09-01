import React, { useState, useEffect } from 'react';
import logo from '../images/PhuongHaiJSCAvata.jpg'
import { Layout, Avatar, Menu, Dropdown  } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../styles/HeaderUINew.css';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/auth"
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;



const HeaderUI = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();

    const [userData, setUserData] = useState({});
    const username = useSelector((state) => state.auth?.username);

    useEffect(() => {
      // Simulate fetching user data from an API
      // Replace this with your actual API call
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
    
    const logoutAction = (e) => {
      e.preventDefault()
      dispatcher(signOut(navigator))
    }

    const menu = (
      <Menu >
        <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
        <Menu.Item key="2"><a href="/employee">Quản Lý Người Dùng</a></Menu.Item>
        <Menu.Item key="3"><a href="/customer">Quản Lý Khách Hàng</a></Menu.Item>
        <Menu.Item key="4"><a href="/contracts">Quản Lý Hợp Đồng</a></Menu.Item>
        <Menu.Item key="5"><a href="#">Quản Lý Nhân Sự Sản Xuất</a></Menu.Item>
        <Menu.Item key="6"><a href="/material">Quản Lý Vật Tư</a></Menu.Item>
        <Menu.Item key="7"><a href="#">Quản Lý Cấu Hình</a></Menu.Item>
        <Menu.Item key="8"><a href="#">Option 7</a></Menu.Item>
        <Menu.Item key="9"><a href="#" onClick={logoutAction}>Log out</a></Menu.Item>
      </Menu>
    );

  return (
    <Header className="app-header" >
      <div className="company-container">
        <a href="/">
        <Avatar src={logo} size='large' />
        <span className="company-name">PHUONG HAI JSC</span>
        </a>
      </div>

      <div className='user-container'>
        <div className="avatar-container" >
            <Avatar src={userData.avatar} size="large" />
            <span className="user-name">{username}</span>
        </div>
        <Dropdown overlay={menu} placement="bottomRight">
            <button className="menu-button"><MenuOutlined /></button>
        </Dropdown>
      </div>

    </Header>
  );
};

export default HeaderUI;