import { BiPencil } from "react-icons/bi"; 
import { MdDeleteForever } from "react-icons/md"; 
import { AiFillEdit } from "react-icons/ai";
import { CgAdd } from "react-icons/cg";

import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../compudent/minitest.scss";
export default function Minitest() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState([]);
    const [edit, setEdit] = useState(false);
    const [length, setLength] = useState(false)
    
  const hanldInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const hanldAdd = async () => {
    try {
      if (user.name == "") {
        alert("Không Được Để Trống");
      } else {
        const respons = await axios.post("http://localhost:8000/user", {
          ...user,
          id: Math.floor(Math.random() * 999999),
          completed:false,
        });
        // setUsername(respons.data.todo);
          setUser({ name: "" });
          setLength(!length)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hanldGetServer = async () => {
    try {
      const respons = await axios.get("http://localhost:8000/user?per_page=4");
        setUsername(respons.data);
        
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    hanldGetServer();
  }, [length]);
  const hanldEdit = (item) => {
    setUser(item);
    setEdit(true);
  };
  const hanldaddedit = async () => {
    try {
      const respons = await axios.put(
        `http://localhost:8000/user/${user.id}`,
        user
      );
    //   setUsername(respons.data.todo);
      setUser({ name: "" });
        setEdit(false);
          setLength(!length);
        
    } catch (error) {
      console.log(error);
    }
  };
  const hanldedelete = async (id) => {
    const confilm = confirm("Bạn có muốn xóa không");
    if (confilm) {
      try {
        const respons = await axios.delete(`http://localhost:8000/user/${id}`);
          // setUsername(respons.data.todo);
          setLength(!length);
          
      } catch (error) {
        console.log(error);
      }
    }
    };
    const hanlddeleteall = async () => {
        const confrim = confirm("Bạn Có Muốn Xóa Tất Cả Không")
        if (confrim) {
              try {
            const respons = await axios.delete("http://localhost:8000/user");
            setUsername(respons.data.todo)
        } catch (error) {
            console.log(error);
        }
        }
      
    }
    const hanldTextDeCoration = async (item) => {
        const respons = await axios.patch(`http://localhost:8000/user/${item.id}`,item);
        // setUsername(respons.data.todo);
          setLength(!length);

    }
    const userlength = username.filter((item) => item.completed==false);
  return (
    <>
      <div className="mani">
        <h2>TODO APP</h2>
        <div className="container">
          <input
            type="text"
            onChange={hanldInput}
            name="name"
            value={user.name}
          />
          {/* <button onClick={hanldaddedit}>Sửa</button> */}
          {edit ? (
            <button onClick={hanldaddedit}>
              <AiFillEdit />
              Edit
            </button>
          ) : (
            <button onClick={hanldAdd}>
              <CgAdd />
              Add
            </button>
          )}
          <table border={2} cellPadding={5} cellSpacing={5} className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {username.map((item) => {
                return (
                  <tr>
                    <td
                      style={{
                        textDecoration: item.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.id}
                    </td>
                    <td
                      style={{
                        textDecoration: item.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.name}
                    </td>
                    <td>
                      <button onClick={() => hanldEdit(item)}>
                        <BsFillPencilFill style={{ color: "#fff" }} />
                        Edit
                      </button>
                      <button onClick={() => hanldedelete(item.id)}>
                        <AiFillDelete /> Delete
                      </button>
                      <button onClick={() => hanldTextDeCoration(item)}>
                        <BiPencil />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3>
          You have {userlength.length} pending tasks{" "}
          <button onClick={hanlddeleteall}>
            {" "}
            <MdDeleteForever />
            Clear
          </button>
        </h3>
      </div>
    </>
  );
}
