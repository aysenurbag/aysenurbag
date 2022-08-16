import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import * as firebase from 'firebase'

import {getData} from '../actions/user'
import {db} from '../config/Firebase'
import {Item} from '../components/Item'



class Home extends React.Component{
    
    state = {
        email: '',
        displayName: '',
        currentUser:'',
        snap_List: []
    }

        getData = ()=>{
            this.props.getData()
            // const docRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('foods')
            // let list=[]
    
            // docRef.get().then((doc)=>{
            //         console.log("we got it ------")
            //         doc.docs.forEach(e =>{
            //             list = list.concat(e.data().db_user_nutrient)
            //         })
            //         this.setState({snap_List: this.state.snap_List = list})
            // }).catch(e =>console.log(e))
        }

    componentDidMount(){
        const {email,displayName} = firebase.auth().currentUser
        this.setState({email,displayName})

    }

    signOut = () =>{
        firebase.auth().signOut()
    }

 
    render(){
        return (
            <View style = {styles.container}>
                <Text>Hi {this.state.email}</Text>

                <TouchableOpacity 
                    style = {styles.button} 
                    onPress = {() => this.props.navigation.navigate('AddFood')}
                >
                    <Text style = {{color:'#fff', fontWeight:'400'}}>Add Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {this.getData}
                >   
                    <Text style = {{color:'#fff', fontWeight:'400'}}>Get Data </Text>
                </TouchableOpacity>
            
            <FlatList
                extraData = {this.props.food.snapShot}
                data = {this.props.food.snapShot}
                renderItem = {({item}) =>{
                    return(
                        <View>
                            <Item title = {item.foodName}/>
                            <Item title = {item.nutrientName}/>
                            <Item title = {item.unitName} value = {item.value}/>
                        </View>
                    )
                }}
                keyExtractor = {(item,index) => {index.toString()}}
            />
                <TouchableOpacity style = {styles.button} onPress = {this.signOut}>
                    <Text style = {{color:'#fff'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    
    },   
    form:{
        marginBottom:48,
        marginTop:30,
        marginHorizontal:30,
    },
    input:{
        borderBottomColor: '#8a8f9e',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        width: 200,
        fontSize: 15,
        color: '#161f3d',
        marginBottom:20
    },
    button:{
        alignSelf:'center',
        marginVertical:20,
        backgroundColor: '#006400',
        borderRadius: 4,
        height: 40,
        width:80,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        getData
    },dispatch)
}
const mapStateToProps = (state) =>{
    return {
        food : state.food
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

