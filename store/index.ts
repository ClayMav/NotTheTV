export const state = () => ({
  channels: []
})

export const mutations = {
  setChannels(state, channels) {
    state.channels = channels
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    var channelList = await app.$axios.$get(
      "./channels.json"
    )
    const apiKey = await app.$axios.$get(
      "./api_key.json"
    )
    // For each channel
    var channels = await channelList.map(async (item, index, arr) => {
      // for each author in a channel
      let videos = await item.authors.map(async (author, ind, list) => {
        let videos = []
        await app.$axios.$get(
          "https://www.googleapis.com/youtube/v3/search?key="+ apiKey.key +"&channelId=" + author + "&part=snippet,id&order=date&maxResults=3"
        )
          .then((resp) => {
            videos.push.apply(videos, resp.items)
          })
          .catch(() => {
            console.log("404: Is your API key set up?")
          })
        return videos;
      })
      
      var recent = await Promise.all(videos)
      arr[index].recent = recent[0]
      return arr[index]
    })

    var out = await Promise.all(channels)
    commit("setChannels", out)
  }
}
