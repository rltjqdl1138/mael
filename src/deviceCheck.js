
import * as Device from 'expo-device'
import {PixelRatio} from 'react-native'

const topbarless = [
    'iPhone10,1',  //iPhone 8
    'iPhone10,2',  //iPhone 8 Plus
    'iPhone10,3',  //iPhone X Global
    'iPhone10,4',  //iPhone 8
    'iPhone10,5',  //iPhone 8 Plus
    'iPhone10,6',  //iPhone X GSM
    'iPhone11,2',  //iPhone XS
    'iPhone11,4',  //iPhone XS Max
    'iPhone11,6',  //iPhone XS Max Global
    'iPhone11,8',  //iPhone XR
    'iPhone12,1',  //iPhone 11
    'iPhone12,3',  //iPhone 11 Pro
    'iPhone12,5',  //iPhone 11 Pro Max
]
class deviceCheck{
    constructor(){
        const found = topbarless.find(element => element === Device.modelId);
        if(found)
            this.ifTopbarless = true
        else
            this.ifTopbarless = false

    }
    ifIOS = Device.osName === 'iOS'
    getFontSize = (size)=>{
        if(this.ifIOS)
            return size
        else
            return size /PixelRatio.getFontScale()
    }

    getTopPadding = ()=>{
        if(this.ifIOS && this.ifTopbarless)
            return 35
        else if(this.ifIOS)
            return 15
        else
            return 52
    }
}

export default new deviceCheck()