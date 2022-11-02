import React, { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseContext = React.createContext();

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null);
  console.log ('courseData',courseData)
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            console.log ('data',data)
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  const List = () => {
    const mainData = useContext(CourseContext);
    console.log(mainData);
    return (
      <div>
        {mainData.courseData.map((course) => {
          console.log('course',course)
          return (
            <ListItem {...course}/>
            );
          })}
      </div>
    );
  };

  const ListItem = ({ _id ,title, description ,students ,price}) => {
    const mainData = useContext(CourseContext);
    console.log('2',mainData);
    return (
      <div style={{ display: "flex", flexWrap: "wrap" , float: "left"}}>
        <div key={_id} className="card" style={{ width: "18rem", margin: "1rem"}}>
          <div className="card-body">
            <h5 className="card-title">課程名稱:{title}</h5>
              <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                {description}
              </p>
              <p style={{ margin: "0.5rem 0rem" }}>
                學生人數: {students.length}
              </p>
              <p style={{ margin: "0.5rem 0rem" }}>
                課程價格: {price}
              </p>
            </div>
          </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面。</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面。</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <CourseContext.Provider value={{ courseData }}>
          <List />
        </CourseContext.Provider>
      )}
    </div>
  );

};








export default CourseComponent;
