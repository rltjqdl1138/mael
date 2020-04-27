import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, Dimensions, Text} from 'react-native'
import SimpleHeader from '../components/SimpleHeader'
import deviceCheck from '../deviceCheck'
const screenHeight=Dimensions.get('window').height
export default class NoticePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            page:0,
            list:[],
            length:0,
            isLoaded:false
        }
        this.maximumContents = Math.floor(  (screenHeight-deviceCheck.getTopPadding() - 230) / 50 )
    }
    componentDidMount(){
        setTimeout(()=>{
            this.getInformation()
        },0)
    }
    getInformation = ()=>{
        const {state} = this
        this.setState({
            ...state,
            list:[
                {id:'029',index:29,title:'공지사항 29',date:'20.03.06'},
                {id:'028',index:28,title:'공지사항 28',date:'20.03.06'},
                {id:'027',index:27,title:'공지사항 27',date:'20.03.05'},
                {id:'026',index:26,title:'공지사항 26',date:'20.03.04'},
                {id:'025',index:25,title:'공지사항 25',date:'20.03.03'},
                {id:'024',index:24,title:'공지사항 24',date:'20.03.02'},
                {id:'023',index:23,title:'공지사항 23',date:'20.03.01'},
                {id:'022',index:22,title:'공지사항 22',date:'20.02.28'},
                {id:'021',index:21,title:'공지사항 21',date:'20.02.27'},
                {id:'020',index:20,title:'공지사항 20',date:'20.02.26'},
                {id:'019',index:19,title:'공지사항 19',date:'20.03.06'},
                {id:'018',index:18,title:'공지사항 18',date:'20.03.06'},
                {id:'017',index:17,title:'공지사항 17',date:'20.03.05'},
                {id:'016',index:16,title:'공지사항 16',date:'20.03.04'},
                {id:'015',index:15,title:'공지사항 15',date:'20.03.03'},
                {id:'014',index:14,title:'공지사항 14',date:'20.03.02'},
                {id:'013',index:13,title:'공지사항 13',date:'20.03.01'},
                {id:'012',index:12,title:'공지사항 12',date:'20.02.28'},
                {id:'011',index:11,title:'공지사항 11',date:'20.02.27'},
                {id:'010',index:10,title:'공지사항 10',date:'20.02.26'},
                {id:'009',index:9,title:'공지사항 9',date:'20.02.25'},
                {id:'008',index:8,title:'공지사항 8',date:'20.02.24'},
                {id:'007',index:7,title:'공지사항 7',date:'20.02.23'},
                {id:'006',index:6,title:'공지사항 6',date:'20.02.22'},
                {id:'005',index:5,title:'공지사항 5',date:'20.02.21'},
                {id:'004',index:4,title:'공지사항 4',date:'20.02.20'},
                {id:'003',index:3,title:'공지사항 3',date:'20.02.19'},
                {id:'002',index:2,title:'공지사항 2',date:'20.02.18'},
                {id:'001',index:1,title:'공지사항 1 공지사항 1 공지사항 1 공지사항 1 공지사항 1 공지사항 1 공지사항 1 공지사항 1 공지사항 1',date:'20.02.17'},
            ],
            length:29,
            page:1,
            isLoaded:true
        })
    }
    getPages = ()=>{
        const {length, page} = this.state
        const pages = Math.ceil(length / this.maximumContents)
        const startPage = Math.floor(page/10) * 10 + 1
        const pageComponents = [];
        
        if(startPage < 10)
            pageComponents.push(
                <View key='PrevBlank' style={styles.pageComponent} />)
        else
            pageComponents.push(
                <TouchableOpacity key='PrevButton' style={styles.pageComponent}
                onPress={()=>{
                    this.setState((state)=>({...state, page: startPage-1}))}} >
                    <Text>...</Text>  </TouchableOpacity>)
            
        for(var i=startPage; i<startPage+9 ; i++){
            const nowI = i
            if(nowI > pages)
                pageComponents.push(<View key={'pageTo'+nowI}style={styles.pageComponent}/>)
            else pageComponents.push(
                <TouchableOpacity key={'pageTo'+i} style={styles.pageComponent}
                    onPress={()=>{
                        this.setState((state)=>({...state, page: nowI}))}} >
                        <Text style={{fontWeight:nowI===page? 'bold':'normal'}}>{nowI}</Text>
                </TouchableOpacity>
            )
        }

        if(startPage+9 > pages)
            pageComponents.push(<View key='NextBlank' style={styles.pageComponent} />)
        else
            pageComponents.push(
                <TouchableOpacity key='NextButton' style={styles.pageComponent}
                    onPress={()=>{
                        this.setState((state)=>({...state, page: startPage+10}))}} >
                    <Text>...</Text>
                </TouchableOpacity>)

        return (
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                {pageComponents}
            </View>
        )
    }
    getComponents = (list)=>{
        const blank = (ind) => (
            <View style={styles.itemContainer} key={"blank"+ind}/>
        )
        const items = list.map(item=>{
            const {id, index, title, date} = item
            return(
                <View style={styles.itemContainer} key={id}>
                    <View style={styles.itemIndexContainer}>
                        <Text style={styles.itemText}>
                            {index}
                        </Text>
                    </View>
                    <View style={styles.itemTitleContainer}>
                        <Text numberOfLines={1} style={styles.itemText}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.itemDateContainer} >
                        <Text style={styles.itemDateText}>
                            {date}
                        </Text>
                    </View>
                </View>
            )
        })
        for(;items.length < this.maximumContents; items.push(blank(items.length)));
        return items
    }
    render(){
        const {navigator} = this.props
        const {list, isLoaded, page} = this.state
        list.slice(page-1, (page-1)*this.maximumContents)
        return(   
            <View style={styles.container}>
                <SimpleHeader 
                    title="공지사항"
                    handler={()=>{navigator.pop('NoticePage')}}
                    notice=''/>
                <View style={[styles.mainContainer,{opacity:isLoaded?1:0.5}]}>
                    <View style={{width:'100%',height:30,borderBottomColor:'#D9D5D5',borderBottomWidth:1,}}/>
                    {this.getComponents( list.slice((page-1)*this.maximumContents, page*this.maximumContents) )}              
                </View>
                <View style={styles.pageContainer}>
                    {this.getPages()}
                </View>
                <View style={[styles.loadingContainer,{display:isLoaded?'none':'flex'}]}>
                    <Text style={{textAlign:'center', fontSize:30, color:'gray'}}> Loading... </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        alignItems:'center',
    },
    mainContainer:{
        width:'100%',
        flex:1,
        paddingLeft:25,
        paddingRight:25,
    },


    itemContainer:{
        width:'100%',
        height:50,
        borderBottomColor:'#D9D5D5',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    itemIndexContainer:{
        width:30,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    itemTitleContainer:{
        flex:1,
        height:'100%',
        justifyContent:'center'
    },
    itemDateContainer:{
        width:60,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    itemText:{
        fontSize:12
    },
    itemDateText:{
        fontSize:10
    },


    pageContainer:{
        position:'absolute',
        bottom:0,
        height:'10%',
        width:'100%',
        backgroundColor:'#fff',
    },
    pageComponent:{
        width:25,
        height:'100%',
        padding:3,
        paddingTop:5
    },
    loadingContainer:{
        position:'absolute',
        width:'100%',
        height:200,
        top:'40%'
    }
})