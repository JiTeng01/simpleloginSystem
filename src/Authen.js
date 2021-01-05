import React, {Component, createRef} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyCbT4AwpF5QSBsBKScNqOavB7AdMdZZZhs",
    authDomain: "usurvey-482e5.firebaseapp.com",
    databaseURL: "https://usurvey-482e5-default-rtdb.firebaseio.com",
    projectId: "usurvey-482e5",
    storageBucket: "usurvey-482e5.appspot.com",
    messagingSenderId: "484384308293",
    appId: "1:484384308293:web:bf8664a8422059ab79f72c",
    measurementId: "G-Y45203WCN8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

class Authen extends Component {
    emailRef = createRef();
    passwordref = createRef();

    login = (event) => {
        const email = this.emailRef.current.value;
        const password = this.passwordref.current.value;

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        
        promise.then(user => {
            var logout = document.getElementById('logout');
            var msg = "Loin as "+user.user.email;
            this.setState({err: msg});
            logout.classList.remove('hide');
        });
        promise.catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({err: err});
        });
    }

    signUp = () => {
        const email = this.emailRef.current.value;
        const password = this.passwordref.current.value;

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);

        promise
        .then(user => {
            var err = "Welcome "+ user.user.email;
            firebase.database().ref('users/'+user.user.uid).set({
                email: user.user.email
            });
            this.setState({err: err});
        });
        promise
        .catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({err: err});
        });
    }

    logout = () => {
        firebase.auth().signOut();
        var logout = document.getElementById('logout');
        var msg = "Logout successfully";
        this.setState({err: msg});
        logout.classList.add('hide');
    }

    constructor(props){
        super(props);

        this.state = {
            err: ''
        };
    }
    render(){
        return (
            <div>
                <input id="email" ref={this.emailRef} type="email" placeholder="Enter your email" /><br />
                <input id="password" ref={this.passwordref} type="password" placeholder="Enter your password" /><br />
                <p>{this.state.err}</p>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signUp}>Sign Up</button>
                <button onClick={this.logout} id="logout" className="hide">Log Out</button>
            </div>
        );
    }
}

export default Authen;