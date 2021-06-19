const ytdl = require("ytdl-core-discord");
const youtube = require("./youTube");
const { playEmbed } = require("../msgContainer/playMsg");
const { skipEmbed } = require("../msgContainer/skipMsg");

let playing = false;
let playList = [];
let connection = "";
let nowPlaying = "";

const execute = async (term, msg, userName) => {
  if (term === undefined) {
    msg.channel.send("msg is none!");
    return;
  }
  const { videoId, title, thumbnail, duration, viewCount, like, dislike, color } =
    await youtube.getInfo(term);
  if (playing === true) {
    playList.push({ videoId, title, thumbnail, duration, viewCount, like, dislike, color });
    msg.channel
      .send(`Added to music playlist!🎧 - ${title}`)
      .then((songAddMsg) => setTimeout(() => songAddMsg.delete(), 5000));
    return;
  } else {
    playList.push({
      videoId,
      title,
      thumbnail,
      duration,
      viewCount,
      like,
      dislike,
      color,
      userName,
    });
    play(msg);
  }
};

const play = async (msg) => {
  if (!playList[0]) {
    playing = false;
    connection.play("/skip"); /* skip and playList none => play off */
    return msg.channel
      .send("Playlist is empty!")
      .then((emptyMsg) => setTimeout(() => emptyMsg.delete(), 8000));
  }
  connection = await msg.member.voice.channel.join();
  const { videoId, title, thumbnail, duration, viewCount, like, dislike, color, userName } =
    playList.shift();
  nowPlaying = { title, userName };
  playing = true;
  await msg.channel
    .send(
      playEmbed(
        videoId,
        title,
        thumbnail,
        duration,
        Number(viewCount).toLocaleString("ja-JP"),
        Number(like).toLocaleString("ja-JP"),
        Number(dislike).toLocaleString("ja-JP"),
        color,
        userName
      )
    )
    .then((songInfoMsg) => setTimeout(() => songInfoMsg.delete(), 420000));
  connection
    .play(await ytdl(`https://youtube.com/watch?v=${videoId}`, { filter: "audioonly" }), {
      type: "opus",
      volume: 0.5,
      bitrate: "auto",
    })
    .on("finish", () => {
      setTimeout(() => {
        if (playing === false) {
          msg.guild.me.voice.channel.leave();
          return;
        }
      }, 18000); /* songs 이 끝나고 노래를 재생중이지 않을떄. 보이스 채널을 떠남 */
      play(msg);
    });
};

const skip = (msg) => {
  playing = false;
  msg.channel
    .send(skipEmbed(nowPlaying.title, nowPlaying.userName))
    .then((skipMsg) => setTimeout(() => skipMsg.delete(), 10000));
  play(msg);
};

module.exports = {
  execute,
  play,
  skip,
};
