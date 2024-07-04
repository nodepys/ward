const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { queryParams } = require("../../db/db");
const shorten = require("./../utils/shorten");
module.exports = async (id, mode = "skyblock", sensored = false) => {
  let stats = await queryParams(`SELECT * FROM skyblock_stats WHERE id=?`, [
    id,
  ]);
  if (stats.length == 0) {
    return {
      content: `Unexpected error occured!`,
      ephemeral: true,
    };
  }
  stats = JSON.parse(stats[0].data);
  let msg = {};
  if(sensored)msg.content=`@here`
  let embed = { title: `[${stats.rank}] ${sensored ? `******` : stats.name}` };
  if (mode == "skyblock") {
    let profile = stats?.skyblock[0];
    embed.title = `✫ ${profile?.levels} ${sensored ? `******` : stats.name} [${
      stats.rank
    }]`;
    embed.description = `**Profile ${stats?.skyblock[0]?.name}**`;
    if (profile) {
      let skills = "";
      let slayers = "";
      let catacombs = "";
      if (profile?.skills) {
        for (let [name, lvl] of Object.entries(profile.skills)) {
          if (name == "avg") continue;
          skills += `${name} ${lvl}\n`;
        }
      }

      if (profile?.slayers) {
        for (let [name, lvl] of Object.entries(profile.slayers)) {
          slayers += `${name} ${lvl}\n`;
        }
      }

      if (profile?.catacombs) {
        for (let [name, lvl] of Object.entries(profile.catacombs)) {
          if (name == "level") continue;
          catacombs += `${name} ${lvl}\n`;
        }
      }

      embed.fields = [
        {
          name: "**Networth**",
          value: `Networth ${
            shorten(profile?.networth) ? shorten(profile?.networth) : 0
          }\nUnsoulbound ${shorten(
            profile?.unsoulboundNetworth
          )}\nBank ${shorten(profile?.bank)}\nPurse ${shorten(profile?.purse)}`,
          inline: true,
        },
        {
          name: "**Mining**",
          value: `Mithril Powder ${shorten(
            profile?.mining?.mithrilPowder
          )}\nGemstone Powder ${shorten(
            profile?.mining?.gemstonePowder
          )}\nHOTM ${profile?.mining?.hotm}`,
          inline: true,
        },
        {
          name: "**Minions**",
          value: `Minion Slots ${profile?.minionSlots}\nUnique Minions:${profile?.craftedMinions}/743`,
          inline: true,
        },
        {
          name: "**Slayers**",
          value: slayers,
          inline: true,
        },
        {
          name: `**Catacombs** (${
            profile?.catacombs?.level ? profile?.catacombs?.level : 0
          })`,
          value: catacombs,
          inline: true,
        },
        {
          name: `**Skills (${
            profile?.skills?.avg ? profile?.skills?.avg : 0
          })**`,
          value: skills,
          inline: true,
        },
      ];
    }
    embed.color = 0x025e73;
  } else if (mode == "skywars") {
    let skywars = stats?.skywars;
    embed.fields = [
      {
        name: "Levels",
        value: `${skywars.levels}`,
        inline: true,
      },
      {
        name: "Coins",
        value: `${shorten(skywars.coins)}`,
        inline: true,
      },
      {
        name: "Winstreak",
        value: `${skywars.winstreak}`,
        inline: true,
      },
      {
        name: "Kills",
        value: `${skywars.kills}`,
        inline: true,
      },

      {
        name: "Deaths",
        value: `${skywars.deaths}`,
        inline: true,
      },

      {
        name: "KDR",
        value: `${skywars.kdr}`,
        inline: true,
      },
      {
        name: "Wins",
        value: `${skywars.wins}`,
        inline: true,
      },

      {
        name: "Losses",
        value: `${skywars.losses}`,
        inline: true,
      },

      {
        name: "Win Rate",
        value: `${skywars.wlr}`,
        inline: true,
      },
      {
        name: "Assists",
        value: `${skywars.assists}`,
        inline: true,
      },
    ];
    embed.color = 0xdb5d0b;
  } else if (mode == "bedwars") {
    let bedwars = stats?.bedwars;
    embed.fields = [
      {
        name: "Levels",
        value: `${bedwars.level}`,
        inline: true,
      },
      {
        name: "Coins",
        value: `${shorten(bedwars.coins)}`,
        inline: true,
      },
      {
        name: "Winstreak",
        value: `${bedwars.winstreak}`,
        inline: true,
      },
      {
        name: "Final Kills",
        value: `${bedwars.finalKills}`,
        inline: true,
      },

      {
        name: "Deaths",
        value: `${bedwars.finalDeaths}`,
        inline: true,
      },

      {
        name: "FKDR",
        value: `${bedwars.fkdr}`,
        inline: true,
      },
      {
        name: "Wins",
        value: `${bedwars.wins}`,
        inline: true,
      },

      {
        name: "Losses",
        value: `${bedwars.losses}`,
        inline: true,
      },

      {
        name: "Win Rate",
        value: `${bedwars.wlr}`,
        inline: true,
      },
    ];
    embed.color = 0xdb810b;
  } else if (mode == "duels") {
    let duels = stats?.duels;
    embed.fields = [
      {
        name: "Title",
        value: `${duels.title}`,
        inline: true,
      },
      {
        name: "Best Winstresak",
        value: `${duels.bestWinStreak}`,
        inline: true,
      },
      {
        name: "Current Winstreak",
        value: `${duels.currentWinStreak}`,
        inline: true,
      },
      {
        name: "Kills",
        value: `${duels.kills}`,
        inline: true,
      },

      {
        name: "Deaths",
        value: `${duels.deaths}`,
        inline: true,
      },

      {
        name: "KLR",
        value: `${duels.KLRatio}`,
        inline: true,
      },
      {
        name: "Wins",
        value: `${duels.wins}`,
        inline: true,
      },

      {
        name: "Losses",
        value: `${duels.losses}`,
        inline: true,
      },

      {
        name: "Win Rate",
        value: `${duels.WLRatio}`,
        inline: true,
      },
    ];
    embed.color = 0x870bdb;
  }
  if (sensored) {
    embed.footer = {
      text: "Use /Claim <IGN> if this is your hit to claim this account!",
    };
  }
  msg.embeds = [embed];

  msg.components = [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Skyblock")
        .setEmoji({ name: "☁️" })
        .setCustomId(`skyblock|${id}|${sensored ? "1" : "0"}`)
        .setStyle(mode == "skyblock" ? 3 : 1)
        .setDisabled(mode == "skyblock" ? true : false),
      new ButtonBuilder()
        .setLabel("Bedwars")
        .setEmoji({ name: "🛏️" })
        .setCustomId(`bedwars|${id}|${sensored ? "1" : "0"}`)
        .setStyle(mode == "bedwars" ? 3 : 1)
        .setDisabled(mode == "bedwars" ? true : false),
      new ButtonBuilder()
        .setLabel("Skywars")
        .setEmoji({ name: "🏝️" })
        .setCustomId(`skywars|${id}|${sensored ? "1" : "0"}`)
        .setStyle(mode == "skywars" ? 3 : 1)
        .setDisabled(mode == "skywars" ? true : false),
      new ButtonBuilder()
        .setLabel("Duels")
        .setEmoji({ name: "⚔️" })
        .setCustomId(`duels|${id}|${sensored ? "1" : "0"}`)
        .setStyle(mode == "duels" ? 3 : 1)
        .setDisabled(mode == "duels" ? true : false)
    ),
  ];
  msg.ephemeral = true;
  return msg;
};
