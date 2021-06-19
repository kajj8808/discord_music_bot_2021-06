const Discord = require("discord.js");

const ran_color = () => {
  const colors = [
    "#C4E538",
    "#FDA7DF",
    "#12CBC4",
    "#006266",
    "#EE5A24",
    "#9980FA",
    "#5758BB",
    "#1B1464",
    "#F79F1F",
    "#FFC312",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const embed = (title , userName) =>
  new Discord.MessageEmbed()
    .setColor(ran_color())
    .setTitle(`skip - ${title}`)
    .setDescription(`Request by : ${userName}`)
    .setTimestamp()
    .setFooter(
      "namuneulbo#1144 ⚙ ",
      "http://drive.google.com/uc?export=view&id=1vvD6IDopLAZT74bIAj2-gLje-SIYdo-I"
    );

module.exports = {
  skipEmbed : embed,
};
