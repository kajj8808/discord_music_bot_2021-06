const axios = require("axios");

const getImageData = async (url) => {
  console.log(typeof(url))
  const imageData = await axios.get({url , responseType : "arraybuffer"});
  console.log(imageData)
};

const app = () => {
  //getImageData("https://i.ytimg.com/vi/LfgeFUSG9Q4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAMhTLvy_Q4a_1J7EoJLSjmLMg4fw");
};
// 1 . image 데이터 를 axios 로 받아오기 .
// 2 . image 의 평균값을 구한후 너무 어두운색이면 + ~% 를 더해서 r g b 값을 구한다 .
// 3 . rgb 값을 hex 으로 변환시킨후 return .!

app();
