var wants = {
	"red alloy": 5
};

var steps = [];

function substitute(src, dst) {
    if (src in wants) {
        var n = wants[src];
        delete wants[src];
        for (var k in dst) {
            if (!(k in wants)) {
                wants[k] = 0;
            }
            wants[k] += dst[k] * n;
        }
				steps.push(n + " * " + JSON.stringify(dst) + " => " + n + " " + src);
    }
}

substitute("red alloy", { "copper": 1, "redstone": 4 });

console.log("");
console.log("You need:");
for (var item in wants) {
    console.log("   " + wants[item] + "x " + item);
}

console.log("");
console.log("And need to craft:");
steps.forEach(function(step) {
	console.log("   " + step);
});

console.log("");
