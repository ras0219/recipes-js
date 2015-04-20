var cur = { "lv fluid canner": 1};

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

simpl(cur, "electric jetpack", { "advanced circuit": 1, "iron item casing": 4, "glowstone": 2, "batbox": 1 });
simpl(cur, "batbox", {"plank":5,"insulated tin cable":1,"re battery":3});
simpl(cur, "re battery", { "redstone": 2, "small battery hull": 1 });
simpl(cur, "small battery hull", { "insulated tin cable":1, "battery alloy plate":2 });
simpl(cur, "maintenance hatch", {"lv hull":1});

simpl(cur, "ev macerator", { "aluminum cable x1": 3, "ev hull": 1, "data control circuit": 2, "ev piston": 1, "ev motor": 1, "diamond grinding head":1 });

simpl(cur, "vacuum freezer", { "frost proof casing": 1, "hv pump": 3, "gold cable x1": 2, "data control circuit": 3 });

//simpl(cur, "hv bending machine", { "gold cable x1": 2, "hv hull": 1, "copper wire x4": 4, "steel rod": 2 });
simpl(cur, "hv wiremill", { "gold cable x1": 2, "hv hull": 1, "hv motor": 4, "advanced circuit": 2 });

simpl(cur, "hv polarizer", { "gold cable x1": 2, "hv hull": 1, "copper wire x4": 4, "steel rod": 2 });
simpl(cur, "hv laser engraver", { "gold cable x1": 2, "hv hull": 1, "advanced circuit": 3, "hv piston": 2, "hv emitter": 1 });
simpl(cur, "hv forming press", {"gold cable x1": 4, "hv hull": 1, "advanced circuit":2, "hv piston":2});
simpl(cur, "hv assembling machine", {"gold cable x1": 2, "hv hull": 1, "advanced circuit":2, "hv conveyor":2, "hv robot arm": 2});

simpl(cur, "mv packager", { "copper cable x1": 2, "mv hull": 1, "mv robot arm": 1, "good circuit": 2, "mv conveyor": 1, "chest": 2 });
simpl(cur, "mv diesel generator", { "copper cable x1": 1, "mv hull": 1, "mv motor": 2, "good circuit": 1, "aluminum gear": 2, "mv piston": 2 });
simpl(cur, "mv fluid canner", {"copper cable x1": 2, "mv hull": 1, "mv pump": 2, "good circuit" : 2, "glass": 2});
simpl(cur, "mv chemical reactor", {"copper cable x1": 2, "mv hull": 1, "mv motor": 1, "good circuit" : 2, "glass": 2, "bronze rotor": 1});
simpl(cur, "mv chemical bath", {"copper cable x1": 1, "mv hull": 1, "mv pump": 1, "good circuit" : 2, "glass": 2, "mv conveyor": 2});
simpl(cur, "mv centrifuge", {"copper cable x1": 2, "mv hull": 1, "mv motor": 2, "good circuit" : 4});
simpl(cur, "mv compressor", {"copper cable x1": 2, "mv hull": 1, "mv piston": 2, "good circuit" : 2});
simpl(cur, "mv gas turbine", {"good circuit": 2, "bronze rotor":3, "mv motor":2, "copper cable x1": 1, "mv hull":1});
simpl(cur, "mv energy hatch", {"copper cable x1": 1, "mv hull":1});

simpl(cur, "lv fluid canner", {"tin cable x1": 2, "lv hull": 1, "lv pump": 2, "basic circuit" : 2, "glass": 2});
simpl(cur, "lv assembling machine", { "tin cable x1": 2, "lv hull": 1, "basic circuit":2, "lv conveyor":2, "lv robot arm":2 });
simpl(cur, "lv scanner", { "tin cable x1": 2, "lv hull": 1, "good circuit":4, "lv emitter":1, "lv sensor":1 });

simpl(cur, "ulv input bus", { "ulv hull": 1, "chest": 1 });
simpl(cur, "ulv output bus", {"ulv hull": 1, "chest": 1});

