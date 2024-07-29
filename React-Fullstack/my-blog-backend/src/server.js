import { db, connectToDb } from './db.js';
import express from 'express';

let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: [],
},
{
    name: 'learn-node',
    upvotes: 0,
    comments: [],
},
{
    name: 'learn-express',
    upvotes: 0,
    comments: [],
}]

//localhost:3000/articles/learn-node

const app = express();
app.use(express.json());

// app.post('/hello', (req, res) => {
//     console.log(req.body)
//     res.send(`Hello! ${req.body.name}`);
// });http://localhost:8000/hello

// app.get('/hello/:name', (req,res) => {
//     const { name } = req.params;
//     res.send(`Hello ${name} !!`)
// });//http://localhost:8000/hello/Shaun

app.get('/api/articles/:name', async (req,res) => {
    const {name} = req.params;
    
    const article = await db.collection('articles').findOne({ name });
    if (article){
        res.json(article);
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
   
    await db.collection('articles').updateOne({ name },{
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });
    // const article = articlesInfo.find(a => a.name === name);
    if(article){
        res.json(article)
    }else{
        res.send('The article dosent exist')
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const {postedBy,text} = req.body;
    const {name} = req.params;

    // const article = articlesInfo.find(a=>a.name===name);
    
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name })

    if(article){
        res.json(article);
    }
    else{
        res.send("that article dosen't exist")
    }
    
})

connectToDb(() => {
    console.log('Successfully connected to database');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})

