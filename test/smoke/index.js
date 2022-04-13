const path=require('path')

const webpack=require('webpack')
const rimraf=require('rimraf')
const Mocha=require('mocha')

process.chdir(path.join(__dirname,"template"))

rimraf('./dist',()=>{
    console.log('\033[32m\033[1m\033[4m%s\033[0m', 'start TEST ...');

    const prodConfig=require('../../lib/webpack.prod');
    webpack(prodConfig,(err,stats)=>{
        if(err){
            console.error('\033[31m\033[1m\033[4m\033[0m',err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors:true,
            modules:false,
            children:false
        }))
        console.log('\033[3B\033[35m\033[1m%s\033[0m\033[0m','Webpack build success!Begin run test……')
        const mocha=new Mocha({
            timeout:'10000ms'
        })
        mocha.addFile(path.join(__dirname,"html-test.js"))
        mocha.addFile(path.join(__dirname,"css-js-test.js"))
        mocha.run()
        
        
    })

    

})

