import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Generate a unique user ID for this browser
const getUserId = () => {
  if (typeof window === 'undefined') return 'default-user';
  let userId = localStorage.getItem('indie-hacker-userId');
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    localStorage.setItem('indie-hacker-userId', userId);
  }
  return userId;
};

// Get or prompt for username
export const getUsername = () => {
  if (typeof window === 'undefined') return 'Anonymous';
  let username = localStorage.getItem('indie-hacker-username');
  if (!username) {
    username = prompt('Enter your username for the leaderboard:') || 'Anonymous';
    localStorage.setItem('indie-hacker-username', username);
  }
  return username;
};

// Update username
export const setUsername = (newUsername: string) => {
  localStorage.setItem('indie-hacker-username', newUsername);
  return newUsername;
};

interface GameState {
  money: number;
  totalEarned: number;
  totalEarned2: number;
  clickPower: number;
  totalClicks: number;
  buildings: any;
  upgrades: any;
  challenges: any[];
  achievements: any[];
  prestigeLevel: number;
  prestigeTokens: number;
  frenzyCount: number;
  goldenCookieClicks: number;
  bestCombo: number;
}

export function useAutoSave(gameState: GameState, enabled: boolean = true) {
  const [userId] = useState(getUserId());
  const [hasLoaded, setHasLoaded] = useState(false);
  const saveGame = useMutation(api.gameState.saveGame);
  const loadedGame = useQuery(api.gameState.loadGame, { userId });
  const lastSaveRef = useRef<string>('');
  const saveTimeoutRef = useRef<number | undefined>(undefined);
  
  // Mark as loaded once we get the initial data
  useEffect(() => {
    if (loadedGame !== undefined && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [loadedGame, hasLoaded]);

  // Auto-save every 10 seconds (only after initial load)
  useEffect(() => {
    if (!enabled || !hasLoaded) return;

    const currentState = JSON.stringify(gameState);
    
    // Only save if state has changed
    if (currentState === lastSaveRef.current) return;

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save by 2 seconds
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveGame({
          userId,
          gameState: {
            money: gameState.money,
            totalEarned: gameState.totalEarned,
            totalEarned2: gameState.totalEarned2,
            clickPower: gameState.clickPower,
            totalClicks: gameState.totalClicks,
            buildings: gameState.buildings,
            upgrades: gameState.upgrades,
            challenges: gameState.challenges,
            achievements: gameState.achievements,
            prestigeLevel: gameState.prestigeLevel,
            prestigeTokens: gameState.prestigeTokens,
            frenzyCount: gameState.frenzyCount,
            goldenCookieClicks: gameState.goldenCookieClicks,
            bestCombo: gameState.bestCombo,
          },
        });
        lastSaveRef.current = currentState;
        console.log('✅ Game auto-saved');
      } catch (error) {
        console.error('❌ Failed to save game:', error);
      }
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [gameState, saveGame, userId, enabled, hasLoaded]);

  // Save on page unload
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable save on page close
      const data = JSON.stringify({
        userId,
        gameState: {
          money: gameState.money,
          totalEarned: gameState.totalEarned,
          totalEarned2: gameState.totalEarned2,
          clickPower: gameState.clickPower,
          totalClicks: gameState.totalClicks,
          buildings: gameState.buildings,
          upgrades: gameState.upgrades,
          challenges: gameState.challenges,
          achievements: gameState.achievements,
          prestigeLevel: gameState.prestigeLevel,
          prestigeTokens: gameState.prestigeTokens,
          frenzyCount: gameState.frenzyCount,
          goldenCookieClicks: gameState.goldenCookieClicks,
          bestCombo: gameState.bestCombo,
        },
      });
      localStorage.setItem('indie-hacker-lastSave', data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [gameState, userId, enabled]);

  return { loadedGame, userId, isLoading: loadedGame === undefined };
}
