const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true,useUnifiedTopology: true , useCreateIndex:true,useFindAndModify:false})
.then(()=>console.log("veri tabanına bağlanıldı"))
.catch(hata=>console.log(`veri tabanı bağlantı hatası ${hata}`))