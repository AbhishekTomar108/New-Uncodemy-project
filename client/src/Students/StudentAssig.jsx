import React, { useState } from 'react'
import Header from '../Components/Header'
import AssignmentStatus from './AssignmentStatus'
import Assignment from './Assignment'
import VideoAssignment from './VideoAssignment'
import StudentSlidebar from './StudentSlidebar'
import StudentNotes from './StudentNotes'


function StudentAssig() {

    const [status, setStatus] = useState("Assignment")
    const [assignment, setAssignment] = useState("pending")
    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
        <StudentSlidebar />
            <div className="Assignment-section">
          
                <div className="card-header j-c-initial">
                <button class="btn btn-outline-dark" onClick={e => setStatus("Assignment")}>Assignment</button>
                <button class="btn btn-outline-dark" onClick={e => setStatus("Notes")}>Notes</button>
                <button class="btn btn-outline-dark" onClick={e => setStatus("Video")}>Video</button>
               
              </div>
                {status === "Assignment" && <div>
                    <ul className="nav nav-tabs" >
                        <li className="nav-item" >
                            <a
                                onClick={e => setAssignment("pending")}
                                data-toggle="tab"
                                className="nav-link active show"
                            >
                                Pending Assignment
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                onClick={e => setAssignment("submitted")}
                                data-toggle="tab"
                                className="nav-link"
                            >
                                Submitted Assignment
                            </a>
                        </li>
                    </ul>


                    {assignment === "pending" ? <Assignment />
                        : <AssignmentStatus />}
                </div>
                }
                  {status === "Notes" && <StudentNotes/>}
                {status === "Video" && <VideoAssignment/>}
            </div>
            </div>
        </>
    )
}

export default StudentAssig