simpl(cur, "ev hull", { "aluminum cable x1": 2, "ev casing": 1 });
simpl(cur, "ev casing", { "titanium plate": 8 });
simpl(cur, "ev robot arm", { "titanium rod": 2, "ev piston": 1, "ev motor": 2, "aluminum cable x1": 3, "data control circuit": 1 });
simpl(cur, "ev conveyor", { "aluminum cable x1": 1, "rubber plate": 6, "ev motor": 2 });
simpl(cur, "ev pump", { "stainless steel rotor": 1, "stainless steel screw": 1, "aluminum cable x1": 1, "rubber ring": 2, "titanium fluid pipe": 1, "ev motor": 1 });
simpl(cur, "ev piston", { "titanium rod": 2, "ev motor": 1, "aluminum cable x1": 2, "titanium plate": 3, "titanium gear": 1 });
simpl(cur, "ev motor", { "titanium rod": 2, "magnetic neodynium rod": 1, "aluminum cable x1": 2, "annealed copper wire x8": 4 });

simpl(cur, "hv emitter", { "chrome rod": 4, "advanced circuit": 2, "emerald": 1, "gold cable x1": 2 });
simpl(cur, "hv hull", {"gold cable x1": 2, "hv casing": 1 });
simpl(cur, "hv casing", {"stainless steel plate": 8 });
simpl(cur, "hv robot arm", {"stainless steel rod": 2, "hv piston":1, "hv motor":2, "gold cable x1": 3, "advanced circuit": 1});
simpl(cur, "hv conveyor", {"gold cable x1": 1, "rubber plate": 6, "hv motor": 2});
simpl(cur, "hv pump", {"steel rotor": 1, "steel screw":1, "gold cable x1": 1, "rubber ring": 2, "stainless steel fluid pipe": 1, "hv motor" : 1});
simpl(cur, "hv piston", {"stainless steel rod": 2, "hv motor":1, "gold cable x1": 2, "stainless steel plate": 3, "stainless steel gear":1});
simpl(cur, "hv motor", {"stainless steel rod": 2, "magnetic steel rod":1, "gold cable x1": 2, "copper wire x4": 4});

simpl(cur, "mv hull", {"copper cable x1": 2, "mv casing": 1 });
simpl(cur, "mv casing", {"aluminum plate": 8 });
simpl(cur, "mv robot arm", { "aluminum rod": 2, "mv piston": 1, "mv motor": 2, "copper cable x1": 3, "good circuit": 1 });
simpl(cur, "mv conveyor", { "copper cable x1": 1, "rubber plate": 6, "mv motor": 2 });
simpl(cur, "mv pump", {"bronze rotor": 1, "bronze screw":1, "copper cable x1": 1, "rubber ring": 2, "steel fluid pipe": 1, "mv motor" : 1});
simpl(cur, "mv piston", {"aluminum rod": 2, "mv motor":1, "copper cable x1": 2, "aluminum plate": 3, "aluminum gear":1});
simpl(cur, "mv motor", {"aluminum rod": 2, "magnetic steel rod":1, "copper cable x1": 2, "copper wire x2": 4});

simpl(cur, "lv robot arm", { "steel rod": 2, "lv piston": 1, "lv motor": 2, "tin cable x1": 3, "basic circuit": 1 });
simpl(cur, "lv conveyor", { "tin cable x1": 1, "rubber plate": 6, "lv motor": 2 });
simpl(cur, "lv sensor", { "brass rod": 1, "basic circuit": 1, "quartzite": 1, "steel plate": 4 });
simpl(cur, "lv emitter", { "brass rod": 4, "basic circuit": 2, "quartzite": 1, "tin cable x1": 2 });
simpl(cur, "lv hull", { "tin cable x1": 2, "lv casing": 1 });
simpl(cur, "lv casing", {"steel plate": 8 });
simpl(cur, "lv pump", {"tin rotor": 1, "tin screw":1, "tin cable x1": 1, "rubber ring": 1, "lv motor": 1, "bronze fluid pipe": 1});
simpl(cur, "lv piston", {"steel rod": 2, "lv motor":1, "tin cable x1": 2, "steel plate": 3, "small steel gear":1});
simpl(cur, "lv motor", {"iron rod": 2, "magnetic iron rod":1, "tin cable x1": 2, "copper wire x1": 4});

simpl(cur, "ulv hull", {"ulv casing": 1, "lead cable x1": 2});
simpl(cur, "ulv casing", {"steel plate": 4});

simpl(cur, "data control circuit", { "processor board": 1, "data storage chip" : 3, "soldering alloy": 1 });
simpl(cur, "processor board", { "etched ev wiring": 4, "silicon plate" : 2 });
simpl(cur, "data storage chip", { "advanced circuit board": 1, "engraved crystal chip" : 1, "soldering alloy": 0.5 });
simpl(cur, "engraved crystal chip", { "olivine plate": 1 });

