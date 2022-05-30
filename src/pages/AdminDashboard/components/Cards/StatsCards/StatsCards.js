import React from "react";
import "./StatsCards.css";

//Packages
import CountUp from "react-countup";

//Icons
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

const StatsCards = (props) => {
  return (
    <div id="StatsCard">
      {props.card === "increase" ? (
        <div className="card card-stats mb-4 mb-xl-0">
          <div
            className="card-body"
            style={{
              backgroundColor: `${
                props.color === "purple" ? "#321FDC" : "#3199FF"
              }`,
            }}
          >
            <div className="row" style={{ marginBottom: "70px" }}>
              <div className="col">
                <h5 className="card-title text-uppercase text-muted mb-0">
                  {props.title}
                </h5>
                <CountUp start={0} end={props.amount} delay={0} separator={","}>
                  {({ countUpRef }) => (
                    <span
                      className="h1 font-weight-bold mb-0"
                      ref={countUpRef}
                    />
                  )}
                </CountUp>
              </div>
              <div className="col-auto">
                <div className="icon icon-shape bg-white rounded-circle shadow">
                  <props.icon
                    style={{ padding: "7px" }}
                    color={` ${
                      props.color === "purple" ? "#321FDC" : "#3199FF"
                    }`}
                    size={50}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span style={{ marginLeft: "-8px" }}>
                <BsArrowUpShort size={30} color="white" /> 3.48%
              </span>
              <small className="text-nowrap" style={{ marginLeft: "4px" }}>
                Since last month
              </small>
            </p>
          </div>
        </div>
      ) : (
        <div className="card card-stats mb-4 mb-xl-0">
          <div
            className="card-body"
            style={{
              backgroundColor: `${
                props.color === "red" ? "#E55251" : "#F9B112"
              }`,
            }}
          >
            <div className="row" style={{ marginBottom: "70px" }}>
              <div className="col">
                <h5 className="card-title text-uppercase text-muted mb-0">
                  {props.title}
                </h5>
                <CountUp start={0} end={props.amount} delay={0} separator={","}>
                  {({ countUpRef }) => (
                    <span
                      className="h1 font-weight-bold mb-0"
                      ref={countUpRef}
                    />
                  )}
                </CountUp>
              </div>
              <div className="col-auto">
                <div className="icon icon-shape bg-white rounded-circle shadow">
                  <props.icon
                    style={{ padding: "7px" }}
                    color={` ${props.color === "red" ? "#E55251" : "#F9B112"}`}
                    size={50}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span style={{ marginLeft: "-8px" }}>
                <BsArrowDownShort size={30} color="white" />
                3.48%
              </span>
              <small className="text-nowrap" style={{ marginLeft: "4px" }}>
                Since last week
              </small>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCards;
