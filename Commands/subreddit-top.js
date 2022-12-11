import {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} from "discord.js";
import reddit from 'simple-reddit-api'

export default {

    data: new SlashCommandBuilder()
        .setName('subreddit-top')
        .setDescription('Fetches the top post of desired subreddit. [BETA]')
        .addStringOption(option => option
                .setName('subreddit')
                .setDescription('The subreddit you want to get the post from')
                .setRequired(true)
            // .addChoices(
            //     {name: 'XI (First year)', value: 'xi'},
            //     {name: 'XII (Second year)', value: 'xii'}
            // )
        ),

    async execute(interaction) {
        await interaction.deferReply();
        let req = await reddit.topPost({subreddit: interaction.options._hoistedOptions[0].value, fulldata: true})
        // console.log(req)
        if (req.posts.length === 0) return await interaction.editReply('No results...');
        let post = req.posts[0].data
        const data = {
            title: post.title,
            sub: post.subreddit,
            imgURL: post.url,
            link: post.permalink,
            author: post.author,
            upvotes: post.ups,
        }
        // console.log(data)

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`u/${data.author}`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.reddit.com/u/${data.author}/`),
                new ButtonBuilder()
                    .setLabel(`Post`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.reddit.com${data.link}`),
            );

        await interaction.editReply({ content: `u/${data.author} says: \n${data.title} (${data.upvotes} upvotes)`})
        await interaction.followUp({ content: data.imgURL, components: [row] })
            .then(async (msg) => {
                await msg.react('<:upvote:1049954803318530098>')
                await msg.react('<:downvote:1049954912949256233>')
            })
    },

}