import React from 'react';
import '../App.css';

class Admin extends React.Component {

    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="justify-content-center">
                    <h1>Admin</h1>
                    <div class="x_scroll">
                    <hr/>
                        <div class="col-lg-12">
                            <a class="btn btn-outline-primary col-md-4" href="/item" >Item</a>
                        </div>
                        <br/>
                        <div class="col-lg-12">
                            <a class="btn btn-outline-primary col-md-4" href="/item_all" >Item All</a>
                        </div>
                        <br/>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Admin;
