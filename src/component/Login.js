import React, { Component } from 'react'
import json from '../Server/emp.json';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            proData: [],
            userData: [],
            errors: {
                email: '',
                password: '',
            }
        }
    }
    componentDidMount() {
        this.setState({ proData: json.Emp })
    }
    handler = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Email is not valid';
                break;

            case 'password':
                errors.password = value.length < 8 ? 'Password must me 8 chanrater long' : '';
                break;
            default:

        }
        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }
    // formSubmit = (event) => {
    //     event.preventDefault();
    //     // let {items,email} = this.state;
    //     this.state.proData.map(data => {
    //         if (document.getElementById('email').value == data.email && document.getElementById('password').value == data.password) 
    //         {
    //             if (localStorage.getItem('mylogin') != undefined) 
    //             {
    //                 let arr = JSON.parse(localStorage.getItem('mylogin'));
    //                 arr.push(document.getElementById('email').value, document.getElementById('password').value);
    //                 localStorage.setItem('mylogin', JSON.stringify(arr));
    //                 alert("Form Submitted Sucessfully")
    //             }
    //             else{
    //                 let arr = [];
    //                 arr.push(document.getElementById('email').value, document.getElementById('password').value);
    //                 localStorage.setItem('mylogin', JSON.stringify(arr));
    //                 alert("Form Submitted Sucessfully");



    //             }
    //             alert("VERIFIED")
    //             this.props.history.push("/Home")  
    //          }
    //         else
    //         {
    //             alert("Pls Recheck E-mail or Password")
    //         }

    //     })
    // }

    formSubmit = (event) => {
        event.preventDefault();
        let formdata = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(formdata)
        if (this.validate(this.state.errors)) 
        {
            console.log(this.state.proData)

            for (var i = 0; i < this.state.proData.length; i++) 
            {
                if (this.state.proData[i].email === formdata.email && this.state.proData[i].password === formdata.password) {
                    alert("Login Succesfull");
                    this.setState({
                        userData: [...this.state.userData,
                        {
                            'email': formdata.email,
                            'password': formdata.password

                        }]

                    });
                    //    this.logIn=true;

                    localStorage.setItem('userdetails', formdata.email);
                    this.props.history.push("/Temp2")
                    break;
                }
                else if (i === this.state.proData.length-1) {
                    alert("Users data not correct");
                }
               
            }
            console.log(this.state)
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            console.log(this.state)
        }
        else 
        {

            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            alert("Invalid Form");
        }
    }

    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="container text-uppercase  justify-content-center" style={{ backgroundColor: "#f9f7f7", alignContent: "center", height: "350px", width: "500px" }}>
                <h2 className="display-4 text-uppercase text-center">Login Form</h2>

                <form onSubmit={this.formSubmit}>
                    <div className="form-group form-group ">
                        <label for="email">Email</label>
                        <input type="text" class="form-control form-control-sm" id="email" name="email" required onChange={this.handler} />
                        {errors.email.length > 0 &&
                            <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                    </div>
                    <div class="form-group ">
                        <label for="password">PASSWORD</label>
                        <input type="password" name="password" id="password" class="form-control form-control-sm" required onChange={this.handler} />
                        {errors.password.length > 0 &&
                            <span style={{ color: 'red' }}>{errors.password}</span>}<br />
                    </div>
                    <div class="form-row text-center">
                        <div class="form-group col-lg-6">
                            <input className="btn btn-outline-info border-0" type="submit" value="SUBMIT" onClick={this.formSubmit} />
                        </div>
                        <div class="form-group col-lg-6">
                            <input className="btn btn-outline-info border-0" type="reset" value="RESET" />
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default Login;
