import { NextFunction } from 'connect'
import express, {Request, Response} from 'express'
const app = express()
const port = 3000

let requestCounter = 0

let blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.blabla = 'hell'
    next()
}

let authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.sendStatus(401)
    }
}

let requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++
    next()
}

app.use(requestCounterMiddleware)
app.use(authMiddleWare)
app.use(blablaMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/home', (req, res) => {
    //@ts-ignore
    const blabla = req.blabla
    res.json({value: blabla + requestCounter})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})