
import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';




function App() {
  
  const [books, setBooks]= useState([]);

  useEffect(()=>{
    async function fetchData(){
      let response = await axios.get('http://localhost:5000/book'); //storing response from database into response variable
      
      if(response.status === 200){
        setBooks(response.data);
      }
    }
    fetchData()
  }, []);

  return (
    <>
      <div>
        <h1 className='text-center'>Book-Info</h1>
        {books.map((book, index) =>{
          return <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
          </div>
        })}
      </div>
    </>
  );
}

export default App;
