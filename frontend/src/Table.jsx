import axios from "axios";
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

function Table() {
  const [allData, setAllData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setsearchResults]=useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    axios
      .get("http://localhost:8080/getAllData")
      .then((res) => setAllData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/deleteMessage/${id}`)
      .then(() => {
        setAllData(allData.filter((data) => data._id !== id));
        setMessage("Data Deleted Successfully");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        setError("Error Deleting Data");
        setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      });
  };

  const handleEdit = (data) => {
    setEditData(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/updateMessage/${editData._id}`, editData)
      .then((res) => {
        setEditData(null);
        fetchAllData();
        setMessage("Data Updated Successfully");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        setError("Error Updating Data");
        setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      });
  };

  function handleSearch(e) {
    e.preventDefault();
    axios
      .get("http://localhost:8080/search/q=" + searchTerm)
      .then((response) => {console.log(response);setsearchResults(response.data)})

      .catch((error) => console.log(error));
  }

  let count = 1;

  return (
    <>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search Users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button type="submit">Search</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
       {(searchResults.length>0)?
       searchResults.map((data, index) => (
            <tr key={index}>
              <td>{count++}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>
                <ModeEditIcon
                  onClick={() => handleEdit(data)}
                  style={{ cursor: "pointer", color: "blue" }}
                />
                <DeleteIcon
                  onClick={() => handleDelete(data._id)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </td>
            </tr>
          ))
       :
          allData.map((data, index) => (
            <tr key={index}>
              <td>{count++}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>
                <ModeEditIcon
                  onClick={() => handleEdit(data)}
                  style={{ cursor: "pointer", color: "blue" }}
                />
                <DeleteIcon
                  onClick={() => handleDelete(data._id)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <div className="edit-form">
          <h3>Edit Data</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Message</label>
              <input
                type="text"
                name="message"
                value={editData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Table;