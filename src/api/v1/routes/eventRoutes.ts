import { Router } from "express";
import {
    getEvents,
    getEvent,
    getPopularity,
    createEventController,
    updateEventController,
    deleteEventController
} from "../controllers/eventController";

const router = Router();

router.get("/events", getEvents);
router.get("/events/:id/popularity", getPopularity);
router.get("/events/:id", getEvent);
router.post("/events", createEventController);
router.put("/events/:id", updateEventController);
router.delete("/events/:id", deleteEventController);

export default router;