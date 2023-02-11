const { Events } = require('discord.js');
const { notificationChannels } = require('../config.json');

const voiceStatusList = {}

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
		
		const guild = newState.guild
		const channels = notificationChannels.reduce((accumulator, setting) => {
			if (setting.guildId === guild.id) {
				const channel = newState.guild.channels.cache.get(setting.channelId)
				if (channel) {
					accumulator.push(channel)
				}
			}
			return accumulator
		}, [])

		if (oldState.channel) {
			const channel = oldState.channel
			const id = channel.id
			const name = channel.name
			const count = channel.members.size

			const old = voiceStatusList[id]
			voiceStatusList[id] = {name, count}
			
			console.info('### oldState', id, name, count)
			if (count < 1) {
				channels.forEach( channel => {
					channel.send(`通話終了通知(仮)::${name}`)
				})
			}
		}

		if (newState.channel) {
			const channel = newState.channel
			const id = channel.id
			const name = channel.name
			const count = channel.members.size

			const old = voiceStatusList[id]
			voiceStatusList[id] = {name, count}
			
			console.info('### newState', id, name, count)
			if (!old || old.count < 1) {
				channels.forEach( channel => {
					channel.send(`通話開始通知(仮)::${name}`)
				})
			}
		}
	},
};