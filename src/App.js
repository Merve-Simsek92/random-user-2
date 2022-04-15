import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import email from "./assets/mail.svg";
import loc from "./assets/map.svg";
import phone from "./assets/phone.svg";
import cw from "./assets/cw.svg";

import growMan from "./assets/growing-up-man.svg";
import growWoman from "./assets/growing-up-woman.svg";
import man from "./assets/man.svg";
import woman from "./assets/woman.svg";
import padlock from "./assets/padlock.svg";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";

function App() {
  const [data, setData] = useState([]);
  const [iconInfo, setIconInfo] = useState("");
  const [infoType, setInfoType] = useState("");
  const [addInfo, setAddInfo] = useState([]);
  const [table, setTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axiosRandomData();
  }, []);

  const axiosRandomData = async () => {
    const response = await axios({
      url: "https://randomuser.me/api/",
      method: "get",
    });
    const res = response.data.results[0];
    console.log(res);
    setData(res);
  };

  const handleNewClick = () => {
    axiosRandomData();
  };
  const handleAddClick = (e) => {
    setIsOpen(true);
    if (table.length > 0 && table[table.length - 1].name !== data.name) {
      setTable([
        ...table,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          age: data.dob.age,
        },
      ]);
    } else if (table.length === 0) {
      setTable([
        ...table,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          age: data.dob.age,
        },
      ]);
    }
    console.log(table);
  };

  return (
    <div className="App">
      <img style={{width:"40px"}} src={cw}/>
      
      <div className="card-container">
        <div>
          <img className="image" style={{width:"150px"}} src={data?.picture?.large} alt="" />
        </div>
        <div>
          <p><p>My {infoType === '' ? 'name' : infoType} is</p> </p>
          <h4>{iconInfo === "" ? data?.name?.first : iconInfo}</h4>
        </div>

        <div>
          <img
            
            src={data?.gender === "female" ? woman : man}
            onMouseOver={(e) => (
              setIconInfo(data.name.first), setInfoType("name")
            )}
          />
          <img
            
            src={email}
            onMouseOver={(e) => (setIconInfo(data.email), setInfoType("email"))}
          />
          <img
            
            src={data?.gender === "female" ? growWoman : growMan}
            onMouseOver={(e) => (setIconInfo(data.dob.age), setInfoType("age"))}
          />
          <img
            
            src={loc}
            onMouseOver={(e) => (
              setIconInfo(data.location.country), setInfoType("country")
            )}
          />
          <img
            
            src={phone}
            onMouseOver={(e) => (setIconInfo(data.phone), setInfoType("phone"))}
          />
          <img
            
            src={padlock}
            onMouseOver={(e) => (
              setIconInfo(data.login.password), setInfoType("password")
            )}
          />
        </div>

        <div>
          <button onClick={handleNewClick}>NEW USER</button>
          <button onClick={handleAddClick}>ADD USER</button>
        </div>
      
      {isOpen && (
        <div>
          <table>
            <tr style={{ border: "2px" }}>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
            </tr>

            {table.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.name.first}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.age}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
