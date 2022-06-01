import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

/*Pages*/
import Dashboard from "./Dashboard/Dashboard";
import ManageUsers from "./ManageUsers/ManageUsers";
import ManageMechanics from "./ManageMechanics/ManageMechanics";
import ManageMechanicApproved from "./components/Paginations/ManageMechanicApproved/ManageMechanicApproved";
import "./AdminLogin.css";

import localhost from "../../utils/env";

import { RiAdminFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

/*Icons*/
import {
  MdDashboardCustomize,
  MdManageAccounts,
  MdQueryStats,
} from "react-icons/md";

const AdminDashboard = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const AdminLogin = () => {
    const [AdminName, setAdminName] = useState("");
    const [Password, setPassword] = useState("");

    const Login = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("Admin_name", AdminName);
      urlencoded.append("password", Password);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      fetch(localhost + "/admin/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (!result.message) setLoginCheck(true);
        })
        .catch((error) => console.log("error", error));
    };
    return (
      <div id="login" className="container-fluied">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="screen">
            <div className="screen__content">
              <div className="login">
                <h3
                  style={{ marginBottom: "30px", color: "var(--theme-color)" }}
                >
                  Admin Login
                </h3>

                <div className="login__field">
                  <RiAdminFill size={18} className="login__icon" />
                  <input
                    type="text"
                    className="login__input"
                    placeholder="User name"
                    value={AdminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
                <div className="login__field">
                  <FaLock className="login__icon" />
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="button login__submit"
                  onClick={() => {
                    if (AdminName !== "" && Password !== "") Login();
                  }}
                >
                  <span className="button__text">Log In Now</span>
                  <IoIosArrowForward className="button__icon" />
                </button>
              </div>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [SideNavBarCheck, setSideNavBarCheck] = useState(1);
  const SideNavBar = () => {
    return (
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white side-bar">
        <a
          href="/admin-dashboard"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <h2 className="m-0 text-white">Fixed & Fly</h2>
        </a>

        <hr></hr>

        <ul className="nav nav-pills flex-column nav-options">
          <li className="nav-item mb-1 mx-1">
            <div
              className={`nav-link ${
                SideNavBarCheck === 1 ? "active" : ""
              } side-nav-btn`}
              style={{ color: "white" }}
              onClick={() => setSideNavBarCheck(1)}
            >
              <MdDashboardCustomize
                size={25}
                color={"white"}
                style={{ marginRight: "10px" }}
              />
              Dashboard
            </div>
          </li>

          <li className="nav-item mb-1 mx-1">
            <div
              className={`nav-link ${
                SideNavBarCheck === 2 ? "active" : ""
              } side-nav-btn`}
              style={{ color: "white" }}
              onClick={() => setSideNavBarCheck(2)}
            >
              <MdManageAccounts
                size={25}
                color={"white"}
                style={{ marginRight: "10px" }}
              />
              Manage Users
            </div>
          </li>

          <li className="nav-item mb-1 mx-1">
            <div
              className={`nav-link ${
                SideNavBarCheck === 3 ? "active" : ""
              } side-nav-btn`}
              style={{ color: "white" }}
              onClick={() => setSideNavBarCheck(3)}
            >
              <MdQueryStats
                size={25}
                color={"white"}
                style={{ marginRight: "10px" }}
              />
              Manage Mechanics
            </div>
          </li>
        </ul>

        <hr></hr>

        <div className="dropdown">
          <a
            href="/"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={require("../../assets/images/user.png")}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Admin</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="/">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <div
                className="dropdown-item"
                onClick={() => setLoginCheck(false)}
                style={{ cursor: "pointer" }}
              >
                Sign out
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const [allData_user, setallData_user] = useState([]);

  useEffect(() => {
    const GetAllMechanics = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(localhost + "/admin/getpendingmechanic", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (typeof result !== "undefined" && result.length !== 0) {
            console.log(result);
            setallData_user(result);
          } else {
            console.log("none");
          }
        })
        .catch((error) => console.log("error", error));
    };
    GetAllMechanics();
  }, []);

  const [allData_user_approved, setallData_user_approved] = useState([]);

  useEffect(() => {
    const GetAllMechanicsApproved = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(localhost + "/admin/getaprovedmechanic", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (typeof result !== "undefined" && result.length !== 0) {
            setallData_user_approved(result);
          } else {
            setallData_user_approved({});
          }
        })
        .catch((error) => console.log("error", error));
    };
    GetAllMechanicsApproved();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const GetAllUsers = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(localhost + "/admin/getall/users", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (typeof result !== "undefined" && result.length !== 0) {
            setUsers(result);
          } else {
            setUsers({});
          }
        })
        .catch((error) => console.log("error", error));
    };

    GetAllUsers();
  }, []);

  useEffect(() => {
    if (SideNavBarCheck === 1) document.title = "DashBoard | Admin Dashboard";
    else if (SideNavBarCheck === 2)
      document.title = "Manage Users | Admin Dashboard";
    else if (SideNavBarCheck === 3)
      document.title = "Manage Mechanics| Admin Dashboard";
  }, [SideNavBarCheck]);

  return loginCheck === false ? (
    <div>
      <AdminLogin />
    </div>
  ) : (
    <div className="d-flex admin dashboard-body">
      <SideNavBar />

      <div className="container-flued container-body">
        <div className="p-4 ">
          <div className="d-flex flex-column mt-4">
            {SideNavBarCheck === 1 ? <Dashboard /> : ""}
            {SideNavBarCheck === 2 && users.length > 0 ? (
              <ManageUsers allData_user={users} />
            ) : (
              <p>{SideNavBarCheck === 2 ? "No Users!" : ""}</p>
            )}
            {SideNavBarCheck === 3 && allData_user.length > 0 ? (
              <ManageMechanics allData_user={allData_user} />
            ) : (
              <p>{SideNavBarCheck === 3 ? "No Pending Mechanics!" : ""}</p>
            )}
            {SideNavBarCheck === 3 && allData_user_approved.length > 0 ? (
              <ManageMechanicApproved allData_user={allData_user_approved} />
            ) : (
              <p>{SideNavBarCheck === 3 ? "No Approved Mechanics!" : ""}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
