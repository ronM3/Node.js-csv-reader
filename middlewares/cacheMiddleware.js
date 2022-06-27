const cache = require("../service/cache");
const newCache = new cache.Cache();

module.exports = (req, res, next) => {
  let key = `${req.method}:${req.originalUrl}`;
  let body = cache.get(key);

  // console.log('first time the budy will be null '+ JSON.stringify(body));
  if (body) {
    setTimeout(function () {
      if (cache.get(key)) {
        console.log(key);
        cache.put(key, body);
      }
    }, 900000);
    return res.json(body);
  } else {
    res.jsonFunc = res.json;
    res.json = (body) => {
      cache.put(key, body);
      res.jsonFunc(body);
    };

    next();
  }
};
