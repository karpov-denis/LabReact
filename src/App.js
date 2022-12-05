import React, {useContext, useRef, useState} from "react";
import axios from "axios";
import "./App.css";
import {useForm} from 'react-hook-form';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import formatResponse from "./Utils"
function App() {


  const {register, watch, handleSubmit, formState: {errors}} = useForm();
  const {register: register2,watch: watch2, handleSubmit: handleSubmit2, formState: {errors:errors2}} = useForm();
  const {register: register3,watch: watch3, handleSubmit: handleSubmit3, formState: {errors:errors3}} = useForm();
  const bookName = watch("bookName");
  const authorName = watch("authorName");
  const year = watch("year");
  const language = watch("language");

  const AuthorName2 = watch2("authorName2");
  const BirthDate2 = watch2("birthDate2");
  const Bio2 = watch2("biography2");
  const Languages2 = watch2("languages2");

  const bookName3 = watch3("bookName3");
  const authorName3 = watch3("authorName3");
  const year3 = watch3("year3");
  const language3 = watch3("language3");

  const [getResult, setGetResult] = useState(null);
  const [editResult, setEditResult] = useState(null);



  function BookDataDisplay(res){
      console.log(res);
    const DisplayData=res.data.map(
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
                    <td><input type="button" value="Изменить" onClick={()=>EditBook(book)}/></td>
                    <td><input type="button" value="Удалить" onClick={()=>DeleteBook(book)}/></td>
                    <td><Link to={"/book/:"+book.ID}>Просмотр</Link></td>
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

 async function DeleteBook(book) {
    try {
        let res;
        console.log(book.ID);
        console.log(book.BookId);
        res = await axios.delete("http://localhost:5000/api/v1/library/book/"+book.BookId);
        console.log(res);
        console.log("Deleted book data");
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
    clearGetOutput()
     await GetAllBooks()
  }
   async function DeleteAuthor(author) {
    try {
        let res;
        console.log(author.Author_ID);
        res = await axios.delete("http://localhost:5000/api/v1/library/author/"+author.Author_ID);
        console.log(res);
        console.log("Deleted author data");
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
        clearGetOutput()
     await GetAllAuthors()
  }

   async function EditBookData(book) {
    try {
        let res;
        console.log(book.author);
        console.log(authorName3);
    if(book.author != authorName3 && authorName3 != null) { //изменен автор
        console.log("Set new Author");
        res = await axios.get("http://localhost:5000/api/v1/library/authors/"+authorName3);
        console.log(res)
    }
        console.log("Update book data");
       // res = await axios.put("http://localhost:5000/api/v1/library/setAsUnread/");

 /*     const result = {
        data: res.data,
      };
console.log(result);*/
     // setGetResult(BookDataDisplay(result));
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
  }

   async function EditBook(book) {
      console.log(book);
     setEditResult(
         <div>
             <div className="card-name">Введите новые данные книги</div>
             <form onSubmit={handleSubmit3((data) => EditBookData(book))}>
            <input {...register3("bookName3")} placeholder={book.name}/>
            <input {...register3("authorName3")} placeholder={book.author}/>
            <input {...register3("year3")} placeholder={book.year}/>
                        {errors3.year && <p>Необходимо указать год издания.</p>}
            <input {...register3("language3")} placeholder={book.language}/>
            <input type="submit"/>
            </form>
         </div>
     );
  }

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

 function AuthorDataDisplay(res){
      console.log(res);
    const DisplayData=res.data.map(
        (book)=>{
            console.log(book);
            return(
                <tr>
                    <td>{book.Author_ID}</td>
                    <td>{book.Name}</td>
                    <td>{book.BirthDate}</td>
                    <td>{book.Languages}</td>
                    <td>{book.Bio.substring(0,30)+"..."}</td>
                    <td><input type="button" value="Удалить" onClick={()=>DeleteAuthor(book)}/></td>
                    <td><Link to={"/author/:"+book.Author_ID}>Просмотр</Link></td>
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






  async function GetAllBooks() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/library/allBooks");

      const result = {
        data: res.data,
      };

      setGetResult(BookDataDisplay(result));
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
  }
  async function GetAllAuthors() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/library/allAuthors");

      const result = {
        data: res.data,
      };

      setGetResult(AuthorDataDisplay(result));
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
  }
async function postBookData() {
    try {
        console.log(bookName, authorName, year, language);
      const res = await axios.post("http://localhost:5000/api/v1/library/addBook/"+bookName+'/'+authorName+'/'+year+'/'+language, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
    console.log(result.data.error);
      toast.error(formatResponse(result));
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
    await GetAllBooks();
}
async function postAuthorData() {
    try {
        console.log(AuthorName2, BirthDate2, Bio2, Languages2);
      const res = await axios.post("http://localhost:5000/api/v1/library/addAuthor/"+AuthorName2+'/'+BirthDate2+'/'+Bio2+'/'+Languages2, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
    console.log(result);
   //   setPostResult(formatResponse(result));
    } catch (err) {
      toast.error(formatResponse(err.response?.data || err));
    }
    await GetAllAuthors();
}

  const clearGetOutput = () => {
    setGetResult(null);
  };

  return (

    <div id="app" className="container">
              <ToastContainer />
      <h3>Библиотека</h3>
      <div className="card">
        <div className="card-name"></div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={GetAllBooks}>Получить список книг</button>

            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={GetAllAuthors}>Получить список авторов</button>
            </div>
            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Очистить</button>
          </div>
            { editResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{editResult}</pre></div> }
          { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">Добавить книгу</div>
        <div className="card-body">
            <form onSubmit={handleSubmit((data) => postBookData())}>
            <input {...register("bookName", {required: true})} placeholder={"Название книги"} defaultValue={localStorage.getItem("bookName") || ""} onChange = {event => {localStorage.setItem('bookName',event.target.value )}} />
                        {errors.bookName && <p>Необходимо указать название книги.</p>}
            <input {...register("authorName", {required: true})} placeholder={"Имя автора"}defaultValue={localStorage.getItem("author") || ""} onChange = {event => {localStorage.setItem('author',event.target.value )}}/>
                        {errors.authorName && <p>Необходимо указать имя автора.</p>}
            <input {...register("year", {required: true, pattern: /[1-2][0-9]{3}/})} placeholder={"Год издания"}defaultValue={localStorage.getItem("year") || ""} onChange = {event => {localStorage.setItem('year',event.target.value )}}/>
                        {errors.year && <p>Необходимо указать год издания.</p>}
            <input {...register("language", {required: true})} placeholder={"Язык"}defaultValue={localStorage.getItem("language") || ""} onChange = {event => {localStorage.setItem('language',event.target.value )}}/>
                        {errors.language && <p>Необходимо указать язык.</p>}
            <input type="submit"/>
            </form>
        </div>
        <div className="card-header">Добавить автора</div>
        <div className="card-body">
            <form onSubmit={handleSubmit2((data) => postAuthorData())}>
            <input {...register2("authorName2", {required: true})} placeholder={"Имя автора"}/>
                        {errors2.authorName2 && <p>Необходимо указать Имя автора.</p>}
            <input {...register2("birthDate2", {required: true, pattern: /[0-9]{4}-[0-9]{2}-[0-9]{2}/})} placeholder={"Дата рождения автора"}/>
                        {errors2.birthDate2 && <p>Необходимо указать дату рождения автора.</p>}
            <input {...register2("biography2", {required: true})} placeholder={"Биография"}/>
                        {errors2.biography2 && <p>Необходимо указать биографию.</p>}
            <input {...register2("languages2", {required: true})} placeholder={"Языки"}/>
                        {errors2.languages2 && <p>Необходимо указать языки.</p>}
            <input type="submit"/>
            </form>

        </div>
      </div>


                </div>
  );
}

export default App;