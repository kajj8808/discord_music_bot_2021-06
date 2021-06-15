const youtubeApi = require("./api");

const getYouTubeData = async (term) => {
  let videoInfo = "";
  try {
    videoInfo = await youtubeApi.search(term);
  } catch (error) {
    /* api key 가 할당량 다썻을떄 랜덤으로 다시..  */
    videoInfo = await youtubeApi.search(term);
  }

  /* get vidoe ID */
  const {
    id: { videoId },
  } = videoInfo.data.items[0];

  /* get vidoe Title , thumbnail*/
  let videoDetail = await youtubeApi.videos(videoId, "snippet");
  const {
    snippet: { title, thumbnails },
  } = videoDetail.data.items[0];

  /* 섬네일중 가장큰 섬네일의 url 을 가져옴. */
  let thumbnail = "";
  if (thumbnails.maxres !== undefined) {
    thumbnail = thumbnails.maxres.url;
  } else if (thumbnails.high !== undefined) {
    thumbnail = thumbnails.high.url;
  } else if (thumbnails.medium !== undefined) {
    thumbnail = thumbnails.medium.url;
  } else {
    thumbnail = thumbnails.default.url;
  }

  /* return youtube data ...  */
  return { videoId, title, thumbnail };
};

const main = async () => {
  const youtubeData = await getYouTubeData("EGOIST x M2U – 絶体絶命 (Zettai Zetsumei)");
  console.log(youtubeData);
};
//main()

