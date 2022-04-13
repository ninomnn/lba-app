import './App.css';
import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
function Board() {
  const [products, setProduct] = useState([])
  const [productId, setProductId] = useState("")
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(""); 
  const [rating, setRating] = useState("");
  const [warranty_years, setWarranty] = useState("");
  const [available, setAvilable] = useState("");

  useEffect(() => {
    getProducts();
  }, [])
  function getProducts() {
    fetch("http://localhost:4000/api/getAll").then((result) => {
      result.json().then((resp) => {
        setProduct(resp)
        setProductId(resp[0]._id)
        setName(resp[0].name)
        setType(resp[0].type)
        setPrice(resp[0].price)
        setRating(resp[0].rating)
        setWarranty(resp[0].warranty_years)
        setAvilable(resp[0].available)
      })
    })
  }

  function deleteProduct(id) {
    fetch(`http://localhost:4000/api/delete/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getProducts()
      })
    })
  }
  function selectProduct(id) {
    let item = products[id - 1];
    setProductId(item._id)
    setName(item.name)
    setType(item.type)
    setPrice(item.price);
    setRating(item.rating);
    setWarranty(item.warranty_years);
    setAvilable(item.available);
  }
  function updateProduct() {
    let item = { productId, name, type, price, rating, warranty_years, available }
    console.warn("item", item)
    fetch(`http://localhost:4000/api/update/${productId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getProducts()
      })
    })
  }
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Warranty Years</TableCell>
              <TableCell align="right">Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, i) =>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={i}
              >
                <TableCell component="th">
                  {item._id}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.rating}</TableCell>
                <TableCell align="right">{item.warranty_years}</TableCell>
                <TableCell align="right">{(() => {
                  if (item.available === true) {
                    return (
                      "Yes"
                    )
                  } else if (item.available === false) {
                    return (
                      "No"
                    )
                  } else {
                    return (
                      "Unknown"
                    )
                  }
                })()}</TableCell>
                <TableCell align="center"><Button onClick={() => selectProduct(item._id)} variant="outlined">Modify</Button></TableCell>
                <TableCell align="center"><Button onClick={() => deleteProduct(item._id)} variant="contained" color="error">Delete</Button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <h1 align="center">Update Product</h1>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th"><TextField id="outlined-basic" label="ID" variant="outlined" value={productId} onChange={(e) => { setProductId(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Type" variant="outlined" value={type} onChange={(e) => { setType(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Price" variant="outlined" value={price} onChange={(e) => { setPrice(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Rating" variant="outlined" value={rating} onChange={(e) => { setRating(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Warranty Years" variant="outlined" value={warranty_years} onChange={(e) => { setWarranty(e.target.value) }}/></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" label="Avialability" variant="outlined" value={available} onChange={(e) => { setAvilable(e.target.value) }}/></TableCell>
              <TableCell align="center"><Button variant="contained" align="center" color="success" onClick={updateProduct}>Update</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
export default Board;