const mongoose = require('mongoose');

/**
 * Validates that route parameters are valid MongoDB ObjectIds
 */
function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid ObjectId format for parameter '${paramName}'`,
      });
    }
    next();
  };
}

module.exports = { validateObjectId };
