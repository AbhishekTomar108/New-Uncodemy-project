import React, { useEffect, useState, useContext } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { StudentContext } from '../../context/StudentState';
import { NavLink, useNavigate } from 'react-router-dom';

function NewBatch() {
    let ContextValue = useContext(StudentContext);
    const [trainer, setTrainer] = useState()
    const [batchCourse, setBatchCourse] = useState()
    const [allbatchTime, setAllBatchTime] = useState()
    const [Days, setDays] = useState()
    const [totalMonth, setTotalMonth] = useState()
    const [currentTrainer, setCurrentTrainer] = useState();
    const [runningbatchTrainerData, setRunningbatchTrainerData] = useState();
    const [addBatch, setAddBatch] = useState(false)

    const [batchDetail, setBatchDetail] = useState({
        "trainer": '',
        "course": '',
        "month": '',
        "daysName": '',
        "batchTime": '',
        "TrainerID": ''
    })

    let trainerData = {}
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const navigation = useNavigate()
    useEffect(() => {

        fetchAdminStatus()
        console.log('use effect running')
    }, [])

    async function fetchAdminStatus() {
        try {
            const status = await ContextValue.checkAdmin();

            console.log('status of admin =', status);
            if (status.status === "active") {
                getTrainer()
            }
            else {
                navigation('/')
                alert('you are not authorized')
            }

        } catch (error) {
            console.error('Error fetching admin status:', error);
        }
    }

    const updateTrainer = async (trainerName) => {
        console.log('trainer update ', trainerData[trainerName])
        let trainerCode = trainer.filter(data => {
            return data.Name === trainerName
        })[0].code
        setBatchDetail({ ...batchDetail, ["trainer"]: trainerCode, ["TrainerID"]: trainerData[trainerName] })
        getCourses(trainerName)
        getRunningBatchTrainer(trainerName)
    }


    const getRunningBatchTrainer = async (trainerName) => {

        try {
            let runningTrainer = await fetch('http://localhost:8000/getRunningBatchTrainer', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trainerName: trainerName })
            })
            runningTrainer = await runningTrainer.json()
            runningTrainer = runningTrainer.runningbatchTrainer
            setRunningbatchTrainerData(runningTrainer)


        }
        catch (error) {
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

    const getCourses = async (trainerName) => {
        let tempcurrentTrainer = trainer.filter(data => {
            return data.Name === trainerName
        })

        setCurrentTrainer(tempcurrentTrainer)

        setBatchCourse(tempcurrentTrainer[0].Course)
        setTrainer(tempcurrentTrainer)

    }

    const updateBatch = (batchName) => {
        let course = '';
        let splitCourse = batchName.split(' ')
        if (splitCourse.length > 1) {
            splitCourse.map(data => {
                course = `${course}${data[0]}`
            })
        }

        else {
            course = splitCourse[0]
        }

        setTotalMonth(month)
        setBatchDetail({ ...batchDetail, ["course"]: course })
    }

    const updateDays = (e) => {
        setDays(e)
        let day = e === "weekDaysBatch" ? "WeekDays" : "WeekEnd"
        setBatchDetail({ ...batchDetail, ["daysName"]: day })
        let batch = e === "weekDaysBatch" ? currentTrainer[0].weekDaysBatch : currentTrainer[0].WeekEndBatch
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
            setAllBatchTime(tempBatchTime)
        }
        else {
            tempBatchTime = batch.map(data=>{
                return { disabled: false, batchTime: data }
             })
             setAllBatchTime(tempBatchTime)
        }


    }

    const updatebatchTime = (batchTime) => {
        setAddBatch(true)
        setBatchDetail({ ...batchDetail, ["batchTime"]: batchTime })

    }

    const addNewBatch = async () => {
        console.log('add new batch =', runningbatchTrainerData, batchDetail)


        let count = 1;

        runningbatchTrainerData.map(data => {
            let dataSplit = data.Batch.split('/')
            if (dataSplit[0] === batchDetail.course) {
                if (dataSplit[2] === batchDetail.month) {
                    count = count + 1;
                    console.log('count= ', count)
                }
            }
        })
        let batch = `${batchDetail.course}/${new Date().getFullYear()}/${batchDetail.month}/${batchDetail.trainer}/${count}`
        console.log('new batch =', batch, batchDetail, currentTrainer)

        let addedNewBatch = await fetch('http://localhost:8000/addNewBatch', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Batch: batch, Trainer: currentTrainer[0].Name, BatchTime: batchDetail.batchTime, Days: batchDetail.daysName, TrainerID: batchDetail.TrainerID })
        })

        addedNewBatch = await addedNewBatch.json()
        console.log('added batch =', addedNewBatch)

    }

    const updateMonth = (month) => {
        setDays('true')
        setBatchDetail({ ...batchDetail, ["month"]: month })
    }
    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
                <Sidebar />
                <div className="row new-batch">
                    <div className="col-xl-12 col-xxl-12 col-sm-12">
                        <div className="card w-80">
                            <div className="card-header batch">
                                <h1 >Add New Batch</h1>
                            </div>
                            <div className="card-body">
                                <form action="#" method="post">
                                    <div className="row new-batch-row">


                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Trainer</label>
                                                {trainer && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    class="form-control"
                                                    onChange={e => updateTrainer(e.target.value)}
                                                >
                                                    <option disabled selected>--select Trainer--</option>
                                                    {trainer.map((data, index) => {
                                                        console.log("trainer data =", data.Name)
                                                        trainerData[data.Name] = data._id
                                                        return (
                                                            <option value={data.Name}>{data.Name}</option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                                }
                                            </div>
                                        </div>

                                        {batchCourse && <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">

                                                <>
                                                    <label className="form-label">Batch</label>
                                                    {batchCourse && <select
                                                        id="exampleInputPassword1"
                                                        type="select"
                                                        name="Course"
                                                        class="form-control"
                                                        onChange={e => updateBatch(e.target.value)}
                                                    >
                                                        <option selected disabled>----Select Course ------</option>
                                                        {batchCourse && batchCourse.map(data => {

                                                            return (
                                                                <>
                                                                    <option value={data}>{data}</option>
                                                                </>
                                                            )
                                                        })

                                                        }

                                                    </select>}
                                                </>

                                            </div>
                                        </div>
                                        }
                                        {totalMonth && <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label className="form-label">Starting Month</label>
                                                {month && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    name="Course"
                                                    class="form-control"
                                                    onChange={e => updateMonth(e.target.value)}
                                                >
                                                    <option disabled selected>--select Month--</option>
                                                    {month.map((data, index) => {
                                                        let monthNumber = index + 1 < 10 ? `0${index + 1}` : index + 1
                                                        return (
                                                            <option value={monthNumber}>{data}</option>
                                                        )
                                                    })
                                                    }
                                                </select>}
                                            </div>
                                        </div>}
                                        <div className="col-lg-6 col-md-6 col-sm-12">

                                            {Days && <div className="form-group">
                                                <label className="form-label">Days</label>
                                                <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    name="Course"
                                                    class="form-control"
                                                    onChange={e => { updateDays(e.target.value) }}
                                                >
                                                    <option disabled selected>--select Days--</option>
                                                    <option value="weekDaysBatch">WeekDays</option>
                                                    <option value="WeekEndBatch">WeekEnd</option>

                                                </select>
                                            </div>}
                                            {Days === "weekDaysBatch" && <div className="form-group">
                                                <label className="form-label">WeekDays Batch</label>
                                                {allbatchTime && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    name="Course"
                                                    class="form-control"
                                                    onChange={e => updatebatchTime(e.target.value)}
                                                >
                                                    <option disabled selected>--select WeekDays Batch--</option>
                                                    {allbatchTime.map((data, index) => {

                                                        return (
                                                            <option value={data.batchTime} disabled={data.disabled}>{data.batchTime}</option>
                                                        )
                                                    })
                                                    }
                                                </select>}
                                            </div>}
                                            {Days === "WeekEndBatch" && <div className="form-group">
                                                <label className="form-label">WeekEnd Batch</label>
                                                {allbatchTime && <select
                                                    id="exampleInputPassword1"
                                                    type="select"
                                                    name="Course"
                                                    class="form-control"
                                                    onChange={e => updatebatchTime(e.target.value)}
                                                >
                                                    <option disabled selected>--select WeekEnd Batch--</option>
                                                    {allbatchTime.map((data, index) => {

                                                        return (
                                                            <option value={data.batchTime} disabled={data.disabled}>{data.batchTime}</option>
                                                        )
                                                    })
                                                    }
                                                </select>}
                                            </div>}
                                        </div>

                                    </div>
                                </form>

                                {addBatch && <button className='add-batch-btn' onClick={addNewBatch}>Add Batch</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBatch