const{
override,
addLessLoader,
fixBabelImports,
addDecoratorsLegacy
}=require('customize-cra')


module.exports=override(
       addLessLoader({

        lessOptions:{
            javascriptEnabled: true
        },
           
       }),
       addDecoratorsLegacy(),
       fixBabelImports('import',{
           libraryName:'antd',
           libraryDirectory:'es',
           style:true
       }),
       

)
   
