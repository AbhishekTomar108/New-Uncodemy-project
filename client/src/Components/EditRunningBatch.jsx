import React, {useEffect, useState} from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

const EditRunningBatch = () => {

    const [trainer, setTrainer] = useState()
    const location = useLocation()
    const {runningBatch}  = location.state
    console.log("running batch =",runningBatch)

    const [inpval, setINP] = useState({
        Trainer: runningBatch.Trainer,    
        TrainerID:runningBatch.TrainerID,
        Batch: runningBatch.Batch,
        BatchTime: runningBatch.BatchTime,
        Days: runningBatch.Days,
      });

      useEffect(()=>{
        getTrainer()
      },[])

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

    const updateTrainer = async (e) => {
        console.log('index =',e.target.selectedIndex,trainerData)
      
        setINP({ ...inpval, ["Trainer"]: e.target.value, ["TrainerID"]: trainerData[e.target.selectedIndex] })
    
    }

    const editBatch = async()=>{
        
        console.log('inp val =',inpval)
    }

  return (
    <>

<Header />
      <div className='sidebar-main-container c-gap-40'>
        <Sidebar />
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
                                                    onChange={e => updateTrainer(e)}
                                                >
                                                    <option disabled selected>--select Trainer--</option>
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
                  <input type="email" value={inpval.BatchTime} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="Email" class="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label className="form-label">Days</label>
                  <input type="text" value={inpval.Days} onChange={e => setINP({ ...inpval, [e.target.name]: e.target.value })} name="CompanyName" class="form-control" id="exampleInputPassword1" />
                </div>
              </div>
              
              

        <button className='btn btn-primary mx-2' onClick={editBatch}>Edit Batch</button>
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