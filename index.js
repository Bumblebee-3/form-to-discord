const express = require("express");
const app = express();
const aoijs = require("aoi.js")
const yourUserId="818377414367379487";

const bot = new aoijs.AoiClient({
  token: process.env.token,
  prefix: "!",
  intents: ["GUILDS", "GUILD_MESSAGES"]
})
bot.onMessage()
bot.command({
name: "ping",
code: `Pong! $pingms`
})
bot.readyCommand({
    channel: "",
    code: `$log[Ready on $userTag[$clientID]]`
})

const event = new aoijs.CustomEvent(bot)
event.command({
listen: "message",
code: `
  $title[1;$eventData[[0]] Sent you a message from your website.]
  $description[1;$eventData[[1]]]
  $color[1;RANDOM]
  $dm[${yourUserId}]`
})
event.listen("message")

app.get('/', (req, res) => {
  if (req.query.submit=="true") {
    return res.sendFile(__dirname + '/views/form2.html');
  }
  res.sendFile(__dirname + '/views/form.html');
});

app.get('/submit', (req, res) => {
  //console.log("User:"+req.query.usrname);
  //console.log("Message:"+req.query.msg);
  event.emit('message', req.query.usrname,req.query.msg);
  res.redirect("/?submit=true");
})

app.get("/pic.png",(req,res)=>{
  res.sendFile(__dirname + '/views/user.png');
})

app.listen(3000, () => {
  console.log('server started');
});