const db = new (require('../../database/music'))('Music')

exports.getAlbumGroup = (req, res)=>{
    (async()=>{
        const result = await db.getAlbumGroupList()
        res.json({
            success:true,
            result
        })
    })()
}

exports.getAlbum = (req, res)=>{
    const {group} = req.query;

    (async()=>{
        const groupList = await db.getAlbumGroupList()
        const albumList = await db.getAlbumTitle()
        const resultList = []
        await albumList.map(item=>{
            if(!resultList[item.groupID])
                resultList[item.groupID] = {}
            if(!resultList[item.groupID].list)
                resultList[item.groupID].list = [item]
            else
                resultList[item.groupID].list = [...resultList[item.groupID].list, item]
        })
        const completeList = await groupList.map(item =>{
            const {ID, title, subTitle} = item
            if(!resultList[ID] || !resultList[ID].list)
                return {ID, title, subTitle, list:[]}
            return {ID, title, subTitle, list:resultList[ID].list}
        })
        res.json({
            success:true,
            result: completeList
        })
    })()
}

exports.getMusicByAlbum = (req, res)=>{
    const album = parseInt(req.query.album)
    console.log('[Music] Get musics in album: ', album)
    if(!album || album === NaN)
        return res.status(404).send("album ID is empty");
    (async()=>{
        const response = await db.getMusicListByAlbumID(album)
        const musics = await response.musics.map((item, index)=>{
            const {MID, title, uri, lyric, info} = item
            return { ID:MID, title, uri, lyric, info, lyricLine:10, index:index+1 }
        })
        const {ID, groupID, title, artist, info} = response.album
        res.json({
            success:true,
            album:{ID, groupID, title, artist, info},
            musics
        })
    })()
}

exports.getMusicInfo = (req, res) =>{
    const {title} = req.query
    if(!title || title==='')
        return res.status(404).send('music title is empty');
    (async()=>{
        const result = await db.findOneByTitle(title)
        res.json({
            success:true,
            result
        })
    })
}

exports.registerMusic = (req, res) =>{
    const {albumID, index, title, info, type, artImg, lyric} = req.body;
    if(!title || title === '')
        return res.status(404).sned('title is empty')
    (async()=>{
        await db.registerMusic({albumID, index, title, info, type, artImg, lyric})
    })
}
