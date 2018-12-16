export const state = () => ({
  channels: []
})

export const mutations = {
  setChannels(state, channels) {
    state.channels = channels
  }
}

function putIn(arr, items) {
  var placed = false;
  for (var thing of items) {
    placed = false;
    var tdate = new Date(thing.snippet.publishedAt);
    for (var i = 0; i < arr.length; i++) {
      var date = new Date(arr[i].snippet.publishedAt);
      if (date < tdate) {
        arr.splice(i, 0, thing);
        placed = true;
        break;
      }
    }
    if (!placed)
      arr.push(thing);
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    var channelList = [
        {
          id: 0,
          name: 'Games',
          authors: [
            'UCb_sF2m3-2azOqeNEdMwQPw', //Matthewmatosis
            'UCWqr2tH3dPshNhPjV5h1xRw', //Superbunnyhop
            'UC5CYeHPLer3lbEhgonvbbAA', //Noah-Caldwell Gervais
            'UCm4JnxTxtvItQecKUc4zRhQ', //Errant Signal
            'UCtUbO6rBht0daVIOGML3c8w', //Summoning Salt
            'UCJtSWV6KYyIckRpM5h20J_g', //Ahoy
            'UCPlWv88ZRMxCcK3BGjrX7ew', //Writing on Games
            'UCyhnYIvIKK_--PiJXCMKxQQ', //Joseph Anderson
            'UCqJ-Xo29CKyLTjn6z2XwYAw', //Mark Brown
            'UCvaUR_-uJQcu1-c4UfUtEmQ' //Games as Literature
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
          authors: [
            'UCyNtlmLB73-7gtlBz00XOQQ' //Folding Ideas
          ]
        }
    ]

    const apiKey = process.env.API_KEY
    
    var channels = new Array()
    for (var category of channelList) {
      var videos = []
      for (var author of category.authors) {
        await app.$axios.$get("https://www.googleapis.com/youtube/v3/channels?id=" + author + "&key=" + apiKey + "&part=contentDetails")
          .then(async (resp) => {
            var uploadPlaylist = resp.items[0].contentDetails.relatedPlaylists.uploads;
            await app.$axios.$get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + uploadPlaylist + "&key=" + apiKey + "&part=snippet&order=date&maxResults=4")
              .then((resp) => {
                putIn(videos, resp.items);
              })
              .catch(() => {
                console.log("404: Is your API key set up?")
              });
          })
          .catch(() => {
            console.log("404: Is your API key set up?")
          });
      }
      channels.push({name: category.name, recent: videos})
    }

    commit("setChannels", channels)
  }
}
