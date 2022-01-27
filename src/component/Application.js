import React, { Component } from 'react'
import axios from 'axios';
const regForName = RegExp(/^[a-zA-Z]{2,20}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForphone = RegExp(/^[7-9][0-9]{9}$/);
const regForusername = RegExp(/^[a-zA-Z]{2,20}$/);

export class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: null,
            lname: null,
            username: null,
            email: null,
            password: null,
            cpassword: null,
            phone: null,

            errors: {
                fname: '',
                lname: '',
                username: '',
                email: '',
                password: '',
                cpassword: '',
                phone: '',

            }
        }
    }
    handler = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'fname':
                errors.fname = regForName.test(value) ? '' : 'Enter alphabet only';
                break;
            case 'lname':
                errors.lname = regForName.test(value) ? '' : 'Enter alphabet only';
                break;
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Email is not valid';
                break;
            case 'username':
                errors.username = regForusername.test(value) ? '' : 'Enter alphabet only ';
                break;

            case 'password':
                errors.password = value.length < 8 ? 'Password must me 8 chanrater long' : '';
                break;
            case 'cpassword':
                errors.cpassword = value.length < 8 ? 'Enter valid Password' : '';
                break;

            case 'phone':
                errors.phone = regForphone.test(value) ? parseInt('') : 'Enter 10 digit only';
                break;
            default:

        }
        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }
    add = (event) => {
        event.preventDefault()
        let formData = {
            fname: this.state.fname,
            lname: this.state.lname, 
            username: this.state.username,
            email:this.state.email,
            password:this.state.password,
             }
        
        const URL = "http://localhost:3002/Emp"
        axios.post(URL, formData)
        .catch(err => { console.log(err) })
        // this.call()
        this.formSubmit();
    }
    formSubmit = (event) => {
        // event.preventDefault();
        if (this.validate(this.state.errors)) {
            alert("Valid Form");
            this.props.history.push("/Login")  
        }
        else {
            alert("Invalid Form");
        }
    }
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        if (this.state.password !== "undefined" && this.state.cpassword !== "undefined") {
            if (this.state.password !== this.state.cpassword) {
                valid = false;
                alert("Passwords does not match!");
            }
        }
        return valid;
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="container text-uppercase" style={{ backgroundColor: "#f9f7f7" }}>
                <h2 className="display-4 text-uppercase text-center">  Registration </h2>
                <h2 className="display-4 text-uppercase text-center"> form</h2>
                <form onSubmit={this.formSubmit}>
                    <div class="form-row ">
                        <div class="form-group col-md-6">
                            <label for="fname">FIRST NAME</label>
                            <input type="text" id="101" class="form-control form-control-sm" name="fname" onChange={this.handler} />
                            {errors.fname.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.fname}</span>}<br />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="lname"> LAST NAME</label>
                            <input type="text" id="102" class="form-control form-control-sm" name="lname" onChange={this.handler} />
                            {errors.lname.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.lname}</span>}<br />
                        </div>

                    </div>
                    <div className="form-group">
                        <label for="username">USERNAME</label>
                        <input type="text" class="form-control form-control-sm" name="username" required onChange={this.handler} />
                        {errors.username.length > 0 &&
                            <span style={{ color: 'red' }}>{errors.username}</span>}<br />
                    </div>


                    <div class="form-row">


                        <div className="form-group form-group col-md-6">
                            <label for="email">Email</label>
                            <input type="text" class="form-control form-control-sm" name="email" required onChange={this.handler} />
                            {errors.email.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="phone"> PHONE NO:</label>
                            <input type="number" name="phone" class="form-control form-control-sm" required onChange={this.handler} />
                            {errors.phone.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.phone}</span>}<br />
                        </div>


                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="password">PASSWORD</label>
                            <input type="password" name="password" class="form-control form-control-sm" required onChange={this.handler} />
                            {errors.password.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.password}</span>}<br />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="cpassword">CPassword</label>
                            <input type="password" name="cpassword" class="form-control form-control-sm" required onChange={this.handler} />
                            {errors.cpassword.length > 0 &&
                                <span style={{ color: 'red' }}>{errors.cpassword}</span>}<br />
                        </div>
                    </div>



                    <div class="form-row text-center">
                        <div class="form-group col-md-6">
                            <input className="btn btn-outline-dark border-0" type="submit" value="SUBMIT" onClick={this.add} />
                        </div>
                        <div class="form-group col-md-6">
                            <input className="btn btn-outline-dark border-0" type="reset" value="RESET" />
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default Application;
