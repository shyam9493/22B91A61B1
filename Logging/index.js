const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) =>{
    const {stack, level, package, message} = req.query;
    if (!stack || !level || !package || !message) {
        res.status(400).send('Missing required query parameters: stack, level, package, message');
        return;
    }
    Log(stack, level, package, message);
    res.send('Log received successfully');
})



function Log(stack,level,package,message) {
    const axios = require('axios');
    axios.post('http://20.244.56.144/evaluation/logs', {
        stack: stack,
        level: level,
        package: package,
        message: message
    },{
        headers: {
            "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmI5MWE2MWIxQHNya3JlYy5hYy5pbiIsImV4cCI6MTc1MTAwMTMzNSwiaWF0IjoxNzUxMDAwNDM1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTNlYmI4MTMtMGNkNi00MTUwLThjOGYtMThhZThiNWI3ZWYzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibmFuZGFwdW5lZWRpIHNoeWFtIiwic3ViIjoiMGRmNTRiMDQtZjdiMi00NGFmLTg1MmYtNzFlYzllOGRhYzUzIn0sImVtYWlsIjoiMjJiOTFhNjFiMUBzcmtyZWMuYWMuaW4iLCJuYW1lIjoibmFuZGFwdW5lZWRpIHNoeWFtIiwicm9sbE5vIjoiMjJiOTFhNjFiMSIsImFjY2Vzc0NvZGUiOiJ4V1BOWHQiLCJjbGllbnRJRCI6IjBkZjU0YjA0LWY3YjItNDRhZi04NTJmLTcxZWM5ZThkYWM1MyIsImNsaWVudFNlY3JldCI6IktUZVNiZFpSc2dIamR5eWcifQ.vkV1phXt6LiZEugn9aqIEdUU_1gC1jolTWL5WUYmAoY"
        }
    })
    
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


module.exports = { Log };
