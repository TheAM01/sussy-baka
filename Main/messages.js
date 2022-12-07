import instagram from "../Functions/instagram.js";

async function messageHandler (msg) {

    const content = msg.content.toLowerCase().split(' ');
    if(content[content.length -1] === '.') return

    if (msg.content.toLowerCase().includes('instagram.com')) {
        await instagram(content, msg)
    }
}

export default messageHandler