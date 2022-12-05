import React, { useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import {useForm} from 'react-hook-form';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link, useParams} from "react-router-dom";

function Book() {
    let { id } = useParams();
  const [editResult, setEditResult] = useState(null);

  const formatResponse = (res) => {
    return res.data?.error;
        //Add Errors
 //     );
  };
  async function ChangeBookRead(book) {
      console.log(book.target.value);
    try {
        console.log(book.target.value);
        console.log(book.target.checked);
        let res;
    if((book.target.checked?'True':'False') == 'True') {
        console.log("Set as checked");
        res = await axios.put("http://localhost:5000/api/v1/library/setAsRead/" + book.target.value);
    }
    else {
        console.log("Set as unchecked");
        res = await axios.put("http://localhost:5000/api/v1/library/setAsUnread/" + book.target.value);
    }
      const result = {
        data: res.data,
      };
console.log(result);
     // setGetResult(BookDataDisplay(result));
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
  }

   function BookDataDisplay(res){
      console.log(res);
    const DisplayData=res.map(
        (book)=>{
            console.log(book);
            return(
                <tr>
                    <td>{book.ID}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.language}</td>
                    <td><input type="checkbox" value = {book.ID} defaultChecked={book.IsRead} onChange={ChangeBookRead}/></td>
                    <td>{book.year}</td>
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
                    <th>Название</th>
                    <th>Автор</th>
                    <th>Язык</th>
                    <th>Прочитана</th>
                    <th>Год</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>

        </div>
    )
 }



    id = id.replace(/:/g, '');
    try {
        console.log(id);
      axios.get("http://localhost:5000/api/v1/library/allBooks/"+id).then(response => {
            console.log(response.data);
          setEditResult(BookDataDisplay(response.data));
      });


    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }

  return (
    <div>
        { editResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{editResult}</pre></div> }
      <h3>ID: {id}</h3>
        <Link to={"/"}>Назад</Link>
    </div>
  );
}
export default Book;