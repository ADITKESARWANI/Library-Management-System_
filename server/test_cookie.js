const express = require('express');
const app = express();
app.get('/', (req, res) => {
    let expire; // undefined
    res.cookie('token', 'value', {
        expires: new Date(Date.now() + expire * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).send('ok');
});
app.listen(3000, () => console.log('started'));
