import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native'

import { connect } from 'react-redux'
import { ThemeActions } from '../store/actionCreator'

import Theme from '../components/Theme'

class ThemeContainer extends Component{
    constructor(){
        super()
        this.handleUpdate()
    }
    handleUpdate(){

        // need Fetch 
        
        const list = [{
            title:'Listen by Mood',
            themeList:[{
                TID:'1',
                imageURL:'h',
                title:'Sleepy' },{
                TID:'2',
                imageURL:'h',
                title:'Dance' },{
                TID:'3',
                imageURL:'h',
                title:'I dont no'
            }]
        },{
            title:'Music Focus',
            themeList:[{
                TID:'4',
                imageURL:'h',
                title:'Jazz' },{
                TID:'5',
                imageURL:'h',
                title:'Blues' },{
                TID:'6',
                imageURL:'h',
                title:'I dont no'
            }]
        },{
            title:'Listen by Language',
            themeList:[{
                TID:'7',
                imageURL:'h',
                title:'Korean English' },{
                TID:'8',
                imageURL:'h',
                title:'English'
            }]
        }]
        ThemeActions.update(list)
    }
    
    render(){
        const {list} = this.props
        return(
            <View style={styles.container}>
                <ThemeItem list={list}/>
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
    },
})



class ThemeItem extends Component{
    render(){
        const {list} = this.props
        const themeItems = !list ?
            (<Text> Blank </Text>):
            list.map(
                theme => {
                    const {title, themeList} = theme
                    return (
                        <Theme
                            key={title}
                            themeList={themeList}
                            title={title}
                        />
                    )
                }
            )
            return(
                <View style={containerStyle.container}>
                    { themeItems }
                </View>
            )
    }
}


const containerStyle = StyleSheet.create({
    container:{
        width:'100%'
    },
    scroll:{
        height:'100%'
    }
})


export default connect(
    (state)  =>({
        list: state.theme.list
    })
)(ThemeContainer)