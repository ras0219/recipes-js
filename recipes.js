var cur = {
    "industrial apiary": 1
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
        console.log("Craft " + n + " " + src);
    }
}

simpl(cur, "industrial apiary", { "aluminum gear": 2, "power module": 2, "hv hull": 1, "bee receptacle": 1, "genetics processor": 1, "swarmer": 2 });
simpl(cur, "swarmer", { "gold": 2, "diamantine electron tube": 4, "alveary": 1 });
simpl(cur, "diamantine electron tube", {"redstone":0.5, "molten glass":0.25,"diamond":0.8});
simpl(cur, "mutagen producer", {"aluminum plate":2, "aluminum gear":2,"hv hull":1, "small bronze fluid pipe":1, "power module":2,"mutagen tank":1 });
simpl(cur, "mutatron", { "aluminum gear": 2, "hv hull": 1, "bee receptacle": 3, "mutagen tank": 1, "power module": 1, "genetics processor": 1 })

simpl(cur, "mutagen tank", { "aluminum plate": 6, "glass pane": 3 });

simpl(cur, "power module", { "aluminum gear": 4, "gold": 2, "nand": 2, "block of redstone": 1 });
simpl(cur, "bee receptacle", { "aluminum": 5, "block of redstone":2, "glass pane":1, "weighted pressure plate(light)":1 });
simpl(cur, "weighted pressure plate(light)", { "gold plate": 2 });
simpl(cur, "genetics processor", { "nether quartz": 4, "diamond":4, "pulsating chipset":1 });


simpl(cur, "glass pane", { "glass": 2.66 });
simpl(cur, "implosion compressor multi", {"implosion compressor":1, "lv energy hatch":1, "lv input bus":1, "lv output bus":1, "maintenance hatch":1,"lv muffler hatch":1, "solid steel casing":20});

simpl(cur, "implosion compressor", { "obsidian":3,"solid steel casing":1,"aluminium cable":2,"advanced circuit":2 });
simpl(cur, "lv energy hatch", { "tin cable": 1, "lv hull":1 });
simpl(cur, "lv input bus", { "lv hull": 1, "chest": 1 });
simpl(cur, "lv output bus", { "lv hull": 1, "chest":1 });
simpl(cur, "lv muffler hatch", { "lv hull": 1, "steel fluid pipe": 1 });

simpl(cur, "solid steel casing", { "steel plate": 6, "steel frame box": 1 });
simpl(cur, "steel frame box", { "steel rod":4 });


simpl(cur, "maintenance hatch", {"lv hull":1});

simpl(cur, "hv laser engraver", {"gold cable x1": 2, "hv hull": 1, "advanced circuit":3, "hv piston":2, "hv emitter": 1});
simpl(cur, "hv forming press", {"gold cable x1": 4, "hv hull": 1, "advanced circuit":2, "hv piston":2});
simpl(cur, "hv assembling machine", {"gold cable x1": 2, "hv hull": 1, "advanced circuit":2, "hv conveyor":2, "hv robot arm": 2});

simpl(cur, "vacuum freezer", {"frost proof casing": 1, "hv pump": 3, "gold cable x1":2, "data control circuit": 3});

simpl(cur, "mv diesel generator", {"copper cable x1": 1, "mv hull": 1, "mv motor": 2, "good circuit" : 1, "aluminum gear" : 2, "mv piston" : 2});
simpl(cur, "mv fluid canner", {"copper cable x1": 2, "mv hull": 1, "mv pump": 2, "good circuit" : 2, "glass": 2});
simpl(cur, "mv chemical reactor", {"copper cable x1": 2, "mv hull": 1, "mv motor": 1, "good circuit" : 2, "glass": 2, "bronze rotor": 1});
simpl(cur, "mv chemical bath", {"copper cable x1": 1, "mv hull": 1, "mv pump": 1, "good circuit" : 2, "glass": 2, "mv conveyor": 2});
simpl(cur, "mv centrifuge", {"copper cable x1": 2, "mv hull": 1, "mv motor": 2, "good circuit" : 4});
simpl(cur, "mv compressor", {"copper cable x1": 2, "mv hull": 1, "mv piston": 2, "good circuit" : 2});
simpl(cur, "mv gas turbine", {"good circuit": 2, "bronze rotor":3, "mv motor":2, "copper cable x1": 1, "mv hull":1});
simpl(cur, "mv energy hatch", {"copper cable x1": 1, "mv hull":1});

