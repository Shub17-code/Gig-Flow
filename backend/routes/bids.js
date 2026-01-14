const express = require("express");
const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.id,
  });
  res.json(bid);
});

router.get("/:gigId", auth, async (req, res) => {
  res.json(await Bid.find({ gigId: req.params.gigId }));
});

router.patch("/:bidId/hire", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    const gig = await Gig.findOne({
      _id: bid.gigId,
      ownerId: req.user.id,
      status: "open",
    }).session(session);

    if (!gig) throw new Error("Already assigned");

    await Bid.updateOne({ _id: bid._id }, { status: "hired" }, { session });
    await Bid.updateMany(
      { gigId: bid.gigId, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );
    await Gig.updateOne(
      { _id: bid.gigId },
      { status: "assigned" },
      { session }
    );

    await session.commitTransaction();
    res.json({ msg: "Hired successfully" });
  } catch (e) {
    await session.abortTransaction();
    res.status(400).json({ msg: e.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
