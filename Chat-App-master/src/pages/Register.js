import React, { Component } from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { View, Text,ImageBackground, TouchableOpacity, TextInput, StyleSheet } from 'react-native'; 

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {}
        };
        this.validateForm = this.validateForm.bind(this);
    }
     

    handleName = (text) => {
        this.setState({ name: text})
      }

      handleDisplayName = (text) => {
        this.setState({ displayname: text})
      }

    handleEmail = (text) => {
        this.setState({ email: text})
      }
      handlePassword = (text) => {
        this.setState({ password: text})
      }


      validateForm () {
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        
        if (name === ''){
            errors.name = "Name cannot be empty.";
        } else {
            errors.name = '';
        }

        if (displayname === ''){
            errors.displayname = " Display name cannot be empty.";
        } else {
            errors.displayname = '';
        }

        if (emailaddr === ''){
          errors.email = "Email address cannot be empty.";
        } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
          errors.email = "Please provide correct email address";
        } else {
          errors.email = '';
        }
    
        if (pass === ''){
          errors.pass = "Password cannot be empty.";
        } else if (pass && pass.length < 5) {
          errors.pass = "Password should be more than 5 characters.";
    
        } else {
          errors.pass = '';
    
        } 
        this.setState({ errors})
        if (errors.name==='' && errors.displayname==='' && errors.email=== '' && errors.pass === ''){
          this.submitForm();
        }
      }

submitForm = async () => {
    let that = this;
    axios.post('http://192.168.43.228:8082/registeruser',{
        name: this.state.name,
        displayname: this.state.displayname,
        email: this.state.email,
        password: this.state.password
    })
    .then(function (response) {
        if(response && response.data && response.data._id) {
            that.props.navigation.navigate('Home');
        } else {
            Toast.show(respone.data.message, 1000); 
        }
    })
    .catch(function (error){
        console.log(error);
    });

}

goToLogin = () => {
    this.props.navigation.navigate('Login');
}

render() {
    const { errors } = this.state;
    return (

        <ImageBackground 
             source={require('../img/5.jpg')}
             style={{width: 400, height: 800, right:20}}>
        
        <View style={styles.container}>
            
            <TextInput  
              style={styles.input}
              placeholder="Name..." 
              placeholderTextColor="#000000"
              autoCapitalize="none"
              onChangeText={this.handleName}/>
           <Text style={[styles.errorstyle]}>{errors.name}</Text>      

            <TextInput  
              style={styles.input}
              placeholder="Display Name..." 
              placeholderTextColor="#000000"
              autoCapitalize="none"
              onChangeText={this.handleDisplayName}/>
           <Text style={[styles.errorstyle]}>{errors.displayname}</Text>      
          
            <TextInput  
              style={styles.input}
              placeholder="Email..." 
              placeholderTextColor="#000000"
              autoCapitalize="none"
              onChangeText={this.handleEmail}/>
           <Text style={[styles.errorstyle]}>{errors.email}</Text>      
  
            <TextInput  
              secureTextEntry
              style={styles.input}
              placeholder="Password..." 
              placeholderTextColor="#000000"
              autoCapitalize="none"
              onChangeText={this.handlePassword}/>
            <Text style={[styles.errorstyle]}>{errors.pass}</Text>    
        
          <TouchableOpacity 
          style={styles.submitButton}
          onPress={this.validateForm}>
          <Text style={styles.submitButtonText }> Register</Text>
          </TouchableOpacity>

          </View>
          </ImageBackground>
   
    );
  }
}


export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderRadius: 30,
    borderWidth: 3,
    width: '70%',
    padding: 10,
    fontSize: 16,
    color: '#000000',
    bottom:70,
    backgroundColor:'white'
  },
  submitButton: {
    backgroundColor: '#0a97f0',
    padding: 12,
    margin: 15,
    height: 40,
    borderRadius: 30,
    width: 120,
    bottom:70
  
  },
  submitButtonText:{
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom:12,


  },
  errorstyle: {
    color: 'red',
    bottom:70
  },
})