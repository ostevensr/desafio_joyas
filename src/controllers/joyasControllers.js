import { solicitaJoyas,filtroJoyas } from '../models/joyas.models.js'

export const extraeJoyas = async(req,res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        const joyas = await solicitaJoyas({ limits: parseInt(limits), page: parseInt(page), order_by });
        res.json({
            joyas
    });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

export const joyasFiltradas = async (req, res) => {
    try {
      const joyas = await filtroJoyas(req.query);
      res.json(joyas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };