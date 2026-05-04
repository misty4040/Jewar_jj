const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * Build a standard CRUD router for a Mongoose model.
 *
 *   GET    /            — list (public, sortable by `order` then createdAt)
 *   GET    /:id         — fetch one
 *   POST   /            — create (admin)
 *   PUT    /:id         — update (admin)
 *   DELETE /:id         — delete (admin)
 *
 * `populate` is an optional populate path passed to find/findById.
 * `listFilter(req)` may return an extra mongo filter for the list endpoint.
 */
function buildCrudRouter(Model, { populate, listFilter, defaultSort } = {}) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const filter = typeof listFilter === 'function' ? listFilter(req) : {};
            // public lists hide unpublished; admin can pass ?all=1
            if (!req.query.all) filter.published = { $ne: false };
            let q = Model.find(filter).sort(defaultSort || { order: 1, createdAt: -1 });
            if (populate) q = q.populate(populate);
            res.json(await q);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            let q = Model.findById(req.params.id);
            if (populate) q = q.populate(populate);
            const doc = await q;
            if (!doc) return res.status(404).json({ message: 'Not found' });
            res.json(doc);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    router.post('/', protect, adminOnly, async (req, res) => {
        try {
            const doc = await Model.create(req.body);
            res.status(201).json(doc);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    router.put('/:id', protect, adminOnly, async (req, res) => {
        try {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!doc) return res.status(404).json({ message: 'Not found' });
            res.json(doc);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    router.delete('/:id', protect, adminOnly, async (req, res) => {
        try {
            const doc = await Model.findByIdAndDelete(req.params.id);
            if (!doc) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
}

module.exports = { buildCrudRouter };
