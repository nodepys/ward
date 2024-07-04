const getUUID = require("./getUUID");
const { key } = require("../../config.json");
const axios = require("axios");
const fs = require("fs");
const { getNetworth } = require("skyhelper-networth");
const { queryParams } = require("../../db/db");
const generate = require("./generate");
let maxLvL = {
  Fishing: 50,
  Mining: 60,
  Combat: 60,
  Foraging: 50,
  Taming: 51,
  Enchanting: 60,
  Alchemy: 50,
  Carpentry: 50,
  Runecrafting: 25,
  Social: 25,
};
module.exports = async (username) => {
  let uuid = await getUUID(username);
  if (!uuid) return;
  let promises = [];
  let stats = {
    social: {},
    skyblock: [],
    duels: {
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      KLRatio: 0,
      title: 0,
      WLRatio: 0,
      bestWinStreak: 0,
      currentWinStreak: 0,
    },
    skywars: {
      coins: 0,
      winstreak: 0,
      losses: 0,
      wins: 0,
      kills: 0,
      deaths: 0,
      kdr: 0,
      wlr: 0,
      assists: 0,
      levels: 0,
    },
    bedwars: {
      coins: 0,
      winstreak: 0,
      losses: 0,
      wins: 0,
      finalKills: 0,
      finalDeaths: 0,
      fkdr: 0,
      wlr: 0,
      bedsBroken: 0,
      bedsLost: 0,
      bblr: 0,
      level: 0,
    },
    rank: "None",
  };
  let player,
    profiles = null;

  let p1 = axios({
    url: `https://api.hypixel.net/v2/player?key=${key}&uuid=${uuid}`,
    method: "get",
  }).then((data) => {
    if (data?.data?.player) {
      player = data.data.player;
    }
  });
  let p2 = axios({
    url: `https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${uuid}`,
    method: "GET",
  }).then((data) => {
    if (data?.data?.profiles) {
      profiles = data.data.profiles;
    }
  });

  promises.push(p1, p2);

  await Promise.all(promises);

  if (profiles) {
    for (let profile of profiles) {
      let profStat = {
        catacombs: {
          archer: 0,
          mage: 0,
          berserk: 0,
          tank: 0,
          healer: 0,
          level: 0,
        },
        skills: {
          Fishing: 0,
          Mining: 0,
          Combat: 0,
          Foraging: 0,
          Taming: 0,
          Enchanting: 0,
          Alchemy: 0,
          Carpentry: 0,
          Runecrafting: 0,
          Social: 0,
          avg: 0,
        },
        mining: {
          HOTM: 0,
          gemstonePowder: 0,
          mithrilPowder: 0,
        },
        slayers: {
          zombie: 0,
          spider: 0,
          wolf: 0,
          enderman: 0,
          blaze: 0,
          vampire: 0,
        },
        bank: 0,
        purse: 0,
        liquid: 0,
      };
      profStat.members = Object.keys(profile.members).length;
      profStat.name = profile.cute_name;
      profStat.gameMode = profile.game_mode ? profile.game_mode : "Normal";
      if (profile?.banking) {
        profStat.bank = Math.round(profile.banking.balance);
      }
      let member = profile.members[uuid];
      if (member?.currencies?.coin_purse) {
        profStat.purse = Math.round(member.currencies.coin_purse);
      }
      profStat.liquid = profStat.purse + profStat.bank;
      try {
        let networth = await getNetworth(member, profStat.bank);
        profStat.networth = Math.round(networth.networth);
        profStat.unsoulboundNetworth = Math.round(networth.unsoulboundNetworth);
      } catch (e) {}
      if (member?.dungeons?.player_classes) {
        for (let [name, xp] of Object.entries(
          member?.dungeons?.player_classes
        )) {
          profStat.catacombs[name] = cataXPCalculator(
            Math.round(xp.experience)
          );
        }
      }
      if (member?.slayer?.slayer_bosses) {
        for (let [key, val] of Object.entries(member?.slayer?.slayer_bosses)) {
          let v = Object.keys(val.claimed_levels).length;
          if (v > 9) v = 9;
          profStat.slayers[key] = v;
        }
      }
      if (member?.mining_core) {
        if (member?.mining_core?.powder_spent_mithril) {
          profStat.mining.mithrilPowder =
            member?.mining_core?.powder_spent_mithril +
            member?.mining_core?.powder_mithril_total;
        }
        if (member?.mining_core?.powder_spent_gemstone) {
          profStat.mining.gemstonePowder =
            member?.mining_core?.powder_spent_gemstone +
            member?.mining_core?.powder_gemstone_total;
        }
        if (member?.mining_core?.experience) {
          profStat.mining.hotm = hotmCalc(member?.mining_core?.experience);
        }
      }
      if (member?.player_data?.experience) {
        let total = 0;
        for (let [name, xp] of Object.entries(
          member?.player_data?.experience
        )) {
          name = name.replace("SKILL_", "").toLowerCase();
          name = name.charAt(0).toUpperCase() + name.slice(1);

          profStat.skills[name] = skillLevelCalculator(
            Math.round(xp),
            maxLvL[name]
          );
          if (name == "Runecrafting" || name == "Social") continue;
          total += profStat.skills[name];
        }
        profStat.skills.avg = (total / 9).toFixed(2);
      }
      if (member?.dungeons?.dungeon_types?.catacombs?.experience) {
        profStat.catacombs.level = cataXPCalculator(
          member?.dungeons?.dungeon_types?.catacombs?.experience
        );
      }
      profStat.craftedMinions = 0;
      profStat.bonusMinions = 0;

      for (let prof of Object.values(profile?.members)) {
        if (prof?.player_data?.crafted_generators) {
          profStat.craftedMinions +=
            prof?.player_data?.crafted_generators.length;
        }
      }

      if (member?.leveling?.completed_tasks) {
        for (let task of member?.leveling?.completed_tasks) {
          if (task.includes("UPGRADE_MINION_SLOTS")) {
            profStat.bonusMinions++;
          }
        }
      }
      if (profStat.bonusMinions > 5) profStat.bonusMinions = 5;

      profStat.levels = member?.leveling?.experience
        ? (member?.leveling?.experience / 100).toFixed(2)
        : 0;
      profStat.minionSlots = 5;
      profStat.minionSlots += profStat.bonusMinions;
      if (profStat?.craftedMinions) {
        profStat.minionSlots += minionSlots(profStat.craftedMinions);
      }

      stats.skyblock.push(profStat);
    }
  }
  stats.name = username;
  stats.color = player.rankPlusColor;
  if (player.rank && player.rank != "NORMAL") {
    stats.rank = player.rank;
  } else if (
    player.monthlyPackageRank &&
    player.monthlyPackageRank !== "NONE"
  ) {
    stats.rank = "MVP++";
  } else if (player.newPackageRank) {
    let rankName = player.newPackageRank;
    stats.rank = rankName.replace("_PLUS", "+");
  } else {
    stats.rank = "None";
  }

  if (player?.socialMedia?.links?.DISCORD) {
    stats.social.discord = player?.socialMedia?.links?.DISCORD;
  }

  if (player?.socialMedia?.links?.TWITTER) {
    stats.social.twitter = player?.socialMedia?.links?.TWITTER;
  }

  if (player?.socialMedia?.links?.HYPIXEL) {
    stats.social.hypixel = player?.socialMedia?.links?.HYPIXEL;
  }

  if (player?.socialMedia?.links?.YOUTUBE) {
    stats.social.youtube = player?.socialMedia?.links?.YOUTUBE;
  }
  if (player?.stats?.Duels) {
    stats.duels.wins = player?.stats?.Duels?.wins;
    stats.duels.losses = player?.stats?.Duels?.losses;
    stats.duels.kills = player?.stats?.Duels?.kills;
    stats.duels.deaths = player?.stats?.Duels?.deaths;
    stats.duels.KLRatio = calculateRatio(stats.duels.kills, stats.duels.deaths);

    stats.duels.title = getDuelsTitle(stats.duels.wins);
    stats.duels.WLRatio = calculateRatio(stats.duels.wins, stats.duels.losses);

    stats.duels.bestWinStreak = player?.stats?.Duels?.best_all_modes_winstreak
      ? player?.stats?.Duels?.best_all_modes_winstreak
      : 0;
    stats.duels.currentWinStreak = player?.stats?.Duels?.current_winstreak
      ? player.stats.Duels.current_winstreak
      : 0;
  }

  if (player?.stats?.SkyWars) {
    stats.skywars.coins = player?.stats?.SkyWars?.coins;
    stats.skywars.winstreak = player?.stats?.SkyWars?.win_streak;
    stats.skywars.losses = player?.stats?.SkyWars?.losses;
    stats.skywars.wins = player?.stats?.SkyWars?.wins;
    stats.skywars.kills = player?.stats?.SkyWars?.kills;
    stats.skywars.deaths = player?.stats?.SkyWars?.deaths;
    stats.skywars.kdr = calculateRatio(
      stats.skywars.kills,
      stats.skywars.deaths
    );
    stats.skywars.wlr = calculateRatio(
      stats.skywars.wins,
      stats.skywars.losses
    );
    stats.skywars.assists = player?.stats?.SkyWars?.assists;
    stats.skywars.levels = getSWLevel(
      player?.stats?.SkyWars?.skywars_experience
    );
  }
  if (player?.stats?.Bedwars) {
    stats.bedwars.coins = player?.stats?.Bedwars?.coins;
    stats.bedwars.winstreak = player?.stats?.Bedwars?.winstreak
      ? player?.stats?.Bedwars?.winstreak
      : 0;
    stats.bedwars.losses = player?.stats?.Bedwars?.losses_bedwars;
    stats.bedwars.wins = player?.stats?.Bedwars?.wins_bedwars;
    stats.bedwars.finalKills = player?.stats?.Bedwars?.final_kills_bedwars;
    stats.bedwars.finalDeaths = player?.stats?.Bedwars?.final_deaths_bedwars;
    stats.bedwars.fkdr = calculateRatio(
      stats.bedwars.finalKills,
      stats.bedwars.finalDeaths
    );
    stats.bedwars.wlr = calculateRatio(
      stats.bedwars.wins,
      stats.bedwars.losses
    );
    stats.bedwars.bedsBroken = player?.stats?.Bedwars?.beds_broken_bedwars;
    stats.bedwars.bedsLost = player?.stats?.Bedwars?.beds_lost_bedwars;
    stats.bedwars.bblr = calculateRatio(
      stats?.bedwars?.bedsBroken,
      stats?.bedwars?.bedsLost
    );
    stats.bedwars.level = getBedwarsLevel(player?.stats?.Bedwars?.Experience).toFixed(2);
  }

  let id = generate(32);
  await queryParams(`INSERT INTO skyblock_stats(id,data) VALUES(?,?)`, [
    id,
    JSON.stringify(stats),
  ]);

  return id;
};