simpl(cur, "lv scanner", { "tin cable x1": 2, "lv hull": 1, "good circuit":4, "lv emitter":1, "lv sensor":1 });

simpl(cur, "ulv input bus", { "ulv hull": 1, "chest": 1 });
simpl(cur, "ulv output bus", {"ulv hull": 1, "chest": 1});

simpl(cur, "hv emitter", {"chrome rod": 4, "advanced circuit": 2, "emerald": 1, "gold cable x1": 2});
simpl(cur, "hv hull", {"gold cable x1": 2, "hv casing": 1 });
simpl(cur, "hv casing", {"stainless steel plate": 8 });
simpl(cur, "hv robot arm", {"stainless steel rod": 2, "hv piston":1, "hv motor":2, "gold cable x1": 3, "advanced circuit": 1});
simpl(cur, "hv conveyor", {"gold cable x1": 1, "rubber plate": 6, "hv motor": 2});
simpl(cur, "hv pump", {"steel rotor": 1, "steel screw":1, "gold cable x1": 1, "rubber ring": 2, "stainless steel fluid pipe": 1, "hv motor" : 1});
simpl(cur, "hv piston", {"stainless steel rod": 2, "hv motor":1, "gold cable x1": 2, "stainless steel plate": 3, "stainless steel gear":1});
simpl(cur, "hv motor", {"stainless steel rod": 2, "magnetic steel rod":1, "gold cable x1": 2, "copper wire x4": 4});

simpl(cur, "mv hull", {"copper cable x1": 2, "mv casing": 1 });
simpl(cur, "mv casing", {"aluminum plate": 8 });
simpl(cur, "mv conveyor", {"copper cable x1": 1, "rubber plate": 6, "mv motor": 2});
simpl(cur, "mv pump", {"bronze rotor": 1, "bronze screw":1, "copper cable x1": 1, "rubber ring": 2, "steel fluid pipe": 1, "mv motor" : 1});
simpl(cur, "mv piston", {"aluminum rod": 2, "mv motor":1, "copper cable x1": 2, "aluminum plate": 3, "aluminum gear":1});
simpl(cur, "mv motor", {"aluminum rod": 2, "magnetic steel rod":1, "copper cable x1": 2, "copper wire x2": 4});

simpl(cur, "lv sensor", { "brass rod": 1, "basic circuit": 1, "quartzite": 1, "steel plate": 4 });
simpl(cur, "lv emitter", { "brass rod": 4, "basic circuit": 2, "quartzite": 1, "tin cable x1": 2 });
simpl(cur, "lv hull", { "tin cable x1": 2, "lv casing": 1 });
simpl(cur, "lv casing", {"steel plate": 8 });

simpl(cur, "ulv hull", {"ulv casing": 1, "lead cable x1": 2});
simpl(cur, "ulv casing", {"steel plate": 4});

simpl(cur, "data control circuit", { "processor board": 1, "data storage chip" : 3, "soldering alloy": 1 });
simpl(cur, "processor board", { "etched ev wiring": 4, "silicon plate" : 2 });
simpl(cur, "data storage chip", { "advanced circuit board": 1, "engraved crystal chip" : 1, "soldering alloy": 0.5 });
simpl(cur, "engraved crystal chip", { "olivine plate": 1 });

simpl(cur, "advanced circuit", { "advanced circuit board": 1, "advanced circuit parts" : 2, "soldering alloy": 0.5 });
simpl(cur, "advanced circuit board", { "etched hv wiring": 4, "silicon plate" : 1 });
simpl(cur, "advanced circuit parts", { "glowstone": 0.5, "lapis plate" : 0.5 });

simpl(cur, "good circuit", { "basic circuit": 1, "nand" : 2, "soldering alloy": 0.25 });
simpl(cur, "basic circuit", { "basic circuit board": 1, "nand" : 2, "soldering alloy": 0.25 });
simpl(cur, "basic circuit board", { "etched mv wiring": 4, "silicon plate" : 1 });

simpl(cur, "nand", { "steel item casing": 1, "red alloy wire x1" : 1, "soldering alloy": 0.125 });

simpl(cur, "etched ev wiring", { "platinum foil": 1 });
simpl(cur, "etched hv wiring", { "gold foil": 1 });
simpl(cur, "etched mv wiring", { "copper foil": 1 });

simpl(cur, "frost proof casing", {"aluminum plate": 6, "aluminum frame box":1 });
simpl(cur, "aluminum frame box", {"aluminum rod": 4});

simpl(cur, "bronze rotor", {"bronze plate": 4, "bronze screw":1, "bronze ring" : 1});
simpl(cur, "steel rotor", {"steel plate": 4, "steel screw":1, "steel ring" : 1});

simpl(cur, "rubber ring", {"rubber": 0.25 });
simpl(cur, "bronze ring", {"bronze": 0.25 });
simpl(cur, "steel ring", {"steel": 0.25 });

simpl(cur, "bronze screw", {"bronze bolt": 1});
simpl(cur, "steel screw", {"steel bolt": 1});

simpl(cur, "bronze bolt", {"bronze": 0.125});
simpl(cur, "steel bolt", {"steel": 0.125});

simpl(cur, "magnetic steel rod", {"steel rod": 1 });
simpl(cur, "steel rod", {"steel": 0.5 });
simpl(cur, "aluminum rod", {"aluminum": 0.5 });
simpl(cur, "stainless steel rod", {"stainless steel": 0.5 });
simpl(cur, "chrome rod", {"chrome": 0.5 });

simpl(cur, "stainless steel gear", {"stainless steel" : 4});
simpl(cur, "aluminum gear", {"aluminum" : 4});

simpl(cur, "stainless steel fluid pipe", {"stainless steel plate": 3});
simpl(cur, "steel fluid pipe", {"steel plate": 3});

simpl(cur, "platinum foil", { "platinum plate": 0.25 });
simpl(cur, "gold foil", { "gold plate": 0.25 });
simpl(cur, "copper foil", { "copper plate": 0.25 });

simpl(cur, "gold cable x1", { "gold wire x1": 1, "rubber plate" : 1});
simpl(cur, "gold wire x4", { "gold wire x2": 2 });
simpl(cur, "gold wire x2", { "gold wire x1": 2 });
simpl(cur, "gold wire x1", { "gold": 0.5 });

simpl(cur, "copper cable x1", { "copper wire x1": 1, "rubber plate" : 1});
simpl(cur, "copper wire x4", { "copper wire x2": 2 });
simpl(cur, "copper wire x2", { "copper wire x1": 2 });
simpl(cur, "copper wire x1", { "copper": 0.5 });

simpl(cur, "tin cable x1", { "tin wire x1": 1, "rubber plate" : 1});
simpl(cur, "tin wire x4", { "tin wire x2": 2 });
simpl(cur, "tin wire x2", { "tin wire x1": 2 });
simpl(cur, "tin wire x1", { "tin": 0.5 });

simpl(cur, "lead cable x1", { "lead wire x1": 1, "rubber plate" : 1});
simpl(cur, "lead wire x4", { "lead wire x2": 2 });
simpl(cur, "lead wire x2", { "lead wire x1": 2 });
simpl(cur, "lead wire x1", { "lead": 0.5 });

simpl(cur, "red alloy wire x1", { "red alloy": 0.5 });

simpl(cur, "steel item casing", {"steel": 0.5 });

simpl(cur, "olivine plate", { "olivine dust": 1 });
simpl(cur, "stainless steel plate", {"stainless steel": 1 });
simpl(cur, "platinum plate", {"platinum": 1 });
simpl(cur, "gold plate", {"gold": 1 });
simpl(cur, "lapis plate", {"lapis dust": 1 });
simpl(cur, "chrome plate", {"chrome": 1 });
simpl(cur, "aluminum plate", {"aluminum": 1 });
simpl(cur, "silicon plate", { "silicon": 1 });
simpl(cur, "copper plate", { "copper" : 1 });
simpl(cur, "steel plate", {"steel": 1});
simpl(cur, "bronze plate", {"bronze": 1});
simpl(cur, "rubber plate", {"rubber": 1});

simpl(cur, "red alloy", { "copper": 1, "redstone": 4 });
simpl(cur, "block of redstone", {  "redstone": 9 });

simpl(cur, "chest", {"plank": 8});

for (var k in cur) {
    console.log(k + ": " + cur[k]);
}
