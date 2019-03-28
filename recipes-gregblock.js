var techlevel = {
    "none": 0,
    "bronze": 1,
    "lv": 2,
    "mv": 3,
    "hv": 4,
    "ev": 5
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
            if (orig_n > 0) {
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
}

function RUN_RECIPES(TECH, simpl)
{
    // Enum for tech levels
    var NONE = techlevel.none
    var BRONZE = techlevel.bronze
    var LV = techlevel.lv
    var MV = techlevel.mv
    var HV = techlevel.hv
    var EV = techlevel.ev
    var materials = []

    function warn_if_not(techtype, level)
    {
        if (TECH[techtype] >= level)
            return undefined;
        else
            return "warn";
    }

    // Industrial Foregoing
    simpl("plant sower", { "plastic": 2, "flower pot": 1, "piston": 2, "polyethelene hull": 1, "iron gear": 2, "redstone": 1});
    simpl("plant fertilizer", { "plastic": 2, "glass bottle": 1, "leather": 2, "polyethelene hull": 1, "iron gear": 2, "redstone": 1});
    simpl("plant gatherer", { "plastic": 2, "hoe": 1, "axe": 2, "polyethelene hull": 1, "gold gear": 2, "redstone": 1});
    simpl("plant interator", { "plastic": 2, "hoe": 3, "polyethelene hull": 1, "gold gear": 2, "redstone": 1});
    simpl("polyethelene hull", { "polyethlene sheet": 8 }, "Hammer");
    simpl("plastic", { "polyethlene sheet": 2 }, "Hammer");

    // Pyrolyse oven
    simpl("pyrolyse oven", { "good circuit": 3, "mv piston": 2, "mv pump": 1, "mv hull": 1, "cupronickel wire x4": 2})

    // // Power converters
    // simpl("energy bridge", { "dense lead plate": 2, "mv transformer": 1, "cobalt plate": 2, "glass fiber cable": 2, "cobalt cable x2": 2});
    // simpl("eu hv consumer", { "ic2 mv transformer":1, "gold plate": 4, "insulated gold cable": 4});
    // simpl("rf producer", { "dense lead plate": 4, "insulated tin cable": 4, "lv battery buffer x1": 1});

    // // CompactWaterTurbines
    // simpl("ev water turbine", { "hv water turbine": 4, "ev pump": 1, "stainless steel rotor":2, "ev hull": 1, "energy flow circuit": 1 });
    // simpl("hv water turbine", { "mv water turbine": 4, "hv pump": 1, "steel rotor":2, "hv hull": 1, "data control circuit": 1 });
    // simpl("mv water turbine", { "lv water turbine": 4, "mv pump": 1, "bronze rotor":2, "mv hull": 1, "advanced circuit": 1 });
    // simpl("lv water turbine", { "steel plate": 4, "lv pump": 1, "tin rotor":2, "lv hull": 1, "basic circuit": 1 });

    // // Advanced solar panels
    // simpl("molecular transformer", { "ic2 ev transformer": 2, "advanced machine casing": 4, "advanced circuit": 2, "mv assembling machine": 1});

    // // Galacticraft
    // simpl("oxygen collector", { "compressed steel": 3, "compressed aluminum": 2, "oxygen vent": 1, "oxygen fan":1, "tin canister": 1, "oxygen concentrator":1 });
    // simpl("oxygen compressor", { "compressed steel": 4, "compressed aluminum": 3, "compressed bronze": 1, "oxygen concentrator":1 });
    // simpl("heavy oxygen tank", { "red wool": 3, "tin canister": 3, "compressed steel": 3 });
    // simpl("fuel loader", { "compressed aluminum": 2, "compressed steel": 5, "tin canister": 1, "basic wafer": 1})
    // simpl("basic wafer", { "diamond": 1, "basic circuit board": 1 }, "Assemble", undefined, warn_if_not("assembling machine", LV))
    // simpl("parachute", { "string": 3, "canvas": 3 });
    // simpl("canvas", { "stick": 2, "string": 5 });
    // simpl("oxygen mask", { "glass pane": 8, "iron helmet": 1 });
    // simpl("oxygen gear", { "oxygen pipe": 5, "oxygen concentrator": 1 });
    // simpl("oxygen fan", { "compressed steel": 4, "basic wafer":1, "redstone":1 });
    // simpl("oxygen pipe", { "glass pane": 6 }, undefined, 4);
    // simpl("oxygen concentrator", { "compressed steel": 4, "compressed tin": 3, "tin canister": 1, "oxygen vent": 1 });
    // simpl("tier 1 rocket", {"rocket fin": 4, "tier 1 rocket engine": 1, "nosecone": 1, "heavy duty plate": 8, "chest": 3}, "NASA Workbench");
    // simpl("rocket fin", { "heavy duty plate": 4, "compressed steel": 2 });
    // simpl("nosecone", { "redstone torch": 1, "heavy duty plate": 3 });
    // simpl("tier 1 rocket engine", { "heavy duty plate": 4, "flint and steel": 1, "button": 1, "tin canister": 1, "oxygen vent": 1 });
    // simpl("heavy duty plate", { "heavy duty alloy": 1, "industrial tnt": 8, "recycled tiny stainless steel dust": -2 }, "Implosion Compressor");
    // simpl("heavy duty alloy", { "stainless steel bolt": 4, "compressed bronze": 1, "compressed aluminum": 1, "compressed steel": 1 });
    // simpl("empty canister", { "tin canister": 1, "glass":1, "compressed steel": 1, "compressed tin": 6 });
    // simpl("tin canister", { "tin plate": 7 });
    // simpl("oxygen vent", { "compressed tin": 3, "compressed steel": 1 });
    // simpl("compressed steel", { "steel plate": 2, "industrial tnt": 2 }, "Implosion Compressor");
    // simpl("compressed tin", { "tin plate": 2, "industrial tnt": 2 }, "Implosion Compressor");
    // simpl("compressed aluminum", { "aluminum plate": 2, "industrial tnt": 2 }, "Implosion Compressor");
    // simpl("compressed bronze", { "bronze plate": 2, "industrial tnt": 2 }, "Implosion Compressor");

    // // Botania
    // simpl("thermalily", {"orange mana petal": 1, "mystical orange petal": 1, "mystical red petal": 1, "rune of fire": 1, "rune of earth": 1, "seeds": 1}, "Petal Apothecary");
    // simpl("jaded amaranthus", {"purple mana petal": 2, "mystical lime petal": 1, "mystical purple petal": 1, "mystical green petal": 1, "redstone root": 1, "rune of spring": 1, "seeds": 1}, "Petal Apothecary");
    // simpl("rune of spring", {"rune of water": 1, "rune of fire": 1, "wheat": 1, "any sapling": 3, "livingrock": 1}, "Runic Altar");
    // simpl("rune of fire", {"manasteel": 3, "netherwart": 1, "nether brick": 1, "gunpowder": 1, "livingrock": 1}, "Runic Altar", 3);
    // simpl("rune of earth", {"manasteel": 3, "stone": 1, "block of coal": 1, "mushroom": 1, "livingrock": 1}, "Runic Altar", 3);
    // simpl("rune of water", {"manasteel": 3, "bonemeal": 1, "fishing rod": 1, "sugar cane": 1, "livingrock": 1}, "Runic Altar", 3);
    // simpl("redstone root", {"tall grass": 1, "redstone": 1});

    // simpl("manasteel", {"steel": 1}, "Mana pool");
    // var colors = ["red", "orange"]
    // for (var k in colors)
    // {
    //     var v = colors[k];
    //     simpl(v+" mana petal", assoc("mystical "+v+" petal", 1), "Mana pool");
    // }

    // // BigReactors
    // simpl("reactor controller", {"yellorium": 2, "redstone": 1, "diamond":1, "reactor casing": 4});
    // simpl("reactor control rod", {"graphite":3,"yellorium":1,"redstone":1,"reactor casing":4});
    // simpl("yellorium fuel rod", {"steel plate":4,"yellorium":2,"yellorium block":1,"reactor glass":2});
    // simpl("reactor glass", {"reactor casing":1, "fused quartz":2});
    // simpl("reactor access port", {"reactor casing":4,"chest":1,"piston":1});
    // simpl("reactor coolant port", {"reactor casing":4,"bucket":1,"piston":1,"steel":2});
    // simpl("reactor casing", {"steel plate": 6, "yellorium": 1, "graphite": 2}, undefined, 4);

    // // IC2 nuclear fuels
    // simpl("thorium fuel rod x2", {"thorium fuel rod x1": 2, "iron plate": 1});
    // simpl("thorium fuel rod x1", {"thorium dust": 1, "empty fuel rod": 1});
    // simpl("empty fuel rod", {"iron": 1}, "Extrude: Cell");

    // //ENDER IO
    // simpl("eio stirling generator", {"stone bricks":5, "furnace":1, "piston":1, "basic gear":2 });

    // simpl("dark soularium jetplate", {"enriched soularium alloy":2,"ender crystal":1,"reinforced glider wing":2, "vibrant jetpack_104":1,"dark soularium thruster":2,"octadic capacitor pack_104":1});
    // simpl("reinforced glider wing", { "enriched soularium alloy": 3, "conductive iron armor plating": 3 });
    // simpl("vibrant jetpack_104", { "vibrant jetpack": 1, "dark steel armor plating": 1 });
    // simpl("vibrant jetpack", { "vibrant alloy": 4, "vibrant thrusters": 2, "octadic capacitor": 1, "energetic jetpack": 1 });
    // simpl("energetic jetpack", {"energetic alloy":4, "double capacitor":1, "energetic thrusters":2, "electrical steel jetpack":1});
    // simpl("dark soularium thrusters", { "enriched soularium alloy": 2, "octadic capacitor": 2, "flight control unit": 1, "vibrant thrusters": 1 });
    // simpl("octadic capacitor pack_104", { "electrical steel armor plating": 1, "octadic capacitor pack": 1 });
    // simpl("octadic capacitor pack", {"octadic capacitor": 3, "vibrant crystal": 1, "vibrant alloy": 2,"vibrant capacitor bank":2});
    // simpl("vibrant capacitor bank", {"octadic capacitor":4, "vibrant crystal":1, "iron":4});
    // simpl("enriched soularium alloy", { "dark steel": 1, "soularium": 1, "pulsating crystal": 1 });

    // simpl("dark soularium thruster", {"enriched soularium alloy":2,"flight control unit":1,"octadic capacitor":2,"vibrant thruster":1});
    // simpl("electrical steel jetpack", { "electrical steel": 4, "basic capacitor": 1, "electrical steel thruster": 2, "conductive iron jetpack": 1 });
    // simpl("conductive iron jetpack", { "conductive iron": 4, "basic capacitor": 1, "leather straps": 1, "conductive iron thruster": 2 });
    // simpl("conductive iron thruster", { "basic capacitor": 2, "insulated redstone conduit": 2, "conductive iron": 2, "redstone": 1, "basic gear": 2 });
    // simpl("insulated redstone conduit", { "conduit binder": 6, "redstone alloy": 3 }, undefined, 8);
    // simpl("electrical steel thruster", { "electrical steel": 2, "basic capacitor": 2, "energy conduit": 2, "redstone": 1, "machine chassis": 2 });
    // simpl("energetic thrusters", {"redstone alloy":1, "pulsating crystal":2,"double-layer capacitor":2,"enhanced energy conduit":2,"energetic alloy":2,});

    // simpl("pulsating crystal", { "pulsating iron nugget": 8, "diamond": 1 });
    // simpl("pulsating iron nugget", { "pulsating iron":1 }, undefined, 9);
    // simpl("pulsating iron", { "iron":1,"ender pearl":1 });

    // simpl("advanced photovoltaic cell", { "daylight sensor": 1, "double capacitor": 2, "enlightened fused quartz": 2, "vibrant alloy": 2, "pulsating iron": 2 });
    // simpl("pulsating iron", { "iron": 1, "ender pearl": 1 });
    // simpl("vibrant crystal", {"emerald":1,"vibrant alloy nugget":8});

    // simpl("energy conduit", { "conduit binder": 6, "conductive iron": 3 }, undefined, 8);
    // simpl("enlightened fused quartz", { "fused quartz": 4, "glowstone dust": 4 });
    // simpl("fused quartz", { "nether quartz": 4 }, "Ender IO Alloy Smelt");

    // simpl("machine chassis", {"basic capacitor":1,"iron":4,"iron bars":4});
    // simpl("octadic capacitor", { "vibrant alloy": 6, "glowstone block": 1, "double capacitor": 2 });
    // simpl("vibrant alloy nugget", { "vibrant alloy": 1 }, undefined, 9);
    // simpl("vibrant alloy", { "energetic alloy": 1, "ender pearl": 1 }, "EIO Alloy Smelt");
    // simpl("double capacitor", { "basic capacitor": 2, "coal dust": 1, "energetic alloy": 6 });
    // simpl("basic capacitor", { "redstone": 2, "gold": 4, "copper": 1 });
    // simpl("energetic alloy", {"gold":1, "redstone":1, "glowstone dust":1}, "EIO Alloy Smelt");

    // simpl("basic gear", {"steel": 4, "steel rod": 4, "steel ring": 1});

    // simpl("dark steel armor plating", { "dark steel": 10, "electrical steel armor plating": 1 });
    // simpl("dark steel", { "iron": 1, "coal dust": 1, "obsidian": 1 });
    // simpl("soularium", { "soul sand": 1, "gold ingot": 1 });

    // simpl("electrical steel armor plating", { "electrical steel": 10, "conductive iron armor plating": 1 });
    // simpl("conductive iron armor plating", { "conductive iron": 10, "silicon armor plating": 1 });
    // simpl("silicon armor plating", { "silicon": 5, "iron": 4 });
    // simpl("conductive iron", { "redstone": 1, "iron": 1 });
    // simpl("electrical steel", { "iron": 1, "coal dust": 1, "silicon": 1 });
    // simpl("basic gear", { "cobblestone": 4, "stick": 4 });
    // simpl("redstone alloy", {"redstone":1,"silicon":1});
    // //END ENDERIO

    // //GENDUSTRY
    // simpl("dna extractor", { "aluminum gear": 4, "genetics processor": 2, "mutagen tank": 1, "power module": 1, "hv hull": 1 });
    // simpl("protein liquifier", {"aluminum gear":5,"aluminum":1,"mutagen tank":1,"power module":1,"hv hull":1});
    // simpl("genetic replicator", { "aluminum gear": 4, "genetics processor": 2, "power module": 2, "hv hull": 1 });
    // simpl("genetic sampler", {"bronze gear":4, "genetics processor":1,"diamond":1,"bee receptacle":1, "sturdy casing":1,"power module":1});
    // simpl("genetic transposer", { "hv hull": 1, "aluminum gear": 2, "power module": 1, "mutagen tank": 1, "genetics processor": 2, "small bronze fluid pipe": 2});
    // simpl("imprinter", { "aluminum gear": 4, "genetics processor": 1, "power module": 1, "hv hull": 1, "bee receptacle": 2 });

    // simpl("industrial apiary", { "aluminum gear": 2, "power module": 2, "hv hull": 1, "bee receptacle": 1, "genetics processor": 1, "swarmer": 2 });
    // simpl("swarmer", { "gold": 2, "diamantine electron tube": 4, "alveary": 1 });
    // simpl("diamantine electron tube", {"redstone":0.5, "molten glass":0.25,"diamond":1.25});
    // simpl("mutagen producer", {"aluminum plate":2, "aluminum gear":2,"hv hull":1, "small bronze fluid pipe":1, "power module":2,"mutagen tank":1 });
    // simpl("mutatron", { "aluminum gear": 2, "hv hull": 1, "bee receptacle": 3, "mutagen tank": 1, "power module": 1, "genetics processor": 1 })

    // simpl("mutagen tank", { "aluminum plate": 6, "glass pane": 3 });

    // simpl("power module", { "aluminum gear": 4, "gold": 2, "nand": 2, "block of redstone": 1 });
    // simpl("bee receptacle", { "aluminum": 5, "block of redstone":2, "glass pane":1, "weighted pressure plate(light)":1 });
    // simpl("weighted pressure plate(light)", { "gold plate": 2 });
    // simpl("genetics processor", { "nether quartz": 4, "diamond":4, "pulsating chipset":1 });
    // //END GENDUSTRY

    // // Compressed air cell
    // simpl("compressed air cell", { "empty cell": 1}, "Compress", undefined, warn_if_not("compressor", BRONZE));

    simpl("polyethylene plate", { "molten polyethylene" : 144 }, "Fluid Solidifier: Plate")

    //CHEMISTRY
    simpl("bisphenol a", { "hydrochloric acid": 1000, "acetone": 1000, "phenol" : 2000, "water": -1000}, "Chemical Reactor", 1000)
    simpl("phenol", { "acetone": -1000, "oxygen": 1000, "cumene" : 1000}, "Chemical Reactor", 1000)
    //simpl("acetone", { "phenol": -1000, "oxygen": 1000, "cumene" : 1000}, "Chemical Reactor", 1000)

    simpl("cumene", { "phosphoric acid": 1000, "benzene": 8000, "propene" : 8000}, "Chemical Reactor", 8000)
    simpl("phosphoric acid", { "hydrochloric acid": -1000, "sulfuric acid": 5000, "water" : 10000, "apatite dust": 1}, "Chemical Reactor", 3000)
    simpl("sulfuric acid", { "water" : 2000, "sulfur dust": 1}, "Chemical Reactor", 3000)

    simpl("molten polyethylene", { "ethylene" : 144, "oxygen": 1000}, "Chemical Reactor: 0", 216)

    // These are options for creating ethylene
    // simpl("ethylene", { "hydro-cracked propene" : 1000}, "Distillery: 1", 500)
    // simpl("ethylene", { "steam-cracked propane" : 2000}, "Distillery: 0", 500)
    // simpl("ethylene", { "steam-cracked light fuel" : 1000}, "Distillery: 9", 250)
    // simpl("ethylene", { "steam-cracked butane" : 2000}, "Distillery: 2", 500)
    simpl("ethylene", { "steam-cracked naphtha" : 1000}, "Distillery: 9", 500)

    simpl("ethylene", { "wood gas" : 1000}, "MV Distillery: 1", 20)

    simpl("propene", { "steam-cracked light fuel" : 1000 }, "Distillery: 7", 250)
    simpl("benzene", { "steam-cracked light fuel" : 1000 }, "Distillery: 3", 150)

    simpl("steam-cracked light fuel", { "steam": 2000, "light fuel" : 1000}, "Chemical Reactor", 1000)
    simpl("steam-cracked naphtha", { "steam": 2000, "naphtha" : 1000}, "Chemical Reactor", 1000)

    simpl("naphtha", { "hydro-cracked light fuel": 1000}, "Distillery: 0", 800)
    simpl("hydro-cracked light fuel", { "hydrogen": 2000, "light fuel" : 1000}, "Chemical Reactor", 1000)

    // Raw oil -> Naphtha is 5:1
    // Raw oil -> Light Fuel is 2:1

    // //THAUMCRAFT
    // simpl("ender rift wand focus", { "magic mirror": 1, "eye of ender": 1, "portable hole wand focus": 1, "ordo vis": 10, "perditio vis":10 }, "arcane");
    // simpl("portable hole wand focus", { "ender pearl": 1, "nether quartz": 3, "entropy shard": 1, "earth shard": 1, "aer shard":1,
    //     "alienis essentia": 10,
    //     "iter essentia": 25,
    //     "perditio essentia": 25,
    //     "permutatio essentia": 10
    //     }, "infusion");
    // simpl("magic mirror", { "mirrored glass": 1, "gold ingot": 3, "ender pearl": 1,
    //     "tenebrae essentia": 8,
    //     "iter essentia": 8,
    //     "permutatio essentia": 8
    //     }, "infusion");
    // simpl("mirrored glass", { "quicksilver": 1, "glass pane": 1, "ignis vis": 10, "terra vis":10 }, "arcane");

    // simpl("mystical construct", { "runic matrix": 1, "arcane stone block": 4, "arcane stone bricks": 4, "arcane pedestal": 1,
    //     "ignis vis": 25, "terra vis": 25, "ordo vis": 25,
    //     "aer vis": 25, "perditio vis": 25, "aqua vis": 25
    //     }, "multiblock structure");
    // simpl("runic matrix", { "* shard": 4, "ender pearl": 1, "arcane stone block": 4, "ordo vis": 40 }, "arcane");
    // simpl("arcane pedestal", { "arcane stone block":7, "aer vis": 5 }, "arcane", 2);
    // simpl("alchemical furnace", { "crucible": 1, "furnace": 1, "arcane stone block":7, "ignis vis": 5, "aqua vis": 5 }, "arcane");
    // simpl("alchemical centrifuge", { "piston": 1, "essentia tube":2, "alchemical construct": 1, "arcane alembic": 1, "ordo vis":5, "aqua vis":5, "perditio vis":5 }, "arcane");
    // simpl("alchemical construct", { "vis filter": 2, "essentia valve":2, "essentia tube":4, "greatwood planks": 1, "ordo vis":5, "aqua vis":5 }, "arcane");
    // simpl("essentia buffer", { "essentia valve": 1, "essentia tube": 2, "restricted essentia tube":1, "glass phial":4, "ordo vis":5, "aqua vis":5 }, "arcane");
    // simpl("essentia valve", { "essentia tube": 1, "lever": 1, "ordo vis":5, "aqua vis":5 }, "arcane");
    // simpl("restricted essentia tube", { "essentia tube": 1, "stone": 1, "terra vis":16, "aqua vis":5 }, "arcane");
    // simpl("essentia tube", { "glass": 1, "iron": 2, "gold nugget":1, "quicksilver drop": 1, "ordo vis":1, "aqua vis":1 }, "arcane", 8);
    // simpl("arcane alembic", { "bucket": 1, "iron":5, "gold":1, "vis filter": 1, "aer vis": 5, "aqua vis": 5 }, "arcane");
    // simpl("vis filter", { "silverwood planks": 1, "gold":2, "ordo vis": 5, "aqua vis": 5 }, "arcane", 2);
    // simpl("arcane stone bricks", { "arcane stone block": 1 });
    // simpl("arcane stone block", { "stone": 8, "* shard":1, "ignis vis": 1, "terra vis": 1 }, "arcane", 9);
    // simpl("crucible", { "cauldron": 1 }, "wand");
    // simpl("golem core chop", { "golem core harvest": 1, "iron axe": 3, "axe of the stream": 1, "meto essentia": 16, "instrumentum essentia": 16, "arbor essentia": 16 }, "infusion");
    // simpl("stone golem", { "stone bricks": 1, "humanus essentia": 4, "motus essentia": 4, "spiritus essentia": 4 }, "crucible");
    // simpl("golem core harvest", { "golem animation core": 1, "meto essentia": 5, "messis essentia": 5 }, "crucible");
    // simpl("golem animation core", { "brick": 4, "nitor": 1, "ordo vis": 5, "ignis vis": 5 }, "arcane");
    // simpl("nitor", { "glowstone dust": 1, "ignis essentia": 3, "lux essentia": 3, "potentia essentia": 3 }, "crucible");
    // simpl("boots of the traveler", { "air shard": 2, "raw fish": 1, "feather": 1, "leather boots": 1, "enchanted fabric": 2, "iter essentia": 25, "volatus essentia":25}, "infusion")
    // simpl("enchanted fabric", { "wool": 1, "string": 4,
    //     "ignis vis": 1, "ordo vis": 1, "aqua vis": 1,
    //     "aer vis": 1, "terra vis": 1, "perditio vis": 1
    //     }, "arcane")
    // simpl("axe of the stream", { "greatwood": 1, "thaumium axe": 1, "water shard": 2, "diamond": 1, "aqua essentia": 16, "arbor essentia": 8 }, "infusion")
    // simpl("thaumium axe", {"thaumium plate": 2, "thaumium": 1, "stick": 2})
    // //END THAUMCRAFT

    // simpl("fusion reactor tier 1 multi", { "superconducting coil block": 32, "luv energy hatch": 4, "luv input hatch": 2, "luv output hatch": 1,  "luv casing" : 120, "fusion control computer mk 1" : 1 });
    // simpl("fusion control computer mk 1", { "iv field generator": 2, "plutonium plate": 1, "nether star plate": 1, "energy flow circuit": 4, "fusion coil": 1});
    // simpl("fusion coil", { "superconducting coil block": 1, "iridium neutron reflector": 2, "energy flow circuit": 4, "mv field generator": 2});
    // simpl("iridium neutron reflector", { "thick neutron reflector": 8, "iridium reinforced plate": 1});
    // simpl("thick neutron reflector", { "neutron reflector": 4, "beryllium plate": 1});
    // simpl("neutron reflector", { "tin dust": 4, "coal dust": 4, "copper plate": 1 });
    // simpl("nether star plate", { "nether star dust": 1 }, "Compress");
    // simpl("nether star dust", { "nether star": 1 }, "Macerate");

    // simpl("iv field generator", {"energy flow circuit": 4, "nether star": 1, "osmium wire x16": 4});
    // simpl("mv field generator", {"good circuit": 4, "eye of ender": 1, "osmium wire x2": 4});
    // simpl("superconducting coil block", { "superconductor wire x2": 8});

    // simpl("iridium reinforced plate", { "iridium alloy ingot": 1, "industrial tnt": 8}, "Implosion Compressor");
    // simpl("iridium alloy ingot", {"advanced alloy": 4, "iridium plate": 4, "industrial diamond": 1});
    // simpl("advanced alloy", { "mixed metal ingot": 1 }, "Compress");

    // simpl("electric blast furnace multi", { "electric blast furnace": 1, "cupronickel coil block": 16, "lv input bus": 1, "lv output bus":1,
    //     "maintenance hatch":1,
    //     "lv muffler hatch":1,
    //     "lv energy hatch":3,
    //     "heat proof casing":10
    //     });

    // for (var k = 5; k < 16; ++k)
    // {
    //     simpl("assembly line " + k, {
    //         "distillation tower": 1,
    //         "clean stainless steel casing": k*7+6,
    //         "mv output hatch": k+1,
    //         "mv input hatch": 1,
    //         "mv output bus": 1,
    //         "hv energy hatch": 1,
    //     })
    // }


    simpl("large gas turbine multi mv", {"large gas turbine": 1, "mv rotor holder": 1, "ev energy output hatch": 1, "hv input hatch": 1, "stainless turbine casing": 30})
    simpl("large gas turbine", { "extreme circuit": 2, "stainless steel gear": 4, "ev hull": 1, "large stainless steel pipe": 2 })
    simpl("stainless turbine casing", {"steel turbine casing": 1, "stainless steel plate": 6}, "Assemble", 3)

    for (var k = 1; k < 9; ++k)
    {
        simpl("distillation tower " + k + " fluids", {
            "distillation tower": 1,
            "clean stainless steel casing": k*7+6,
            "mv output hatch": k+1,
            "mv input hatch": 1,
            "mv output bus": 1,
            "hv energy hatch": 1,
        })
    }

    simpl("distillation tower", {"extreme circuit": 4, "ev pump": 2, "large stainless steel pipe": 2, "ev machine casing": 1})
    simpl("large steam turbine multi ev", {"large steam turbine": 1, "ev rotor holder": 1, "ev energy output hatch": 1, "hv input hatch": 1, "hv output hatch": 1, "steel turbine casing": 29})
    simpl("large steam turbine", { "advanced circuit": 2, "steel gear": 4, "hv hull": 1, "large steel pipe": 2 })
    simpl("ev rotor holder", {"ev hull": 1, "nichrome wire x4": 4, "rubber ring": 1})

    simpl("clean stainless steel casing", { "stainless steel frame": 1, "stainless steel plate": 6}, "Assemble", 3)
    // simpl("vacuum freezer multi", { "frost proof casing": 21, "vacuum freezer": 1, "lv input bus": 1, "lv output bus": 1, "maintenance hatch": 1, "mv energy hatch": 1 });
    simpl("vacuum freezer", { "frost proof casing": 1, "hv pump": 3, "gold cable x1": 2, "extreme circuit": 3 });

    simpl("implosion compressor multi", {"implosion compressor":1, "mv energy hatch":1, "lv input bus":1, "lv output bus":1, "solid steel casing":22});
    simpl("implosion compressor", { "obsidian":3,"solid steel casing":1,"aluminum cable x1":2,"advanced circuit":3 });

    simpl("large steel boiler", { "advanced circuit": 4, "copper cable x1": 4, "steel firebox casing": 1 })
    simpl("large titanium boiler", { "elite circuit": 4, "gold cable x1": 4, "titanium firebox casing": 1 })

    // simpl("lv muffler hatch", { "lv hull": 1, "steel fluid pipe": 1 });

    simpl("titanium pipe casing", { "titanium plate": 4, "medium titanium pipe": 4, "titanium frame": 1 }, undefined, 3);
    simpl("titanium firebox casing", { "titanium plate": 4, "titanium rod": 4, "titanium frame": 1 }, undefined, 3);
    simpl("titanium machine casing", { "titanium plate": 6, "titanium frame": 1 }, undefined, 3);
    simpl("titanium frame", { "titanium rod": 5, "titanium plate": 3 }, undefined, 4);

    simpl("steel pipe casing", { "steel plate": 4, "medium steel pipe": 4, "steel frame": 1 }, undefined, 3);
    simpl("steel firebox casing", { "steel plate": 4, "steel rod": 4, "steel frame": 1 }, undefined, 3);
    simpl("solid steel casing", { "steel plate": 6, "steel frame": 1 }, "Assemble", 3);
    simpl("steel frame", { "steel rod": 5, "steel plate": 3 }, undefined, 4);
    simpl("stainless steel frame", { "stainless steel rod": 5, "stainless steel plate": 3 }, undefined, 4);

    simpl("steel turbine casing", { "blue steel frame": 1, "magnalium plate": 6}, "Assemble", 3)
    simpl("blue steel frame", { "blue steel rod": 5, "blue steel plate": 3 }, undefined, 4);

    simpl("electric blast furnace", { "heat proof casing": 1, "basic circuit": 3, "tin cable x1": 2, "furnace": 3});
    simpl("multi smelter", { "heat proof casing": 1, "advanced circuit": 3, "annealed copper cable x1": 2, "furnace": 3});
    simpl("nichrome coil block", { "nichrome wire x2": 8 })
    simpl("kanthal coil block", { "kanthal wire x2": 8 })
    simpl("cupronickel coil block", { "cupronickel wire x2": 8 })
    simpl("tungstensteel coil block", { "tungstensteel wire x2": 8 })
    simpl("superconductor coil block", { "superconductor wire x2": 8 })

    simpl("superconductor wire x2", { "superconductor wire x1": 2});
    simpl("superconductor wire x1", { "luv wire x1": 3, "nitrogen": 2000, "lv pump": 1, "tungstensteel plate": 3 }, "Assemble HV", 3);

    simpl("heat proof casing", { "invar plate": 6, "invar frame": 1 }, undefined, 3);
    simpl("invar frame", { "invar rod": 5, "invar plate": 3 }, undefined, 4);
    // if (TECH["assembling machine"] > NONE)
    // else
    //     simpl("invar frame box", { "invar rod": 8 }, undefined, 2);

    // simpl("electric jetpack", { "advanced circuit": 1, "iron item casing": 4, "glowstone dust": 2, "batbox": 1 });
    // simpl("batbox", {"plank":5,"insulated tin cable":1,"re battery":3});
    // simpl("maintenance hatch", {"lv hull":1});

    // simpl("ev macerator", { "aluminum cable x1": 3, "ev hull": 1, "data control circuit": 2, "ev piston": 1, "ev motor": 1, "diamond grinding head":1 });

    // // OpenComputers
    // simpl("opencomputer tier 1 multi", {
    //     "computer case tier 1":1,
    //     "cpu tier 1":1,
    //     "graphics card tier 1":1,
    //     "memory tier 1":2,
    //     "hard disk drive tier 1":1,
    //     "redstone card tier 1":1,
    //     "screen tier 1":1,
    //     "keyboard":1,
    //     "capacitor":1,
    //     "power converter":1,
    //     "disk drive":1,
    //     "floppy disk":2,
    // });

    // simpl("floppy disk", { "disk platter": 1, "aluminum plate": 2, "lever": 1, "aluminum screw": 4 });

    // simpl("capacitor", { "cesu": 1, "lv casing": 2, "printed circuit board": 2, "transistor": 1 });
    // simpl("power converter", { "microchip tier 2": 1, "aluminum plate": 2, "printed circuit board": 2, "ic2 mv transformer": 1 });

    // simpl("hard disk drive tier 1", { "disk platter": 2, "memory tier 1": 4, "microchip tier 2": 1, "aluminum screw": 1 });
    // simpl("disk platter", { "aluminum plate": 4 });

    // simpl("component bus tier 1", { "iron nugget": 4, "redstone": 1, "microchip tier 1": 1, "printed circuit board": 1, "control unit": 1 });
    // simpl("screen tier 1", { "aluminum plate": 4, "redstone": 1, "transistor": 1, "glass pane": 1 });
    // simpl("cpu tier 1", { "control unit": 1, "arithmetic logic unit": 1, "microchip tier 2": 2, "aluminum screw": 2, "aluminum plate": 2 });

    // simpl("redstone card tier 1", { "card base": 1, "redstone torch": 1, "microchip tier 1": 1 });
    // simpl("graphics card tier 1", { "card base": 1, "arithmetic logic unit": 1, "microchip tier 1": 1, "memory tier 1": 1 });
    // simpl("card base", { "printed circuit board": 2, "iron rod": 2, "microchip tier 2": 1, "transistor": 1, "gold nugget": 2 });
    // simpl("computer case tier 1", { "printed circuit board": 1, "aluminum screw": 2, "microchip tier 1": 1, "component heat vent": 2, "lv casing": 1 });

    // simpl("disk drive", { "piston": 1, "glass lens": 1, "microchip tier 2": 3, "lv casing": 1 });
    // simpl("keyboard", { "button group": 4, "arrow keys": 1, "numeric keypad": 1 });
    // simpl("button group", { "button": 6 });
    // simpl("numeric keypad", { "button": 9 });
    // simpl("arrow keys", { "button": 4 });

    // simpl("control unit", { "transistor": 6, "data control circuit": 1 }, "Assemble", 3, warn_if_not("assembling machine", LV));
    // simpl("arithmetic logic unit", { "microchip tier 1": 1, "comparator": 3 }, "Assemble", undefined, warn_if_not("assembling machine", LV));
    // simpl("memory tier 1", { "microchip tier 1": 3, "printed circuit board": 3 }, "Assemble", undefined, warn_if_not("assembling machine", LV));
    // simpl("microchip tier 2", { "advanced circuit": 1, "transistor": 8 }, "Assemble", 4, warn_if_not("assembling machine", LV));
    // simpl("microchip tier 1", { "basic circuit": 1, "transistor": 4 }, "Assemble", 4, warn_if_not("assembling machine", LV));
    // simpl("transistor", { "redstone": 1, "iron rod": 3 }, "Assemble", 6, warn_if_not("assembling machine", LV));

    // simpl("printed circuit board", { "circuit board": 1, "tiny gold dust": 2, "sulfuric acid cell": 1 });
    // simpl("circuit board", { "raw circuit board": 1 }, "Smelt");
    // simpl("raw circuit board", { "clay block": 1, "cactus green": 1 }, "Cutting Wire");
    // // End OpenComputers

    // // IC2 nuclear
    // simpl("nuclear reactor", {"dense lead plate": 4, "reactor chamber": 3, "generator": 1, "advanced circuit": 1});
    // simpl("reactor chamber", {"lead plate": 4, "basic machine casing": 1});
    // simpl("component heat exchanger", {"heat exchanger": 1, "gold plate": 4});
    // simpl("heat exchanger", {"basic circuit": 1, "tin plate": 3, "copper plate": 5});
    // simpl("component heat vent", {"heat vent": 1, "tin plate": 4, "iron bars": 4});
    // simpl("advanced heat vent", {"reactor heat vent": 2, "diamond": 1, "iron bars": 6});
    // simpl("overclocked heat vent", {"reactor heat vent": 1, "gold plate": 4});
    // simpl("reactor heat vent", {"heat vent": 1, "copper plate": 8});
    // simpl("component heat vent", {"heat vent": 1, "tin plate": 4, "iron bars": 4});
    // simpl("heat vent", {"iron plate": 4, "electric motor":1, "iron bars": 4});

    // // dense plates
    // simpl("dense lead plate", {"lead": 9}, "MV Bend: Setting 9", undefined, warn_if_not("assembling machine", MV));

    // // GT tools
    // simpl("hv jackhammer", { "long * rod":1, "hv piston":1, "titanium plate":3, "titanium screw":1,"titanium spring":1, "large * battery":1 });
    // var tiermats;
    // tiermats = {
    //     lv: {
    //         material: "stainless steel",
    //         battery: "small * battery"
    //     },
    //     mv: {
    //         material: "titanium",
    //         battery: "medium * battery"
    //     },
    //     hv: {
    //         material: "tungstensteel",
    //         battery: "large * battery"
    //     }
    // };
    // for (var k in tiermats)
    // {
    //     var v = tiermats[k];
    //     var motor = k + " motor";
    //     var plate = v.material + " plate";
    //     var screw = v.material + " screw";
    //     var smallgear = "small " + v.material + " gear";
    //     simpl(k + " wrench", assoc("* wrench tip", 1, motor, 1, plate, 2, smallgear, 2, screw, 1, v.battery));
    //     simpl(k + " drill", assoc("* drill tip", 1, motor, 1, plate, 2, smallgear, 2, screw, 1, v.battery));
    //     simpl(k + " chainsaw", assoc("* chainsaw tip", 1, motor, 1, plate, 2, smallgear, 2, screw, 1, v.battery));

    //     simpl(k + " screwdriver", assoc("long * rod", 1, motor, 1, plate, 2, smallgear, 2, screw, 1, v.battery));
    // }
    // simpl("titanium spring", {"long titanium rod": 1}, "Bend: Setting 1");
    // simpl("long titanium rod", {"titanium rod": 2}, "Hammer");
    // simpl("lv soldering iron", {"iron rod": 1, "small * battery": 1, "* bolt": 1, "rubber plate": 1});

    // simpl("hv polarizer", { "steel rod": 2, "hv hull": 1, "gold cable x1":2, "copper wire x4":4 });
    // simpl("lv polarizer", { "iron rod": 2, "lv hull": 1, "tin cable x1":2, "tin wire x2":4 });

    // // GT stuff
    // simpl("mv battery buffer x16", {"copper wire x16": 4, "mv hull": 1, "chest": 1});
    // simpl("mv battery buffer x9", {"copper wire x8": 4, "mv hull": 1, "chest": 1});
    // simpl("mv battery buffer x4", {"copper wire x4": 4, "mv hull": 1, "chest": 1});
    // simpl("mv battery buffer x1", {"copper wire x1": 4, "mv hull": 1, "chest": 1});

    // simpl("lv battery buffer x16", {"tin wire x16": 4, "lv hull": 1, "chest": 1});
    // simpl("lv battery buffer x9", {"tin wire x8": 4, "lv hull": 1, "chest": 1});
    // simpl("lv battery buffer x4", {"tin wire x4": 4, "lv hull": 1, "chest": 1});
    // simpl("lv battery buffer x1", {"tin wire x1": 4, "lv hull": 1, "chest": 1});

    // simpl("ulv input bus", { "ulv hull": 1, "chest": 1 });
    // simpl("ulv output bus", { "ulv hull": 1, "chest": 1 });

    // tiermats = {
        // lv: {
        //     upcable: "copper cable x1",
        //     cable: "tin cable x1",
        //     cable4: "tin cable x4",
        //     circuit: "basic circuit",
        //     rarewire: "gold wire x1",
        //     heatwire2: "copper wire x2",
        //     heatwire4: "copper wire x4",
        //     pipe: "bronze fluid pipe",
        //     lathediamond: "diamond",
        //     grinding: "diamond",
        //     rotor: "tin rotor",
        //     screw: "tin screw",
        //     gear: "steel gear",
        //     smallgear: "small steel gear",
        //     rod: "steel rod",
        //     magrod: "magnetic steel rod",
        //     plate: "steel plate",
        //     motorwire: "copper wire x1",
        // },
        // mv: {
        //     upcable: "gold cable x1",
        //     cable: "copper cable x1",
        //     cable4: "copper cable x4",
        //     circuit: "good circuit",
        //     rarewire: "silver wire x1",
        //     heatwire2: "cupronickel wire x2",
        //     heatwire4: "cupronickel wire x4",
        //     pipe: "steel fluid pipe",
        //     lathediamond: "industrial diamond",
        //     grinding: "industrial diamond",
        //     rotor: "bronze rotor",
        //     screw: "bronze screw",
        //     gear: "aluminum gear",
        //     smallgear: "small aluminum gear",
        //     rod: "aluminum rod",
        //     magrod: "magnetic steel rod",
        //     plate: "aluminum plate",
        //     motorwire: "copper wire x2",
        // },
        // hv: {
        //     upcable: "aluminum cable x1",
        //     cable: "gold cable x1",
        //     cable4: "gold cable x4",
        //     circuit: "advanced circuit",
        //     rarewire: "electrum wire x1",
        //     heatwire2: "kanthal wire x2",
        //     heatwire4: "kanthal wire x4",
        //     pipe: "stainless steel fluid pipe",
        //     lathediamond: "industrial diamond",
        //     grinding: "diamond grinding head",
        //     rotor: "steel rotor",
        //     screw: "steel screw",
        //     gear: "stainless steel gear",
        //     smallgear: "small stainless steel gear",
        //     rod: "stainless steel rod",
        //     magrod: "magnetic steel rod",
        //     plate: "stainless steel plate",
        //     motorwire: "copper wire x4",
        // },
        // ev: {
        //     upcable: "tungsten cable x1",
        //     cable: "aluminum cable x1",
        //     cable4: "aluminum cable x4",
        //     circuit: "data control circuit",
        //     rarewire: "platinum wire x1",
        //     heatwire2: "nichrome wire x2",
        //     heatwire4: "nichrome wire x4",
        //     pipe: "titanium fluid pipe",
        //     lathediamond: "industrial diamond",
        //     grinding: "diamond grinding head",
        //     rotor: "steel rotor",
        //     screw: "steel screw",
        //     gear: "titanium gear",
        //     smallgear: "small titanium gear",
        //     rod: "titanium rod",
        //     magrod: "magnetic neodymium rod",
        //     plate: "titanium plate",
        //     motorwire: "annealed copper wire x8",
        // },
        // iv: {
        //     upcable: "tungsten cable x4",
        //     cable: "tungsten cable x1",
        //     cable4: "tungsten cable x4",
        //     circuit: "energy flow circuit",
        //     rarewire: "osmium wire x1",
        //     heatwire2: "nichrome wire x8",
        //     heatwire4: "nichrome wire x16",
        //     pipe: "tungstensteel fluid pipe",
        //     lathediamond: "industrial diamond",
        //     grinding: "diamond grinding head",
        //     rotor: "tungstensteel rotor",
        //     screw: "tungstensteel screw",
        //     gear: "tungstensteel gear",
        //     smallgear: "small tungstensteel gear",
        //     rod: "tungstensteel rod",
        //     magrod: "magnetic neodymium rod",
        //     plate: "tungstensteel plate",
        //     motorwire: "annealed copper wire x16",
        // }
    // };

    tiermats = {
        lv: {
            upcable: "copper cable x1",
            cable: "tin cable x1",
            ccable: "tin cable x1",
            // cable4: "tin cable x4",
            circuit: "basic circuit",
            upcircuit: "good circuit",
            rarewire: "gold wire x1",
            heatwire2: "copper wire x2",
            heatwire4: "copper wire x4",
            pipe: "medium bronze pipe",
            // lathediamond: "diamond",
            grinding: "diamond",
            rotor: "tin rotor",
            screw: "tin screw",
            gear: "steel gear",
            smallgear: "small steel gear",
            rod: "steel rod",
            magrod: "magnetic steel rod",
            plate: "steel plate",
            motorwire: "copper wire x1",
        },
        mv: {
            upcable: "gold cable x1",
            cable: "copper cable x1",
            ccable: "copper cable x1",
            // cable4: "copper cable x4",
            circuit: "good circuit",
            upcircuit: "advanced circuit",
            rarewire: "silver wire x1",
            heatwire2: "cupronickel wire x2",
            heatwire4: "cupronickel wire x4",
            pipe: "medium steel pipe",
            // lathediamond: "industrial diamond",
            grinding: "diamond",
            rotor: "bronze rotor",
            screw: "bronze screw",
            gear: "aluminum gear",
            smallgear: "small aluminum gear",
            rod: "aluminum rod",
            magrod: "magnetic steel rod",
            plate: "aluminum plate",
            motorwire: "copper wire x2",
        },
        hv: {
            upcable: "aluminum cable x1",
            cable: "gold cable x1",
            ccable: "gold cable x1",
            // cable4: "copper cable x4",
            circuit: "advanced circuit",
            upcircuit: "extreme circuit",
            rarewire: "electrum wire x1",
            heatwire2: "kanthal wire x2",
            heatwire4: "kanthal wire x4",
            pipe: "medium stainless steel pipe",
            // lathediamond: "industrial diamond",
            grinding: "diamond grinding head",
            rotor: "steel rotor",
            screw: "steel screw",
            gear: "stainless steel gear",
            smallgear: "small stainless steel gear",
            rod: "stainless steel rod",
            magrod: "magnetic steel rod",
            plate: "stainless steel plate",
            motorwire: "copper wire x4",
        },
        ev: {
            upcable: "tungsten cable x1",
            cable: "aluminum cable x1",
            ccable: "aluminum cable x1",
            // cable4: "aluminum cable x4",
            circuit: "extreme circuit",
            upcircuit: "elite circuit",
            rarewire: "platinum wire x1",
            heatwire2: "nichrome wire x2",
            heatwire4: "nichrome wire x4",
            pipe: "medium titanium pipe",
            // lathediamond: ???
            grinding: "diamond grinding head",
            rotor: "stainless steel rotor",
            screw: "stainless steel screw",
            smallgear: "small titanium gear",
            rod: "titanium rod",
            magrod: "magnetic neodymium rod",
            plate: "titanium plate",
            motorwire: "annealed copper wire x8",
            tcoil: "small coil",
        },
        iv: {
            upcable: "tungsten cable x4",
            cable: "platinum cable x1",
            ccable: "tungsten cable x1",
            // cable4: "tungsten cable x4",
            circuit: "elite circuit",
            upcircuit: "master circuit",
            rarewire: "osmium wire x1",
            heatwire2: "nichrome wire x8",
            heatwire4: "nichrome wire x16",
            pipe: "medium tungstensteel pipe",
            // lathediamond: "industrial diamond",
            grinding: "diamond grinding head",
            rotor: "tungstensteel rotor",
            screw: "tungstensteel screw",
            smallgear: "small tungstensteel gear",
            rod: "tungstensteel rod",
            magrod: "magnetic neodymium rod",
            plate: "tungstensteel plate",
            motorwire: "annealed copper wire x16",
            tcoil: "small coil",
        }
    }

    simpl("hv battery buffer x4", {"hv hull": 1, "gold wire x4": 4, "chest": 1})

    // fill out basic stuff
    for (var k in tiermats)
    {
        var v = tiermats[k];
        v.hull = k + " hull";
        v.motor = k + " motor";
        v.pump = k + " pump";
        v.piston = k + " piston";
        v.conveyor = k + " conveyor";
        v.robotarm = k + " robot arm";
        v.sensor = k + " sensor";
        v.emitter = k + " emitter";
        v.casing = k + " casing";

        // simpl(k+" arc furnace", assoc(v.cable4, 2, v.hull, 1, v.plate, 3, v.circuit, 2, "graphite cell", 1));
        // simpl(k+" fluid canner", assoc(v.cable, 2, v.hull, 1, v.pump, 2, v.circuit, 2, "glass", 2));
        simpl(k+" water pump", assoc(v.pipe, 2, v.hull, 1, v.pump, 4, v.circuit, 2));
        // simpl(k+" canning machine", assoc(v.cable, 2, v.hull, 1, v.pump, 1, v.circuit, 2, "glass", 3));
        // simpl(k+" disassembling machine", assoc(v.cable, 2, v.hull, 1, v.circuit, 2, v.robotarm, 4));
        simpl(k+" assembling machine", assoc(v.cable, 2, v.hull, 1, v.circuit, 2, v.conveyor, 2, v.robotarm, 2));
        simpl(k+" fluid extractor", assoc(v.cable, 2, v.hull, 1, v.piston, 1, v.pump, 1, v.circuit, 2, "glass", 2));
        simpl(k+" fluid solidifier", assoc(v.cable, 2, v.hull, 1, v.pump, 2, v.circuit, 2, "glass", 1, "chest", 1));
        simpl(k+" electrolyzer", assoc(v.rarewire, 4, v.hull, 1, v.cable, 1, v.circuit, 2, "glass", 1));
        // simpl(k+" extruder", assoc(v.heatwire4, 4, v.hull, 1, v.piston, 1, v.circuit, 2, v.pipe, 1));
        // simpl(k+" scanner", assoc(v.cable, 2, v.hull, 1, v.emitter, 1, v.circuit, 4, v.sensor, 1));
        simpl(k+" bending machine", assoc(v.cable, 1, v.hull, 1, v.piston, 2, v.motor, 2, v.circuit, 2));
        simpl(k+" lathe", assoc(v.cable, 3, v.hull, 1, v.piston, 1, v.motor, 1, v.circuit, 2, "diamond", 1));
        simpl(k+" wiremill", assoc(v.cable, 2, v.hull, 1, v.motor, 4, v.circuit, 2));
        simpl(k+" centrifuge", assoc(v.cable, 2, v.hull, 1, v.motor, 2, v.circuit, 4));
        simpl(k+" thermal centrifuge", assoc(v.cable, 2, v.hull, 1, v.motor, 2, v.circuit, 2, v.heatwire4, 2));
        // simpl(k+" extractor", assoc(v.cable, 2, v.hull, 1, v.piston, 1, v.pump, 1, v.circuit, 2, "glass", 2));
        simpl(k+" macerator", assoc(v.cable, 3, v.hull, 1, v.piston, 1, v.motor, 1, v.circuit, 2, v.grinding, 1));
        simpl(k+" ore washing plant", assoc(v.cable, 2, v.hull, 1, v.motor, 1, v.rotor, 2, v.circuit, 2, "glass", 1));

        simpl(k+" distillery", assoc("blaze rod", 1, "glass", 2, v.cable, 2, v.hull, 1, v.pump, 1, v.circuit, 2));
        simpl(k+" brewery", assoc("blaze rod", 1, "glass", 2, v.cable, 2, v.hull, 1, v.pump, 1, v.circuit, 2));

        simpl(k+" packager", assoc(v.cable, 2, v.hull, 1, v.circuit, 2, v.conveyor, 1, v.robotarm, 1, "chest", 2));
        simpl(k+" forming press", assoc(v.cable, 4, v.hull, 1, v.piston, 2, v.circuit, 2));
        if ("gear" in v)
        {
            simpl(k+" diesel generator", assoc(v.cable, 1, v.hull, 1, v.motor, 2, v.piston, 2, v.circuit, 1, v.gear, 2));
            simpl(k+" gas turbine", assoc(v.cable, 1, v.hull, 1, v.motor, 2, v.rotor, 3, v.circuit, 2));
            simpl(k+" steam turbine", assoc(v.cable, 1, v.hull, 1, v.rotor, 2, v.motor, 2, v.circuit, 1, v.pipe, 2));
        }
        simpl(k+" chemical reactor", assoc(v.cable, 2, v.hull, 1, v.motor, 1, v.rotor, 1, v.circuit, 2, "glass", 2));
        // simpl(k+" chemical bath", assoc(v.cable, 1, v.hull, 1, v.conveyor, 1, v.pump, 1, v.circuit, 2, "glass", 2));
        simpl(k+" cutting machine", assoc(v.cable, 2, v.hull, 1, v.conveyor, 1, v.motor, 1, v.circuit, 2, "glass", 1, "diamond sawblade", 1));
        // simpl(k+" compressor", assoc(v.cable, 2, v.hull, 1, v.piston, 2, v.circuit, 2));
        simpl(k+" laser engraver", assoc(v.cable, 2, v.hull, 1, v.piston, 2, v.emitter, 1, v.circuit, 3));

        simpl(k+" air collector", assoc(v.pump, 2, v.hull, 1, v.circuit, 1, "item filter", 1, "iron bars", 4));

        simpl(k+" circuit assembling machine", assoc(v.cable, 2, v.hull, 1, v.upcircuit, 2, v.conveyor, 2, v.robotarm, 1, v.emitter, 1));

        simpl(k+" sifting machine", assoc(v.cable, 2, v.hull, 1, v.piston, 2, "item filter", 2, v.circuit, 2));
        simpl(k+" autoclave", assoc(v.hull, 1, v.pump, 1, "glass", 1, v.circuit, 2, v.plate, 4));
        simpl(k+" electric furnace", assoc(v.hull, 1, v.heatwire2, 4, v.circuit, 2, v.cable, 2));
        simpl(k+" alloy smelter", assoc(v.hull, 1, v.heatwire4, 4, v.circuit, 2, v.cable, 2));

        simpl(k+" energy hatch", assoc(v.cable, 1, v.hull, 1));
        simpl(k+" energy output hatch", assoc(v.cable, 1, v.hull, 1));
        simpl(k+" input bus", assoc(v.hull, 1, "chest", 1));
        simpl(k+" output bus", assoc(v.hull, 1, "chest", 1));

        simpl(k+" input hatch", assoc(v.hull, 1, "glass", 1));
        simpl(k+" output hatch", assoc(v.hull, 1, "glass", 1));

        if ((k == "lv" || k == "mv") && TECH["polyethylene hulls"] == NONE)
        {
            simpl(v.hull, assoc(v.ccable, 2, v.casing, 1, "wrought iron plate", 2, v.plate, 1));
        }
        else
        {
            simpl(v.hull, assoc(v.ccable, 2, v.casing, 1, "molten polyethylene", 288), "Assemble");
        }
        simpl(v.casing, assoc(v.plate, 8), "Wrench or Assemble: 8");
        simpl(v.robotarm, assoc(v.rod, 2, v.piston, 1, v.motor, 2, v.ccable, 3, v.circuit, 1));
        simpl(v.conveyor, assoc("rubber plate", 6, v.motor, 2, v.ccable, 1));
        simpl(v.piston, assoc(v.rod, 2, v.motor, 1, v.ccable, 2, v.plate, 3, v.smallgear, 1));
        if (k == "lv") {
            simpl(v.pump, assoc(v.rotor, 1, v.screw, 1, v.ccable, 1, "paper ring", 2, v.pipe, 1, v.motor, 1));
            simpl("lv motor", {"iron rod": 2, "magnetic iron rod":1, "tin cable x1": 2, "copper wire x1": 4});
        }
        else {
            simpl(v.pump, assoc(v.rotor, 1, v.screw, 1, v.ccable, 1, "rubber ring", 2, v.pipe, 1, v.motor, 1));
            simpl(v.motor, assoc(v.rod, 2, v.magrod, 1, v.ccable, 2, v.motorwire, 4));
        }
    }

    simpl("iv emitter", { "osmium rod": 4, "elite circuit": 2, "eye of ender": 1, "tungsten cable x1": 2 });
    simpl("ev emitter", { "platinum rod": 4, "extreme circuit": 2, "ender pearl": 1, "aluminum cable x1": 2 });
    simpl("hv emitter", { "chrome rod": 4, "advanced circuit": 2, "emerald": 1, "gold cable x1": 2 });
    simpl("mv emitter", { "electrum rod": 4, "good circuit": 2, "nether quartz": 1, "copper cable x1": 2 });
    // simpl("lv sensor", { "brass rod": 1, "basic circuit": 1, "quartzite": 1, "steel plate": 4 });
    simpl("lv emitter", { "brass rod": 4, "basic circuit": 2, "quartzite": 1, "tin cable x1": 2 });

    simpl("lv-mv transformer", { "lv hull": 1, "tin cable x1": 4, "copper cable x1": 1})
    simpl("mv-hv transformer", { "mv hull": 1, "copper cable x1": 4, "gold cable x1": 1})
    simpl("hv-ev transformer", { "hv hull": 1, "gold cable x1": 4, "aluminum cable x1": 1, "small coil": 2})
    simpl("ev-iv transformer", { "ev hull": 1, "aluminum cable x1": 4, "tungsten cable x1": 1, "small coil": 2})

    // simpl("luv energy hatch", { "luv hull": 1, "tungsten cable x4": 1 });
    // simpl("fusion casing", { "luv casing": 1, "tungstensteel plate": 6 });
    // simpl("luv hull", { "luv casing": 1, "tungsten cable x4": 2 });
    // simpl("luv hull", { "luv casing": 1, "tungsten cable x4": 2 });
    // simpl("luv input hatch", { "luv casing": 1, "glass": 1 });
    // simpl("luv output hatch", { "luv casing": 1, "glass": 1 });
    // simpl("luv casing", { "chrome plate": 8 });

    // // IC2 machines
    // simpl("reactor pressure vessel multi", {"reactor pressure vessel": 94, "reactor redstone port": 1, "reactor access hatch": 1, "reactor fluid port": 2}, "Multiblock");
    // simpl("reactor redstone port", {"reactor pressure vessel": 8, "redstone": 1});
    // simpl("reactor access hatch", {"reactor pressure vessel": 8, "trapdoor": 1});
    // simpl("reactor fluid port", {"reactor pressure vessel": 8, "universal fluid cell": 1});
    // simpl("reactor pressure vessel", {"lead plate": 5, "stone": 4}, undefined, 4);

    // simpl("liquid heat exchanger", { "empty cell": 2, "glass": 4, "iron item casing": 2, "heat conductor": 1});
    // simpl("ic2 stirling generator", {"iron item casing": 7, "generator": 1, "heat conductor": 1});
    // simpl("heat conductor", { "rubber": 6, "copper plate": 3});
    // simpl("generator", {"re battery": 1, "basic machine casing": 1, "furnace": 1});
    // simpl("cesu", {"bronze plate": 5, "insulated copper cable": 1, "advanced re battery": 3});
    // simpl("mfsu", {"advanced circuit": 1, "lapotron crystal": 6, "advanced machine casing": 1, "mfe": 1});
    // simpl("mfe", {"insulated gold cable": 4, "energy crystal": 4, "basic machine casing": 1});

    // simpl("ic2 ev transformer", {"lapotron crystal": 1, "insulated hv cable": 2, "advanced circuit": 1, "ic2 hv transformer": 1});
    // simpl("ic2 hv transformer", {"ic2 mv transformer": 1, "insulated gold cable": 2, "basic circuit": 1, "advanced re battery": 1});
    // simpl("ic2 mv transformer", {"basic machine casing": 1, "insulated copper cable": 2});


    // simpl("advanced machine casing", {"advanced alloy": 2, "carbon plate": 2, "steel plate": 4, "basic machine casing": 1});

    // simpl("fluid ejector upgrade", {"tin plate": 4, "electric motor": 1});
    // simpl("electric motor", {"tin item casing": 2, "iron": 1, "coil": 2});
    // simpl("coil", {"ic2 copper cable": 8, "iron": 1});
    // simpl("universal fluid cell", {"tin item casing": 4, "glass pane": 1});

    // simpl("carbon plate", {"raw carbon mesh": 1}, "Compress");


    // // thermal monitor
    // simpl("thermal monitor", { "lead plate": 7, "redstone": 1, "advanced circuit": 1});

    // // Railcraft
    // simpl("hobbyist steam engine", {"gold nugget": 3, "glass":1, "piston":1, "railcraft gold gear": 2})
    // simpl("commercial steam engine", {"iron plate": 3, "glass":1, "piston":1, "railcraft iron gear": 2})
    // simpl("industrial steam engine", {"steel plate": 3, "glass":1, "piston":1, "railcraft steel gear": 2})
    // simpl("railcraft steel gear", {"steel plate": 4, "tin gear bushing":1})
    // simpl("railcraft iron gear", {"iron plate": 4, "tin gear bushing":1})
    // simpl("tin gear bushing", {"tin plate": 4}, undefined, 2)

    // simpl("ulv hull", {"ulv casing": 1, "lead cable x1": 2});
    simpl("ulv casing", {"wrought iron plate": 8});

    // simpl("basic machine casing", {"iron plate": 8});

    simpl("diamond sawblade", {"diamond dust": 1, "cobalt brass gear": 1});

    // // Low level IC2/GT parts
    // simpl("glass fiber cable", { "glass": 6, "energium dust": 2, "silver dust": 1 });
    // simpl("item filter", { "raw carbon mesh": 4, "zinc foil": 16 }, "Assemble", undefined, warn_if_not("assembling machine", LV));

    // simpl("lapotronic energy orb", { "energy flow circuit": 2, "engraved lapotron chip": 18 }, "EV Assemble", undefined, warn_if_not("assembling machine", EV));
    // simpl("data control circuit", { "processor board": 1, "data storage chip" : 3, "molten soldering alloy": 144 }, "HV Assemble", undefined, warn_if_not("assembling machine", HV));
    // simpl("energy flow circuit", { "processor board": 1, "engraved lapotron chip" : 3, "molten soldering alloy": 144 }, "HV Assemble", undefined, warn_if_not("assembling machine", HV));

    // simpl("engraved lapotron chip", { "lapotron crystal": 1 }, "HV Laser Engrave: Blue Lens", undefined, warn_if_not("laser engraver", HV));

    // simpl("lapotron crystal", { "lazurite dust": 6, "advanced circuit": 2, "energy crystal": 1 });
    // simpl("energy crystal", { "energium dust": 9 }, "HV Autoclave", undefined, warn_if_not("autoclave", HV));
    // simpl("energium dust", { "redstone": 5, "ruby dust": 4 }, undefined, 9);

    // simpl("data storage chip", { "advanced circuit board": 1, "engraved crystal chip" : 1, "molten soldering alloy": 72 }, "MV Assemble", undefined, warn_if_not("assembling machine", MV));
    // simpl("advanced circuit", { "advanced circuit board": 1, "advanced circuit parts" : 2, "molten soldering alloy": 72 }, "MV Assemble", undefined, warn_if_not("assembling machine", MV));

    // simpl("engraved crystal chip", { "emerald plate": 1 }, "HV Laser Engrave: Green Lens", undefined, warn_if_not("laser engraver", HV));

    // simpl("processor board", { "etched ev wiring": 4, "silicon plate" : 2 }, "HV Forming Press", undefined, warn_if_not("forming press", HV));

    // simpl("advanced circuit board", { "etched hv wiring": 4, "silicon plate" : 1 }, "MV Forming Press", undefined, warn_if_not("forming press", MV));
    // simpl("advanced circuit parts", { "glowstone dust": 1, "lapis plate" : 1 }, "MV Forming Press", 2, undefined, warn_if_not("forming press", MV));

    // simpl("re battery", { "molten redstone": 288, "small battery hull": 1 }, "Fluid Canning Machine");
    // simpl("advanced re battery", { "bronze item casing": 5, "insulated copper cable": 2, "sulfur dust": 1, "lead dust": 1 })

    // simpl("small battery hull", { "insulated tin cable":1, "battery alloy plate":2 });

    // simpl("raw carbon mesh", { "raw carbon fibre": 2 });
    // simpl("raw carbon fibre", { "carbon dust": 8 }, "Wiremill", undefined, warn_if_not("wiremill", LV));

    // simpl("empty cell", { "tin plate": 2 }, "Bend: Setting 12", undefined, warn_if_not("bending machine", LV))
    // // End low level IC2/GT parts


    // // This is for "full tech"
    // simpl("good circuit", { "basic circuit": 1, "nand" : 2, "molten soldering alloy": 36 }, "Assemble", undefined, warn_if_not("assembling machine", LV));
    // if (TECH["assembling machine"] >= LV)
    // {
    //     if (TECH["forming press"] >= LV)
    //     {
    //         simpl("basic circuit", { "basic circuit board": 1, "nand" : 2, "molten soldering alloy": 36 }, "Assemble");
    //     }
    //     else
    //     {
    //         simpl("basic circuit", { "insulated copper cable": 6, "nand" : 2, "steel plate": 1 });
    //     }
    //     simpl("basic circuit board", {"silicon plate":1, "etched mv wiring": 4}, "Forming Press", undefined, warn_if_not("forming press", LV));
    //     simpl("nand", { "steel item casing": 1, "red alloy wire x1" : 1, "molten soldering alloy": 18 }, "Assemble");
    // }
    // else
    // {
    //     simpl("basic circuit", { "insulated copper cable": 6, "nand" : 2, "steel plate": 1 });
    //     simpl("basic circuit board", {"silicon plate":1, "etched mv wiring": 4}, "Forming Press", undefined, warn_if_not("forming press", LV));
    //     simpl("nand", { "steel item casing": 1, "red alloy wire x1" : 2, "tin wire x1": 1 });
    // }

    simpl("smd resistor", { "molten polyethylene": 144, "fine electrum wire":4, "carbon dust": 1}, "MV Assemble", 24, warn_if_not("assembling machine", MV))
    simpl("smd capacitor", { "molten polyethylene": 144, "polyvinylchloride foil": 16, "aluminum foil": 4}, "MV Assemble", 64, warn_if_not("assembling machine", MV))
    simpl("smd transistor", { "molten polyethylene": 288, "fine annealed copper wire": 6, "gallium plate": 1}, "MV Assemble", 32, warn_if_not("assembling machine", LV))

    if (TECH["circuit assembler"] >= EV)
    {
        simpl("basic circuit", {"basic circuit C":1}, "DO NOTHING")
        simpl("good circuit", {"good circuit C":1}, "DO NOTHING")
        simpl("advanced circuit", {"advanced circuit nanoprocessor":1}, "DO NOTHING")
        simpl("extreme circuit", {"extreme circuit nanoprocessor":1}, "DO NOTHING")
        simpl("elite circuit", {"elite circuit nanocomputer": 1}, "DO NOTHING")
        simpl("master circuit", {"master circuit mainframe": 1}, "DO NOTHING")
    }
    else if (TECH["circuit assembler"] >= HV)
    {
        simpl("elite circuit", {"elite circuit mainframe": 1}, "DO NOTHING")
        simpl("basic circuit", {"basic circuit C":1}, "DO NOTHING")
        simpl("good circuit", {"good circuit C":1}, "DO NOTHING")
        simpl("advanced circuit", {"advanced circuit C":1}, "DO NOTHING")
        simpl("extreme circuit", {"extreme circuit workstation":1}, "DO NOTHING")
    }
    else if (TECH["circuit assembler"] >= MV)
    {
        simpl("basic circuit", {"basic circuit C":1}, "DO NOTHING")
        simpl("good circuit", {"good circuit C":1}, "DO NOTHING")
        simpl("advanced circuit", {"advanced circuit C":1}, "DO NOTHING")
        simpl("extreme circuit", {"extreme circuit workstation":1}, "DO NOTHING")
    }
    else if (TECH["circuit assembler"] >= LV)
    {
        simpl("basic circuit", {"basic circuit B":1}, "DO NOTHING")
        simpl("good circuit", {"good circuit B":1}, "DO NOTHING")
        simpl("advanced circuit", {"advanced circuit B":1}, "DO NOTHING")
    }
    else
    {
        simpl("basic circuit", {"basic circuit A":1}, "DO NOTHING")
        simpl("good circuit", {"good circuit A":1}, "DO NOTHING")
    }

    simpl("master circuit mainframe", {"molten soldering alloy": 288, "smd capacitor": 24, "random access memory chip": 16, "annealed copper wire x1": 12, "elite circuit nanocomputer": 4, "small coil": 4, "aluminum frame": 1}, "EV Circuit Assemble")
    simpl("elite circuit nanocomputer", {"molten soldering alloy": 144, "smd diode": 4, "random access memory chip": 4, "fine electrum wire": 6, "extreme circuit nanoprocessor": 3, "nor memory chip": 4, "epoxy circuit board": 2}, "EV Circuit Assemble")
    simpl("extreme circuit nanoprocessor", {"molten soldering alloy": 144, "smd capacitor": 4, "random access memory chip": 4, "fine electrum wire": 6, "advanced circuit nanoprocessor": 2, "small coil": 4, "epoxy circuit board": 1}, "EV Circuit Assemble")
    simpl("advanced circuit nanoprocessor", {"molten soldering alloy": 72, "smd capacitor": 2, "smd resistor": 2, "fine electrum wire": 2, "nanocomponent cpu chip": 1, "smd transistor": 2, "epoxy circuit board": 1}, "EV Circuit Assemble")

    simpl("elite circuit mainframe", {"molten soldering alloy": 288, "capacitor A": 24, "random access memory chip": 16, "annealed copper wire x1": 12, "extreme circuit workstation": 4, "small coil": 4, "aluminum frame": 1}, "HV Circuit Assemble")

    simpl("extreme circuit workstation", { "advanced circuit C": 3, "random access memory chip": 4, "fine electrum wire": 6, "plastic circuit board": 2, "smd diode": 4, "molten soldering alloy": 144}, "MV Circuit Assemble")
    simpl("advanced circuit C", { "good circuit C": 2, "random access memory chip": 4, "fine red alloy wire": 12, "plastic circuit board": 1, "small coil": 4, "smd capacitor": 4, "molten soldering alloy": 144}, "MV Circuit Assemble")
    simpl("good circuit C", { "resistor A": 2, "central processing unit chip": 1, "fine red alloy wire": 2, "plastic circuit board": 1, "transistor A": 2, "capacitor A": 2, "molten soldering alloy": 72}, "MV Circuit Assemble")
    simpl("basic circuit C", { "resistor A": 4, "central processing unit chip": 4, "fine copper wire": 2, "plastic circuit board": 1, "transistor A":4, "capacitor A": 4, "molten soldering alloy": 72}, "MV Circuit Assemble", 4)

    if (TECH["circuit assembler"] >= LV)
    {
        simpl("advanced circuit B", { "good circuit B": 2, "transistor A": 4, "integrated logic circuit chip": 3, "random access memory chip": 1, "fine electrum wire": 16, "molten soldering alloy": 72}, "Circuit Assemble")
        simpl("good circuit B", { "basic circuit B": 3, "resistor A": 4, "phenolic circuit board": 1, "fine electrum wire": 8, "molten soldering alloy": 72}, "Circuit Assemble")
        simpl("basic circuit B", { "resistor A": 2, "integrated logic circuit chip": 1, "fine copper wire": 1, "phenolic circuit board": 1, "molten soldering alloy": 72}, "Circuit Assemble")
    }

    simpl("good circuit A", { "basic circuit A": 4, "diode": 1, "steel plate": 2, "red alloy cable x1": 2})
    simpl("basic circuit A", { "resistor": 2, "vacuum tube": 2, "red alloy cable x1": 3, "coated circuit board": 1, "steel plate": 1 })

    if (TECH["smd components"] >= LV)
    {
        simpl("resistor A", {"smd resistor": 1}, "Alias")
        simpl("capacitor A", {"smd capacitor": 1}, "Alias")
        simpl("transistor A", {"smd transistor": 1}, "Alias")
    }
    else
    {
        simpl("resistor A", {"resistor": 1}, "Alias")
        simpl("capacitor A", {"capacitor": 1}, "Alias")
        simpl("transistor A", {"transistor": 1}, "Alias")
    }

    if (TECH["assembling machine"] >= LV)
    {
        simpl("vacuum tube", { "paper": 2, "glass tube": 1, "fine copper wire": 2}, "Assemble")
        simpl("resistor", { "coal dust": 1, "fine copper wire": 4}, "Assemble", 12)
    }
    else
    {
        simpl("vacuum tube", { "paper": 2, "glass tube": 1, "fine copper wire": 3})
        simpl("resistor", { "paper": 2, "coal dust": 1, "fine copper wire": 2}, undefined, 3)
    }

    simpl("transistor", { "molten polyethylene": 144, "tin foil": 6, "silicon plate": 1}, "Assemble", 8, warn_if_not("assembling machine", LV))
    simpl("capacitor", { "polyethylene plate": 1, "aluminum foil": 2}, "MV Assemble", 2, warn_if_not("assembling machine", MV))

    simpl("glass tube", { "glass dust": 1 }, "Alloy Smelt: Ball Mold")
    simpl("diode", { "glass pane": 2, "tin wire x1": 2, "black dye or ink": 2, "tiny gallium dust": 1 }, undefined, 4)

    simpl("molten polyethylene", {"polyethylene plate": 1}, "Fluid Extractor", 144)

    // //BEGIN INTERMEDIATE VANILLA
    // simpl("iron bars", {"iron rod": 6}, undefined, 8);
    // simpl("iron axe", {"iron plate": 2, "iron": 1, "stick": 2})
    // simpl("daylight sensor", { "glass": 3, "wood slab":3, "nether quartz": 3 });
    simpl("glass pane", { "glass": 3 }, "Cutting Machine", 8, warn_if_not("cutting saw", LV));
    // simpl("bucket", { "iron plate": 3 });
    // simpl("furnace", { "cobblestone": 8 });
    // simpl("gold nugget", { "gold" : 1 }, undefined, 9);
    // //simpl("quicksilver drop", { "quicksilver" : 1.0/9 });
    // simpl("iron helmet", { "iron plate" : 5 });
    // simpl("cauldron", { "iron plate" : 7 });
    // simpl("bookshelf", { "book" : 3, "plank" : 6 });
    // simpl("book", { "paper" : 3, "leather" : 1 });
    // simpl("paper", { "sugar cane" : 3 }, undefined, 2);
    // simpl("cauldron", { "iron plate" : 7 });
    // //END VANILLA

    // simpl("etched ev wiring", { "platinum foil": 1 }, "HV Laser Engrave: Red Lens", undefined, warn_if_not("laser engraver", HV));
    // simpl("etched hv wiring", { "gold foil": 1 }, "MV Laser Engrave: Red Lens", undefined, warn_if_not("laser engraver", MV));
    // simpl("etched mv wiring", {"copper foil":1}, "Laser Engrave: Red Lens", undefined, warn_if_not("laser engraver", LV));

    simpl("diamond grinding head", {"diamond": 1, "steel plate": 4, "diamond dust": 4});

    simpl("frost proof casing", {"aluminum plate": 6, "aluminum frame":1 }, undefined, 3);
    simpl("aluminum frame", {"aluminum plate": 3, "aluminum rod": 5}, undefined, 4);

    function assoc() {
        var obj = {};
        for (var k = 0; k < arguments.length-1; k += 2) {
            obj[arguments[k]] = arguments[k+1];
        }
        return obj;
    }

    if (TECH["polarizer"] > NONE)
    {
        simpl("magnetic iron rod", {"iron rod": 1}, "Polarize");
    }
    else
    {
        simpl("magnetic iron rod", {"iron rod": 1, "redstone": 4});
    }
    simpl("magnetic steel rod", {"steel rod": 1}, "Polarize", undefined, warn_if_not("polarizer", LV));
    simpl("magnetic neodymium rod", {"neodymium rod": 1}, "Polarize", undefined, warn_if_not("polarizer", LV));

    simple_materials = ["lead", "tin", "red alloy", "zinc", "cobalt", "soldering alloy"]
    complex_materials = ["tungstensteel"]
    materials = ["aluminum", "gold", "silver", "annealed copper", "copper", "cupronickel", "tin", "lead", "red alloy", "osmium", "tungsten", "kanthal", "nichrome", "cobalt", "zinc", "electrum", "tungstensteel"];
    for (var k in materials)
    {
        var v = materials[k];
        simpl(v + " cable x8", assoc(v + " cable x4", 2));
        simpl(v + " cable x4", assoc(v + " cable x2", 2));
        simpl(v + " cable x2", assoc(v + " cable x1", 2));
        if (simple_materials.includes(v))
        {
            simpl(v + " cable x1", assoc(v + " wire x1", 1, "black carpet", 1, "string", 1));
        }
        else if (complex_materials.includes(v))
        {
            simpl(v + " cable x1", assoc(v + " wire x1", 1, "black carpet", 1, "string", 1));
        }
        else
        {
            if (TECH["rubber type"] <= LV)
            {
                simpl(v + " cable x1", assoc(v + " wire x1", 1, "molten rubber", 144), "Assemble");
            }
            else if (TECH["rubber type"] == MV)
            {
                simpl(v + " cable x1", assoc(v + " wire x1", 1, "molten styrene-butadiene rubber", 108), "Assemble");
            }
            else if (TECH["rubber type"] >= HV)
            {
                simpl(v + " cable x1", assoc(v + " wire x1", 1, "molten silicone rubber", 72), "Assemble");
            }
        }

        simpl("fine " + v + " wire", assoc(v + " wire x1", 1), "Wiremill", 4);

        simpl(v + " wire x16", assoc(v + " wire x8", 2));
        simpl(v + " wire x8", assoc(v + " wire x4", 2));
        simpl(v + " wire x4", assoc(v + " wire x2", 2));
        simpl(v + " wire x2", assoc(v + " wire x1", 2));
        if (TECH["wiremill"] > NONE)
            simpl(v + " wire x1", assoc(v, 1), "Wiremill", 2);
        else
            simpl(v + " wire x1", assoc(v + " plate", 1));
    }

    simpl("molten rubber", {"rubber sheet": 1}, "Fluid extractor", 144)
    simpl("molten styrene-butadiene rubber", {"styrene-butadiene rubber ring": 1}, "Fluid extractor", 36)
    simpl("molten silicone rubber", {"silicone rubber rod": 1}, "Fluid extractor", 72)

    // materials = ["steel", "iron", "bronze", "tin"]
    // for (var k in materials)
    // {
    //     var v = materials[k];
    //     var casing = v + " item casing";
    //     if (TECH["extruder"] >= MV)
    //     {
    //         simpl(casing, assoc(v, 1), "MV Extrude: Item Casing", 2);
    //     }
    //     else if (TECH["cutting saw"] > NONE)
    //     {
    //         simpl(casing, assoc(v + " plate", 1), "Cutting Saw", 2);
    //     }
    //     else
    //     {
    //         simpl(casing, assoc(v, 2), "Alloy Smelt: Casing Mold", 3);
    //     }
    // }

    materials = ["bronze", "iron", "tin", "steel", "stainless steel", "neodymium", "aluminum", "chrome", "titanium", "tungstensteel", "invar", "cobalt brass", "copper", "gold", "electrum", "blue steel", "magnalium"];
    for (var k in materials) {
        var v = materials[k]
        var plate = v + " plate";
        var rod = v + " rod";
        var bolt = v + " bolt";

        if (TECH["extruder"] >= MV)
        {
            simpl(v+" gear", assoc(v, 4), "MV Extrude: Gear");
            simpl("medium "+v+" pipe", assoc(v, 3), "MV Extrude: Normal Pipe");
        }
        else
        {
            simpl(v+" gear", assoc(plate, 4, rod, 4));
            simpl("medium "+v+" pipe", assoc(plate, 6), undefined, 2);
        }

        simpl(v+" rotor", assoc("curved "+plate,4,v+" screw",1,v+" ring",1));

        if (TECH["lathe"] > NONE)
            simpl(v+" screw", assoc(bolt,1), "Lathe");
        else
            simpl(v+" screw", assoc(bolt,2));

        // Bolts are hard
        if (TECH["extruder"] >= MV)
            simpl(bolt, assoc(v, 1), "MV Extrude: Bolt", 8);
        else if (TECH["cutting saw"] > NONE)
            simpl(bolt, assoc(v + " rod", 1), "Cutting Saw", 4);
        else
            simpl(bolt, assoc(rod, 1), undefined, 2);

        if (TECH["extruder"] >= MV)
        {
            simpl(v+" ring", assoc(v, 1), "MV Extrude: Ring", 4);
            simpl(rod, assoc(v,1), "MV Extrude: Rod", 2);
        }
        else
        {
            simpl(v+" ring", assoc(rod,1));

            if (TECH["lathe"] > NONE) {
                if (["invar", "iron", "bronze", "tin", "copper", "electrum", "gold"].indexOf(v) != -1)
                    simpl(rod, assoc(v,1), "Lathe Loop", 2);
                else
                    simpl(rod, assoc(v,1, "recycled small "+ v + " dust", -2), "Lathe");
            }
            else
                simpl(rod, assoc(v,1));
        }
        simpl("small "+v+" gear", assoc(plate,1));
    }

    materials = ["bronze", "iron", "tin", "steel", "stainless steel", "neodymium", "aluminum"
        , "chrome", "titanium", "invar", "cobalt brass", "copper", "gold", "red alloy", "battery alloy"
        , "thaumium", "silicon", "platinum", "lead", "zinc", "beryllium", "plutonium", "iridium"
        , "tungstensteel", "cobalt", "wrought iron", "blue steel"]
    for (var k in materials) {
        var v = materials[k]

        if (TECH["cluster mill"] > NONE)
        {
            simpl(v +" foil", assoc(v + " plate", 1), "Cluster Mill", 4);
        }
        else
        {
            simpl(v +" foil", assoc(v + " plate", 1), "Hammer+Cylinder", 2);
        }

        if (TECH["bending machine"] > NONE)
        {
            simpl("curved " +v + " plate", assoc(v+" plate",1), "Bend: 0");
            simpl(v + " plate", assoc(v,1), "Bend: 0");
        }
        else
        {
            simpl("curved " +v + " plate", assoc(v+" plate",1), "Hammer+Cylinder");
            simpl(v + " plate", assoc(v,3), "Hammer", 2);
        }
    }

    // if (TECH["compressor"] > NONE)
    // {
    //     simpl("lapis plate", {"lapis dust": 1 }, "Compress");
    //     simpl("olivine plate", { "olivine dust": 1 }, "Compress");
    // }

    // if (TECH["extruder"] > NONE)
    //     simpl("rubber plate", {"rubber": 1}, "Extrude: Plate");
    // else
    //     simpl("rubber plate", {"rubber": 2}, "Alloy Smelt: Plate Mold");

    // if (TECH["fluid extractor"] > NONE)
    // {
    //     simpl("molten redstone", {"redstone": 1}, "Fluid Extract", 144);
    // }
    // if (TECH["fluid extractor"] > NONE)
    // {
    // }
    simpl("molten soldering alloy", {"soldering alloy": 1}, "Fluid Extract", 144);

    // simpl("redstone engine", { "piston": 1, "glass": 1, "plank": 3, "wood gear": 2});
    // simpl("wood gear", {"stick": 4});

    // simpl("comparator", { "redstone torch": 3, "* quartz": 1, "stone": 3});
    // simpl("redstone torch", {"stick": 1, "redstone": 1});
    // simpl("piston", {"plank": 3, "cobblestone": 4, "redstone": 1, "iron": 1});
    // simpl("button", {"stone": 1});
    simpl("lever", {"stick": 1, "cobblestone": 1});
    simpl("chest", {"plank": 8});

    // simpl("blue steel dust", {"rose gold dust":1, "brass dust":1, "black steel dust":4, "steel dust":2}, undefined, 8);
    // simpl("black steel dust", {"nickel dust": 1, "black bronze dust": 1, "steel dust": 3}, undefined, 5);
    // simpl("black bronze dust", {"gold dust":1, "silver dust":1, "copper dust":3}, undefined, 5);
    // simpl("brass dust", { "brass":1 });
    // simpl("brass", {"zinc":1, "copper":3}, "Alloy Smelt", 4);
    // simpl("rose gold dust", {"gold dust":3, "copper dust":1}, undefined, 4);
    // simpl("red alloy", { "copper": 1, "redstone": 4 }, "Alloy Smelt");
    // simpl("cupronickel", { "copper": 1, "nickel": 1 }, "Alloy Smelt", 2);
    // simpl("kanthal", { "hot kanthal": 1 }, "Vacuum Freeze");
    // simpl("hot kanthal", { "kanthal dust": 1 }, "Electric Blast Furnace");
    // simpl("kanthal dust", { "iron dust": 1, "chrome dust": 1, "aluminum dust":1 }, undefined, 3);
    // simpl("invar", { "nickel": 1, "iron": 2 }, "Alloy Smelt", 3);
    // if (TECH["compressor"] > NONE)
    // {
    //     simpl("block of redstone", {  "redstone": 9 }, "Compress");
    //     simpl("yellorium block", {  "yellorium": 9 }, "Compress");
    // }
}

function basictech() {
    return {
        "bending machine" : techlevel.hv,
        "extruder" : techlevel.hv,
        "assembling machine" : techlevel.mv,
        "wiremill" : techlevel.hv,
        "forming press" : techlevel.mv,
        "fluid extractor" : techlevel.hv,
        "lathe" : techlevel.lv,
        "polarizer" : techlevel.hv,
        "laser engraver" : techlevel.hv,
        "cutting saw" : techlevel.hv,
        "compressor" : techlevel.hv,
        "autoclave" : techlevel.hv,
        "circuit assembler": techlevel.ev,
        "cluster mill": techlevel.lv,
        // These are more like "switches" rather than tech tiers
        "smd components": techlevel.lv,
        "polyethylene hulls": techlevel.lv,
        "rubber type": techlevel.hv,
    }
}


if (require.main === module)
{
    var tech = basictech()
    tech["bending machine"] = techlevel.lv
    tech["wiremill"] = techlevel.lv
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
