const router = require('express').Router();
const Foundation = require('../db/models/foundation');

// POST /get/foundations
router.get('/', async (req, res, next) => {
  try {
    const foundation = await Foundation.findAll();
    res.json(foundation);
  } catch (error) {
    next(error);
  }
});

// POST /api/foundations
router.post('/', async (req, res, next) => {
  try {
    const newFoundation = await Foundation.create(req.body);
    res.send(newFoundation);
  } catch (error) {
    next(error);
  }
});

// PUT /api/foundation/:foundationId - updates ratings
router.put('/:foundationId', async (req, res, next) => {
  try {
    const findFoundation = await Foundation.findById(req.params.foundationId);
    await findFoundation.update(req.body);
    res.json(findFoundation);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/foundation/:foundationId
router.delete('/:foundationId', async (req, res, next) => {
  try {
    await Foundation.destroy({
      where: {
        id: req.params.foundationId
      }
    });
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
