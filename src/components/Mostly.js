import React, {Component} from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity,ScrollView } from 'react-native';



class MostlyItem extends Component {
    render(){
        const {navigator} = this.props
        const conf = {
            title:this.props.title,
            temp:'aaa'
        }
        //onPress={navigator.push('PlayingContainer',option)}
        return(
            <TouchableOpacity style={itemStyle.container} onPress={()=>{navigator.push('PlayingContainer',conf)}}>

                <View style={itemStyle.imageContainer}>
                    <Image style={itemStyle.image}
                        source={require('../image/owl.jpg')}
                    />
                </View>

                <View style={itemStyle.titleContainer}>
                    <Text style={itemStyle.title}>
                        {this.props.title}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
}



const itemStyle = StyleSheet.create({
    container:{
        width:260,
        height:'100%',
        paddingRight: 20,
        paddingLeft: 20
    },
    imageContainer:{
        padding:10,
        flex: 5
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },


    titleContainer:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    title:{
        fontSize: 20,
        color:'#777',
        textAlign:'center'
    }
})

export default class Mostly extends Component{
    render(){
        const {mostlylist, navigator} = this.props
        const mostlyItems = !mostlylist ?
            (<Text> Blank </Text>):
            mostlylist.map(
                mostly => {
                    const {MID, imageURL, title} = mostly
                    return (
                        <MostlyItem
                            key={MID}
                            MID={MID}
                            imageURL={imageURL}
                            title={title}
                            navigator={navigator}
                        />
                    )
                }
            )
            return(
                <View style={containerStyle.container}>
                    <ScrollView style={containerStyle.scroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        { mostlyItems }
                    </ScrollView>
                </View>
            )
    }
}

const containerStyle = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%'
    },
    scroll:{
        height:'100%'
    }
})