// Response for Uptime Robot
const http = require('http');http.createServer(function(request, response){ response.writeHead(200, {'Content-Type': 'text/plain'});response.end('Discord bot is active now \n');}).listen(3000);
// Discord bot implements
const discord    = require('discord.js');const client = new discord.Client();
client.on('ready', message =>{console.log(`${client.user.tag}でログインしました。`);});
let greeting = 0;
let timezoneoffset = -9;
let tokyotime = new Date(
  Date.now() - (timezoneoffset * 60 - new Date().getTimezoneOffset()) * 60000
);
let now_hour = tokyotime.getHours();
let reply_nowhour = tokyotime.getHours();
let now_min = tokyotime.getMinutes();
if (now_min < 10) {
  now_min = "0" + now_min;
}
if (now_hour < 4) {
  greeting = "お疲れ様です！";
} else if (now_hour < 11) {
  greeting = "おはようございます！";
} else if (now_hour < 17) {
  greeting = "こんにちは！";
} else greeting = "こんばんは！";

let recover_hour = now_hour + 4;
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}
client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  //logを含むメッセージに反応
  if (message.content.match(/log/i)) {
    let channel = message.channel;
    let author = message.author.username;
    let timezoneoffset = -9;
    let tokyotime = new Date(
      Date.now() -
        (timezoneoffset * 60 - new Date().getTimezoneOffset()) * 60000
    );
    let now_hour = tokyotime.getHours();
    let now_min = tokyotime.getMinutes();
    if (now_min < 10) {
      now_min = "0" + now_min;
    }
    let recover_hour = now_hour + 4;
    if (recover_hour < 10) {
      recover_hour = "0" + recover_hour;
    } else if (recover_hour == 24) {
      recover_hour = "00";
    } else if (recover_hour == 25) {
      recover_hour = "01";
    } else if (recover_hour == 26) {
      recover_hour = "02";
    } else if (recover_hour == 27) {
      recover_hour = "03";
    } else if (recover_hour == 28) {
      recover_hour = "04";
    }
    let recover_time = recover_hour + ":" + now_min;
    if (now_hour < 10) {
      now_hour = "0" + now_hour;
    }
    let now_time = now_hour + ":" + now_min;
    let reply_text    = "さようならー！ただいま"+ now_time +"なので、"+"魔力の回復は"+ recover_time +"です！";
    message
      .reply(reply_text)
      .then(message => console.log(`Sent message: ${reply_text}`))
      .catch(console.error);
    return;
  }  
});
client.login(process.env.DISCORD_BOT_TOKEN);
