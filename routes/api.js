/*global exports */

var pusherRef = null,
    userNames = [
        {'name': 'Billie Sue', 'inuse': 0},
        {'name': 'Billy Bob', 'inuse': 0},
        {'name': 'Billy Joe', 'inuse': 0},
        {'name': 'Bobbie Sue', 'inuse': 0},
        {'name': 'Betty Lou', 'inuse': 0},
        {'name': 'Betty Jo', 'inuse': 0},
        {'name': 'Bobby Jo', 'inuse': 0},
        {'name': 'Bubba', 'inuse': 0},
        {'name': 'Bo', 'inuse': 0},
        {'name': 'Bocephus', 'inuse': 0},
        {'name': 'Buck', 'inuse': 0},
        {'name': 'Sue Ellen', 'inuse': 0},
        {'name': 'Bodean', 'inuse': 0},
        {'name': 'Jimbo', 'inuse': 0},
        {'name': 'Jim Bob', 'inuse': 0},
        {'name': 'Lirlene', 'inuse': 0},
        {'name': 'Linda Sue', 'inuse': 0},
        {'name': 'Lori Belle', 'inuse': 0},
        {'name': 'Duke', 'inuse': 0},
        {'name': 'Martha May', 'inuse': 0},
        {'name': 'Mary Beth', 'inuse': 0},
        {'name': 'Mary Ellen', 'inuse': 0},
        {'name': 'Mary Sue', 'inuse': 0},
        {'name': 'Joe Don', 'inuse': 0},
        {'name': 'Woody Buck', 'inuse': 0},
        {'name': 'Jed Clyde', 'inuse': 0},
    ],
    seqNo = 0,
    namesLength = userNames.length,
    wndNameSeqNo = 0,
    env = {
        'host': "localhost",
        'port': "3035"
    };

function loadHeaders(req, res) {
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

/**
 * Headers
 */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    // res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    // if ('OPTIONS' == req.method) {
    //     res.send(200);
    // }
    // else {
    //     console.log("Fell through loadHeaders to next() call");
        // next();
    // }

}

exports.getAuth = function (req, res) {
    "use strict";
    console.log('getAuth');
    console.log('%s %s %s', req.method, req.url, req.path);
    console.log('req.body.socket_id is %s', req.body.socket_id);
    console.log('req.body.channel_name is %s', req.body.channel_name);
    var socketId = req.body.socket_id,
        channel = req.body.channel_name,
        auth = pusherRef.authenticate(socketId, channel);
    // loadHeaders(req, res);
    res.send(auth);
};

exports.setPusher = function (pshr) {
    "use strict";
    console.log("setPusher");
    pusherRef = pshr;
};

exports.setHostEnvironment = function (host, port) {
    "use strict";
    console.log("setHostEnvironment");
    console.log("host set to " + host + ", port set to " + port);
    env.host = host;
    env.port = port;
    console.log("Host set to " + env.host + ", port set to " + env.port);
};

exports.getHostEnvironment = function (req, res) {
    console.log("getHostEnvironment returning");
    console.log(env.host + ", " + env.port);
    // loadHeaders(req, res);
    res.json(env);
}

exports.getUserName = function (req, res) {
    "use strict";
    console.log("API getUserName");
    console.log('%s %s %s', req.method, req.url, req.path);
    if (seqNo === namesLength) {
        seqNo = 0;
        console.log("reset seqNo to zero");
    }
    console.log("return seqNo %s, name %s", seqNo, userNames[seqNo].name);
    loadHeaders(req, res);
    res.json({'id' : seqNo, 'name' : userNames[seqNo].name});
    seqNo++;
};


exports.getUserId = function (req, res) {
    "use strict";
    console.log("API getUserId");
    console.log('%s %s %s', req.method, req.url, req.path);
    if (seqNo === namesLength) {
        seqNo = 0;
        console.log("reset seqNo to zero");
    }
    console.log("return seqNo %s ", seqNo);
    // loadHeaders(req, res);
    res.json({'id' : seqNo});
    seqNo++;
};

exports.getNextWindowSeqNo = function (req, res) {
    "use strict";
    console.log("API wndNameSeqNo");

    console.log("return wndNameSeqNo %s ", wndNameSeqNo);
    res.json({'wndNameSeqNo' : wndNameSeqNo});
    // loadHeaders(req, res);
    wndNameSeqNo++;
};
