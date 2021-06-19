const Discord = require("discord.js");

/* h => 시 m => 분 s => 초 */
const cal = (time) => {
  let result = time;
  if (time.indexOf("H") !== -1) {
    result = result.split("H")[0] + "시 " + result.split("H")[1];
  }
  if (time.indexOf("M") !== -1) {
    result = result.split("M")[0] + "분 " + result.split("M")[1];
  }
  if (time.indexOf("S" !== -1)) {
    result = result.split("S")[0] + "초" + result.split("S")[1];
  }
  return result;
};

const embed = (videoId, title, thumbnail, duration, viewCount, like, dislike, color, userName) =>
  new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`${title}`)
    .setURL(`https://youtube.com/watch?v=${videoId}`)
    .setDescription(`Request by : ${userName}`)
    .addFields(
      //{ name: "UpDate", value: upDate },
      { name: "Length", value: cal(duration.split("PT")[1]) },
      { name: "ViewCount", value: viewCount, inline: true },
      { name: "Likes  👍", value: like, inline: true },
      { name: "DisLikes  👎", value: dislike, inline: true }
    )
    .setImage(thumbnail)
    .setTimestamp()
    .setFooter(
      "namuneulbo#1144 ⚙ ",
      "http://drive.google.com/uc?export=view&id=1vvD6IDopLAZT74bIAj2-gLje-SIYdo-I"
    );
module.exports = {
  playEmbed : embed,
};
