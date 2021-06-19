const youtubeApi = require("../api");
const imgAvgColor = require("./imageColor");

/* 유튜브 섬네일에 여백이 있을때가있어서.. */
const getThumbnailInfo = (thumbnails) => {
  let url = "";
  let imageSize = "";
  const thumbnailInfo = {
    maxres: { left: 275, top: 0, width: 730, height: 720 },
    standard: { left: 138, top: 60, width: 364, height: 360 },
    high: { left: 105, top: 45, width: 270, height: 270 },
    medium: { left: 69, top: 0, width: 180, height: 180 },
    default: { left: 25, top: 11, width: 70, height: 67 },
  };
  if (thumbnails.maxres !== undefined) {
    url = thumbnails.maxres.url;
    imageSize = "maxres";
  } else if (thumbnails.standard !== undefined) {
    url = thumbnails.standard.url;
    imageSize = "standard";
  } else if (thumbnails.high !== undefined) {
    url = thumbnails.high.url;
    imageSize = "high";
  } else if (thumbnails.medium !== undefined) {
    url = thumbnails.medium.url;
    imageSize = "medium";
  } else {
    url = thumbnails.default.url;
    imageSize = "default";
  }
  const { left, top, width, height } = thumbnailInfo[imageSize];
  return { url, left, top, width, height };
};

const getVideoInfo = async (videoId) => {
  /* get vidoe Title , thumbnail*/
  let videoInfo = {};
  await youtubeApi.videos(videoId, "snippet").then((snippet) => {
    const {
      snippet: { title, thumbnails },
    } = snippet.data.items[0];
    Object.assign(videoInfo, { title, thumbnails });
  });

  /* 섬네일중 가장큰 섬네일의 url 을 가져옴. */
  const thumbnailInfo = getThumbnailInfo(videoInfo.thumbnails);
  videoInfo = { videoId, title: videoInfo.title, thumbnailInfo };

  await youtubeApi.videos(videoId, "contentDetails").then((contentDetails) => {
    ({
      contentDetails: { duration },
    } = contentDetails.data.items[0]);
    Object.assign(videoInfo, { duration });
  });

  await youtubeApi.videos(videoId, "statistics").then((statistics) => {
    ({
      statistics: { viewCount, likeCount: like, dislikeCount: dislike },
    } = statistics.data.items[0]);
    Object.assign(videoInfo, { viewCount, like, dislike });
  });

  return videoInfo;
};

const getVideoId = async (text) => {
  let videoInfo = "";
  try {
    videoInfo = await youtubeApi.search(text);
  } catch (error) {
    /* api key 가 할당량 다썻을떄 랜덤으로 다시..  */
    videoInfo = await youtubeApi.search(text);
  }
  /* get vidoe ID */
  const {
    id: { videoId },
  } = videoInfo.data.items[0];
  return videoId;
};

const getYouTubeData = async (term) => {
  let videoId = "";
  if (term.split("?v=")[1] === undefined) {
    videoId = await getVideoId(term);
  } else {
    videoId = term.split("?v=")[1];
    videoId = videoId.split("&")[0];
  }
  return getVideoInfo(videoId);
};

const app = async (word) => {
  const { videoId, title, thumbnailInfo, duration, viewCount, like, dislike } =
    await getYouTubeData(word);
  
  const color = await imgAvgColor(thumbnailInfo);
  const thumbnail = thumbnailInfo.url;
  return { videoId, title, thumbnail, duration, viewCount, like, dislike , color };
};

module.exports = { getInfo: app };
