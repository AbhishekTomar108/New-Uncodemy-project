import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentSlidebar from "./StudentSlidebar";
import Header from "../Components/Header";

function StudentAttandanceDetails() {
  let { id } = useParams();
  // console.log('id =', id)

  let checkDate;
  const [startDate, setStartDate] = useState();
  const [firstDay, setFirstDay] = useState(1);
  const [dayRows, setDayRows] = useState([]);
  const [attendenceRows, setAttendanceStatus] = useState([]);

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
  let dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [student, setStudent] = useState();
  const [lastDay, setLastDay] = useState(new Date().getDate());
  const [filteredMonth, setFilteredMonth] = useState(
    monthName[new Date().getMonth()]
  );
  let currentMonth = monthName[new Date().getMonth()];
  const [allAttendance, setAllAttendance] = useState();
  const [monthAttendance, setMonthAttendance] = useState();
  let tempMonthAttendance;
  let presentId;
  let absentId;
  let missingDays = [];
  let status = [];

  let currentDate = new Date();
  const [date, setDate] = useState();
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  // let currentDay = currentDate.getDate()
  // const [currentMonth, setCurrentMonth] = useState(month[((currentDate.getMonth()))])

  // let currentMonth = month[((currentDate.getMonth()))]
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // let currentYear = currentDate.getFullYear()
  // let tempFullDate = `${currentDay}/${currentMonth}/${currentYear}`
  // const [fullDate, setFullDate] = useState(tempFullDate)

  let tempdate = date;
  // const FullAttand = async () => {

  //     // console.log('current month =', currentMonth, month[(new Date().getMonth())])
  //     if (currentMonth !== month[(new Date().getMonth())]) {
  //         // console.log('not current month')
  //         tempdate = new Date(currentYear, month.indexOf(currentMonth) + 1, 0).getDate()
  //         setDate(tempdate)
  //         // // console.log('temp date =', tempdate, month.indexOf(currentMonth))
  //     }
  //     else {
  //         tempdate = new Date().getDate()
  //         setDate(tempdate)
  //         // console.log('temp filter date', tempdate)
  //     }
  //     let monthAttendance = await fetch("http://localhost:8000/getMonthAttendance", {
  //         method: 'POST',
  //         headers: {
  //             "Content-Type": "application/json"
  //         },

  //         body: JSON.stringify({ year: currentYear.toString(), month: currentMonth, currentDate: tempdate.toString() })

  //     })
  //     // // console.log('date =', date)

  //     monthAttendance = await monthAttendance.json()

  //     // console.log('month attendance =', monthAttendance)
  //     checkDate = parseInt(monthAttendance.monthAttendance[0].date)
  //     setStartDate(checkDate)

  //     // // console.log("start at beginning", startDate)

  //     setMonthAttendance(monthAttendance.monthAttendance)
  //     tempMonthAttendance = monthAttendance.monthAttendance
  //     presentId = monthAttendance.presentId;
  //     absentId = monthAttendance.absentId;
  //     // // console.log('present id =',monthAttendance.presentId)

  //

  // }
  useEffect(async () => {
    // FullAttand();
    getstudent();

    // fillAttendance()
  }, []);

  const setMonth = (month) => {
    console.log("month =", month);
    setFilteredMonth(month);

    if ((month-1) == currentMonth) {
      console.log("current month =", month);
      setLastDay(new Date().getDate());
    } else {
      const lastDayOfMonth = new Date(
        currentYear,
        month,
        0
      );
      let lastDate = lastDayOfMonth.getDate();
      setLastDay(lastDate);
      console.log("last date =", lastDate);
    }
  };

  const getAttendance = async (student) => {
    console.log("first last ", filteredMonth, student);
    let filterStatus = await fetch("http://localhost:8000/getMonthAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: currentYear,
        month: filteredMonth,
        batch: student.Batch,
        TrainerID: student.TrainerID,
      }),
    });
    let data = await filterStatus.json();
    console.log("data =", data);

    // setAllAttendance(data);
    // extractAttendance(data, student);
  };

  const getstudent = async () => {
    let res = await fetch(`http://localhost:8000/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res = await res.json();
    console.log("student =", res.userIndividual);
    setStudent(res.userIndividual);
    // fillAttendance(tempMonthAttendance, res)
    getAttendance(res.userIndividual);
  };

  const extractAttendance = (data, currentStudent) => {
    let tempDayRows = [];
    for (let i = firstDay; i <= lastDay; i++) {
      let daysName =
        dayName[
          new Date(currentYear, monthName.indexOf(filteredMonth), i).getDay()
        ];

      tempDayRows.push(
        <th className="days">
          <span>{i}</span>
          <span className="daysName">{daysName}</span>
        </th>
      );
    }
    console.log("data extract =", data);

    let tempAttendanceRow = [];
    let attendanceIndex = 0;
    // console.log("first day and last day =",firstDay,lastDay)
    for (let i = firstDay; i <= lastDay; i++) {
      // console.log("attendance index= ",attendanceIndex)
      let daysName =
        dayName[
          new Date(currentYear, monthName.indexOf(filteredMonth), i).getDay()
        ];
      let filterAttendance = filterDateByDate(data.filterAttendance, i);

      if (filterAttendance.length !== 0) {
        console.log("date by date", i, attendanceIndex);
        let presentStatus = false;

        if (daysName === "fri") {
          tempAttendanceRow.push(<td className="text-warning">H</td>);
        } else {
          // console.log("else ",currentStudent._id)
          data.studentId[attendanceIndex].presentId.forEach((element) => {
            if (currentStudent._id === element && !presentStatus) {
              tempAttendanceRow.push(<td className="text-success">P</td>);
              presentStatus = true;
            }
          });

          if (!presentStatus) {
            tempAttendanceRow.push(<td className="text-danger">A</td>);
          }
        }
        attendanceIndex = attendanceIndex + 1;
      } else {
        if (daysName === "fri") {
          tempAttendanceRow.push(<td className="text-warning">H</td>);
        } else {
          tempAttendanceRow.push(<td className="text-danger">N M</td>);
        }
      }
    }

    // Update the state variables
    setDayRows(tempDayRows);
    setAttendanceStatus(tempAttendanceRow);
  };

  const filterDateByDate = (attendance, i) => {
    return attendance.filter((data) => {
      return data.date == i;
    });
  };

  // const fillAttendance = (attendanceData, student) => {

  //   console.log('attendance =',attendanceData,presentId)

  //     attendanceData.map((data, index) => {

  //         let daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //         if ((index + 1) === attendanceData.length) {

  //             if ((parseInt(tempdate) - parseInt(data.date) > 0)) {
  //                 daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === student.Batch) {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map((presentdata,presentIndex) => {

  //                             if (presentdata === student._id && presentStatus === false) {
  //                                 console.log('for present',presentIndex)
  //                                 presentStatus = true;
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             console.log('for absent')
  //                             status.push("absent")
  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                 }

  //                 setAttendanceStatus(status)

  //                 checkDate = checkDate + 1
  //                 for (let i = 0; i < (parseInt(tempdate) - parseInt(data.date)); i++) {

  //                     if (daysName !== 'fri') {

  //                         missingDays.push(checkDate)
  //                         status.push("not marked")
  //                     }

  //                     else {

  //                         status.push("holiday")
  //                     }
  //                     daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 }

  //             }

  //             else {

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === student.Batch) {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                         console.log('not marked')
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map((presentdata,presentIndex) => {

  //                             if (presentdata === student._id && presentStatus===false) {
  //                                 presentStatus = true;
  //                                 console.log('present =',presentdata,student._id,presentIndex)
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             status.push("absent")
  //                             console.log('absent =',student._id)

  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                     console.log('holiday =',student._id)
  //                 }
  //             }

  //             setAttendanceStatus(status)
  //             checkDate = checkDate + 1;

  //         }

  //         else if ((index + 1) < attendanceData.length) {
  //             if ((parseInt(attendanceData[index + 1].date) - parseInt(data.date) > 1)) {
  //                 daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === student.Batch) {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map(presentdata => {

  //                             if (presentdata === student._id && presentStatus === false) {
  //                                 presentStatus = true;
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             status.push("absent")
  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                 }

  //                 setAttendanceStatus(status)

  //                 checkDate = checkDate + 1
  //                 for (let i = 1; i < (parseInt(attendanceData[index + 1].date) - parseInt(data.date)); i++) {

  //                     if (daysName !== 'fri') {

  //                         missingDays.push(checkDate)
  //                         status.push("not marked")
  //                     }

  //                     else {

  //                         status.push("holiday")
  //                     }
  //                     daysName = dayName[(new Date(currentYear, month.indexOf(currentMonth), checkDate).getDay())];

  //                 }

  //             }

  //             else {

  //                 if (daysName !== 'fri') {
  //                     let BatchStatus = false;
  //                     data.Batch.map(element => {
  //                         if (element === "ST/2023/08/SH02/02") {
  //                             BatchStatus = true
  //                         }
  //                     })

  //                     if (BatchStatus === false) {
  //                         status.push("not marked")
  //                     }
  //                     else if (BatchStatus === true) {

  //                         let presentStatus = false;
  //                         presentId[index].user.id.map(presentdata => {

  //                             if (presentdata === student._id && presentStatus === false) {
  //                                 presentStatus = true;
  //                                 status.push("present")
  //                             }
  //                         })

  //                         if (presentStatus === false) {
  //                             status.push("absent")
  //                         }
  //                     }
  //                 }
  //                 else {
  //                     status.push("holiday")
  //                 }
  //             }

  //             setAttendanceStatus(status)
  //             checkDate = checkDate + 1;

  //         }

  //     })

  //     status.map(async (data, index) => {
  //         if (data === 'absent') {
  //             if (((status.length) - (index + 1)) > 1) {
  //                 if (status[index + 1] === 'absent' && status[index + 2] === 'absent') {

  //                     let checkId = [student._id]

  //                 }
  //             }
  //         }
  //     })

  // }

  return (
    <>
      <Header />
      <div className="sidebar-main-container">
        <StudentSlidebar />
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Attandance Sheet</h4>
                </div>
              </div>
              <div className="row attendance-row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <div className="sheet">
                      <div className="Full-atta">
                        <h3>Name:</h3>
                        <h4>{student && student.Name}</h4>
                      </div>
                      <div className="Full-atta">
                        <h3>Course:</h3>
                        <h4>{student && student.Course}</h4>
                      </div>
                      <div className="Full-atta">
                        <h3>Trainer Name:</h3>
                        <h4>{student && student.TrainerName}</h4>
                      </div>
                      <div className="Full-atta">
                        <h3>Batch Time:</h3>
                        <h4>{student && student.BatchTiming}</h4>
                      </div>
                    </div>

                    <div className="start-end-section">
                      <div className="start-section">
                        <select onChange={(e) => setMonth(e.target.value)}>
                          <option disabled selected>
                            --Choose Month--
                          </option>
                          {monthName.map((data,index) => {
                            return <option value={index+1}>{data}</option>;
                          })}
                        </select>
                      </div>

                      <div className="search">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => getAttendance(student)}
                        >
                          Search
                        </button>
                      </div>
                    </div>

                    <table
                      id="datatable"
                      className="table table-striped table-bordered"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          {/* <th scope="col">Action </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {attendenceRows &&
                          attendenceRows.map((data, index) => {
                            return (
                              <tr>
                                <td>{dayRows[index]}</td>
                                <td>{data}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentAttandanceDetails;
