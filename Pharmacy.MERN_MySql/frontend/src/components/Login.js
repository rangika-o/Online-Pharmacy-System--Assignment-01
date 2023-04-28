import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';

const initialState = {
  id: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: ""
}

class Login extends React.Component {

  constructor(props) {
      super(props);
      this.state = initialState;
  }

  componentDidMount() {
      if(localStorage.getItem('usertype')==='admin'){
          window.location.href = "/admin";
      }else if(localStorage.getItem('usertype')==='user'){
          window.location.href = "/user";
      }
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

  validation = async() => {

      let emailError = "";
      let passwordError = "";

      if(!this.state.email){
          emailError="Email Required!"
      }

      if(!this.state.password){
          passwordError="Password Required!"
      }

      if( emailError || passwordError ){
          
          await this.setState({ emailError , passwordError });
          
          return false;

      }else{

          await this.setState({ emailError , passwordError });
          return true;
          
      }

  }

  SubmitForm = async(e) => {
      e.preventDefault();
      if(await this.validation()){
        console.log(this.state);
        const url = 'http://localhost:3500/user/login/';
        const data = JSON.stringify({ email: this.state.email , password: this.state.password });
        console.log(data);
        await axios.post(url,data,{
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            console.log(res.data.err);
            if(res.data.err){
                swal("Error!", res.data.err, "error");
            }else if(res.data){
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("usertype", res.data.userType);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("loginAccess", true);
                console.log(res.data.userType)
                if (res.data.userType === "admin") {
                    this.props.history.push("/admin")
                } else {
                    this.props.history.push("/user")
                }
            }
            this.setState(initialState)
        })
      }
  }

  render (){
      return (
          <div class="container">
          <div className="col-lg-12">
          <br/><br/>
          <div class="justify-content-center">
                  <h1>Login</h1>
                  <div class="x_scroll">
                  <hr/>
                      <form autoComplete="off" onSubmit={this.SubmitForm}>
                      <div class="form-group row">
                          <label class="col-md-4 col-form-label text-md-right font-weight-bold">Email</label>
                          <div class="col-md-6">
                              <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                              <div style={{color : "red"}}>{this.state.emailError}</div>
                          </div>
                      </div>
                      <br/>
                      <div class="form-group row">
                          <label class="col-md-4 col-form-label text-md-right font-weight-bold">Password</label>
                          <div class="col-md-6">
                              <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                              <div style={{color : "red"}}>{this.state.passwordError}</div>
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
              </div>
          </div>
      );
  }
}

export default Login;