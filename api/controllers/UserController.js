/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async function (req, res) {
    if (req.method == "GET") return res.view("user/login");

    if (!req.body.username || !req.body.password) return res.badRequest();

    var user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(401).json("User not found");

    if (user.password != req.body.password)
      return res.status(401).json("Wrong Password");

    // Start a new session for the new login user
    req.session.regenerate(function (err) {
      if (err) return res.serverError(err);

      req.session.username = user.username;
      req.session.userid = user.id;
      req.session.role = user.role;
      req.session.id = user.id;
      //return res.json(user);
      return res.redirect("/");
    });
  },
  logout: async function (req, res) {
    req.session.destroy(function (err) {
      if (err) return res.serverError(err);

      return res.redirect("/");
    });
  },
  populate: async function (req, res) {
    var perPage = Math.max(req.query.perPage, 3) || 3;
    var user = await User.findOne(req.session.userid).populate("regevents");
    if (!user) return res.notFound();
    var regevents = await user.regevents;
    var count = regevents.length;
    return res.view("student/myevents", { events: regevents, total: count });
  },
  add: async function (req, res) {
    if (!(await User.findOne(req.session.userid)))
      return res.status(404).json("User not found.");

    var thatEvent = await Event.findOne(req.params.fk).populate(
      "participants",
      { id: req.session.userid }
    );

    if (!thatEvent) return res.status(404).json("Event not found.");

    if (
      thatEvent.participants.length > 0 &&
      thatEvent.quota > thatEvent.regno
    ) {
      var currentquota = parseInt(thatEvent.regno) + 1;
      var updatedEvent = await Event.updateOne(req.params.fk).set({
        regno: currentquota,
      });

      if (!updatedEvent) return res.notFound();
      return res.status(409).json("Already added.");
    } // conflict

    await User.addToCollection(req.session.userid, "regevents").members(
      req.params.fk
    );

    return res.ok();
  },
  remove: async function (req, res) {
    if (!(await User.findOne(req.session.userid)))
      return res.status(404).json("User not found.");

    var thatEvent = await Event.findOne(req.params.fk).populate(
      "participants",
      { id: req.session.userid }
    );

    if (!thatEvent) return res.status(404).json("Event not found.");

    if (thatEvent.participants.length == 0)
      return res.status(409).json("Nothing to delete."); // conflict

    await User.removeFromCollection(req.session.userid, "regevents").members(
      req.params.fk
    );

    var currentquota = parseInt(thatEvent.regno) - 1;
    var updatedEvent = await Event.updateOne(req.params.fk).set({
      regno: currentquota,
    });

    if (!updatedEvent) return res.notFound();
    return res.ok();
  },
};
