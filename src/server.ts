import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import dotenv from 'dotenv'
dotenv.config()

const directory = "dist/images"
const filePath = path.join(__dirname, "../", directory)

const server = http.createServer((req, res) => {
    const { method } = req
    const parsedUrl = url.parse(req.url || '', true)
    const { pathname, query } = parsedUrl
    const fileName = `veryhappydog.jpg` //query.fileName as string || undefined

    console.log('method',method)
    console.log('parsedUrl',parsedUrl)
    console.log(`query`, query)
    //Home
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("home page")
        return
    }

    //Read
    if (pathname === '/read' && method === 'GET') {
        console.log(`filepath`,filePath)
        fs.readFile(`${filePath}/${fileName}`, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end(`Error`)
                return
            }

            res.writeHead(500, { 'Content-Tyep': 'text/plain' })
            res.end(data)
        })
        return
    }
    // 404 Fallback
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Not Found!")
    return
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`server is running on poert ${PORT}`)
})