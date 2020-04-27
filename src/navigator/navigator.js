import React, {Component} from 'react'
import {StyleSheet, View, Animated, Dimensions, BackHandler } from 'react-native'
import { connect } from 'react-redux'


import {NavigatorActions} from '../store/actionCreator'


export const Route = () => null

const buildSceneConfig = (children = [])=>{
    const config = {}
    children.forEach(child => {
        config[child.props.name] =
            { key: child.props.name,
            component: child.props.component,
            config:{}
        }
    })
    return config
}


class Navigator extends Component {
    constructor(props){

        super(props)
        const sceneConfig = buildSceneConfig(props.children)
        const initialSceneName = props.children[0].props.name
        if(this.props.firstConfig)
            sceneConfig[initialSceneName].config = this.props.firstConfig
        
        this.state = {
            sceneConfig,
            stack: [sceneConfig[initialSceneName]],
        }

        NavigatorActions.register({
            id: props.id,
            push: this.handlePush,
            pop: this.handlePop
        })
    }
    handler = this.props.handler
    _animatedValue = new Animated.Value(0)


    handlePush = (sceneName, config) =>{
        const isThere = (element) => element['key'] === sceneName    
        const width = Dimensions.get('window').width
        const { stack } = this.state
        const ind = stack.findIndex(isThere)

    //BackHandler.addEventListener("hardwareBackPress", ()=>{this.handlePop(sceneName); return true})
        if(ind === -1){
            this.state.sceneConfig[sceneName].config = config
            this.setState(state => ({
                ...state,
                stack: [...state.stack, state.sceneConfig[sceneName]], 
            }),()=>{
                this._animatedValue.setValue(width)
                Animated.timing(this._animatedValue,{
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start()
            })
        }else{
            const newConfig = this.state.sceneConfig
            newConfig[sceneName].config = config
            this.setState(state => ({
                    ...this.state,
                    sceneConfig: newConfig
                })
            )
        }
    }

    handlePop = (sceneName) =>{
        const isThere = (element) => element['key'] === sceneName
        const { width } = Dimensions.get('window')
        const { stack } = this.state
        const ind = stack.findIndex(isThere)
        Animated.timing(this._animatedValue,{
            toValue: width,
            duration: 300,
            useNativeDriver: true
        }).start(()=>{
            this._animatedValue.setValue(0)
            this.setState(state =>{
                if(!sceneName || sceneName==="" || ind===-1){
                    //BackHandler.addEventListener("hardwareBackPress", ()=>{return false})
                    return {
                        ...state,
                        stack: stack.slice(0, 1)
                    }
                }
                else if(stack.length > ind){
                    //BackHandler.addEventListener("hardwareBackPress", ()=>{
                    //    this.handlePop(stack[ind-1].key)
                    //    return false})
                    return {
                        ...state,
                        stack: stack.slice(0, ind)
                    }
                }
                return state
            })
        })
        if(ind === -1){
            return stack.slice(1,stack.length)
        }

        return stack.slice(ind, stack.length)
    }
    render(){
        return (
            <View style={styles.container}>
                {this.state.stack.map((scene, index)=>{
                    const CurrentScene = scene.component
                    const sceneStyles = [styles.scene]

                    if(index === this.state.stack.length -1 && index > 0){
                        sceneStyles.push({
                            transform:[
                                { translateX: this._animatedValue}
                            ]
                        })
                    }

                    return (
                        <Animated.View key={scene.key} style={[sceneStyles]}>
                            <CurrentScene
                                navigator={{push:this.handlePush, pop:this.handlePop}}
                                config={scene.config}
                                handler={this.handler}
                                token={this.props.token}
                            />
                        </Animated.View>
                    )
                })}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
        height:'100%'
    },
    scene: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    }
})



exports.Navigator =  connect(
    (state)  =>({
        isSidebarOpen: state.navigator.isSidebarOpen,
        navList: state.navigator.navList,
        token: state.authentication.token
    })
)(Navigator)