import studentData from "../data/StudentData";
import "../App.css";
import { useState } from "react";

function StudentTable() {
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
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

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
  };

  const onCancelHandler = () => {
    setFormField({
      name: "",
      course: "",
      grade: "",
    });
    setEditId(null)
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

  return (
    <div className="container">
      <h1 className="heading">Student Data table</h1>

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
                  required
                  type="text"
                  name="name"
                  value={formField.name}
                  onChange={onChangeHandler}
                  id="name"
                  placeholder="Student Name"
                />
              </div>

              <div className="input-box">
                <span>📱</span>

                <input
                  required
                  type="text"
                  name="course"
                  value={formField.course}
                  onChange={onChangeHandler}
                  id="course"
                  placeholder="Student Course"
                />
              </div>

              <div className="input-box">
                <span>🎓</span>

                <input
                  required
                  type="text"
                  name="grade"
                  value={formField.grade}
                  onChange={onChangeHandler}
                  id="grade"
                  placeholder="Student Grade"
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" className="add-button">
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
  );
}

export default StudentTable;
