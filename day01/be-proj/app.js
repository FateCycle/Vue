const express = require('express');

const bodyParser=require('body-parser');

const app = express();

todoList = [{
        id: 1,
        title: '吃饭'
    },
    {
        id: 2,
        title: '吃饭'
    },
    {
        id: 3,
        title: '吃饭',
    },
    {
        id: 4,
        title: '吃饭',
    }
];

app.use(bodyParser.urlencoded(false));
app.use(bodyParser.json());
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);
    else next();
    });
app
    .get('/todos', (req,res) => {
        res.json(todoList);

    })
    .post('/todos', (req,res) => {
        console.log(req.body);
        const todo={
            id:todoList[todoList.length-1].id+1,
            title:req.body.title,
        };
        todoList.push(todo);
        res.json(todo);
    })
    .patch('/todos/:todoid', (req,res) => {

    })
    .delete('/todos/:todoid', (req,res) => {

    })


app.listen(3000,()=>{
    console.log('api server running 3000');
})