const axios = require("axios");
const { regionCode , apiKey} = require("./config.json");

const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    key: apiKey,
  },
});

const youtubeApi = {
  search: (term) =>
    api.get("search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 1,
        type: "video",
        order: "relevance",
        regionCode /* ISO 3166-1 alpha-2 */,
      },
    }),
  /* video detail? */
  videos: (videoId, part) =>
    api.get("videos", {
      params: {
        id: videoId,
        part: part,
      },
    }),
};

module.exports = youtubeApi;
