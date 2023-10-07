import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate, useLocation } from 'react-router-dom';
import "./TeacherDemo"
import Header from '../Header';
import Sidebar from '../Sidebar';
import TrainerSlidebar from './TrainerSlidebar';
import { StudentContext } from '../../context/StudentState'

function AllTrainerDemo() {

    const location = useLocation();
    const { demo, demoStudent } = location.state;
    const [demoList, setDemoList] = useState(demo)
    const [demoStudentData, setDemoStudentData] = useState(demoStudent)
    let ContextValue = useContext(StudentContext);

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
    console.log("day",day)
    const month = date.getMonth();
    const year = date.getFullYear() 
 


    return (
        <>
       
            <div className='sidebar-main-container'>
         
            <div className='main-container'>
                <div className="card-body w-80">
                    <div className="table-responsive recentOrderTable">
                    <table id="datatable"  className="table table-striped table-bordered"cellspacing="0" width="100%" >
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">No Of Candidate</th>
                                    <th scope="col">Counsellor</th>
                                    <th scope="col">Trainer</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demoList && demoList.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.Date}</td>
                                            <td>{data.Time}</td>
                                            <td>{demoStudentData[index].length}</td>
                                            <td>{data.CounselorName}</td>
                                            <td>{data.Trainer}</td>
                                            <td><Link to={data.link}><button className='btn btn-primary'>Class Link</button></Link ></td>
                                            <td> <NavLink to={`teacherdemo`}> <button className="btn btn-success" onClick={e=>{localStorage.setItem('demoData',JSON.stringify(demoStudentData[index]))}}  ><RemoveRedEyeIcon /></button></NavLink></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default AllTrainerDemo