var cur = { "hv assembling machine": 1};

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

simpl(cur, "hv laser engraver", {"gold cable x1": 2, "hv hull": 1, "advanced circuit":3, "hv piston":2, "hv emitter": 1});
simpl(cur, "hv forming press", {"gold cable x1": 4, "hv hull": 1, "advanced circuit":2, "hv piston":2});
simpl(cur, "hv assembling machine", {"gold cable x1": 2, "hv hull": 1, "advanced circuit":2, "hv conveyor":2, "hv robot arm": 2});

simpl(cur, "mv diesel generator", {"copper cable x1": 1, "mv hull": 1, "mv motor": 2, "good circuit" : 1, "aluminum gear" : 2, "mv piston" : 2});
simpl(cur, "mv fluid canner", {"copper cable x1": 2, "mv hull": 1, "mv pump": 2, "good circuit" : 2, "glass": 2});
simpl(cur, "mv chemical reactor", {"copper cable x1": 2, "mv hull": 1, "mv motor": 1, "good circuit" : 2, "glass": 2, "bronze rotor": 1});
simpl(cur, "mv chemical bath", {"copper cable x1": 1, "mv hull": 1, "mv pump": 1, "good circuit" : 2, "glass": 2, "mv conveyor": 2});
simpl(cur, "mv centrifuge", {"copper cable x1": 2, "mv hull": 1, "mv motor": 2, "good circuit" : 4});
simpl(cur, "mv compressor", {"copper cable x1": 2, "mv hull": 1, "mv piston": 2, "good circuit" : 2});

simpl(cur, "hv emitter", {"chrome rod": 4, "advanced circuit": 2, "emerald": 1, "gold cable x1": 2});

simpl(cur, "hv hull", {"gold cable x1": 2, "hv casing": 1 });
simpl(cur, "hv casing", {"stainless steel plate": 8 });
simpl(cur, "hv robot arm", {"stainless steel rod": 2, "hv piston":1, "hv motor":2, "gold cable x1": 3, "advanced circuit": 1});
simpl(cur, "hv conveyor", {"gold cable x1": 1, "rubber plate": 6, "hv motor": 2});
simpl(cur, "hv pump", {"bronze rotor": 1, "bronze screw":1, "gold cable x1": 1, "rubber ring": 2, "steel fluid pipe": 1, "hv motor" : 1});
simpl(cur, "hv piston", {"stainless steel rod": 2, "hv motor":1, "gold cable x1": 2, "stainless steel plate": 3, "stainless steel gear":1});
simpl(cur, "hv motor", {"stainless steel rod": 2, "magnetic steel rod":1, "gold cable x1": 2, "copper wire x4": 4});

simpl(cur, "mv hull", {"copper cable x1": 2, "mv casing": 1 });
simpl(cur, "mv casing", {"aluminum plate": 8 });
simpl(cur, "mv conveyor", {"copper cable x1": 1, "rubber plate": 6, "mv motor": 2});
simpl(cur, "mv pump", {"bronze rotor": 1, "bronze screw":1, "copper cable x1": 1, "rubber ring": 2, "steel fluid pipe": 1, "mv motor" : 1});
simpl(cur, "mv piston", {"aluminum rod": 2, "mv motor":1, "copper cable x1": 2, "aluminum plate": 3, "aluminum gear":1});
simpl(cur, "mv motor", {"aluminum rod": 2, "magnetic steel rod":1, "copper cable x1": 2, "copper wire x2": 4});

simpl(cur, "good circuit", { "basic circuit": 1, "nand" : 2, "soldering alloy": 0.25 });
simpl(cur, "basic circuit", { "basic circuit board": 1, "nand" : 2, "soldering alloy": 0.25 });
simpl(cur, "basic circuit board", { "etched mv wiring": 4, "silicon plate" : 1 });

simpl(cur, "advanced circuit", { "advanced circuit board": 1, "advanced circuit parts" : 2, "soldering alloy": 0.5 });
simpl(cur, "advanced circuit board", { "etched hv wiring": 4, "silicon plate" : 1 });
simpl(cur, "advanced circuit parts", { "glowstone": 0.5, "lapis plate" : 0.5 });

simpl(cur, "nand", { "steel item casing": 1, "red alloy wire x1" : 1, "soldering alloy": 0.125 });

simpl(cur, "etched hv wiring", { "gold foil": 1 });
simpl(cur, "etched mv wiring", { "copper foil": 1 });

simpl(cur, "bronze rotor", {"bronze plate": 4, "bronze screw":1, "bronze ring" : 1});

simpl(cur, "rubber ring", {"rubber": 0.25 });
simpl(cur, "bronze ring", {"bronze": 0.25 });

simpl(cur, "bronze screw", {"bronze bolt": 1});

simpl(cur, "bronze bolt", {"bronze": 0.125});

simpl(cur, "magnetic steel rod", {"steel rod": 1 });
simpl(cur, "steel rod", {"steel": 0.5 });
simpl(cur, "aluminum rod", {"aluminum": 0.5 });
simpl(cur, "stainless steel rod", {"stainless steel": 0.5 });
simpl(cur, "chrome rod", {"chrome": 0.5 });

simpl(cur, "stainless steel gear", {"stainless steel" : 4});
simpl(cur, "aluminum gear", {"aluminum" : 4});

simpl(cur, "steel fluid pipe", {"steel plate": 3});

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
simpl(cur, "red alloy wire x1", { "red alloy": 0.5 });

simpl(cur, "steel item casing", {"steel": 0.5 });

simpl(cur, "stainless steel plate", {"stainless steel": 1 });
simpl(cur, "gold plate", {"gold": 1 });
simpl(cur, "lapis plate", {"lapis dust": 1 });
simpl(cur, "chrome plate", {"chrome": 1 });
simpl(cur, "aluminum plate", {"aluminum": 1 });
simpl(cur, "silicon plate", { "silicon": 1 });
simpl(cur, "copper plate", { "copper" : 1 });
simpl(cur, "steel plate", {"steel": 1});
simpl(cur, "bronze plate", {"bronze": 1});
simpl(cur, "rubber plate", {"rubber": 1});

simpl(cur, "red alloy", {"copper": 1, "redstone": 4});

for (var k in cur) {
    console.log(k + ": " + cur[k]);
}
