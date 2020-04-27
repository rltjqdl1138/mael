const ROOT_AUTH = '/Users/kimks/Projects/maelserver/music/raw/'
const ROOT_NON_AUTH = '/Users/kimks/Projects/maelserver/music/raw/'

const fs = require('fs')
const url = require('url')

exports.loadFile = (req,res)=>{
    const parsedUrl = url.parse(req.url).pathname.split('/')
    console.log('mp3파일 요청', parsedUrl[1])
    console.log(req.headers)
    if(parsedUrl[1].includes('.'))
        return res.end('/music URL does not include dot(.)\n'
            + 'do you mean "/music/' + (parsedUrl[1].split('.'))[0] + '"?')
    const pathname = (req.decoded?ROOT_AUTH:ROOT_NON_AUTH) + parsedUrl[1] + '.mp3'

    fs.stat( pathname, (err, stats) => {
        if (err)
            return res.status(404).send(parsedUrl[1] + ' is not registered music')
        
        res.writeHead(200, {"Content-Type" : "audio/mpeg",
                            'Content-Length': stats.size} )
        fs.readFile(pathname, (err,data)=>{
            if(err)
                return res.status(404).send(parsedUrl[1] + ' is not registered music')
            res.end(data)
        })
        /*
        const stream = fs.createReadStream( pathname )
            .on("open",()=>{stream.pipe(res)})
            .on("error",(err)=>{res.end(err)})
            */
        });
}

exports.basicRouter = (req, res)=>{
    const {name} = req.decoded
    res.send('Welcom to mael Music ' + name)
}