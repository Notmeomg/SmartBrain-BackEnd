/*
Use the below example as a guide 
when setting environmental variables
To check env var using server:
console.log(process.env);
*/

const app = require('http')
    .createServer((req, res) => res.send('oh hi there!'));

const SERVERPORT = process.env.SERVERPORT
app.listen(SERVERPORT, () => {
    console.log(`Server is listening on port ${SERVERPORT}`);
})

