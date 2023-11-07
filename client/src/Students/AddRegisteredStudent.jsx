import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import Swal from 'sweetalert2'
import { StudentContext } from '../context/StudentState';


export default function AddRegisteredStudent
  () {

    const location = useLocation();
    const { data } = location.state;

  document.title = "StudentDashboard - Add Student"
  let ContextValue = useContext(StudentContext);
  const navigation = useNavigate()

  const [allBatch, setAllBatch] = useState([])
  const [runningBatch, setRunningBatch] = useState()
  const [selectedRunningBatch, setSelectedRunningBatch] = useState()
  const [trainer, setTrainer] = useState('')
  const [counselor, setCouselor] = useState()
  let counselorData = {}
  let trainerData   = {}

  useEffect(() => {
    fetchAllBatchCourse();
    fetchRunningBatch();
    fetchAllCounselor();
  }, [])

  const fetchAllCounselor = async () => {
    const counselorData = await ContextValue.getAllCounselor();

    if (counselorData.status === "active") {
      setCouselor(counselorData.counselorData)

    }
  }


  async function fetchRunningBatch() {
    try {
      const status = await ContextValue.getRunningBatch();

      if (status.status === "active") {

        setRunningBatch(status.runningBatches)
        setSelectedRunningBatch(status.runningBatches)
      }
      else {

      }

    } catch (error) {
      // console.error('Error fetching admin status:', error);
    }
  }

  async function fetchAllBatchCourse() {
    try {
      const status = await ContextValue.getAllBatchCourse();


      if (status.status === "active") {

        setAllBatch(status.batchCourse[0].Course)
      }
      else {

      }

    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  }

  var length = 8,
    charset = "abcdefghijklmnop.,qrstuvwx$%yzABCDEF.,'908*&+GHIJKLMN@#$%!,OPQ!@RSTUVWXY0123456789",
    randomGeneratedPassowrd = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    randomGeneratedPassowrd += charset.charAt(Math.floor(Math.random() * n));
  }

  // const { udata, setUdata } = useContext(adddata);
  const navigate = useNavigate();

  const [inpval, setINP] = useState({
    Name: data.Name,
    Batch: '',
    email: data.Email,
    Number: data.Number,
    Pname: data.Pname,
    Pnumber: data.Pnumber,
    RegistrationDate: data.RegistrationDate,
    Course: data.Course,
    Counselor: data.Counselor,
    Fees: '',
    totalInstallment:4,
    RegistrationFees: data.RegistrationFees,
    TrainerName: data.TrainerName,
    BatchStartDate: '',
    BatchTiming: '',
    BatchMode: data.BatchMode,
    Payment: '',
    Remark: "",
    status: 'active',
    password: randomGeneratedPassowrd,
    Days: '',
    file: null,
    TrainerID:data.TrainerId,
    RegistrationNo:data.RegistrationNo,
    CounselorID:data.CounselorId,
    url: '' // Add a file state
  });



  const handleFileChange = (e) => {
    // console.log("file =", e.target.files[0])
    setINP({ ...inpval, file: e.target.files[0] });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    console.log('inpval add student =',inpval)

    const formData = new FormData();

    for (const field in inpval) {
      formData.append(field, inpval[field]);
    }

    let remainingFees  =(inpval.Fees - inpval.RegistrationFees)
    formData.append("remainingFees", remainingFees);
    console.log('inpval ', inpval,remainingFees)
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)
    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formData,
      });
      
      ContextValue.updateProgress(60)
      const data = await res.json();
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
   
      
      if (res.status === 422 || !data) {
        Swal.fire({   
          icon:  'error',
          title: 'Oops...',
          text:  'Something went wrong!',
        })

        alert('error');
      }
       else {
        RegisteredSuccess()
        let tempInpval = inpval
        for (const field in inpval) {
          tempInpval[field]="";
        }
        setINP(tempInpval)
      }
    }
    catch (error) {
      Swal.fire({   
        icon:  'error',
        title: 'Oops...',
        text:  'Something went wrong!',
      })
      console.log('error =', error.message)
    }
  };

  const RegisteredSuccess= ()=>{

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Student Has Been Added',
    showConfirmButton: false,
    timer: 1500
  })
}

  const setCourse = (name, value) => {
    setINP({ ...inpval, [name]: value })

    let splitCourse = value.split(' ');
    let shortCourse = '';
    splitCourse.map(data => {
      shortCourse = `${shortCourse}${data[0]}`
    })

    let tempRunningBatch = runningBatch.filter(data => {

      return shortCourse === (data.Batch.split('/')[0])
    })


    setSelectedRunningBatch(tempRunningBatch)
  }

  const setBatch = async (name, value) => {

    setINP({ ...inpval, [name]: value })

    let tempTrainer = selectedRunningBatch.filter(data => {
      return data.Batch === value ? data : false
    })
    setTrainer(tempTrainer[0].Trainer)
    console.log("temp trainer =",tempTrainer)

    let tempInpval = { ...inpval }
    tempInpval.TrainerName = tempTrainer[0].Trainer
    tempInpval.BatchTiming = tempTrainer[0].BatchTime
    tempInpval.Batch = tempTrainer[0].Batch
    tempInpval.TrainerID = tempTrainer[0].TrainerID
    setINP(tempInpval)
  }

  const setCounselor = (name)=>{
    let tempInpval = { ...inpval }
    tempInpval.Counselor = name
    tempInpval.CounselorID = counselorData[name]
    console.log("counselor id =",counselorData[name])
    console.log('set counselor =',name,counselorData,counselorData[name],tempInpval)
    setINP(tempInpval)
  }

  const handleRemarkChange = (e) => {
    const newRemark = e.target.value;

    let tempInpVal = {...inpval}
    tempInpVal.Remark = newRemark
    console.log("temp val =",tempInpVal)

    setINP(tempInpVal)
  };

  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
      <Sidebar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Add Student</h4>
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
              <div className="card p-20">
                <div className="card-header">
                  <h5 className="card-title">Basic Info</h5>
                </div>
                <div>
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Name</label>
                          <input required type="text" disabled value={inpval.Name} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Number</label>
                          <input required type="number" disabled value={inpval.Number} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Number" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input required type="email" disabled value={inpval.email} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="email" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Guardian's Name</label>
                          <input required type="text" disabled value={inpval.Pname} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Pname" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Guardian's Number</label>
                          <input required type="number" disabled value={inpval.Pnumber} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Pnumber" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch Starting Date</label>
                          <input required type="date" value={inpval.BatchStartDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="BatchStartDate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Registraion No.</label>
                          <input required type="text" disabled value={inpval.RegistrationNo} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="RegistrationDate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Registraion Date</label>
                          <input required type="date" disabled value={inpval.RegistrationDate} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="RegistrationDate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Course</label>
                          {allBatch.length !== 0 && <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Course"
                            class="form-control"
                            disabled
                           value={inpval.Course}
                            // value={inpval.Course}
                            onChange={e => setCourse(e.target.name, e.target.value)}>
                            <option disabled selected>--select Course--</option>
                           { allBatch.map((data, index) => {

                              return (
                                <>
                                  <option value={data} key={index}>{data}</option>
                                </>
                              )


                            })}

                          </select>
  }
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch</label>
                          {selectedRunningBatch &&   <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Batch"
                            class="form-control"
                          
                            // value={inpval.Course}
                            onChange={e => setBatch(e.target.name, e.target.value)}>
                            <option disabled selected>--select Batch--</option>
                            { selectedRunningBatch.map(data => {
                  
                              return (
                                <option value={data.Batch}>{data.Batch}</option>

                              )
                            })}

                          </select>
  }
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Days</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Days"
                            class="form-control"
                           
                            // value={inpval.Course}
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Days--</option>
                            <option value="WeekDays">WeekDays</option>
                            <option value="WeekEnd">WeekEnd</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Couselor</label>
                          {counselor &&   <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Counselor"
                            class="form-control"
                            value={inpval.Counselor}
                            disabled
                            onChange={e => setCounselor(e.target.value)}>
                            <option disabled selected>--select Counselor--</option>
                            
                            {counselor.map(data => {
                              counselorData[data.Name] = data._id
                              return (
                                <option value={data.Name}>{data.Name}</option>
                              )
                            })}

                          </select>
                            }
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Fees</label>
                          <input required type="text" value={inpval.Fees} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Fees" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Select No. of Installment</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="totalInstallment"
                            class="form-control"
                            value={inpval.totalInstallment}
                            onChange={e => setINP({ ...inpval, [e.target.name]: parseInt(e.target.value) })}>
                            <option disabled>--Select Total Installment--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Trainer Name </label>
                          <input required type="text" disabled value={inpval.TrainerName} name="TrainerName" onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} readonly={true} class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Registration Fees</label>
                          <input required type="text" disabled value={inpval.RegistrationFees} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="RegistrationFees" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>



                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Batch mode</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="BatchMode"
                            class="form-control"
                    
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Batch Mode--</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="form-label">Payment Mode</label>
                          <select required
                            id="exampleInputPassword1"
                            type="select"
                            name="Payment"
                            class="form-control"
                            onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })}>
                            <option disabled selected>--select Payment--</option>
                            <option value="online">EMI</option>
                            <option value="offline">Installment</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group fallback w-100">
                          <label className="form-label">Remark</label>
                          <input required type="text" onChange={handleRemarkChange} name="Remark" class="form-control" id="exampleInputPassword1" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group fallback w-100">
                        <label className="form-label">Attachment</label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            name="file"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
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
