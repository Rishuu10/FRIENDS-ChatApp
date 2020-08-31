import React, {Component} from 'react';
import { View,Text,ImageBackground,TouchableOpacity, TextInput, StyleSheet } from 'react-native';

class HomePage extends Component {

    goToLogin = () => {
    	this.props.navigation.navigate('Login');
    }

    goToRegister = () => { 
        this.props.navigation.navigate('Register');
    }

	render(){
		return(
            <ImageBackground 
             	source={require('../img/b4.jpg')}
             	style={{width:360, height: 700,}}>
            <View>
                  <Text style = {styles.qoute} >In This House We Are Friends </Text> 
                  <Text style = {styles.login}  onPress= {this.goToLogin} > LOGIN </Text> 
            </View>
            </ImageBackground>
			);
	}
};

export default HomePage;

const styles = StyleSheet.create ({
	qoute: {
		color: '#FFFFFF',
		fontWeight:'bold',
		fontSize: 30,
		padding: 5,
		bottom: 40,
		textAlign: 'center',
		top:280
	},

	login: {
		color: '#FFFFFF',
		fontSize: 22,
		backgroundColor: '#fa0000',
		fontWeight: 'bold',
		padding: 5,
		borderRadius: 30,
		width: 130,
		left: 110,
		bottom: 40,
		textAlign: 'center',
		top:290
	},
	
})