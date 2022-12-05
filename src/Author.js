import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {useForm} from 'react-hook-form';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link, useParams} from "react-router-dom";
import QRCode from "qrcode";


function Author() {
let { id } = useParams();
  const [text, setText] = useState("");
  const canvasRef = useRef();

  useEffect(() => {
      console.info(text)
      if(text=="")
          return;
    QRCode.toCanvas(
      canvasRef.current,
      // QR code doesn't work with an empty string
      // so we are using a blank space as a fallback
      text || " ",
        (error) => error && console.error(error)
    );
  }, [text]);
  const [editResult, setEditResult] = useState(null);
function AuthorDataDisplay(res){
      console.log(res);
    const DisplayData=res.map(
        (book)=>{
            console.log(book);
            setText(book.Bio)
            return(
                <tr>
                    <td>{book.Author_ID}</td>
                    <td>{book.Name}</td>
                    <td>{book.BirthDate}</td>
                    <td>{book.Languages}</td>

                </tr>
            )
        }
    )

    return(
        <div>
            <table className="result-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>День Рождения</th>
                    <th>Языки</th>
                    <th>Биография</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>

        </div>
    )
 }
   const formatResponse = (res) => {
    return res.data?.error;
        //Add Errors
 //     );
  };

     id = id.replace(/:/g, '');
    try {
        console.log(id);
      axios.get("http://localhost:5000/api/v1/library/allAuthors/"+id).then(response => {
            console.log(response.data);
          setEditResult(AuthorDataDisplay(response.data));
      });


    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
  return (
    <div>
        { editResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{editResult}</pre></div> }
      <h3>Author ID: {id}</h3>
        <canvas ref={canvasRef} />
        <Link to={"/"}>Назад</Link>
    </div>
  );
}
export default Author;