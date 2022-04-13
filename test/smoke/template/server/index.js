if(typeof window==='undefined'){
    global.window={};
}
const path=require('path');
const fs=require('fs');

const express=require('express');
const {renderToString}=require('react-dom/server');
const SSR_APP_STR=require('../dist/app-server.js');
const template=fs.readFileSync(path.join(__dirname,'../dist/app.html'),"utf-8");
const data=require('./data.json')

const server=(port)=>{
    const app=express();
    app.use(express.static('dist'))

    app.get('/app',(req,res)=>{
        let html=renderReact(SSR_APP_STR);
        res.status(200).send(html);
    })

    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}

server(process.env.PORT||3000);


const renderReact=(STR)=>{
    // return `<!DOCTYPE html>
    // <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Document</title>
    //     </head>
    //     <body>
    //         <div id="app">${renderToString(STR)}</div>
    //     </body>
    // </html>
    // `
    const dataStr=JSON.stringify(data);
    return template.replace("<!-- APP_SERVER_HTML -->",renderToString(STR)).replace('<!-- APP_SERVER_DATA -->',`<script>window.__initial_data=${dataStr}</script>`)
}


