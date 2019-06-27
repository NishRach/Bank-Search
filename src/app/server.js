const express = require('express');
const path = required('path');
const app = express();

app.user(express.static(__dirname + '/dist/BankSearch'));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/dist/BankSearch/index.html'));
});

app.listen(process.env.PORT || 3000);