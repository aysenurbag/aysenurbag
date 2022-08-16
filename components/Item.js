import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity, ImagePropTypes } from 'react-native'
import {Feather} from '@expo/vector-icons';


export const Item = ({ title,value}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style ={styles.title}>{value}</Text>
      </View>
    );
  }

export const HeadItem = ({title}) =>{
  return (
    <View style={styles.header_Wrapper}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}


export const FoodItem = ({title,value,handleDelete}) =>{
const del_Food = (food) =>{
  handleDelete(food)
}
  return (
    <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{value}</Text>
        <TouchableOpacity onPress = {()=>del_Food(title)}>
            <Feather style = {styles.icon} name = "trash"/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:20,
      paddingHorizontal:10,
      borderBottomWidth:1,
      borderColor:'gray',
      borderRadius:4,
      backgroundColor:'#C1944E'
      

  },
  title:{
    fontSize: 22,
  },
  header_Wrapper:{
    paddingVertical:20,
    paddingHorizontal:10,
    borderBottomWidth:1,
    borderColor:'gray',
    backgroundColor:'#8B2729',
    borderRadius:4
  },
  header:{
    fontSize:22,
    color:'white'
  },
  icon:{
    fontSize: 24
  }
})
  
