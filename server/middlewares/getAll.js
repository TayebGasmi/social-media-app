const getAll = (Model) => {
  return async (req, res) => {
    try {
      let { page = 1, limit = 10 } = req.query;
      limit = isNaN(limit) ? 10 : parseInt(limit);
      page = isNaN(page) ? 1 : parseInt(page);
      const documents = await Model.find({})
        .select({ firstName: 1 })
        .limit(limit * 1)
        .skip(limit * (page - 1))
        .lean()
        .exec();
      const count = await Model.find().count().lean().exec();
      if (documents.length === 0) return res.status(204).json(documents);
      return res.status(200).json({
        data: documents,
        currentPage: page,
        perviousPage: page - 1 || null,
        totalPages: Math.ceil(count / limit),
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
module.exports = { getAll };
