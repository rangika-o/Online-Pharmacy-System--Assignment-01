import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {
    id: "",
    title: "",
    description: "",
    a_quantity: "",
    price: "",
    image: "",
    quantity: "",
    quantityError: "",
    days: "",
    daysError: "",
    note: "",
    noteError: "",
    total:"",
    Item: [],
}

class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const url = "http://localhost:3500/Item/"+this.props.match.params.id;
        axios.get(url)
        .then(response => {
            this.setState({description:response['data'][0]['description'],image:response['data'][0]['image'],price:response['data'][0]['price'],a_quantity:response['data'][0]['quantity'],title:response['data'][0]['title'],id:response['data'][0]['id']})
            console.log(response['data'][0])
        })
    }

    handleChange = async(e) => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
        var total = (this.state.price*1)*(e.target.value*1)
        await this.setState({
            total:total
        })
    }

    onClear(){
        this.setState(initialState);
    }

    validation = async() => {

        let quantityError = "";

        if(!this.state.quantity){
            quantityError="Quantity Required!"
        }else if(this.state.quantity>this.state.a_quantity){
            quantityError="Available Quantity Exceeded!"
        }

        if( quantityError ){
            
            await this.setState({ quantityError });
            
            return false;

        }else{

            await this.setState({ quantityError });
            return true;
            
        }

    }

    SubmitForm = async(e) => {
        e.preventDefault();
        if(await this.validation()){
          console.log(this.state);
          const url = 'http://localhost:3500/cart/';
          const data = JSON.stringify({ quantity: this.state.quantity , total: this.state.total, item_id: this.props.match.params.id , user_id: localStorage.getItem('id')});
          console.log(data);
          await axios.post(url,data,{
              headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
              console.log(res.data);
              this.setState(initialState)
              this.componentDidMount()
              swal("Success!", "Add Successful!", "success")
              this.props.history.push("/cart")
          })
        }
    }

    render (){
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <h2>Item</h2>
                    <hr/>
                        <div class="card">
                            <img class="card-img-top" src={ "http://localhost:3500/" + this.state.image } alt=""/>
                            <div class="card-body">
                                <h5 class="card-title">{ this.state.title }</h5>
                                <h3 class="card-title">{ 'price : '+this.state.price }</h3>
                                <h3 class="card-title">{ 'Available Quantity : '+this.state.a_quantity}</h3>
                                <p class="card-text">{ 'description : '+this.state.description }</p>
                                <br/>
                            </div>
                        </div>
                    <hr/>
                    <h1>Add to Cart</h1>
                    <br/>
                    <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Quantity</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.quantityError}</div>
                            </div>
                        </div>
                        <br/> <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Total</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control" name="total" value={this.state.total} onChange={this.handleChange} readOnly/>
                                <div style={{color : "red"}}>{this.state.totalError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="col-md-4 offset-md-4">
                            <input type="submit" class="btn btn-outline-primary" value="Submit" />
                            <input type="button" class="btn btn-outline-danger" value="Clear" onClick={() => this.onClear()} />
                        </div>
                        <br/><br/>   
                    </form>
                </div>
            </div>
        );
    }
}

export default ItemDetail;
