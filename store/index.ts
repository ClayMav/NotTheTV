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
    var channels = await app.$axios.$get(
      "./channels.json"
    )
    const apiKey = await app.$axios.$get(
      "./api_key.json"
    )
    // For each channel
    channels = channels.map( async (item, index, arr) => {
      let videos = []
      // for each author in a channel
      for (let author of item.authors) {
        // get this authors last 3 videos
        const apicall = await app.$axios.$get(
          "https://www.googleapis.com/youtube/v3/search?key="+ apiKey.key +"&channelId=" + author + "&part=snippet,id&order=date&maxResults=3"
        )
        videos.push.apply(videos, apicall.items)
      }

      arr[index].recent = videos
      return arr[index]
    })
    channels = await Promise.all(channels)
    commit("setChannels", channels)
  }
}
