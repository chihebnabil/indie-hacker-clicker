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

// Get or set default username
export const getUsername = () => {
  if (typeof window === 'undefined') return 'anonym';
  let username = localStorage.getItem('indie-hacker-username');
  if (!username) {
    username = 'anonym';
    localStorage.setItem('indie-hacker-username', username);
  }
  return username;
};

// Update username
export const setUsername = (newUsername: string) => {
  localStorage.setItem('indie-hacker-username', newUsername);
  return newUsername;
};

// Get project info
export const getProjectInfo = () => {
  if (typeof window === 'undefined') return { projectName: '', projectUrl: '' };
  return {
    projectName: localStorage.getItem('indie-hacker-projectName') || '',
    projectUrl: localStorage.getItem('indie-hacker-projectUrl') || '',
  };
};

// Set project info
export const setProjectInfo = (projectName?: string, projectUrl?: string) => {
  if (projectName) localStorage.setItem('indie-hacker-projectName', projectName);
  else localStorage.removeItem('indie-hacker-projectName');
  
  if (projectUrl) localStorage.setItem('indie-hacker-projectUrl', projectUrl);
  else localStorage.removeItem('indie-hacker-projectUrl');
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
  const [username, setUsernameState] = useState(getUsername());
  const projectInfo = getProjectInfo();
  const [projectName, setProjectNameState] = useState(projectInfo.projectName);
  const [projectUrl, setProjectUrlState] = useState(projectInfo.projectUrl);
  const [hasLoaded, setHasLoaded] = useState(false);
  const saveGame = useMutation(api.gameState.saveGame);
  const loadedGame = useQuery(api.gameState.loadGame, { userId });
  const lastSaveRef = useRef<string>('');
  const saveTimeoutRef = useRef<number | undefined>(undefined);

  // Function to manually trigger save
  const manualSave = async () => {
    try {
      await saveGame({
        userId,
        username,
        projectName: projectName || undefined,
        projectUrl: projectUrl || undefined,
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
      lastSaveRef.current = JSON.stringify(gameState);
      console.log('✅ Game manually saved');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Failed to save game:', error);
      // Check if it's an anti-cheat error
      if (error?.message?.includes('click rate') || 
          error?.message?.includes('Suspicious') ||
          error?.message?.includes('Impossible')) {
        return { success: false, cheating: true, message: error.message };
      }
      return { success: false };
    }
  };

  // Function to update username and project info, then trigger re-render
  const updateUsername = (newUsername: string, newProjectName?: string, newProjectUrl?: string) => {
    setUsername(newUsername);
    setUsernameState(newUsername);
    setProjectInfo(newProjectName, newProjectUrl);
    setProjectNameState(newProjectName || '');
    setProjectUrlState(newProjectUrl || '');
    
    // Force a save immediately with new info
    saveGame({
      userId,
      username: newUsername,
      projectName: newProjectName || undefined,
      projectUrl: newProjectUrl || undefined,
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
    }).then(() => {
      console.log('✅ Username and project info updated and saved');
    });
  };
  
  // Mark as loaded once we get the initial data
  useEffect(() => {
    if (loadedGame !== undefined && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [loadedGame, hasLoaded]);

  // Auto-save every 5 seconds with debounce (only after initial load)
  useEffect(() => {
    if (!enabled || !hasLoaded) return;

    const currentState = JSON.stringify(gameState);
    
    // Only save if state has changed
    if (currentState === lastSaveRef.current) return;

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save by 5 seconds to reduce backend calls
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveGame({
          userId,
          username,
          projectName: projectName || undefined,
          projectUrl: projectUrl || undefined,
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
      } catch (error: any) {
        console.error('❌ Failed to save game:', error);
        // Silently fail auto-save to avoid overwhelming the user
        // They'll see the error on manual save if they're cheating
      }
    }, 5000); // 5 second debounce to reduce backend load

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

  return { 
    loadedGame, 
    userId, 
    username, 
    projectName,
    projectUrl,
    updateUsername, 
    manualSave, 
    isLoading: loadedGame === undefined 
  };
}
