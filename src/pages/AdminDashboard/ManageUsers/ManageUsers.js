import React from "react";

//Components
import ManageUser from "../components/Paginations/ManageUser/ManageUser";

const ManageUsers = (props) => {
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "var(--theme-color)" }}>Manage Users</h3>
        <hr />
      </div>
      <ManageUser allData_user={props.allData_user} itemsPerPage={7} />
    </div>
  );
};

export default ManageUsers;
