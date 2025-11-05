// Indie Hacker themed easter eggs and fun content

export const indieHackerQuotes = [
  "Ship it before it's perfect! 🚀",
  "Build in public, grow in public 📈",
  "Your first version will be embarrassing. Ship it anyway! 💪",
  "Indie hackers don't wait for permission 🔥",
  "Revenue > Perfection 💰",
  "Just launched? Now do it again! 🎯",
  "Coffee, code, repeat ☕",
  "Making money while you sleep 💤💸",
  "Bootstrapped and proud! 🌱",
  "From side project to main hustle 🎉",
  "No meetings, just shipping 📦",
  "MRR is the only metric that matters 📊",
  "Build once, sell forever 🔄",
  "Solo founder? More like solo superhero! 🦸",
  "Failing fast since [current year] ⚡",
  "Turning coffee into code since midnight ☕💻",
  "Not a startup, just a profitable business 💼",
  "Product-market fit loading... 94% 📈",
];

export const investorPitches = [
  {
    title: "Random VC appears!",
    message: "We're disrupting the disruption space...",
    outcomes: [
      { text: "Take the meeting", emoji: "🤝", bonus: 0.9, message: "3 hours wasted on Zoom 😴" },
      { text: "Ignore and ship", emoji: "🚀", bonus: 2, message: "Shipped 3 features instead! 🎉" },
    ]
  },
  {
    title: "Investor DM on Twitter",
    message: "Interested in your 'scalable synergy'...",
    outcomes: [
      { text: "Respond", emoji: "💬", bonus: 1, message: "They wanted equity for intro 🙄" },
      { text: "Focus on customers", emoji: "💰", bonus: 3, message: "+$500 MRR from real users! 📈" },
    ]
  },
  {
    title: "VC Cold Email",
    message: "We invest in pre-revenue companies...",
    outcomes: [
      { text: "Read 50-page deck", emoji: "📄", bonus: 0.5, message: "Too early stage' - had 10k users 😅" },
      { text: "Bootstrap it", emoji: "🌱", bonus: 4, message: "Profitable in 3 months! 💪" },
    ]
  },
];

export const timeBasedEvents = {
  weekendHustle: {
    name: "Weekend Hustle Mode!",
    description: "Real indie hackers work weekends 😎",
    multiplier: 1.5,
    emoji: "🏋️",
    check: () => {
      const day = new Date().getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    }
  },
  lateNightCoding: {
    name: "Late Night Coding Session",
    description: "Best code is written after midnight 🌙",
    multiplier: 2,
    emoji: "🌙",
    check: () => {
      const hour = new Date().getHours();
      return hour >= 0 && hour < 6; // Midnight to 6 AM
    }
  },
  morningGrind: {
    name: "5 AM Club Activated",
    description: "Early bird gets the MRR 🌅",
    multiplier: 1.3,
    emoji: "☀️",
    check: () => {
      const hour = new Date().getHours();
      return hour >= 5 && hour < 8;
    }
  },
  launchDay: {
    name: "Product Hunt Launch Day!",
    description: "Everyone's launching on Wednesday 🚀",
    multiplier: 1.8,
    emoji: "🎯",
    check: () => {
      const day = new Date().getDay();
      return day === 3; // Wednesday
    }
  }
};

export const secretCombos = [
  {
    name: "Speed Demon",
    pattern: "FAST_CLICKS", // 10 clicks in 2 seconds
    reward: "Click power x2 for 30 seconds",
    emoji: "⚡",
  },
  {
    name: "The Grinder",
    pattern: "STEADY_RHYTHM", // 100 clicks with consistent timing
    reward: "+10% permanent bonus",
    emoji: "💪",
  },
  {
    name: "Night Owl",
    pattern: "MIDNIGHT_CLICK", // Click at exactly midnight
    reward: "Golden cookie spawns!",
    emoji: "🦉",
  },
];

export const funMilestones = [
  { amount: 100, message: "First coffee money! ☕", emoji: "☕" },
  { amount: 1000, message: "Domain name acquired! 🌐", emoji: "🌐" },
  { amount: 10000, message: "Ramen profitable! 🍜", emoji: "🍜" },
  { amount: 100000, message: "Quit your day job money! 💼", emoji: "💼" },
  { amount: 1000000, message: "First million! Indie hacker life! 🎉", emoji: "🎉" },
  { amount: 10000000, message: "You're basically Pieter Levels now! 🏝️", emoji: "🏝️" },
  { amount: 100000000, message: "Buy a Tesla with MRR? 🚗", emoji: "🚗" },
  { amount: 1000000000, message: "Unicorn territory! (But bootstrapped) 🦄", emoji: "🦄" },
];

export const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const randomTips = [
  "💡 Tip: Real indie hackers validate before building!",
  "💡 Tip: Launch before you're ready. Seriously.",
  "💡 Tip: Twitter > LinkedIn for indie hackers",
  "💡 Tip: Build in public = free marketing",
  "💡 Tip: Solve your own problems first",
  "💡 Tip: $1 from a customer > $1M from VC",
  "💡 Tip: Ship fast, iterate faster",
  "💡 Tip: Talk to users. Yes, actually talk to them.",
  "💡 Tip: MRR doesn't lie, vanity metrics do",
  "💡 Tip: Side project → Main income is the dream",
];

export const celebrationMessages = [
  "🎉 Yasss! Keep shipping!",
  "🚀 To the moon!",
  "💰 Money printer go brrrr!",
  "🔥 You're on fire!",
  "⚡ Absolutely crushing it!",
  "🎯 Nailed it!",
  "💪 Beast mode activated!",
  "🌟 Living the indie dream!",
  "📈 Stonks!",
  "🦄 Unicorn vibes!",
];
