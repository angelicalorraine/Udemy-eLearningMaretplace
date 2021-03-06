import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a href="">App</a>
          </Link>
        </Item>

        {user && user.role && user.role.includes("Instructor") ? (
          <Item
            key="/instructor/course/create"
            onClick={(e) => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
          >
            <Link href="/instructor/course/create">
              <a href="">Create Course</a>
            </Link>
          </Item>
        ) : (
          <Item
            key="/user/become-instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
            <Link href="/user/become-instructor">
              <a href="">Become Instructor</a>
            </Link>
          </Item>
        )}




        {user === null && (
          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a href="">Login</a>
              </Link>
            </Item>

            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              {" "}
              <Link href="/register">
                <a href="">Register</a>
              </Link>
            </Item>
          </>
        )}

        {user && user.role && user.role.includes("Instructor") && (
          <Item
            key="/instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
            style={{ marginLeft: "auto" }}
            className='float-right'
          >
            <Link href="/instructor">
              <a>Instructor</a>
            </Link>
          </Item>
        )}
        {user !== null && (
          <SubMenu
            icon={<CoffeeOutlined />}
            title={user && user.name}
            // style={{ marginLeft: "auto" }}
            className="float-right"
          >
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a> Dashboard</a>
                </Link>
              </Item>
              <Item className="float-right" onClick={logout}>
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        )}


      </Menu>
    </>
  );
};

export default TopNav;
