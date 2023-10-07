import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { StudentContext } from '../context/StudentState';
import Swal from 'sweetalert2'

// import Home from '../Components/Home'
// import Header from '../Components/Header'

export default function AllBatchTiming() {

  const location = useLocation();
  const { weekDays, weekEnd } = location.state;
  let time=''

  let ContextValue = useContext(StudentContext);
  document.title = "StudentDashboard - All Student"
  const navigation = useNavigate()

  const addBatchTime = ()=>{
    Swal.fire({
        title: 'Enter New Batch Timing',
        html: '<input type="time" id="timeInput" class="swal2-input">',
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const timeInput = document.getElementById('timeInput');
            const selectedTime = timeInput.value;
            time = formatTime(selectedTime)
          },
        
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        console.log("time =",time)
        addBatch(time)
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value}`,
            
            imageUrl: result.value.avatar_url
          })
        }
      })
  }


  const addBatch = async(time)=>{
    let tempWeekDays = weekDays
    tempWeekDays.push(time)
    console.log('all batch =',tempWeekDays)

    // let newBatch = await fetch("http://localhost:8000/addNewBatchTime", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({"weekDays":tempWeekDays})
    //   });

  }

  const formatTime = (time)=>{
    

// Split the time string into hours and minutes
const [hours, minutes] = time.split(':');

// Create a Date object and set the hours and minutes
const date = new Date();
date.setHours(parseInt(hours, 10));
date.setMinutes(parseInt(minutes, 10));

// Format the time with AM/PM
const formattedTime = date.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});

console.log(formattedTime);
return formattedTime
  }

  return (

    <>

      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />

        <div className="content-body" style={{ minWidth: "876px" }}>
          {/* row */}
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Batch Time</h4>
                </div>
              </div>
             
            </div>
            <div className="row">
              <div className="col-lg-12">

              </div>
              <div className="col-lg-12">
                <div className="row tab-content">
                  <div id="list-view" className="tab-pane fade active show col-lg-12">
                    <div className="card w-80">
                      <div className="card-header">
                        <h4 className="card-title">All Batch List</h4>
                        <button className='btn btn-primary' onClick={addBatchTime}>Add New Timing</button>

                      </div>




                      <div class="container">

                        <div class="row">

                          <div class="col-md-12">


                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>Time</th>
                             
                                 
                                </tr>
                              </thead>



                              <tbody>
                                {weekDays && weekDays.map((data, index) => {

                                  return (
                                    <tr>

                                      <td>{index + 1}</td>
                                      <td>{data}</td>
                                      

                                    </tr>
                                  )
                                })
                                }

                              </tbody>
                            </table>


                          </div>
                        </div>
                      </div>










                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>






  )
}
