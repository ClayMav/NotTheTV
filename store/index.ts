export const state = () => ({
  channels: {}
})

export const mutations = {
  setChannels(state, channels) {
    state.channels = channels
  }
}

function putIn(arr, vid) {
  var placed = false;
  var tdate = new Date(vid.snippet.publishedAt);
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].snippet.publishedAt);
    if (date < tdate) {
      arr.splice(i, 0, vid);
      placed = true;
      break;
    }
  }
  if (!placed)
    arr.push(vid);
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    var authors = [
      'UCb_sF2m3-2azOqeNEdMwQPw', //Matthewmatosis
      'UCWqr2tH3dPshNhPjV5h1xRw', //Superbunnyhop
      'UC5CYeHPLer3lbEhgonvbbAA', //Noah-Caldwell Gervais
      'UCm4JnxTxtvItQecKUc4zRhQ', //Errant Signal
      'UCtUbO6rBht0daVIOGML3c8w', //Summoning Salt
      'UCJtSWV6KYyIckRpM5h20J_g', //Ahoy
      'UCPlWv88ZRMxCcK3BGjrX7ew', //Writing on Games
      'UCyhnYIvIKK_--PiJXCMKxQQ', //Joseph Anderson
      'UCqJ-Xo29CKyLTjn6z2XwYAw', //Mark Brown
      'UCvaUR_-uJQcu1-c4UfUtEmQ', //Games as Literature
      //Film
      'UCyNtlmLB73-7gtlBz00XOQQ', //Folding Ideas
      'UCEtB-nx5ngoNJWEzYa-yXBg', //FilmJoy
      'UChBD4NpITiW2CzIz5GwppDA', //Maggie Mae Fish
      'UCrTNhL_yO3tPTdQ5XgmmWjA', //Red Letter Media
      'UC0KaZd_ki4l2EUc1GY9u5Ew', //KyleKallgrenBHH
      'UCaN8DZdc8EHo5y1LsQWMiig', //Big Joel
      'UC7-E5xhZBZdW-8d7V80mzfg', //Jenny Nicholson
      'UCGC3ocH2v8O7elbGwGKdaBQ', //Nyx Fears
      'UCG1h-Wqjtwz7uUANw6gazRw', //Lindsay Ellis
      'UC9infsKo33_2LUoiqXGgQWg', //Renegade Cut
      'UCK-GxvzttTnNhq3JPYpXhqg', //Sarah Z
      'UCx0L2ZdYfiq-tsAXb8IXpQg', //Just Write
      'UC3g8YdblbqlUAKEeAJbzMYw', //What's So Great About That
      'UCh9DnjvObUcvvwrYbJ4-cLQ', //StrucciMovies
      'UCG5h8yHSUS4n7zPnh0dG0SA', //Georg Rockall-Schmidt
      'UCAGkSxTlleqxRauEqupyVPw', //Cinema Cartography
      'UCErSSa3CaP_GJxmFpdjG9Jw', //Lessons from the Screenplay
      'UCHiwtz2tCEfS17N9A-WoSSw', //Pop Culture Detective
      //Politics/Culture
      'UC2PA-AKmVpU6NKCGtZq_rKQ', //Philosophy Tube
      'UC0YvoAYGgdOfySQSLcxtu1w', //Beau of the Fifth Column
      'UCGaVdbSav8xWuFWTadK6loA', //vlogbrothers
      'UCNvsIonJdJ5E4EXMa65VYpA', //ContraPoints
      'UCT5jxI_OYY2r--TjAGXD03A', //Peter Coffin
      'UCepkun0sH16b-mqxBN22ogA', //Mexie
      'UCSkzHxIcfoEr69MWBdo0ppg', //Cuck Philosophy
      //Education
      'UCViwi-dXACoy9Pee73NvgJw', //This Place
      'UCUM9btVeFYWaDQy09X2VFkw', //Tom Scott
      'UCq1Z5S3JQfupBGEZAzkpp-g', //SmarterEveryDay
      'UCbWcXB0PoqOsAvAdfzWMf0w', //Fredrik Knudsen
      'UCv_vLHiWVBh_FR9vbeuiY-A', //Historia Civilis
      'UCEOXxzW2vU0P-0THehuIIeg', //CaptainDisillusion
      'UCSju5G2aFaWMqn-_0YBtq5A', //standupmaths
      'UC2C_jShtL725hvbm1arSV9w', //CGP Grey
      'UC-ImLFXGIe2FC4Wo5hOodnw', //Veritasium
      //Video Games/Film/Politics & Cluture:
      'UC5fdssPqmmGhkhsJi4VcckA', //Innuendo Studios
      'UClt01z1wHHT7c5lKcU8pxRQ', //hbomberguy

      'UCtESv1e7ntJaLJYKIO1FoYw', //Periodic Videos
      'UCvBqzzvUBLCs8Y7Axb-jZew', //Sixty Symbols
      'UCoxcjq-8xIDTYp3uz647V5A', //Numberphile
      'UC9-y-6csu5WGm29I7JiwpnA', //Computerphile
      'UCDospl6tlcwZnvRLK7qahNg', //Objectivity
      'UCo-3ThNQmPmQSQL_L6Lx1_w', //DeepSkyVideos
      'UCYO_jab_esuFRV4b17AJtAw', //3blue1brown
    ]

    const apiKey = process.env.API_KEY
    
    var channels = {
      "Media": {
        "name": "Media",
        "videos": []
      },
      "Gaming": {
        "name": "Gaming",
        "videos": []
      },
      "Politics/Culture": {
        "name": "Politics/Culture",
        "videos": []
      },
      "Lifestyle": {
        "name": "Lifestyle",
        "videos": []
      },
      "Entertainment": {
        "name": "Entertainment",
        "videos": []
      },
      "Technology": {
        "name": "Technology",
        "videos": []
      },
      "Science": {
        "name": "Science & Thought",
        "videos": []
      },
      "Other": {
        "name": "Other",
        "videos": []
      },
    }

    for (var author of authors) {
      await app.$axios.$get("https://www.googleapis.com/youtube/v3/channels?id=" + author + "&key=" + apiKey + "&part=contentDetails")
        .then(async (resp) => {
          var uploadPlaylist = resp.items[0].contentDetails.relatedPlaylists.uploads;
          await app.$axios.$get("https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + uploadPlaylist + "&key=" + apiKey + "&part=contentDetails&order=date&maxResults=4")
            .then(async (resp) => {
              for (var vid of resp.items) {
                var videoId = vid.contentDetails.videoId;
                await app.$axios.$get("https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=" + apiKey + "&part=snippet,topicDetails")
                  .then((resp) => {
                    var topics : string[] = [];
                    var category = "Other";
                    if ("topicDetails" in resp.items[0]) {
                      if ("relevantTopicIds" in resp.items[0].topicDetails) {
                        topics = resp.items[0].topicDetails.relevantTopicIds;
                      }
                    }
                    if (topics.length != 0) {
                      if (topics.indexOf("/m/0bzvm2") != -1 || topics.indexOf("/m/0403l3g") != -1) {
                        category = "Gaming";
                      }
                      else if (topics.indexOf("/m/02vxn") != -1) {
                        category = "Media";
                      }
                      else if (topics.indexOf("/m/07c1v") != -1) {
                        category = "Technology";
                      }
                      else if (topics.indexOf("/m/01k8wb") != -1) {
                        category = "Science";
                      }
                      else if (topics.indexOf("/m/019_rr") != -1 || topics.indexOf("/m/0f2f9") != -1 || topics.indexOf("/m/098wr") != -1) {
                        category = "Politics/Culture";
                      }
                      else if (topics.indexOf("/m/02jjt") != -1) {
                        category = "Entertainment";
                      }
                    }
                    putIn(channels[category].videos, resp.items[0]);
                  })
                  .catch((e) => {
                    console.log("Failed to fetch video details", e)
                  });
              }
            })
            .catch(() => {
              console.log("404: Is your API key set up?")
            });
        })
        .catch(() => {
          console.log("404: Is your API key set up?")
        });
    }
    for (var thing in channels) {
      if (channels[thing].videos.length == 0) {
        delete channels[thing];
      }
    }
    commit("setChannels", channels)
  }
}
