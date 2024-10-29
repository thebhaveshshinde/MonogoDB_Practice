import { useState } from "react"

function Registration() {
  const [formdata, setformdata] = useState({ username: '', password: '', age: '' })

  const handleChange = async (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/index", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      })
      if (response.ok) {
        alert("Data Stored Successfully");
      }
      else {
        alert("Data not Stored in the database");
      }
    } catch (error) {
      alert("Server Error : ", error)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        Username: <input type="text" name="username" value={formdata.username} onChange={handleChange} required /><br />
        Password: <input type="text" name="password" value={formdata.password} onChange={handleChange} required /><br />
        Age :<input type="number" name="age" value={formdata.age} onChange={handleChange} required /><br />
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Registration
