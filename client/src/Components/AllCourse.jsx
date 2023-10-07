import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate, useLocation  } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { StudentContext } from '../context/StudentState';
import Swal from 'sweetalert2'

// import Home from '../Components/Home'
// import Header from '../Components/Header'

export default function AllCourse() {

  const location = useLocation();
  const { course } = location.state;
  console.log("all student =",course)

  let ContextValue = useContext(StudentContext);
  document.title = "StudentDashboard - All Student"
  const navigation = useNavigate()

  const addCourse = ()=>{
    Swal.fire({
        title: 'Enter New Course Name',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            addNewCourse(result.value)
          Swal.fire({
            title: `${result.value}`,
            
            imageUrl: result.value.avatar_url
          })
        }
      })
  }

  const addNewCourse = async(courseData)=>{

    course.push(courseData)
    console.log("course route =",course)
    let newCourse = await fetch("http://localhost:8000/addNewCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"course":course})
      });
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
                  <h4>All Course</h4>
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
                        <h4 className="card-title">All Course List</h4>
                        <button className='btn btn-primary' onClick={addCourse}>Add New Course</button>

                      </div>




                      <div class="container">

                        <div class="row">

                          <div class="col-md-12">


                            <table id="datatable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>Course</th>
                             
                                 
                                </tr>
                              </thead>



                              <tbody>
                                {course && course.map((data, index) => {

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