function getDuelsTitle(wins) {
  if (wins >= 56000) return "Godlike X";
  else if (wins >= 52000) return "Godlike IX";
  else if (wins >= 48000) return "Godlike VIII";
  else if (wins >= 44000) return "Godlike VII";
  else if (wins >= 40000) return "Godlike VI";
  else if (wins >= 36000) return "Godlike V";
  else if (wins >= 32000) return "Godlike IV";
  else if (wins >= 28000) return "Godlike III";
  else if (wins >= 24000) return "Godlike II";
  else if (wins >= 20000) return "Godlike";
  else if (wins >= 18000) return "Grandmaster V";
  else if (wins >= 16000) return "Grandmaster IV";
  else if (wins >= 14000) return "Grandmaster III";
  else if (wins >= 12000) return "Grandmaster II";
  else if (wins >= 10000) return "Grandmaster";
  else if (wins >= 8800) return "Legend V";
  else if (wins >= 7600) return "Legend IV";
  else if (wins >= 6400) return "Legend III";
  else if (wins >= 5200) return "Legend II";
  else if (wins >= 4000) return "Legend";
  else if (wins >= 3800) return "Master V";
  else if (wins >= 3200) return "Master IV";
  else if (wins >= 2800) return "Master III";
  else if (wins >= 2400) return "Master II";
  else if (wins >= 2000) return "Master";
  else if (wins >= 1800) return "Diamond V";
  else if (wins >= 1600) return "Diamond IV";
  else if (wins >= 1400) return "Diamond III";
  else if (wins >= 1200) return "Diamond II";
  else if (wins >= 1000) return "Diamond";
  else if (wins >= 900) return "Gold V";
  else if (wins >= 800) return "Gold IV";
  else if (wins >= 700) return "Gold III";
  else if (wins >= 600) return "Gold II";
  else if (wins >= 500) return "Gold";
  else if (wins >= 440) return "Iron V";
  else if (wins >= 380) return "Iron IV";
  else if (wins >= 320) return "Iron III";
  else if (wins >= 260) return "Iron II";
  else if (wins >= 200) return "Iron";
  else if (wins >= 180) return "Rookie V";
  else if (wins >= 160) return "Rookie IV";
  else if (wins >= 140) return "Rookie III";
  else if (wins >= 120) return "Rookie II";
  else if (wins >= 100) return "Rookie";
  else return "No Rank";
}
function calculateRatio(wins, losses) {
  if (losses === 0) {
    if (wins === 0) {
      return "N/A"; // No games played
    } else {
      return "Infinity"; // All wins and no losses
    }
  } else {
    const ratio = wins / losses;
    return Math.round(ratio * 100) / 100;
  }
}

