import React, { useState, useEffect } from "react";

/*Stats Card*/
import StatsCards from "../components/Cards/StatsCards/StatsCards";

/*Icons*/
import { MdOutlinePhoneForwarded, MdPendingActions } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiStats, BiDialpad } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";
import { GiMechanicGarage } from "react-icons/gi";

import localhost from "../../../utils/env";

const Dashboard = () => {
  const [TotalUsers, setTotalUsers] = useState(0);
  const [TotalMechanics, setTotalMechanics] = useState(0);
  const [PendingMechanics, setPendingMechanics] = useState(0);
  const [ApprovedMechanics, setApprovedMechanics] = useState(0);

  useEffect(() => {
    GetAllUsers();
    GetAllMechanics();
    GetAllPendingMechanics();
    GetAllApprovedMechanics();
  }, []);

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
          setTotalUsers(result.length);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const GetAllMechanics = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(localhost + "/admin/getall/mechanic", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (typeof result !== "undefined" && result.length !== 0) {
          setTotalMechanics(result.length);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const GetAllPendingMechanics = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(localhost + "/admin/getpendingmechanic", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (typeof result !== "undefined" && result.length !== 0) {
          setPendingMechanics(result.length);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const GetAllApprovedMechanics = () => {
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
        console.log("Approved -> ", result[0].status);
        if (
          typeof result !== "undefined" &&
          result.length !== 0 &&
          result[0].status === "approved"
        ) {
          setApprovedMechanics(result.length);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "var(--theme-color)" }}>Dashboard</h3>
        <hr />
      </div>
      <div className="row">
        <div className="col-7">
          <StatsCards
            title="Total Users"
            card="increase"
            amount={TotalUsers}
            icon={FaUsers}
          />
        </div>
        <div className="col-5">
          <StatsCards
            title="Total Mechanics"
            color="red"
            amount={TotalMechanics}
            icon={GiMechanicGarage}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-5">
          <StatsCards
            title="Pending Mechanics"
            amount={PendingMechanics}
            icon={MdPendingActions}
          />
        </div>
        <div className="col-7">
          <StatsCards
            title="Approved Mechanics"
            amount={ApprovedMechanics}
            card="increase"
            color="purple"
            icon={IoMdDoneAll}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
