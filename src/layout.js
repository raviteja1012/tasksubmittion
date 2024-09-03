import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  PartitionOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Details from "./components/Details";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [data, setData] = useState({
    presentation: [],
    questions_and_answers: [],
    executives: [],
    analyst: [],
  });
  const [activeTabKey, setActiveTabKey] = useState("1");
  useEffect(() => {
    axios
      .get("/json/responsejson.json")
      .then((res) => {
        setData({
          presentation:
            res.data?.data?.items?.transcript_data?.presentation || [],
          questions_and_answers:
            res.data?.data?.items?.transcript_data?.questions_and_answers || [],
          executives:
            res.data?.data?.items?.transcript_data?.participants?.executives || [],
          analyst: res.data?.data?.items?.transcript_data?.participants?.analyst || [],
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [activeTabKey]);
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Presentation",
    },
    {
      key: "2",
      icon: <QuestionCircleOutlined />,
      label: "Q&A",
    },
    {
      key: "3",
      icon: <PartitionOutlined />,
      label: "Corporate Participants",
    },
    {
      key: "4",
      icon: <PhoneOutlined />,
      label: "Conference Call Participants",
    },
  ];
  const handleMenuClick = (e) => {
    const clickedItem = items.find((item) => item.key === e.key);
    if (clickedItem) {
      setActiveTabKey(e.key);
      console.log(clickedItem.label, "clickedItem");
    }
  };

  const renderTabs = () => {
    switch (activeTabKey) {
      case "1":
        return <Details data={data.presentation} header={"Presentation"}/>;
      case "2":
        return <Details data={data.questions_and_answers} header={"Questions and Answers"}/>;
      case "3":
        return <Details data={data.executives } header={"Corporate Participants"} />;
      case "4":
        return <Details data={data.analyst} header={"Conference Call Participants"} />;
      default:
        return null;
    }
  };
  

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed} 
      className={collapsed ? "sidebarsmall" : "sidebar"}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={handleMenuClick}
          style={{marginTop:"60px"}}

        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          {renderTabs()}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
