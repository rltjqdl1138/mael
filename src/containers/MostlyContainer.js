import React, {Component} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

import { connect } from 'react-redux'
import { MostlyActions } from '../store/actionCreator'

import Mostly from '../components/Mostly'

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
                title:'MOSTLY ANIMAL 1'
            },{
                MID:2,
                imageURL:'image',
                title:'MOSTLY ANIMAL 2'
            },{
                MID:3,
                imageURL:'image',
                title:'MOSTLY ANIMAL 3'
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
                </View>
                <View style={styles.MostlyContainer}>
                    <Mostly mostlylist={list} navigator={navigator}/>
                </View>
                <View style={styles.bottomPadding} />
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
        height: 320,
        paddingTop: 15
    },
    

    // TITLE

    titleContainer:{
        width: '100%',
        flex: 1,
    },title:{
        paddingLeft: 40,
        fontSize: 20,
        fontWeight: "bold"
    },


    // MAIN CONTENTS

    MostlyContainer:{
        flex: 7
    },


    //PADDING

    bottomPadding:{
        height: 10,
        width:'80%',
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    }
})



export default connect(
    (state)  =>({
        list: state.mostly.list
    })
)(MostlyContainer)