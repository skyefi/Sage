import { MessageEmbed, TextChannel, CommandInteraction, ApplicationCommandOptionData } from 'discord.js';
import { BOT, CHANNELS, MAINTAINERS } from '@root/config';
import { Command } from '@lib/types/Command';

export default class extends Command {

	description = `Provide feedback or bug reports about ${BOT.NAME}.`;

	options: ApplicationCommandOptionData[] = [
		{
			name: 'feedback',
			description: 'feedback to be sent to the admins',
			type: 'STRING',
			required: true
		},
		{
			name: 'file',
			description: 'A file to be posted with the feedback',
			type: 'ATTACHMENT',
			required: false
		}
	]

	async run(interaction:CommandInteraction): Promise<void> {
		const feedback = interaction.options.getString('feedback');
		const file = interaction.options.getAttachment('file');
		const feedbackChannel = await interaction.guild.channels.fetch(CHANNELS.FEEDBACK) as TextChannel;

		const embed = new MessageEmbed()
			.setAuthor(interaction.user.tag, interaction.user.avatarURL({ dynamic: true }))
			.setTitle('New Feedback')
			.setDescription(feedback)
			.setColor('DARK_GREEN')
			.setTimestamp();

		if (file) embed.setImage(file.url);

		feedbackChannel.send({ embeds: [embed] });

		return interaction.reply({ content: `Thanks! I've sent your feedback to ${MAINTAINERS}.`, ephemeral: true });
	}

}
