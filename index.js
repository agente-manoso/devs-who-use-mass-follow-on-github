/**
 * Mass Follow Detector
 *
 * Detect if a GitHub user is engaging in mass-follow behavior.
 * We don't name names, but we do judge silently.
 *
 * @module devs-who-use-mass-follow-on-github
 * @author manoso (followed by mass-followers, unfortunately)
 */

'use strict';

const THRESHOLDS = {
  SUSPICIOUS: 1000,      // Hmm
  LIKELY: 5000,          // Come on
  OBVIOUS: 10000,        // Really?
  ABSURD: 25000,         // At this point it's performance art
  LEGENDARY: 50000       // They've transcended shame
};

/**
 * Analyze a following/follower ratio
 * @param {number} following - Number of accounts being followed
 * @param {number} followers - Number of followers
 * @returns {Object} Analysis result
 */
function analyzeRatio(following, followers) {
  const ratio = followers > 0 ? following / followers : following;

  let verdict, description, recommendation;

  if (following < THRESHOLDS.SUSPICIOUS) {
    verdict = 'NORMAL';
    description = 'A regular human being. Refreshing.';
    recommendation = 'None needed. You are doing fine.';
  } else if (following < THRESHOLDS.LIKELY) {
    verdict = 'SUSPICIOUS';
    description = 'Either very social or very desperate.';
    recommendation = 'Consider touching grass.';
  } else if (following < THRESHOLDS.OBVIOUS) {
    verdict = 'LIKELY_MASS_FOLLOWER';
    description = 'You know what you did.';
    recommendation = 'The unfollow button exists. Use it.';
  } else if (following < THRESHOLDS.ABSURD) {
    verdict = 'MASS_FOLLOWER';
    description = 'Quantity over quality, embodied.';
    recommendation = 'This is a cry for help, isn\'t it?';
  } else if (following < THRESHOLDS.LEGENDARY) {
    verdict = 'EGREGIOUS_MASS_FOLLOWER';
    description = 'At what cost? FOR WHAT?';
    recommendation = 'Log off. Forever. Please.';
  } else {
    verdict = 'LEGENDARY_MASS_FOLLOWER';
    description = 'You\'ve achieved something. Not something good, but something.';
    recommendation = 'Frame this. Put it on your wall. Tell your grandchildren.';
  }

  return {
    following,
    followers,
    ratio: ratio.toFixed(2),
    verdict,
    description,
    recommendation,
    shame: following >= THRESHOLDS.SUSPICIOUS,
    timestamp: new Date().toISOString()
  };
}

/**
 * Check if someone followed you just to get a follow back
 * @param {boolean} theyFollowYou - Do they follow you?
 * @param {number} theirFollowing - How many people they follow
 * @param {boolean} youFollowedBack - Did you follow back?
 * @param {boolean} theyStillFollowYou - Do they still follow you?
 * @returns {Object} Analysis of the situation
 */
function analyzeFollowBack(theyFollowYou, theirFollowing, youFollowedBack, theyStillFollowYou) {
  if (theirFollowing > THRESHOLDS.SUSPICIOUS) {
    if (theyFollowYou && !youFollowedBack && !theyStillFollowYou) {
      return {
        verdict: 'CLASSIC_FOLLOW_UNFOLLOW',
        description: 'They followed you, you didn\'t follow back, they unfollowed. Tale as old as time.',
        recommendation: 'You dodged a bullet. Their feed is chaos anyway.'
      };
    }

    if (theyFollowYou && youFollowedBack) {
      return {
        verdict: 'THEY_GOT_YOU',
        description: 'You fell for it. It\'s okay, we all have.',
        recommendation: 'Consider unfollowing. They won\'t notice.'
      };
    }
  }

  return {
    verdict: 'SEEMS_GENUINE',
    description: 'Possibly a real connection. Rare but beautiful.',
    recommendation: 'Cherish this. It\'s uncommon.'
  };
}

/**
 * Generate a passive-aggressive message
 * @param {number} following - Their following count
 * @returns {string} A message for them
 */
function generateMessage(following) {
  if (following < THRESHOLDS.SUSPICIOUS) {
    return 'You seem normal. This tool isn\'t for you.';
  }

  const messages = [
    `Following ${following.toLocaleString()} accounts? That's not networking, that's hoarding.`,
    `${following.toLocaleString()} follows. Do you even remember who they are?`,
    `With ${following.toLocaleString()} follows, your feed must be pure noise.`,
    `${following.toLocaleString()}. That's not a following list, that's a phone book.`,
    `Imagine clicking follow ${following.toLocaleString()} times. The dedication to mediocrity.`,
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * The wall of shame (empty, we're passive-aggressive not malicious)
 */
const WALL_OF_SHAME = [
  // Names intentionally omitted
  // But you know who you are
];

/**
 * Check if a username is on the wall of shame
 * @param {string} username - GitHub username
 * @returns {boolean} Always false, we don't actually name names
 */
function isOnWallOfShame(username) {
  // We don't actually keep a list.
  // This function exists purely for the psychological effect.
  return false;
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node index.js <following> <followers>');
    console.log('Example: node index.js 47832 523');
    console.log();
    console.log('Or just accept that if you\'re running this, you already know.');
    process.exit(1);
  }

  const [following, followers] = args.map(Number);
  const result = analyzeRatio(following, followers);

  console.log();
  console.log('='.repeat(50));
  console.log('MASS FOLLOW ANALYSIS REPORT');
  console.log('='.repeat(50));
  console.log();
  console.log(`Following: ${following.toLocaleString()}`);
  console.log(`Followers: ${followers.toLocaleString()}`);
  console.log(`Ratio: ${result.ratio}`);
  console.log();
  console.log(`Verdict: ${result.verdict}`);
  console.log(`${result.description}`);
  console.log();
  console.log(`Recommendation: ${result.recommendation}`);
  console.log();
  console.log('='.repeat(50));

  if (result.shame) {
    console.log();
    console.log(generateMessage(following));
  }
}

module.exports = {
  analyzeRatio,
  analyzeFollowBack,
  generateMessage,
  isOnWallOfShame,
  WALL_OF_SHAME,
  THRESHOLDS
};
