import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllStudents from '../Students/AllStudents'
import AddStudents from '../Students/AddStudents'
import EditStudents from '../Students/EditStudents'
import AboutStudent from '../Students/AboutStudent'
import StudentLogout from '../Students/StudentLogout'
import AssignmentStatus from '../Students/AssignmentStatus'
import StudentAttandanceDetails from '../Students/StudentAttandanceDetails'
import AllTrainer from './Trainers/AllTrainer'
import TeacherDemo from './Trainers/TeacherDemo'
import DemoOverview from './Trainers/DemoOverview'
import AddTrainer from './Trainers/AddTrainer'
import TrainerAssignment from './Trainers/TrainerAssignment'
import EditTrainer from './Trainers/EditTrainer'
import AboutTrainer from './Trainers/AboutTrainer'
import SendMessage from './SendMessage'
import CounselorDashboard from './Counselor/CounselorDashboard'
import CAllStudents from './Counselor/CAllStudents'
import CAddCounselor from './Counselor/CAddStudents'
import Demo from './Counselor/AddDemoStudent'
import CsendMessage from './Counselor/CsendMessage'
import SendMessages from './Counselor/SendMessages'
import Cslidebar from './Counselor/Cslidebar'
import { useContext } from 'react';
import { StudentContext } from '../context/StudentState';
import StudentState from '../context/StudentState'
import Assignment from '../Students/Assignment'
import './style.css'
import LogIn from '../Students/LogIn'
import Forget from '../Students/Forget'
import Newpassword from '../Students/NewPassword'
import StudentSlidebar from '../Students/StudentSlidebar'
import Attandance from './Trainers/Attandance'
import AttandanceSheet from './Trainers/AttandanceSheet'
import StudentAttandance from './Trainers/StudentAttandance'
import AttendanceDetail from './Trainers/AttendanceDetail'
import TrainerMessage from './Trainers/TrainerMessage'
import StudentMessage from '../Students/StudentMessage'
import NewBatch from './Counselor/NewBatch'
import RunningBatches from './RunningBatches'
import RegisteredStudent from './RegisteredStudent'
import RegisterStudentAdd from './Counselor/RegisterStudentAdd'
import EditRegisteredStudent from './Counselor/EditRegisteredStudent'
import StudentDashboard from '../Students/StudentDashboard'
import TrainerDashboard from './Trainers/TrainerDashboard'
import FeeTable from '../Fees/FeeTable'
import EditFee from '../Fees/EditFee'
import Addfee from '../Fees/Addfee'
import AllMessage from '../Students/AllMessage'
import ReadMessage from '../Students/ReadMessage'
import AllCounselor from './Counselor/AllCounselor'
import AboutCounselor from './Counselor/AboutCounselor'
import RunningBatchStudent from './Trainers/RunningBatchStudent'
import StudentAssig from '../Students/StudentAssig'
import FeeRecipt from '../Fees/FeeRecipt'
import FeeDetails from '../Fees/FeeDetails'
import EmbedGoogleMeet from '../Components/EmbedGoogleMeet'
import NewStudent from '../Students/NewStudent'
import TrainerRunningBatch from './Trainers/TrainerRunningBatch'
import TrainerCourse from './Trainers/TrainerCourse'
import OldStudent from './OldStudent'
import OldBatches from './OldBatches'
import AllDemo from './Counselor/AllDemo'
import Swal from 'sweetalert2'
import DemoStudent from './Counselor/DemoStudent'
import EditDemoStudent from './Counselor/EditDemoStudent'
import CounselorRegisteredStudent from './Counselor/CounselorRegisteredStudent'
import AllTrainerDemo from './Trainers/AllTrainerDemo'
import NewDemo from './Trainers/NewDemo'
import TrainerStudent from './Trainers/TrainerStudent'
import EditCounselor from './Counselor/EditCounselor'
import TotalRegistrationStudent from '../Students/TotalRegistrationStudent'
import AddRegisteredStudent from '../Students/AddRegisteredStudent'
import ViewFee from '../Fees/ViewFee'
import FeesData from '../Students/FeesData'
import RegisterChart from '../Students/RegisterChart'
import ShowDemo from './ShowDemo'
import UpcomingDemo from './Counselor/UpcomingDemo'
import AdminSendMessage from './AdminSendMessage'
import NewDemoList from './Trainers/NewDemoList'
import RegisterStudent from './RegisterStudent'
import DemoRegistration from './DemoRegistraton'
import AddNewDemo from './Counselor/AddNewDemo'
import EditDemo from './Counselor/EditDemo'
import AddDemoStudent from './Counselor/AddDemoStudent'
import AllCourse from './AllCourse'
import EditRunningBatch from './EditRunningBatch'
import AllBatchTiming from './AllBatchTiming'
import AddAttendance from './Trainers/AddAttendance'
import CounselorAddStudent from './Counselor/CounselorAddStudent'
import TrainerSlidebar from './Trainers/TrainerSlidebar'

