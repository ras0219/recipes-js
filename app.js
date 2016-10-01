var express = require('express')
var app = express()
var recipes = require('./recipes')
var recipesevo = require('./recipes-evolved')
var recipesinfi = require('./recipes-infitech')

app.set('view engine', 'jade')

app.use('/static', express.static('static'));

function make_response_function(my_subtitle, my_recipes_module) {
    var my_itemlist = [];
    my_recipes_module.raw_recipes(my_recipes_module.basictech(), function(item) { my_itemlist.push(item); });

    return function (req, res) {
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
            var tl = my_recipes_module.basictech()
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
            my_recipes_module.run(cur, tl, function (n, src, dst, comment, batchsz, attr) {
                if (batchsz)
                    crafts.push([n * batchsz, src, dst, comment, batchsz, attr])
                else
                    crafts.push([n, src, dst, comment, batchsz, attr])
            })
            res.render('index', {
                title: my_subtitle,
                basictech: my_recipes_module.basictech(),
                techlevel: my_recipes_module.techlevel,
                begin: begin,
                crafts: crafts.reverse(),
                final: cur,
                query: query,
                itemlist: my_itemlist,
                requestedUrl: req.protocol + '://' + req.get('Host') + req.url
            })
            console.log("run recipes.")
            console.log(begin)
            console.log(crafts)
            console.log(cur)
        }
        else
            res.render('index', {
                title: my_subtitle,
                basictech: my_recipes_module.basictech(),
                techlevel: my_recipes_module.techlevel,
                query: query,
                itemlist: my_itemlist
            })
    }
}

app.all('/', make_response_function("[ftb infinity evolved expert mode]", recipesevo));
app.all('/gt5u', make_response_function("[beyond reality mod pack]", recipes));
app.all('/infitech2', make_response_function("[infitech 2]", recipesinfi));

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
