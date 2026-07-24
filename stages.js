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

];