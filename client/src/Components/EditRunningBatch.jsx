import React, {useEffect, useState} from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'


const EditRunningBatch = () => {

    const [trainer, setTrainer] = useState()
    const location = useLocation()
    const [Days, setDays] = useState("weekDaysBatch")
    const [allbatchTime, setAllBatchTime] = useState()
    const {runningBatch}  = location.state
    console.log("running batch =",runningBatch)
    const [editStatus, setEditStatus] = useState(false)
    const [currentTrainer, setCurrentTrainer] = useState();
    const [batchCourse, setBatchCourse] = useState()
    const [runningbatchTrainerData, setRunningbatchTrainerData] = useState();

    const [inpval, setINP] = useState({
        Trainer: runningBatch.Trainer,    
        TrainerID:runningBatch.TrainerID,
        Batch: runningBatch.Batch,
        BatchTime: runningBatch.BatchTime,
        Days: runningBatch.Days,
      });

      const [batchDetail, setBatchDetail] = useState({
        "trainer": '',
        "course": '',
        "month": '',
        "daysName": '',
        "batchTime": '',
        "TrainerID": '',
        "courseName":''
    })

      useEffect(()=>{
        getTrainer()
      },[])


      const getCourses = async (trainerData) => {
        // let tempcurrentTrainer = trainer.filter(data => {
        //     return data.Name === trainerName
        // })

        setCurrentTrainer(trainerData)

        setBatchCourse(trainerData.Course)
    
        // setTrainer(trainerData)

    }


    const setAvailableBatchTime = (runningbatchTrainerData,trainerData)=>{
      console.log('current trainer =',trainerData)
      let day = Days === "weekDaysBatch" ? "WeekDays" : "WeekEnd"

      let batch = Days === "weekDaysBatch" ? trainerData.weekDaysBatch : trainerData.WeekEndBatch
      let daysBatchTime = runningbatchTrainerData.filter(data => {
          return data.Days === day
      }).map(element => {
          return element.BatchTime
      })
      let tempBatchTime = [];
      if (daysBatchTime.length !== 0) {
          tempBatchTime = batch.map(data => {
              let runningBatchStatus = false;
              daysBatchTime.map(element => {
                  if (data === element) {
                      runningBatchStatus = true;
                  }
              })
              return runningBatchStatus === false ? { disabled: false, batchTime: data } : { disabled: true, batchTime: data }

          })
          console.log('batch time =',tempBatchTime)
          setAllBatchTime(tempBatchTime)
      }
      else {
          tempBatchTime = batch.map(data=>{
              return { disabled: false, batchTime: data }
           })
          console.log('batch time =',tempBatchTime)

           setAllBatchTime(tempBatchTime)
      }


  }
    
    const getRunningBatchTrainer = async (trainer) => {

      try {
          let runningTrainer = await fetch('http://localhost:8000/getRunningBatchTrainer', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ TrainerID: trainer._id })
          })
          runningTrainer = await runningTrainer.json()
          runningTrainer = runningTrainer.runningbatchTrainer
          
          setRunningbatchTrainerData(runningTrainer)
          setAvailableBatchTime(runningTrainer,trainer)


      }   
      catch (error) {
          console.log('error =',error.message)
          alert('sorry some error occured try again later')
      }
  }


      const getTrainer = async () => {
        const res = await fetch("http://localhost:8000/trainer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        setTrainer(data)
    }

    let trainerData = []

    const updateTrainer = async (index) => {
      console.log('trainer update ',index, trainer[index].code,trainer[index].Name)
      // let trainerCode = trainer.filter(data => {
      //     return data._id === trainerData[trainerName]
      // })[0].code
      setCurrentTrainer(trainer[index])
      setBatchDetail({ ...batchDetail, ["trainer"]: trainer[index].code, ["TrainerID"]: trainer[index]._id })
      getCourses(trainer[index])
      getRunningBatchTrainer(trainer[index])
  }

  return (
    <>

<Header />
      <div className='sidebar-main-container c-gap-40'>
        <Sidebar />
    <div className="row right-side-container">
    <div className="col-xl-12 col-xxl-12 col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Basic Info</h5>
        </div>
        <div className="card-body w-80">
          <form action="#" method="post">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label className="form-label">Batch</label>
                  <input type="text" value={inpval.Batch} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Name" class="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Trainer</label>
                                                {trainer && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    class="form-control"
                                                    value={inpval.Trainer}
                                                    disabled = {editStatus===false?true:false}
                                                    onChange={e => updateTrainer(e)}
                                                >
                                                    <option disabled = {editStatus===false?true:false} selected>--select Trainer--</option>
                                                    {trainer.map((data, index) => {
                                                        console.log("trainer data =", data.Name)
                                                        trainerData[index+1] = data._id
                                                        return (
                                                            <option value={data.Name}>{data.Name}</option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                                }
                                            </div>
                                        </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label className="form-label">Batch Time</label>
                  <input type="email" value={inpval.BatchTime} disabled = {editStatus===false?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Email" class="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label className="form-label">Days</label>
                  <input type="text" value={inpval.Days} disabled = {editStatus===false?true:false} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="CompanyName" class="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              
              

        <button className='btn btn-primary mx-2' onClick={e=>setEditStatus(true)}>Edit Batch</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
  )
}

export default EditRunningBatch