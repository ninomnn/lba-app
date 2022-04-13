import './App.css';
import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
function Post() {
    const [_id, setProductId] = useState("")
    const [name,setName]=useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(""); 
    const [rating, setRating] = useState("");
    const [warranty_years, setWarranty] = useState("");
    const [available, setAvilable] = useState("");
function saveData()
{
  let data={ _id,name,type,price,rating,warranty_years,available }
  fetch("http://localhost:4000/api/post", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data)
  }).then((resp)=>{
    resp.json().then((result)=>{
      console.warn("result",result)
    })
  })
}
  return (
    <div className="App">
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <h1 align="center">New Product</h1>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th"><TextField id="outlined-basic" label="ID" variant="outlined" value={_id} onChange={(e) => { setProductId(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Type" variant="outlined" value={type} onChange={(e) => { setType(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Price" variant="outlined" value={price} onChange={(e) => { setPrice(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Rating" variant="outlined" value={rating} onChange={(e) => { setRating(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Warranty Years" variant="outlined" value={warranty_years} onChange={(e) => { setWarranty(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Avialability" variant="outlined" value={available} onChange={(e) => { setAvilable(e.target.value) }}/></TableCell>
              <TableCell align="center"><Button variant="contained" align="center" color="success" onClick={saveData}>Save</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Post;