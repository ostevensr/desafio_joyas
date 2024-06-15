import { Router } from "express";
import { extraeJoyas, joyasFiltradas} from '../src/controllers/joyasControllers.js';

const router = Router();

router.get('/joyas', extraeJoyas);

router.get('/joyas/filtros', joyasFiltradas);

router.all('*', (req,res) => {
    res.status(404).json({error: 'Rut no Existe'})
});

export default router;