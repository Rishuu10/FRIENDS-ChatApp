import React, {Component} from 'react';
import { View, Text, StyleSheet, ImageBackground , Image, TouchableOpacity } from 'react-native';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(){
        this.props.onUserList();
    }

    goChat = (userid, name) => {
        this.props.navigation.navigate('Chat', {userid: userid, name: name});
    }

    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
            this.setState({users: this.props.userReducer.userList});
            
        }
    }

//     render(){
//         const { users } = this.state;
//         return (
//               <View style={styles.container}>
//                 {users && users.length>0 ?
//                 <View>
//                 {users.map((item,index) => {
//                     return(
//                         <TouchableOpacity onPress={()=>this.goChat(item._id, item.name)}   key={index}>
//                         <Text style ={styles.item}>
//                             {item.name}
//                         </Text>
//                         </TouchableOpacity>
//                    })}
//                 </View>:null}
//                 </View>
//              )
//     }
// }
render() {
    const { users } = this.state;
    return (
        <ImageBackground 
            source={require('../img/9.jpg')}
            style={{width: 370, height: 700}}>
        
        <View style = {styles.container}>
            {users && users.length>0?
            <View>
                {users.map((item,index) =>
                {
                    return(<TouchableOpacity onPress={()=>this.goChat(item._id,item.name)} key={index}>
                        <Text style={styles.item}>
                            {item.name}
                        </Text></TouchableOpacity>
                    )})}
            </View>:null}
            </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return{
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return{
        onUserList:() => dispatch(userList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10
    },
    item: {
        paddingLeft:10,
        fontSize: 25,
        height: 50,
        color: '#ffffff',
        fontWeight:'bold'
    },
    text: {
        color: '#00BFFF',
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: '#808080',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 5,
        bottom: 60,
        left: 100,
    },

    header: {
        backgroundColor: '#ffffff',
        height: 70,
        borderTopColor: '#00BFFF',
        borderTopWidth: 4,
        borderBottomColor: '#00BFFF',
        borderBottomWidth: 4,
        borderColor: '#00BFFF',
    }
});