const axios = require("axios");
const sharp = require("sharp");

// 1 . image 데이터 를 axios 로 받아오기 .
const getImageData = async (url) => await axios.get(url, { responseType: "arraybuffer" });

// 2 . image 의 평균값을 구한후 너무 어두운색이면 + ~% 를 더해서 r g b 값을 구한다 .
const avgImageColor = async (imageData, left, top, width, height) => {
  const sharpImg = new sharp(imageData);
  const bufferData = await sharpImg.extract({ left, top, width, height }).toBuffer();
  let { channels } = await sharp(bufferData).stats();
  channels = channels.map((channel) => Math.round(channel.mean));
  /* 3가지색들 다가져와서 모두다 기준치이하면 모두다 어느정도 더해주는 걸하기위함. 더밝은색으로! */
  let rgb;
  /* 채널이 3개 이상 나올때가 있어서.. */
  channels = channels.filter((channel, index) => index < 3);
  rgb = channels.map((color) => Math.round(color));
  return rgb;
};

//2.5 .. 컨셉 컬러를 찾아서...
const getImageConceptColor = () => {};

// 3 . rgb 값을 hex 으로 변환시킨후 return .!
const hexCal = (rgb) => `#${rgb.map((color) => color.toString(16)).join("")}`;

const app = async (imageInfo) => {
  const {url ,left, top, width, height} = imageInfo;
  const { data: imageData } = await getImageData(url);
  const avgRGB = await avgImageColor(imageData , left, top, width, height);
  const hexColor = hexCal(avgRGB);
  return hexColor;
};

module.exports = app;
