import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { StudentContext } from '../../context/StudentState';



export default function Cslidebar() {

    let ContextValue = useContext(StudentContext);
    const navigate = useNavigate();
    const navigation = useNavigate();

    const [counselor, setCounselor] = useState()
    const [message, setMessage] = useState()

    useEffect(()=>{

        getCounsellorStatus()
    

    },[])



    const getCounsellorStatus = async () => {
        console.log("counselor status")
        try {
          const status = await ContextValue.checkCounsellor();
    
          console.log('status of student =',status);
          if (status.status === "active") {
            setCounselor(status.data)
            localStorage.setItem('counselorId',status.data._id)
            receivemessage(status.data._id)
            // receivemessage(status.data._id)
            // localStorage.setItem('studentData', JSON.stringify(status.data))
          }
          else {
            navigation('/')
            alert('you are not authorized')
          }
    
        } catch (error) {
          console.error('Error fetching admin status:', error);
        }
      }

      const receivemessage = async (id) => {
        console.log('counselor receive message')
        const messageRes = await fetch(`http://localhost:8000/receivemessage/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
    
          },
        });
    
        const messageData = await messageRes.json();
        console.log("counselor messageData", messageData.message)
        setMessage(messageData.message)
        console.log("messageData",messageData.message)
      }
    

      const moveToDemo =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/AddDemo', { state: { counselor } });
      }
      const moveToRegister =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/RegisterStudentAdd', { state: { counselor } });
      }
      const moveToRegisterStudent =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/RegisteredStudent', { state: { counselor } });
      }
      const moveToAllDemo =()=>{
        console.log('demo route',counselor)
        navigate('/counselor/AllDemo', { state: { counselor } });
      }

    return (

        <>

            <div className="dlabnav">
                <div className="dlabnav-scroll">
                    <ul className="metismenu" id="menu">
                        <li className="nav-label first">Main Menu</li>
                        <li>
                            <Link className="has-arrow" to={`/counsellor`}> Dashboard</Link>
                        </li>
                        <li>
                            <Link className="has-arrow" to={`/counselor/SendMessage`}>Message</Link>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                <i className="la la-users" />
                                <span className="nav-text">Students</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <Link to="/counselor/AllStudents">All Students</Link>
                                    {/* <a href="AllStudents.jsx">All Students</a> */}
                                </li>
                                <li>
                                    <Link to="/counsellor/AddStudents">Add Students</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                <i className="la la-users" />
                                <span className="nav-text">Register Student</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                <div onClick={moveToRegister} className='light-text'>Register Student Add</div>
                                    {/* <a href="AllStudents.jsx">All Students</a> */}
                                </li>
                                <li>
                                <div onClick={moveToRegisterStudent} className='light-text'>Register Student Table</div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div onClick={moveToDemo} className='light-text'> <span className="nav-text">Demo</span></div>


                        </li>
                        <li>
                        <div onClick={moveToAllDemo} className='light-text'> <span className="nav-text">All Demo</span></div>
                        </li>

                    </ul>
                </div>
            </div>

        </>

    )
}
