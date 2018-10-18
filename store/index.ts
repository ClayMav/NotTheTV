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
    /*
    var channelList = await app.$axios.$get(
      "./channels.json"
    )
     */
    var channelList = [
        {
          id: 0,
          name: 'Games',
          authors: [
            'UCb_sF2m3-2azOqeNEdMwQPw',
            'UCWqr2tH3dPshNhPjV5h1xRw'
          ]
        },
        {
          id: 1,
          name: 'Athletics',
          authors: [
            'UCAL3JXZSzSm8AlZyD3nQdBA'
          ]
        },
        {
          id: 2,
          name: 'Politics',
          authors: [
            'UCGaVdbSav8xWuFWTadK6loA'
          ]
        },
        {
          id: 3,
          name: 'Film',
          authors: []
        }
    ]

    const apiKey = process.env.API_KEY
    
    var channels = new Array()
    for (var category of channelList) {
      var videos = []
      for (var author of category.authors) {
        await app.$axios.$get("https://www.googleapis.com/youtube/v3/search?key="+ apiKey +"&channelId=" + author + "&part=snippet,id&order=date&maxResults=3")
          .then((resp) => {
            videos.push.apply(videos, resp.items)
          })
          .catch(() => {
            console.log("404: Is your API key set up?")
          })
      }
      channels.push({name: category.name, recent: videos})
    }

    commit("setChannels", channels)
  }
}