// import Navbaar from './components/Navbaar';
export default function App() {
  let ContextValue = useContext(StudentContext);
  return (
      <BrowserRouter>
        <StudentState>
          <Routes>

            <Route exact path='/googlemeet' element={<EmbedGoogleMeet />} />
            <Route exact path='/' element={<LogIn />} />
            <Route exact path='admin/' element={<Home />} />
            <Route exact path='admin/AllCourse' element={<AllCourse />} />
            <Route exact path='admin/AllBatchTiming' element={<AllBatchTiming />} />
            <Route exact path='admin/Registered-Student' element={<RegisterStudent />} />
            <Route exact path='admin/Demo-Registration' element={<DemoRegistration />} />
            <Route exact path='admin/upcomingDemo' element={<UpcomingDemo />} />
            <Route exact path='admin/upcomingDemo/DemoStudent'   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <DemoStudent />
      </div>
    </>
  }
 />
            <Route exact path='admin/ViewFee' element={<ViewFee />} />
            <Route exact path='admin/ViewFee/Student-Data' element={<FeesData />} />
            <Route exact path='admin/About/:id' element={<AboutStudent />} />
            <Route exact path='admin/Sendmessage' element={[ <AdminSendMessage />]} />
            <Route exact path='admin/attendenceSheet' element={<AttandanceSheet />} />
            <Route exact path='admin/Add-Registered-Student' element={<AddRegisteredStudent />} />
            <Route exact path="admin/AllStudents" element={<AllStudents />} />
            <Route exact path="admin/AddStudents" element={<AddStudents />} />
            <Route exact path="admin/All-Demo" element={<RegisterChart />} />
            <Route exact path="admin/All-Demo/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  }
 />
            <Route exact path="admin/New-Demo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  }
 />
            <Route exact path="admin/New-Demo/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  }
 />
            <Route exact path="admin/Demo-Register/ShowDemo" element={<ShowDemo />} />
            <Route exact path="admin/Demo-Register/ShowRegister" element={<TotalRegistrationStudent />} />
            <Route exact path="admin/RegisteredStudent" element={<RegisteredStudent />} />
            <Route exact path="EditStudents/:id" element={[ <EditStudents />]} />
            <Route exact path="/EditTrainer" element={[ <EditTrainer />]} />
            <Route exact path="/EditCounselor" element={[ <EditCounselor />]} />
            <Route exact path="student/" element={ <StudentDashboard />} />
            <Route exact path="student/Sendmessage" element={[ <StudentMessage />]} />
            <Route exact path="/student/StudentAssigment" element={[ <StudentAssig />]} />
            <Route exact path="fullattendance/:id" element={[ <Attandance />]} />
            <Route exact path="Aboutstudent/:id" element={[ <AboutStudent />]} />
            <Route exact path="AboutTrainer/:id" element={[ <AboutTrainer />]} />
            <Route exact path="AboutTrainer/:id/upcomingDemo" element={[ <UpcomingDemo />]} />
            <Route exact path="AboutTrainer/:id/upcomingDemo/DemoStudent"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <DemoStudent />
      </div>
    </>
  }
 />
            <Route exact path='AboutTrainer/:id/allStudent' element={<AllStudents />} />
            <Route exact path='AboutTrainer/:id/newStudent' element={<NewStudent />} />
            <Route exact path='AboutTrainer/:id/Trainer-Running-batch' element={<TrainerRunningBatch />} />
            <Route exact path='AboutTrainer/:id/Trainer-Course' element={<TrainerCourse />} />
            <Route exact path='AboutTrainer/:id/All-Trainer-Demo' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <AllTrainerDemo />
      </div>
    </>
  } />
            <Route exact path='AboutTrainer/:id/All-Trainer-Demo/teacherdemo' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } />
            <Route exact path='AboutTrainer/:id/New-Trainer-Demo' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <AllTrainerDemo />
      </div>
    </>
  } />
            <Route exact path='AboutTrainer/:id/New-Trainer-Demo/teacherdemo' element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/:id" element={[ <AboutCounselor />]} />
            <Route exact path="AboutCounselor/:id/upcomingDemo" element={[ <UpcomingDemo />]} />
            {/* <Route exact path="AboutCounselor/:id/upcomingDemo/DemoStudent" element={[<Header/>,[<Sidebar/>, <DemoStudent />]]} /> */}
            <Route exact path="AboutCounselor/:id/upcomingDemo/DemoStudent"  element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <DemoStudent />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/:id/All-Trainer-Demo" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <AllTrainerDemo />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/:id/All-Trainer-Demo/teacherdemo" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/:id/New-Trainer-Demo" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <AllTrainerDemo />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/:id/New-Trainer-Demo/teacherdemo" element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <TeacherDemo />
      </div>
    </>
  } />
            <Route exact path="AboutCounselor/:id/allStudent" element={[ <AllStudents />]} />
            <Route exact path="AboutCounselor/:id/newStudent" element={[ <NewStudent />]} />
            <Route exact path="/counsellor/allStudent" element={[ <AllStudents />]} />
            <Route exact path="/counsellor/AddStudents" element={[ <CounselorAddStudent />]} />
            <Route exact path="/counsellor/newStudent" element={[ <NewStudent />]} />
            <Route exact path="/counselor/registerStudent" element={[ <TotalRegistrationStudent />]} />
            <Route exact path="/counsellor/All-Counselor-Demo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <AllTrainerDemo />
      </div>
    </>
  }
 />
            <Route exact path="/counsellor/All-Counselor-Demo/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <TeacherDemo />
      </div>
    </>
  }
 />
            <Route exact path="/counsellor/new-Counselor-Demo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <AllTrainerDemo />
      </div>
    </>
  }
 />
            <Route exact path="/counsellor/new-Counselor-Demo/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <TeacherDemo />
      </div>
    </>
  }
 />

            <Route exact path="AboutCounselor/:id/registerStudent" element={[ <TotalRegistrationStudent />]} />
            {/* <Route exact path="FeesCollection" element={<FeesCollection />} /> */}
            <Route exact path="admin/New-Batch" element={<NewBatch />} />
            <Route exact path="admin/Running-batches" element={<RunningBatches />} />
            <Route exact path="admin/Running-batches/EditRunningBatch" element={<EditRunningBatch />} />
            <Route exact path="admin/old-batches" element={<OldBatches />} />
            <Route exact path="admin/old-students" element={<OldStudent/>} />
            <Route exact path="admin/AddFees/:id" element={<Addfee />} />
            <Route exact path="/FeesTable" element={<FeeTable />} />
            <Route exact path="/FeesTable/FeeDetail" element={<FeeDetails />} />
            <Route exact path="/FeeRecipt" element={<FeeRecipt />} />
            <Route exact path="/EditFee/:id" element={<EditFee />} />
            <Route exact path="StudentLogout" element={<StudentLogout />} />
            <Route exact path="AllTrainer" element={<AllTrainer />} />
            <Route exact path="TeacherDemo" element={<TeacherDemo />} />
            <Route exact path="DemoOverview" element={<DemoOverview />} />
            <Route exact path="AddTrainer" element={<AddTrainer />} />
            <Route exact path="EditTrainer" element={<EditTrainer />} />
            <Route exact path="counsellor/" element={[ <CounselorDashboard />]} />
            <Route exact path="trainer/" element={ <TrainerDashboard />} />
            <Route exact path="/trainer/attendence" element={<StudentAttandance />} />
            <Route exact path="/trainer/student/:id" element={<TrainerStudent />} />
            <Route exact path="/trainer/add-attendance" element={<AddAttendance />} />
            <Route exact path="/trainer/student/:id/StudentAssignment" element={<AssignmentStatus />} />
            <Route exact path="/trainer/student/:id/attendence" element={<StudentAttandance />} />
            <Route exact path="/student/fullattendance/:id" element={[<StudentAttandanceDetails />]} />
            <Route exact path='/trainer/allStudent' element={<AllStudents />} />
            <Route exact path='/trainer/newStudent' element={<NewStudent />} />
            <Route exact path='/trainer/Trainer-Course' element={<TrainerCourse />} />
            <Route exact path='/trainer/Trainer-Running-batch' element={<TrainerRunningBatch />} />
            <Route exact path="/trainer/assignment" element={ <TrainerAssignment />} />
            <Route exact path="/trainer/demooverview" element={ <DemoOverview />} />
            <Route exact path="/trainer/teacherdemo"   element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <TrainerSlidebar />
        <TeacherDemo />
      </div>
    </>
  }
 />
            <Route exact path="/counselor/demoStudent"  element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <DemoStudent />
      </div>
    </>
  } />
            <Route exact path="/trainer/TrainerMessage" element={ <TrainerMessage />} />
            <Route exact path='/counselor' element={<CounselorDashboard />} />
            <Route exact path="/counselor/AllStudents" element={<CAllStudents />} />
            <Route exact path="/counselor/AllDemo/DemoStudent/editDemoStudent" element={<EditDemoStudent />} />
            <Route exact path="RegisterStudentAdd" element={[ <RegisterStudentAdd />]} />
            <Route exact path="counselor/RegisteredStudent" element={[ <CounselorRegisteredStudent/>]} />
            <Route exact path="counsellor/EditRegisterStudents" element={[ <EditRegisteredStudent/>]} />
            <Route exact path="RegisteredStudent" element={[<RegisteredStudent/>]} />
            <Route exact path="admin/AddCounselor" element={ <CAddCounselor />} />
            <Route exact path="counselor/RegisterStudentAdd" element={[ <RegisterStudentAdd />]} />
            <Route exact path="/counselor/Demo" element={[ <Demo />]} />
            <Route exact path="/counselor/AddDemo" element={[ <AddNewDemo />]} />
            <Route exact path="/counselor/AllDemo" element={[ <AllDemo/>]} />
            <Route exact path="/counselor/AllDemo/EditDemo" element={[ <EditDemo/>]} />
            <Route exact path="/counselor/AllDemo/AddDemoStudent" element={[ <AddDemoStudent/>]} />
            <Route exact path="/counselor/AllDemo/DemoStudent"  element={
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Cslidebar />
        <DemoStudent />
      </div>
    </>
  } />
            <Route exact path="/counselor/SendMessage" element={[ < CsendMessage />]} />
            <Route exact path="/counselor/demooverview" element={[<DemoOverview />]} />
            <Route exact path="SendMessages" element={<SendMessages />} />
            <Route exact path="Assignment" element={<Assignment />} />
            <Route exact path="feeReceipt" element={<FeeRecipt />} />
            <Route exact path="resetpassword" element={<Newpassword />} />
            <Route exact path="/trainer/attendencedetail" element={<AttendanceDetail />} />
             {/* <Route exact path="EditFee" element={[<Header />, <Sidebar />, <EditFee />]} />  */}
            <Route exact path="Aboutstudent/64d9f16d31f0e4f016407880/AllMessage/:id" element={<AllMessage />} />
            <Route exact path="/ReadMessage" element={<ReadMessage />} />
            <Route exact path="admin/Running-batches/Student" element={<RunningBatchStudent/>} />
            <Route exact path="admin/old-batches/Student" element={<RunningBatchStudent/>} />
          </Routes>
          <Footer />
        </StudentState >
      </BrowserRouter >
     

  )
}