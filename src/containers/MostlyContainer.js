import React, {Component} from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import { connect } from 'react-redux'
import { MostlyActions } from '../store/actionCreator'

import Mostly from '../components/Mostly'

const {width} = Dimensions.get('window')

class MostlyContainer extends Component{
    constructor(){
        super()
        this.handleUpdate()
    }
    handleUpdate(){
        // need Fetch 
        const list = [{
                MID:1,
                imageURL:'image',
                title:'Mostly Animals 1'
            },{
                MID:2,
                imageURL:'image',
                title:'Mostly Animals 2'
            },{
                MID:3,
                imageURL:'image',
                title:'Mostly Animal 3'
            }
        ]
        MostlyActions.update(list)
    }
    render(){
        const {list, navigator} = this.props
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Mostly Series
                    </Text>
                    <Text style={styles.subTitle}>
                        Mostly Soundbook Series
                    </Text>
                </View>
                <View style={styles.MostlyContainer}>
                    <Mostly mostlylist={list} navigator={navigator}/>
                </View>
                <View style={styles.bottomPaddingContainer}>
                    <View style={styles.bottomPadding} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    // CONTAINER

    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: width*0.7
    },
    

    // TITLE

    titleContainer:{
        width: '100%',
        flex: 1,
        justifyContent:'flex-start',
    },title:{
        fontSize: 16,
        color:'#121111',
        paddingLeft: 25,
        fontWeight:'bold'
    },subTitle:{
        color:'#767171',
        fontSize:10,
        paddingLeft:30,
    },

    // MAIN CONTENTS

    MostlyContainer:{
        flex: 5,
        width:'100%'
    },


    //PADDING

    bottomPaddingContainer:{
        height: 0,
        width:'100%',
        paddingLeft:20,
        paddingRight:20
    },
    bottomPadding:{
        height: 0,
        width:'100%',
        borderBottomWidth:0.5,
        borderBottomColor:'#ccc',

    }
})



export default connect(
    (state)  =>({
        list: state.mostly.list
    })
)(MostlyContainer)