simpl(cur, "advanced circuit", { "advanced circuit board": 1, "advanced circuit parts" : 2, "soldering alloy": 0.5 });
simpl(cur, "advanced circuit board", { "etched hv wiring": 4, "silicon plate" : 1 });
simpl(cur, "advanced circuit parts", { "glowstone": 0.5, "lapis plate" : 0.5 });

// This is for "full tech"
//simpl(cur, "good circuit", { "basic circuit": 1, "nand" : 2, "soldering alloy": 0.25 });
//simpl(cur, "basic circuit", { "basic circuit board": 1, "nand" : 2, "soldering alloy": 0.25 });
//simpl(cur, "basic circuit board", { "etched mv wiring": 4, "silicon plate" : 1 });

simpl(cur, "nand", { "steel item casing": 1, "red alloy wire x1" : 1, "soldering alloy": 0.125 });

// This is for "bronze-age tech"
simpl(cur, "basic circuit", { "insulated copper cable": 6, "nand" : 2, "steel plate": 1 });
//simpl(cur, "nand", { "steel item casing": 1, "red alloy wire x1" : 2, "tin wire x1": 1 });


simpl(cur, "etched ev wiring", { "platinum foil": 1 });
simpl(cur, "etched hv wiring", { "gold foil": 1 });
simpl(cur, "etched mv wiring", { "copper foil": 1 });

simpl(cur, "diamond grinding head", {"industrial diamond": 1, "steel plate": 4, "diamond dust": 4});

simpl(cur, "frost proof casing", {"aluminum plate": 6, "aluminum frame box":1 });
simpl(cur, "aluminum frame box", {"aluminum rod": 4});

simpl(cur, "bronze rotor", {"bronze plate": 4, "bronze screw":1, "bronze ring" : 1});
simpl(cur, "steel rotor", {"steel plate": 4, "steel screw":1, "steel ring" : 1});
simpl(cur, "stainless steel rotor", { "stainless steel plate": 4, "stainless steel screw": 1, "stainless steel ring": 1 });

simpl(cur, "rubber ring", {"rubber": 0.25 });
simpl(cur, "bronze ring", {"bronze": 0.25 });
simpl(cur, "steel ring", {"steel": 0.25 });
simpl(cur, "stainless steel ring", { "stainless steel": 0.25 });

simpl(cur, "bronze screw", {"bronze bolt": 1});
simpl(cur, "steel screw", {"steel bolt": 1});
simpl(cur, "stainless steel screw", { "stainless steel bolt": 1 });

simpl(cur, "bronze bolt", {"bronze": 0.125});
simpl(cur, "steel bolt", { "steel": 0.125 });
simpl(cur, "stainless steel bolt", { "stainless steel": 0.125 });

simpl(cur, "small steel gear", {"steel plate": 1 });

simpl(cur, "magnetic neodynium rod", { "neodynium rod": 1 });
simpl(cur, "neodynium rod", { "neodynium": 0.5 });
simpl(cur, "magnetic steel rod", { "steel rod": 1 });
simpl(cur, "steel rod", {"steel": 0.5 });
simpl(cur, "aluminum rod", {"aluminum": 0.5 });
simpl(cur, "stainless steel rod", {"stainless steel": 0.5 });
simpl(cur, "chrome rod", {"chrome": 0.5 });
simpl(cur, "titanium rod", { "titanium": 0.5 });

simpl(cur, "stainless steel gear", {"stainless steel" : 4});
simpl(cur, "aluminum gear", {"aluminum" : 4});
simpl(cur, "titanium gear", { "titanium": 4 });

simpl(cur, "titanium fluid pipe", { "titanium plate": 3 });
simpl(cur, "stainless steel fluid pipe", { "stainless steel plate": 3 });
simpl(cur, "steel fluid pipe", {"steel plate": 3});

simpl(cur, "platinum foil", { "platinum plate": 0.25 });
simpl(cur, "gold foil", { "gold plate": 0.25 });
simpl(cur, "copper foil", { "copper plate": 0.25 });

