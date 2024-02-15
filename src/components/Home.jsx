import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoSend } from "react-icons/io5";
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase';

export const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [time, setTime] = useState("");

  const dbValue = collection(db, 'Users');

  const handleCreate = async (e) => {
    e.preventDefault();
    await addDoc(dbValue, { name: name, surname: surname, time: time });
    console.log(name, surname, time);
  }
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT", value: null })
        navigate('/signin')
      }).catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    onSnapshot(
      dbValue,
      (snapshot) => {
        let userlist = [];
        snapshot.docs.forEach((doc) => {
          userlist.push({ id: doc.id, ...doc.data() })
        })
        setData(userlist)
      }
    ), (error) => {
      console.log(error);
    }

    console.log(data);
  }, []);

  const [newDate, setNewDate] = useState(new Date())

  useEffect(() => {
    let todayDate = new Date(),
      month = "" + (todayDate.getHours()),
      day = "" + todayDate.getMinutes(),
      year = todayDate.getSeconds()
    if (day.length < 2) {
      day = '0' + day
    }
    if (month.length < 2) {
      month = '0' + month
    }
    console.log(day, month, year);
    setNewDate([month, day, year].join('-'))
  })

  return (
    <>
      <div>
        <div className="div-h1">
          <h1>Send your text</h1>
        </div>
        <div className='outpad'>
          <div className="container">
            {data.map((user) => {
              return (
                <div className="users flex flex-wrap" key={user.id}>
                  <div className="user p-4">
                    <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                      <h2> {user.name}  : <span>{user.surname}</span></h2>
                      <h2>{newDate}</h2>
                      <button onClick={() => {
                        navigator.clipboard.writeText(user.surname)
                      }}>Copy</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
            <div className="scrool"></div>
        </div>
        <div className='send-div'>
          <input className='inp-name' type="text" onChange={(event) => setName(event.target.value)} placeholder='Write your name' />

          <input className='inp-text' type="text" onChange={(event) => setSurname(event.target.value)} placeholder='Write your text' />

          <button className='button-send' onClick={handleCreate}><IoSend size="30" /></button>
          <button className="signout-btn" onClick={handleSignOut}>Chiqish</button>
        </div>
      </div>
    </>



  )
}


