import { useState, useHistory } from "react";
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function AddTrainer() {

  document.title = "StudentDashboard - Add Trainer"


  const navigate = useNavigate();


  const [inpval, setINP] = useState({
    TrainerName: '',
    trainernumber: '',
    traineremail: '',
    password: '',
    Company: '',
    Linkdin: '',
    Headline: '',
    address: '',
    bio: '',
    file: null, // Add a file state
  });

  const handleFileChange = (e) => {
    console.log("file =", e.target.files[0])
    setINP({ ...inpval, file: e.target.files[0] });
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const field in inpval) {
      formData.append(field, inpval[field]);
    }

    try {
      const res = await fetch('http://localhost:8000/AllTrainer', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log("Data", data)
    }
    catch (error) {
      console.log('error =', error.message)
    }
  };
  return (
    <>
    <Header/>
    <div className='sidebar-main-container'>
    <Sidebar/>
    
      
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add Trainer</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="javascript:void(0);">Students</a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="javascript:void(0);">Add Student</a>
                </li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Basic Info</h5>
                </div>
                <div className="card-body">
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input type="text" value={inpval.Name} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Number</label>
                          <input type="number" value={inpval.Number} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Number" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input type="email" value={inpval.Email} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Email" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Company Name Working</label>
                          <input type="text" value={inpval.CompanyName} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="CompanyName" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">LinkedIn</label>
                          <input type="text" value={inpval.LinkdinId} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="LinkdinId" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Headline</label>
                          <input type="text" value={inpval.Headline} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Headline" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Bio</label>
                          <input type="text" value={inpval.bio} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="bio" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <textarea
                            value={inpval.address}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}
                            name='address'
                            className="form-control"
                            rows={5}

                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group fallback w-100">
                          <input
                            type="file"
                            className="dropify"
                            name="file"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <button type="submit" onClick={addinpdata} className="btn btn-primary">
                          Submit
                        </button>
                        <button type="submit" className="btn btn-light">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
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
