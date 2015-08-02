var express = require('express')
var app = express()
var recipes = require('./recipes')

var itemlist = [];
recipes.raw_recipes(recipes.basictech(), function(item) { itemlist.push(item); });

app.set('view engine', 'jade')

app.all('/', function (req, res) {
    var cur = {}
    var query = req.query || {};
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
    parseparam(query.i1name, query.i1qty)
    parseparam(query.i2name, query.i2qty)
    parseparam(query.i3name, query.i3qty)
    parseparam(query.i4name, query.i4qty)
    parseparam(query.i5name, query.i5qty)
    parseparam(query.i6name, query.i6qty)
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
            if (k in query)
            {
                tl[k] = Number(query[k])
                console.log("Found tech " + k + " " + query[k]);
            }
            else
                console.log("Didn't find tech " + k);
        }
        recipes.run(cur, tl, function (n, src, dst, comment, batchsz) {
            crafts.push([n * batchsz, src, dst, comment, batchsz])
        })
        res.render('index', {
            basictech: recipes.basictech(),
            techlevel: recipes.techlevel,
            begin: begin,
            crafts: crafts.reverse(),
            final: cur,
            query: query,
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
            query: query,
            itemlist: itemlist
        })
})

var port = 3000
if ('PORT' in process.env)
{
    port = process.env.PORT
}

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});