function getSWLevel(xp) {
  const totalXp = [20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
  let exactLevel = 0;

  if (xp >= 15000) {
    exactLevel = (xp - 15000) / 10000 + 12;
  } else {
    let c = 0;
    while (xp >= 0 && c < totalXp.length) {
      if (xp - totalXp[c] >= 0) {
        c++;
      } else {
        exactLevel =
          c + 1 + (xp - totalXp[c - 1]) / (totalXp[c] - totalXp[c - 1]);
        break;
      }
    }
  }
  return exactLevel;
}
function cataXPCalculator(xp) {
  let dungeons = {
    50: 1,
    125: 2,
    235: 3,
    395: 4,
    625: 5,
    955: 6,
    1425: 7,
    2095: 8,
    3045: 9,
    4385: 10,
    6275: 11,
    8940: 12,
    12700: 13,
    17960: 14,
    25340: 15,
    35640: 16,
    50040: 17,
    70040: 18,
    97640: 19,
    135640: 20,
    188140: 21,
    259640: 22,
    356640: 23,
    488640: 24,
    668640: 25,
    911640: 26,
    1239640: 27,
    1684640: 28,
    2284640: 29,
    3084640: 30,
    4149640: 31,
    5559640: 32,
    7459640: 33,
    9959640: 34,
    13259640: 35,
    17559640: 36,
    23159640: 37,
    30359640: 38,
    39559640: 39,
    51559640: 40,
    66559640: 41,
    85559640: 42,
    109559640: 43,
    139559640: 44,
    177559640: 45,
    225559640: 46,
    285559640: 47,
    360559640: 48,
    453559640: 49,
    569809640: 50,
  };
  let prev = 0;
  for (let [val, key] of Object.entries(dungeons)) {
    if (xp >= val) {
      prev = key;
    } else {
      if (prev >= 50) return 50;
      return prev;
    }
  }
  return 51;
}

function skillLevelCalculator(xp, cap = 60) {
  if (!xp) return 0;
  let skills = {
    50: 1,
    175: 2,
    375: 3,
    675: 4,
    1175: 5,
    1925: 6,
    2925: 7,
    4425: 8,
    6425: 9,
    9925: 10,
    14925: 11,
    22425: 12,
    32425: 13,
    47425: 14,
    67425: 15,
    97425: 16,
    147425: 17,
    222425: 18,
    322425: 19,
    522425: 20,
    822425: 21,
    1222425: 22,
    1722425: 23,
    2322425: 24,
    3022425: 25,
    3822425: 26,
    4722425: 27,
    5722425: 28,
    6822425: 29,
    8022425: 30,
    9322425: 31,
    10722425: 32,
    12222425: 33,
    13822425: 34,
    15522425: 35,
    17322425: 36,
    19222425: 37,
    21222425: 38,
    23322425: 39,
    25522425: 40,
    27822425: 41,
    30222425: 42,
    32722425: 43,
    35322425: 44,
    38072425: 45,
    40972425: 46,
    44072425: 47,
    47472425: 48,
    51172425: 49,
    55172425: 50,
    59472425: 51,
    64072425: 52,
    68972425: 53,
    74172425: 54,
    79672425: 55,
    85472425: 56,
    91572425: 57,
    97972425: 58,
    104672425: 59,
    111672425: 60,
  };
  let prev = 0;
  for (let [val, key] of Object.entries(skills)) {
    // Skuffed skills object ;-;
    if (xp >= val) {
      prev = key;
    } else {
      if (prev >= cap) return cap;
      return prev;
    }
  }
  return cap;
}

function hotmCalc(xp) {
  let data = [0, 3000, 12000, 37000, 97000, 197000, 347000];
  let prev;
  let i = 0;
  for (let v of data) {
    i++;
    if (xp >= v) {
      prev = i;
    } else {
      return prev;
    }
  }
  return 7;
}

function minionSlots(recipes) {
  let data = [
    { requiredCrafts: 0, bonusSlots: 0 },
    { requiredCrafts: 5, bonusSlots: 1 },
    { requiredCrafts: 15, bonusSlots: 2 },
    { requiredCrafts: 30, bonusSlots: 3 },
    { requiredCrafts: 50, bonusSlots: 4 },
    { requiredCrafts: 75, bonusSlots: 5 },
    { requiredCrafts: 100, bonusSlots: 6 },
    { requiredCrafts: 125, bonusSlots: 7 },
    { requiredCrafts: 150, bonusSlots: 8 },
    { requiredCrafts: 175, bonusSlots: 9 },
    { requiredCrafts: 200, bonusSlots: 10 },
    { requiredCrafts: 225, bonusSlots: 11 },
    { requiredCrafts: 250, bonusSlots: 12 },
    { requiredCrafts: 275, bonusSlots: 13 },
    { requiredCrafts: 300, bonusSlots: 14 },
    { requiredCrafts: 350, bonusSlots: 15 },
    { requiredCrafts: 400, bonusSlots: 16 },
    { requiredCrafts: 450, bonusSlots: 17 },
    { requiredCrafts: 500, bonusSlots: 18 },
    { requiredCrafts: 550, bonusSlots: 19 },
    { requiredCrafts: 600, bonusSlots: 20 },
    { requiredCrafts: 650, bonusSlots: 21 },
  ];
  let prev = 0;
  for (let slot of data) {
    if (recipes >= slot.requiredCrafts) {
      prev = slot.bonusSlots;
    } else {
      return prev;
    }
  }
  return 21;
}
const BEDWARS_EXP_PER_PRESTIGE = 489000;
const BEDWARS_LEVELS_PER_PRESTIGE = 100;

function getBedwarsLevel(exp) {
  let prestige = Math.floor(exp / BEDWARS_EXP_PER_PRESTIGE);
  exp = exp % BEDWARS_EXP_PER_PRESTIGE;
  if (prestige > 5) {
    let over = prestige % 5;
    exp += over * BEDWARS_EXP_PER_PRESTIGE;
    prestige -= over;
  }
  // first few levels are different
  if (exp < 500) {
    return 0 + prestige * BEDWARS_LEVELS_PER_PRESTIGE;
  } else if (exp < 1500) {
    return 1 + prestige * BEDWARS_LEVELS_PER_PRESTIGE;
  } else if (exp < 3500) {
    return 2 + prestige * BEDWARS_LEVELS_PER_PRESTIGE;
  } else if (exp < 5500) {
    return 3 + prestige * BEDWARS_LEVELS_PER_PRESTIGE;
  } else if (exp < 9000) {
    return 4 + prestige * BEDWARS_LEVELS_PER_PRESTIGE;
  }
  exp -= 9000;
  return exp / 5000 + 4 + prestige * BEDWARS_LEVELS_PER_PRESTIGE;
}
