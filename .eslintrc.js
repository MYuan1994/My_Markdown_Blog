module.exports={
    "parser":'babel-eslint',
    "extends":"airbnb-base",
    plugins:[
        "react-hooks"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    rules:{
        'no-tabs':'off',
        // 检查 Hooks 的使用规则
        "react-hooks/rules-of-hooks": "error", 
        // 检查依赖项的声明
        "react-hooks/exhaustive-deps": "warn"
    }
}