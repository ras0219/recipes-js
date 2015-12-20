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
    function warn_if_not(techtype, level)
    {
        if (TECH[techtype] >= level)
            return undefined;
        else
            return "warn";
    }

    // Example:
    // simpl("item filter", { "raw carbon mesh": 4, "zinc foil": 16 }, "Assemble", undefined, warn_if_not("assembling machine", LV));
    // simpl("energium dust", { "redstone": 5, "ruby dust": 4 }, undefined, 9);


    simpl("thermal centrifuge", {"mining laser": 1, "coil": 2, "iron": 4, "electric motor": 1, "advanced machine casing": 1})
    simpl("mining laser", {"redstone": 2, "energy crystal": 1, "advanced circuit": 1, "advanced alloy": 3, "iron turning blank handle": 1})
    simpl("iron turning blank handle", {"iron turning blank": 1}, "Turning Table: 43222")

    simpl("nuclear reactor", {"reactor chamber": 3, "advanced circuit": 1, "dense lead plate": 4, "generator": 1})
    simpl("reactor chamber", {"basic machine casing": 1, "lead plate": 4})

    simpl("electric jetpack", {"iron item casing": 4, "glowstone": 2, "batbox": 1, "advanced circuit": 1})
    simpl("batbox", {"wood": 5, "insulated tin cable": 1, "re-battery": 3})
    //////

    simpl("solar panel", {"generator": 1, "coal dust": 3, "glass": 3, "electronic circuit": 2})
    simpl("generator", {"iron furnace": 1, "iron plate": 3, "re-battery": 1})
    simpl("iron furnace", {"furnace": 1, "iron plate": 5})

    // ic2reactor
    simpl("reactor redstone port", {"redstone": 1, "reactor pressure vessel": 8})
    simpl("reactor fluid port", {"universal fluid cell": 1, "reactor pressure vessel": 8})
    simpl("reactor access hatch", {"trapdoor": 1, "reactor pressure vessel": 8})
    simpl("reactor pressure vessel", {"stone": 4, "lead plate": 5}, undefined, 4)

    // bigreactors
    simpl("reactor controller", {"reactor casing": 4, "red pipe wire": 3, "computer": 1, "redstone comp chipset": 1})
    simpl("reactor power tap", {"reactor casing": 4, "mfe": 1})
    simpl("reactor control rod", {"reactor casing": 4, "graphite": 3, "yellorium": 1, "redstone": 1})
    simpl("reactor access port", {"reactor casing": 4, "piston": 1, "chest": 1 })
    simpl("yellorium fuel rod", {"hardened glass": 6, "pellets of rtg fuel": 1 })
    simpl("reactor casing", {"steel": 4, "graphite": 2, "electrical steel": 2, "yellorium": 1}, undefined, 2)

    simpl("pellets of rtg fuel", {"plutonium": 3, "dense iron plate": 6})

    simpl("tesseract", {"tesseract frame full": 1 ,"silver": 4, "bronze": 4})
    simpl("tesseract frame full", {"tesseract frame empty": 1 ,"resonant ender": 1000}, "Fluid Transposer")
    simpl("tesseract frame empty", {"teleporter": 1 ,"ender electron tube": 2, "enderium": 4, "octadic capacitor": 2})

    simpl("teleporter", {"glass fibre cable": 2, "advanced circuit": 4, "diamond": 1, "frequency transmitter": 1, "advanced machine casing": 1})
    simpl("mfsu", {"lapotron crystal": 6, "mfe": 1, "advanced machine casing": 1, "advanced circuit": 1})
    simpl("mfe", {"energy crystal": 4, "insulated gold cable": 4, "basic machine casing": 1})

    simpl("advanced machine casing", {"advanced alloy": 2, "steel plate": 4, "carbon plate": 2, "basic machine casing": 1})

    simpl("lapotron crystal", {"energy crystal": 1, "lapis dust": 6, "advanced circuit": 2})
    simpl("energy crystal", {"energium dust": 9}, "Compressor")
    simpl("energium dust", {"diamond dust": 4, "redstone": 5}, undefined, 9)

    simpl("basic capacitor bank", { "iron": 4, "redstone block": 1, "basic capacitor": 4 })
    simpl("capacitor bank", { "electrical steel": 4, "redstone block": 1, "double-layer capacitor": 4 })
    simpl("redstone energy cell", {"redstone energy cell frame full": 1, "advanced circuit": 1, "diamantine electron tube": 2, "double-layer capacitor": 1})
    simpl("hardened energy cell", {"hardened energy cell frame": 1, "electronic circuit": 1, "bronze electron tube": 2, "redstone conductance coil": 1})
    simpl("leadstone energy cell", {"leadstone energy cell frame": 1, "electronic circuit": 1, "lead": 4, "tin electron tube": 2, "redstone conductance coil": 1})
    simpl("redstone energy cell frame full", {"redstone energy cell frame empty": 1, "destabilized redstone": 4000}, "Fluid Transposer")
    simpl("redstone energy cell frame empty", {"diamond": 1, "hardened glass": 4, "electrum": 4})
    simpl("hardened energy cell frame", {"leadstone energy cell frame": 1, "invar": 4})
    simpl("leadstone energy cell frame", {"redstone block": 1, "lead": 4, "glass": 4})
    simpl("redstone conductance coil", {"redstone": 2, "electrum": 1})

    simpl("mining well", {"iron plate": 2, "gold gear": 2, "mining drill": 1, "computer": 1, "diamond chipset": 1})
    simpl("computer", {"iron": 7, "logic processor": 1, "iron chipset": 1})
    simpl("mining drill", {"iron plate": 6, "power unit": 1})
    simpl("power unit", {"electronic circuit": 1, "re-battery": 3, "copper cable": 2, "electric motor": 1, "iron item casing": 2})

    simpl("advanced circuit", {"basic capacitor": 2, "redstone chipset": 4, "electronic circuit": 1, "intricate circuit board": 2})
    simpl("logic processor", {"redstone": 1, "printed logic circuit": 1, "printed silicon": 1}, "Inscriber")
    simpl("printed logic circuit", {"gold": 1}, "Inscriber: Logic Press")
    simpl("printed silicon", {"silicon": 1}, "Inscriber: Silicon Press")

    simpl("water wheel", {"waterwheel segment": 8, "shaft (iron)": 1})
    simpl("waterwheel segment", {"treated wood planks": 3, "treated stick": 4})

    simpl("kinetic dynamo", {"mv capacitor":1, "iron": 2, "steel": 3, "redstone": 2, "electrum coil": 1 })
    simpl("electrum coil", {"iron": 1, "electrum wire coil": 8 })
    simpl("electrum wire coil", {"electrum": 4, "treated stick": 1 }, undefined, 2)

    simpl("hv capacitor", {"treated wood planks":2, "steel": 3, "lead block": 1, "aluminum": 2, "redstone block": 1 })
    simpl("mv capacitor", {"treated wood planks":2, "iron": 3, "lead": 1, "electrum": 2, "redstone block": 1 })
    simpl("lv capacitor", {"treated wood planks":2, "iron": 3, "lead": 1, "copper": 2, "redstone": 1 })

    simpl("treated stick", {"treated wood planks": 2}, undefined, 4)

    simpl("solid canning machine", {"electronic circuit": 2, "basic machine casing": 1, "tin can":2})
    simpl("basic machine casing", {"iron plate": 8, "iron chipset": 1})

    simpl("tin can", {"tin item casing": 1}, "Metal Former: Extruding")

    simpl("fuel rod (uranium)", {"fuel rod (empty)": 1, "enriched uraniuim nuclear fuel": 1}, "Solid Canning Machine")
    simpl("fuel rod (empty)", {"iron plate": 1}, "Metal Former: Extruding")

    simpl("component heat exchanger", {"gold plate": 4, "heat exchanger": 1})
    simpl("heat exchanger", {"copper plate": 5, "tin plate": 3, "electronic circuit": 1})

    simpl("advanced heat vent", {"diamond": 1, "iron bars": 6, "heat vent": 2})
    simpl("overclocked heat vent", {"gold plate":4, "reactor heat vent": 1})
    simpl("reactor heat vent", {"copper plate":8, "heat vent": 1})
    simpl("component heat vent", {"iron bars": 4, "tin plate":4, "heat vent": 1})
    simpl("heat vent", {"iron plate":4, "iron bars": 4, "electric motor": 1})

    simpl("electric motor", {"iron":1, "tin item casing": 2, "coil": 2})
    simpl("coil", {"iron":1, "copper cable": 8})
    simpl("electronic circuit", {"iron plate": 1, "redstone": 2, "insulated copper cable": 6})

    simpl("re-battery", {"tin item casing": 4, "insulated tin cable": 1, "electrotine": 2})

    simpl("octadic capacitor", {"double-layer capacitor": 2, "vibrant alloy": 2, "ender electron tube": 1})
    simpl("double-layer capacitor", {"basic capacitor": 2, "energetic alloy": 2, "blazing electron tube": 1})
    simpl("basic capacitor", {"signalum nugget": 4, "lapis electron tube": 1, "redstone chipset": 2})

    simpl("insulated gold cable", {"gold cable": 1, "rubber": 2})
    simpl("gold cable", {"gold": 1 }, "Metal Former: Extrude", 4)
    simpl("insulated copper cable", {"copper cable": 1, "rubber": 1})
    simpl("copper cable", {"copper": 1 }, "Metal Former: Extrude", 3)
    simpl("insulated tin cable", {"tin cable": 1, "rubber": 1})
    simpl("tin cable", {"tin": 1 }, "Metal Former: Extrude", 3)

    simpl("advanced alloy", {"mixed metal ingot":1}, "Compressor")
    simpl("mixed metal ingot", {"iron plate":3, "bronze plate": 3, "tin plate": 3}, undefined, 2)

    simpl("tin item casing", {"tin plate":1}, "Metal Former: Rolling", 2)
    simpl("tin plate", {"tin":1}, "Metal Former: Rolling")
    simpl("iron item casing", {"iron plate":1}, "Metal Former: Rolling", 2)
    simpl("dense iron plate", {"iron plate":9}, "Compressor")
    simpl("iron plate", {"iron":1}, "Metal Former: Rolling")
    simpl("steel plate", {"steel":1}, "Metal Former: Rolling")
    simpl("gold plate", {"gold":1}, "Metal Former: Rolling")
    simpl("copper plate", {"copper":1}, "Metal Former: Rolling")
    simpl("bronze plate", {"bronze":1}, "Metal Former: Rolling")
    simpl("carbon plate", {"coal dust": 8}, "Compress a lot") // todo: expand
    simpl("dense lead plate", {"lead plate": 9}, "Compressor")
    simpl("lead plate", {"lead":1}, "Metal Former: Rolling")

    simpl("iron bars", {"iron":6}, undefined, 16)
    simpl("shaft (iron)", {"iron block":1}, "Metal Former: Extrude")

    simpl("redstone block", {"redstone": 9})
    simpl("iron block", {"iron": 9})
    simpl("lead block", {"lead": 9})

    simpl("gold gear", {"molten gold":4000}, "Smeltery: Gear Cast")
    simpl("molten gold", {"gold": 1}, "Smeltery", 1000)

    simpl("hardened glass", {"obsidian dust": 4, "lead": 1}, "Induction Smelter", 2)
    simpl("obsidian dust", {"obsidian": 1}, "Sag Mill", 4)
    simpl("diamond dust", {"diamond": 1}, "Macerator")
    simpl("lapis dust", {"lapis": 1}, "Macerator")
    simpl("destabilized redstone", {"redstone": 1}, "Magma Crucible", 100)

    simpl("intricate circuit board", {"redstone": 6, "gold": 3, "water": 1000}, "Carpenter")

    simpl("ender electron tube", {"end stone":5, "eye of ender": 2, "liquid glass": 500}, "Thermionic Fabricator", 4)
    simpl("diamantine electron tube", {"diamond":5, "redstone": 2, "liquid glass": 500}, "Thermionic Fabricator", 4)
    simpl("bronze electron tube", {"bronze":5, "redstone": 2, "liquid glass": 500}, "Thermionic Fabricator", 4)
    simpl("tin electron tube", {"tin":5, "redstone": 2, "liquid glass": 500}, "Thermionic Fabricator", 4)
    simpl("lapis electron tube", {"lapis":5, "redstone": 2, "liquid glass": 500}, "Thermionic Fabricator", 4)
    simpl("blazing electron tube", {"blaze powder":5, "redstone": 2, "liquid glass": 500}, "Thermionic Fabricator", 4)
    simpl("liquid glass", {"glass": 1}, "Thermionic Fabricator: Melt", 1000)

    simpl("redstone chipset", {"redstone": 1}, "Assembly Table")
    simpl("iron chipset", {"iron": 1, "redstone": 1}, "Assembly Table")

    simpl("signalum nugget", {"signalum": 1}, undefined, 9)
    simpl("signalum", {"copper": 3, "silver": 1, "redstone":10}, "Alloy Smelter", 4)
    simpl("bronze", {"copper": 3, "tin": 1}, "Alloy Smelter", 4)
    simpl("electrum", {"silver": 1, "gold": 1}, "Alloy Smelter", 2)
    simpl("invar", {"ferrous": 1, "iron": 2}, "Alloy Smelter", 3)
    simpl("electrical steel", {"iron": 1, "coal dust": 1, "silicon": 1}, "Alloy Smelter")
    simpl("vibrant alloy", {"ender pearl": 1, "energetic alloy": 1}, "Alloy Smelter")
    simpl("energetic alloy", {"redstone": 1, "gold": 1, "glowstone": 1}, "Alloy Smelter")

    simpl("eye of ender", {"blaze powder": 1, "ender pearl": 1})
}

function basictech() {
    return {
        "metal former" : techlevel.yes
    }
}


if (require.main === module)
{
    var tech = basictech()
    var cur = {"hv wiremill": 1}
    RUN_RECIPES(cur, tech, make_simpl(console_logger))
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
