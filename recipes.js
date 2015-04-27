// Let's monkey-patch JS
String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}
String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

// Let's figure out what we need
var have = {
	"electric circuit" : 2,
	"lv machine hull" : 1,
	"tin cable" : 6,
	"red alloy wire" : 2,
	"tin plate" : 4,
	"rubber sheet" : 10,
	"iron rod" : 9,
	"magnetic iron rod" : 2,
	"electric motor" : 2,
	"copper cable" : 1
};
var wants = {
  "basic wiremill" : 1
};

var steps = [];


function ifwehaveituseit(src, num) {
  if (!(src in have)) {
    return 0;
  }
  if (have[src] < num) {
    var had = have[src];
    have[src] = 0;
    return had;
  }
  have[src] -= num;
  return num;
}

function substitute(src, dst) {
  if (src in wants) {
    var n = wants[src];
    delete wants[src];
    n -= ifwehaveituseit(src, n);
    if (n > 0) {
      for (var k in dst) {
        num = dst[k] * n;
        num -= ifwehaveituseit(src, num);
        if (num > 0) {
          if (!(k in wants)) {
            wants[k] = 0;
          }
          wants[k] += num;
        }
      }
      steps.push(n + " * " + JSON.stringify(dst) + " => " + n + " " + src);
    }
  }
}

substitute("basic wiremill", {
  "electric motor" : 4,
  "electric circuit" : 2,
  "lv machine hull" : 1,
  "tin cable" : 2
});
substitute("electric motor", {
  "tin cable" : 2,
  "copper wire" : 4,
  "iron rod" : 2,
  "magnetic iron rod" : 1
});
substitute("electric circuit", {
  "nand chip" : 2,
  "steel plate" : 1,
  "copper cable" : 6
});
substitute("nand chip", {
  "refined iron casing" : 1,
  "red alloy wire" : 2,
  "tin wire" : 1
});
substitute("lv machine hull", {
  "lv machine casing" : 2,
  "tin cable" : 2
});
substitute("lv machine casing", {
  "steel plate" : 8
});
substitute("magnetic iron rod", {
  "iron rod" : 1,
  "redstone" : 4
});
substitute("refined iron casing", {
  "steel plate" : 1
});

function substituteGeneric(endsWith, recipe) {
  for (want in wants) {
    if (want.endsWith(endsWith)) {
      recipe(want.slice(0, want.indexOf(endsWith)));
    }
  }
}

substituteGeneric("cable", function(material) {
  var recipe = material + "cable";
  var ingredients = {
    "rubber sheet" : 1
  }
  ingredients[material + "wire"] = 1;
  substitute(recipe, ingredients);
});
substituteGeneric("wire", function(material) {
  var recipe = material + "wire";
  var ingredients = {};
  ingredients[material + "plate"] = 1;
  substitute(recipe, ingredients);
});
substituteGeneric("rod", function(material) {
  var recipe = material + "rod";
  var ingredients = {};
  ingredients[material + "ingot"] = 1;
  substitute(recipe, ingredients);
});
substituteGeneric("plate", function(material) {
  var recipe = material + "plate";
  var ingredients = {};
  ingredients[material + "ingot"] = 2;
  substitute(recipe, ingredients);
});

substitute("rubber sheet", {
  "rubber dust": 2
});
substitute("red alloy ingot", {
  "copper": 1,
  "redstone": 4
});

console.log("");
console.log("You need:");
for (var item in wants) {
  console.log("   " + wants[item] + "x " + item);
}

console.log("");
console.log("And need to craft:");
steps.reverse().forEach(function(step) {
  console.log("   " + step);
});

console.log("");
