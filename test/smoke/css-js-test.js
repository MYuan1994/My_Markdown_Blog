const glob=require('glob-all')

describe('checking generated css js files',()=>{
    it('should generate css js files',(done)=>{
        const files=glob.sync([
            '../template/dist/app_*.js',
            '../template/dist/app_*.css'
        ])
        if(files.length>0){
            done()
        }else{
            throw new Error('no css js files')
        }
    })
})