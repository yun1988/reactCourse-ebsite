import React, { useState ,useReducer} from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

// register reducer function
import { postCourseReducer } from './postCourse-reducer.js';

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  // let [title, setTitle] = useState("");
  // let [description, setDescription] = useState("");
  // let [price, setPrice] = useState(0);

   // useReducer initState
   const initState = {
    title: null,
    description : '',
    price: 0
  }
  const [state, dispatch] = useReducer(postCourseReducer, initState)


  const handleTakeToLogin = () => {
    navigate("/login");
  };
    // const handleChangeTitle = (e) => {
    //   setTitle(e.target.value);
    // };
    // const handleChangeDesciption = (e) => {
    //   setDescription(e.target.value);
    // };
    // const handleChangePrice = (e) => {
    //   setPrice(e.target.value);
    // };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const changeValue = { name, value };
    dispatch({ type: 'CHANGE_ITEM', changeValue: changeValue });
  };

  const postCourse = () => {
    dispatch({ type: 'POSTCOURSE'}); 
    CourseService.post(state.title, state.description, state.price)
      .then(() => {
        window.alert("新課程已創建成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在發布新課程之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>只有講師可以發布新課程。</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label for="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChange}
          />
          <br />
          <label for="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="description"
            onChange={handleChange}
          />
          <br />
          <label for="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            交出表單
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
