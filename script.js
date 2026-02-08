const noteNames = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const scales = [
    { n: 5, name: "琉球音階", intervals: [0, 4, 5, 7, 11], img: "南国的・太陽・開放的" },
    { n: 5, name: "律旋法", intervals: [0, 2, 5, 7, 9], img: "雅楽・静謐・感情抑制" },
    { n: 5, name: "陰旋法", intervals: [0, 1, 5, 7, 8], img: "和の哀愁・運命・夜" },
    { n: 7, name: "リディアン", intervals: [0, 2, 4, 6, 7, 9, 11], img: "神話的光・浮遊感" },
    { n: 7, name: "フリジアン・Dom", intervals: [0, 1, 4, 5, 7, 8, 10], img: "エジプト・威圧・砂漠" },
    { n: 7, name: "ロクリアン", intervals: [0, 1, 3, 5, 6, 8, 10], img: "崩壊・死・トニック消失" },
    { n: 7, name: "ウルトラ・ロクリアン", intervals: [0, 1, 3, 4, 6, 8, 9], img: "深淵・極限の暗黒" },
    { n: 8, name: "メシアン第2旋法", intervals: [0, 1, 3, 4, 6, 7, 9, 10], img: "宝石・神秘・不安" },
    { n: 10, name: "メシアン第7旋法", intervals: [0, 1, 2, 3, 5, 6, 7, 8, 9, 11], img: "カオス・飽和" },
    { n: "special", name: "螺旋音階(13周期)", intervals: [0, 2, 4, 6, 8, 10, 13, 15], img: "迷宮・非循環" }
    // ... 必要に応じて追加可能
];

const keySelect = document.getElementById('keySelect');
const filterSelect = document.getElementById('filterSelect');
const tableBody = document.getElementById('tableBody');

// Keyの選択肢を生成
noteNames.forEach((name, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = name;
    keySelect.appendChild(opt);
});

function update() {
    const keyShift = parseInt(keySelect.value);
    const filter = filterSelect.value;
    tableBody.innerHTML = "";

    scales.forEach(s => {
        // フィルタ処理
        if (filter !== "all") {
            if (filter === "8+" && (typeof s.n !== 'number' || s.n < 8)) return;
            if (filter === "special" && s.n !== "special") return;
            if (filter !== "8+" && filter !== "special" && s.n != filter) return;
        }

        const notes = s.intervals.map(i => {
            const noteIdx = (i + keyShift) % 12;
            const octavePlus = Math.floor((i + keyShift) / 12);
            return noteNames[noteIdx] + ("⁺".repeat(octavePlus));
        }).join(" ");

        tableBody.innerHTML += `<tr>
            <td>${s.n}</td>
            <td>${s.name}</td>
            <td class="notes">${notes}</td>
            <td>${s.img}</td>
        </tr>`;
    });
}

keySelect.onchange = update;
filterSelect.onchange = update;
update();