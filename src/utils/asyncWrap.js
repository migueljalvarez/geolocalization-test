export default (fn) => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(fn(req, res, next));
    } catch (err) {
      console.log(err)
      res.status(err.status || 500).json(err);
    }
  };
};
