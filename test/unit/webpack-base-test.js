const assert=require('assert')

describe('webpack.base.js test case',()=>{
    const baseConfig=require('../../lib/webpack.base.js')
    it('entry',()=>{
        assert.equal(baseConfig.entry.app,'/Users/zhangmingyuan/WorkSpace/WorkSpace_Webpack/webpack_react/build_webpack/test/smoke/template/src/app/index.js')
    })
})