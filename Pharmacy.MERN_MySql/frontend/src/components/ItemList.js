import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material';

const initialState = {
    id: "",
    search: "",
    Item: [],
}

class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const url = "http://localhost:3500/Item/"
        axios.get(url)
        .then(response => this.setState({Item:response['data']})
        )
    }
   
    render (){
        const { Item } = this.state;
        return (
            <div class="container">
            <br/><br/>
            <div class="justify-content-center">
                    <h2>All Item</h2>
                    <hr/>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        Item.map((res) =>
                        <Grid item xs={2} sm={4} md={4} >
                            <div class="card">
                                <img class="card-img-top" src={ "http://localhost:3500/" + res.image } alt=""/>
                                <div class="card-body">
                                    <h5 class="card-title">{ res.title }</h5>
                                    <h3 class="card-title">{ 'price : '+res.price }</h3>
                                    <a href={"item_detail/" + res.id } class="btn btn-primary">Select</a>
                                </div>
                            </div>
                        </Grid>)
                    }
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ItemList;
