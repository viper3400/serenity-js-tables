const express = require("express");
const app = express();

app.use(express.static('./express/static'))

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});