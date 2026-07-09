import { Router } from "express";
import {
  createStreamChannel,
  createVideoInvite,
  getOrder,
  getUnreadCounts,
  listOrders,
} from "../controllers/orderController";

const router = Router();

router.get("/", listOrders);
router.get("/unread-counts", getUnreadCounts);
router.get("/:id", getOrder);
router.post("/:id/stream-channel", createStreamChannel);
router.post("/:id/video-invite", createVideoInvite);

export default router;