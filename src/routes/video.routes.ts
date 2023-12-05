import { Router } from "express";
import  VideoController  from "../controllers/VideoController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const videoRoutes = Router();
const videoController = new VideoController();

videoRoutes.post('/:user_id', ensureAuthenticated, videoController.create);
videoRoutes.get('/:user_id', ensureAuthenticated, videoController.show);
videoRoutes.get('/', videoController.search);
videoRoutes.delete('/:video_id', ensureAuthenticated, videoController.delete);

export default videoRoutes;