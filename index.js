import client from "./Main/client.js";
import commandHandler from "./Main/handler.js";
import server from "./Main/server.js";
import fetch from "node-fetch";
import ig from "./Functions/posts-moderation.js";
import messageHandler from "./Main/messages.js";

client.on('ready', (c) => {
    console.clear();
    console.log(`Logged in as ${c.user.username}!`);
    server()
    // onload();
});

client.on('interactionCreate', commandHandler)
client.on('messageCreate', messageHandler)

client.login(process.env.TOKEN)

async function onload() {

    const r = await fetch('https://www.instagram.com/p/CE9CZmsghan/?__a=1/', {
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(await r.text())
    return
    var params = {
        username: "Sussy amogus bot",
        avatar_url: "",
        content: "and dont click on my profile",
    };
    var URL = `https://discord.com/api/webhooks/1048714583927423156/EH32Xk0Sz7Ly0wgPlG_zWbYlZ5etWxi145wgNWQ_ZQlVmZDphWfmun9nQcKu2i1P8K1e`;

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(res => {
        console.log(res);
    })
}