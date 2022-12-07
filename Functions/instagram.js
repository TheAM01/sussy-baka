import fetch from "node-fetch";
import * as cheerio from "cheerio";

async function instagram (content, msg) {

    if (msg.channelId !== '1047945632381419520') {
        return msg.reply('Please post instagram links in the appropriate channel (<#1047945632381419520>). This message will be deleted in 15 seconds.')
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

export default instagram