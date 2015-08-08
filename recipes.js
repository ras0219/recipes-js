var techlevel = {
    "none": 0,
    "bronze": 1,
    "lv": 2,
    "mv": 3,
    "hv": 4
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
    return function (src, dst, comment, batchsize) {
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
            cb(n, src, dst, comment, batchsize)
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
    var materials = []

    // BigReactors
    simpl("reactor controller", {"yellorium": 2, "redstone": 1, "diamond":1, "reactor casing": 4});
    simpl("reactor control rod", {"graphite":3,"yellorium":1,"redstone":1,"reactor casing":4});
    simpl("yellorium fuel rod", {"steel plate":4,"yellorium":2,"yellorium block":1,"reactor glass":2});
    simpl("reactor glass", {"reactor casing":1, "fused quartz":2});
    simpl("reactor access port", {"reactor casing":4,"chest":1,"piston":1});
    simpl("reactor coolant port", {"reactor casing":4,"bucket":1,"piston":1,"steel":2});
    simpl("reactor casing", {"steel plate": 6, "yellorium": 1, "graphite": 2}, undefined, 4);

    // IC2 nuclear fuels
    simpl("thorium fuel rod x2", {"thorium fuel rod x1": 2, "iron plate": 1});
    simpl("thorium fuel rod x1", {"thorium dust": 1, "empty fuel rod": 1});
    simpl("empty fuel rod", {"iron": 1}, "Extrude: Cell");

    //ENDER IO
    simpl("dark soularium jetplate", {"enriched soularium alloy":2,"ender crystal":1,"reinforced glider wing":2, "vibrant jetpack_104":1,"dark soularium thruster":2,"octadic capacitor pack_104":1});
    simpl("reinforced glider wing", { "enriched soularium alloy": 3, "conductive iron armor plating": 3 });
    simpl("vibrant jetpack_104", { "vibrant jetpack": 1, "dark steel armor plating": 1 });
    simpl("vibrant jetpack", { "vibrant alloy": 4, "vibrant thrusters": 2, "octadic capacitor": 1, "energetic jetpack": 1 });
    simpl("energetic jetpack", {"energetic alloy":4, "double capacitor":1, "energetic thrusters":2, "electrical steel jetpack":1});
    simpl("dark soularium thrusters", { "enriched soularium alloy": 2, "octadic capacitor": 2, "flight control unit": 1, "vibrant thrusters": 1 });
    simpl("octadic capacitor pack_104", { "electrical steel armor plating": 1, "octadic capacitor pack": 1 });
    simpl("octadic capacitor pack", {"octadic capacitor": 3, "vibrant crystal": 1, "vibrant alloy": 2,"vibrant capacitor bank":2});
    simpl("vibrant capacitor bank", {"octadic capacitor":4, "vibrant crystal":1, "iron":4});
    simpl("enriched soularium alloy", { "dark steel": 1, "soularium": 1, "pulsating crystal": 1 });

    simpl("dark soularium thruster", {"enriched soularium alloy":2,"flight control unit":1,"octadic capacitor":2,"vibrant thruster":1});
    simpl("electrical steel jetpack", { "electrical steel": 4, "basic capacitor": 1, "electrical steel thruster": 2, "conductive iron jetpack": 1 });
    simpl("conductive iron jetpack", { "conductive iron": 4, "basic capacitor": 1, "leather straps": 1, "conductive iron thruster": 2 });
    simpl("conductive iron thruster", { "basic capacitor": 2, "insulated redstone conduit": 2, "conductive iron": 2, "redstone": 1, "basic gear": 2 });
    simpl("insulated redstone conduit", { "conduit binder": 6, "redstone alloy": 3 }, undefined, 8);
    simpl("electrical steel thruster", { "electrical steel": 2, "basic capacitor": 2, "energy conduit": 2, "redstone": 1, "machine chassis": 2 });
    simpl("energetic thrusters", {"redstone alloy":1, "pulsating crystal":2,"double-layer capacitor":2,"enhanced energy conduit":2,"energetic alloy":2,});

    simpl("pulsating crystal", { "pulsating iron nugget": 8, "diamond": 1 });
    simpl("pulsating iron nugget", { "pulsating iron":1 }, undefined, 9);
    simpl("pulsating iron", { "iron":1,"ender pearl":1 });

    simpl("advanced photovoltaic cell", { "daylight sensor": 1, "double capacitor": 2, "enlightened fused quartz": 2, "vibrant alloy": 2, "pulsating iron": 2 });
    simpl("pulsating iron", { "iron": 1, "ender pearl": 1 });
    simpl("vibrant crystal", {"emerald":1,"vibrant alloy nugget":8});

    simpl("energy conduit", { "conduit binder": 6, "conductive iron": 3 }, undefined, 8);
    simpl("enlightened fused quartz", { "fused quartz": 4, "glowstone": 4 });
    simpl("fused quartz", { "nether quartz": 4 });

    simpl("machine chassis", {"basic capacitor":1,"iron":4,"iron bars":4});
    simpl("octadic capacitor", { "vibrant alloy": 2, "glowstone": 1, "double capacitor": 2 });
    simpl("vibrant alloy nugget", { "vibrant alloy": 1 }, undefined, 9);
    simpl("vibrant alloy", { "energetic alloy": 1, "ender pearl": 1 });
    simpl("double capacitor", { "basic capacitor": 2, "coal dust": 1, "energetic alloy": 6 });
    simpl("basic capacitor", { "redstone": 2, "gold": 4, "red alloy": 1 });
    simpl("energetic alloy", {"gold":1, "redstone":1, "glowstone dust":1});

    simpl("dark steel armor plating", { "dark steel": 10, "electrical steel armor plating": 1 });
    simpl("dark steel", { "iron": 1, "coal dust": 1, "obsidian": 1 });
    simpl("soularium", { "soul sand": 1, "gold ingot": 1 });

    simpl("electrical steel armor plating", { "electrical steel": 10, "conductive iron armor plating": 1 });
    simpl("conductive iron armor plating", { "conductive iron": 10, "silicon armor plating": 1 });
    simpl("silicon armor plating", { "silicon": 5, "iron": 4 });
    simpl("conductive iron", { "redstone": 1, "iron": 1 });
    simpl("electrical steel", { "iron": 1, "coal dust": 1, "silicon": 1 });
    simpl("basic gear", { "cobblestone": 4, "stick": 4 });
    simpl("redstone alloy", {"redstone":1,"silicon":1});
    //END ENDERIO

    //GENDUSTRY
    simpl("dna extractor", { "aluminum gear": 4, "genetics processor": 2, "mutagen tank": 1, "power module": 1, "hv hull": 1 });
    simpl("protein liquifier", {"aluminum gear":5,"aluminum":1,"mutagen tank":1,"power module":1,"hv hull":1});
    simpl("genetic replicator", { "aluminum gear": 4, "genetics processor": 2, "power module": 2, "hv hull": 1 });
    simpl("genetic sampler", {"bronze gear":4, "genetics processor":1,"diamond":1,"bee receptacle":1, "sturdy casing":1,"power module":1});
    simpl("genetic transposer", { "hv hull": 1, "aluminum gear": 2, "power module": 1, "mutagen tank": 1, "genetics processor": 2, "small bronze fluid pipe": 2});
    simpl("imprinter", { "aluminum gear": 4, "genetics processor": 1, "power module": 1, "hv hull": 1, "bee receptacle": 2 });

    simpl("industrial apiary", { "aluminum gear": 2, "power module": 2, "hv hull": 1, "bee receptacle": 1, "genetics processor": 1, "swarmer": 2 });
    simpl("swarmer", { "gold": 2, "diamantine electron tube": 4, "alveary": 1 });
    simpl("diamantine electron tube", {"redstone":0.5, "molten glass":0.25,"diamond":1.25});
    simpl("mutagen producer", {"aluminum plate":2, "aluminum gear":2,"hv hull":1, "small bronze fluid pipe":1, "power module":2,"mutagen tank":1 });
    simpl("mutatron", { "aluminum gear": 2, "hv hull": 1, "bee receptacle": 3, "mutagen tank": 1, "power module": 1, "genetics processor": 1 })

    simpl("mutagen tank", { "aluminum plate": 6, "glass pane": 3 });

    simpl("power module", { "aluminum gear": 4, "gold": 2, "nand": 2, "block of redstone": 1 });
    simpl("bee receptacle", { "aluminum": 5, "block of redstone":2, "glass pane":1, "weighted pressure plate(light)":1 });
    simpl("weighted pressure plate(light)", { "gold plate": 2 });
    simpl("genetics processor", { "nether quartz": 4, "diamond":4, "pulsating chipset":1 });
    //END GENDUSTRY

    // Compressed air cell
    if (TECH["compressor"] > NONE)
        simpl("compressed air cell", { "empty cell": 1}, "Compress");

    //THAUMCRAFT
    simpl("mystical construct", { "runic matrix": 1, "arcane stone block": 4, "arcane stone bricks": 4, "arcane pedestal": 1,
        "ignis vis": 25, "terra vis": 25, "ordo vis": 25,
        "aer vis": 25, "perditio vis": 25, "aqua vis": 25
        }, "multiblock structure");
    simpl("runic matrix", { "* shard": 4, "ender pearl": 1, "arcane stone block": 4, "ordo vis": 40 }, "arcane");
    simpl("arcane pedestal", { "arcane stone block":7, "aer vis": 5 }, "arcane", 2);
    simpl("alchemical furnace", { "crucible": 1, "furnace": 1, "arcane stone block":7, "ignis vis": 5, "aqua vis": 5 }, "arcane");
    simpl("alchemical centrifuge", { "piston": 1, "essentia tube":2, "alchemical construct": 1, "arcane alembic": 1, "ordo vis":5, "aqua vis":5, "perditio vis":5 }, "arcane");
    simpl("alchemical construct", { "vis filter": 2, "essentia valve":2, "essentia tube":4, "greatwood planks": 1, "ordo vis":5, "aqua vis":5 }, "arcane");
    simpl("essentia buffer", { "essentia valve": 1, "essentia tube": 2, "restricted essentia tube":1, "glass phial":4, "ordo vis":5, "aqua vis":5 }, "arcane");
    simpl("essentia valve", { "essentia tube": 1, "lever": 1, "ordo vis":5, "aqua vis":5 }, "arcane");
    simpl("restricted essentia tube", { "essentia tube": 1, "stone": 1, "terra vis":16, "aqua vis":5 }, "arcane");
    simpl("essentia tube", { "glass": 1, "iron": 2, "gold nugget":1, "quicksilver drop": 1, "ordo vis":1, "aqua vis":1 }, "arcane", 8);
    simpl("arcane alembic", { "bucket": 1, "iron":5, "gold":1, "vis filter": 1, "aer vis": 5, "aqua vis": 5 }, "arcane");
    simpl("vis filter", { "silverwood planks": 1, "gold":2, "ordo vis": 5, "aqua vis": 5 }, "arcane", 2);
    simpl("arcane stone bricks", { "arcane stone block": 1 });
    simpl("arcane stone block", { "stone": 8, "* shard":1, "ignis vis": 1, "terra vis": 1 }, "arcane", 9);
    simpl("crucible", { "cauldron": 1 }, "wand");
    simpl("golem core chop", { "golem core harvest": 1, "iron axe": 3, "axe of the stream": 1, "meto essentia": 16, "instrumentum essentia": 16, "arbor essentia": 16 }, "infusion");
    simpl("stone golem", { "stone bricks": 1, "humanus essentia": 4, "motus essentia": 4, "spiritus essentia": 4 }, "crucible");
    simpl("golem core harvest", { "golem animation core": 1, "meto essentia": 5, "messis essentia": 5 }, "crucible");
    simpl("golem animation core", { "brick": 4, "nitor": 1, "ordo vis": 5, "ignis vis": 5 }, "arcane");
    simpl("nitor", { "glowstone": 1, "ignis essentia": 3, "lux essentia": 3, "potentia essentia": 3 }, "crucible");
    simpl("boots of the traveler", { "air shard": 2, "raw fish": 1, "feather": 1, "leather boots": 1, "enchanted fabric": 2, "iter essentia": 25, "volatus essentia":25}, "infusion")
    simpl("enchanted fabric", { "wool": 1, "string": 4,
        "ignis vis": 1, "ordo vis": 1, "aqua vis": 1,
        "aer vis": 1, "terra vis": 1, "perditio vis": 1
        }, "arcane")
    simpl("axe of the stream", { "greatwood": 1, "thaumium axe": 1, "water shard": 2, "diamond": 1, "aqua essentia": 16, "arbor essentia": 8 }, "infusion")
    simpl("thaumium axe", {"thaumium plate": 2, "thaumium": 1, "stick": 2})
    //END THAUMCRAFT

    simpl("electric blast furnace multi", { "electric blast furnace": 1, "cupronickel coil block": 16, "lv input bus": 1, "lv output bus":1,
        "maintenance hatch":1,
        "lv muffler hatch":1,
        "lv energy hatch":3,
        "heat proof casing":10
        });
    simpl("implosion compressor multi", {"implosion compressor":1, "lv energy hatch":1, "lv input bus":1, "lv output bus":1, "maintenance hatch":1,"lv muffler hatch":1, "solid steel casing":20});

    simpl("implosion compressor", { "obsidian":3,"solid steel casing":1,"aluminium cable":2,"advanced circuit":2 });
    simpl("lv muffler hatch", { "lv hull": 1, "steel fluid pipe": 1 });

    simpl("solid steel casing", { "steel plate": 6, "steel frame box": 1 });
    simpl("steel frame box", { "steel rod":4 });

    simpl("electric blast furnace", { "heat proof casing": 1, "basic circuit": 3, "tin cable x1": 2, "furnace": 3});
    simpl("cupronickel coil block", { "cupronickel wire x2": 8 })

    simpl("heat proof casing", { "invar plate": 6, "invar frame box": 1 });
    if (TECH["assembling machine"] > NONE)
        simpl("invar frame box", { "invar rod": 4 }, "LV Assemble: Setting 4");
    else
        simpl("invar frame box", { "invar rod": 8 }, undefined, 2);

    simpl("electric jetpack", { "advanced circuit": 1, "iron item casing": 4, "glowstone": 2, "batbox": 1 });
    simpl("batbox", {"plank":5,"insulated tin cable":1,"re battery":3});
    simpl("maintenance hatch", {"lv hull":1});

    simpl("ev macerator", { "aluminum cable x1": 3, "ev hull": 1, "data control circuit": 2, "ev piston": 1, "ev motor": 1, "diamond grinding head":1 });

    simpl("vacuum freezer", { "frost proof casing": 1, "hv pump": 3, "gold cable x1": 2, "data control circuit": 3 });

    // OpenComputers
    simpl("opencomputer tier 1 multi", {
        "computer case tier 1":1,
        "cpu tier 1":1,
        "graphics card tier 1":1,
        "memory tier 1":2,
        "hard disk drive tier 1":1,
        "redstone card tier 1":1,
        "screen tier 1":1,
        "keyboard":1,
        "capacitor":1,
        "power converter":1,
        "disk drive":1,
        "floppy disk":2,
    });

    simpl("floppy disk", { "disk platter": 1, "aluminum plate": 2, "lever": 1, "aluminum screw": 4 });

    simpl("capacitor", { "cesu": 1, "lv casing": 2, "printed circuit board": 2, "transistor": 1 });
    simpl("power converter", { "microchip tier 2": 1, "aluminum plate": 2, "printed circuit board": 2, "ic2 mv transformer": 1 });

    simpl("hard disk drive tier 1", { "disk platter": 2, "memory tier 1": 4, "microchip tier 2": 1, "aluminum screw": 1 });
    simpl("disk platter", { "aluminum plate": 4 });

    simpl("component bus tier 1", { "iron nugget": 4, "redstone": 1, "microchip tier 1": 1, "printed circuit board": 1, "control unit": 1 });
    simpl("screen tier 1", { "aluminum plate": 4, "redstone": 1, "transistor": 1, "glass pane": 1 });
    simpl("cpu tier 1", { "control unit": 1, "arithmetic logic unit": 1, "microchip tier 2": 2, "aluminum screw": 2, "aluminum plate": 2 });

    simpl("redstone card tier 1", { "card base": 1, "redstone torch": 1, "microchip tier 1": 1 });
    simpl("graphics card tier 1", { "card base": 1, "arithmetic logic unit": 1, "microchip tier 1": 1, "memory tier 1": 1 });
    simpl("card base", { "printed circuit board": 2, "iron rod": 2, "microchip tier 2": 1, "transistor": 1, "gold nugget": 2 });
    simpl("computer case tier 1", { "printed circuit board": 1, "aluminum screw": 2, "microchip tier 1": 1, "component heat vent": 2, "lv casing": 1 });

    simpl("disk drive", { "piston": 1, "glass lens": 1, "microchip tier 2": 3, "lv casing": 1 });
    simpl("keyboard", { "button group": 4, "arrow keys": 1, "numeric keypad": 1 });
    simpl("button group", { "button": 6 });
    simpl("numeric keypad", { "button": 9 });
    simpl("arrow keys", { "button": 4 });
    if (TECH["assembling machine"] > NONE)
    {
        simpl("control unit", { "transistor": 6, "data control circuit": 1 }, "LV Assemble", 3);
        simpl("arithmetic logic unit", { "microchip tier 1": 1, "comparator": 3 }, "LV Assemble");
        simpl("memory tier 1", { "microchip tier 1": 3, "printed circuit board": 3 }, "LV Assemble");
        simpl("microchip tier 2", { "advanced circuit": 1, "transistor": 8 }, "LV Assemble", 4);
        simpl("microchip tier 1", { "basic circuit": 1, "transistor": 4 }, "LV Assemble", 4);
        simpl("transistor", { "redstone": 1, "iron rod": 3 }, "LV Assemble", 6);
    }
    simpl("printed circuit board", { "circuit board": 1, "tiny gold dust": 2, "sulfuric acid cell": 1 });
    simpl("circuit board", { "raw circuit board": 1 }, "Smelt");
    simpl("raw circuit board", { "clay block": 1, "cactus green": 1 }, "Cutting Wire");
    // End OpenComputers

    // IC2 nuclear
    simpl("nuclear reactor", {"dense lead plate": 4, "reactor chamber": 3, "generator": 1, "advanced circuit": 1});
    simpl("reactor chamber", {"lead plate": 4, "basic machine casing": 1});
    simpl("component heat vent", {"heat vent": 1, "tin plate": 4, "iron bars": 4});
    simpl("heat vent", {"aluminum plate": 4, "iron bars": 4});

    // dense plates
    if (TECH["bending machine"] >= MV)
        simpl("dense lead plate", {"lead": 9}, "MV Bend: Setting 9");

    // LV tools
    simpl("lv wrench", { "* wrench tip":1, "lv motor":1, "stainless steel plate":2, "small stainless steel gear":2,"stainless steel screw":1, "small * battery":1 });

    var tiermats = {
        lv: {
            cable: "tin cable x1",
            circuit: "basic circuit",
            rarewire: "gold wire x1",
            heatwire4: "copper wire x4",
            pipe: "bronze fluid pipe",
            lathediamond: "diamond",
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
            cable: "copper cable x1",
            circuit: "good circuit",
            rarewire: "silver wire x1",
            heatwire4: "cupronickel wire x4",
            pipe: "steel fluid pipe",
            lathediamond: "industrial diamond",
            grinding: "industrial diamond",
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
            cable: "gold cable x1",
            circuit: "advanced circuit",
            rarewire: "electrum wire x1",
            heatwire4: "kanthal wire x4",
            pipe: "stainless steel fluid pipe",
            lathediamond: "industrial diamond",
            grinding: "diamond grinding head",
            rotor: "steel rotor",
            screw: "steel screw",
            gear: "stainless steel gear",
            smallgear: "small stainless steel gear",
            rod: "stainless steel rod",
            magrod: "magnetic steel rod",
            plate: "stainless steel plate",
            motorwire: "copper wire x4",
        }
    };
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

        simpl(k+" fluid canner", assoc(v.cable, 2, v.hull, 1, v.pump, 2, v.circuit, 2, "glass", 2));
        simpl(k+" canning machine", assoc(v.cable, 2, v.hull, 1, v.pump, 1, v.circuit, 2, "glass", 3));
        simpl(k+" assembling machine", assoc(v.cable, 2, v.hull, 1, v.circuit, 2, v.conveyor, 2, v.robotarm, 2));
        simpl(k+" fluid extractor", assoc(v.cable, 2, v.hull, 1, v.piston, 1, v.pump, 1, v.circuit, 2, "glass", 2));
        simpl(k+" electrolyzer", assoc(v.rarewire, 4, v.hull, 1, v.cable, 1, v.circuit, 2, "glass", 1));
        simpl(k+" extruder", assoc(v.heatwire4, 4, v.hull, 1, v.piston, 2, v.circuit, 2, v.pipe, 1));
        simpl(k+" scanner", assoc(v.cable, 2, v.hull, 1, v.emitter, 1, v.circuit, 4, v.sensor, 1));
        simpl(k+" bending machine", assoc(v.cable, 2, v.hull, 1, v.piston, 2, v.motor, 2, v.circuit, 2));
        simpl(k+" lathe", assoc(v.cable, 3, v.hull, 1, v.piston, 1, v.motor, 1, v.circuit, 2, v.lathediamond, 1));
        simpl(k+" wiremill", assoc(v.cable, 2, v.hull, 1, v.motor, 4, v.circuit, 2));
        simpl(k+" steam turbine", assoc(v.cable, 1, v.hull, 1, v.rotor, 2, v.motor, 2, v.circuit, 1, v.pipe, 2));
        simpl(k+" centrifuge", assoc(v.cable, 2, v.hull, 1, v.motor, 2, v.circuit, 4));
        simpl(k+" extractor", assoc(v.cable, 2, v.hull, 1, v.piston, 1, v.pump, 1, v.circuit, 2, "glass", 2));
        simpl(k+" macerator", assoc(v.cable, 3, v.hull, 1, v.piston, 1, v.motor, 1, v.circuit, 2, v.grinding, 1));
        simpl(k+" ore washing plant", assoc(v.cable, 2, v.hull, 1, v.motor, 1, v.rotor, 2, v.circuit, 2, "glass", 1));

        simpl(k+" distillery", assoc("blaze rod", 1, "glass", 2, v.cable, 2, v.hull, 1, v.pump, 1, v.circuit, 2));

        simpl(k+" packager", assoc(v.cable, 2, v.hull, 1, v.circuit, 2, v.conveyor, 1, v.robotarm, 1, "chest", 2));
        simpl(k+" forming press", assoc(v.cable, 4, v.hull, 1, v.piston, 2, v.circuit, 2));
        simpl(k+" diesel generator", assoc(v.cable, 1, v.hull, 1, v.motor, 2, v.piston, 2, v.circuit, 1, v.gear, 2));
        simpl(k+" chemical reactor", assoc(v.cable, 2, v.hull, 1, v.motor, 1, v.rotor, 1, v.circuit, 2, "glass", 2));
        simpl(k+" chemical bath", assoc(v.cable, 1, v.hull, 1, v.conveyor, 1, v.pump, 1, v.circuit, 2, "glass", 2));
        simpl(k+" cutting machine", assoc(v.cable, 2, v.hull, 1, v.conveyor, 1, v.motor, 1, v.circuit, 2, "glass", 1, "diamond sawblade", 1));
        simpl(k+" compressor", assoc(v.cable, 2, v.hull, 1, v.piston, 2, v.circuit, 2));
        simpl(k+" gas turbine", assoc(v.cable, 1, v.hull, 1, v.motor, 2, v.rotor, 3, v.circuit, 2));
        simpl(k+" laser engraver", assoc(v.cable, 2, v.hull, 1, v.piston, 2, v.emitter, 1, v.circuit, 3));

        simpl(k+" sifting machine", assoc(v.cable, 2, v.hull, 1, v.piston, 2, "item filter", 2, v.circuit, 2));
        simpl(k+" autoclave", assoc(v.hull, 1, v.pump, 1, "glass", 1, v.circuit, 2, v.plate, 4));

        simpl(k+" energy hatch", assoc(v.cable, 1, v.hull, 1));
        simpl(k+" input bus", assoc(v.cable, 1, "chest", 1));
        simpl(k+" output bus", assoc(v.cable, 1, "chest", 1));

/*        simpl("ev hull", { "aluminum cable x1": 2, "ev casing": 1 });
        simpl("ev casing", { "titanium plate": 8 });
        simpl("ev robot arm", { "titanium rod": 2, "ev piston": 1, "ev motor": 2, "aluminum cable x1": 3, "data control circuit": 1 });
        simpl("ev conveyor", { "aluminum cable x1": 1, "rubber plate": 6, "ev motor": 2 });
        simpl("ev pump", { "stainless steel rotor": 1, "stainless steel screw": 1, "aluminum cable x1": 1, "rubber ring": 2, "titanium fluid pipe": 1, "ev motor": 1 });
        simpl("ev piston", { "titanium rod": 2, "ev motor": 1, "aluminum cable x1": 2, "titanium plate": 3, "small titanium gear": 1 });
        simpl("ev motor", { "titanium rod": 2, "magnetic neodynium rod": 1, "aluminum cable x1": 2, "annealed copper wire x8": 4 });
*/
        simpl(v.hull, assoc(v.cable, 2, v.casing, 1));
        simpl(v.casing, assoc(v.plate, 8));
        simpl(v.robotarm, assoc(v.rod, 2, v.piston, 1, v.motor, 2, v.cable, 3, v.circuit, 1));
        simpl(v.conveyor, assoc("rubber plate", 6, v.motor, 2, v.cable, 1));
        simpl(v.pump, assoc(v.rotor, 1, v.screw, 1, v.cable, 1, "rubber ring", 2, v.pipe, 1, v.motor, 1));
        simpl(v.piston, assoc(v.rod, 2, v.motor, 1, v.cable, 2, v.plate, 3, v.smallgear, 1));
        if (k == "lv")
            simpl("lv motor", {"iron rod": 2, "magnetic iron rod":1, "tin cable x1": 2, "copper wire x1": 4});
        else
            simpl(v.motor, assoc(v.rod, 2, v.magrod, 1, v.cable, 2, v.motorwire, 4));
    }

    simpl("lv polarizer", { "iron rod": 2, "lv hull": 1, "tin cable x1":2, "tin wire x2":4 });

    // IC2 machines
    simpl("reactor pressure vessel multi", {"reactor pressure vessel": 94, "reactor redstone port": 1, "reactor access hatch": 1, "reactor fluid port": 2}, "Multiblock");
    simpl("reactor redstone port", {"reactor pressure vessel": 8, "redstone": 1});
    simpl("reactor access hatch", {"reactor pressure vessel": 8, "trapdoor": 1});
    simpl("reactor fluid port", {"reactor pressure vessel": 8, "universal fluid cell": 1});
    simpl("reactor pressure vessel", {"lead plate": 5, "stone": 4}, undefined, 4);

    simpl("liquid heat exchanger", { "empty cell": 2, "glass": 4, "iron item casing": 2, "heat conductor": 1});
    simpl("ic2 stirling generator", {"iron item casing": 7, "generator": 1, "heat conductor": 1});
    simpl("heat conductor", { "rubber": 6, "copper plate": 3});
    simpl("generator", {"re battery": 1, "basic machine casing": 1, "furnace": 1});
    simpl("cesu", {"bronze plate": 5, "insulated copper cable": 1, "advanced re battery": 3});

    simpl("ic2 mv transformer", {"basic machine casing": 1, "insulated copper cable": 2});

    simpl("fluid ejector upgrade", {"tin plate": 4, "electric motor": 1});
    simpl("electric motor", {"tin item casing": 2, "iron": 1, "coil": 2});
    simpl("coil", {"ic2 copper cable": 8, "iron": 1});
    simpl("universal fluid cell", {"tin item casing": 4, "glass pane": 1});

    // thermal monitor
    simpl("thermal monitor", { "lead plate": 7, "redstone": 1, "advanced circuit": 1});

    // Railcraft
    simpl("hobbyist steam engine", {"gold nugget": 3, "glass":1, "piston":1, "railcraft gold gear": 2})
    simpl("commercial steam engine", {"iron plate": 3, "glass":1, "piston":1, "railcraft iron gear": 2})
    simpl("industrial steam engine", {"steel plate": 3, "glass":1, "piston":1, "railcraft steel gear": 2})
    simpl("railcraft steel gear", {"steel plate": 4, "tin gear bushing":1})
    simpl("railcraft iron gear", {"iron plate": 4, "tin gear bushing":1})
    simpl("tin gear bushing", {"tin plate": 4}, undefined, 2)

    // GT stuff
    simpl("mv battery buffer x16", {"copper wire x16": 4, "mv hull": 1, "chest": 1});
    simpl("mv battery buffer x9", {"copper wire x8": 4, "mv hull": 1, "chest": 1});
    simpl("mv battery buffer x4", {"copper wire x4": 4, "mv hull": 1, "chest": 1});
    simpl("mv battery buffer x1", {"copper wire x1": 4, "mv hull": 1, "chest": 1});

    simpl("lv battery buffer x16", {"tin wire x16": 4, "lv hull": 1, "chest": 1});
    simpl("lv battery buffer x9", {"tin wire x8": 4, "lv hull": 1, "chest": 1});
    simpl("lv battery buffer x4", {"tin wire x4": 4, "lv hull": 1, "chest": 1});
    simpl("lv battery buffer x1", {"tin wire x1": 4, "lv hull": 1, "chest": 1});

    simpl("ulv input bus", { "ulv hull": 1, "chest": 1 });
    simpl("ulv output bus", { "ulv hull": 1, "chest": 1 });

    simpl("hv emitter", { "chrome rod": 4, "advanced circuit": 2, "emerald": 1, "gold cable x1": 2 });
    simpl("mv emitter", { "electrum rod": 4, "good circuit": 2, "nether quartz": 1, "copper cable x1": 2 });
    simpl("lv sensor", { "brass rod": 1, "basic circuit": 1, "quartzite": 1, "steel plate": 4 });
    simpl("lv emitter", { "brass rod": 4, "basic circuit": 2, "quartzite": 1, "tin cable x1": 2 });

    simpl("ulv hull", {"ulv casing": 1, "lead cable x1": 2});
    simpl("ulv casing", {"steel plate": 4});

    simpl("basic machine casing", {"iron plate": 8});

    simpl("diamond sawblade", {"diamond dust": 1, "cobalt brass gear": 1});

    //BEGIN INTERMEDIATE VANILLA
    simpl("iron axe", {"iron plate": 2, "iron": 1, "stick": 2})
    simpl("daylight sensor", { "glass": 3, "wood slab":3, "nether quartz": 3 });
    simpl("glass pane", { "glass": 6 }, undefined, 16);
    simpl("bucket", { "iron plate": 3 });
    simpl("furnace", { "cobblestone": 8 });
    simpl("gold nugget", { "gold" : 1 }, undefined, 9);
    //simpl("quicksilver drop", { "quicksilver" : 1.0/9 });
    simpl("cauldron", { "iron plate" : 7 });
    simpl("bookshelf", { "book" : 3, "plank" : 6 });
    simpl("book", { "paper" : 3, "leather" : 1 });
    simpl("paper", { "sugar cane" : 3 }, undefined, 2);
    simpl("cauldron", { "iron plate" : 7 });
    //END VANILLA

    // Low level IC2/GT parts
    if (TECH["assembling machine"] >= LV)
    {
        simpl("item filter", { "raw carbon mesh": 4, "zinc foil": 16 }, "LV Assemble");
    }
    if (TECH["assembling machine"] >= HV)
        simpl("data control circuit", { "processor board": 1, "data storage chip" : 3, "molten soldering alloy": 144 }, "HV Assemble");

    if (TECH["assembling machine"] >= MV)
    {
        simpl("data storage chip", { "advanced circuit board": 1, "engraved crystal chip" : 1, "molten soldering alloy": 72 }, "MV Assemble");
        simpl("advanced circuit", { "advanced circuit board": 1, "advanced circuit parts" : 2, "molten soldering alloy": 72 }, "MV Assemble");
    }

    if (TECH["laser engraver"] >= HV)
        simpl("engraved crystal chip", { "olivine plate": 1 }, "HV Laser Engrave: Green Lens");

    if (TECH["forming press"] >= HV)
        simpl("processor board", { "etched ev wiring": 4, "silicon plate" : 2 }, "MV Forming Press");

    if (TECH["forming press"] >= MV)
    {
        simpl("advanced circuit board", { "etched hv wiring": 4, "silicon plate" : 1 }, "MV Forming Press");
        simpl("advanced circuit parts", { "glowstone": 1, "lapis plate" : 1 }, "MV Forming Press", 2);
    }

    simpl("re battery", { "molten redstone": 288, "small battery hull": 1 }, "Fluid Canning Machine");
    simpl("advanced re battery", { "bronze item casing": 5, "insulated copper cable": 2, "sulfur dust": 1, "lead dust": 1 })

    simpl("small battery hull", { "insulated tin cable":1, "battery alloy plate":2 });

    simpl("raw carbon mesh", { "raw carbon fibre": 2 });
    if (TECH["wiremill"] > NONE)
    {
        simpl("raw carbon fibre", { "carbon dust": 8 }, "Wiremill");
    }

    if (TECH["bending machine"] > NONE)
        simpl("empty cell", { "tin plate": 2 }, "Bend: Setting 12")
    // End low level IC2/GT parts


    // This is for "full tech"
    if (TECH["assembling machine"] >= LV)
    {
        simpl("good circuit", { "basic circuit": 1, "nand" : 2, "molten soldering alloy": 36 }, "LV Assemble");
        if (TECH["forming press"] >= LV)
        {
            simpl("basic circuit", { "basic circuit board": 1, "nand" : 2, "molten soldering alloy": 36 }, "LV Assemble");
        }
        else
        {
            simpl("basic circuit", { "insulated copper cable": 6, "nand" : 2, "steel plate": 1 });
        }
        simpl("nand", { "steel item casing": 1, "red alloy wire x1" : 1, "molten soldering alloy": 18 }, "LV Assemble");
    }
    else
    {
        simpl("basic circuit", { "insulated copper cable": 6, "nand" : 2, "steel plate": 1 });
        simpl("nand", { "steel item casing": 1, "red alloy wire x1" : 2, "tin wire x1": 1 });
    }

    if (TECH["forming press"] >= LV)
    {
        simpl("basic circuit board", {"silicon plate":1, "etched mv wiring": 4}, "LV Forming Press");
    }

    if (TECH["laser engraver"] >= MV)
    {
        simpl("etched ev wiring", { "platinum foil": 1 }, "MV Laser Engrave: Red Lens");
    }

    if (TECH["laser engraver"] >= LV)
    {
        simpl("etched hv wiring", { "gold foil": 1 }, "LV Laser Engrave: Red Lens");
        simpl("etched mv wiring", {"copper foil":1}, "LV Laser Engrave: Red Lens");
    }

    simpl("diamond grinding head", {"industrial diamond": 1, "steel plate": 4, "diamond dust": 4});

    simpl("frost proof casing", {"aluminum plate": 6, "aluminum frame box":1 });
    simpl("aluminum frame box", {"aluminum rod": 4});

    if (TECH["extruder"] >= LV)
        simpl("rubber ring", {"rubber": 1 }, "LV Extrude: Ring", 4);
    else
        simpl("rubber ring", {"rubber sheet": 1 });

    function assoc() {
    	var obj = {};
    	for (var k = 0; k < arguments.length-1; k += 2) {
    		obj[arguments[k]] = arguments[k+1];
    	}
    	return obj;
    }

    if (TECH["polarizer"] > NONE)
    {
        materials = ["iron", "steel"];
        for (var k in materials) {
            var v = materials[k];
            simpl("magnetic "+v+" rod", assoc(v+" rod", 1), "LV Polarize");
        }
        if (TECH["polarizer"] >= HV)
            simpl("magnetic neodynium rod", {"neodynium rod": 1}, "HV Polarize");
    }
    else
    {
        simpl("magnetic iron rod", {"iron rod": 1, "redstone": 4});
    }
    simpl("insulated copper cable", { "ic2 copper cable": 1, "rubber": 1 });
    simpl("insulated tin cable", { "ic2 tin cable": 1, "rubber": 1 });

    if (TECH["Wiremill"] > NONE)
    {
        simpl("ic2 copper cable", { "copper plate": 1 }, "LV Wiremill", 3);
        simpl("ic2 tin cable", { "tin plate": 1 }, "LV Wiremill", 4);
    }
    else
    {
        simpl("ic2 copper cable", { "copper plate": 1 }, undefined, 2);
        simpl("ic2 tin cable", { "tin plate": 1 }, undefined, 3);
    }

    simpl("cupronickel coil", { "cupronickel wire x8": 2 });

    materials = ["aluminum", "gold", "silver", "annealed copper", "copper", "cupronickel", "tin", "lead", "red alloy", "cupronickel"]
    for (var k in materials)
    {
        var v = materials[k];
        simpl(v + " cable x8", assoc(v + " wire x8", 1, "rubber plate", 3));
        simpl(v + " cable x4", assoc(v + " wire x4", 1, "rubber plate", 2));
        simpl(v + " cable x2", assoc(v + " wire x2", 1, "rubber plate", 1));
        simpl(v + " cable x1", assoc(v + " wire x1", 1, "rubber plate", 1));

        simpl(v + " wire x16", assoc(v + " wire x8", 2));
        simpl(v + " wire x8", assoc(v + " wire x4", 2));
        simpl(v + " wire x4", assoc(v + " wire x2", 2));
        simpl(v + " wire x2", assoc(v + " wire x1", 2));
        if (TECH["wiremill"] > NONE)
            simpl(v + " wire x1", assoc(v, 1), "LV Wiremill", 2);
        else
            simpl(v + " wire x1", assoc(v + " plate", 1));
    }

    materials = ["steel", "iron", "bronze", "tin"]
    for (var k in materials)
    {
        var v = materials[k];
        var casing = v + " item casing";
        if (TECH["extruder"] >= MV)
        {
            simpl(casing, assoc(v, 1), "MV Extrude: Item Casing", 2);
        }
        else if (TECH["cutting saw"] > NONE)
        {
            simpl(casing, assoc(v + " plate", 1), "Cutting Saw", 2);
        }
        else if (TECH["casing mold"] > NONE)
        {
            simpl(casing, assoc(v, 2), "Alloy Smelt: Casing Mold", 3);
        }
    }

    materials = ["bronze", "iron", "tin", "steel", "stainless steel", "neodynium", "aluminum", "chrome", "titanium", "invar", "cobalt brass", "copper", "gold", "electrum"];
    for (var k in materials) {
        var v = materials[k]
        var plate = v + " plate";
        var rod = v + " rod";
        var bolt = v + " bolt";

        if (TECH["extruder"] >= MV)
        {
            simpl(v+" gear", assoc(v, 4), "MV Extrude: Gear");
            simpl(v+" fluid pipe", assoc(v, 3), "MV Extrude: Normal Pipe");
        }
        else
        {
            simpl(v+" gear", assoc(plate, 4, rod, 4));
            simpl(v+" fluid pipe", assoc(plate, 6), undefined, 2);
        }

        simpl(v+" rotor", assoc(plate,4,v+" screw",1,v+" ring",1));

        if (TECH["lathe"] > NONE)
            simpl(v+" screw", assoc(bolt,1), "Lathe");
        else
            simpl(v+" screw", assoc(bolt,2));

        // Bolts are hard
        if (TECH["cutting saw"] > NONE)
            simpl(bolt, assoc(v + " rod", 1), "Cutting Saw", 4);
        else if (TECH["extruder"] >= MV)
            simpl(bolt, assoc(v, 1), "MV Extrude: Bolt", 8);
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
                    simpl(rod, assoc(v,1), "LV Lathe Loop", 2);
                else
                    simpl(rod, assoc(v,1, "recycled small "+ v + " dust", -2), "LV Lathe");
            }
            else
                simpl(rod, assoc(v,1));
        }
        simpl("small "+v+" gear", assoc(plate,1));
    }

    materials = ["bronze", "iron", "tin", "steel", "stainless steel", "neodynium", "aluminum",
        "chrome", "titanium", "invar", "cobalt brass", "copper", "gold", "red alloy", "battery alloy",
        "thaumium", "silicon", "platinum", "lead", "zinc"]
    for (var k in materials) {
        var v = materials[k]
        if (TECH["bending machine"] > NONE)
        {
            simpl(v +" foil", assoc(v + " plate", 1), "Bend: Setting 1", 4);
            simpl(v + " plate", assoc(v,1), "Bend: Setting 1");
        }
        else
            simpl(v + " plate", assoc(v,2));
    }

    if (TECH["compressor"] > NONE)
    {
        simpl("lapis plate", {"lapis dust": 1 }, "Compress");
        simpl("olivine plate", { "olivine dust": 1 }, "Compress");
    }

    if (TECH["extruder"] > NONE)
        simpl("rubber plate", {"rubber": 1}, "Extrude: Plate");
    else
        simpl("rubber plate", {"rubber": 2});

    simpl("annealed copper", { "copper": 1, "oxygen": 1000 });

    if (TECH["fluid extractor"] > NONE)
    {
        simpl("molten redstone", {"redstone": 1}, "Fluid Extract", 144);
    }
    if (TECH["fluid extractor"] > NONE)
    {
        simpl("molten soldering alloy", {"soldering alloy": 1}, "Fluid Extract", 144);
    }

    simpl("comparator", { "redstone torch": 3, "* quartz": 1, "stone": 3});
    simpl("redstone torch", {"stick": 1, "redstone": 1});
    simpl("piston", {"plank": 3, "cobblestone": 4, "redstone": 1, "iron": 1});
    simpl("button", {"stone": 1});
    simpl("lever", {"stick": 1, "cobblestone": 1});
    simpl("chest", {"plank": 8});

    simpl("blue steel dust", {"rose gold dust":0.125, "brass dust":0.125, "black steel dust":0.5, "steel dust":0.25});
    simpl("black steel dust", {"nickel dust":0.2, "black bronze dust":0.2, "steel dust":0.6});
    simpl("black bronze dust", {"gold dust":0.2, "silver dust":0.2, "copper dust":0.6});
    simpl("brass dust", {"zinc dust":0.25, "copper dust":0.75});
    simpl("rose gold dust", {"gold dust":0.8, "copper dust":0.2});
    simpl("red alloy", { "copper": 1, "redstone": 4 }, "Alloy Smelt");
    simpl("cupronickel", { "copper": 1, "nickel": 1 }, "Alloy Smelt", 2);
    simpl("invar", { "nickel": 1, "iron": 2 }, "Alloy Smelt", 3);
    if (TECH["compressor"] > NONE)
    {
        simpl("block of redstone", {  "redstone": 9 }, "Compress");
        simpl("yellorium block", {  "yellorium": 9 }, "Compress");
    }
}

function basictech() {
    return {
        "bending machine" : techlevel.HV,
        "extruder" : techlevel.HV,
        "assembling machine" : techlevel.HV,
        "wiremill" : techlevel.HV,
        "casing mold" : techlevel.HV,
        "plate mold" : techlevel.HV,
        "forming press" : techlevel.HV,
        "fluid extractor" : techlevel.HV,
        "lathe" : techlevel.HV,
        "polarizer" : techlevel.HV,
        "laser engraver" : techlevel.HV,
        "cutting saw" : techlevel.HV,
        "compressor" : techlevel.HV
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