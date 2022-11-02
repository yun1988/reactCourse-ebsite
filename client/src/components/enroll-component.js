import React, { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollContext = React.createContext();

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert("課程註冊成功!! 重新導向到課程頁面。");
        navigate("/course");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const List = () => {
    const mainData = useContext(EnrollContext);
    console.log(mainData);
    return (
      <div>
        {mainData.searchResult.map((course) => {
          console.log('course',course)
          return (
            <ListItem {...course}/>
            );
          })}
      </div>
    );
  };

  const ListItem = ({ _id ,title, description ,students ,price, instructor}) => {
    const mainData = useContext(EnrollContext);
    console.log('2',mainData);
    return (
      <div key={_id} className="card" style={{ width: "18rem" }}>
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
          <p style={{ margin: "0.5rem 0rem" }}>
            講師: {instructor.username}
          </p>

          <a
            href="#"
            id={_id}
            className="card-text btn btn-primary"
            onClick={handleEnroll}
          >
            註冊課程
          </a>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能開始註冊課程。</p>
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
          <h1>只有學生才能夠註冊課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋課程
          </button>
        </div>
      )}

      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>這是我們從API返回的數據:</p>
          <EnrollContext.Provider value={{ searchResult }}>
            <List />
          </EnrollContext.Provider>
        </div>
      )}
    </div>
  );


};

export default EnrollComponent;
