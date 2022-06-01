import React from "react";

//Components
import ManageMechanic from "../components/Paginations/ManageMechanic/ManageMechanic";

const ManageMechanics = (props) => {
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "var(--theme-color)" }}>Manage Mechanics</h3>
        <hr />
      </div>
      <ManageMechanic allData_user={props.allData_user} itemsPerPage={7} />
    </div>
  );
};

export default ManageMechanics;
