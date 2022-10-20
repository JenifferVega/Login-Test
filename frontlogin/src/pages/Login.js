import React, {  Component } from "react";
import "../css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const baseUrl ="http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: "",
            password: "",

        }
    }
    
    handleChange=async e=>{
       await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
       // console.log(this.state.form);
    }

    iniciarSesion=async ()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})

        .then(response=>{
            return response.data;
        })

        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set("id", respuesta.id, {path: "/"});
                cookies.set("apellido_paterno", respuesta.apellido_paterno, {path: "/"});
                cookies.set("apellido_materno", respuesta.apellido_materno, {path: "/"});
                cookies.set("nombre", respuesta.nombre, {path: "/"});
                cookies.set("username", respuesta.username, {path: "/"});
                alert(`Bienvenid@ ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";
            }else{
                alert("el usuario y contraseña no son iguales");
                    
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }


    render(){
        return (
            <div className="login-box">
                <h2>Login</h2>
                <form action="#">
                    <div className="user-box">
                    <input type="text" name="username" required="" onChange={this.handleChange}/>
                    <label>Username</label>
                    </div>
                    <div className="user-box">
                    <input type="password" name="password" required="" onChange={this.handleChange}/>
                    <label>Password</label>
                    </div>
                    <button type="button" onClick={()=> this.iniciarSesion()} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                    </button>
                </form>
        </div>
        );
    }
}

export default Login;