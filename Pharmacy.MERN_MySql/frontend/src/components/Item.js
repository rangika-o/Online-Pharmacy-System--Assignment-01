import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';

const initialState = {
    id: "",
    title: "",
    titleError: "",
    description: "",
    descriptionError: "",
    quantity: "",
    quantityError: "",
    price: "",
    priceError: "",
    image: "",
    imageError: "",
    selectedFile: ""
}

class Item extends React.Component {

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

    onClear(){
        this.setState(initialState);
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        }, () => {
            const data = new FormData() 
            data.append('file', this.state.selectedFile)
            axios.post("http://localhost:3500/Item/upload", data, { 
            }).then(res => { 
                this.setState({image:res.data.filename})
            })
        })
    }

    validation = async() => {

        let titleError = "";
        let priceError = "";
        let descriptionError = "";
        let quantityError = "";
        let imageError = "";

        if(!this.state.quantity){
            quantityError="Quantity Required!"
        }

        if(!this.state.title){
            titleError="Title Required!"
        }

        if(!this.state.price){
            priceError="Price Required!"
        }

        if(!this.state.description){
            descriptionError="Description Required!"
        }

        if(!this.state.image){
            imageError="Image Required!"
        }

        if( titleError || priceError || descriptionError || quantityError || imageError ){
            
            await this.setState({ titleError , priceError , descriptionError , quantityError , imageError });
            
            return false;

        }else{

            await this.setState({ titleError , priceError , descriptionError , quantityError , imageError });
            return true;
            
        }

    }

    SubmitForm = async(e) => {
        e.preventDefault();
        if(await this.validation()){
          console.log(this.state);
          const url = 'http://localhost:3500/Item/';
          const data = JSON.stringify({ image: this.state.image , title: this.state.title , quantity: this.state.quantity , price: this.state.price, description: this.state.description });
          console.log(data);
          await axios.post(url,data,{
              headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
              console.log(res.data)
              if(res.data.err){
                swal("Title Error!", "Unsuccessful!", "error")
              }else{
                this.setState(initialState)
                swal("Success!", "Add Successful!", "success")
              }
          })
        }
    }

    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="justify-content-center">
                    <h1>Item</h1>
                    <div class="x_scroll">
                    <hr/>
                        <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                        <label  class="col-md-4 col-form-label text-md-right">Title</label>
                            <div class="col-md-6">
                                <input formControlName="title" type="text" name="title" class="form-control" value={this.state.title} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.titleError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label  class="col-md-4 col-form-label text-md-right">Description</label>
                            <div class="col-md-6">
                                <input formControlName="description" type="text" name="description" class="form-control"  value={this.state.description} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.descriptionError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Image</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control" name="file"  onChange={this.onChangeHandler} />
                                {
                                    (this.state.image!=="")?(<img class="img-thumbnail" src={ "http://localhost:3500/" + this.state.image } />):(<div></div>)
                                }
                                <div style={{color : "red"}}>{this.state.imageError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Price</label>
                            <div class="col-md-6">
                                <input formControlName="price" type="number" name="price" class="form-control" value={this.state.price} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.priceError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Quantity</label>
                            <div class="col-md-6">
                                <input formControlName="quantity" type="number" name="quantity" class="form-control" value={this.state.quantity} onChange={this.handleChange} required/>
                                <div style={{color : "red"}}>{this.state.quantityError}</div>
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

export default Item;
