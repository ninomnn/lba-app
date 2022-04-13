import React from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    fetch("http://localhost:4000/api/getAll")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true
        });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Pleses wait some time.... </h1>{" "}
        </div>
      );
		
    return (
	<body>
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
            {items.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
                <TableCell align="right">{row.warranty_years}</TableCell>
                <TableCell align="right">{(() => {
					if (row.available === true) {
						return (
							"Yes"
						)
					} else if (row.available === false) {
						return (
							"No"
						)
					} else {
						return (
							"Unknown"
						)
					}
				})()}</TableCell>
				<TableCell align="center"><Button variant="outlined">Modify</Button></TableCell>
				<TableCell align="center"><Button variant="contained" color="error">Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
	  <TableContainer>
	  <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <h1 align="center">New Product</h1>
          </TableHead>
          <TableBody>
			<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell component="th" scope="row"><TextField id="outlined-basic" label="ID" variant="outlined" /></TableCell>
                <TableCell align="right"><TextField id="outlined-basic" label="Name" variant="outlined" /></TableCell>
                <TableCell align="right"><TextField id="outlined-basic" label="Type" variant="outlined" /></TableCell>
                <TableCell align="right"><TextField id="outlined-basic" label="Price" variant="outlined" /></TableCell>
				<TableCell align="right"><TextField id="outlined-basic" label="Rating" variant="outlined" /></TableCell>
				<TableCell align="right"><TextField id="outlined-basic" label="Warranty Years" variant="outlined" /></TableCell>
				<TableCell align="right"><TextField id="outlined-basic" label="Avialability" variant="outlined" /></TableCell>
				<TableCell align="center"><Button variant="contained" align="center" color="success">Add</Button></TableCell>
			</TableRow>
          </TableBody>
        </Table>
	  </TableContainer>
	</body>
    );
  }
}

export default App;
