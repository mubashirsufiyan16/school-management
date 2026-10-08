import studentData from "../data/StudentData";
import "../../App.scss"
import { useState,useEffect } from "react";
import SearchFilter from "./SearchFilter";

function StudentTable() {
  const [student,setStudent]=useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("filtereddata")) || [];

    setStudent(data);
    console.log(student)
  }, []);
  const [error, setError] = useState({
    name: "",
    course: "",
    grade: "",
  });
  const [formField, setFormField] = useState({
    name: "",
    course: "",
    grade: "",
  });

  const [editId, setEditId] = useState(null);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("DATA")) || studentData,
  );

  const onChangeHandler = (e) => {
    e.preventDefault();

    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
    if (
      e.target.name === "name" &&
      e.target.value.trim().length >= 2
    ) {
      setError({
        ...error,
        name: "",
      });
    }
    if (
      e.target.name === "course" &&
      e.target.value.trim().length >= 2
    ) {
      setError({
        ...error,
        course: "",
      });
    }

    if (
      e.target.name === "grade" &&
      e.target.value.trim().length >= 1
    ) {
      setError({
        ...error,
        grade: "",
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!validationHandler()) {
      return;
    }

    if (editId) {
      const updatedData = data.map((student) =>
        student.id === editId
          ? {
              ...student,
              name: formField.name,
              course: formField.course,
              grade: formField.grade,
            }
          : student,
      );

      setData(updatedData);
      localStorage.setItem("DATA", JSON.stringify(updatedData));
      setEditId(null);
    } else {
      const newStudent = {
        ...formField,
        id: Date.now(),
      };

      const updatedData = [...data, newStudent];

      setData(updatedData);
      localStorage.setItem("DATA", JSON.stringify(updatedData));
    }

    setFormField({
      name: "",
      course: "",
      grade: "",
    });

    setError({
      name: "",
      course: "",
      grade: "",
    });
  };

  const onCancelHandler = () => {
    setFormField({
      name: "",
      course: "",
      grade: "",
    });

    setError({
      name: "",
      course: "",
      grade: "",
    });

    setEditId(null);
  };

  const onDeleteHandler = (id) => {
    const updatedData = data.filter((student) => student.id !== id);

    setData(updatedData);
    localStorage.setItem("DATA", JSON.stringify(updatedData));
  };

  const onEdithandler = (id) => {
    const student = data.find((student) => student.id === id);

    setFormField({
      name: student.name,
      course: student.course,
      grade: student.grade,
    });

    setEditId(id);
  };

  const validationHandler = () => {
    let valid = true;

    if (formField.name.trim().length < 2) {
      setError({
        ...error,
        name: "Name must be 2 characters",
      });

      valid = false;
    }

    if (formField.course.trim().length < 2) {
      setError((prev) => ({
        ...prev,
        course: "Course must be 2 characters",
      }));

      valid = false;
    }

 if (formField.grade.trim().length < 1) {
  setError((prev) => ({
    ...prev,
    grade: "Grade is required",
  }));

  valid = false;
} else if (Number(formField.grade) < 0 || Number(formField.grade) > 100) {
  setError((prev) => ({
    ...prev,
    grade: "Grade must be between 0 and 100",
  }));

  valid = false;
}

    return valid;
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">Student Data table</h1>

        <SearchFilter/>

        <div className="table-container">
          
          <table>
            <thead className="table-head">
              <tr>
                <th>Student Name</th>
                <th>Student Course</th>
                <th>Student Grade</th>
                <th>Operations</th>
              </tr>
            </thead>

            <tbody className="table-body">
              {data.map((student, index) => (
                <tr key={`${student.id}-${index}`}>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.grade}</td>

                  <td className="button-container">
                    <button
                      onClick={() => onEdithandler(student.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDeleteHandler(student.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <form onSubmit={onSubmitHandler}>
            <div className="student-details">
              <h2>Add Student</h2>

              <div className="input-container">
                <div className="input-box">
                  <span>👤</span>

                  <input
                    type="text"
                    name="name"
                    value={formField.name}
                    onChange={onChangeHandler}
                    id="name"
                    placeholder="Student Name"
                  />

                  <div className="error-message">
                    {error.name && <p>{error.name}</p>}
                  </div>
                </div>

                <div className="input-box">
                  <span>📱</span>

                  <input
                    type="text"
                    name="course"
                    value={formField.course}
                    onChange={onChangeHandler}
                    id="course"
                    placeholder="Student Course"
                  />

                  <div className="error-message">
                    {error.course && <p>{error.course}</p>}
                  </div>
                </div>

                <div className="input-box">
                  <span>🎓</span>

                  <input
                    type="number"
                    name="grade"
                    value={formField.grade}
                    onChange={onChangeHandler}
                    id="grade"
                    placeholder="Student Grade"
                  />

                  <div className="error-message">
                    {error.grade && <p>{error.grade}</p>}
                  </div>
                </div>
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  className="add-button"
                >
                  {editId ? "Update" : "Add"}
                </button>

                <button
                  onClick={onCancelHandler}
                  type="button"
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default StudentTable;