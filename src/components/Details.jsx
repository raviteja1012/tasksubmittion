import React, { useEffect } from "react";
import {
  UserOutlined,
} from "@ant-design/icons";

const Details = ({ data, header }) => {
  useEffect(() => {}, [data, header]);
  return (
    <div>
      <h1 style={{ textAlign: "center",color:"blue",fontSize:"30px" }}>{header}</h1>
      {data.map((item, index) => (
        <div className="boxadjustment" key={index}>
          <div style={{ display: "flex",alignItems:"center", gap:"10px" }}>
            {item.transcript_data&&(<UserOutlined style={{ fontSize: "50px" }} />)}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0px",
              }}
            >
              <h4 style={{ margin: "0px",color:"blue" }}>
                {item.participant_name ? item.participant_name : item.name}
              </h4>
              <div>
                <h8 style={{ margin: "0px" ,color:"#615842"}}>
                  {item.participant_designation
                    ? `${item.participant_designation} | `
                    : item.designation?`${item.designation} | `:''}
                   {item.participant_company
                    ? item?.participant_company
                    : item?.company}
                </h8>
              </div>
            </div>
          </div>
          {item?.transcript_data &&
            item?.transcript_data.map((item, index) => (
              <div key={index}>
                <p style={{color:"black"}}>{item}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Details;
