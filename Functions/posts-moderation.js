import fetch from "node-fetch";
import * as cheerio from "cheerio";

const channels = {
    instagram: '1047945632381419520',
    twitter: '1049803364394876938',
    reddit: '1047945690975850496'
}

async function post (content, msg, site) {

    if (msg.channelId !== channels[site]) {
        return msg.reply(`Please post ${site} links in the appropriate channel (<#${channels[site]}>). This message will be deleted in 15 seconds.`)
            .then(m => {
                setTimeout(async () => {
                    await msg.delete()
                    await m.delete()
                }, 15000)
            })
    }

    await msg.react('<:upvote:1049954803318530098>')
    await msg.react('<:downvote:1049954912949256233>')

}

export default post