import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';

const initialState = {
    id: "",
    fname: "",
    fnameError: "",
    lname: "",
    lnameError: "",
    email: "",
    emailError: "",
    phone: "",
    phoneError: "",
    address: "",
    addressError: "",
    amount: "",
    amountError: "",
    product:[]
}

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    componentDidMount = async() => {
        const url = "http://localhost:3500/Cart/"+localStorage.getItem('id');
        await axios.get(url).then(async(response) => {
            var temp_amount=0
            response['data'].forEach((data)=>{
                temp_amount = temp_amount+data.output.total
                console.log(data)
            })
            await this.setState({amount:temp_amount})
        })
    }

    onClear(){
        this.setState(initialState);
    }

    validation = async() => {

        let fnameError = "";
        let lnameError = "";
        let phoneError = "";
        let emailError = "";
        let addressError = "";
        let amountError = "";

        if(!this.state.fname){
            fnameError="First Name Required!"
        }

        if(!this.state.lname){
            lnameError="Last Name Required!"
        }

        if(!this.state.phone){
            phoneError="Phone Number Required!"
        }else if(this.state.phone.length!==10){
          phoneError="Phone Number 10 Digit!"
        }

        if(!this.state.email){
            emailError="Email Required!"
        }

        if(!this.state.address){
            addressError="Address Required!"
        }

        if(!this.state.amount){
            amountError="Amount Required!"
        }else if(this.state.amount<0){
            amountError="Amount 0!"
        }

        if( fnameError || lnameError || phoneError || emailError || addressError || amountError){
            
            await this.setState({ fnameError , lnameError , phoneError , emailError , addressError , amountError });
            
            return false;

        }else{

            await this.setState({ fnameError , lnameError , phoneError , emailError , addressError , amountError });
            return true;
            
        }

    }

    SubmitForm = async(e) => {
        e.preventDefault();
        if(await this.validation()){
          console.log(this.state);
          const url = 'http://localhost:3500/order/';
          const data = JSON.stringify({ fname: this.state.fname , lname: this.state.lname, email: this.state.email , phone: this.state.phone , address: this.state.address , amount: this.state.amount , user: localStorage.getItem('id')});
          console.log(data);
          await axios.post(url,data,{
              headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
              console.log(res.data);
              this.setState(initialState)
              swal("Success!", "Order Successful!", "success")
              this.props.history.push("/user")
          })
        }
    }

    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="justify-content-center">
                    <h1>Checkout</h1>
                    <div class="x_scroll">
                    <hr/>
                        <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">First Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="fname" value={this.state.fname} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.fnameError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Last Name</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" name="lname" value={this.state.lname} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.lnameError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Email</label>
                            <div class="col-md-6">
                                <input class="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.emailError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Phone Number</label>
                            <div class="col-md-6">
                                <input class="form-control" type="number" name="phone" value={this.state.phone} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.phoneError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Address</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" name="address" value={this.state.address} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.addressError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Amount</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" name="amount" value={this.state.amount} onChange={this.handleChange} readOnly required/>
                                <div style={{color : "red"}}>{this.state.amountError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <div class="col-md-4"></div>
                            <div class="col-md-6">
                                <button type="submit" class="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                        <br/><br/>   
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Checkout;
