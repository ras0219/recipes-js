var techlevel = {
    "no": 0,
    "yes": 1
};

function console_logger(n, src, dst, comment, batchsize)
{
    var s = "Craft " + n + " " + src + " using recipe " + JSON.stringify(dst);

    if (batchsize)
        s += " [BATCH: "+batchsize+"]";

    if (comment)
        s += " [COMMENT: "+comment+"]";

    console.log(s);
}

function make_simpl(basket, cb) {
    return function (src, dst, comment, batchsize, attr) {
        if (src in basket) {
            var orig_n = basket[src]
            var n = orig_n;
            if (batchsize !== undefined)
            {
                n = Math.ceil(orig_n / batchsize);
                var extra = n * batchsize - orig_n;
                if (extra > 0)
                {
                    basket["recycled " + src] = -extra;
                }
            }
            delete basket[src]
            for (var k in dst) {
                if (!(k in basket)) {
                    basket[k] = 0
                }
                basket[k] += dst[k] * n
            }
            cb(n, src, dst, comment, batchsize, attr)
        }
    }
}

function RUN_RECIPES(TECH, simpl)
{
    // Example:
    // simpl("item filter", { "raw carbon mesh": 4, "zinc foil": 16 }, "Assemble", undefined, warn_if_not("assembling machine", LV));
    // simpl("energium dust", { "redstone": 5, "ruby dust": 4 }, undefined, 9);

    simpl("hv solar array", {"mv solar array": 8, "hv transformer": 1})
    simpl("hv transformer", {"mv transformer": 1, "electronic circuit": 1, "ins hv cable": 2, "energy crystal":1})
    simpl("mv solar array", {"lv solar array": 8, "mv transformer": 1})
    simpl("mv transformer", {"ins gold cable": 2, "machine block": 1})
    simpl("lv solar array", {"solar panel": 8, "lv transformer": 1})
    simpl("lv transformer", {"plank":4, "copper":3, "copper cable": 2})
    simpl("solar panel", {"glass": 3, "coal dust": 3, "electronic circuit": 2, "generator": 1})
    simpl("electronic circuit", {"refined iron":1,"redstone":1,"copper cable":6})
    simpl("generator", {"re battery": 1, "machine block": 1, "furnace": 1})
    simpl("re battery", {"tin": 4, "redstone": 2, "copper cable": 6})
    simpl("copper cable", {"copper": 3, "rubber": 6}, undefined, 6)
    simpl("machine block", {"refined iron": 8})
    simpl("refined iron", {"iron": 1}, "Smelt")
    simpl("coal dust", {"coal": 1}, "Macerate")
}

function basictech() {
    return {
        "metal former" : techlevel.yes
    }
}


if (require.main === module)
{
    var tech = basictech()
    var cur = {
        "solar panel": 1,
        "lv solar array": 1,
        "mv solar array": 1,
        "hv solar array": 1,
    }
    RUN_RECIPES(tech, make_simpl(cur, console_logger))
    console.log("=======================================INGREDIENT=========================");
    for (var k in cur) {
        console.log(k + ": " + cur[k]);
    }
}
else
{
    // required as module
    module.exports = {
        "run": function (cur, TECH, cb) { return RUN_RECIPES(TECH, make_simpl(cur, cb)); },
        "raw_recipes": RUN_RECIPES,
        "techlevel": techlevel,
        "cb": console_logger,
        "basictech": basictech
    }
}
