import { Routes, Route } from "react-router-dom";
import { useState ,useEffect } from "react";

// Redux
import store from "./stores/index";
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  cleanUser, 
  setUserInfo
} from './stores/slice/user';

// components
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";

function App() {
  // let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser()); 
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const selectorData = useSelector(state => state.user.userInfo);
  const [data, setData] = useState(selectorData);
  console.log ('data1',data)

  useEffect(() => {
    // reload redux Ｆ5 會回預設值 所以重抓
    console.log ('5')
    const returnData = AuthService.getCurrentUser();
    dispatch(setUserInfo(returnData));
    setCurrentUser(returnData)
  }, []);

  return (
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="course"
            element={
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
      </Routes>
  );
}

export default App;
