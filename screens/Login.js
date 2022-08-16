import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword,login} from '../actions/user'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native'
import * as firebase from 'firebase'

class Login extends React.Component{
    static navigaitonOptions ={
        header: null
    }
    handleLogin = () =>{
        this.props.login()
        this.props.user.email = ""
        this.props.user.password =""
    }
    render(){
        return (
            <View style = {styles.container}>
                <StatusBar barStyle= "light-content"></StatusBar>
                <Image 
                    source={require('../assets/jesus.jpg')}
                    style = {
                        {
                            width:300,
                            height:80,
                            marginLeft:100
                            
                        }}></Image>
                <Text style = {styles.greeting}>{`Hello again. \nWelcome back`}</Text>
                <View style = {styles.form}>
                    <View>
                        <Text style = {styles.inputTitle}>Email addres</Text>
                        <TextInput 
                            style = {styles.input} 
                            autoCapitalize= 'none'
                            onChangeText = {email => this.props.updateEmail(email)}
                            value = {this.props.user.email}
                        >
                        </TextInput>
                    </View>
                    <View style = {{marginTop:32}}>
                        <Text style = {styles.inputTitle}>Password</Text>
                        <TextInput 
                            style = {styles.input} 
                            secureTextEntry 
                            autoCapitalize= 'none'
                            onChangeText = {password => this.props.updatePassword(password)}
                            value = {this.props.user.password}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style = {styles.button} onPress = {this.handleLogin}>
                    <Text style = {{color:'#fff', fontWeight:'400'}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {{alignSelf:'center', marginTop:32}}
                    onPress = {()=>this.props.navigation.navigate('Register')}
                    >
                    <Text style = {{color: '#45a446',fontSize:13}}>
                        New to appFood ? <Text style = {{fontWeight:'500',color:'#e9446a'}}> Sign up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    greeting:{
        marginTop:32,
        fontSize:18,
        fontWeight: "400",
        textAlign: 'center'
    },
    errorMessage:{
        height:72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error:{
        color:"#e9446a",
        fontSize: 13,
        fontWeight:"600",
        textAlign:'center'
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
        color: '#8a8f9e',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input:{
        borderBottomColor: '#8a8f9e',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        fontSize: 15,
        color: '#161f3d'
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: '#006400',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login}, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
