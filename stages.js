const stages = [

{
    start: { x: 100, y: 300 },

    goal: { x: 820, y: 300, r: 20 },

    walls: [
        { x: 300, y: 150, w: 30, h: 250 },
        { x: 550, y: 0, w: 30, h: 250 }
    ],

    stars: [
        { x: 200, y: 100, got: false },
        { x: 700, y: 500, got: false }
    ],

    spikes: [
        { x: 450, y: 250, r: 15 },
        { x: 600, y: 400, r: 15 }
    ]
},

{
    start: { x: 100, y: 500 },

    goal: { x: 800, y: 80, r: 20 },

    walls: [
        { x: 250, y: 250, w: 30, h: 300 },
        { x: 500, y: 0, w: 30, h: 250 },
        { x: 700, y: 250, w: 30, h: 350 }
    ],

    stars: [
        { x: 180, y: 150, got: false },
        { x: 600, y: 120, got: false },
        { x: 780, y: 520, got: false }
    ],

    spikes: [
        { x: 400, y: 300, r: 15 },
        { x: 600, y: 420, r: 15 }
    ]
}
,
{
    start: { x: 80, y: 520 },

    goal: { x: 810, y: 70, r: 20 },

    walls: [
        { x: 180, y: 260, w: 30, h: 340 },
        { x: 360, y: 0,   w: 30, h: 280 },
        { x: 540, y: 320, w: 30, h: 280 },
        { x: 720, y: 0,   w: 30, h: 220 }
    ],

    stars: [
        { x: 120, y: 120, got: false },
        { x: 470, y: 510, got: false },
        { x: 650, y: 120, got: false }
    ],

    spikes: [
        { x: 280, y: 470, r: 15 },
        { x: 450, y: 180, r: 15 },
        { x: 620, y: 420, r: 15 },
        { x: 790, y: 280, r: 15 }
    ]
}
,
{
    start: { x: 70, y: 550 },

    goal: { x: 820, y: 80, r: 20 },

    walls: [
        { x: 140, y: 260, w: 30, h: 340 },
        { x: 300, y: 0,   w: 30, h: 250 },
        { x: 470, y: 330, w: 30, h: 270 },
        { x: 640, y: 0,   w: 30, h: 250 },
        { x: 760, y: 350, w: 30, h: 250 }
    ],

    stars: [
        { x: 120, y: 130, got: false },
        { x: 370, y: 500, got: false },
        { x: 560, y: 120, got: false },
        { x: 780, y: 270, got: false }
    ],
spikes: [
    { x: 200, y: 520, r: 15 },
    { x: 380, y: 120, r: 15 },
    { x: 540, y: 520, r: 15 },
    { x: 700, y: 120, r: 15 },
    { x: 810, y: 450, r: 15 }
],
movingPlatforms: [
    {
        x: 300,
        y: 250,
        w: 120,
        h: 20,
        vx: 2,
        minX: 250,
        maxX: 600
    }
]
}
];