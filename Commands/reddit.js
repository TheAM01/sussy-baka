import {SlashCommandBuilder} from "discord.js";
import reddit from 'simple-reddit-api'

export default {

    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription('Fetches a reddit post of desired subreddit. [BETA]')
        .addStringOption(option => option
            .setName('subreddit')
            .setDescription('The subreddit you want to get a post from')
            .setRequired(true)
            // .addChoices(
            //     {name: 'XI (First year)', value: 'xi'},
            //     {name: 'XII (Second year)', value: 'xii'}
            // )
        ),

    async execute(interaction) {
        await interaction.deferReply();
        let req = await reddit.randomPost({subreddit: interaction.options._hoistedOptions[0].value, fulldata: true})
        console.log(req)
        if (req.posts.length === 0) return await interaction.editReply('No results...');
        let post = req.posts[0].data
        const data = {
            title: post.title,
            sub: post.subreddit,
            imgURL: post.url,
            link: post.permalink
        }
        console.log(data)
        return await interaction.editReply(data.imgURL);
    },

}