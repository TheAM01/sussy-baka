import {SlashCommandBuilder} from "discord.js";
import db from "../Main/database.js";

export default {

    data: new SlashCommandBuilder()
        .setName('subreddit-add')
        .setDescription('Adds a subreddit to the list of subreddits.')
        .addStringOption(option => option
            .setName('sub')
            .setDescription('Subreddit')
            .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const sub = interaction.options._hoistedOptions[0].value.toLowerCase().replaceAll(' ', '').replaceAll('r/', '');

        const subs = await db.get('subs-list');
        const duplicate = subs.find(s => s === sub);

        if (duplicate) return await interaction.editReply(`Subreddit \`r/${sub}\` already exists in the list!`);

        subs.push(sub)

        await db.set('subs-list', subs)

        return await interaction.editReply(`Subreddit \`r/${sub}\` successfully added in the list!`);
    },

}