import type { Buildings, Upgrades } from '../types/game';

export const initialBuildings: Buildings = {
    cursor: { count: 0, baseCost: 15, baseProduction: 0.1, name: 'Junior Dev', icon: '👨‍💻', unlocked: true },
    grandma: { count: 0, baseCost: 100, baseProduction: 1, name: 'Freelancer', icon: '💼', unlocked: false },
    farm: { count: 0, baseCost: 1100, baseProduction: 8, name: 'Blog Writer', icon: '✍️', unlocked: false },
    mine: { count: 0, baseCost: 12000, baseProduction: 47, name: 'Course Creator', icon: '🎓', unlocked: false },
    factory: { count: 0, baseCost: 130000, baseProduction: 260, name: 'SaaS Founder', icon: '🚀', unlocked: false },
    bank: { count: 0, baseCost: 1400000, baseProduction: 1400, name: 'Agency Owner', icon: '🏢', unlocked: false },
    temple: { count: 0, baseCost: 20000000, baseProduction: 7800, name: 'App Developer', icon: '📱', unlocked: false },
    wizard: { count: 0, baseCost: 330000000, baseProduction: 44000, name: 'Tech Influencer', icon: '⭐', unlocked: false },
    shipment: { count: 0, baseCost: 5100000000, baseProduction: 260000, name: 'Serial Entrepreneur', icon: '💼', unlocked: false },
    alchemy: { count: 0, baseCost: 75000000000, baseProduction: 1600000, name: 'VC-Backed Founder', icon: '💰', unlocked: false },
    portal: { count: 0, baseCost: 1000000000000, baseProduction: 10000000, name: 'Tech Giant CEO', icon: '👑', unlocked: false },
    timemachine: { count: 0, baseCost: 14000000000000, baseProduction: 65000000, name: 'Innovation Legend', icon: '🌟', unlocked: false }
};

export const initialUpgrades: Upgrades = {
    click1: { owned: false, cost: 100, effect: 2, name: 'Better Keyboard', icon: '⌨️', desc: 'Clicks worth 2x more', type: 'click', req: 0 },
    click2: { owned: false, cost: 500, effect: 2, name: 'Dual Monitors', icon: '🖥️', desc: 'Clicks worth 2x more', type: 'click', req: 1 },
    click3: { owned: false, cost: 10000, effect: 2, name: 'Standing Desk', icon: '🪑', desc: 'Clicks worth 2x more', type: 'click', req: 10 },
    click4: { owned: false, cost: 100000, effect: 2, name: 'AI Copilot', icon: '🤖', desc: 'Clicks worth 2x more', type: 'click', req: 25 },
    click5: { owned: false, cost: 10000000, effect: 2, name: 'Neural Link', icon: '🧠', desc: 'Clicks worth 2x more', type: 'click', req: 50 },

    cursor1: { owned: false, cost: 100, building: 'cursor', multiplier: 2, name: 'Git Basics', icon: '📦', desc: 'Junior Devs 2x', type: 'building', req: 1 },
    cursor2: { owned: false, cost: 500, building: 'cursor', multiplier: 2, name: 'Code Reviews', icon: '👀', desc: 'Junior Devs 2x', type: 'building', req: 5 },
    cursor3: { owned: false, cost: 50000, building: 'cursor', multiplier: 2, name: 'Senior Mentorship', icon: '🎓', desc: 'Junior Devs 2x', type: 'building', req: 25 },

    grandma1: { owned: false, cost: 1000, building: 'grandma', multiplier: 2, name: 'Portfolio Site', icon: '🎨', desc: 'Freelancers 2x', type: 'building', req: 1 },
    grandma2: { owned: false, cost: 5000, building: 'grandma', multiplier: 2, name: 'Client Pipeline', icon: '📊', desc: 'Freelancers 2x', type: 'building', req: 5 },
    grandma3: { owned: false, cost: 500000, building: 'grandma', multiplier: 2, name: 'Referral Network', icon: '🤝', desc: 'Freelancers 2x', type: 'building', req: 25 },

    farm1: { owned: false, cost: 11000, building: 'farm', multiplier: 2, name: 'SEO Skills', icon: '🔍', desc: 'Blog Writers 2x', type: 'building', req: 1 },
    farm2: { owned: false, cost: 55000, building: 'farm', multiplier: 2, name: 'Email List', icon: '📧', desc: 'Blog Writers 2x', type: 'building', req: 5 },

    mine1: { owned: false, cost: 120000, building: 'mine', multiplier: 2, name: 'Video Production', icon: '🎥', desc: 'Course Creators 2x', type: 'building', req: 1 },
    mine2: { owned: false, cost: 600000, building: 'mine', multiplier: 2, name: 'Course Platform', icon: '🏫', desc: 'Course Creators 2x', type: 'building', req: 5 },

    factory1: { owned: false, cost: 1300000, building: 'factory', multiplier: 2, name: 'Payment Gateway', icon: '💳', desc: 'SaaS Founders 2x', type: 'building', req: 1 },
    factory2: { owned: false, cost: 6500000, building: 'factory', multiplier: 2, name: 'Auto-Scaling', icon: '📈', desc: 'SaaS Founders 2x', type: 'building', req: 5 },

    global1: { owned: false, cost: 50000, multiplier: 1.5, name: 'Premium Coffee', icon: '☕', desc: 'All production +50%', type: 'global' },
    global2: { owned: false, cost: 500000, multiplier: 1.5, name: 'Meditation', icon: '🧘', desc: 'All production +50%', type: 'global' },
    global3: { owned: false, cost: 5000000, multiplier: 1.5, name: 'Home Office', icon: '🏠', desc: 'All production +50%', type: 'global' },
    global4: { owned: false, cost: 50000000, multiplier: 2, name: 'Coworking Space', icon: '🏙️', desc: 'All production 2x', type: 'global' },
    global5: { owned: false, cost: 500000000, multiplier: 2, name: 'Private Jet', icon: '✈️', desc: 'All production 2x', type: 'global' }
};

export const unlockThresholds = {
    grandma: 10, farm: 100, mine: 1000, factory: 10000, bank: 100000,
    temple: 1000000, wizard: 10000000, shipment: 100000000, alchemy: 1000000000,
    portal: 10000000000, timemachine: 100000000000
};