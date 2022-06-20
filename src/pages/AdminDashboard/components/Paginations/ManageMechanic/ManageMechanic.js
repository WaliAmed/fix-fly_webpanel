import React, { useState, useRef, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./ManageMechanic.css";
import { IoMdArrowDropdown } from "react-icons/io";
import localhost from "../../../../../utils/env";

const ManageMechanic = (props) => {
  const Approve = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
    };

    console.log(requestOptions);

    fetch(localhost + "/admin/statusapproved/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.log("error", error));
  };

  const Decline = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    console.log(requestOptions);

    fetch(localhost + "/admin/deletemechanic/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.log("error", error));
  };

  const tableHead = {
    id: "id",
    user_name: "User Name",
    email: "Email",
    phone: "Phone",
    specialist: "Specialist",
    status: "Status",
    actions: "Actions",
  };

  const PaginationButtons = (props) => {
    return (
      <td>
        <div className="dropdown">
          <button className="dropbtn btn btn-secondary">
            Actions
            <i style={{ marginLeft: "10px" }}>
              <IoMdArrowDropdown color="white" />
            </i>
          </button>
          <div className="dropdown-content">
            <div className="dropdown-item" onClick={() => Approve(props.id)}>
              Approve
            </div>

            <div className="dropdown-item" onClick={() => Decline(props.id)}>
              Decline
            </div>
          </div>
        </div>
      </td>
    );
  };

  const countPerPage = props.allData_user?.length
    ? props.allData_user.length
    : 0;
  const [value_user, setValue_user] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(props.allData_user?.slice(0, countPerPage))
  );

  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      var data = cloneDeep(
        props.allData_user
          .filter(
            (item) => item.id.toString().toLowerCase().indexOf(query) > -1
          )
          .slice(0, countPerPage)
      );

      if (!data.length) {
        data = cloneDeep(
          props.allData_user
            .filter(
              (item) =>
                item.user_name.toString().toLowerCase().indexOf(query) > -1
            )
            .slice(0, countPerPage)
        );
      }

      if (!data.length) {
        data = cloneDeep(
          props.allData_user
            .filter(
              (item) => item.email.toString().toLowerCase().indexOf(query) > -1
            )
            .slice(0, countPerPage)
        );
      }

      setCollection(data);
    }, 400)
  );

  useEffect(() => {
    if (!value_user) {
      updatePage(1);
    } else {
      searchData.current(value_user);
    }
  }, [value_user]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;

    tableData(from, to);
  };

  let id = 0;
  let count = 1;
  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell?.map((keyD, i) => {
      if (keyD === "id") id = key[keyD];
      if (keyD === "actions") return <PaginationButtons key={i} id={id} />;
      else if (keyD === "id") return <td key={i}>{count++}</td>;
      else return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  function collection_fn(from, to) {
    return cloneDeep(props.allData_user?.slice(from, to));
  }

  const tableData = (from = 0, to = countPerPage) => {
    return collection_fn(from, to)?.map((key, index) =>
      tableRows({ key, index })
    );
  };

  const headRow = () => {
    return Object.values(tableHead)?.map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <div className="pagination">
      <h5 style={{ color: "var(--theme-color)" }}>Pending: </h5>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={props.allData_user?.length}
      />
    </div>
  );
};
export default ManageMechanic;
