import {SlashCommandBuilder} from "discord.js";
import db from "../Main/database.js";


export default {

    data: new SlashCommandBuilder()
        .setName('subreddit-list')
        .setDescription('Returns a list of subreddits.'),

    async execute(interaction) {
        await interaction.deferReply();

        const list = await db.get('subs-list');

        return await interaction.editReply(`${list.join('\n')}`);
    },

}