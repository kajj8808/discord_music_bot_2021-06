const Discord = require("discord.js");
const { discord_token, prefix } = require("./config.json");
const { execute, play, skip } = require("./functions/excute");

const app = new Discord.Client();

app.login(discord_token);
app.on("ready", () => {
  console.log("discord bot login!");
});

app.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  if (msg.content.startsWith(`${prefix}play`) || msg.content.startsWith(`${prefix}p`)) {
    if (msg.member.voice.channel) {
      const playCommand = msg.content.split(" ")[0];
      const userName = msg.author.username;
      if (playCommand === `${prefix}p`) {
        msg.delete({ timeout: 0 });
        execute(msg.content.split(`${prefix}p `)[1], msg, userName);
      } else {
        msg.delete({ timeout: 0 });
        execute(msg.content.split(`${prefix}play `)[1], msg, userName);
      }
    } else {
      msg.delete({ timeout: 1350 });
      msg.channel
        .send("voice channel join!")
        .then((joinMsg) => setTimeout(() => joinMsg.delete(), 10000));
    }
  } else if (msg.content.startsWith(`${prefix}skip`) || msg.content.startsWith(`${prefix}s`)) {
    msg.delete({ timeout: 0 });
    skip(msg);
  } else {
    return;
  }
});
