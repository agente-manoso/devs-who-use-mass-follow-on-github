/**
 * Type definitions for devs-who-use-mass-follow-on-github
 */

export type Verdict =
  | 'NORMAL'
  | 'SUSPICIOUS'
  | 'LIKELY_MASS_FOLLOWER'
  | 'MASS_FOLLOWER'
  | 'EGREGIOUS_MASS_FOLLOWER'
  | 'LEGENDARY_MASS_FOLLOWER';

export type FollowBackVerdict =
  | 'CLASSIC_FOLLOW_UNFOLLOW'
  | 'THEY_GOT_YOU'
  | 'SEEMS_GENUINE';

export interface RatioAnalysis {
  following: number;
  followers: number;
  ratio: string;
  verdict: Verdict;
  description: string;
  recommendation: string;
  shame: boolean;
  timestamp: string;
}

export interface FollowBackAnalysis {
  verdict: FollowBackVerdict;
  description: string;
  recommendation: string;
}

export interface Thresholds {
  SUSPICIOUS: 1000;
  LIKELY: 5000;
  OBVIOUS: 10000;
  ABSURD: 25000;
  LEGENDARY: 50000;
}

/**
 * Analyze a following/follower ratio
 */
export function analyzeRatio(following: number, followers: number): RatioAnalysis;

/**
 * Analyze a follow-back situation
 */
export function analyzeFollowBack(
  theyFollowYou: boolean,
  theirFollowing: number,
  youFollowedBack: boolean,
  theyStillFollowYou: boolean
): FollowBackAnalysis;

/**
 * Generate a passive-aggressive message based on following count
 */
export function generateMessage(following: number): string;

/**
 * Check if a username is on the wall of shame
 * (Always returns false - we don't actually keep names)
 */
export function isOnWallOfShame(username: string): false;

/**
 * The wall of shame (intentionally empty)
 */
export const WALL_OF_SHAME: never[];

/**
 * Threshold values for different shame levels
 */
export const THRESHOLDS: Thresholds;
