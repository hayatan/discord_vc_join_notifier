const { Events } = require('discord.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		if (newState.channel && !oldState.channel) {
			const id = newState.channel.id
			const name = newState.channel.name
			console.info('### 通話開始通知', id, name);

			let notificationChannel = newState.guild.channels.cache.get('484034616462934030')
			if (notificationChannel) {
				notificationChannel.send(`通話開始通知(仮)::${name}`)
			}
		}

		if (oldState.channel && !newState.channel) {
			const id = oldState.channel.id
			const name = oldState.channel.name
			console.info('### 通話終了通知', id, name);

			let notificationChannel = oldState.guild.channels.cache.get('484034616462934030')
			if (notificationChannel) {
				notificationChannel.send(`通話開始通知(仮)::${name}`)

			}
		}
	},
};