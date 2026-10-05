import { Request, Response } from "express";
import {
    getAllEvents,
    getEventById,
    getEventPopularity,
    createEvent,
    updateEvent,
    deleteEvent
} from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export function getEvents(req: Request, res: Response): void {
    const events = getAllEvents();

    res.status(HTTP_STATUS.OK).json({
        events,
        count: events.length
    });
}

export function getEvent(req: Request, res: Response): void {
    const eventId = Number(req.params.id);
    const event = getEventById(eventId);

    if (!event) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json(event);
}

export function getPopularity(
    req: Request,
    res: Response
): void {
    const eventId = Number(req.params.id);
    const eventPopularity = getEventPopularity(eventId);

    if (!eventPopularity) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json(eventPopularity);
}

export function createEventController(req: Request, res: Response): void {
    const { name, date, capacity } = req.body;

    if (!name || !date || capacity === undefined) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Name, date, and capacity are required"
        });
        return;
    }

    const event = createEvent(name, date, capacity);

    res.status(HTTP_STATUS.CREATED).json(event);
}

export function updateEventController(req: Request, res: Response): void {
    const eventId = Number(req.params.id);

    if (!req.params.id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Event ID is required"
        });
        return;
    }

    const { name, date, capacity } = req.body;

    const event = updateEvent(eventId, name, date, capacity);

    if (!event) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json(event);
}

export function deleteEventController(req: Request, res: Response): void {
    const eventId = Number(req.params.id);

    const event = deleteEvent(eventId);

    if (!event) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json(event);
}
