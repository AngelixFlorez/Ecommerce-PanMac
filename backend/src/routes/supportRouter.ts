import { Router } from "express";
import {
  createSupportTicket,
  getSupportTicketChannel,
  listSupportTickets,
} from "../controllers/supportController";

const router = Router();

router.post("/", createSupportTicket);
router.get("/", listSupportTickets);
router.post("/:id/stream-channel", getSupportTicketChannel);

export default router;
