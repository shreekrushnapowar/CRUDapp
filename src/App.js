import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import AddProduct from "./components/AddProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({})
  const [filterProducts, setFilterProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getDetails();
  }, []); 
  

  const onChange = (e) =>{
    setNewProduct({...newProduct,[e.target.name]:e.target.value})

  }
  const onSubmit = () =>{
    const newProd={
      id : products.length+1,
      title:newProduct.title,
      price:newProduct.price,
      category:newProduct.category,
      rating:{rate:newProduct.rate,count:newProduct.count},
      description:newProduct.description
    }
    setFilterProducts(oldArray => [...oldArray, newProd]);
    setProducts(oldArray => [...oldArray, newProd]);
    handleClose()
  }
  const getDetails = async () => {
    setOpen(true);
    fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((json) => {
        setOpen(false);
        setProducts(json);
        setFilterProducts(json);
      });
  };
  function handleSearchClick(searchVal) {
    setSearch(searchVal);
    if (searchVal === "") {
      setFilterProducts(products);
      return;
    }
    const filterBySearch = products.filter((item) => {
      return item.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFilterProducts(filterBySearch);
  }
  return (
    <div className="App" justify="space-between">
      {console.log(filterProducts)}
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>
      <Form.Control
        type="product"
        id="product"
        value={search}
        placeholder="search "
        aria-describedby="passwordHelpBlock"
        onChange={(e) => {
          handleSearchClick(e.target.value);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct onChange={onChange} onSubmit={onSubmit}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Edit</th>
             
          </tr>
        </thead>
        <tbody>
          {open && <Spinner animation="border" variant="primary" />}
          {filterProducts.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.price}</td>
                <td>{data.category}</td>
                <td>
                  {data.rating["rate"]} {data.rating["count"]}
                </td>
                <td>{data.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
