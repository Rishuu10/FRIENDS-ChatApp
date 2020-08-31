import React, {Component} from 'react';
import { View, Text,ImageBackground,TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userLogin } from '../actions/userAction';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {} 
        };
        this.validateForm = this.validateForm.bind(this);
    }
    
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({password: text })
    }

    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr === '') {
            errors.email="Email address cannot be empty.";
        } else if(emailaddr.length > 0 && !reg.test(emailaddr)){
            errors.email="Please provide correct email address.";
        } else {
            errors.email='';
        }

        if (pass ===''){
            errors.pass="Password cannot be empty.";
        } else if(pass && pass.length < 5) {
            errors.pass="Password should have more than 5 characters.";
        } else {
            errors.pass='';
        }
        this.setState({ errors })
        if(errors.email==='' && errors.pass===''){
          //this.submitForm();
          const userinfo={
            email:this.state.email,
            password:this.state.password
          }
           console.log(userinfo,"userinfo")
           this.props.onLogin(userinfo)
    }
}

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    } 
componentDidUpdate(nextProps){
    if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
    }
}

    render() {
        const { errors} = this.state;
        return ( 
               <View>
               
                 <ImageBackground 
                source={require('../img/4.jpg')}
                style={{width:360, height: 700,}}>

               <View style ={styles.container}>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email..."
                    placeholderTextColor = "#000000"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail} /> 
                <Text style={[styles.errorstyle]}> {errors.email}</Text>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password..."
                    placeholderTextColor = "#000000"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword} />
                <Text style={[styles.errorstyle]}>{errors.pass}</Text>


                <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress = {this.validateForm}>
                    <Text style = {styles.submitButtonText }> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {styles.submitButton1} >
                    <Text style = {styles.submitButtonText1} onPress = {this.goToRegister} >Register </Text>
                </TouchableOpacity>
        
            </View>
            </ImageBackground>
            </View>

            );    
    }
}
function mapStateToProps(state) {
    console.log(state,"state")
    return{
        userReducer:state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onLogin:(userinfo) => dispatch(userLogin(userinfo))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    qoute: {
        color: '#FFFFFF',
        fontWeight:'bold',
        fontSize: 30,
        padding: 5,
        bottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 30,
        width: '75%',
        padding: 10,
        fontSize: 16,
        lineHeight: 20,
        color: '#000000',
        top:30,
        backgroundColor:'white'
        
        
    },
    submitButton: {
        backgroundColor: '#f5169c',
        padding: 12,
        margin: 15,
        height: 40,
        borderRadius: 30,
        width: 120,
        top:30,
        right:70
        
    },
    submitButton1: {
        backgroundColor: '#f5169c',
        padding: 12,
        margin: 15,
        height: 40,
        borderRadius: 30,
        width: 120,
        bottom:40,
        left:70
        
    },
    submitButtonText:{
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 10,

    },
    submitButtonText1:{
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 10,

    },

    errorstyle: {
        color: 'white',
       top:30 
    }
})