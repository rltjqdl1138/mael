import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { AudioActions } from '../store/actionCreator'
import PlayingBar from './PlayingBar'

class PlayingControler extends Component{
    getButton = (props)=>{
        const { title, list } = props
        if(props.isPlaying === 1)
            return (
                <TouchableOpacity style={styles.buttonItem}
                    onPress={()=>{AudioActions.pause({infoNumber:1})}}>
                    <Text> Pause </Text>
                </TouchableOpacity>
            )
        return (
            <TouchableOpacity style={styles.buttonItem}
                onPress={()=>{AudioActions.resume({infoNumber:1})}}>
                <Text> Resume </Text>
            </TouchableOpacity>
        )
    }
    getPlayingBar = (playinfo, isPlaying)=>{
        if(this.isFirst)
            return(
                <View style={styles.timeContainer}>
                    <Text style={styles.leftTimeText}>0:00</Text>
                    <Text style={styles.rightTimeText}>0:00</Text>
                </View>
            )
        return(<PlayingBar playinfo={playinfo} infoNumber={1} isPlaying={isPlaying} theme='gray'/>)
    }
    render(){
        const {newPlayinfo, isPlaying, getTime, index, playOption} = this.props
        const PLAYBACK_LIMIT = 5000
        return (
            <View style={styles.container}>
                <View style={styles.controlerContainer} >
                    {this.getPlayingBar(newPlayinfo, isPlaying)}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{AudioActions.changeOption()}}  >

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{
                            if(getTime() < PLAYBACK_LIMIT)
                                AudioActions.replay()
                            else
                                AudioActions.next({infoNumber:1, index})
                        }}>
                        
                    </TouchableOpacity>

                    {this.getButton(this.props)}

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{AudioActions.next({infoNumber:1}) }}>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{alert(index)}}>
                        
                    </TouchableOpacity>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>{playOption.option}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    controlerContainer:{
        height:20,
        width:'100%'
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        paddingLeft:25,
        paddingRight:25
    },
    buttonItem:{
        flex:1,
        height:'100%',
        borderWidth:1,
        borderColor:'#000'
    },

    timeContainer:{
        height:20,
        width:'100%',
        backgroundColor:'#fff',
        alignItems:'flex-end',
        flexDirection:'row'
    },
    leftTimeText:{
        flex:1,
        fontSize:10,
        textAlign:'left',
        paddingLeft:10
    },
  
    rightTimeText:{
        flex:1,
        fontSize:10,
        textAlign:'right',
        paddingRight:10
    },


    optionContainer:{
        height:30,
        width:'100%'
    },
    optionText:{
        textAlign:'center',
        color:'#777'
    },
    test1:{
        width:200,
        height:'100%',
        backgroundColor:'gray'
    },

    test2:{
        width:200,
        height:'100%',
        backgroundColor:'red'
    },

    test3:{
        width:200,
        height:'100%',
        backgroundColor:'blue'
    }
})
export default connect(
    ({audio})  =>({
        isPlaying: audio.isPlaying,
        newPlayinfo: audio.newPlayinfo,
        playOption: audio.playOption
    })
)(PlayingControler)