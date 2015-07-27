var express = require('express')
var app = express()
var recipes = require('./recipes')

var itemlist = [];
recipes.raw_recipes(recipes.basictech(), function(item) { itemlist.push(item); });

app.set('view engine', 'jade')

app.all('/', function (req, res) {
    var cur = {}
    function parseparam(name, qty)
    {
        if (name)
        {
            if (qty === "" || qty === undefined)
                cur[name] = 1
            else
                cur[name] = Number(qty)
        }
    }
    parseparam(req.query.i1name, req.query.i1qty)
    parseparam(req.query.i2name, req.query.i2qty)
    parseparam(req.query.i3name, req.query.i3qty)
    parseparam(req.query.i4name, req.query.i4qty)
    parseparam(req.query.i5name, req.query.i5qty)
    parseparam(req.query.i6name, req.query.i6qty)
    if (Object.keys(cur).length > 0)
    {
        // do recipes here
        var crafts = []
        // This is terrible... but the best way to clone an object afaict
        var begin = JSON.parse(JSON.stringify(cur));
        var tl = recipes.basictech()
        // Evaluate tech level based on submission values
        for (var k in tl)
        {
            if (k in req.query)
            {
                tl[k] = Number(req.query[k])
                console.log("Found tech " + k + " " + req.query[k]);
            }
            else
                console.log("Didn't find tech " + k);
        }
        recipes.run(cur, tl, function (n, src, dst, comment) {
            crafts.push([n, src, dst, comment])
        })
        res.render('index', {
            basictech: recipes.basictech(),
            techlevel: recipes.techlevel,
            begin: begin,
            crafts: crafts.reverse(),
            final: cur,
            query: req.query,
            itemlist: itemlist
        })
        console.log("run recipes.")
        console.log(begin)
        console.log(crafts)
        console.log(cur)
    }
    else
        res.render('index', {
            basictech: recipes.basictech(),
            techlevel: recipes.techlevel,
            query: {},
            itemlist: itemlist
        })
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});
