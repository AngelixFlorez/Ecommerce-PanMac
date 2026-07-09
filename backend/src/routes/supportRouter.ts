import { Router } from "express";
import {
  createSupportTicket,
  createSupportVideoInvite,
  getSupportTicketChannel,
  listSupportTickets,
} from "../controllers/supportController";

const router = Router();

router.post("/", createSupportTicket);
router.get("/", listSupportTickets);
router.post("/:id/stream-channel", getSupportTicketChannel);
router.post("/:id/video-invite", createSupportVideoInvite);

export default router;
