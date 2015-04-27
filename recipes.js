var cur = {
	"red alloy": 5
};

function simpl(basket, src, dst) {
    if (src in basket) {
        var n = basket[src];
        delete basket[src];
        for (var k in dst) {
            if (!(k in basket)) {
                basket[k] = 0;
            }
            basket[k] += dst[k] * n;
        }
        console.log("Craft " + n + " " + src + " using recipe " + JSON.stringify(dst));
    }
}

simpl(cur, "red alloy", { "copper": 1, "redstone": 4 });

console.log("=======================================INGRIDIENT=========================");

for (var k in cur) {
    console.log(k + ": " + cur[k]);
}

