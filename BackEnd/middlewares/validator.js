function validate(schema) {
    return (req, res, next) => {
      try {
        // console.log("before try");
        const x = schema.validate(req.body);
        // console.log(x);
        // console.log("after try");
        if (x.error && x.error.message) {
          return res.status(400).send(x.error.message);
        }
      } catch (err) {
        console.log("HAGAAA MOMAAYAZAAAAAAAAAAAA");
        console.log(err);
        return res.status(400).send(err);
      }
      next();
    };
  }
  
  module.exports = validate;