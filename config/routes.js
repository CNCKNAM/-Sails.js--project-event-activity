/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  //"/": { view: "pages/homepage" },
  "GET /event/create": "EventController.create",
  "POST /event/create": "EventController.create",
  "GET /": "EventController.home",
  "GET /home": "EventController.home",
  "GET /admin": "EventController.admin",
  "GET /admin/home": "EventController.admin",
  "GET /event/read/:id": "EventController.read",
  "GET /event/search": "EventController.search",
  "GET /event/update/:id": "EventController.update",
  "POST /event/update/:id": "EventController.update",
  "GET /event/delete/:id": "EventController.delete",
  "POST /event/delete/:id": "EventController.delete",
  "GET /user": "UserController.login",
  "/user/login": "UserController.login",
  "POST /user/login": "UserController.login",
  "/user/logout": "UserController.logout",
  "GET /event/:id/participants": "EventController.populate",
  "GET /user/regevents": "UserController.populate",
  "POST /user/regevents/add/:fk": "UserController.add",
  "POST /user/regevents/remove/:fk": "UserController.remove",
  "GET /user/regevents/add/:fk": "UserController.add",
  "GET /user/regevents/remove/:fk": "UserController.remove",
  "GET /detail/:eventid/": "EventController.detail",
  "GET /detail/:eventid/": "EventController.detail",
  "GET /event/baginate": "EventController.baginate",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
