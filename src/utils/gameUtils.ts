export const formatNumber = (num: number): string => {
  // Handle invalid numbers
  if (!isFinite(num) || isNaN(num)) return '0';
  
  if (num >= 1e18) return (num / 1e18).toFixed(3) + ' Qt';
  if (num >= 1e15) return (num / 1e15).toFixed(3) + ' Qd';
  if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + ' M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return Math.floor(num).toLocaleString();
};

export const getCurrentCost = (baseCost: number, count: number): number => {
  return Math.floor(baseCost * Math.pow(1.15, count));
};