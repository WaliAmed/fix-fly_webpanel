import React, { useState, useRef, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./ManageUser.css";
import { IoMdArrowDropdown } from "react-icons/io";
import localhost from "../../../../../utils/env";

const ManageUser = () => {
  // const allData_user = [
  //   {
  //     id: "1",
  //     user_name: "Clara Knapp",
  //     email: "claraknapp@sustenza.com",
  //     phone: "+1 (872) 490-3415",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "2",
  //     user_name: "Debra Keith",
  //     email: "debrakeith@sustenza.com",
  //     phone: "+1 (924) 442-2222",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "3",
  //     user_name: "Luna Ball",
  //     email: "lunaball@sustenza.com",
  //     phone: "+1 (980) 470-2798",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "4",
  //     user_name: "Selma Hampton",
  //     email: "selmahampton@sustenza.com",
  //     phone: "+1 (869) 419-3095",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "5",
  //     user_name: "Sexton Branch",
  //     email: "sextonbranch@sustenza.com",
  //     phone: "+1 (979) 527-2590",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "6",
  //     user_name: "Melinda Alexander",
  //     email: "melindaalexander@sustenza.com",
  //     phone: "+1 (975) 507-2089",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "7",
  //     user_name: "Suzette Hayden",
  //     email: "suzettehayden@sustenza.com",
  //     phone: "+1 (863) 445-3304",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "8",
  //     user_name: "Nielsen Clemons",
  //     email: "nielsenclemons@sustenza.com",
  //     phone: "+1 (996) 461-2673",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "9",
  //     user_name: "Ortiz Oneil",
  //     email: "ortizoneil@sustenza.com",
  //     phone: "+1 (897) 493-2879",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "10",
  //     user_name: "Branch Haney",
  //     email: "branchhaney@sustenza.com",
  //     phone: "+1 (953) 504-2257",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "11",
  //     user_name: "Hinton Johnson",
  //     email: "hintonjohnson@sustenza.com",
  //     phone: "+1 (963) 534-3184",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "12",
  //     user_name: "Tamra Singleton",
  //     email: "tamrasingleton@sustenza.com",
  //     phone: "+1 (817) 557-3109",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  //   {
  //     id: "13",
  //     user_name: "Dina Oneill",
  //     email: "dinaoneill@sustenza.com",
  //     phone: "+1 (809) 455-3713",
  //     DNC_limit: 1,
  //     DNC_done: 10,
  //   },
  // ];

  const [allData_user, setallData_user] = useState([]);

  useEffect(() => {
    if (allData_user.length === 0) {
      GetAllUsers();
    }

    async function GetAllUsers() {
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
            setallData_user(result);
          } else {
            setallData_user({});
          }
        })
        .catch((error) => console.log("error", error));
    }
  }, [allData_user]);

  const tableHead = {
    id: "id",
    user_name: "User Name",
    email: "Email",
    actions: "Actions",
  };

  const Delete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    console.log(requestOptions);

    fetch(localhost + "/admin/deleteuser/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.log("error", error));
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
            <div className="dropdown-item" onClick={() => Delete(props.id)}>
              Delete
            </div>
          </div>
        </div>
      </td>
    );
  };

  const countPerPage = allData_user.length;
  const [value_user, setValue_user] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData_user.slice(0, countPerPage))
  );

  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      var data = cloneDeep(
        allData_user
          .filter(
            (item) => item.id.toString().toLowerCase().indexOf(query) > -1
          )
          .slice(0, countPerPage)
      );

      if (!data.length) {
        data = cloneDeep(
          allData_user
            .filter(
              (item) =>
                item.user_name.toString().toLowerCase().indexOf(query) > -1
            )
            .slice(0, countPerPage)
        );
      }

      if (!data.length) {
        data = cloneDeep(
          allData_user
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
    const columnData = tableCell.map((keyD, i) => {
      if (keyD === "id") id = key[keyD];
      if (keyD === "actions") return <PaginationButtons key={i} id={id} />;
      else if (keyD === "id") return <td key={i}>{count++}</td>;
      else return <td key={i}>{key[keyD]}</td>;
    });
    return <tr key={index}>{columnData}</tr>;
  };

  function collection_fn(from, to) {
    return cloneDeep(allData_user.slice(from, to));
  }

  const tableData = (from = 0, to = countPerPage) => {
    return collection_fn(from, to).map((key, index) =>
      tableRows({ key, index })
    );
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <div className="pagination">
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
        total={allData_user.length}
      />
    </div>
  );
};
export default ManageUser;
