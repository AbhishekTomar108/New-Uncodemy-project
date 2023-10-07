import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

function RunningBatchStudent() {
  const [allStudentData, setAllStudent] = useState();
  const [currentStudent, setCurrentStudent] = useState();

  useEffect(()=>{
    let  SelectedBatch = localStorage.getItem('selectedRunningBatch')

    console.log("SelectedBatch",SelectedBatch)
    
      const filterStudent = JSON.parse(localStorage.getItem('allStudent')).filter(data => {
        return data.Batch === SelectedBatch;
      });
    console.log("filterStudent",filterStudent)
    setAllStudent(filterStudent);
    setCurrentStudent(filterStudent);
  },[])

  const fetchQueryData = (Query) => {
   

    let filterQueryData = allStudentData.filter(data => {
      console.log('data name =', data, data.Name, Query)
      return (data.Name.toLowerCase().includes(Query.toLowerCase()))||(data.EnrollmentNo.toLowerCase().includes(Query.toLowerCase()) )
    })

    
    console.log('filter query - ', filterQueryData)
    setCurrentStudent(filterQueryData)
  }
  

  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
          <Sidebar />
          <div className="card-body fee-detail">

          <div class="d-flex my-2" role="search">
                    <input class="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      name='search'
                      onChange={(e) => fetchQueryData(e.target.value)}
                    />
                    {/* <button class="btn btn-outline-dark" type="submit" onClick={fetchQueryData}>Search</button> */}

                  </div>
        <div className="table-responsive recentOrderTable ">
          <table
            id="datatable"
            className="table table-striped table-bordered "
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th scope="col">Enrollment No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Course</th>
                <th scope="col">Trainer</th>
                <th scope="col">Batch Time</th>
                <th scope="col">Counselor</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent &&
                currentStudent.map((data, index) => {
                  return (
                    <tr>
                      <td>{data.EnrollmentNo}</td>
                      <td>{data.Name}</td>
                      <td>{data.email}</td>
                      <td>{data.Course}</td>
                      <td>{data.TrainerName}</td>
                      <td>{data.BatchTiming}</td>
                      <td>{data.Counselor}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        </div>
        </div>
      
    </>
  );
}

export default RunningBatchStudent;
