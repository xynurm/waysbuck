import React from "react";
import { useQuery } from "react-query";
import UserImg from "../../assets/img/userimg.png";
import { API } from "../../config/api";



export default function MyProfile() {

  let { data: profile } = useQuery("profilesData", async () => {
    const response = await API.get("/profiles");
    return response.data.data;
  });
  return (
    <div className="col-sm-5">
      <h4 className="fw-bold mb-4" style={{ color:"#613D2B" }}>MyProfile</h4>
      <div className="d-flex ">
        <img src={UserImg} className="rounded-3" alt="img-profile"></img>
        <div className="px-4">
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Fullname
            </text>
            <br />
            <text className="fw-semibold">{profile?.user.fullName}</text>
          </div>
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Email
            </text>{" "}
            <br />
            <text className="fw-semibold">{profile?.user.email}</text>
          </div>
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Address
            </text>{" "}
            <br />
            <text className="fw-semibold">{profile?.address}</text>
          </div>
          <div className="mb-3">
            <text className="fw-semibold" style={{ color: "#613D2B" }}>
              Phone
            </text>{" "}
            <br />
            <text className="fw-semibold">{profile?.phone}</text>
          </div>
        </div>
      </div>
    </div>
  );
}