simpl(cur, "aluminum cable x1", { "aluminum wire x1": 1, "rubber plate": 1 });
simpl(cur, "aluminum wire x4", { "aluminum wire x2": 2 });
simpl(cur, "aluminum wire x2", { "aluminum wire x1": 2 });
simpl(cur, "aluminum wire x1", { "aluminum": 0.5 });

simpl(cur, "gold cable x1", { "gold wire x1": 1, "rubber plate": 1 });
simpl(cur, "gold wire x4", { "gold wire x2": 2 });
simpl(cur, "gold wire x2", { "gold wire x1": 2 });
simpl(cur, "gold wire x1", { "gold": 0.5 });

simpl(cur, "annealed copper cable x1", { "annealed copper wire x1": 1, "rubber plate": 1 });
simpl(cur, "annealed copper wire x8", { "annealed copper wire x4": 2 });
simpl(cur, "annealed copper wire x4", { "annealed copper wire x2": 2 });
simpl(cur, "annealed copper wire x2", { "annealed copper wire x1": 2 });
simpl(cur, "annealed copper wire x1", { "annealed copper": 0.5 });

simpl(cur, "insulated copper cable", { "ic2 copper cable": 1, "rubber": 1 });
simpl(cur, "ic2 copper cable", { "tin plate": 1/3.0 });
simpl(cur, "copper cable x1", { "copper wire x1": 1, "rubber plate" : 1});
simpl(cur, "copper wire x8", { "copper wire x4": 2 });
simpl(cur, "copper wire x4", { "copper wire x2": 2 });
simpl(cur, "copper wire x2", { "copper wire x1": 2 });
simpl(cur, "copper wire x1", { "copper": 0.5 });

simpl(cur, "insulated tin cable", { "ic2 tin cable": 1, "rubber": 1 });
simpl(cur, "ic2 tin cable", { "tin plate": 0.25 });
simpl(cur, "tin cable x1", { "tin wire x1": 1, "rubber plate": 1 });
simpl(cur, "tin wire x4", { "tin wire x2": 2 });
simpl(cur, "tin wire x2", { "tin wire x1": 2 });
simpl(cur, "tin wire x1", { "tin": 0.5 });

simpl(cur, "lead cable x1", { "lead wire x1": 1, "rubber plate" : 1});
simpl(cur, "lead wire x4", { "lead wire x2": 2 });
simpl(cur, "lead wire x2", { "lead wire x1": 2 });
simpl(cur, "lead wire x1", { "lead": 0.5 });

simpl(cur, "red alloy wire x1", { "red alloy": 0.5 });

simpl(cur, "steel item casing", { "steel": 0.5 });
simpl(cur, "iron item casing", {"iron": 0.5 });

simpl(cur, "battery alloy plate", { "battery alloy": 1 });
simpl(cur, "titanium plate", { "titanium": 1 });
simpl(cur, "olivine plate", { "olivine dust": 1 });
simpl(cur, "stainless steel plate", {"stainless steel": 1 });
simpl(cur, "platinum plate", {"platinum": 1 });
simpl(cur, "gold plate", {"gold": 1 });
simpl(cur, "lapis plate", {"lapis dust": 1 });
simpl(cur, "chrome plate", {"chrome": 1 });
simpl(cur, "aluminum plate", {"aluminum": 1 });
simpl(cur, "silicon plate", { "silicon": 1 });
simpl(cur, "copper plate", { "copper" : 1 });
simpl(cur, "tin plate", { "tin": 1 });
simpl(cur, "steel plate", { "steel": 1 });
simpl(cur, "bronze plate", {"bronze": 1});
simpl(cur, "rubber plate", {"rubber": 1});

simpl(cur, "red alloy", {"copper": 1, "redstone": 4});
simpl(cur, "annealed copper", { "copper": 1, "oxygen": 1000 });

simpl(cur, "chest", {"plank": 8});

simpl(cur, "blue steel dust", {"rose gold dust":0.125, "brass dust":0.125, "black steel dust":0.5, "steel dust":0.25});
simpl(cur, "black steel dust", {"nickel dust":0.2, "black bronze dust":0.2, "steel dust":0.6});
simpl(cur, "black bronze dust", {"gold dust":0.2, "silver dust":0.2, "copper dust":0.6});
simpl(cur, "brass dust", {"zinc dust":0.25, "copper dust":0.75});
simpl(cur, "rose gold dust", {"gold dust":0.8, "copper dust":0.2});

for (var k in cur) {
    console.log(k + ": " + cur[k]);
}
