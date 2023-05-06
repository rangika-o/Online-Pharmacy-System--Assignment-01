import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MaterialTable from "material-table";
import { Box } from '@material-ui/core'

const initialState = {
    total:'',
    cart: [],
    columns: [
        { title: "Image", field: "image" , editable: 'never',
        render: rowData =>
        <Box
          component="img"
          sx={{ 
            width: 100,
            maxWidth: { xs: 25, md: 100 },
          }}
          alt="Image"
          src={"http://localhost:3500/"+rowData.image}
        />},
        { title: "Title", field: "title" , editable: 'never'},
        { title: "Description", field: "description", editable: 'never'},
        { title: "Price", field: "price", editable: 'never'},
        { title: "Quantity", field: "cart_quantity" , type:'numeric' },
        { title: "Total", field: "total", editable: 'never'}
    ]
}

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = async() => {
        const url = "http://localhost:3500/Cart/"+localStorage.getItem('id');
        await axios.get(url).then(async(response) => {
          var temp_total=0
          response['data'].forEach((row, index) => {
            temp_total=temp_total+row['total']
          })
          await this.setState({cart:response['data'],total:temp_total})
          console.log("total="+temp_total)
        })
    }
    
    SubmitForm = async(newRow, oldRow) => {
      if(oldRow["quantity"]>=newRow["cart_quantity"]){
        const url = "http://localhost:3500/cart/" + oldRow["id"]
        const data = JSON.stringify({
          quantity: newRow["cart_quantity"],
          price: oldRow["price"],
        });
        console.log(data);
        await axios
          .put(url, data, {
            headers: { "Content-Type": "application/json" },
          })
          .then(async(res) => {
            console.log(res.data);
            swal("Success!", "Update Successful!", "success")
            await this.componentDidMount()
          });
      }else{
        swal("Error!", "Available Quantity Exceeded!", "error")
      }
    }

    onDelete= async(id)=>{
        await swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const url = 'http://localhost:3500/cart/';
                axios.delete(url+id)
                .then(async(res) =>{
                    swal("Delete Successful!", {
                        icon: "success",
                    })
                    await this.componentDidMount()
                });
            }
          })
    }
   
    render (){
        const { cart , columns } = this.state;
        return (
          <div>
                    <br />
                    <MaterialTable
                        tableRef={this.componentDidMount}
                      title="Cart Table"
                      columns={columns}
                      data={cart}
                      style={{
                        maxWidth: "80%",
                        padding: "20px 5px",
                        margin: "0 auto",
                        fontFamily: "Arial, sans-serif",
                      }}
                      options={{
                        filtering: true,
                        sorting: true,
                        actionsColumnIndex: -1,
                      }}
                      editable={{
                        onRowUpdate: (newRow, oldRow) =>
                          new Promise(async (resolve, reject) => {
                            this.SubmitForm(newRow, oldRow);
                            console.log(oldRow._id);
                            setTimeout(() => resolve(), 300);
                          }),
                        onRowDelete: (selectedRow) =>
                          new Promise((resolve, reject) => {
                            console.log(selectedRow);
                            this.onDelete(selectedRow.id);
                            setTimeout(() => resolve(), 300);
                          }),
                      }}
                    />
                    <br />
                    <hr/>
                        <div class="col-lg-12">
                            <h1 class="card-title">{ "Total Price Rs."+this.state.total }</h1>
                            <br/>
                            <a class="btn btn-outline-primary col-md-4" href="/checkout" >Checkout</a>
                        </div>
                        <br/>
          </div>
        );
    }
}

export default Cart;
