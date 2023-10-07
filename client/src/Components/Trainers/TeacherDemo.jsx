import React, { useEffect, useState } from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
// import { NavLink} from "react-router-dom";
// import CreateIcon from "@mui/icons-material/Create";

function TeacherDemo() {

    const [demo, setDemo] = useState();
  let monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const getTrainerdemo = async () => {
    const res = await fetch("http://localhost:8000/getDemoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TrainerName: localStorage.getItem("TrainerName"),
        month: monthName[month],
        day: day.toString(),
        year: year.toString(),
      }),
    });

    const data = await res.json();
    console.log("data of demo =", data);
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setDemo(data);
    }
  };

  const badgeStatus = {
    Register: "success",
    Process: "warning",
    NotIntersted: "danger",
  }

  useEffect(() => {
    getTrainerdemo();
  }, []);

  return (
    <>
     
      <div className="sidebar-main-container">
        <div className="teacher-demo-container">
          <div className="card-body">
            <div className="table-responsive recentOrderTable">
              <table className="table verticle-middle table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Background</th>
                    <th scope="col">Course</th>
                    <th scope="col">Trainer</th>
                    <th scope="col">Time</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {JSON.parse(localStorage.getItem("demoData")).map(
                    (data, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.Name}</td>
                          <td>{data.Background}</td>
                          <td>{data.Course}</td>
                          <td>{data.Trainer}</td>
                          <td>{data.Time}</td>
                          <td>{data.Date}</td>
                          <td>
                            <span
                              className={`badge badge-rounded badge-${
                                badgeStatus[data.status]
                              }`}
                            >
                              {data.status}
                            </span>
                          </td>
                          {/* <button className="btn btn-primary text-light">
                    
                            <NavLink
                              to={`/counselor/editDemoStudent/${data._id}`}
                            >
                              <CreateIcon />
                            </NavLink>
                          </button> */}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDemo