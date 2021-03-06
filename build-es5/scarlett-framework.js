"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 _____                     _        _    _    ______                                                       _    
/  ___|                   | |      | |  | |   |  ___|                                                     | |   
\ `--.   ___   __ _  _ __ | |  ___ | |_ | |_  | |_    _ __   __ _  _ __ ___    ___ __      __  ___   _ __ | | __
 `--. \ / __| / _` || '__|| | / _ \| __|| __| |  _|  | '__| / _` || '_ ` _ \  / _ \\ \ /\ / / / _ \ | '__|| |/ /
/\__/ /| (__ | (_| || |   | ||  __/| |_ | |_  | |    | |   | (_| || | | | | ||  __/ \ V  V / | (_) || |   |   < 
\____/  \___| \__,_||_|   |_| \___| \__| \__| \_|    |_|    \__,_||_| |_| |_| \___|  \_/\_/   \___/ |_|   |_|\_\

More Information @ https://scarlett.anlagehub.com | https://github.com/scarlettgamestudio/


 **/
; /**
  * matter-js 0.10.0 by @liabru 2016-05-01
  * http://brm.io/matter-js/
  * License MIT
  */

/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Liam Brummitt
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function (f) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && define.amd) {
        define([], f);
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.Matter = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            /**
            * The `Matter.Body` module contains methods for creating and manipulating body models.
            * A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
            * Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            
            * @class Body
            */

            var Body = {};

            module.exports = Body;

            var Vertices = require('../geometry/Vertices');
            var Vector = require('../geometry/Vector');
            var Sleeping = require('../core/Sleeping');
            var Render = require('../render/Render');
            var Common = require('../core/Common');
            var Bounds = require('../geometry/Bounds');
            var Axes = require('../geometry/Axes');

            (function () {

                Body._inertiaScale = 4;
                Body._nextCollidingGroupId = 1;
                Body._nextNonCollidingGroupId = -1;
                Body._nextCategory = 0x0001;

                /**
                 * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
                 * All properties have default values, and many are pre-calculated automatically based on other properties.
                 * See the properties section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @param {} options
                 * @return {body} body
                 */
                Body.create = function (options) {
                    var defaults = {
                        id: Common.nextId(),
                        type: 'body',
                        label: 'Body',
                        parts: [],
                        angle: 0,
                        vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
                        position: { x: 0, y: 0 },
                        force: { x: 0, y: 0 },
                        torque: 0,
                        positionImpulse: { x: 0, y: 0 },
                        constraintImpulse: { x: 0, y: 0, angle: 0 },
                        totalContacts: 0,
                        speed: 0,
                        angularSpeed: 0,
                        velocity: { x: 0, y: 0 },
                        angularVelocity: 0,
                        isSensor: false,
                        isStatic: false,
                        isSleeping: false,
                        motion: 0,
                        sleepThreshold: 60,
                        density: 0.001,
                        restitution: 0,
                        friction: 0.1,
                        frictionStatic: 0.5,
                        frictionAir: 0.01,
                        collisionFilter: {
                            category: 0x0001,
                            mask: 0xFFFFFFFF,
                            group: 0
                        },
                        slop: 0.05,
                        timeScale: 1,
                        render: {
                            visible: true,
                            opacity: 1,
                            sprite: {
                                xScale: 1,
                                yScale: 1,
                                xOffset: 0,
                                yOffset: 0
                            },
                            lineWidth: 1.5
                        }
                    };

                    var body = Common.extend(defaults, options);

                    _initProperties(body, options);

                    return body;
                };

                /**
                 * Returns the next unique group index for which bodies will collide.
                 * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
                 * See `body.collisionFilter` for more information.
                 * @method nextGroup
                 * @param {bool} [isNonColliding=false]
                 * @return {Number} Unique group index
                 */
                Body.nextGroup = function (isNonColliding) {
                    if (isNonColliding) return Body._nextNonCollidingGroupId--;

                    return Body._nextCollidingGroupId++;
                };

                /**
                 * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
                 * There are 32 available. See `body.collisionFilter` for more information.
                 * @method nextCategory
                 * @return {Number} Unique category bitfield
                 */
                Body.nextCategory = function () {
                    Body._nextCategory = Body._nextCategory << 1;
                    return Body._nextCategory;
                };

                /**
                 * Initialises body properties.
                 * @method _initProperties
                 * @private
                 * @param {body} body
                 * @param {} options
                 */
                var _initProperties = function _initProperties(body, options) {
                    // init required properties (order is important)
                    Body.set(body, {
                        bounds: body.bounds || Bounds.create(body.vertices),
                        positionPrev: body.positionPrev || Vector.clone(body.position),
                        anglePrev: body.anglePrev || body.angle,
                        vertices: body.vertices,
                        parts: body.parts || [body],
                        isStatic: body.isStatic,
                        isSleeping: body.isSleeping,
                        parent: body.parent || body
                    });

                    Vertices.rotate(body.vertices, body.angle, body.position);
                    Axes.rotate(body.axes, body.angle);
                    Bounds.update(body.bounds, body.vertices, body.velocity);

                    // allow options to override the automatically calculated properties
                    Body.set(body, {
                        axes: options.axes || body.axes,
                        area: options.area || body.area,
                        mass: options.mass || body.mass,
                        inertia: options.inertia || body.inertia
                    });

                    // render properties
                    var defaultFillStyle = body.isStatic ? '#eeeeee' : Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']),
                        defaultStrokeStyle = Common.shadeColor(defaultFillStyle, -20);
                    body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
                    body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
                    body.render.sprite.xOffset += -(body.bounds.min.x - body.position.x) / (body.bounds.max.x - body.bounds.min.x);
                    body.render.sprite.yOffset += -(body.bounds.min.y - body.position.y) / (body.bounds.max.y - body.bounds.min.y);
                };

                /**
                 * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
                 * Prefer to use the actual setter functions in performance critical situations.
                 * @method set
                 * @param {body} body
                 * @param {} settings A property name (or map of properties and values) to set on the body.
                 * @param {} value The value to set if `settings` is a single property name.
                 */
                Body.set = function (body, settings, value) {
                    var property;

                    if (typeof settings === 'string') {
                        property = settings;
                        settings = {};
                        settings[property] = value;
                    }

                    for (property in settings) {
                        value = settings[property];

                        if (!settings.hasOwnProperty(property)) continue;

                        switch (property) {

                            case 'isStatic':
                                Body.setStatic(body, value);
                                break;
                            case 'isSleeping':
                                Sleeping.set(body, value);
                                break;
                            case 'mass':
                                Body.setMass(body, value);
                                break;
                            case 'density':
                                Body.setDensity(body, value);
                                break;
                            case 'inertia':
                                Body.setInertia(body, value);
                                break;
                            case 'vertices':
                                Body.setVertices(body, value);
                                break;
                            case 'position':
                                Body.setPosition(body, value);
                                break;
                            case 'angle':
                                Body.setAngle(body, value);
                                break;
                            case 'velocity':
                                Body.setVelocity(body, value);
                                break;
                            case 'angularVelocity':
                                Body.setAngularVelocity(body, value);
                                break;
                            case 'parts':
                                Body.setParts(body, value);
                                break;
                            default:
                                body[property] = value;

                        }
                    }
                };

                /**
                 * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
                 * @method setStatic
                 * @param {body} body
                 * @param {bool} isStatic
                 */
                Body.setStatic = function (body, isStatic) {
                    for (var i = 0; i < body.parts.length; i++) {
                        var part = body.parts[i];
                        part.isStatic = isStatic;

                        if (isStatic) {
                            part.restitution = 0;
                            part.friction = 1;
                            part.mass = part.inertia = part.density = Infinity;
                            part.inverseMass = part.inverseInertia = 0;

                            part.positionPrev.x = part.position.x;
                            part.positionPrev.y = part.position.y;
                            part.anglePrev = part.angle;
                            part.angularVelocity = 0;
                            part.speed = 0;
                            part.angularSpeed = 0;
                            part.motion = 0;
                        }
                    }
                };

                /**
                 * Sets the mass of the body. Inverse mass and density are automatically updated to reflect the change.
                 * @method setMass
                 * @param {body} body
                 * @param {number} mass
                 */
                Body.setMass = function (body, mass) {
                    body.mass = mass;
                    body.inverseMass = 1 / body.mass;
                    body.density = body.mass / body.area;
                };

                /**
                 * Sets the density of the body. Mass is automatically updated to reflect the change.
                 * @method setDensity
                 * @param {body} body
                 * @param {number} density
                 */
                Body.setDensity = function (body, density) {
                    Body.setMass(body, density * body.area);
                    body.density = density;
                };

                /**
                 * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
                 * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
                 * @method setInertia
                 * @param {body} body
                 * @param {number} inertia
                 */
                Body.setInertia = function (body, inertia) {
                    body.inertia = inertia;
                    body.inverseInertia = 1 / body.inertia;
                };

                /**
                 * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
                 * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
                 * They are then automatically translated to world space based on `body.position`.
                 *
                 * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
                 * Vertices must form a convex hull, concave hulls are not supported.
                 *
                 * @method setVertices
                 * @param {body} body
                 * @param {vector[]} vertices
                 */
                Body.setVertices = function (body, vertices) {
                    // change vertices
                    if (vertices[0].body === body) {
                        body.vertices = vertices;
                    } else {
                        body.vertices = Vertices.create(vertices, body);
                    }

                    // update properties
                    body.axes = Axes.fromVertices(body.vertices);
                    body.area = Vertices.area(body.vertices);
                    Body.setMass(body, body.density * body.area);

                    // orient vertices around the centre of mass at origin (0, 0)
                    var centre = Vertices.centre(body.vertices);
                    Vertices.translate(body.vertices, centre, -1);

                    // update inertia while vertices are at origin (0, 0)
                    Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

                    // update geometry
                    Vertices.translate(body.vertices, body.position);
                    Bounds.update(body.bounds, body.vertices, body.velocity);
                };

                /**
                 * Sets the parts of the `body` and updates mass, inertia and centroid.
                 * Each part will have its parent set to `body`.
                 * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
                 * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
                 * @method setParts
                 * @param {body} body
                 * @param [body] parts
                 * @param {bool} [autoHull=true]
                 */
                Body.setParts = function (body, parts, autoHull) {
                    var i;

                    // add all the parts, ensuring that the first part is always the parent body
                    parts = parts.slice(0);
                    body.parts.length = 0;
                    body.parts.push(body);
                    body.parent = body;

                    for (i = 0; i < parts.length; i++) {
                        var part = parts[i];
                        if (part !== body) {
                            part.parent = body;
                            body.parts.push(part);
                        }
                    }

                    if (body.parts.length === 1) return;

                    autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

                    // find the convex hull of all parts to set on the parent body
                    if (autoHull) {
                        var vertices = [];
                        for (i = 0; i < parts.length; i++) {
                            vertices = vertices.concat(parts[i].vertices);
                        }

                        Vertices.clockwiseSort(vertices);

                        var hull = Vertices.hull(vertices),
                            hullCentre = Vertices.centre(hull);

                        Body.setVertices(body, hull);
                        Vertices.translate(body.vertices, hullCentre);
                    }

                    // sum the properties of all compound parts of the parent body
                    var total = _totalProperties(body);

                    body.area = total.area;
                    body.parent = body;
                    body.position.x = total.centre.x;
                    body.position.y = total.centre.y;
                    body.positionPrev.x = total.centre.x;
                    body.positionPrev.y = total.centre.y;

                    Body.setMass(body, total.mass);
                    Body.setInertia(body, total.inertia);
                    Body.setPosition(body, total.centre);
                };

                /**
                 * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
                 * @method setPosition
                 * @param {body} body
                 * @param {vector} position
                 */
                Body.setPosition = function (body, position) {
                    var delta = Vector.sub(position, body.position);
                    body.positionPrev.x += delta.x;
                    body.positionPrev.y += delta.y;

                    for (var i = 0; i < body.parts.length; i++) {
                        var part = body.parts[i];
                        part.position.x += delta.x;
                        part.position.y += delta.y;
                        Vertices.translate(part.vertices, delta);
                        Bounds.update(part.bounds, part.vertices, body.velocity);
                    }
                };

                /**
                 * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
                 * @method setAngle
                 * @param {body} body
                 * @param {number} angle
                 */
                Body.setAngle = function (body, angle) {
                    var delta = angle - body.angle;
                    body.anglePrev += delta;

                    for (var i = 0; i < body.parts.length; i++) {
                        var part = body.parts[i];
                        part.angle += delta;
                        Vertices.rotate(part.vertices, delta, body.position);
                        Axes.rotate(part.axes, delta);
                        Bounds.update(part.bounds, part.vertices, body.velocity);
                        if (i > 0) {
                            Vector.rotateAbout(part.position, delta, body.position, part.position);
                        }
                    }
                };

                /**
                 * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
                 * @method setVelocity
                 * @param {body} body
                 * @param {vector} velocity
                 */
                Body.setVelocity = function (body, velocity) {
                    body.positionPrev.x = body.position.x - velocity.x;
                    body.positionPrev.y = body.position.y - velocity.y;
                    body.velocity.x = velocity.x;
                    body.velocity.y = velocity.y;
                    body.speed = Vector.magnitude(body.velocity);
                };

                /**
                 * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
                 * @method setAngularVelocity
                 * @param {body} body
                 * @param {number} velocity
                 */
                Body.setAngularVelocity = function (body, velocity) {
                    body.anglePrev = body.angle - velocity;
                    body.angularVelocity = velocity;
                    body.angularSpeed = Math.abs(body.angularVelocity);
                };

                /**
                 * Moves a body by a given vector relative to its current position, without imparting any velocity.
                 * @method translate
                 * @param {body} body
                 * @param {vector} translation
                 */
                Body.translate = function (body, translation) {
                    Body.setPosition(body, Vector.add(body.position, translation));
                };

                /**
                 * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
                 * @method rotate
                 * @param {body} body
                 * @param {number} rotation
                 */
                Body.rotate = function (body, rotation) {
                    Body.setAngle(body, body.angle + rotation);
                };

                /**
                 * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
                 * @method scale
                 * @param {body} body
                 * @param {number} scaleX
                 * @param {number} scaleY
                 * @param {vector} [point]
                 */
                Body.scale = function (body, scaleX, scaleY, point) {
                    for (var i = 0; i < body.parts.length; i++) {
                        var part = body.parts[i];

                        // scale vertices
                        Vertices.scale(part.vertices, scaleX, scaleY, body.position);

                        // update properties
                        part.axes = Axes.fromVertices(part.vertices);

                        if (!body.isStatic) {
                            part.area = Vertices.area(part.vertices);
                            Body.setMass(part, body.density * part.area);

                            // update inertia (requires vertices to be at origin)
                            Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
                            Body.setInertia(part, Vertices.inertia(part.vertices, part.mass));
                            Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });
                        }

                        // update bounds
                        Bounds.update(part.bounds, part.vertices, body.velocity);
                    }

                    // handle circles
                    if (body.circleRadius) {
                        if (scaleX === scaleY) {
                            body.circleRadius *= scaleX;
                        } else {
                            // body is no longer a circle
                            body.circleRadius = null;
                        }
                    }

                    if (!body.isStatic) {
                        var total = _totalProperties(body);
                        body.area = total.area;
                        Body.setMass(body, total.mass);
                        Body.setInertia(body, total.inertia);
                    }
                };

                /**
                 * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
                 * @method update
                 * @param {body} body
                 * @param {number} deltaTime
                 * @param {number} timeScale
                 * @param {number} correction
                 */
                Body.update = function (body, deltaTime, timeScale, correction) {
                    var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

                    // from the previous step
                    var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
                        velocityPrevX = body.position.x - body.positionPrev.x,
                        velocityPrevY = body.position.y - body.positionPrev.y;

                    // update velocity with Verlet integration
                    body.velocity.x = velocityPrevX * frictionAir * correction + body.force.x / body.mass * deltaTimeSquared;
                    body.velocity.y = velocityPrevY * frictionAir * correction + body.force.y / body.mass * deltaTimeSquared;

                    body.positionPrev.x = body.position.x;
                    body.positionPrev.y = body.position.y;
                    body.position.x += body.velocity.x;
                    body.position.y += body.velocity.y;

                    // update angular velocity with Verlet integration
                    body.angularVelocity = (body.angle - body.anglePrev) * frictionAir * correction + body.torque / body.inertia * deltaTimeSquared;
                    body.anglePrev = body.angle;
                    body.angle += body.angularVelocity;

                    // track speed and acceleration
                    body.speed = Vector.magnitude(body.velocity);
                    body.angularSpeed = Math.abs(body.angularVelocity);

                    // transform the body geometry
                    for (var i = 0; i < body.parts.length; i++) {
                        var part = body.parts[i];

                        Vertices.translate(part.vertices, body.velocity);

                        if (i > 0) {
                            part.position.x += body.velocity.x;
                            part.position.y += body.velocity.y;
                        }

                        if (body.angularVelocity !== 0) {
                            Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                            Axes.rotate(part.axes, body.angularVelocity);
                            if (i > 0) {
                                Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                            }
                        }

                        Bounds.update(part.bounds, part.vertices, body.velocity);
                    }
                };

                /**
                 * Applies a force to a body from a given world-space position, including resulting torque.
                 * @method applyForce
                 * @param {body} body
                 * @param {vector} position
                 * @param {vector} force
                 */
                Body.applyForce = function (body, position, force) {
                    body.force.x += force.x;
                    body.force.y += force.y;
                    var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
                    body.torque += offset.x * force.y - offset.y * force.x;
                };

                /**
                 * Returns the sums of the properties of all compound parts of the parent body.
                 * @method _totalProperties
                 * @private
                 * @param {body} body
                 * @return {}
                 */
                var _totalProperties = function _totalProperties(body) {
                    // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
                    // http://output.to/sideway/default.asp?qno=121100087

                    var properties = {
                        mass: 0,
                        area: 0,
                        inertia: 0,
                        centre: { x: 0, y: 0 }
                    };

                    // sum the properties of all compound parts of the parent body
                    for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
                        var part = body.parts[i];
                        properties.mass += part.mass;
                        properties.area += part.area;
                        properties.inertia += part.inertia;
                        properties.centre = Vector.add(properties.centre, Vector.mult(part.position, part.mass !== Infinity ? part.mass : 1));
                    }

                    properties.centre = Vector.div(properties.centre, properties.mass !== Infinity ? properties.mass : body.parts.length);

                    return properties;
                };

                /*
                *
                *  Events Documentation
                *
                */

                /**
                * Fired when a body starts sleeping (where `this` is the body).
                *
                * @event sleepStart
                * @this {body} The body that has started sleeping
                * @param {} event An event object
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when a body ends sleeping (where `this` is the body).
                *
                * @event sleepEnd
                * @this {body} The body that has ended sleeping
                * @param {} event An event object
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
                 *
                 * @property id
                 * @type number
                 */

                /**
                 * A `String` denoting the type of object.
                 *
                 * @property type
                 * @type string
                 * @default "body"
                 * @readOnly
                 */

                /**
                 * An arbitrary `String` name to help the user identify and manage bodies.
                 *
                 * @property label
                 * @type string
                 * @default "Body"
                 */

                /**
                 * An array of bodies that make up this body. 
                 * The first body in the array must always be a self reference to the current body instance.
                 * All bodies in the `parts` array together form a single rigid compound body.
                 * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
                 * Parts themselves should never be added to a `World`, only the parent body should be.
                 * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
                 *
                 * @property parts
                 * @type body[]
                 */

                /**
                 * A self reference if the body is _not_ a part of another body.
                 * Otherwise this is a reference to the body that this is a part of.
                 * See `body.parts`.
                 *
                 * @property parent
                 * @type body
                 */

                /**
                 * A `Number` specifying the angle of the body, in radians.
                 *
                 * @property angle
                 * @type number
                 * @default 0
                 */

                /**
                 * An array of `Vector` objects that specify the convex hull of the rigid body.
                 * These should be provided about the origin `(0, 0)`. E.g.
                 *
                 *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
                 *
                 * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
                 * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
                 *
                 * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
                 * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
                 *
                 * @property vertices
                 * @type vector[]
                 */

                /**
                 * A `Vector` that specifies the current world-space position of the body.
                 *
                 * @property position
                 * @type vector
                 * @default { x: 0, y: 0 }
                 */

                /**
                 * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
                 *
                 * @property force
                 * @type vector
                 * @default { x: 0, y: 0 }
                 */

                /**
                 * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
                 *
                 * @property torque
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
                 *
                 * @readOnly
                 * @property speed
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
                 *
                 * @readOnly
                 * @property angularSpeed
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
                 * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
                 *
                 * @readOnly
                 * @property velocity
                 * @type vector
                 * @default { x: 0, y: 0 }
                 */

                /**
                 * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
                 * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
                 *
                 * @readOnly
                 * @property angularVelocity
                 * @type number
                 * @default 0
                 */

                /**
                 * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
                 * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
                 *
                 * @property isStatic
                 * @type boolean
                 * @default false
                 */

                /**
                 * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
                 *
                 * @property isSensor
                 * @type boolean
                 * @default false
                 */

                /**
                 * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
                 * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
                 *
                 * @property isSleeping
                 * @type boolean
                 * @default false
                 */

                /**
                 * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
                 * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
                 *
                 * @readOnly
                 * @property motion
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
                 *
                 * @property sleepThreshold
                 * @type number
                 * @default 60
                 */

                /**
                 * A `Number` that defines the density of the body, that is its mass per unit area.
                 * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
                 * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
                 *
                 * @property density
                 * @type number
                 * @default 0.001
                 */

                /**
                 * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
                 * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
                 *
                 * @property mass
                 * @type number
                 */

                /**
                 * A `Number` that defines the inverse mass of the body (`1 / mass`).
                 * If you modify this value, you must also modify the `body.mass` property.
                 *
                 * @property inverseMass
                 * @type number
                 */

                /**
                 * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
                 * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
                 * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
                 *
                 * @property inertia
                 * @type number
                 */

                /**
                 * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
                 * If you modify this value, you must also modify the `body.inertia` property.
                 *
                 * @property inverseInertia
                 * @type number
                 */

                /**
                 * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
                 * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
                 * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
                 * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
                 *
                 *     Math.max(bodyA.restitution, bodyB.restitution)
                 *
                 * @property restitution
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
                 * A value of `0` means that the body may slide indefinitely.
                 * A value of `1` means the body may come to a stop almost instantly after a force is applied.
                 *
                 * The effects of the value may be non-linear. 
                 * High values may be unstable depending on the body.
                 * The engine uses a Coulomb friction model including static and kinetic friction.
                 * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
                 *
                 *     Math.min(bodyA.friction, bodyB.friction)
                 *
                 * @property friction
                 * @type number
                 * @default 0.1
                 */

                /**
                 * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
                 * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
                 * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
                 * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
                 *
                 * @property frictionStatic
                 * @type number
                 * @default 0.5
                 */

                /**
                 * A `Number` that defines the air friction of the body (air resistance). 
                 * A value of `0` means the body will never slow as it moves through space.
                 * The higher the value, the faster a body slows when moving through space.
                 * The effects of the value are non-linear. 
                 *
                 * @property frictionAir
                 * @type number
                 * @default 0.01
                 */

                /**
                 * An `Object` that specifies the collision filtering properties of this body.
                 *
                 * Collisions between two bodies will obey the following rules:
                 * - If the two bodies have the same non-zero value of `collisionFilter.group`,
                 *   they will always collide if the value is positive, and they will never collide
                 *   if the value is negative.
                 * - If the two bodies have different values of `collisionFilter.group` or if one
                 *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
                 *
                 * Each body belongs to a collision category, given by `collisionFilter.category`. This
                 * value is used as a bit field and the category should have only one bit set, meaning that
                 * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
                 * different collision categories available.
                 *
                 * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
                 * the categories it collides with (the value is the bitwise AND value of all these categories).
                 *
                 * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
                 * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
                 * are both true.
                 *
                 * @property collisionFilter
                 * @type object
                 */

                /**
                 * An Integer `Number`, that specifies the collision group this body belongs to.
                 * See `body.collisionFilter` for more information.
                 *
                 * @property collisionFilter.group
                 * @type object
                 * @default 0
                 */

                /**
                 * A bit field that specifies the collision category this body belongs to.
                 * The category value should have only one bit set, for example `0x0001`.
                 * This means there are up to 32 unique collision categories available.
                 * See `body.collisionFilter` for more information.
                 *
                 * @property collisionFilter.category
                 * @type object
                 * @default 1
                 */

                /**
                 * A bit mask that specifies the collision categories this body may collide with.
                 * See `body.collisionFilter` for more information.
                 *
                 * @property collisionFilter.mask
                 * @type object
                 * @default -1
                 */

                /**
                 * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
                 * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
                 * The default should generally suffice, although very large bodies may require larger values for stable stacking.
                 *
                 * @property slop
                 * @type number
                 * @default 0.05
                 */

                /**
                 * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
                 *
                 * @property timeScale
                 * @type number
                 * @default 1
                 */

                /**
                 * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
                 *
                 * @property render
                 * @type object
                 */

                /**
                 * A flag that indicates if the body should be rendered.
                 *
                 * @property render.visible
                 * @type boolean
                 * @default true
                 */

                /**
                 * Sets the opacity to use when rendering.
                 *
                 * @property render.opacity
                 * @type number
                 * @default 1
                */

                /**
                 * An `Object` that defines the sprite properties to use when rendering, if any.
                 *
                 * @property render.sprite
                 * @type object
                 */

                /**
                 * An `String` that defines the path to the image to use as the sprite texture, if any.
                 *
                 * @property render.sprite.texture
                 * @type string
                 */

                /**
                 * A `Number` that defines the scaling in the x-axis for the sprite, if any.
                 *
                 * @property render.sprite.xScale
                 * @type number
                 * @default 1
                 */

                /**
                 * A `Number` that defines the scaling in the y-axis for the sprite, if any.
                 *
                 * @property render.sprite.yScale
                 * @type number
                 * @default 1
                 */

                /**
                 * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
                 *
                 * @property render.sprite.xOffset
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
                 *
                 * @property render.sprite.yOffset
                 * @type number
                 * @default 0
                 */

                /**
                 * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
                 * A value of `0` means no outline will be rendered.
                 *
                 * @property render.lineWidth
                 * @type number
                 * @default 1.5
                 */

                /**
                 * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
                 * It is the same as when using a canvas, so it accepts CSS style property values.
                 *
                 * @property render.fillStyle
                 * @type string
                 * @default a random colour
                 */

                /**
                 * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
                 * It is the same as when using a canvas, so it accepts CSS style property values.
                 *
                 * @property render.strokeStyle
                 * @type string
                 * @default a random colour
                 */

                /**
                 * An array of unique axis vectors (edge normals) used for collision detection.
                 * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
                 * They are constantly updated by `Body.update` during the simulation.
                 *
                 * @property axes
                 * @type vector[]
                 */

                /**
                 * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
                 *
                 * @property area
                 * @type string
                 * @default 
                 */

                /**
                 * A `Bounds` object that defines the AABB region for the body.
                 * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
                 *
                 * @property bounds
                 * @type bounds
                 */
            })();
        }, { "../core/Common": 14, "../core/Sleeping": 20, "../geometry/Axes": 23, "../geometry/Bounds": 24, "../geometry/Vector": 26, "../geometry/Vertices": 27, "../render/Render": 29 }], 2: [function (require, module, exports) {
            /**
            * The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
            * A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
            * It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
            * Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Composite
            */

            var Composite = {};

            module.exports = Composite;

            var Events = require('../core/Events');
            var Common = require('../core/Common');
            var Body = require('./Body');

            (function () {

                /**
                 * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
                 * See the properites section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @param {} [options]
                 * @return {composite} A new composite
                 */
                Composite.create = function (options) {
                    return Common.extend({
                        id: Common.nextId(),
                        type: 'composite',
                        parent: null,
                        isModified: false,
                        bodies: [],
                        constraints: [],
                        composites: [],
                        label: 'Composite'
                    }, options);
                };

                /**
                 * Sets the composite's `isModified` flag. 
                 * If `updateParents` is true, all parents will be set (default: false).
                 * If `updateChildren` is true, all children will be set (default: false).
                 * @method setModified
                 * @param {composite} composite
                 * @param {boolean} isModified
                 * @param {boolean} [updateParents=false]
                 * @param {boolean} [updateChildren=false]
                 */
                Composite.setModified = function (composite, isModified, updateParents, updateChildren) {
                    composite.isModified = isModified;

                    if (updateParents && composite.parent) {
                        Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
                    }

                    if (updateChildren) {
                        for (var i = 0; i < composite.composites.length; i++) {
                            var childComposite = composite.composites[i];
                            Composite.setModified(childComposite, isModified, updateParents, updateChildren);
                        }
                    }
                };

                /**
                 * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
                 * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
                 * @method add
                 * @param {composite} composite
                 * @param {} object
                 * @return {composite} The original composite with the objects added
                 */
                Composite.add = function (composite, object) {
                    var objects = [].concat(object);

                    Events.trigger(composite, 'beforeAdd', { object: object });

                    for (var i = 0; i < objects.length; i++) {
                        var obj = objects[i];

                        switch (obj.type) {

                            case 'body':
                                // skip adding compound parts
                                if (obj.parent !== obj) {
                                    Common.log('Composite.add: skipped adding a compound body part (you must add its parent instead)', 'warn');
                                    break;
                                }

                                Composite.addBody(composite, obj);
                                break;
                            case 'constraint':
                                Composite.addConstraint(composite, obj);
                                break;
                            case 'composite':
                                Composite.addComposite(composite, obj);
                                break;
                            case 'mouseConstraint':
                                Composite.addConstraint(composite, obj.constraint);
                                break;

                        }
                    }

                    Events.trigger(composite, 'afterAdd', { object: object });

                    return composite;
                };

                /**
                 * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
                 * Optionally searching its children recursively.
                 * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
                 * @method remove
                 * @param {composite} composite
                 * @param {} object
                 * @param {boolean} [deep=false]
                 * @return {composite} The original composite with the objects removed
                 */
                Composite.remove = function (composite, object, deep) {
                    var objects = [].concat(object);

                    Events.trigger(composite, 'beforeRemove', { object: object });

                    for (var i = 0; i < objects.length; i++) {
                        var obj = objects[i];

                        switch (obj.type) {

                            case 'body':
                                Composite.removeBody(composite, obj, deep);
                                break;
                            case 'constraint':
                                Composite.removeConstraint(composite, obj, deep);
                                break;
                            case 'composite':
                                Composite.removeComposite(composite, obj, deep);
                                break;
                            case 'mouseConstraint':
                                Composite.removeConstraint(composite, obj.constraint);
                                break;

                        }
                    }

                    Events.trigger(composite, 'afterRemove', { object: object });

                    return composite;
                };

                /**
                 * Adds a composite to the given composite.
                 * @private
                 * @method addComposite
                 * @param {composite} compositeA
                 * @param {composite} compositeB
                 * @return {composite} The original compositeA with the objects from compositeB added
                 */
                Composite.addComposite = function (compositeA, compositeB) {
                    compositeA.composites.push(compositeB);
                    compositeB.parent = compositeA;
                    Composite.setModified(compositeA, true, true, false);
                    return compositeA;
                };

                /**
                 * Removes a composite from the given composite, and optionally searching its children recursively.
                 * @private
                 * @method removeComposite
                 * @param {composite} compositeA
                 * @param {composite} compositeB
                 * @param {boolean} [deep=false]
                 * @return {composite} The original compositeA with the composite removed
                 */
                Composite.removeComposite = function (compositeA, compositeB, deep) {
                    var position = Common.indexOf(compositeA.composites, compositeB);
                    if (position !== -1) {
                        Composite.removeCompositeAt(compositeA, position);
                        Composite.setModified(compositeA, true, true, false);
                    }

                    if (deep) {
                        for (var i = 0; i < compositeA.composites.length; i++) {
                            Composite.removeComposite(compositeA.composites[i], compositeB, true);
                        }
                    }

                    return compositeA;
                };

                /**
                 * Removes a composite from the given composite.
                 * @private
                 * @method removeCompositeAt
                 * @param {composite} composite
                 * @param {number} position
                 * @return {composite} The original composite with the composite removed
                 */
                Composite.removeCompositeAt = function (composite, position) {
                    composite.composites.splice(position, 1);
                    Composite.setModified(composite, true, true, false);
                    return composite;
                };

                /**
                 * Adds a body to the given composite.
                 * @private
                 * @method addBody
                 * @param {composite} composite
                 * @param {body} body
                 * @return {composite} The original composite with the body added
                 */
                Composite.addBody = function (composite, body) {
                    composite.bodies.push(body);
                    Composite.setModified(composite, true, true, false);
                    return composite;
                };

                /**
                 * Removes a body from the given composite, and optionally searching its children recursively.
                 * @private
                 * @method removeBody
                 * @param {composite} composite
                 * @param {body} body
                 * @param {boolean} [deep=false]
                 * @return {composite} The original composite with the body removed
                 */
                Composite.removeBody = function (composite, body, deep) {
                    var position = Common.indexOf(composite.bodies, body);
                    if (position !== -1) {
                        Composite.removeBodyAt(composite, position);
                        Composite.setModified(composite, true, true, false);
                    }

                    if (deep) {
                        for (var i = 0; i < composite.composites.length; i++) {
                            Composite.removeBody(composite.composites[i], body, true);
                        }
                    }

                    return composite;
                };

                /**
                 * Removes a body from the given composite.
                 * @private
                 * @method removeBodyAt
                 * @param {composite} composite
                 * @param {number} position
                 * @return {composite} The original composite with the body removed
                 */
                Composite.removeBodyAt = function (composite, position) {
                    composite.bodies.splice(position, 1);
                    Composite.setModified(composite, true, true, false);
                    return composite;
                };

                /**
                 * Adds a constraint to the given composite.
                 * @private
                 * @method addConstraint
                 * @param {composite} composite
                 * @param {constraint} constraint
                 * @return {composite} The original composite with the constraint added
                 */
                Composite.addConstraint = function (composite, constraint) {
                    composite.constraints.push(constraint);
                    Composite.setModified(composite, true, true, false);
                    return composite;
                };

                /**
                 * Removes a constraint from the given composite, and optionally searching its children recursively.
                 * @private
                 * @method removeConstraint
                 * @param {composite} composite
                 * @param {constraint} constraint
                 * @param {boolean} [deep=false]
                 * @return {composite} The original composite with the constraint removed
                 */
                Composite.removeConstraint = function (composite, constraint, deep) {
                    var position = Common.indexOf(composite.constraints, constraint);
                    if (position !== -1) {
                        Composite.removeConstraintAt(composite, position);
                    }

                    if (deep) {
                        for (var i = 0; i < composite.composites.length; i++) {
                            Composite.removeConstraint(composite.composites[i], constraint, true);
                        }
                    }

                    return composite;
                };

                /**
                 * Removes a body from the given composite.
                 * @private
                 * @method removeConstraintAt
                 * @param {composite} composite
                 * @param {number} position
                 * @return {composite} The original composite with the constraint removed
                 */
                Composite.removeConstraintAt = function (composite, position) {
                    composite.constraints.splice(position, 1);
                    Composite.setModified(composite, true, true, false);
                    return composite;
                };

                /**
                 * Removes all bodies, constraints and composites from the given composite.
                 * Optionally clearing its children recursively.
                 * @method clear
                 * @param {composite} composite
                 * @param {boolean} keepStatic
                 * @param {boolean} [deep=false]
                 */
                Composite.clear = function (composite, keepStatic, deep) {
                    if (deep) {
                        for (var i = 0; i < composite.composites.length; i++) {
                            Composite.clear(composite.composites[i], keepStatic, true);
                        }
                    }

                    if (keepStatic) {
                        composite.bodies = composite.bodies.filter(function (body) {
                            return body.isStatic;
                        });
                    } else {
                        composite.bodies.length = 0;
                    }

                    composite.constraints.length = 0;
                    composite.composites.length = 0;
                    Composite.setModified(composite, true, true, false);

                    return composite;
                };

                /**
                 * Returns all bodies in the given composite, including all bodies in its children, recursively.
                 * @method allBodies
                 * @param {composite} composite
                 * @return {body[]} All the bodies
                 */
                Composite.allBodies = function (composite) {
                    var bodies = [].concat(composite.bodies);

                    for (var i = 0; i < composite.composites.length; i++) {
                        bodies = bodies.concat(Composite.allBodies(composite.composites[i]));
                    }return bodies;
                };

                /**
                 * Returns all constraints in the given composite, including all constraints in its children, recursively.
                 * @method allConstraints
                 * @param {composite} composite
                 * @return {constraint[]} All the constraints
                 */
                Composite.allConstraints = function (composite) {
                    var constraints = [].concat(composite.constraints);

                    for (var i = 0; i < composite.composites.length; i++) {
                        constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));
                    }return constraints;
                };

                /**
                 * Returns all composites in the given composite, including all composites in its children, recursively.
                 * @method allComposites
                 * @param {composite} composite
                 * @return {composite[]} All the composites
                 */
                Composite.allComposites = function (composite) {
                    var composites = [].concat(composite.composites);

                    for (var i = 0; i < composite.composites.length; i++) {
                        composites = composites.concat(Composite.allComposites(composite.composites[i]));
                    }return composites;
                };

                /**
                 * Searches the composite recursively for an object matching the type and id supplied, null if not found.
                 * @method get
                 * @param {composite} composite
                 * @param {number} id
                 * @param {string} type
                 * @return {object} The requested object, if found
                 */
                Composite.get = function (composite, id, type) {
                    var objects, object;

                    switch (type) {
                        case 'body':
                            objects = Composite.allBodies(composite);
                            break;
                        case 'constraint':
                            objects = Composite.allConstraints(composite);
                            break;
                        case 'composite':
                            objects = Composite.allComposites(composite).concat(composite);
                            break;
                    }

                    if (!objects) return null;

                    object = objects.filter(function (object) {
                        return object.id.toString() === id.toString();
                    });

                    return object.length === 0 ? null : object[0];
                };

                /**
                 * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
                 * @method move
                 * @param {compositeA} compositeA
                 * @param {object[]} objects
                 * @param {compositeB} compositeB
                 * @return {composite} Returns compositeA
                 */
                Composite.move = function (compositeA, objects, compositeB) {
                    Composite.remove(compositeA, objects);
                    Composite.add(compositeB, objects);
                    return compositeA;
                };

                /**
                 * Assigns new ids for all objects in the composite, recursively.
                 * @method rebase
                 * @param {composite} composite
                 * @return {composite} Returns composite
                 */
                Composite.rebase = function (composite) {
                    var objects = Composite.allBodies(composite).concat(Composite.allConstraints(composite)).concat(Composite.allComposites(composite));

                    for (var i = 0; i < objects.length; i++) {
                        objects[i].id = Common.nextId();
                    }

                    Composite.setModified(composite, true, true, false);

                    return composite;
                };

                /**
                 * Translates all children in the composite by a given vector relative to their current positions, 
                 * without imparting any velocity.
                 * @method translate
                 * @param {composite} composite
                 * @param {vector} translation
                 * @param {bool} [recursive=true]
                 */
                Composite.translate = function (composite, translation, recursive) {
                    var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

                    for (var i = 0; i < bodies.length; i++) {
                        Body.translate(bodies[i], translation);
                    }

                    Composite.setModified(composite, true, true, false);

                    return composite;
                };

                /**
                 * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
                 * @method rotate
                 * @param {composite} composite
                 * @param {number} rotation
                 * @param {vector} point
                 * @param {bool} [recursive=true]
                 */
                Composite.rotate = function (composite, rotation, point, recursive) {
                    var cos = Math.cos(rotation),
                        sin = Math.sin(rotation),
                        bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i],
                            dx = body.position.x - point.x,
                            dy = body.position.y - point.y;

                        Body.setPosition(body, {
                            x: point.x + (dx * cos - dy * sin),
                            y: point.y + (dx * sin + dy * cos)
                        });

                        Body.rotate(body, rotation);
                    }

                    Composite.setModified(composite, true, true, false);

                    return composite;
                };

                /**
                 * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
                 * @method scale
                 * @param {composite} composite
                 * @param {number} scaleX
                 * @param {number} scaleY
                 * @param {vector} point
                 * @param {bool} [recursive=true]
                 */
                Composite.scale = function (composite, scaleX, scaleY, point, recursive) {
                    var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i],
                            dx = body.position.x - point.x,
                            dy = body.position.y - point.y;

                        Body.setPosition(body, {
                            x: point.x + dx * scaleX,
                            y: point.y + dy * scaleY
                        });

                        Body.scale(body, scaleX, scaleY);
                    }

                    Composite.setModified(composite, true, true, false);

                    return composite;
                };

                /*
                *
                *  Events Documentation
                *
                */

                /**
                * Fired when a call to `Composite.add` is made, before objects have been added.
                *
                * @event beforeAdd
                * @param {} event An event object
                * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when a call to `Composite.add` is made, after objects have been added.
                *
                * @event afterAdd
                * @param {} event An event object
                * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when a call to `Composite.remove` is made, before objects have been removed.
                *
                * @event beforeRemove
                * @param {} event An event object
                * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when a call to `Composite.remove` is made, after objects have been removed.
                *
                * @event afterRemove
                * @param {} event An event object
                * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
                 *
                 * @property id
                 * @type number
                 */

                /**
                 * A `String` denoting the type of object.
                 *
                 * @property type
                 * @type string
                 * @default "composite"
                 * @readOnly
                 */

                /**
                 * An arbitrary `String` name to help the user identify and manage composites.
                 *
                 * @property label
                 * @type string
                 * @default "Composite"
                 */

                /**
                 * A flag that specifies whether the composite has been modified during the current step.
                 * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
                 * If you need to change it manually, you should use the `Composite.setModified` method.
                 *
                 * @property isModified
                 * @type boolean
                 * @default false
                 */

                /**
                 * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
                 *
                 * @property parent
                 * @type composite
                 * @default null
                 */

                /**
                 * An array of `Body` that are _direct_ children of this composite.
                 * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
                 * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
                 *
                 * @property bodies
                 * @type body[]
                 * @default []
                 */

                /**
                 * An array of `Constraint` that are _direct_ children of this composite.
                 * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
                 * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
                 *
                 * @property constraints
                 * @type constraint[]
                 * @default []
                 */

                /**
                 * An array of `Composite` that are _direct_ children of this composite.
                 * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
                 * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
                 *
                 * @property composites
                 * @type composite[]
                 * @default []
                 */
            })();
        }, { "../core/Common": 14, "../core/Events": 16, "./Body": 1 }], 3: [function (require, module, exports) {
            /**
            * The `Matter.World` module contains methods for creating and manipulating the world composite.
            * A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
            * A `Matter.World` has a few additional properties including `gravity` and `bounds`.
            * It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
            * There are also a few methods here that alias those in `Matter.Composite` for easier readability.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class World
            * @extends Composite
            */

            var World = {};

            module.exports = World;

            var Composite = require('./Composite');
            var Constraint = require('../constraint/Constraint');
            var Common = require('../core/Common');

            (function () {

                /**
                 * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
                 * See the properties section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @constructor
                 * @param {} options
                 * @return {world} A new world
                 */
                World.create = function (options) {
                    var composite = Composite.create();

                    var defaults = {
                        label: 'World',
                        gravity: {
                            x: 0,
                            y: 1,
                            scale: 0.001
                        },
                        bounds: {
                            min: { x: -Infinity, y: -Infinity },
                            max: { x: Infinity, y: Infinity }
                        }
                    };

                    return Common.extend(composite, defaults, options);
                };

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * The gravity to apply on the world.
                 *
                 * @property gravity
                 * @type object
                 */

                /**
                 * The gravity x component.
                 *
                 * @property gravity.x
                 * @type object
                 * @default 0
                 */

                /**
                 * The gravity y component.
                 *
                 * @property gravity.y
                 * @type object
                 * @default 1
                 */

                /**
                 * The gravity scale factor.
                 *
                 * @property gravity.scale
                 * @type object
                 * @default 0.001
                 */

                /**
                 * A `Bounds` object that defines the world bounds for collision detection.
                 *
                 * @property bounds
                 * @type bounds
                 * @default { min: { x: -Infinity, y: -Infinity }, max: { x: Infinity, y: Infinity } }
                 */

                // World is a Composite body
                // see src/module/Outro.js for these aliases:

                /**
                 * An alias for Composite.clear
                 * @method clear
                 * @param {world} world
                 * @param {boolean} keepStatic
                 */

                /**
                 * An alias for Composite.add
                 * @method addComposite
                 * @param {world} world
                 * @param {composite} composite
                 * @return {world} The original world with the objects from composite added
                 */

                /**
                 * An alias for Composite.addBody
                 * @method addBody
                 * @param {world} world
                 * @param {body} body
                 * @return {world} The original world with the body added
                 */

                /**
                 * An alias for Composite.addConstraint
                 * @method addConstraint
                 * @param {world} world
                 * @param {constraint} constraint
                 * @return {world} The original world with the constraint added
                 */
            })();
        }, { "../constraint/Constraint": 12, "../core/Common": 14, "./Composite": 2 }], 4: [function (require, module, exports) {
            /**
            * The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
            *
            * @class Contact
            */

            var Contact = {};

            module.exports = Contact;

            (function () {

                /**
                 * Creates a new contact.
                 * @method create
                 * @param {vertex} vertex
                 * @return {contact} A new contact
                 */
                Contact.create = function (vertex) {
                    return {
                        id: Contact.id(vertex),
                        vertex: vertex,
                        normalImpulse: 0,
                        tangentImpulse: 0
                    };
                };

                /**
                 * Generates a contact id.
                 * @method id
                 * @param {vertex} vertex
                 * @return {string} Unique contactID
                 */
                Contact.id = function (vertex) {
                    return vertex.body.id + '_' + vertex.index;
                };
            })();
        }, {}], 5: [function (require, module, exports) {
            /**
            * The `Matter.Detector` module contains methods for detecting collisions given a set of pairs.
            *
            * @class Detector
            */

            // TODO: speculative contacts

            var Detector = {};

            module.exports = Detector;

            var SAT = require('./SAT');
            var Pair = require('./Pair');
            var Bounds = require('../geometry/Bounds');

            (function () {

                /**
                 * Finds all collisions given a list of pairs.
                 * @method collisions
                 * @param {pair[]} broadphasePairs
                 * @param {engine} engine
                 * @return {array} collisions
                 */
                Detector.collisions = function (broadphasePairs, engine) {
                    var collisions = [],
                        pairsTable = engine.pairs.table;

                    for (var i = 0; i < broadphasePairs.length; i++) {
                        var bodyA = broadphasePairs[i][0],
                            bodyB = broadphasePairs[i][1];

                        if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping)) continue;

                        if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter)) continue;

                        // mid phase
                        if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {
                            for (var j = bodyA.parts.length > 1 ? 1 : 0; j < bodyA.parts.length; j++) {
                                var partA = bodyA.parts[j];

                                for (var k = bodyB.parts.length > 1 ? 1 : 0; k < bodyB.parts.length; k++) {
                                    var partB = bodyB.parts[k];

                                    if (partA === bodyA && partB === bodyB || Bounds.overlaps(partA.bounds, partB.bounds)) {
                                        // find a previous collision we could reuse
                                        var pairId = Pair.id(partA, partB),
                                            pair = pairsTable[pairId],
                                            previousCollision;

                                        if (pair && pair.isActive) {
                                            previousCollision = pair.collision;
                                        } else {
                                            previousCollision = null;
                                        }

                                        // narrow phase
                                        var collision = SAT.collides(partA, partB, previousCollision);

                                        if (collision.collided) {
                                            collisions.push(collision);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return collisions;
                };

                /**
                 * Returns `true` if both supplied collision filters will allow a collision to occur.
                 * See `body.collisionFilter` for more information.
                 * @method canCollide
                 * @param {} filterA
                 * @param {} filterB
                 * @return {bool} `true` if collision can occur
                 */
                Detector.canCollide = function (filterA, filterB) {
                    if (filterA.group === filterB.group && filterA.group !== 0) return filterA.group > 0;

                    return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
                };
            })();
        }, { "../geometry/Bounds": 24, "./Pair": 7, "./SAT": 11 }], 6: [function (require, module, exports) {
            /**
            * The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
            *
            * @class Grid
            */

            var Grid = {};

            module.exports = Grid;

            var Pair = require('./Pair');
            var Detector = require('./Detector');
            var Common = require('../core/Common');

            (function () {

                /**
                 * Creates a new grid.
                 * @method create
                 * @param {} options
                 * @return {grid} A new grid
                 */
                Grid.create = function (options) {
                    var defaults = {
                        controller: Grid,
                        detector: Detector.collisions,
                        buckets: {},
                        pairs: {},
                        pairsList: [],
                        bucketWidth: 48,
                        bucketHeight: 48
                    };

                    return Common.extend(defaults, options);
                };

                /**
                 * The width of a single grid bucket.
                 *
                 * @property bucketWidth
                 * @type number
                 * @default 48
                 */

                /**
                 * The height of a single grid bucket.
                 *
                 * @property bucketHeight
                 * @type number
                 * @default 48
                 */

                /**
                 * Updates the grid.
                 * @method update
                 * @param {grid} grid
                 * @param {body[]} bodies
                 * @param {engine} engine
                 * @param {boolean} forceUpdate
                 */
                Grid.update = function (grid, bodies, engine, forceUpdate) {
                    var i,
                        col,
                        row,
                        world = engine.world,
                        buckets = grid.buckets,
                        bucket,
                        bucketId,
                        gridChanged = false;

                    for (i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (body.isSleeping && !forceUpdate) continue;

                        // don't update out of world bodies
                        if (body.bounds.max.x < world.bounds.min.x || body.bounds.min.x > world.bounds.max.x || body.bounds.max.y < world.bounds.min.y || body.bounds.min.y > world.bounds.max.y) continue;

                        var newRegion = _getRegion(grid, body);

                        // if the body has changed grid region
                        if (!body.region || newRegion.id !== body.region.id || forceUpdate) {

                            if (!body.region || forceUpdate) body.region = newRegion;

                            var union = _regionUnion(newRegion, body.region);

                            // update grid buckets affected by region change
                            // iterate over the union of both regions
                            for (col = union.startCol; col <= union.endCol; col++) {
                                for (row = union.startRow; row <= union.endRow; row++) {
                                    bucketId = _getBucketId(col, row);
                                    bucket = buckets[bucketId];

                                    var isInsideNewRegion = col >= newRegion.startCol && col <= newRegion.endCol && row >= newRegion.startRow && row <= newRegion.endRow;

                                    var isInsideOldRegion = col >= body.region.startCol && col <= body.region.endCol && row >= body.region.startRow && row <= body.region.endRow;

                                    // remove from old region buckets
                                    if (!isInsideNewRegion && isInsideOldRegion) {
                                        if (isInsideOldRegion) {
                                            if (bucket) _bucketRemoveBody(grid, bucket, body);
                                        }
                                    }

                                    // add to new region buckets
                                    if (body.region === newRegion || isInsideNewRegion && !isInsideOldRegion || forceUpdate) {
                                        if (!bucket) bucket = _createBucket(buckets, bucketId);
                                        _bucketAddBody(grid, bucket, body);
                                    }
                                }
                            }

                            // set the new region
                            body.region = newRegion;

                            // flag changes so we can update pairs
                            gridChanged = true;
                        }
                    }

                    // update pairs list only if pairs changed (i.e. a body changed region)
                    if (gridChanged) grid.pairsList = _createActivePairsList(grid);
                };

                /**
                 * Clears the grid.
                 * @method clear
                 * @param {grid} grid
                 */
                Grid.clear = function (grid) {
                    grid.buckets = {};
                    grid.pairs = {};
                    grid.pairsList = [];
                };

                /**
                 * Finds the union of two regions.
                 * @method _regionUnion
                 * @private
                 * @param {} regionA
                 * @param {} regionB
                 * @return {} region
                 */
                var _regionUnion = function _regionUnion(regionA, regionB) {
                    var startCol = Math.min(regionA.startCol, regionB.startCol),
                        endCol = Math.max(regionA.endCol, regionB.endCol),
                        startRow = Math.min(regionA.startRow, regionB.startRow),
                        endRow = Math.max(regionA.endRow, regionB.endRow);

                    return _createRegion(startCol, endCol, startRow, endRow);
                };

                /**
                 * Gets the region a given body falls in for a given grid.
                 * @method _getRegion
                 * @private
                 * @param {} grid
                 * @param {} body
                 * @return {} region
                 */
                var _getRegion = function _getRegion(grid, body) {
                    var bounds = body.bounds,
                        startCol = Math.floor(bounds.min.x / grid.bucketWidth),
                        endCol = Math.floor(bounds.max.x / grid.bucketWidth),
                        startRow = Math.floor(bounds.min.y / grid.bucketHeight),
                        endRow = Math.floor(bounds.max.y / grid.bucketHeight);

                    return _createRegion(startCol, endCol, startRow, endRow);
                };

                /**
                 * Creates a region.
                 * @method _createRegion
                 * @private
                 * @param {} startCol
                 * @param {} endCol
                 * @param {} startRow
                 * @param {} endRow
                 * @return {} region
                 */
                var _createRegion = function _createRegion(startCol, endCol, startRow, endRow) {
                    return {
                        id: startCol + ',' + endCol + ',' + startRow + ',' + endRow,
                        startCol: startCol,
                        endCol: endCol,
                        startRow: startRow,
                        endRow: endRow
                    };
                };

                /**
                 * Gets the bucket id at the given position.
                 * @method _getBucketId
                 * @private
                 * @param {} column
                 * @param {} row
                 * @return {string} bucket id
                 */
                var _getBucketId = function _getBucketId(column, row) {
                    return column + ',' + row;
                };

                /**
                 * Creates a bucket.
                 * @method _createBucket
                 * @private
                 * @param {} buckets
                 * @param {} bucketId
                 * @return {} bucket
                 */
                var _createBucket = function _createBucket(buckets, bucketId) {
                    var bucket = buckets[bucketId] = [];
                    return bucket;
                };

                /**
                 * Adds a body to a bucket.
                 * @method _bucketAddBody
                 * @private
                 * @param {} grid
                 * @param {} bucket
                 * @param {} body
                 */
                var _bucketAddBody = function _bucketAddBody(grid, bucket, body) {
                    // add new pairs
                    for (var i = 0; i < bucket.length; i++) {
                        var bodyB = bucket[i];

                        if (body.id === bodyB.id || body.isStatic && bodyB.isStatic) continue;

                        // keep track of the number of buckets the pair exists in
                        // important for Grid.update to work
                        var pairId = Pair.id(body, bodyB),
                            pair = grid.pairs[pairId];

                        if (pair) {
                            pair[2] += 1;
                        } else {
                            grid.pairs[pairId] = [body, bodyB, 1];
                        }
                    }

                    // add to bodies (after pairs, otherwise pairs with self)
                    bucket.push(body);
                };

                /**
                 * Removes a body from a bucket.
                 * @method _bucketRemoveBody
                 * @private
                 * @param {} grid
                 * @param {} bucket
                 * @param {} body
                 */
                var _bucketRemoveBody = function _bucketRemoveBody(grid, bucket, body) {
                    // remove from bucket
                    bucket.splice(Common.indexOf(bucket, body), 1);

                    // update pair counts
                    for (var i = 0; i < bucket.length; i++) {
                        // keep track of the number of buckets the pair exists in
                        // important for _createActivePairsList to work
                        var bodyB = bucket[i],
                            pairId = Pair.id(body, bodyB),
                            pair = grid.pairs[pairId];

                        if (pair) pair[2] -= 1;
                    }
                };

                /**
                 * Generates a list of the active pairs in the grid.
                 * @method _createActivePairsList
                 * @private
                 * @param {} grid
                 * @return [] pairs
                 */
                var _createActivePairsList = function _createActivePairsList(grid) {
                    var pairKeys,
                        pair,
                        pairs = [];

                    // grid.pairs is used as a hashmap
                    pairKeys = Common.keys(grid.pairs);

                    // iterate over grid.pairs
                    for (var k = 0; k < pairKeys.length; k++) {
                        pair = grid.pairs[pairKeys[k]];

                        // if pair exists in at least one bucket
                        // it is a pair that needs further collision testing so push it
                        if (pair[2] > 0) {
                            pairs.push(pair);
                        } else {
                            delete grid.pairs[pairKeys[k]];
                        }
                    }

                    return pairs;
                };
            })();
        }, { "../core/Common": 14, "./Detector": 5, "./Pair": 7 }], 7: [function (require, module, exports) {
            /**
            * The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
            *
            * @class Pair
            */

            var Pair = {};

            module.exports = Pair;

            var Contact = require('./Contact');

            (function () {

                /**
                 * Creates a pair.
                 * @method create
                 * @param {collision} collision
                 * @param {number} timestamp
                 * @return {pair} A new pair
                 */
                Pair.create = function (collision, timestamp) {
                    var bodyA = collision.bodyA,
                        bodyB = collision.bodyB,
                        parentA = collision.parentA,
                        parentB = collision.parentB;

                    var pair = {
                        id: Pair.id(bodyA, bodyB),
                        bodyA: bodyA,
                        bodyB: bodyB,
                        contacts: {},
                        activeContacts: [],
                        separation: 0,
                        isActive: true,
                        isSensor: bodyA.isSensor || bodyB.isSensor,
                        timeCreated: timestamp,
                        timeUpdated: timestamp,
                        inverseMass: parentA.inverseMass + parentB.inverseMass,
                        friction: Math.min(parentA.friction, parentB.friction),
                        frictionStatic: Math.max(parentA.frictionStatic, parentB.frictionStatic),
                        restitution: Math.max(parentA.restitution, parentB.restitution),
                        slop: Math.max(parentA.slop, parentB.slop)
                    };

                    Pair.update(pair, collision, timestamp);

                    return pair;
                };

                /**
                 * Updates a pair given a collision.
                 * @method update
                 * @param {pair} pair
                 * @param {collision} collision
                 * @param {number} timestamp
                 */
                Pair.update = function (pair, collision, timestamp) {
                    var contacts = pair.contacts,
                        supports = collision.supports,
                        activeContacts = pair.activeContacts,
                        parentA = collision.parentA,
                        parentB = collision.parentB;

                    pair.collision = collision;
                    pair.inverseMass = parentA.inverseMass + parentB.inverseMass;
                    pair.friction = Math.min(parentA.friction, parentB.friction);
                    pair.frictionStatic = Math.max(parentA.frictionStatic, parentB.frictionStatic);
                    pair.restitution = Math.max(parentA.restitution, parentB.restitution);
                    pair.slop = Math.max(parentA.slop, parentB.slop);
                    activeContacts.length = 0;

                    if (collision.collided) {
                        for (var i = 0; i < supports.length; i++) {
                            var support = supports[i],
                                contactId = Contact.id(support),
                                contact = contacts[contactId];

                            if (contact) {
                                activeContacts.push(contact);
                            } else {
                                activeContacts.push(contacts[contactId] = Contact.create(support));
                            }
                        }

                        pair.separation = collision.depth;
                        Pair.setActive(pair, true, timestamp);
                    } else {
                        if (pair.isActive === true) Pair.setActive(pair, false, timestamp);
                    }
                };

                /**
                 * Set a pair as active or inactive.
                 * @method setActive
                 * @param {pair} pair
                 * @param {bool} isActive
                 * @param {number} timestamp
                 */
                Pair.setActive = function (pair, isActive, timestamp) {
                    if (isActive) {
                        pair.isActive = true;
                        pair.timeUpdated = timestamp;
                    } else {
                        pair.isActive = false;
                        pair.activeContacts.length = 0;
                    }
                };

                /**
                 * Get the id for the given pair.
                 * @method id
                 * @param {body} bodyA
                 * @param {body} bodyB
                 * @return {string} Unique pairId
                 */
                Pair.id = function (bodyA, bodyB) {
                    if (bodyA.id < bodyB.id) {
                        return bodyA.id + '_' + bodyB.id;
                    } else {
                        return bodyB.id + '_' + bodyA.id;
                    }
                };
            })();
        }, { "./Contact": 4 }], 8: [function (require, module, exports) {
            /**
            * The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
            *
            * @class Pairs
            */

            var Pairs = {};

            module.exports = Pairs;

            var Pair = require('./Pair');
            var Common = require('../core/Common');

            (function () {

                var _pairMaxIdleLife = 1000;

                /**
                 * Creates a new pairs structure.
                 * @method create
                 * @param {object} options
                 * @return {pairs} A new pairs structure
                 */
                Pairs.create = function (options) {
                    return Common.extend({
                        table: {},
                        list: [],
                        collisionStart: [],
                        collisionActive: [],
                        collisionEnd: []
                    }, options);
                };

                /**
                 * Updates pairs given a list of collisions.
                 * @method update
                 * @param {object} pairs
                 * @param {collision[]} collisions
                 * @param {number} timestamp
                 */
                Pairs.update = function (pairs, collisions, timestamp) {
                    var pairsList = pairs.list,
                        pairsTable = pairs.table,
                        collisionStart = pairs.collisionStart,
                        collisionEnd = pairs.collisionEnd,
                        collisionActive = pairs.collisionActive,
                        activePairIds = [],
                        collision,
                        pairId,
                        pair,
                        i;

                    // clear collision state arrays, but maintain old reference
                    collisionStart.length = 0;
                    collisionEnd.length = 0;
                    collisionActive.length = 0;

                    for (i = 0; i < collisions.length; i++) {
                        collision = collisions[i];

                        if (collision.collided) {
                            pairId = Pair.id(collision.bodyA, collision.bodyB);
                            activePairIds.push(pairId);

                            pair = pairsTable[pairId];

                            if (pair) {
                                // pair already exists (but may or may not be active)
                                if (pair.isActive) {
                                    // pair exists and is active
                                    collisionActive.push(pair);
                                } else {
                                    // pair exists but was inactive, so a collision has just started again
                                    collisionStart.push(pair);
                                }

                                // update the pair
                                Pair.update(pair, collision, timestamp);
                            } else {
                                // pair did not exist, create a new pair
                                pair = Pair.create(collision, timestamp);
                                pairsTable[pairId] = pair;

                                // push the new pair
                                collisionStart.push(pair);
                                pairsList.push(pair);
                            }
                        }
                    }

                    // deactivate previously active pairs that are now inactive
                    for (i = 0; i < pairsList.length; i++) {
                        pair = pairsList[i];
                        if (pair.isActive && Common.indexOf(activePairIds, pair.id) === -1) {
                            Pair.setActive(pair, false, timestamp);
                            collisionEnd.push(pair);
                        }
                    }
                };

                /**
                 * Finds and removes pairs that have been inactive for a set amount of time.
                 * @method removeOld
                 * @param {object} pairs
                 * @param {number} timestamp
                 */
                Pairs.removeOld = function (pairs, timestamp) {
                    var pairsList = pairs.list,
                        pairsTable = pairs.table,
                        indexesToRemove = [],
                        pair,
                        collision,
                        pairIndex,
                        i;

                    for (i = 0; i < pairsList.length; i++) {
                        pair = pairsList[i];
                        collision = pair.collision;

                        // never remove sleeping pairs
                        if (collision.bodyA.isSleeping || collision.bodyB.isSleeping) {
                            pair.timeUpdated = timestamp;
                            continue;
                        }

                        // if pair is inactive for too long, mark it to be removed
                        if (timestamp - pair.timeUpdated > _pairMaxIdleLife) {
                            indexesToRemove.push(i);
                        }
                    }

                    // remove marked pairs
                    for (i = 0; i < indexesToRemove.length; i++) {
                        pairIndex = indexesToRemove[i] - i;
                        pair = pairsList[pairIndex];
                        delete pairsTable[pair.id];
                        pairsList.splice(pairIndex, 1);
                    }
                };

                /**
                 * Clears the given pairs structure.
                 * @method clear
                 * @param {pairs} pairs
                 * @return {pairs} pairs
                 */
                Pairs.clear = function (pairs) {
                    pairs.table = {};
                    pairs.list.length = 0;
                    pairs.collisionStart.length = 0;
                    pairs.collisionActive.length = 0;
                    pairs.collisionEnd.length = 0;
                    return pairs;
                };
            })();
        }, { "../core/Common": 14, "./Pair": 7 }], 9: [function (require, module, exports) {
            /**
            * The `Matter.Query` module contains methods for performing collision queries.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Query
            */

            var Query = {};

            module.exports = Query;

            var Vector = require('../geometry/Vector');
            var SAT = require('./SAT');
            var Bounds = require('../geometry/Bounds');
            var Bodies = require('../factory/Bodies');
            var Vertices = require('../geometry/Vertices');

            (function () {

                /**
                 * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
                 * @method ray
                 * @param {body[]} bodies
                 * @param {vector} startPoint
                 * @param {vector} endPoint
                 * @param {number} [rayWidth]
                 * @return {object[]} Collisions
                 */
                Query.ray = function (bodies, startPoint, endPoint, rayWidth) {
                    rayWidth = rayWidth || 1e-100;

                    var rayAngle = Vector.angle(startPoint, endPoint),
                        rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)),
                        rayX = (endPoint.x + startPoint.x) * 0.5,
                        rayY = (endPoint.y + startPoint.y) * 0.5,
                        ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }),
                        collisions = [];

                    for (var i = 0; i < bodies.length; i++) {
                        var bodyA = bodies[i];

                        if (Bounds.overlaps(bodyA.bounds, ray.bounds)) {
                            for (var j = bodyA.parts.length === 1 ? 0 : 1; j < bodyA.parts.length; j++) {
                                var part = bodyA.parts[j];

                                if (Bounds.overlaps(part.bounds, ray.bounds)) {
                                    var collision = SAT.collides(part, ray);
                                    if (collision.collided) {
                                        collision.body = collision.bodyA = collision.bodyB = bodyA;
                                        collisions.push(collision);
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    return collisions;
                };

                /**
                 * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
                 * @method region
                 * @param {body[]} bodies
                 * @param {bounds} bounds
                 * @param {bool} [outside=false]
                 * @return {body[]} The bodies matching the query
                 */
                Query.region = function (bodies, bounds, outside) {
                    var result = [];

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i],
                            overlaps = Bounds.overlaps(body.bounds, bounds);
                        if (overlaps && !outside || !overlaps && outside) result.push(body);
                    }

                    return result;
                };

                /**
                 * Returns all bodies whose vertices contain the given point, from the given set of bodies.
                 * @method point
                 * @param {body[]} bodies
                 * @param {vector} point
                 * @return {body[]} The bodies matching the query
                 */
                Query.point = function (bodies, point) {
                    var result = [];

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (Bounds.contains(body.bounds, point)) {
                            for (var j = body.parts.length === 1 ? 0 : 1; j < body.parts.length; j++) {
                                var part = body.parts[j];

                                if (Bounds.contains(part.bounds, point) && Vertices.contains(part.vertices, point)) {
                                    result.push(body);
                                    break;
                                }
                            }
                        }
                    }

                    return result;
                };
            })();
        }, { "../factory/Bodies": 21, "../geometry/Bounds": 24, "../geometry/Vector": 26, "../geometry/Vertices": 27, "./SAT": 11 }], 10: [function (require, module, exports) {
            /**
            * The `Matter.Resolver` module contains methods for resolving collision pairs.
            *
            * @class Resolver
            */

            var Resolver = {};

            module.exports = Resolver;

            var Vertices = require('../geometry/Vertices');
            var Vector = require('../geometry/Vector');
            var Common = require('../core/Common');
            var Bounds = require('../geometry/Bounds');

            (function () {

                Resolver._restingThresh = 4;
                Resolver._restingThreshTangent = 6;
                Resolver._positionDampen = 0.9;
                Resolver._positionWarming = 0.8;
                Resolver._frictionNormalMultiplier = 5;

                /**
                 * Prepare pairs for position solving.
                 * @method preSolvePosition
                 * @param {pair[]} pairs
                 */
                Resolver.preSolvePosition = function (pairs) {
                    var i, pair, activeCount;

                    // find total contacts on each body
                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive) continue;

                        activeCount = pair.activeContacts.length;
                        pair.collision.parentA.totalContacts += activeCount;
                        pair.collision.parentB.totalContacts += activeCount;
                    }
                };

                /**
                 * Find a solution for pair positions.
                 * @method solvePosition
                 * @param {pair[]} pairs
                 * @param {number} timeScale
                 */
                Resolver.solvePosition = function (pairs, timeScale) {
                    var i,
                        pair,
                        collision,
                        bodyA,
                        bodyB,
                        normal,
                        bodyBtoA,
                        contactShare,
                        positionImpulse,
                        contactCount = {},
                        tempA = Vector._temp[0],
                        tempB = Vector._temp[1],
                        tempC = Vector._temp[2],
                        tempD = Vector._temp[3];

                    // find impulses required to resolve penetration
                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive || pair.isSensor) continue;

                        collision = pair.collision;
                        bodyA = collision.parentA;
                        bodyB = collision.parentB;
                        normal = collision.normal;

                        // get current separation between body edges involved in collision
                        bodyBtoA = Vector.sub(Vector.add(bodyB.positionImpulse, bodyB.position, tempA), Vector.add(bodyA.positionImpulse, Vector.sub(bodyB.position, collision.penetration, tempB), tempC), tempD);

                        pair.separation = Vector.dot(normal, bodyBtoA);
                    }

                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive || pair.isSensor || pair.separation < 0) continue;

                        collision = pair.collision;
                        bodyA = collision.parentA;
                        bodyB = collision.parentB;
                        normal = collision.normal;
                        positionImpulse = (pair.separation - pair.slop) * timeScale;

                        if (bodyA.isStatic || bodyB.isStatic) positionImpulse *= 2;

                        if (!(bodyA.isStatic || bodyA.isSleeping)) {
                            contactShare = Resolver._positionDampen / bodyA.totalContacts;
                            bodyA.positionImpulse.x += normal.x * positionImpulse * contactShare;
                            bodyA.positionImpulse.y += normal.y * positionImpulse * contactShare;
                        }

                        if (!(bodyB.isStatic || bodyB.isSleeping)) {
                            contactShare = Resolver._positionDampen / bodyB.totalContacts;
                            bodyB.positionImpulse.x -= normal.x * positionImpulse * contactShare;
                            bodyB.positionImpulse.y -= normal.y * positionImpulse * contactShare;
                        }
                    }
                };

                /**
                 * Apply position resolution.
                 * @method postSolvePosition
                 * @param {body[]} bodies
                 */
                Resolver.postSolvePosition = function (bodies) {
                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        // reset contact count
                        body.totalContacts = 0;

                        if (body.positionImpulse.x !== 0 || body.positionImpulse.y !== 0) {
                            // update body geometry
                            for (var j = 0; j < body.parts.length; j++) {
                                var part = body.parts[j];
                                Vertices.translate(part.vertices, body.positionImpulse);
                                Bounds.update(part.bounds, part.vertices, body.velocity);
                                part.position.x += body.positionImpulse.x;
                                part.position.y += body.positionImpulse.y;
                            }

                            // move the body without changing velocity
                            body.positionPrev.x += body.positionImpulse.x;
                            body.positionPrev.y += body.positionImpulse.y;

                            if (Vector.dot(body.positionImpulse, body.velocity) < 0) {
                                // reset cached impulse if the body has velocity along it
                                body.positionImpulse.x = 0;
                                body.positionImpulse.y = 0;
                            } else {
                                // warm the next iteration
                                body.positionImpulse.x *= Resolver._positionWarming;
                                body.positionImpulse.y *= Resolver._positionWarming;
                            }
                        }
                    }
                };

                /**
                 * Prepare pairs for velocity solving.
                 * @method preSolveVelocity
                 * @param {pair[]} pairs
                 */
                Resolver.preSolveVelocity = function (pairs) {
                    var i,
                        j,
                        pair,
                        contacts,
                        collision,
                        bodyA,
                        bodyB,
                        normal,
                        tangent,
                        contact,
                        contactVertex,
                        normalImpulse,
                        tangentImpulse,
                        offset,
                        impulse = Vector._temp[0],
                        tempA = Vector._temp[1];

                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive || pair.isSensor) continue;

                        contacts = pair.activeContacts;
                        collision = pair.collision;
                        bodyA = collision.parentA;
                        bodyB = collision.parentB;
                        normal = collision.normal;
                        tangent = collision.tangent;

                        // resolve each contact
                        for (j = 0; j < contacts.length; j++) {
                            contact = contacts[j];
                            contactVertex = contact.vertex;
                            normalImpulse = contact.normalImpulse;
                            tangentImpulse = contact.tangentImpulse;

                            if (normalImpulse !== 0 || tangentImpulse !== 0) {
                                // total impulse from contact
                                impulse.x = normal.x * normalImpulse + tangent.x * tangentImpulse;
                                impulse.y = normal.y * normalImpulse + tangent.y * tangentImpulse;

                                // apply impulse from contact
                                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                                    offset = Vector.sub(contactVertex, bodyA.position, tempA);
                                    bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                                    bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                                    bodyA.anglePrev += Vector.cross(offset, impulse) * bodyA.inverseInertia;
                                }

                                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                                    offset = Vector.sub(contactVertex, bodyB.position, tempA);
                                    bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                                    bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                                    bodyB.anglePrev -= Vector.cross(offset, impulse) * bodyB.inverseInertia;
                                }
                            }
                        }
                    }
                };

                /**
                 * Find a solution for pair velocities.
                 * @method solveVelocity
                 * @param {pair[]} pairs
                 * @param {number} timeScale
                 */
                Resolver.solveVelocity = function (pairs, timeScale) {
                    var timeScaleSquared = timeScale * timeScale,
                        impulse = Vector._temp[0],
                        tempA = Vector._temp[1],
                        tempB = Vector._temp[2],
                        tempC = Vector._temp[3],
                        tempD = Vector._temp[4],
                        tempE = Vector._temp[5];

                    for (var i = 0; i < pairs.length; i++) {
                        var pair = pairs[i];

                        if (!pair.isActive || pair.isSensor) continue;

                        var collision = pair.collision,
                            bodyA = collision.parentA,
                            bodyB = collision.parentB,
                            normal = collision.normal,
                            tangent = collision.tangent,
                            contacts = pair.activeContacts,
                            contactShare = 1 / contacts.length;

                        // update body velocities
                        bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
                        bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
                        bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
                        bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
                        bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
                        bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

                        // resolve each contact
                        for (var j = 0; j < contacts.length; j++) {
                            var contact = contacts[j],
                                contactVertex = contact.vertex,
                                offsetA = Vector.sub(contactVertex, bodyA.position, tempA),
                                offsetB = Vector.sub(contactVertex, bodyB.position, tempB),
                                velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity), tempC),
                                velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity), tempD),
                                relativeVelocity = Vector.sub(velocityPointA, velocityPointB, tempE),
                                normalVelocity = Vector.dot(normal, relativeVelocity);

                            var tangentVelocity = Vector.dot(tangent, relativeVelocity),
                                tangentSpeed = Math.abs(tangentVelocity),
                                tangentVelocityDirection = Common.sign(tangentVelocity);

                            // raw impulses
                            var normalImpulse = (1 + pair.restitution) * normalVelocity,
                                normalForce = Common.clamp(pair.separation + normalVelocity, 0, 1) * Resolver._frictionNormalMultiplier;

                            // coulomb friction
                            var tangentImpulse = tangentVelocity,
                                maxFriction = Infinity;

                            if (tangentSpeed > pair.friction * pair.frictionStatic * normalForce * timeScaleSquared) {
                                maxFriction = tangentSpeed;
                                tangentImpulse = Common.clamp(pair.friction * tangentVelocityDirection * timeScaleSquared, -maxFriction, maxFriction);
                            }

                            // modify impulses accounting for mass, inertia and offset
                            var oAcN = Vector.cross(offsetA, normal),
                                oBcN = Vector.cross(offsetB, normal),
                                share = contactShare / (bodyA.inverseMass + bodyB.inverseMass + bodyA.inverseInertia * oAcN * oAcN + bodyB.inverseInertia * oBcN * oBcN);

                            normalImpulse *= share;
                            tangentImpulse *= share;

                            // handle high velocity and resting collisions separately
                            if (normalVelocity < 0 && normalVelocity * normalVelocity > Resolver._restingThresh * timeScaleSquared) {
                                // high normal velocity so clear cached contact normal impulse
                                contact.normalImpulse = 0;
                            } else {
                                // solve resting collision constraints using Erin Catto's method (GDC08)
                                // impulse constraint tends to 0
                                var contactNormalImpulse = contact.normalImpulse;
                                contact.normalImpulse = Math.min(contact.normalImpulse + normalImpulse, 0);
                                normalImpulse = contact.normalImpulse - contactNormalImpulse;
                            }

                            // handle high velocity and resting collisions separately
                            if (tangentVelocity * tangentVelocity > Resolver._restingThreshTangent * timeScaleSquared) {
                                // high tangent velocity so clear cached contact tangent impulse
                                contact.tangentImpulse = 0;
                            } else {
                                // solve resting collision constraints using Erin Catto's method (GDC08)
                                // tangent impulse tends to -tangentSpeed or +tangentSpeed
                                var contactTangentImpulse = contact.tangentImpulse;
                                contact.tangentImpulse = Common.clamp(contact.tangentImpulse + tangentImpulse, -maxFriction, maxFriction);
                                tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                            }

                            // total impulse from contact
                            impulse.x = normal.x * normalImpulse + tangent.x * tangentImpulse;
                            impulse.y = normal.y * normalImpulse + tangent.y * tangentImpulse;

                            // apply impulse from contact
                            if (!(bodyA.isStatic || bodyA.isSleeping)) {
                                bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                                bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                                bodyA.anglePrev += Vector.cross(offsetA, impulse) * bodyA.inverseInertia;
                            }

                            if (!(bodyB.isStatic || bodyB.isSleeping)) {
                                bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                                bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                                bodyB.anglePrev -= Vector.cross(offsetB, impulse) * bodyB.inverseInertia;
                            }
                        }
                    }
                };
            })();
        }, { "../core/Common": 14, "../geometry/Bounds": 24, "../geometry/Vector": 26, "../geometry/Vertices": 27 }], 11: [function (require, module, exports) {
            /**
            * The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
            *
            * @class SAT
            */

            // TODO: true circles and curves

            var SAT = {};

            module.exports = SAT;

            var Vertices = require('../geometry/Vertices');
            var Vector = require('../geometry/Vector');

            (function () {

                /**
                 * Detect collision between two bodies using the Separating Axis Theorem.
                 * @method collides
                 * @param {body} bodyA
                 * @param {body} bodyB
                 * @param {collision} previousCollision
                 * @return {collision} collision
                 */
                SAT.collides = function (bodyA, bodyB, previousCollision) {
                    var overlapAB,
                        overlapBA,
                        minOverlap,
                        collision,
                        prevCol = previousCollision,
                        canReusePrevCol = false;

                    if (prevCol) {
                        // estimate total motion
                        var parentA = bodyA.parent,
                            parentB = bodyB.parent,
                            motion = parentA.speed * parentA.speed + parentA.angularSpeed * parentA.angularSpeed + parentB.speed * parentB.speed + parentB.angularSpeed * parentB.angularSpeed;

                        // we may be able to (partially) reuse collision result 
                        // but only safe if collision was resting
                        canReusePrevCol = prevCol && prevCol.collided && motion < 0.2;

                        // reuse collision object
                        collision = prevCol;
                    } else {
                        collision = { collided: false, bodyA: bodyA, bodyB: bodyB };
                    }

                    if (prevCol && canReusePrevCol) {
                        // if we can reuse the collision result
                        // we only need to test the previously found axis
                        var axisBodyA = collision.axisBody,
                            axisBodyB = axisBodyA === bodyA ? bodyB : bodyA,
                            axes = [axisBodyA.axes[prevCol.axisNumber]];

                        minOverlap = _overlapAxes(axisBodyA.vertices, axisBodyB.vertices, axes);
                        collision.reused = true;

                        if (minOverlap.overlap <= 0) {
                            collision.collided = false;
                            return collision;
                        }
                    } else {
                        // if we can't reuse a result, perform a full SAT test

                        overlapAB = _overlapAxes(bodyA.vertices, bodyB.vertices, bodyA.axes);

                        if (overlapAB.overlap <= 0) {
                            collision.collided = false;
                            return collision;
                        }

                        overlapBA = _overlapAxes(bodyB.vertices, bodyA.vertices, bodyB.axes);

                        if (overlapBA.overlap <= 0) {
                            collision.collided = false;
                            return collision;
                        }

                        if (overlapAB.overlap < overlapBA.overlap) {
                            minOverlap = overlapAB;
                            collision.axisBody = bodyA;
                        } else {
                            minOverlap = overlapBA;
                            collision.axisBody = bodyB;
                        }

                        // important for reuse later
                        collision.axisNumber = minOverlap.axisNumber;
                    }

                    collision.bodyA = bodyA.id < bodyB.id ? bodyA : bodyB;
                    collision.bodyB = bodyA.id < bodyB.id ? bodyB : bodyA;
                    collision.collided = true;
                    collision.normal = minOverlap.axis;
                    collision.depth = minOverlap.overlap;
                    collision.parentA = collision.bodyA.parent;
                    collision.parentB = collision.bodyB.parent;

                    bodyA = collision.bodyA;
                    bodyB = collision.bodyB;

                    // ensure normal is facing away from bodyA
                    if (Vector.dot(collision.normal, Vector.sub(bodyB.position, bodyA.position)) > 0) collision.normal = Vector.neg(collision.normal);

                    collision.tangent = Vector.perp(collision.normal);

                    collision.penetration = {
                        x: collision.normal.x * collision.depth,
                        y: collision.normal.y * collision.depth
                    };

                    // find support points, there is always either exactly one or two
                    var verticesB = _findSupports(bodyA, bodyB, collision.normal),
                        supports = collision.supports || [];
                    supports.length = 0;

                    // find the supports from bodyB that are inside bodyA
                    if (Vertices.contains(bodyA.vertices, verticesB[0])) supports.push(verticesB[0]);

                    if (Vertices.contains(bodyA.vertices, verticesB[1])) supports.push(verticesB[1]);

                    // find the supports from bodyA that are inside bodyB
                    if (supports.length < 2) {
                        var verticesA = _findSupports(bodyB, bodyA, Vector.neg(collision.normal));

                        if (Vertices.contains(bodyB.vertices, verticesA[0])) supports.push(verticesA[0]);

                        if (supports.length < 2 && Vertices.contains(bodyB.vertices, verticesA[1])) supports.push(verticesA[1]);
                    }

                    // account for the edge case of overlapping but no vertex containment
                    if (supports.length < 1) supports = [verticesB[0]];

                    collision.supports = supports;

                    return collision;
                };

                /**
                 * Find the overlap between two sets of vertices.
                 * @method _overlapAxes
                 * @private
                 * @param {} verticesA
                 * @param {} verticesB
                 * @param {} axes
                 * @return result
                 */
                var _overlapAxes = function _overlapAxes(verticesA, verticesB, axes) {
                    var projectionA = Vector._temp[0],
                        projectionB = Vector._temp[1],
                        result = { overlap: Number.MAX_VALUE },
                        overlap,
                        axis;

                    for (var i = 0; i < axes.length; i++) {
                        axis = axes[i];

                        _projectToAxis(projectionA, verticesA, axis);
                        _projectToAxis(projectionB, verticesB, axis);

                        overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);

                        if (overlap <= 0) {
                            result.overlap = overlap;
                            return result;
                        }

                        if (overlap < result.overlap) {
                            result.overlap = overlap;
                            result.axis = axis;
                            result.axisNumber = i;
                        }
                    }

                    return result;
                };

                /**
                 * Projects vertices on an axis and returns an interval.
                 * @method _projectToAxis
                 * @private
                 * @param {} projection
                 * @param {} vertices
                 * @param {} axis
                 */
                var _projectToAxis = function _projectToAxis(projection, vertices, axis) {
                    var min = Vector.dot(vertices[0], axis),
                        max = min;

                    for (var i = 1; i < vertices.length; i += 1) {
                        var dot = Vector.dot(vertices[i], axis);

                        if (dot > max) {
                            max = dot;
                        } else if (dot < min) {
                            min = dot;
                        }
                    }

                    projection.min = min;
                    projection.max = max;
                };

                /**
                 * Finds supporting vertices given two bodies along a given direction using hill-climbing.
                 * @method _findSupports
                 * @private
                 * @param {} bodyA
                 * @param {} bodyB
                 * @param {} normal
                 * @return [vector]
                 */
                var _findSupports = function _findSupports(bodyA, bodyB, normal) {
                    var nearestDistance = Number.MAX_VALUE,
                        vertexToBody = Vector._temp[0],
                        vertices = bodyB.vertices,
                        bodyAPosition = bodyA.position,
                        distance,
                        vertex,
                        vertexA,
                        vertexB;

                    // find closest vertex on bodyB
                    for (var i = 0; i < vertices.length; i++) {
                        vertex = vertices[i];
                        vertexToBody.x = vertex.x - bodyAPosition.x;
                        vertexToBody.y = vertex.y - bodyAPosition.y;
                        distance = -Vector.dot(normal, vertexToBody);

                        if (distance < nearestDistance) {
                            nearestDistance = distance;
                            vertexA = vertex;
                        }
                    }

                    // find next closest vertex using the two connected to it
                    var prevIndex = vertexA.index - 1 >= 0 ? vertexA.index - 1 : vertices.length - 1;
                    vertex = vertices[prevIndex];
                    vertexToBody.x = vertex.x - bodyAPosition.x;
                    vertexToBody.y = vertex.y - bodyAPosition.y;
                    nearestDistance = -Vector.dot(normal, vertexToBody);
                    vertexB = vertex;

                    var nextIndex = (vertexA.index + 1) % vertices.length;
                    vertex = vertices[nextIndex];
                    vertexToBody.x = vertex.x - bodyAPosition.x;
                    vertexToBody.y = vertex.y - bodyAPosition.y;
                    distance = -Vector.dot(normal, vertexToBody);
                    if (distance < nearestDistance) {
                        vertexB = vertex;
                    }

                    return [vertexA, vertexB];
                };
            })();
        }, { "../geometry/Vector": 26, "../geometry/Vertices": 27 }], 12: [function (require, module, exports) {
            /**
            * The `Matter.Constraint` module contains methods for creating and manipulating constraints.
            * Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
            * The stiffness of constraints can be modified to create springs or elastic.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Constraint
            */

            // TODO: fix instability issues with torque
            // TODO: linked constraints
            // TODO: breakable constraints
            // TODO: collision constraints
            // TODO: allow constrained bodies to sleep
            // TODO: handle 0 length constraints properly
            // TODO: impulse caching and warming

            var Constraint = {};

            module.exports = Constraint;

            var Vertices = require('../geometry/Vertices');
            var Vector = require('../geometry/Vector');
            var Sleeping = require('../core/Sleeping');
            var Bounds = require('../geometry/Bounds');
            var Axes = require('../geometry/Axes');
            var Common = require('../core/Common');

            (function () {

                var _minLength = 0.000001,
                    _minDifference = 0.001;

                /**
                 * Creates a new constraint.
                 * All properties have default values, and many are pre-calculated automatically based on other properties.
                 * See the properties section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @param {} options
                 * @return {constraint} constraint
                 */
                Constraint.create = function (options) {
                    var constraint = options;

                    // if bodies defined but no points, use body centre
                    if (constraint.bodyA && !constraint.pointA) constraint.pointA = { x: 0, y: 0 };
                    if (constraint.bodyB && !constraint.pointB) constraint.pointB = { x: 0, y: 0 };

                    // calculate static length using initial world space points
                    var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA,
                        initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB,
                        length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));

                    constraint.length = constraint.length || length || _minLength;

                    // render
                    var render = {
                        visible: true,
                        lineWidth: 2,
                        strokeStyle: '#666'
                    };

                    constraint.render = Common.extend(render, constraint.render);

                    // option defaults
                    constraint.id = constraint.id || Common.nextId();
                    constraint.label = constraint.label || 'Constraint';
                    constraint.type = 'constraint';
                    constraint.stiffness = constraint.stiffness || 1;
                    constraint.angularStiffness = constraint.angularStiffness || 0;
                    constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
                    constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;

                    return constraint;
                };

                /**
                 * Solves all constraints in a list of collisions.
                 * @private
                 * @method solveAll
                 * @param {constraint[]} constraints
                 * @param {number} timeScale
                 */
                Constraint.solveAll = function (constraints, timeScale) {
                    for (var i = 0; i < constraints.length; i++) {
                        Constraint.solve(constraints[i], timeScale);
                    }
                };

                /**
                 * Solves a distance constraint with Gauss-Siedel method.
                 * @private
                 * @method solve
                 * @param {constraint} constraint
                 * @param {number} timeScale
                 */
                Constraint.solve = function (constraint, timeScale) {
                    var bodyA = constraint.bodyA,
                        bodyB = constraint.bodyB,
                        pointA = constraint.pointA,
                        pointB = constraint.pointB;

                    // update reference angle
                    if (bodyA && !bodyA.isStatic) {
                        constraint.pointA = Vector.rotate(pointA, bodyA.angle - constraint.angleA);
                        constraint.angleA = bodyA.angle;
                    }

                    // update reference angle
                    if (bodyB && !bodyB.isStatic) {
                        constraint.pointB = Vector.rotate(pointB, bodyB.angle - constraint.angleB);
                        constraint.angleB = bodyB.angle;
                    }

                    var pointAWorld = pointA,
                        pointBWorld = pointB;

                    if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
                    if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);

                    if (!pointAWorld || !pointBWorld) return;

                    var delta = Vector.sub(pointAWorld, pointBWorld),
                        currentLength = Vector.magnitude(delta);

                    // prevent singularity
                    if (currentLength === 0) currentLength = _minLength;

                    // solve distance constraint with Gauss-Siedel method
                    var difference = (currentLength - constraint.length) / currentLength,
                        normal = Vector.div(delta, currentLength),
                        force = Vector.mult(delta, difference * 0.5 * constraint.stiffness * timeScale * timeScale);

                    // if difference is very small, we can skip
                    if (Math.abs(1 - currentLength / constraint.length) < _minDifference * timeScale) return;

                    var velocityPointA, velocityPointB, offsetA, offsetB, oAn, oBn, bodyADenom, bodyBDenom;

                    if (bodyA && !bodyA.isStatic) {
                        // point body offset
                        offsetA = {
                            x: pointAWorld.x - bodyA.position.x + force.x,
                            y: pointAWorld.y - bodyA.position.y + force.y
                        };

                        // update velocity
                        bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
                        bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
                        bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;

                        // find point velocity and body mass
                        velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity));
                        oAn = Vector.dot(offsetA, normal);
                        bodyADenom = bodyA.inverseMass + bodyA.inverseInertia * oAn * oAn;
                    } else {
                        velocityPointA = { x: 0, y: 0 };
                        bodyADenom = bodyA ? bodyA.inverseMass : 0;
                    }

                    if (bodyB && !bodyB.isStatic) {
                        // point body offset
                        offsetB = {
                            x: pointBWorld.x - bodyB.position.x - force.x,
                            y: pointBWorld.y - bodyB.position.y - force.y
                        };

                        // update velocity
                        bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
                        bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
                        bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

                        // find point velocity and body mass
                        velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity));
                        oBn = Vector.dot(offsetB, normal);
                        bodyBDenom = bodyB.inverseMass + bodyB.inverseInertia * oBn * oBn;
                    } else {
                        velocityPointB = { x: 0, y: 0 };
                        bodyBDenom = bodyB ? bodyB.inverseMass : 0;
                    }

                    var relativeVelocity = Vector.sub(velocityPointB, velocityPointA),
                        normalImpulse = Vector.dot(normal, relativeVelocity) / (bodyADenom + bodyBDenom);

                    if (normalImpulse > 0) normalImpulse = 0;

                    var normalVelocity = {
                        x: normal.x * normalImpulse,
                        y: normal.y * normalImpulse
                    };

                    var torque;

                    if (bodyA && !bodyA.isStatic) {
                        torque = Vector.cross(offsetA, normalVelocity) * bodyA.inverseInertia * (1 - constraint.angularStiffness);

                        // keep track of applied impulses for post solving
                        bodyA.constraintImpulse.x -= force.x;
                        bodyA.constraintImpulse.y -= force.y;
                        bodyA.constraintImpulse.angle += torque;

                        // apply forces
                        bodyA.position.x -= force.x;
                        bodyA.position.y -= force.y;
                        bodyA.angle += torque;
                    }

                    if (bodyB && !bodyB.isStatic) {
                        torque = Vector.cross(offsetB, normalVelocity) * bodyB.inverseInertia * (1 - constraint.angularStiffness);

                        // keep track of applied impulses for post solving
                        bodyB.constraintImpulse.x += force.x;
                        bodyB.constraintImpulse.y += force.y;
                        bodyB.constraintImpulse.angle -= torque;

                        // apply forces
                        bodyB.position.x += force.x;
                        bodyB.position.y += force.y;
                        bodyB.angle -= torque;
                    }
                };

                /**
                 * Performs body updates required after solving constraints.
                 * @private
                 * @method postSolveAll
                 * @param {body[]} bodies
                 */
                Constraint.postSolveAll = function (bodies) {
                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i],
                            impulse = body.constraintImpulse;

                        if (impulse.x === 0 && impulse.y === 0 && impulse.angle === 0) {
                            continue;
                        }

                        Sleeping.set(body, false);

                        // update geometry and reset
                        for (var j = 0; j < body.parts.length; j++) {
                            var part = body.parts[j];

                            Vertices.translate(part.vertices, impulse);

                            if (j > 0) {
                                part.position.x += impulse.x;
                                part.position.y += impulse.y;
                            }

                            if (impulse.angle !== 0) {
                                Vertices.rotate(part.vertices, impulse.angle, body.position);
                                Axes.rotate(part.axes, impulse.angle);
                                if (j > 0) {
                                    Vector.rotateAbout(part.position, impulse.angle, body.position, part.position);
                                }
                            }

                            Bounds.update(part.bounds, part.vertices, body.velocity);
                        }

                        impulse.angle = 0;
                        impulse.x = 0;
                        impulse.y = 0;
                    }
                };

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
                 *
                 * @property id
                 * @type number
                 */

                /**
                 * A `String` denoting the type of object.
                 *
                 * @property type
                 * @type string
                 * @default "constraint"
                 * @readOnly
                 */

                /**
                 * An arbitrary `String` name to help the user identify and manage bodies.
                 *
                 * @property label
                 * @type string
                 * @default "Constraint"
                 */

                /**
                 * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
                 *
                 * @property render
                 * @type object
                 */

                /**
                 * A flag that indicates if the constraint should be rendered.
                 *
                 * @property render.visible
                 * @type boolean
                 * @default true
                 */

                /**
                 * A `Number` that defines the line width to use when rendering the constraint outline.
                 * A value of `0` means no outline will be rendered.
                 *
                 * @property render.lineWidth
                 * @type number
                 * @default 2
                 */

                /**
                 * A `String` that defines the stroke style to use when rendering the constraint outline.
                 * It is the same as when using a canvas, so it accepts CSS style property values.
                 *
                 * @property render.strokeStyle
                 * @type string
                 * @default a random colour
                 */

                /**
                 * The first possible `Body` that this constraint is attached to.
                 *
                 * @property bodyA
                 * @type body
                 * @default null
                 */

                /**
                 * The second possible `Body` that this constraint is attached to.
                 *
                 * @property bodyB
                 * @type body
                 * @default null
                 */

                /**
                 * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
                 *
                 * @property pointA
                 * @type vector
                 * @default { x: 0, y: 0 }
                 */

                /**
                 * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
                 *
                 * @property pointB
                 * @type vector
                 * @default { x: 0, y: 0 }
                 */

                /**
                 * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
                 * A value of `1` means the constraint should be very stiff.
                 * A value of `0.2` means the constraint acts like a soft spring.
                 *
                 * @property stiffness
                 * @type number
                 * @default 1
                 */

                /**
                 * A `Number` that specifies the target resting length of the constraint. 
                 * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
                 *
                 * @property length
                 * @type number
                 */
            })();
        }, { "../core/Common": 14, "../core/Sleeping": 20, "../geometry/Axes": 23, "../geometry/Bounds": 24, "../geometry/Vector": 26, "../geometry/Vertices": 27 }], 13: [function (require, module, exports) {
            /**
            * The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
            * Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class MouseConstraint
            */

            var MouseConstraint = {};

            module.exports = MouseConstraint;

            var Vertices = require('../geometry/Vertices');
            var Sleeping = require('../core/Sleeping');
            var Mouse = require('../core/Mouse');
            var Events = require('../core/Events');
            var Detector = require('../collision/Detector');
            var Constraint = require('./Constraint');
            var Composite = require('../body/Composite');
            var Common = require('../core/Common');
            var Bounds = require('../geometry/Bounds');

            (function () {

                /**
                 * Creates a new mouse constraint.
                 * All properties have default values, and many are pre-calculated automatically based on other properties.
                 * See the properties section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @param {engine} engine
                 * @param {} options
                 * @return {MouseConstraint} A new MouseConstraint
                 */
                MouseConstraint.create = function (engine, options) {
                    var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);

                    if (!mouse) {
                        if (engine && engine.render && engine.render.canvas) {
                            mouse = Mouse.create(engine.render.canvas);
                        } else if (options && options.element) {
                            mouse = Mouse.create(options.element);
                        } else {
                            mouse = Mouse.create();
                            Common.log('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected', 'warn');
                        }
                    }

                    var constraint = Constraint.create({
                        label: 'Mouse Constraint',
                        pointA: mouse.position,
                        pointB: { x: 0, y: 0 },
                        length: 0.01,
                        stiffness: 0.1,
                        angularStiffness: 1,
                        render: {
                            strokeStyle: '#90EE90',
                            lineWidth: 3
                        }
                    });

                    var defaults = {
                        type: 'mouseConstraint',
                        mouse: mouse,
                        element: null,
                        body: null,
                        constraint: constraint,
                        collisionFilter: {
                            category: 0x0001,
                            mask: 0xFFFFFFFF,
                            group: 0
                        }
                    };

                    var mouseConstraint = Common.extend(defaults, options);

                    Events.on(engine, 'tick', function () {
                        var allBodies = Composite.allBodies(engine.world);
                        MouseConstraint.update(mouseConstraint, allBodies);
                        _triggerEvents(mouseConstraint);
                    });

                    return mouseConstraint;
                };

                /**
                 * Updates the given mouse constraint.
                 * @private
                 * @method update
                 * @param {MouseConstraint} mouseConstraint
                 * @param {body[]} bodies
                 */
                MouseConstraint.update = function (mouseConstraint, bodies) {
                    var mouse = mouseConstraint.mouse,
                        constraint = mouseConstraint.constraint,
                        body = mouseConstraint.body;

                    if (mouse.button === 0) {
                        if (!constraint.bodyB) {
                            for (var i = 0; i < bodies.length; i++) {
                                body = bodies[i];
                                if (Bounds.contains(body.bounds, mouse.position) && Detector.canCollide(body.collisionFilter, mouseConstraint.collisionFilter)) {
                                    for (var j = body.parts.length > 1 ? 1 : 0; j < body.parts.length; j++) {
                                        var part = body.parts[j];
                                        if (Vertices.contains(part.vertices, mouse.position)) {
                                            constraint.pointA = mouse.position;
                                            constraint.bodyB = mouseConstraint.body = body;
                                            constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                                            constraint.angleB = body.angle;

                                            Sleeping.set(body, false);
                                            Events.trigger(mouseConstraint, 'startdrag', { mouse: mouse, body: body });

                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            Sleeping.set(constraint.bodyB, false);
                            constraint.pointA = mouse.position;
                        }
                    } else {
                        constraint.bodyB = mouseConstraint.body = null;
                        constraint.pointB = null;

                        if (body) Events.trigger(mouseConstraint, 'enddrag', { mouse: mouse, body: body });
                    }
                };

                /**
                 * Triggers mouse constraint events.
                 * @method _triggerEvents
                 * @private
                 * @param {mouse} mouseConstraint
                 */
                var _triggerEvents = function _triggerEvents(mouseConstraint) {
                    var mouse = mouseConstraint.mouse,
                        mouseEvents = mouse.sourceEvents;

                    if (mouseEvents.mousemove) Events.trigger(mouseConstraint, 'mousemove', { mouse: mouse });

                    if (mouseEvents.mousedown) Events.trigger(mouseConstraint, 'mousedown', { mouse: mouse });

                    if (mouseEvents.mouseup) Events.trigger(mouseConstraint, 'mouseup', { mouse: mouse });

                    // reset the mouse state ready for the next step
                    Mouse.clearSourceEvents(mouse);
                };

                /*
                *
                *  Events Documentation
                *
                */

                /**
                * Fired when the mouse has moved (or a touch moves) during the last step
                *
                * @event mousemove
                * @param {} event An event object
                * @param {mouse} event.mouse The engine's mouse instance
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when the mouse is down (or a touch has started) during the last step
                *
                * @event mousedown
                * @param {} event An event object
                * @param {mouse} event.mouse The engine's mouse instance
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when the mouse is up (or a touch has ended) during the last step
                *
                * @event mouseup
                * @param {} event An event object
                * @param {mouse} event.mouse The engine's mouse instance
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when the user starts dragging a body
                *
                * @event startdrag
                * @param {} event An event object
                * @param {mouse} event.mouse The engine's mouse instance
                * @param {body} event.body The body being dragged
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired when the user ends dragging a body
                *
                * @event enddrag
                * @param {} event An event object
                * @param {mouse} event.mouse The engine's mouse instance
                * @param {body} event.body The body that has stopped being dragged
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * A `String` denoting the type of object.
                 *
                 * @property type
                 * @type string
                 * @default "constraint"
                 * @readOnly
                 */

                /**
                 * The `Mouse` instance in use. If not supplied in `MouseConstraint.create`, one will be created.
                 *
                 * @property mouse
                 * @type mouse
                 * @default mouse
                 */

                /**
                 * The `Body` that is currently being moved by the user, or `null` if no body.
                 *
                 * @property body
                 * @type body
                 * @default null
                 */

                /**
                 * The `Constraint` object that is used to move the body during interaction.
                 *
                 * @property constraint
                 * @type constraint
                 */

                /**
                 * An `Object` that specifies the collision filter properties.
                 * The collision filter allows the user to define which types of body this mouse constraint can interact with.
                 * See `body.collisionFilter` for more information.
                 *
                 * @property collisionFilter
                 * @type object
                 */
            })();
        }, { "../body/Composite": 2, "../collision/Detector": 5, "../core/Common": 14, "../core/Events": 16, "../core/Mouse": 18, "../core/Sleeping": 20, "../geometry/Bounds": 24, "../geometry/Vertices": 27, "./Constraint": 12 }], 14: [function (require, module, exports) {
            /**
            * The `Matter.Common` module contains utility functions that are common to all modules.
            *
            * @class Common
            */

            var Common = {};

            module.exports = Common;

            (function () {

                Common._nextId = 0;
                Common._seed = 0;

                /**
                 * Extends the object in the first argument using the object in the second argument.
                 * @method extend
                 * @param {} obj
                 * @param {boolean} deep
                 * @return {} obj extended
                 */
                Common.extend = function (obj, deep) {
                    var argsStart, args, deepClone;

                    if (typeof deep === 'boolean') {
                        argsStart = 2;
                        deepClone = deep;
                    } else {
                        argsStart = 1;
                        deepClone = true;
                    }

                    args = Array.prototype.slice.call(arguments, argsStart);

                    for (var i = 0; i < args.length; i++) {
                        var source = args[i];

                        if (source) {
                            for (var prop in source) {
                                if (deepClone && source[prop] && source[prop].constructor === Object) {
                                    if (!obj[prop] || obj[prop].constructor === Object) {
                                        obj[prop] = obj[prop] || {};
                                        Common.extend(obj[prop], deepClone, source[prop]);
                                    } else {
                                        obj[prop] = source[prop];
                                    }
                                } else {
                                    obj[prop] = source[prop];
                                }
                            }
                        }
                    }

                    return obj;
                };

                /**
                 * Creates a new clone of the object, if deep is true references will also be cloned.
                 * @method clone
                 * @param {} obj
                 * @param {bool} deep
                 * @return {} obj cloned
                 */
                Common.clone = function (obj, deep) {
                    return Common.extend({}, deep, obj);
                };

                /**
                 * Returns the list of keys for the given object.
                 * @method keys
                 * @param {} obj
                 * @return {string[]} keys
                 */
                Common.keys = function (obj) {
                    if (Object.keys) return Object.keys(obj);

                    // avoid hasOwnProperty for performance
                    var keys = [];
                    for (var key in obj) {
                        keys.push(key);
                    }return keys;
                };

                /**
                 * Returns the list of values for the given object.
                 * @method values
                 * @param {} obj
                 * @return {array} Array of the objects property values
                 */
                Common.values = function (obj) {
                    var values = [];

                    if (Object.keys) {
                        var keys = Object.keys(obj);
                        for (var i = 0; i < keys.length; i++) {
                            values.push(obj[keys[i]]);
                        }
                        return values;
                    }

                    // avoid hasOwnProperty for performance
                    for (var key in obj) {
                        values.push(obj[key]);
                    }return values;
                };

                /**
                 * Returns a hex colour string made by lightening or darkening color by percent.
                 * @method shadeColor
                 * @param {string} color
                 * @param {number} percent
                 * @return {string} A hex colour
                 */
                Common.shadeColor = function (color, percent) {
                    // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color
                    var colorInteger = parseInt(color.slice(1), 16),
                        amount = Math.round(2.55 * percent),
                        R = (colorInteger >> 16) + amount,
                        B = (colorInteger >> 8 & 0x00FF) + amount,
                        G = (colorInteger & 0x0000FF) + amount;
                    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
                };

                /**
                 * Shuffles the given array in-place.
                 * The function uses a seeded random generator.
                 * @method shuffle
                 * @param {array} array
                 * @return {array} array shuffled randomly
                 */
                Common.shuffle = function (array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Common.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                    return array;
                };

                /**
                 * Randomly chooses a value from a list with equal probability.
                 * The function uses a seeded random generator.
                 * @method choose
                 * @param {array} choices
                 * @return {object} A random choice object from the array
                 */
                Common.choose = function (choices) {
                    return choices[Math.floor(Common.random() * choices.length)];
                };

                /**
                 * Returns true if the object is a HTMLElement, otherwise false.
                 * @method isElement
                 * @param {object} obj
                 * @return {boolean} True if the object is a HTMLElement, otherwise false
                 */
                Common.isElement = function (obj) {
                    // http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
                    try {
                        return obj instanceof HTMLElement;
                    } catch (e) {
                        return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.nodeType === 1 && _typeof(obj.style) === "object" && _typeof(obj.ownerDocument) === "object";
                    }
                };

                /**
                 * Returns true if the object is an array.
                 * @method isArray
                 * @param {object} obj
                 * @return {boolean} True if the object is an array, otherwise false
                 */
                Common.isArray = function (obj) {
                    return Object.prototype.toString.call(obj) === '[object Array]';
                };

                /**
                 * Returns the given value clamped between a minimum and maximum value.
                 * @method clamp
                 * @param {number} value
                 * @param {number} min
                 * @param {number} max
                 * @return {number} The value clamped between min and max inclusive
                 */
                Common.clamp = function (value, min, max) {
                    if (value < min) return min;
                    if (value > max) return max;
                    return value;
                };

                /**
                 * Returns the sign of the given value.
                 * @method sign
                 * @param {number} value
                 * @return {number} -1 if negative, +1 if 0 or positive
                 */
                Common.sign = function (value) {
                    return value < 0 ? -1 : 1;
                };

                /**
                 * Returns the current timestamp (high-res if available).
                 * @method now
                 * @return {number} the current timestamp (high-res if available)
                 */
                Common.now = function () {
                    // http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
                    // https://gist.github.com/davidwaterston/2982531

                    var performance = window.performance || {};

                    performance.now = function () {
                        return performance.now || performance.webkitNow || performance.msNow || performance.oNow || performance.mozNow || function () {
                            return +new Date();
                        };
                    }();

                    return performance.now();
                };

                /**
                 * Returns a random value between a minimum and a maximum value inclusive.
                 * The function uses a seeded random generator.
                 * @method random
                 * @param {number} min
                 * @param {number} max
                 * @return {number} A random number between min and max inclusive
                 */
                Common.random = function (min, max) {
                    min = typeof min !== "undefined" ? min : 0;
                    max = typeof max !== "undefined" ? max : 1;
                    return min + _seededRandom() * (max - min);
                };

                /**
                 * Converts a CSS hex colour string into an integer.
                 * @method colorToNumber
                 * @param {string} colorString
                 * @return {number} An integer representing the CSS hex string
                 */
                Common.colorToNumber = function (colorString) {
                    colorString = colorString.replace('#', '');

                    if (colorString.length == 3) {
                        colorString = colorString.charAt(0) + colorString.charAt(0) + colorString.charAt(1) + colorString.charAt(1) + colorString.charAt(2) + colorString.charAt(2);
                    }

                    return parseInt(colorString, 16);
                };

                /**
                 * A wrapper for console.log, for providing errors and warnings.
                 * @method log
                 * @param {string} message
                 * @param {string} type
                 */
                Common.log = function (message, type) {
                    if (!console || !console.log || !console.warn) return;

                    switch (type) {

                        case 'warn':
                            console.warn('Matter.js:', message);
                            break;
                        case 'error':
                            console.log('Matter.js:', message);
                            break;

                    }
                };

                /**
                 * Returns the next unique sequential ID.
                 * @method nextId
                 * @return {Number} Unique sequential ID
                 */
                Common.nextId = function () {
                    return Common._nextId++;
                };

                /**
                 * A cross browser compatible indexOf implementation.
                 * @method indexOf
                 * @param {array} haystack
                 * @param {object} needle
                 */
                Common.indexOf = function (haystack, needle) {
                    if (haystack.indexOf) return haystack.indexOf(needle);

                    for (var i = 0; i < haystack.length; i++) {
                        if (haystack[i] === needle) return i;
                    }

                    return -1;
                };

                var _seededRandom = function _seededRandom() {
                    // https://gist.github.com/ngryman/3830489
                    Common._seed = (Common._seed * 9301 + 49297) % 233280;
                    return Common._seed / 233280;
                };
            })();
        }, {}], 15: [function (require, module, exports) {
            /**
            * The `Matter.Engine` module contains methods for creating and manipulating engines.
            * An engine is a controller that manages updating the simulation of the world.
            * See `Matter.Runner` for an optional game loop utility.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Engine
            */

            var Engine = {};

            module.exports = Engine;

            var World = require('../body/World');
            var Sleeping = require('./Sleeping');
            var Resolver = require('../collision/Resolver');
            var Render = require('../render/Render');
            var Pairs = require('../collision/Pairs');
            var Metrics = require('./Metrics');
            var Grid = require('../collision/Grid');
            var Events = require('./Events');
            var Composite = require('../body/Composite');
            var Constraint = require('../constraint/Constraint');
            var Common = require('./Common');
            var Body = require('../body/Body');

            (function () {

                /**
                 * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
                 * All properties have default values, and many are pre-calculated automatically based on other properties.
                 * See the properties section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @param {object} [options]
                 * @return {engine} engine
                 */
                Engine.create = function (element, options) {
                    // options may be passed as the first (and only) argument
                    options = Common.isElement(element) ? options : element;
                    element = Common.isElement(element) ? element : null;
                    options = options || {};

                    if (element || options.render) {
                        Common.log('Engine.create: engine.render is deprecated (see docs)', 'warn');
                    }

                    var defaults = {
                        positionIterations: 6,
                        velocityIterations: 4,
                        constraintIterations: 2,
                        enableSleeping: false,
                        events: [],
                        timing: {
                            timestamp: 0,
                            timeScale: 1
                        },
                        broadphase: {
                            controller: Grid
                        }
                    };

                    var engine = Common.extend(defaults, options);

                    // @deprecated
                    if (element || engine.render) {
                        var renderDefaults = {
                            element: element,
                            controller: Render
                        };

                        engine.render = Common.extend(renderDefaults, engine.render);
                    }

                    // @deprecated
                    if (engine.render && engine.render.controller) {
                        engine.render = engine.render.controller.create(engine.render);
                    }

                    // @deprecated
                    if (engine.render) {
                        engine.render.engine = engine;
                    }

                    engine.world = options.world || World.create(engine.world);
                    engine.pairs = Pairs.create();
                    engine.broadphase = engine.broadphase.controller.create(engine.broadphase);
                    engine.metrics = engine.metrics || { extended: false };

                    return engine;
                };

                /**
                 * Moves the simulation forward in time by `delta` ms.
                 * The `correction` argument is an optional `Number` that specifies the time correction factor to apply to the update.
                 * This can help improve the accuracy of the simulation in cases where `delta` is changing between updates.
                 * The value of `correction` is defined as `delta / lastDelta`, i.e. the percentage change of `delta` over the last step.
                 * Therefore the value is always `1` (no correction) when `delta` constant (or when no correction is desired, which is the default).
                 * See the paper on <a href="http://lonesock.net/article/verlet.html">Time Corrected Verlet</a> for more information.
                 *
                 * Triggers `beforeUpdate` and `afterUpdate` events.
                 * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
                 * @method update
                 * @param {engine} engine
                 * @param {number} [delta=16.666]
                 * @param {number} [correction=1]
                 */
                Engine.update = function (engine, delta, correction) {
                    delta = delta || 1000 / 60;
                    correction = correction || 1;

                    var world = engine.world,
                        timing = engine.timing,
                        broadphase = engine.broadphase,
                        broadphasePairs = [],
                        i;

                    // increment timestamp
                    timing.timestamp += delta * timing.timeScale;

                    // create an event object
                    var event = {
                        timestamp: timing.timestamp
                    };

                    Events.trigger(engine, 'beforeUpdate', event);

                    // get lists of all bodies and constraints, no matter what composites they are in
                    var allBodies = Composite.allBodies(world),
                        allConstraints = Composite.allConstraints(world);

                    // if sleeping enabled, call the sleeping controller
                    if (engine.enableSleeping) Sleeping.update(allBodies, timing.timeScale);

                    // applies gravity to all bodies
                    _bodiesApplyGravity(allBodies, world.gravity);

                    // update all body position and rotation by integration
                    _bodiesUpdate(allBodies, delta, timing.timeScale, correction, world.bounds);

                    // update all constraints
                    for (i = 0; i < engine.constraintIterations; i++) {
                        Constraint.solveAll(allConstraints, timing.timeScale);
                    }
                    Constraint.postSolveAll(allBodies);

                    // broadphase pass: find potential collision pairs
                    if (broadphase.controller) {

                        // if world is dirty, we must flush the whole grid
                        if (world.isModified) broadphase.controller.clear(broadphase);

                        // update the grid buckets based on current bodies
                        broadphase.controller.update(broadphase, allBodies, engine, world.isModified);
                        broadphasePairs = broadphase.pairsList;
                    } else {

                        // if no broadphase set, we just pass all bodies
                        broadphasePairs = allBodies;
                    }

                    // clear all composite modified flags
                    if (world.isModified) {
                        Composite.setModified(world, false, false, true);
                    }

                    // narrowphase pass: find actual collisions, then create or update collision pairs
                    var collisions = broadphase.detector(broadphasePairs, engine);

                    // update collision pairs
                    var pairs = engine.pairs,
                        timestamp = timing.timestamp;
                    Pairs.update(pairs, collisions, timestamp);
                    Pairs.removeOld(pairs, timestamp);

                    // wake up bodies involved in collisions
                    if (engine.enableSleeping) Sleeping.afterCollisions(pairs.list, timing.timeScale);

                    // trigger collision events
                    if (pairs.collisionStart.length > 0) Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });

                    // iteratively resolve position between collisions
                    Resolver.preSolvePosition(pairs.list);
                    for (i = 0; i < engine.positionIterations; i++) {
                        Resolver.solvePosition(pairs.list, timing.timeScale);
                    }
                    Resolver.postSolvePosition(allBodies);

                    // iteratively resolve velocity between collisions
                    Resolver.preSolveVelocity(pairs.list);
                    for (i = 0; i < engine.velocityIterations; i++) {
                        Resolver.solveVelocity(pairs.list, timing.timeScale);
                    }

                    // trigger collision events
                    if (pairs.collisionActive.length > 0) Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });

                    if (pairs.collisionEnd.length > 0) Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });

                    // clear force buffers
                    _bodiesClearForces(allBodies);

                    Events.trigger(engine, 'afterUpdate', event);

                    return engine;
                };

                /**
                 * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
                 * @method merge
                 * @param {engine} engineA
                 * @param {engine} engineB
                 */
                Engine.merge = function (engineA, engineB) {
                    Common.extend(engineA, engineB);

                    if (engineB.world) {
                        engineA.world = engineB.world;

                        Engine.clear(engineA);

                        var bodies = Composite.allBodies(engineA.world);

                        for (var i = 0; i < bodies.length; i++) {
                            var body = bodies[i];
                            Sleeping.set(body, false);
                            body.id = Common.nextId();
                        }
                    }
                };

                /**
                 * Clears the engine including the world, pairs and broadphase.
                 * @method clear
                 * @param {engine} engine
                 */
                Engine.clear = function (engine) {
                    var world = engine.world;

                    Pairs.clear(engine.pairs);

                    var broadphase = engine.broadphase;
                    if (broadphase.controller) {
                        var bodies = Composite.allBodies(world);
                        broadphase.controller.clear(broadphase);
                        broadphase.controller.update(broadphase, bodies, engine, true);
                    }
                };

                /**
                 * Zeroes the `body.force` and `body.torque` force buffers.
                 * @method bodiesClearForces
                 * @private
                 * @param {body[]} bodies
                 */
                var _bodiesClearForces = function _bodiesClearForces(bodies) {
                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        // reset force buffers
                        body.force.x = 0;
                        body.force.y = 0;
                        body.torque = 0;
                    }
                };

                /**
                 * Applys a mass dependant force to all given bodies.
                 * @method bodiesApplyGravity
                 * @private
                 * @param {body[]} bodies
                 * @param {vector} gravity
                 */
                var _bodiesApplyGravity = function _bodiesApplyGravity(bodies, gravity) {
                    var gravityScale = typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001;

                    if (gravity.x === 0 && gravity.y === 0 || gravityScale === 0) {
                        return;
                    }

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (body.isStatic || body.isSleeping) continue;

                        // apply gravity
                        body.force.y += body.mass * gravity.y * gravityScale;
                        body.force.x += body.mass * gravity.x * gravityScale;
                    }
                };

                /**
                 * Applys `Body.update` to all given `bodies`.
                 * @method updateAll
                 * @private
                 * @param {body[]} bodies
                 * @param {number} deltaTime 
                 * The amount of time elapsed between updates
                 * @param {number} timeScale
                 * @param {number} correction 
                 * The Verlet correction factor (deltaTime / lastDeltaTime)
                 * @param {bounds} worldBounds
                 */
                var _bodiesUpdate = function _bodiesUpdate(bodies, deltaTime, timeScale, correction, worldBounds) {
                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (body.isStatic || body.isSleeping) continue;

                        Body.update(body, deltaTime, timeScale, correction);
                    }
                };

                /**
                 * An alias for `Runner.run`, see `Matter.Runner` for more information.
                 * @method run
                 * @param {engine} engine
                 */

                /**
                * Fired just before an update
                *
                * @event beforeUpdate
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after engine update and all collision events
                *
                * @event afterUpdate
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
                *
                * @event collisionStart
                * @param {} event An event object
                * @param {} event.pairs List of affected pairs
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
                *
                * @event collisionActive
                * @param {} event An event object
                * @param {} event.pairs List of affected pairs
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
                *
                * @event collisionEnd
                * @param {} event An event object
                * @param {} event.pairs List of affected pairs
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * An integer `Number` that specifies the number of position iterations to perform each update.
                 * The higher the value, the higher quality the simulation will be at the expense of performance.
                 *
                 * @property positionIterations
                 * @type number
                 * @default 6
                 */

                /**
                 * An integer `Number` that specifies the number of velocity iterations to perform each update.
                 * The higher the value, the higher quality the simulation will be at the expense of performance.
                 *
                 * @property velocityIterations
                 * @type number
                 * @default 4
                 */

                /**
                 * An integer `Number` that specifies the number of constraint iterations to perform each update.
                 * The higher the value, the higher quality the simulation will be at the expense of performance.
                 * The default value of `2` is usually very adequate.
                 *
                 * @property constraintIterations
                 * @type number
                 * @default 2
                 */

                /**
                 * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
                 * Sleeping can improve stability and performance, but often at the expense of accuracy.
                 *
                 * @property enableSleeping
                 * @type boolean
                 * @default false
                 */

                /**
                 * An `Object` containing properties regarding the timing systems of the engine. 
                 *
                 * @property timing
                 * @type object
                 */

                /**
                 * A `Number` that specifies the global scaling factor of time for all bodies.
                 * A value of `0` freezes the simulation.
                 * A value of `0.1` gives a slow-motion effect.
                 * A value of `1.2` gives a speed-up effect.
                 *
                 * @property timing.timeScale
                 * @type number
                 * @default 1
                 */

                /**
                 * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
                 * It is incremented on every `Engine.update` by the given `delta` argument. 
                 *
                 * @property timing.timestamp
                 * @type number
                 * @default 0
                 */

                /**
                 * An instance of a `Render` controller. The default value is a `Matter.Render` instance created by `Engine.create`.
                 * One may also develop a custom renderer module based on `Matter.Render` and pass an instance of it to `Engine.create` via `options.render`.
                 *
                 * A minimal custom renderer object must define at least three functions: `create`, `clear` and `world` (see `Matter.Render`).
                 * It is also possible to instead pass the _module_ reference via `options.render.controller` and `Engine.create` will instantiate one for you.
                 *
                 * @property render
                 * @type render
                 * @deprecated see Demo.js for an example of creating a renderer
                 * @default a Matter.Render instance
                 */

                /**
                 * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
                 *
                 * @property broadphase
                 * @type grid
                 * @default a Matter.Grid instance
                 */

                /**
                 * A `World` composite object that will contain all simulated bodies and constraints.
                 *
                 * @property world
                 * @type world
                 * @default a Matter.World instance
                 */
            })();
        }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Grid": 6, "../collision/Pairs": 8, "../collision/Resolver": 10, "../constraint/Constraint": 12, "../render/Render": 29, "./Common": 14, "./Events": 16, "./Metrics": 17, "./Sleeping": 20 }], 16: [function (require, module, exports) {
            /**
            * The `Matter.Events` module contains methods to fire and listen to events on other objects.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Events
            */

            var Events = {};

            module.exports = Events;

            var Common = require('./Common');

            (function () {

                /**
                 * Subscribes a callback function to the given object's `eventName`.
                 * @method on
                 * @param {} object
                 * @param {string} eventNames
                 * @param {function} callback
                 */
                Events.on = function (object, eventNames, callback) {
                    var names = eventNames.split(' '),
                        name;

                    for (var i = 0; i < names.length; i++) {
                        name = names[i];
                        object.events = object.events || {};
                        object.events[name] = object.events[name] || [];
                        object.events[name].push(callback);
                    }

                    return callback;
                };

                /**
                 * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
                 * @method off
                 * @param {} object
                 * @param {string} eventNames
                 * @param {function} callback
                 */
                Events.off = function (object, eventNames, callback) {
                    if (!eventNames) {
                        object.events = {};
                        return;
                    }

                    // handle Events.off(object, callback)
                    if (typeof eventNames === 'function') {
                        callback = eventNames;
                        eventNames = Common.keys(object.events).join(' ');
                    }

                    var names = eventNames.split(' ');

                    for (var i = 0; i < names.length; i++) {
                        var callbacks = object.events[names[i]],
                            newCallbacks = [];

                        if (callback && callbacks) {
                            for (var j = 0; j < callbacks.length; j++) {
                                if (callbacks[j] !== callback) newCallbacks.push(callbacks[j]);
                            }
                        }

                        object.events[names[i]] = newCallbacks;
                    }
                };

                /**
                 * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
                 * @method trigger
                 * @param {} object
                 * @param {string} eventNames
                 * @param {} event
                 */
                Events.trigger = function (object, eventNames, event) {
                    var names, name, callbacks, eventClone;

                    if (object.events) {
                        if (!event) event = {};

                        names = eventNames.split(' ');

                        for (var i = 0; i < names.length; i++) {
                            name = names[i];
                            callbacks = object.events[name];

                            if (callbacks) {
                                eventClone = Common.clone(event, false);
                                eventClone.name = name;
                                eventClone.source = object;

                                for (var j = 0; j < callbacks.length; j++) {
                                    callbacks[j].apply(object, [eventClone]);
                                }
                            }
                        }
                    }
                };
            })();
        }, { "./Common": 14 }], 17: [function (require, module, exports) {}, { "../body/Composite": 2, "./Common": 14 }], 18: [function (require, module, exports) {
            /**
            * The `Matter.Mouse` module contains methods for creating and manipulating mouse inputs.
            *
            * @class Mouse
            */

            var Mouse = {};

            module.exports = Mouse;

            var Common = require('../core/Common');

            (function () {

                /**
                 * Creates a mouse input.
                 * @method create
                 * @param {HTMLElement} element
                 * @return {mouse} A new mouse
                 */
                Mouse.create = function (element) {
                    var mouse = {};

                    if (!element) {
                        Common.log('Mouse.create: element was undefined, defaulting to document.body', 'warn');
                    }

                    mouse.element = element || document.body;
                    mouse.absolute = { x: 0, y: 0 };
                    mouse.position = { x: 0, y: 0 };
                    mouse.mousedownPosition = { x: 0, y: 0 };
                    mouse.mouseupPosition = { x: 0, y: 0 };
                    mouse.offset = { x: 0, y: 0 };
                    mouse.scale = { x: 1, y: 1 };
                    mouse.wheelDelta = 0;
                    mouse.button = -1;
                    mouse.pixelRatio = mouse.element.getAttribute('data-pixel-ratio') || 1;

                    mouse.sourceEvents = {
                        mousemove: null,
                        mousedown: null,
                        mouseup: null,
                        mousewheel: null
                    };

                    mouse.mousemove = function (event) {
                        var position = _getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                            touches = event.changedTouches;

                        if (touches) {
                            mouse.button = 0;
                            event.preventDefault();
                        }

                        mouse.absolute.x = position.x;
                        mouse.absolute.y = position.y;
                        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                        mouse.sourceEvents.mousemove = event;
                    };

                    mouse.mousedown = function (event) {
                        var position = _getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                            touches = event.changedTouches;

                        if (touches) {
                            mouse.button = 0;
                            event.preventDefault();
                        } else {
                            mouse.button = event.button;
                        }

                        mouse.absolute.x = position.x;
                        mouse.absolute.y = position.y;
                        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                        mouse.mousedownPosition.x = mouse.position.x;
                        mouse.mousedownPosition.y = mouse.position.y;
                        mouse.sourceEvents.mousedown = event;
                    };

                    mouse.mouseup = function (event) {
                        var position = _getRelativeMousePosition(event, mouse.element, mouse.pixelRatio),
                            touches = event.changedTouches;

                        if (touches) {
                            event.preventDefault();
                        }

                        mouse.button = -1;
                        mouse.absolute.x = position.x;
                        mouse.absolute.y = position.y;
                        mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                        mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                        mouse.mouseupPosition.x = mouse.position.x;
                        mouse.mouseupPosition.y = mouse.position.y;
                        mouse.sourceEvents.mouseup = event;
                    };

                    mouse.mousewheel = function (event) {
                        mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
                        event.preventDefault();
                    };

                    Mouse.setElement(mouse, mouse.element);

                    return mouse;
                };

                /**
                 * Sets the element the mouse is bound to (and relative to).
                 * @method setElement
                 * @param {mouse} mouse
                 * @param {HTMLElement} element
                 */
                Mouse.setElement = function (mouse, element) {
                    mouse.element = element;

                    element.addEventListener('mousemove', mouse.mousemove);
                    element.addEventListener('mousedown', mouse.mousedown);
                    element.addEventListener('mouseup', mouse.mouseup);

                    element.addEventListener('mousewheel', mouse.mousewheel);
                    element.addEventListener('DOMMouseScroll', mouse.mousewheel);

                    element.addEventListener('touchmove', mouse.mousemove);
                    element.addEventListener('touchstart', mouse.mousedown);
                    element.addEventListener('touchend', mouse.mouseup);
                };

                /**
                 * Clears all captured source events.
                 * @method clearSourceEvents
                 * @param {mouse} mouse
                 */
                Mouse.clearSourceEvents = function (mouse) {
                    mouse.sourceEvents.mousemove = null;
                    mouse.sourceEvents.mousedown = null;
                    mouse.sourceEvents.mouseup = null;
                    mouse.sourceEvents.mousewheel = null;
                    mouse.wheelDelta = 0;
                };

                /**
                 * Sets the mouse position offset.
                 * @method setOffset
                 * @param {mouse} mouse
                 * @param {vector} offset
                 */
                Mouse.setOffset = function (mouse, offset) {
                    mouse.offset.x = offset.x;
                    mouse.offset.y = offset.y;
                    mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                    mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                };

                /**
                 * Sets the mouse position scale.
                 * @method setScale
                 * @param {mouse} mouse
                 * @param {vector} scale
                 */
                Mouse.setScale = function (mouse, scale) {
                    mouse.scale.x = scale.x;
                    mouse.scale.y = scale.y;
                    mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
                    mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
                };

                /**
                 * Gets the mouse position relative to an element given a screen pixel ratio.
                 * @method _getRelativeMousePosition
                 * @private
                 * @param {} event
                 * @param {} element
                 * @param {number} pixelRatio
                 * @return {}
                 */
                var _getRelativeMousePosition = function _getRelativeMousePosition(event, element, pixelRatio) {
                    var elementBounds = element.getBoundingClientRect(),
                        rootNode = document.documentElement || document.body.parentNode || document.body,
                        scrollX = window.pageXOffset !== undefined ? window.pageXOffset : rootNode.scrollLeft,
                        scrollY = window.pageYOffset !== undefined ? window.pageYOffset : rootNode.scrollTop,
                        touches = event.changedTouches,
                        x,
                        y;

                    if (touches) {
                        x = touches[0].pageX - elementBounds.left - scrollX;
                        y = touches[0].pageY - elementBounds.top - scrollY;
                    } else {
                        x = event.pageX - elementBounds.left - scrollX;
                        y = event.pageY - elementBounds.top - scrollY;
                    }

                    return {
                        x: x / (element.clientWidth / element.width * pixelRatio),
                        y: y / (element.clientHeight / element.height * pixelRatio)
                    };
                };
            })();
        }, { "../core/Common": 14 }], 19: [function (require, module, exports) {
            /**
            * The `Matter.Runner` module is an optional utility which provides a game loop, 
            * that handles continuously updating a `Matter.Engine` for you within a browser.
            * It is intended for development and debugging purposes, but may also be suitable for simple games.
            * If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
            * Instead just call `Engine.update(engine, delta)` in your own loop.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Runner
            */

            var Runner = {};

            module.exports = Runner;

            var Events = require('./Events');
            var Engine = require('./Engine');
            var Common = require('./Common');

            (function () {

                var _requestAnimationFrame, _cancelAnimationFrame;

                if (typeof window !== 'undefined') {
                    _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                        window.setTimeout(function () {
                            callback(Common.now());
                        }, 1000 / 60);
                    };

                    _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                }

                /**
                 * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
                 * @method create
                 * @param {} options
                 */
                Runner.create = function (options) {
                    var defaults = {
                        fps: 60,
                        correction: 1,
                        deltaSampleSize: 60,
                        counterTimestamp: 0,
                        frameCounter: 0,
                        deltaHistory: [],
                        timePrev: null,
                        timeScalePrev: 1,
                        frameRequestId: null,
                        isFixed: false,
                        enabled: true
                    };

                    var runner = Common.extend(defaults, options);

                    runner.delta = runner.delta || 1000 / runner.fps;
                    runner.deltaMin = runner.deltaMin || 1000 / runner.fps;
                    runner.deltaMax = runner.deltaMax || 1000 / (runner.fps * 0.5);
                    runner.fps = 1000 / runner.delta;

                    return runner;
                };

                /**
                 * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
                 * @method run
                 * @param {engine} engine
                 */
                Runner.run = function (runner, engine) {
                    // create runner if engine is first argument
                    if (typeof runner.positionIterations !== 'undefined') {
                        engine = runner;
                        runner = Runner.create();
                    }

                    (function render(time) {
                        runner.frameRequestId = _requestAnimationFrame(render);

                        if (time && runner.enabled) {
                            Runner.tick(runner, engine, time);
                        }
                    })();

                    return runner;
                };

                /**
                 * A game loop utility that updates the engine and renderer by one step (a 'tick').
                 * Features delta smoothing, time correction and fixed or dynamic timing.
                 * Triggers `beforeTick`, `tick` and `afterTick` events on the engine.
                 * Consider just `Engine.update(engine, delta)` if you're using your own loop.
                 * @method tick
                 * @param {runner} runner
                 * @param {engine} engine
                 * @param {number} time
                 */
                Runner.tick = function (runner, engine, time) {
                    var timing = engine.timing,
                        correction = 1,
                        delta;

                    // create an event object
                    var event = {
                        timestamp: timing.timestamp
                    };

                    Events.trigger(runner, 'beforeTick', event);
                    Events.trigger(engine, 'beforeTick', event); // @deprecated

                    if (runner.isFixed) {
                        // fixed timestep
                        delta = runner.delta;
                    } else {
                        // dynamic timestep based on wall clock between calls
                        delta = time - runner.timePrev || runner.delta;
                        runner.timePrev = time;

                        // optimistically filter delta over a few frames, to improve stability
                        runner.deltaHistory.push(delta);
                        runner.deltaHistory = runner.deltaHistory.slice(-runner.deltaSampleSize);
                        delta = Math.min.apply(null, runner.deltaHistory);

                        // limit delta
                        delta = delta < runner.deltaMin ? runner.deltaMin : delta;
                        delta = delta > runner.deltaMax ? runner.deltaMax : delta;

                        // correction for delta
                        correction = delta / runner.delta;

                        // update engine timing object
                        runner.delta = delta;
                    }

                    // time correction for time scaling
                    if (runner.timeScalePrev !== 0) correction *= timing.timeScale / runner.timeScalePrev;

                    if (timing.timeScale === 0) correction = 0;

                    runner.timeScalePrev = timing.timeScale;
                    runner.correction = correction;

                    // fps counter
                    runner.frameCounter += 1;
                    if (time - runner.counterTimestamp >= 1000) {
                        runner.fps = runner.frameCounter * ((time - runner.counterTimestamp) / 1000);
                        runner.counterTimestamp = time;
                        runner.frameCounter = 0;
                    }

                    Events.trigger(runner, 'tick', event);
                    Events.trigger(engine, 'tick', event); // @deprecated

                    // if world has been modified, clear the render scene graph
                    if (engine.world.isModified && engine.render && engine.render.controller && engine.render.controller.clear) {
                        engine.render.controller.clear(engine.render);
                    }

                    // update
                    Events.trigger(runner, 'beforeUpdate', event);
                    Engine.update(engine, delta, correction);
                    Events.trigger(runner, 'afterUpdate', event);

                    // render
                    // @deprecated
                    if (engine.render && engine.render.controller) {
                        Events.trigger(runner, 'beforeRender', event);
                        Events.trigger(engine, 'beforeRender', event); // @deprecated

                        engine.render.controller.world(engine.render);

                        Events.trigger(runner, 'afterRender', event);
                        Events.trigger(engine, 'afterRender', event); // @deprecated
                    }

                    Events.trigger(runner, 'afterTick', event);
                    Events.trigger(engine, 'afterTick', event); // @deprecated
                };

                /**
                 * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
                 * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
                 * @method stop
                 * @param {runner} runner
                 */
                Runner.stop = function (runner) {
                    _cancelAnimationFrame(runner.frameRequestId);
                };

                /**
                 * Alias for `Runner.run`.
                 * @method start
                 * @param {runner} runner
                 * @param {engine} engine
                 */
                Runner.start = function (runner, engine) {
                    Runner.run(runner, engine);
                };

                /*
                *
                *  Events Documentation
                *
                */

                /**
                * Fired at the start of a tick, before any updates to the engine or timing
                *
                * @event beforeTick
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after engine timing updated, but just before update
                *
                * @event tick
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired at the end of a tick, after engine update and after rendering
                *
                * @event afterTick
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired before update
                *
                * @event beforeUpdate
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after update
                *
                * @event afterUpdate
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired before rendering
                *
                * @event beforeRender
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                * @deprecated
                */

                /**
                * Fired after rendering
                *
                * @event afterRender
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                * @deprecated
                */

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * A flag that specifies whether the runner is running or not.
                 *
                 * @property enabled
                 * @type boolean
                 * @default true
                 */

                /**
                 * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
                 * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
                 * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
                 *
                 * @property isFixed
                 * @type boolean
                 * @default false
                 */

                /**
                 * A `Number` that specifies the time step between updates in milliseconds.
                 * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
                 * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
                 *
                 * @property delta
                 * @type number
                 * @default 1000 / 60
                 */
            })();
        }, { "./Common": 14, "./Engine": 15, "./Events": 16 }], 20: [function (require, module, exports) {
            /**
            * The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
            *
            * @class Sleeping
            */

            var Sleeping = {};

            module.exports = Sleeping;

            var Events = require('./Events');

            (function () {

                Sleeping._motionWakeThreshold = 0.18;
                Sleeping._motionSleepThreshold = 0.08;
                Sleeping._minBias = 0.9;

                /**
                 * Puts bodies to sleep or wakes them up depending on their motion.
                 * @method update
                 * @param {body[]} bodies
                 * @param {number} timeScale
                 */
                Sleeping.update = function (bodies, timeScale) {
                    var timeFactor = timeScale * timeScale * timeScale;

                    // update bodies sleeping status
                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i],
                            motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;

                        // wake up bodies if they have a force applied
                        if (body.force.x !== 0 || body.force.y !== 0) {
                            Sleeping.set(body, false);
                            continue;
                        }

                        var minMotion = Math.min(body.motion, motion),
                            maxMotion = Math.max(body.motion, motion);

                        // biased average motion estimation between frames
                        body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;

                        if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
                            body.sleepCounter += 1;

                            if (body.sleepCounter >= body.sleepThreshold) Sleeping.set(body, true);
                        } else if (body.sleepCounter > 0) {
                            body.sleepCounter -= 1;
                        }
                    }
                };

                /**
                 * Given a set of colliding pairs, wakes the sleeping bodies involved.
                 * @method afterCollisions
                 * @param {pair[]} pairs
                 * @param {number} timeScale
                 */
                Sleeping.afterCollisions = function (pairs, timeScale) {
                    var timeFactor = timeScale * timeScale * timeScale;

                    // wake up bodies involved in collisions
                    for (var i = 0; i < pairs.length; i++) {
                        var pair = pairs[i];

                        // don't wake inactive pairs
                        if (!pair.isActive) continue;

                        var collision = pair.collision,
                            bodyA = collision.bodyA.parent,
                            bodyB = collision.bodyB.parent;

                        // don't wake if at least one body is static
                        if (bodyA.isSleeping && bodyB.isSleeping || bodyA.isStatic || bodyB.isStatic) continue;

                        if (bodyA.isSleeping || bodyB.isSleeping) {
                            var sleepingBody = bodyA.isSleeping && !bodyA.isStatic ? bodyA : bodyB,
                                movingBody = sleepingBody === bodyA ? bodyB : bodyA;

                            if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
                                Sleeping.set(sleepingBody, false);
                            }
                        }
                    }
                };

                /**
                 * Set a body as sleeping or awake.
                 * @method set
                 * @param {body} body
                 * @param {boolean} isSleeping
                 */
                Sleeping.set = function (body, isSleeping) {
                    var wasSleeping = body.isSleeping;

                    if (isSleeping) {
                        body.isSleeping = true;
                        body.sleepCounter = body.sleepThreshold;

                        body.positionImpulse.x = 0;
                        body.positionImpulse.y = 0;

                        body.positionPrev.x = body.position.x;
                        body.positionPrev.y = body.position.y;

                        body.anglePrev = body.angle;
                        body.speed = 0;
                        body.angularSpeed = 0;
                        body.motion = 0;

                        if (!wasSleeping) {
                            Events.trigger(body, 'sleepStart');
                        }
                    } else {
                        body.isSleeping = false;
                        body.sleepCounter = 0;

                        if (wasSleeping) {
                            Events.trigger(body, 'sleepEnd');
                        }
                    }
                };
            })();
        }, { "./Events": 16 }], 21: [function (require, module, exports) {
            /**
            * The `Matter.Bodies` module contains factory methods for creating rigid body models 
            * with commonly used body configurations (such as rectangles, circles and other polygons).
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Bodies
            */

            // TODO: true circle bodies

            var Bodies = {};

            module.exports = Bodies;

            var Vertices = require('../geometry/Vertices');
            var Common = require('../core/Common');
            var Body = require('../body/Body');
            var Bounds = require('../geometry/Bounds');
            var Vector = require('../geometry/Vector');

            (function () {

                /**
                 * Creates a new rigid body model with a rectangle hull. 
                 * The options parameter is an object that specifies any properties you wish to override the defaults.
                 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
                 * @method rectangle
                 * @param {number} x
                 * @param {number} y
                 * @param {number} width
                 * @param {number} height
                 * @param {object} [options]
                 * @return {body} A new rectangle body
                 */
                Bodies.rectangle = function (x, y, width, height, options) {
                    options = options || {};

                    var rectangle = {
                        label: 'Rectangle Body',
                        position: { x: x, y: y },
                        vertices: Vertices.fromPath('L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)
                    };

                    if (options.chamfer) {
                        var chamfer = options.chamfer;
                        rectangle.vertices = Vertices.chamfer(rectangle.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
                        delete options.chamfer;
                    }

                    return Body.create(Common.extend({}, rectangle, options));
                };

                /**
                 * Creates a new rigid body model with a trapezoid hull. 
                 * The options parameter is an object that specifies any properties you wish to override the defaults.
                 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
                 * @method trapezoid
                 * @param {number} x
                 * @param {number} y
                 * @param {number} width
                 * @param {number} height
                 * @param {number} slope
                 * @param {object} [options]
                 * @return {body} A new trapezoid body
                 */
                Bodies.trapezoid = function (x, y, width, height, slope, options) {
                    options = options || {};

                    slope *= 0.5;
                    var roof = (1 - slope * 2) * width;

                    var x1 = width * slope,
                        x2 = x1 + roof,
                        x3 = x2 + x1,
                        verticesPath;

                    if (slope < 0.5) {
                        verticesPath = 'L 0 0 L ' + x1 + ' ' + -height + ' L ' + x2 + ' ' + -height + ' L ' + x3 + ' 0';
                    } else {
                        verticesPath = 'L 0 0 L ' + x2 + ' ' + -height + ' L ' + x3 + ' 0';
                    }

                    var trapezoid = {
                        label: 'Trapezoid Body',
                        position: { x: x, y: y },
                        vertices: Vertices.fromPath(verticesPath)
                    };

                    if (options.chamfer) {
                        var chamfer = options.chamfer;
                        trapezoid.vertices = Vertices.chamfer(trapezoid.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
                        delete options.chamfer;
                    }

                    return Body.create(Common.extend({}, trapezoid, options));
                };

                /**
                 * Creates a new rigid body model with a circle hull. 
                 * The options parameter is an object that specifies any properties you wish to override the defaults.
                 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
                 * @method circle
                 * @param {number} x
                 * @param {number} y
                 * @param {number} radius
                 * @param {object} [options]
                 * @param {number} [maxSides]
                 * @return {body} A new circle body
                 */
                Bodies.circle = function (x, y, radius, options, maxSides) {
                    options = options || {};

                    var circle = {
                        label: 'Circle Body',
                        circleRadius: radius
                    };

                    // approximate circles with polygons until true circles implemented in SAT
                    maxSides = maxSides || 25;
                    var sides = Math.ceil(Math.max(10, Math.min(maxSides, radius)));

                    // optimisation: always use even number of sides (half the number of unique axes)
                    if (sides % 2 === 1) sides += 1;

                    return Bodies.polygon(x, y, sides, radius, Common.extend({}, circle, options));
                };

                /**
                 * Creates a new rigid body model with a regular polygon hull with the given number of sides. 
                 * The options parameter is an object that specifies any properties you wish to override the defaults.
                 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
                 * @method polygon
                 * @param {number} x
                 * @param {number} y
                 * @param {number} sides
                 * @param {number} radius
                 * @param {object} [options]
                 * @return {body} A new regular polygon body
                 */
                Bodies.polygon = function (x, y, sides, radius, options) {
                    options = options || {};

                    if (sides < 3) return Bodies.circle(x, y, radius, options);

                    var theta = 2 * Math.PI / sides,
                        path = '',
                        offset = theta * 0.5;

                    for (var i = 0; i < sides; i += 1) {
                        var angle = offset + i * theta,
                            xx = Math.cos(angle) * radius,
                            yy = Math.sin(angle) * radius;

                        path += 'L ' + xx.toFixed(3) + ' ' + yy.toFixed(3) + ' ';
                    }

                    var polygon = {
                        label: 'Polygon Body',
                        position: { x: x, y: y },
                        vertices: Vertices.fromPath(path)
                    };

                    if (options.chamfer) {
                        var chamfer = options.chamfer;
                        polygon.vertices = Vertices.chamfer(polygon.vertices, chamfer.radius, chamfer.quality, chamfer.qualityMin, chamfer.qualityMax);
                        delete options.chamfer;
                    }

                    return Body.create(Common.extend({}, polygon, options));
                };

                /**
                 * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
                 * If the vertices are convex, they will pass through as supplied.
                 * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
                 * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
                 * By default the decomposition will discard collinear edges (to improve performance).
                 * It can also optionally discard any parts that have an area less than `minimumArea`.
                 * If the vertices can not be decomposed, the result will fall back to using the convex hull.
                 * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
                 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
                 * @method fromVertices
                 * @param {number} x
                 * @param {number} y
                 * @param [[vector]] vertexSets
                 * @param {object} [options]
                 * @param {bool} [flagInternal=false]
                 * @param {number} [removeCollinear=0.01]
                 * @param {number} [minimumArea=10]
                 * @return {body}
                 */
                Bodies.fromVertices = function (x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
                    var body, parts, isConvex, vertices, i, j, k, v, z;

                    options = options || {};
                    parts = [];

                    flagInternal = typeof flagInternal !== 'undefined' ? flagInternal : false;
                    removeCollinear = typeof removeCollinear !== 'undefined' ? removeCollinear : 0.01;
                    minimumArea = typeof minimumArea !== 'undefined' ? minimumArea : 10;

                    if (!window.decomp) {
                        Common.log('Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.', 'warn');
                    }

                    // ensure vertexSets is an array of arrays
                    if (!Common.isArray(vertexSets[0])) {
                        vertexSets = [vertexSets];
                    }

                    for (v = 0; v < vertexSets.length; v += 1) {
                        vertices = vertexSets[v];
                        isConvex = Vertices.isConvex(vertices);

                        if (isConvex || !window.decomp) {
                            if (isConvex) {
                                vertices = Vertices.clockwiseSort(vertices);
                            } else {
                                // fallback to convex hull when decomposition is not possible
                                vertices = Vertices.hull(vertices);
                            }

                            parts.push({
                                position: { x: x, y: y },
                                vertices: vertices
                            });
                        } else {
                            // initialise a decomposition
                            var concave = new decomp.Polygon();
                            for (i = 0; i < vertices.length; i++) {
                                concave.vertices.push([vertices[i].x, vertices[i].y]);
                            }

                            // vertices are concave and simple, we can decompose into parts
                            concave.makeCCW();
                            if (removeCollinear !== false) concave.removeCollinearPoints(removeCollinear);

                            // use the quick decomposition algorithm (Bayazit)
                            var decomposed = concave.quickDecomp();

                            // for each decomposed chunk
                            for (i = 0; i < decomposed.length; i++) {
                                var chunk = decomposed[i],
                                    chunkVertices = [];

                                // convert vertices into the correct structure
                                for (j = 0; j < chunk.vertices.length; j++) {
                                    chunkVertices.push({ x: chunk.vertices[j][0], y: chunk.vertices[j][1] });
                                }

                                // skip small chunks
                                if (minimumArea > 0 && Vertices.area(chunkVertices) < minimumArea) continue;

                                // create a compound part
                                parts.push({
                                    position: Vertices.centre(chunkVertices),
                                    vertices: chunkVertices
                                });
                            }
                        }
                    }

                    // create body parts
                    for (i = 0; i < parts.length; i++) {
                        parts[i] = Body.create(Common.extend(parts[i], options));
                    }

                    // flag internal edges (coincident part edges)
                    if (flagInternal) {
                        var coincident_max_dist = 5;

                        for (i = 0; i < parts.length; i++) {
                            var partA = parts[i];

                            for (j = i + 1; j < parts.length; j++) {
                                var partB = parts[j];

                                if (Bounds.overlaps(partA.bounds, partB.bounds)) {
                                    var pav = partA.vertices,
                                        pbv = partB.vertices;

                                    // iterate vertices of both parts
                                    for (k = 0; k < partA.vertices.length; k++) {
                                        for (z = 0; z < partB.vertices.length; z++) {
                                            // find distances between the vertices
                                            var da = Vector.magnitudeSquared(Vector.sub(pav[(k + 1) % pav.length], pbv[z])),
                                                db = Vector.magnitudeSquared(Vector.sub(pav[k], pbv[(z + 1) % pbv.length]));

                                            // if both vertices are very close, consider the edge concident (internal)
                                            if (da < coincident_max_dist && db < coincident_max_dist) {
                                                pav[k].isInternal = true;
                                                pbv[z].isInternal = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (parts.length > 1) {
                        // create the parent body to be returned, that contains generated compound parts
                        body = Body.create(Common.extend({ parts: parts.slice(0) }, options));
                        Body.setPosition(body, { x: x, y: y });

                        return body;
                    } else {
                        return parts[0];
                    }
                };
            })();
        }, { "../body/Body": 1, "../core/Common": 14, "../geometry/Bounds": 24, "../geometry/Vector": 26, "../geometry/Vertices": 27 }], 22: [function (require, module, exports) {
            /**
            * The `Matter.Composites` module contains factory methods for creating composite bodies
            * with commonly used configurations (such as stacks and chains).
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Composites
            */

            var Composites = {};

            module.exports = Composites;

            var Composite = require('../body/Composite');
            var Constraint = require('../constraint/Constraint');
            var Common = require('../core/Common');
            var Body = require('../body/Body');
            var Bodies = require('./Bodies');

            (function () {

                /**
                 * Create a new composite containing bodies created in the callback in a grid arrangement.
                 * This function uses the body's bounds to prevent overlaps.
                 * @method stack
                 * @param {number} xx
                 * @param {number} yy
                 * @param {number} columns
                 * @param {number} rows
                 * @param {number} columnGap
                 * @param {number} rowGap
                 * @param {function} callback
                 * @return {composite} A new composite containing objects created in the callback
                 */
                Composites.stack = function (xx, yy, columns, rows, columnGap, rowGap, callback) {
                    var stack = Composite.create({ label: 'Stack' }),
                        x = xx,
                        y = yy,
                        lastBody,
                        i = 0;

                    for (var row = 0; row < rows; row++) {
                        var maxHeight = 0;

                        for (var column = 0; column < columns; column++) {
                            var body = callback(x, y, column, row, lastBody, i);

                            if (body) {
                                var bodyHeight = body.bounds.max.y - body.bounds.min.y,
                                    bodyWidth = body.bounds.max.x - body.bounds.min.x;

                                if (bodyHeight > maxHeight) maxHeight = bodyHeight;

                                Body.translate(body, { x: bodyWidth * 0.5, y: bodyHeight * 0.5 });

                                x = body.bounds.max.x + columnGap;

                                Composite.addBody(stack, body);

                                lastBody = body;
                                i += 1;
                            } else {
                                x += columnGap;
                            }
                        }

                        y += maxHeight + rowGap;
                        x = xx;
                    }

                    return stack;
                };

                /**
                 * Chains all bodies in the given composite together using constraints.
                 * @method chain
                 * @param {composite} composite
                 * @param {number} xOffsetA
                 * @param {number} yOffsetA
                 * @param {number} xOffsetB
                 * @param {number} yOffsetB
                 * @param {object} options
                 * @return {composite} A new composite containing objects chained together with constraints
                 */
                Composites.chain = function (composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options) {
                    var bodies = composite.bodies;

                    for (var i = 1; i < bodies.length; i++) {
                        var bodyA = bodies[i - 1],
                            bodyB = bodies[i],
                            bodyAHeight = bodyA.bounds.max.y - bodyA.bounds.min.y,
                            bodyAWidth = bodyA.bounds.max.x - bodyA.bounds.min.x,
                            bodyBHeight = bodyB.bounds.max.y - bodyB.bounds.min.y,
                            bodyBWidth = bodyB.bounds.max.x - bodyB.bounds.min.x;

                        var defaults = {
                            bodyA: bodyA,
                            pointA: { x: bodyAWidth * xOffsetA, y: bodyAHeight * yOffsetA },
                            bodyB: bodyB,
                            pointB: { x: bodyBWidth * xOffsetB, y: bodyBHeight * yOffsetB }
                        };

                        var constraint = Common.extend(defaults, options);

                        Composite.addConstraint(composite, Constraint.create(constraint));
                    }

                    composite.label += ' Chain';

                    return composite;
                };

                /**
                 * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
                 * @method mesh
                 * @param {composite} composite
                 * @param {number} columns
                 * @param {number} rows
                 * @param {boolean} crossBrace
                 * @param {object} options
                 * @return {composite} The composite containing objects meshed together with constraints
                 */
                Composites.mesh = function (composite, columns, rows, crossBrace, options) {
                    var bodies = composite.bodies,
                        row,
                        col,
                        bodyA,
                        bodyB,
                        bodyC;

                    for (row = 0; row < rows; row++) {
                        for (col = 1; col < columns; col++) {
                            bodyA = bodies[col - 1 + row * columns];
                            bodyB = bodies[col + row * columns];
                            Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));
                        }

                        if (row > 0) {
                            for (col = 0; col < columns; col++) {
                                bodyA = bodies[col + (row - 1) * columns];
                                bodyB = bodies[col + row * columns];
                                Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyA, bodyB: bodyB }, options)));

                                if (crossBrace && col > 0) {
                                    bodyC = bodies[col - 1 + (row - 1) * columns];
                                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                                }

                                if (crossBrace && col < columns - 1) {
                                    bodyC = bodies[col + 1 + (row - 1) * columns];
                                    Composite.addConstraint(composite, Constraint.create(Common.extend({ bodyA: bodyC, bodyB: bodyB }, options)));
                                }
                            }
                        }
                    }

                    composite.label += ' Mesh';

                    return composite;
                };

                /**
                 * Create a new composite containing bodies created in the callback in a pyramid arrangement.
                 * This function uses the body's bounds to prevent overlaps.
                 * @method pyramid
                 * @param {number} xx
                 * @param {number} yy
                 * @param {number} columns
                 * @param {number} rows
                 * @param {number} columnGap
                 * @param {number} rowGap
                 * @param {function} callback
                 * @return {composite} A new composite containing objects created in the callback
                 */
                Composites.pyramid = function (xx, yy, columns, rows, columnGap, rowGap, callback) {
                    return Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function (x, y, column, row, lastBody, i) {
                        var actualRows = Math.min(rows, Math.ceil(columns / 2)),
                            lastBodyWidth = lastBody ? lastBody.bounds.max.x - lastBody.bounds.min.x : 0;

                        if (row > actualRows) return;

                        // reverse row order
                        row = actualRows - row;

                        var start = row,
                            end = columns - 1 - row;

                        if (column < start || column > end) return;

                        // retroactively fix the first body's position, since width was unknown
                        if (i === 1) {
                            Body.translate(lastBody, { x: (column + (columns % 2 === 1 ? 1 : -1)) * lastBodyWidth, y: 0 });
                        }

                        var xOffset = lastBody ? column * lastBodyWidth : 0;

                        return callback(xx + xOffset + column * columnGap, y, column, row, lastBody, i);
                    });
                };

                /**
                 * Creates a composite with a Newton's Cradle setup of bodies and constraints.
                 * @method newtonsCradle
                 * @param {number} xx
                 * @param {number} yy
                 * @param {number} number
                 * @param {number} size
                 * @param {number} length
                 * @return {composite} A new composite newtonsCradle body
                 */
                Composites.newtonsCradle = function (xx, yy, number, size, length) {
                    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

                    for (var i = 0; i < number; i++) {
                        var separation = 1.9,
                            circle = Bodies.circle(xx + i * (size * separation), yy + length, size, { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0.0001, slop: 1 }),
                            constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });

                        Composite.addBody(newtonsCradle, circle);
                        Composite.addConstraint(newtonsCradle, constraint);
                    }

                    return newtonsCradle;
                };

                /**
                 * Creates a composite with simple car setup of bodies and constraints.
                 * @method car
                 * @param {number} xx
                 * @param {number} yy
                 * @param {number} width
                 * @param {number} height
                 * @param {number} wheelSize
                 * @return {composite} A new composite car body
                 */
                Composites.car = function (xx, yy, width, height, wheelSize) {
                    var group = Body.nextGroup(true),
                        wheelBase = -20,
                        wheelAOffset = -width * 0.5 + wheelBase,
                        wheelBOffset = width * 0.5 - wheelBase,
                        wheelYOffset = 0;

                    var car = Composite.create({ label: 'Car' }),
                        body = Bodies.trapezoid(xx, yy, width, height, 0.3, {
                        collisionFilter: {
                            group: group
                        },
                        friction: 0.01,
                        chamfer: {
                            radius: 10
                        }
                    });

                    var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
                        collisionFilter: {
                            group: group
                        },
                        friction: 0.8,
                        density: 0.01
                    });

                    var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
                        collisionFilter: {
                            group: group
                        },
                        friction: 0.8,
                        density: 0.01
                    });

                    var axelA = Constraint.create({
                        bodyA: body,
                        pointA: { x: wheelAOffset, y: wheelYOffset },
                        bodyB: wheelA,
                        stiffness: 0.2
                    });

                    var axelB = Constraint.create({
                        bodyA: body,
                        pointA: { x: wheelBOffset, y: wheelYOffset },
                        bodyB: wheelB,
                        stiffness: 0.2
                    });

                    Composite.addBody(car, body);
                    Composite.addBody(car, wheelA);
                    Composite.addBody(car, wheelB);
                    Composite.addConstraint(car, axelA);
                    Composite.addConstraint(car, axelB);

                    return car;
                };

                /**
                 * Creates a simple soft body like object.
                 * @method softBody
                 * @param {number} xx
                 * @param {number} yy
                 * @param {number} columns
                 * @param {number} rows
                 * @param {number} columnGap
                 * @param {number} rowGap
                 * @param {boolean} crossBrace
                 * @param {number} particleRadius
                 * @param {} particleOptions
                 * @param {} constraintOptions
                 * @return {composite} A new composite softBody
                 */
                Composites.softBody = function (xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
                    particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
                    constraintOptions = Common.extend({ stiffness: 0.4 }, constraintOptions);

                    var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function (x, y) {
                        return Bodies.circle(x, y, particleRadius, particleOptions);
                    });

                    Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

                    softBody.label = 'Soft Body';

                    return softBody;
                };
            })();
        }, { "../body/Body": 1, "../body/Composite": 2, "../constraint/Constraint": 12, "../core/Common": 14, "./Bodies": 21 }], 23: [function (require, module, exports) {
            /**
            * The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
            *
            * @class Axes
            */

            var Axes = {};

            module.exports = Axes;

            var Vector = require('../geometry/Vector');
            var Common = require('../core/Common');

            (function () {

                /**
                 * Creates a new set of axes from the given vertices.
                 * @method fromVertices
                 * @param {vertices} vertices
                 * @return {axes} A new axes from the given vertices
                 */
                Axes.fromVertices = function (vertices) {
                    var axes = {};

                    // find the unique axes, using edge normal gradients
                    for (var i = 0; i < vertices.length; i++) {
                        var j = (i + 1) % vertices.length,
                            normal = Vector.normalise({
                            x: vertices[j].y - vertices[i].y,
                            y: vertices[i].x - vertices[j].x
                        }),
                            gradient = normal.y === 0 ? Infinity : normal.x / normal.y;

                        // limit precision
                        gradient = gradient.toFixed(3).toString();
                        axes[gradient] = normal;
                    }

                    return Common.values(axes);
                };

                /**
                 * Rotates a set of axes by the given angle.
                 * @method rotate
                 * @param {axes} axes
                 * @param {number} angle
                 */
                Axes.rotate = function (axes, angle) {
                    if (angle === 0) return;

                    var cos = Math.cos(angle),
                        sin = Math.sin(angle);

                    for (var i = 0; i < axes.length; i++) {
                        var axis = axes[i],
                            xx;
                        xx = axis.x * cos - axis.y * sin;
                        axis.y = axis.x * sin + axis.y * cos;
                        axis.x = xx;
                    }
                };
            })();
        }, { "../core/Common": 14, "../geometry/Vector": 26 }], 24: [function (require, module, exports) {
            /**
            * The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
            *
            * @class Bounds
            */

            var Bounds = {};

            module.exports = Bounds;

            (function () {

                /**
                 * Creates a new axis-aligned bounding box (AABB) for the given vertices.
                 * @method create
                 * @param {vertices} vertices
                 * @return {bounds} A new bounds object
                 */
                Bounds.create = function (vertices) {
                    var bounds = {
                        min: { x: 0, y: 0 },
                        max: { x: 0, y: 0 }
                    };

                    if (vertices) Bounds.update(bounds, vertices);

                    return bounds;
                };

                /**
                 * Updates bounds using the given vertices and extends the bounds given a velocity.
                 * @method update
                 * @param {bounds} bounds
                 * @param {vertices} vertices
                 * @param {vector} velocity
                 */
                Bounds.update = function (bounds, vertices, velocity) {
                    bounds.min.x = Infinity;
                    bounds.max.x = -Infinity;
                    bounds.min.y = Infinity;
                    bounds.max.y = -Infinity;

                    for (var i = 0; i < vertices.length; i++) {
                        var vertex = vertices[i];
                        if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
                        if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
                        if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
                        if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
                    }

                    if (velocity) {
                        if (velocity.x > 0) {
                            bounds.max.x += velocity.x;
                        } else {
                            bounds.min.x += velocity.x;
                        }

                        if (velocity.y > 0) {
                            bounds.max.y += velocity.y;
                        } else {
                            bounds.min.y += velocity.y;
                        }
                    }
                };

                /**
                 * Returns true if the bounds contains the given point.
                 * @method contains
                 * @param {bounds} bounds
                 * @param {vector} point
                 * @return {boolean} True if the bounds contain the point, otherwise false
                 */
                Bounds.contains = function (bounds, point) {
                    return point.x >= bounds.min.x && point.x <= bounds.max.x && point.y >= bounds.min.y && point.y <= bounds.max.y;
                };

                /**
                 * Returns true if the two bounds intersect.
                 * @method overlaps
                 * @param {bounds} boundsA
                 * @param {bounds} boundsB
                 * @return {boolean} True if the bounds overlap, otherwise false
                 */
                Bounds.overlaps = function (boundsA, boundsB) {
                    return boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y;
                };

                /**
                 * Translates the bounds by the given vector.
                 * @method translate
                 * @param {bounds} bounds
                 * @param {vector} vector
                 */
                Bounds.translate = function (bounds, vector) {
                    bounds.min.x += vector.x;
                    bounds.max.x += vector.x;
                    bounds.min.y += vector.y;
                    bounds.max.y += vector.y;
                };

                /**
                 * Shifts the bounds to the given position.
                 * @method shift
                 * @param {bounds} bounds
                 * @param {vector} position
                 */
                Bounds.shift = function (bounds, position) {
                    var deltaX = bounds.max.x - bounds.min.x,
                        deltaY = bounds.max.y - bounds.min.y;

                    bounds.min.x = position.x;
                    bounds.max.x = position.x + deltaX;
                    bounds.min.y = position.y;
                    bounds.max.y = position.y + deltaY;
                };
            })();
        }, {}], 25: [function (require, module, exports) {
            /**
            * The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
            *
            * To use this module you also need the SVGPathSeg polyfill: https://github.com/progers/pathseg
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Svg
            */

            var Svg = {};

            module.exports = Svg;

            var Bounds = require('../geometry/Bounds');

            (function () {

                /**
                 * Converts an SVG path into an array of vector points.
                 * If the input path forms a concave shape, you must decompose the result into convex parts before use.
                 * See `Bodies.fromVertices` which provides support for this.
                 * Note that this function is not guaranteed to support complex paths (such as those with holes).
                 * @method pathToVertices
                 * @param {SVGPathElement} path
                 * @param {Number} [sampleLength=15]
                 * @return {Vector[]} points
                 */
                Svg.pathToVertices = function (path, sampleLength) {
                    // https://github.com/wout/svg.topoly.js/blob/master/svg.topoly.js
                    var i,
                        il,
                        total,
                        point,
                        segment,
                        segments,
                        segmentsQueue,
                        lastSegment,
                        lastPoint,
                        segmentIndex,
                        points = [],
                        lx,
                        ly,
                        length = 0,
                        x = 0,
                        y = 0;

                    sampleLength = sampleLength || 15;

                    var addPoint = function addPoint(px, py, pathSegType) {
                        // all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
                        var isRelative = pathSegType % 2 === 1 && pathSegType > 1;

                        // when the last point doesn't equal the current point add the current point
                        if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
                            if (lastPoint && isRelative) {
                                lx = lastPoint.x;
                                ly = lastPoint.y;
                            } else {
                                lx = 0;
                                ly = 0;
                            }

                            var point = {
                                x: lx + px,
                                y: ly + py
                            };

                            // set last point
                            if (isRelative || !lastPoint) {
                                lastPoint = point;
                            }

                            points.push(point);

                            x = lx + px;
                            y = ly + py;
                        }
                    };

                    var addSegmentPoint = function addSegmentPoint(segment) {
                        var segType = segment.pathSegTypeAsLetter.toUpperCase();

                        // skip path ends
                        if (segType === 'Z') return;

                        // map segment to x and y
                        switch (segType) {

                            case 'M':
                            case 'L':
                            case 'T':
                            case 'C':
                            case 'S':
                            case 'Q':
                                x = segment.x;
                                y = segment.y;
                                break;
                            case 'H':
                                x = segment.x;
                                break;
                            case 'V':
                                y = segment.y;
                                break;
                        }

                        addPoint(x, y, segment.pathSegType);
                    };

                    // ensure path is absolute
                    _svgPathToAbsolute(path);

                    // get total length
                    total = path.getTotalLength();

                    // queue segments
                    segments = [];
                    for (i = 0; i < path.pathSegList.numberOfItems; i += 1) {
                        segments.push(path.pathSegList.getItem(i));
                    }segmentsQueue = segments.concat();

                    // sample through path
                    while (length < total) {
                        // get segment at position
                        segmentIndex = path.getPathSegAtLength(length);
                        segment = segments[segmentIndex];

                        // new segment
                        if (segment != lastSegment) {
                            while (segmentsQueue.length && segmentsQueue[0] != segment) {
                                addSegmentPoint(segmentsQueue.shift());
                            }lastSegment = segment;
                        }

                        // add points in between when curving
                        // TODO: adaptive sampling
                        switch (segment.pathSegTypeAsLetter.toUpperCase()) {

                            case 'C':
                            case 'T':
                            case 'S':
                            case 'Q':
                            case 'A':
                                point = path.getPointAtLength(length);
                                addPoint(point.x, point.y, 0);
                                break;

                        }

                        // increment by sample value
                        length += sampleLength;
                    }

                    // add remaining segments not passed by sampling
                    for (i = 0, il = segmentsQueue.length; i < il; ++i) {
                        addSegmentPoint(segmentsQueue[i]);
                    }return points;
                };

                var _svgPathToAbsolute = function _svgPathToAbsolute(path) {
                    // http://phrogz.net/convert-svg-path-to-all-absolute-commands
                    var x0,
                        y0,
                        x1,
                        y1,
                        x2,
                        y2,
                        segs = path.pathSegList,
                        x = 0,
                        y = 0,
                        len = segs.numberOfItems;

                    for (var i = 0; i < len; ++i) {
                        var seg = segs.getItem(i),
                            segType = seg.pathSegTypeAsLetter;

                        if (/[MLHVCSQTA]/.test(segType)) {
                            if ('x' in seg) x = seg.x;
                            if ('y' in seg) y = seg.y;
                        } else {
                            if ('x1' in seg) x1 = x + seg.x1;
                            if ('x2' in seg) x2 = x + seg.x2;
                            if ('y1' in seg) y1 = y + seg.y1;
                            if ('y2' in seg) y2 = y + seg.y2;
                            if ('x' in seg) x += seg.x;
                            if ('y' in seg) y += seg.y;

                            switch (segType) {

                                case 'm':
                                    segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
                                    break;
                                case 'l':
                                    segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
                                    break;
                                case 'h':
                                    segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
                                    break;
                                case 'v':
                                    segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
                                    break;
                                case 'c':
                                    segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
                                    break;
                                case 's':
                                    segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
                                    break;
                                case 'q':
                                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
                                    break;
                                case 't':
                                    segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
                                    break;
                                case 'a':
                                    segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
                                    break;
                                case 'z':
                                case 'Z':
                                    x = x0;
                                    y = y0;
                                    break;

                            }
                        }

                        if (segType == 'M' || segType == 'm') {
                            x0 = x;
                            y0 = y;
                        }
                    }
                };
            })();
        }, { "../geometry/Bounds": 24 }], 26: [function (require, module, exports) {
            /**
            * The `Matter.Vector` module contains methods for creating and manipulating vectors.
            * Vectors are the basis of all the geometry related operations in the engine.
            * A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Vector
            */

            // TODO: consider params for reusing vector objects

            var Vector = {};

            module.exports = Vector;

            (function () {

                /**
                 * Creates a new vector.
                 * @method create
                 * @param {number} x
                 * @param {number} y
                 * @return {vector} A new vector
                 */
                Vector.create = function (x, y) {
                    return { x: x || 0, y: y || 0 };
                };

                /**
                 * Returns a new vector with `x` and `y` copied from the given `vector`.
                 * @method clone
                 * @param {vector} vector
                 * @return {vector} A new cloned vector
                 */
                Vector.clone = function (vector) {
                    return { x: vector.x, y: vector.y };
                };

                /**
                 * Returns the magnitude (length) of a vector.
                 * @method magnitude
                 * @param {vector} vector
                 * @return {number} The magnitude of the vector
                 */
                Vector.magnitude = function (vector) {
                    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
                };

                /**
                 * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
                 * @method magnitudeSquared
                 * @param {vector} vector
                 * @return {number} The squared magnitude of the vector
                 */
                Vector.magnitudeSquared = function (vector) {
                    return vector.x * vector.x + vector.y * vector.y;
                };

                /**
                 * Rotates the vector about (0, 0) by specified angle.
                 * @method rotate
                 * @param {vector} vector
                 * @param {number} angle
                 * @return {vector} A new vector rotated about (0, 0)
                 */
                Vector.rotate = function (vector, angle) {
                    var cos = Math.cos(angle),
                        sin = Math.sin(angle);
                    return {
                        x: vector.x * cos - vector.y * sin,
                        y: vector.x * sin + vector.y * cos
                    };
                };

                /**
                 * Rotates the vector about a specified point by specified angle.
                 * @method rotateAbout
                 * @param {vector} vector
                 * @param {number} angle
                 * @param {vector} point
                 * @param {vector} [output]
                 * @return {vector} A new vector rotated about the point
                 */
                Vector.rotateAbout = function (vector, angle, point, output) {
                    var cos = Math.cos(angle),
                        sin = Math.sin(angle);
                    if (!output) output = {};
                    var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
                    output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
                    output.x = x;
                    return output;
                };

                /**
                 * Normalises a vector (such that its magnitude is `1`).
                 * @method normalise
                 * @param {vector} vector
                 * @return {vector} A new vector normalised
                 */
                Vector.normalise = function (vector) {
                    var magnitude = Vector.magnitude(vector);
                    if (magnitude === 0) return { x: 0, y: 0 };
                    return { x: vector.x / magnitude, y: vector.y / magnitude };
                };

                /**
                 * Returns the dot-product of two vectors.
                 * @method dot
                 * @param {vector} vectorA
                 * @param {vector} vectorB
                 * @return {number} The dot product of the two vectors
                 */
                Vector.dot = function (vectorA, vectorB) {
                    return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
                };

                /**
                 * Returns the cross-product of two vectors.
                 * @method cross
                 * @param {vector} vectorA
                 * @param {vector} vectorB
                 * @return {number} The cross product of the two vectors
                 */
                Vector.cross = function (vectorA, vectorB) {
                    return vectorA.x * vectorB.y - vectorA.y * vectorB.x;
                };

                /**
                 * Returns the cross-product of three vectors.
                 * @method cross3
                 * @param {vector} vectorA
                 * @param {vector} vectorB
                 * @param {vector} vectorC
                 * @return {number} The cross product of the three vectors
                 */
                Vector.cross3 = function (vectorA, vectorB, vectorC) {
                    return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
                };

                /**
                 * Adds the two vectors.
                 * @method add
                 * @param {vector} vectorA
                 * @param {vector} vectorB
                 * @param {vector} [output]
                 * @return {vector} A new vector of vectorA and vectorB added
                 */
                Vector.add = function (vectorA, vectorB, output) {
                    if (!output) output = {};
                    output.x = vectorA.x + vectorB.x;
                    output.y = vectorA.y + vectorB.y;
                    return output;
                };

                /**
                 * Subtracts the two vectors.
                 * @method sub
                 * @param {vector} vectorA
                 * @param {vector} vectorB
                 * @param {vector} [output]
                 * @return {vector} A new vector of vectorA and vectorB subtracted
                 */
                Vector.sub = function (vectorA, vectorB, output) {
                    if (!output) output = {};
                    output.x = vectorA.x - vectorB.x;
                    output.y = vectorA.y - vectorB.y;
                    return output;
                };

                /**
                 * Multiplies a vector and a scalar.
                 * @method mult
                 * @param {vector} vector
                 * @param {number} scalar
                 * @return {vector} A new vector multiplied by scalar
                 */
                Vector.mult = function (vector, scalar) {
                    return { x: vector.x * scalar, y: vector.y * scalar };
                };

                /**
                 * Divides a vector and a scalar.
                 * @method div
                 * @param {vector} vector
                 * @param {number} scalar
                 * @return {vector} A new vector divided by scalar
                 */
                Vector.div = function (vector, scalar) {
                    return { x: vector.x / scalar, y: vector.y / scalar };
                };

                /**
                 * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
                 * @method perp
                 * @param {vector} vector
                 * @param {bool} [negate=false]
                 * @return {vector} The perpendicular vector
                 */
                Vector.perp = function (vector, negate) {
                    negate = negate === true ? -1 : 1;
                    return { x: negate * -vector.y, y: negate * vector.x };
                };

                /**
                 * Negates both components of a vector such that it points in the opposite direction.
                 * @method neg
                 * @param {vector} vector
                 * @return {vector} The negated vector
                 */
                Vector.neg = function (vector) {
                    return { x: -vector.x, y: -vector.y };
                };

                /**
                 * Returns the angle in radians between the two vectors relative to the x-axis.
                 * @method angle
                 * @param {vector} vectorA
                 * @param {vector} vectorB
                 * @return {number} The angle in radians
                 */
                Vector.angle = function (vectorA, vectorB) {
                    return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
                };

                /**
                 * Temporary vector pool (not thread-safe).
                 * @property _temp
                 * @type {vector[]}
                 * @private
                 */
                Vector._temp = [Vector.create(), Vector.create(), Vector.create(), Vector.create(), Vector.create(), Vector.create()];
            })();
        }, {}], 27: [function (require, module, exports) {
            /**
            * The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
            * A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
            * A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
            *
            * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
            *
            * @class Vertices
            */

            var Vertices = {};

            module.exports = Vertices;

            var Vector = require('../geometry/Vector');
            var Common = require('../core/Common');

            (function () {

                /**
                 * Creates a new set of `Matter.Body` compatible vertices.
                 * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
                 *
                 *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
                 *
                 * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
                 * but with some additional references required for efficient collision detection routines.
                 *
                 * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
                 *
                 * @method create
                 * @param {vector[]} points
                 * @param {body} body
                 */
                Vertices.create = function (points, body) {
                    var vertices = [];

                    for (var i = 0; i < points.length; i++) {
                        var point = points[i],
                            vertex = {
                            x: point.x,
                            y: point.y,
                            index: i,
                            body: body,
                            isInternal: false
                        };

                        vertices.push(vertex);
                    }

                    return vertices;
                };

                /**
                 * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
                 * into a `Matter.Vertices` object for the given `Matter.Body`.
                 * For parsing SVG paths, see `Svg.pathToVertices`.
                 * @method fromPath
                 * @param {string} path
                 * @param {body} body
                 * @return {vertices} vertices
                 */
                Vertices.fromPath = function (path, body) {
                    var pathPattern = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig,
                        points = [];

                    path.replace(pathPattern, function (match, x, y) {
                        points.push({ x: parseFloat(x), y: parseFloat(y) });
                    });

                    return Vertices.create(points, body);
                };

                /**
                 * Returns the centre (centroid) of the set of vertices.
                 * @method centre
                 * @param {vertices} vertices
                 * @return {vector} The centre point
                 */
                Vertices.centre = function (vertices) {
                    var area = Vertices.area(vertices, true),
                        centre = { x: 0, y: 0 },
                        cross,
                        temp,
                        j;

                    for (var i = 0; i < vertices.length; i++) {
                        j = (i + 1) % vertices.length;
                        cross = Vector.cross(vertices[i], vertices[j]);
                        temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
                        centre = Vector.add(centre, temp);
                    }

                    return Vector.div(centre, 6 * area);
                };

                /**
                 * Returns the average (mean) of the set of vertices.
                 * @method mean
                 * @param {vertices} vertices
                 * @return {vector} The average point
                 */
                Vertices.mean = function (vertices) {
                    var average = { x: 0, y: 0 };

                    for (var i = 0; i < vertices.length; i++) {
                        average.x += vertices[i].x;
                        average.y += vertices[i].y;
                    }

                    return Vector.div(average, vertices.length);
                };

                /**
                 * Returns the area of the set of vertices.
                 * @method area
                 * @param {vertices} vertices
                 * @param {bool} signed
                 * @return {number} The area
                 */
                Vertices.area = function (vertices, signed) {
                    var area = 0,
                        j = vertices.length - 1;

                    for (var i = 0; i < vertices.length; i++) {
                        area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
                        j = i;
                    }

                    if (signed) return area / 2;

                    return Math.abs(area) / 2;
                };

                /**
                 * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
                 * @method inertia
                 * @param {vertices} vertices
                 * @param {number} mass
                 * @return {number} The polygon's moment of inertia
                 */
                Vertices.inertia = function (vertices, mass) {
                    var numerator = 0,
                        denominator = 0,
                        v = vertices,
                        cross,
                        j;

                    // find the polygon's moment of inertia, using second moment of area
                    // http://www.physicsforums.com/showthread.php?t=25293
                    for (var n = 0; n < v.length; n++) {
                        j = (n + 1) % v.length;
                        cross = Math.abs(Vector.cross(v[j], v[n]));
                        numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
                        denominator += cross;
                    }

                    return mass / 6 * (numerator / denominator);
                };

                /**
                 * Translates the set of vertices in-place.
                 * @method translate
                 * @param {vertices} vertices
                 * @param {vector} vector
                 * @param {number} scalar
                 */
                Vertices.translate = function (vertices, vector, scalar) {
                    var i;
                    if (scalar) {
                        for (i = 0; i < vertices.length; i++) {
                            vertices[i].x += vector.x * scalar;
                            vertices[i].y += vector.y * scalar;
                        }
                    } else {
                        for (i = 0; i < vertices.length; i++) {
                            vertices[i].x += vector.x;
                            vertices[i].y += vector.y;
                        }
                    }

                    return vertices;
                };

                /**
                 * Rotates the set of vertices in-place.
                 * @method rotate
                 * @param {vertices} vertices
                 * @param {number} angle
                 * @param {vector} point
                 */
                Vertices.rotate = function (vertices, angle, point) {
                    if (angle === 0) return;

                    var cos = Math.cos(angle),
                        sin = Math.sin(angle);

                    for (var i = 0; i < vertices.length; i++) {
                        var vertice = vertices[i],
                            dx = vertice.x - point.x,
                            dy = vertice.y - point.y;

                        vertice.x = point.x + (dx * cos - dy * sin);
                        vertice.y = point.y + (dx * sin + dy * cos);
                    }

                    return vertices;
                };

                /**
                 * Returns `true` if the `point` is inside the set of `vertices`.
                 * @method contains
                 * @param {vertices} vertices
                 * @param {vector} point
                 * @return {boolean} True if the vertices contains point, otherwise false
                 */
                Vertices.contains = function (vertices, point) {
                    for (var i = 0; i < vertices.length; i++) {
                        var vertice = vertices[i],
                            nextVertice = vertices[(i + 1) % vertices.length];
                        if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                            return false;
                        }
                    }

                    return true;
                };

                /**
                 * Scales the vertices from a point (default is centre) in-place.
                 * @method scale
                 * @param {vertices} vertices
                 * @param {number} scaleX
                 * @param {number} scaleY
                 * @param {vector} point
                 */
                Vertices.scale = function (vertices, scaleX, scaleY, point) {
                    if (scaleX === 1 && scaleY === 1) return vertices;

                    point = point || Vertices.centre(vertices);

                    var vertex, delta;

                    for (var i = 0; i < vertices.length; i++) {
                        vertex = vertices[i];
                        delta = Vector.sub(vertex, point);
                        vertices[i].x = point.x + delta.x * scaleX;
                        vertices[i].y = point.y + delta.y * scaleY;
                    }

                    return vertices;
                };

                /**
                 * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
                 * The radius parameter is a single number or an array to specify the radius for each vertex.
                 * @method chamfer
                 * @param {vertices} vertices
                 * @param {number[]} radius
                 * @param {number} quality
                 * @param {number} qualityMin
                 * @param {number} qualityMax
                 */
                Vertices.chamfer = function (vertices, radius, quality, qualityMin, qualityMax) {
                    radius = radius || [8];

                    if (!radius.length) radius = [radius];

                    // quality defaults to -1, which is auto
                    quality = typeof quality !== 'undefined' ? quality : -1;
                    qualityMin = qualityMin || 2;
                    qualityMax = qualityMax || 14;

                    var newVertices = [];

                    for (var i = 0; i < vertices.length; i++) {
                        var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                            vertex = vertices[i],
                            nextVertex = vertices[(i + 1) % vertices.length],
                            currentRadius = radius[i < radius.length ? i : radius.length - 1];

                        if (currentRadius === 0) {
                            newVertices.push(vertex);
                            continue;
                        }

                        var prevNormal = Vector.normalise({
                            x: vertex.y - prevVertex.y,
                            y: prevVertex.x - vertex.x
                        });

                        var nextNormal = Vector.normalise({
                            x: nextVertex.y - vertex.y,
                            y: vertex.x - nextVertex.x
                        });

                        var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                            radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                            midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                            scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

                        var precision = quality;

                        if (quality === -1) {
                            // automatically decide precision
                            precision = Math.pow(currentRadius, 0.32) * 1.75;
                        }

                        precision = Common.clamp(precision, qualityMin, qualityMax);

                        // use an even value for precision, more likely to reduce axes by using symmetry
                        if (precision % 2 === 1) precision += 1;

                        var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                            theta = alpha / precision;

                        for (var j = 0; j < precision; j++) {
                            newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
                        }
                    }

                    return newVertices;
                };

                /**
                 * Sorts the input vertices into clockwise order in place.
                 * @method clockwiseSort
                 * @param {vertices} vertices
                 * @return {vertices} vertices
                 */
                Vertices.clockwiseSort = function (vertices) {
                    var centre = Vertices.mean(vertices);

                    vertices.sort(function (vertexA, vertexB) {
                        return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
                    });

                    return vertices;
                };

                /**
                 * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
                 * @method isConvex
                 * @param {vertices} vertices
                 * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
                 */
                Vertices.isConvex = function (vertices) {
                    // http://paulbourke.net/geometry/polygonmesh/

                    var flag = 0,
                        n = vertices.length,
                        i,
                        j,
                        k,
                        z;

                    if (n < 3) return null;

                    for (i = 0; i < n; i++) {
                        j = (i + 1) % n;
                        k = (i + 2) % n;
                        z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
                        z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);

                        if (z < 0) {
                            flag |= 1;
                        } else if (z > 0) {
                            flag |= 2;
                        }

                        if (flag === 3) {
                            return false;
                        }
                    }

                    if (flag !== 0) {
                        return true;
                    } else {
                        return null;
                    }
                };

                /**
                 * Returns the convex hull of the input vertices as a new array of points.
                 * @method hull
                 * @param {vertices} vertices
                 * @return [vertex] vertices
                 */
                Vertices.hull = function (vertices) {
                    // http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain

                    var upper = [],
                        lower = [],
                        vertex,
                        i;

                    // sort vertices on x-axis (y-axis for ties)
                    vertices = vertices.slice(0);
                    vertices.sort(function (vertexA, vertexB) {
                        var dx = vertexA.x - vertexB.x;
                        return dx !== 0 ? dx : vertexA.y - vertexB.y;
                    });

                    // build lower hull
                    for (i = 0; i < vertices.length; i++) {
                        vertex = vertices[i];

                        while (lower.length >= 2 && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                            lower.pop();
                        }

                        lower.push(vertex);
                    }

                    // build upper hull
                    for (i = vertices.length - 1; i >= 0; i--) {
                        vertex = vertices[i];

                        while (upper.length >= 2 && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                            upper.pop();
                        }

                        upper.push(vertex);
                    }

                    // concatenation of the lower and upper hulls gives the convex hull
                    // omit last points because they are repeated at the beginning of the other list
                    upper.pop();
                    lower.pop();

                    return upper.concat(lower);
                };
            })();
        }, { "../core/Common": 14, "../geometry/Vector": 26 }], 28: [function (require, module, exports) {
            var Matter = module.exports = {};
            Matter.version = 'master';

            Matter.Body = require('../body/Body');
            Matter.Composite = require('../body/Composite');
            Matter.World = require('../body/World');

            Matter.Contact = require('../collision/Contact');
            Matter.Detector = require('../collision/Detector');
            Matter.Grid = require('../collision/Grid');
            Matter.Pairs = require('../collision/Pairs');
            Matter.Pair = require('../collision/Pair');
            Matter.Query = require('../collision/Query');
            Matter.Resolver = require('../collision/Resolver');
            Matter.SAT = require('../collision/SAT');

            Matter.Constraint = require('../constraint/Constraint');
            Matter.MouseConstraint = require('../constraint/MouseConstraint');

            Matter.Common = require('../core/Common');
            Matter.Engine = require('../core/Engine');
            Matter.Events = require('../core/Events');
            Matter.Mouse = require('../core/Mouse');
            Matter.Runner = require('../core/Runner');
            Matter.Sleeping = require('../core/Sleeping');

            Matter.Bodies = require('../factory/Bodies');
            Matter.Composites = require('../factory/Composites');

            Matter.Axes = require('../geometry/Axes');
            Matter.Bounds = require('../geometry/Bounds');
            Matter.Svg = require('../geometry/Svg');
            Matter.Vector = require('../geometry/Vector');
            Matter.Vertices = require('../geometry/Vertices');

            Matter.Render = require('../render/Render');
            Matter.RenderPixi = require('../render/RenderPixi');

            // aliases

            Matter.World.add = Matter.Composite.add;
            Matter.World.remove = Matter.Composite.remove;
            Matter.World.addComposite = Matter.Composite.addComposite;
            Matter.World.addBody = Matter.Composite.addBody;
            Matter.World.addConstraint = Matter.Composite.addConstraint;
            Matter.World.clear = Matter.Composite.clear;
            Matter.Engine.run = Matter.Runner.run;
        }, { "../body/Body": 1, "../body/Composite": 2, "../body/World": 3, "../collision/Contact": 4, "../collision/Detector": 5, "../collision/Grid": 6, "../collision/Pair": 7, "../collision/Pairs": 8, "../collision/Query": 9, "../collision/Resolver": 10, "../collision/SAT": 11, "../constraint/Constraint": 12, "../constraint/MouseConstraint": 13, "../core/Common": 14, "../core/Engine": 15, "../core/Events": 16, "../core/Metrics": 17, "../core/Mouse": 18, "../core/Runner": 19, "../core/Sleeping": 20, "../factory/Bodies": 21, "../factory/Composites": 22, "../geometry/Axes": 23, "../geometry/Bounds": 24, "../geometry/Svg": 25, "../geometry/Vector": 26, "../geometry/Vertices": 27, "../render/Render": 29, "../render/RenderPixi": 30 }], 29: [function (require, module, exports) {
            /**
            * The `Matter.Render` module is a simple HTML5 canvas based renderer for visualising instances of `Matter.Engine`.
            * It is intended for development and debugging purposes, but may also be suitable for simple games.
            * It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
            *
            * @class Render
            */

            var Render = {};

            module.exports = Render;

            var Common = require('../core/Common');
            var Composite = require('../body/Composite');
            var Bounds = require('../geometry/Bounds');
            var Events = require('../core/Events');
            var Grid = require('../collision/Grid');
            var Vector = require('../geometry/Vector');

            (function () {

                var _requestAnimationFrame, _cancelAnimationFrame;

                if (typeof window !== 'undefined') {
                    _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                        window.setTimeout(function () {
                            callback(Common.now());
                        }, 1000 / 60);
                    };

                    _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                }

                /**
                 * Creates a new renderer. The options parameter is an object that specifies any properties you wish to override the defaults.
                 * All properties have default values, and many are pre-calculated automatically based on other properties.
                 * See the properties section below for detailed information on what you can pass via the `options` object.
                 * @method create
                 * @param {object} [options]
                 * @return {render} A new renderer
                 */
                Render.create = function (options) {
                    var defaults = {
                        controller: Render,
                        engine: null,
                        element: null,
                        canvas: null,
                        mouse: null,
                        frameRequestId: null,
                        options: {
                            width: 800,
                            height: 600,
                            pixelRatio: 1,
                            background: '#fafafa',
                            wireframeBackground: '#222',
                            hasBounds: !!options.bounds,
                            enabled: true,
                            wireframes: true,
                            showSleeping: true,
                            showDebug: false,
                            showBroadphase: false,
                            showBounds: false,
                            showVelocity: false,
                            showCollisions: false,
                            showSeparations: false,
                            showAxes: false,
                            showPositions: false,
                            showAngleIndicator: false,
                            showIds: false,
                            showShadows: false,
                            showVertexNumbers: false,
                            showConvexHulls: false,
                            showInternalEdges: false,
                            showMousePosition: false
                        }
                    };

                    var render = Common.extend(defaults, options);

                    if (render.canvas) {
                        render.canvas.width = render.options.width || render.canvas.width;
                        render.canvas.height = render.options.height || render.canvas.height;
                    }

                    render.mouse = options.mouse;
                    render.engine = options.engine;
                    render.canvas = render.canvas || _createCanvas(render.options.width, render.options.height);
                    render.context = render.canvas.getContext('2d');
                    render.textures = {};

                    render.bounds = render.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: render.canvas.width,
                            y: render.canvas.height
                        }
                    };

                    if (render.options.pixelRatio !== 1) {
                        Render.setPixelRatio(render, render.options.pixelRatio);
                    }

                    if (Common.isElement(render.element)) {
                        render.element.appendChild(render.canvas);
                    } else {
                        Common.log('Render.create: options.element was undefined, render.canvas was created but not appended', 'warn');
                    }

                    return render;
                };

                /**
                 * Continuously updates the render canvas on the `requestAnimationFrame` event.
                 * @method run
                 * @param {render} render
                 */
                Render.run = function (render) {
                    (function loop(time) {
                        render.frameRequestId = _requestAnimationFrame(loop);
                        Render.world(render);
                    })();
                };

                /**
                 * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
                 * @method stop
                 * @param {render} render
                 */
                Render.stop = function (render) {
                    _cancelAnimationFrame(render.frameRequestId);
                };

                /**
                 * Sets the pixel ratio of the renderer and updates the canvas.
                 * To automatically detect the correct ratio, pass the string `'auto'` for `pixelRatio`.
                 * @method setPixelRatio
                 * @param {render} render
                 * @param {number} pixelRatio
                 */
                Render.setPixelRatio = function (render, pixelRatio) {
                    var options = render.options,
                        canvas = render.canvas;

                    if (pixelRatio === 'auto') {
                        pixelRatio = _getPixelRatio(canvas);
                    }

                    options.pixelRatio = pixelRatio;
                    canvas.setAttribute('data-pixel-ratio', pixelRatio);
                    canvas.width = options.width * pixelRatio;
                    canvas.height = options.height * pixelRatio;
                    canvas.style.width = options.width + 'px';
                    canvas.style.height = options.height + 'px';
                    render.context.scale(pixelRatio, pixelRatio);
                };

                /**
                 * Renders the given `engine`'s `Matter.World` object.
                 * This is the entry point for all rendering and should be called every time the scene changes.
                 * @method world
                 * @param {render} render
                 */
                Render.world = function (render) {
                    var engine = render.engine,
                        world = engine.world,
                        canvas = render.canvas,
                        context = render.context,
                        options = render.options,
                        allBodies = Composite.allBodies(world),
                        allConstraints = Composite.allConstraints(world),
                        background = options.wireframes ? options.wireframeBackground : options.background,
                        bodies = [],
                        constraints = [],
                        i;

                    var event = {
                        timestamp: engine.timing.timestamp
                    };

                    Events.trigger(render, 'beforeRender', event);

                    // apply background if it has changed
                    if (render.currentBackground !== background) _applyBackground(render, background);

                    // clear the canvas with a transparent fill, to allow the canvas background to show
                    context.globalCompositeOperation = 'source-in';
                    context.fillStyle = "transparent";
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.globalCompositeOperation = 'source-over';

                    // handle bounds
                    if (options.hasBounds) {
                        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
                            boundsHeight = render.bounds.max.y - render.bounds.min.y,
                            boundsScaleX = boundsWidth / options.width,
                            boundsScaleY = boundsHeight / options.height;

                        // filter out bodies that are not in view
                        for (i = 0; i < allBodies.length; i++) {
                            var body = allBodies[i];
                            if (Bounds.overlaps(body.bounds, render.bounds)) bodies.push(body);
                        }

                        // filter out constraints that are not in view
                        for (i = 0; i < allConstraints.length; i++) {
                            var constraint = allConstraints[i],
                                bodyA = constraint.bodyA,
                                bodyB = constraint.bodyB,
                                pointAWorld = constraint.pointA,
                                pointBWorld = constraint.pointB;

                            if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                            if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                            if (!pointAWorld || !pointBWorld) continue;

                            if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld)) constraints.push(constraint);
                        }

                        // transform the view
                        context.scale(1 / boundsScaleX, 1 / boundsScaleY);
                        context.translate(-render.bounds.min.x, -render.bounds.min.y);
                    } else {
                        constraints = allConstraints;
                        bodies = allBodies;
                    }

                    if (!options.wireframes || engine.enableSleeping && options.showSleeping) {
                        // fully featured rendering of bodies
                        Render.bodies(render, bodies, context);
                    } else {
                        if (options.showConvexHulls) Render.bodyConvexHulls(render, bodies, context);

                        // optimised method for wireframes only
                        Render.bodyWireframes(render, bodies, context);
                    }

                    if (options.showBounds) Render.bodyBounds(render, bodies, context);

                    if (options.showAxes || options.showAngleIndicator) Render.bodyAxes(render, bodies, context);

                    if (options.showPositions) Render.bodyPositions(render, bodies, context);

                    if (options.showVelocity) Render.bodyVelocity(render, bodies, context);

                    if (options.showIds) Render.bodyIds(render, bodies, context);

                    if (options.showSeparations) Render.separations(render, engine.pairs.list, context);

                    if (options.showCollisions) Render.collisions(render, engine.pairs.list, context);

                    if (options.showVertexNumbers) Render.vertexNumbers(render, bodies, context);

                    if (options.showMousePosition) Render.mousePosition(render, render.mouse, context);

                    Render.constraints(constraints, context);

                    if (options.showBroadphase && engine.broadphase.controller === Grid) Render.grid(render, engine.broadphase, context);

                    if (options.showDebug) Render.debug(render, context);

                    if (options.hasBounds) {
                        // revert view transforms
                        context.setTransform(options.pixelRatio, 0, 0, options.pixelRatio, 0, 0);
                    }

                    Events.trigger(render, 'afterRender', event);
                };

                /**
                 * Description
                 * @private
                 * @method debug
                 * @param {render} render
                 * @param {RenderingContext} context
                 */
                Render.debug = function (render, context) {
                    var c = context,
                        engine = render.engine,
                        world = engine.world,
                        metrics = engine.metrics,
                        options = render.options,
                        bodies = Composite.allBodies(world),
                        space = "    ";

                    if (engine.timing.timestamp - (render.debugTimestamp || 0) >= 500) {
                        var text = "";

                        if (metrics.timing) {
                            text += "fps: " + Math.round(metrics.timing.fps) + space;
                        }

                        render.debugString = text;
                        render.debugTimestamp = engine.timing.timestamp;
                    }

                    if (render.debugString) {
                        c.font = "12px Arial";

                        if (options.wireframes) {
                            c.fillStyle = 'rgba(255,255,255,0.5)';
                        } else {
                            c.fillStyle = 'rgba(0,0,0,0.5)';
                        }

                        var split = render.debugString.split('\n');

                        for (var i = 0; i < split.length; i++) {
                            c.fillText(split[i], 50, 50 + i * 18);
                        }
                    }
                };

                /**
                 * Description
                 * @private
                 * @method constraints
                 * @param {constraint[]} constraints
                 * @param {RenderingContext} context
                 */
                Render.constraints = function (constraints, context) {
                    var c = context;

                    for (var i = 0; i < constraints.length; i++) {
                        var constraint = constraints[i];

                        if (!constraint.render.visible || !constraint.pointA || !constraint.pointB) continue;

                        var bodyA = constraint.bodyA,
                            bodyB = constraint.bodyB;

                        if (bodyA) {
                            c.beginPath();
                            c.moveTo(bodyA.position.x + constraint.pointA.x, bodyA.position.y + constraint.pointA.y);
                        } else {
                            c.beginPath();
                            c.moveTo(constraint.pointA.x, constraint.pointA.y);
                        }

                        if (bodyB) {
                            c.lineTo(bodyB.position.x + constraint.pointB.x, bodyB.position.y + constraint.pointB.y);
                        } else {
                            c.lineTo(constraint.pointB.x, constraint.pointB.y);
                        }

                        c.lineWidth = constraint.render.lineWidth;
                        c.strokeStyle = constraint.render.strokeStyle;
                        c.stroke();
                    }
                };

                /**
                 * Description
                 * @private
                 * @method bodyShadows
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyShadows = function (render, bodies, context) {
                    var c = context,
                        engine = render.engine;

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (!body.render.visible) continue;

                        if (body.circleRadius) {
                            c.beginPath();
                            c.arc(body.position.x, body.position.y, body.circleRadius, 0, 2 * Math.PI);
                            c.closePath();
                        } else {
                            c.beginPath();
                            c.moveTo(body.vertices[0].x, body.vertices[0].y);
                            for (var j = 1; j < body.vertices.length; j++) {
                                c.lineTo(body.vertices[j].x, body.vertices[j].y);
                            }
                            c.closePath();
                        }

                        var distanceX = body.position.x - render.options.width * 0.5,
                            distanceY = body.position.y - render.options.height * 0.2,
                            distance = Math.abs(distanceX) + Math.abs(distanceY);

                        c.shadowColor = 'rgba(0,0,0,0.15)';
                        c.shadowOffsetX = 0.05 * distanceX;
                        c.shadowOffsetY = 0.05 * distanceY;
                        c.shadowBlur = 1 + 12 * Math.min(1, distance / 1000);

                        c.fill();

                        c.shadowColor = null;
                        c.shadowOffsetX = null;
                        c.shadowOffsetY = null;
                        c.shadowBlur = null;
                    }
                };

                /**
                 * Description
                 * @private
                 * @method bodies
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodies = function (render, bodies, context) {
                    var c = context,
                        engine = render.engine,
                        options = render.options,
                        showInternalEdges = options.showInternalEdges || !options.wireframes,
                        body,
                        part,
                        i,
                        k;

                    for (i = 0; i < bodies.length; i++) {
                        body = bodies[i];

                        if (!body.render.visible) continue;

                        // handle compound parts
                        for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                            part = body.parts[k];

                            if (!part.render.visible) continue;

                            if (options.showSleeping && body.isSleeping) {
                                c.globalAlpha = 0.5 * part.render.opacity;
                            } else if (part.render.opacity !== 1) {
                                c.globalAlpha = part.render.opacity;
                            }

                            if (part.render.sprite && part.render.sprite.texture && !options.wireframes) {
                                // part sprite
                                var sprite = part.render.sprite,
                                    texture = _getTexture(render, sprite.texture);

                                c.translate(part.position.x, part.position.y);
                                c.rotate(part.angle);

                                c.drawImage(texture, texture.width * -sprite.xOffset * sprite.xScale, texture.height * -sprite.yOffset * sprite.yScale, texture.width * sprite.xScale, texture.height * sprite.yScale);

                                // revert translation, hopefully faster than save / restore
                                c.rotate(-part.angle);
                                c.translate(-part.position.x, -part.position.y);
                            } else {
                                // part polygon
                                if (part.circleRadius) {
                                    c.beginPath();
                                    c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
                                } else {
                                    c.beginPath();
                                    c.moveTo(part.vertices[0].x, part.vertices[0].y);

                                    for (var j = 1; j < part.vertices.length; j++) {
                                        if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                                            c.lineTo(part.vertices[j].x, part.vertices[j].y);
                                        } else {
                                            c.moveTo(part.vertices[j].x, part.vertices[j].y);
                                        }

                                        if (part.vertices[j].isInternal && !showInternalEdges) {
                                            c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                                        }
                                    }

                                    c.lineTo(part.vertices[0].x, part.vertices[0].y);
                                    c.closePath();
                                }

                                if (!options.wireframes) {
                                    c.fillStyle = part.render.fillStyle;
                                    c.lineWidth = part.render.lineWidth;
                                    c.strokeStyle = part.render.strokeStyle;
                                    c.fill();
                                } else {
                                    c.lineWidth = 1;
                                    c.strokeStyle = '#bbb';
                                }

                                c.stroke();
                            }

                            c.globalAlpha = 1;
                        }
                    }
                };

                /**
                 * Optimised method for drawing body wireframes in one pass
                 * @private
                 * @method bodyWireframes
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyWireframes = function (render, bodies, context) {
                    var c = context,
                        showInternalEdges = render.options.showInternalEdges,
                        body,
                        part,
                        i,
                        j,
                        k;

                    c.beginPath();

                    // render all bodies
                    for (i = 0; i < bodies.length; i++) {
                        body = bodies[i];

                        if (!body.render.visible) continue;

                        // handle compound parts
                        for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                            part = body.parts[k];

                            c.moveTo(part.vertices[0].x, part.vertices[0].y);

                            for (j = 1; j < part.vertices.length; j++) {
                                if (!part.vertices[j - 1].isInternal || showInternalEdges) {
                                    c.lineTo(part.vertices[j].x, part.vertices[j].y);
                                } else {
                                    c.moveTo(part.vertices[j].x, part.vertices[j].y);
                                }

                                if (part.vertices[j].isInternal && !showInternalEdges) {
                                    c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
                                }
                            }

                            c.lineTo(part.vertices[0].x, part.vertices[0].y);
                        }
                    }

                    c.lineWidth = 1;
                    c.strokeStyle = '#bbb';
                    c.stroke();
                };

                /**
                 * Optimised method for drawing body convex hull wireframes in one pass
                 * @private
                 * @method bodyConvexHulls
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyConvexHulls = function (render, bodies, context) {
                    var c = context,
                        body,
                        part,
                        i,
                        j,
                        k;

                    c.beginPath();

                    // render convex hulls
                    for (i = 0; i < bodies.length; i++) {
                        body = bodies[i];

                        if (!body.render.visible || body.parts.length === 1) continue;

                        c.moveTo(body.vertices[0].x, body.vertices[0].y);

                        for (j = 1; j < body.vertices.length; j++) {
                            c.lineTo(body.vertices[j].x, body.vertices[j].y);
                        }

                        c.lineTo(body.vertices[0].x, body.vertices[0].y);
                    }

                    c.lineWidth = 1;
                    c.strokeStyle = 'rgba(255,255,255,0.2)';
                    c.stroke();
                };

                /**
                 * Renders body vertex numbers.
                 * @private
                 * @method vertexNumbers
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.vertexNumbers = function (render, bodies, context) {
                    var c = context,
                        i,
                        j,
                        k;

                    for (i = 0; i < bodies.length; i++) {
                        var parts = bodies[i].parts;
                        for (k = parts.length > 1 ? 1 : 0; k < parts.length; k++) {
                            var part = parts[k];
                            for (j = 0; j < part.vertices.length; j++) {
                                c.fillStyle = 'rgba(255,255,255,0.2)';
                                c.fillText(i + '_' + j, part.position.x + (part.vertices[j].x - part.position.x) * 0.8, part.position.y + (part.vertices[j].y - part.position.y) * 0.8);
                            }
                        }
                    }
                };

                /**
                 * Renders mouse position.
                 * @private
                 * @method mousePosition
                 * @param {render} render
                 * @param {mouse} mouse
                 * @param {RenderingContext} context
                 */
                Render.mousePosition = function (render, mouse, context) {
                    var c = context;
                    c.fillStyle = 'rgba(255,255,255,0.8)';
                    c.fillText(mouse.position.x + '  ' + mouse.position.y, mouse.position.x + 5, mouse.position.y - 5);
                };

                /**
                 * Draws body bounds
                 * @private
                 * @method bodyBounds
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyBounds = function (render, bodies, context) {
                    var c = context,
                        engine = render.engine,
                        options = render.options;

                    c.beginPath();

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (body.render.visible) {
                            var parts = bodies[i].parts;
                            for (var j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                                var part = parts[j];
                                c.rect(part.bounds.min.x, part.bounds.min.y, part.bounds.max.x - part.bounds.min.x, part.bounds.max.y - part.bounds.min.y);
                            }
                        }
                    }

                    if (options.wireframes) {
                        c.strokeStyle = 'rgba(255,255,255,0.08)';
                    } else {
                        c.strokeStyle = 'rgba(0,0,0,0.1)';
                    }

                    c.lineWidth = 1;
                    c.stroke();
                };

                /**
                 * Draws body angle indicators and axes
                 * @private
                 * @method bodyAxes
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyAxes = function (render, bodies, context) {
                    var c = context,
                        engine = render.engine,
                        options = render.options,
                        part,
                        i,
                        j,
                        k;

                    c.beginPath();

                    for (i = 0; i < bodies.length; i++) {
                        var body = bodies[i],
                            parts = body.parts;

                        if (!body.render.visible) continue;

                        if (options.showAxes) {
                            // render all axes
                            for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                                part = parts[j];
                                for (k = 0; k < part.axes.length; k++) {
                                    var axis = part.axes[k];
                                    c.moveTo(part.position.x, part.position.y);
                                    c.lineTo(part.position.x + axis.x * 20, part.position.y + axis.y * 20);
                                }
                            }
                        } else {
                            for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                                part = parts[j];
                                for (k = 0; k < part.axes.length; k++) {
                                    // render a single axis indicator
                                    c.moveTo(part.position.x, part.position.y);
                                    c.lineTo((part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2, (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2);
                                }
                            }
                        }
                    }

                    if (options.wireframes) {
                        c.strokeStyle = 'indianred';
                    } else {
                        c.strokeStyle = 'rgba(0,0,0,0.8)';
                        c.globalCompositeOperation = 'overlay';
                    }

                    c.lineWidth = 1;
                    c.stroke();
                    c.globalCompositeOperation = 'source-over';
                };

                /**
                 * Draws body positions
                 * @private
                 * @method bodyPositions
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyPositions = function (render, bodies, context) {
                    var c = context,
                        engine = render.engine,
                        options = render.options,
                        body,
                        part,
                        i,
                        k;

                    c.beginPath();

                    // render current positions
                    for (i = 0; i < bodies.length; i++) {
                        body = bodies[i];

                        if (!body.render.visible) continue;

                        // handle compound parts
                        for (k = 0; k < body.parts.length; k++) {
                            part = body.parts[k];
                            c.arc(part.position.x, part.position.y, 3, 0, 2 * Math.PI, false);
                            c.closePath();
                        }
                    }

                    if (options.wireframes) {
                        c.fillStyle = 'indianred';
                    } else {
                        c.fillStyle = 'rgba(0,0,0,0.5)';
                    }
                    c.fill();

                    c.beginPath();

                    // render previous positions
                    for (i = 0; i < bodies.length; i++) {
                        body = bodies[i];
                        if (body.render.visible) {
                            c.arc(body.positionPrev.x, body.positionPrev.y, 2, 0, 2 * Math.PI, false);
                            c.closePath();
                        }
                    }

                    c.fillStyle = 'rgba(255,165,0,0.8)';
                    c.fill();
                };

                /**
                 * Draws body velocity
                 * @private
                 * @method bodyVelocity
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyVelocity = function (render, bodies, context) {
                    var c = context;

                    c.beginPath();

                    for (var i = 0; i < bodies.length; i++) {
                        var body = bodies[i];

                        if (!body.render.visible) continue;

                        c.moveTo(body.position.x, body.position.y);
                        c.lineTo(body.position.x + (body.position.x - body.positionPrev.x) * 2, body.position.y + (body.position.y - body.positionPrev.y) * 2);
                    }

                    c.lineWidth = 3;
                    c.strokeStyle = 'cornflowerblue';
                    c.stroke();
                };

                /**
                 * Draws body ids
                 * @private
                 * @method bodyIds
                 * @param {render} render
                 * @param {body[]} bodies
                 * @param {RenderingContext} context
                 */
                Render.bodyIds = function (render, bodies, context) {
                    var c = context,
                        i,
                        j;

                    for (i = 0; i < bodies.length; i++) {
                        if (!bodies[i].render.visible) continue;

                        var parts = bodies[i].parts;
                        for (j = parts.length > 1 ? 1 : 0; j < parts.length; j++) {
                            var part = parts[j];
                            c.font = "12px Arial";
                            c.fillStyle = 'rgba(255,255,255,0.5)';
                            c.fillText(part.id, part.position.x + 10, part.position.y - 10);
                        }
                    }
                };

                /**
                 * Description
                 * @private
                 * @method collisions
                 * @param {render} render
                 * @param {pair[]} pairs
                 * @param {RenderingContext} context
                 */
                Render.collisions = function (render, pairs, context) {
                    var c = context,
                        options = render.options,
                        pair,
                        collision,
                        corrected,
                        bodyA,
                        bodyB,
                        i,
                        j;

                    c.beginPath();

                    // render collision positions
                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive) continue;

                        collision = pair.collision;
                        for (j = 0; j < pair.activeContacts.length; j++) {
                            var contact = pair.activeContacts[j],
                                vertex = contact.vertex;
                            c.rect(vertex.x - 1.5, vertex.y - 1.5, 3.5, 3.5);
                        }
                    }

                    if (options.wireframes) {
                        c.fillStyle = 'rgba(255,255,255,0.7)';
                    } else {
                        c.fillStyle = 'orange';
                    }
                    c.fill();

                    c.beginPath();

                    // render collision normals
                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive) continue;

                        collision = pair.collision;

                        if (pair.activeContacts.length > 0) {
                            var normalPosX = pair.activeContacts[0].vertex.x,
                                normalPosY = pair.activeContacts[0].vertex.y;

                            if (pair.activeContacts.length === 2) {
                                normalPosX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
                                normalPosY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
                            }

                            if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
                                c.moveTo(normalPosX - collision.normal.x * 8, normalPosY - collision.normal.y * 8);
                            } else {
                                c.moveTo(normalPosX + collision.normal.x * 8, normalPosY + collision.normal.y * 8);
                            }

                            c.lineTo(normalPosX, normalPosY);
                        }
                    }

                    if (options.wireframes) {
                        c.strokeStyle = 'rgba(255,165,0,0.7)';
                    } else {
                        c.strokeStyle = 'orange';
                    }

                    c.lineWidth = 1;
                    c.stroke();
                };

                /**
                 * Description
                 * @private
                 * @method separations
                 * @param {render} render
                 * @param {pair[]} pairs
                 * @param {RenderingContext} context
                 */
                Render.separations = function (render, pairs, context) {
                    var c = context,
                        options = render.options,
                        pair,
                        collision,
                        corrected,
                        bodyA,
                        bodyB,
                        i,
                        j;

                    c.beginPath();

                    // render separations
                    for (i = 0; i < pairs.length; i++) {
                        pair = pairs[i];

                        if (!pair.isActive) continue;

                        collision = pair.collision;
                        bodyA = collision.bodyA;
                        bodyB = collision.bodyB;

                        var k = 1;

                        if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
                        if (bodyB.isStatic) k = 0;

                        c.moveTo(bodyB.position.x, bodyB.position.y);
                        c.lineTo(bodyB.position.x - collision.penetration.x * k, bodyB.position.y - collision.penetration.y * k);

                        k = 1;

                        if (!bodyB.isStatic && !bodyA.isStatic) k = 0.5;
                        if (bodyA.isStatic) k = 0;

                        c.moveTo(bodyA.position.x, bodyA.position.y);
                        c.lineTo(bodyA.position.x + collision.penetration.x * k, bodyA.position.y + collision.penetration.y * k);
                    }

                    if (options.wireframes) {
                        c.strokeStyle = 'rgba(255,165,0,0.5)';
                    } else {
                        c.strokeStyle = 'orange';
                    }
                    c.stroke();
                };

                /**
                 * Description
                 * @private
                 * @method grid
                 * @param {render} render
                 * @param {grid} grid
                 * @param {RenderingContext} context
                 */
                Render.grid = function (render, grid, context) {
                    var c = context,
                        options = render.options;

                    if (options.wireframes) {
                        c.strokeStyle = 'rgba(255,180,0,0.1)';
                    } else {
                        c.strokeStyle = 'rgba(255,180,0,0.5)';
                    }

                    c.beginPath();

                    var bucketKeys = Common.keys(grid.buckets);

                    for (var i = 0; i < bucketKeys.length; i++) {
                        var bucketId = bucketKeys[i];

                        if (grid.buckets[bucketId].length < 2) continue;

                        var region = bucketId.split(',');
                        c.rect(0.5 + parseInt(region[0], 10) * grid.bucketWidth, 0.5 + parseInt(region[1], 10) * grid.bucketHeight, grid.bucketWidth, grid.bucketHeight);
                    }

                    c.lineWidth = 1;
                    c.stroke();
                };

                /**
                 * Description
                 * @private
                 * @method inspector
                 * @param {inspector} inspector
                 * @param {RenderingContext} context
                 */
                Render.inspector = function (inspector, context) {
                    var engine = inspector.engine,
                        selected = inspector.selected,
                        render = inspector.render,
                        options = render.options,
                        bounds;

                    if (options.hasBounds) {
                        var boundsWidth = render.bounds.max.x - render.bounds.min.x,
                            boundsHeight = render.bounds.max.y - render.bounds.min.y,
                            boundsScaleX = boundsWidth / render.options.width,
                            boundsScaleY = boundsHeight / render.options.height;

                        context.scale(1 / boundsScaleX, 1 / boundsScaleY);
                        context.translate(-render.bounds.min.x, -render.bounds.min.y);
                    }

                    for (var i = 0; i < selected.length; i++) {
                        var item = selected[i].data;

                        context.translate(0.5, 0.5);
                        context.lineWidth = 1;
                        context.strokeStyle = 'rgba(255,165,0,0.9)';
                        context.setLineDash([1, 2]);

                        switch (item.type) {

                            case 'body':

                                // render body selections
                                bounds = item.bounds;
                                context.beginPath();
                                context.rect(Math.floor(bounds.min.x - 3), Math.floor(bounds.min.y - 3), Math.floor(bounds.max.x - bounds.min.x + 6), Math.floor(bounds.max.y - bounds.min.y + 6));
                                context.closePath();
                                context.stroke();

                                break;

                            case 'constraint':

                                // render constraint selections
                                var point = item.pointA;
                                if (item.bodyA) point = item.pointB;
                                context.beginPath();
                                context.arc(point.x, point.y, 10, 0, 2 * Math.PI);
                                context.closePath();
                                context.stroke();

                                break;

                        }

                        context.setLineDash([]);
                        context.translate(-0.5, -0.5);
                    }

                    // render selection region
                    if (inspector.selectStart !== null) {
                        context.translate(0.5, 0.5);
                        context.lineWidth = 1;
                        context.strokeStyle = 'rgba(255,165,0,0.6)';
                        context.fillStyle = 'rgba(255,165,0,0.1)';
                        bounds = inspector.selectBounds;
                        context.beginPath();
                        context.rect(Math.floor(bounds.min.x), Math.floor(bounds.min.y), Math.floor(bounds.max.x - bounds.min.x), Math.floor(bounds.max.y - bounds.min.y));
                        context.closePath();
                        context.stroke();
                        context.fill();
                        context.translate(-0.5, -0.5);
                    }

                    if (options.hasBounds) context.setTransform(1, 0, 0, 1, 0, 0);
                };

                /**
                 * Description
                 * @method _createCanvas
                 * @private
                 * @param {} width
                 * @param {} height
                 * @return canvas
                 */
                var _createCanvas = function _createCanvas(width, height) {
                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    canvas.oncontextmenu = function () {
                        return false;
                    };
                    canvas.onselectstart = function () {
                        return false;
                    };
                    return canvas;
                };

                /**
                 * Gets the pixel ratio of the canvas.
                 * @method _getPixelRatio
                 * @private
                 * @param {HTMLElement} canvas
                 * @return {Number} pixel ratio
                 */
                var _getPixelRatio = function _getPixelRatio(canvas) {
                    var context = canvas.getContext('2d'),
                        devicePixelRatio = window.devicePixelRatio || 1,
                        backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

                    return devicePixelRatio / backingStorePixelRatio;
                };

                /**
                 * Gets the requested texture (an Image) via its path
                 * @method _getTexture
                 * @private
                 * @param {render} render
                 * @param {string} imagePath
                 * @return {Image} texture
                 */
                var _getTexture = function _getTexture(render, imagePath) {
                    var image = render.textures[imagePath];

                    if (image) return image;

                    image = render.textures[imagePath] = new Image();
                    image.src = imagePath;

                    return image;
                };

                /**
                 * Applies the background to the canvas using CSS.
                 * @method applyBackground
                 * @private
                 * @param {render} render
                 * @param {string} background
                 */
                var _applyBackground = function _applyBackground(render, background) {
                    var cssBackground = background;

                    if (/(jpg|gif|png)$/.test(background)) cssBackground = 'url(' + background + ')';

                    render.canvas.style.background = cssBackground;
                    render.canvas.style.backgroundSize = "contain";
                    render.currentBackground = background;
                };

                /*
                *
                *  Events Documentation
                *
                */

                /**
                * Fired before rendering
                *
                * @event beforeRender
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /**
                * Fired after rendering
                *
                * @event afterRender
                * @param {} event An event object
                * @param {number} event.timestamp The engine.timing.timestamp of the event
                * @param {} event.source The source object of the event
                * @param {} event.name The name of the event
                */

                /*
                *
                *  Properties Documentation
                *
                */

                /**
                 * A back-reference to the `Matter.Render` module.
                 *
                 * @property controller
                 * @type render
                 */

                /**
                 * A reference to the `Matter.Engine` instance to be used.
                 *
                 * @property engine
                 * @type engine
                 */

                /**
                 * A reference to the element where the canvas is to be inserted (if `render.canvas` has not been specified)
                 *
                 * @property element
                 * @type HTMLElement
                 * @default null
                 */

                /**
                 * The canvas element to render to. If not specified, one will be created if `render.element` has been specified.
                 *
                 * @property canvas
                 * @type HTMLCanvasElement
                 * @default null
                 */

                /**
                 * The configuration options of the renderer.
                 *
                 * @property options
                 * @type {}
                 */

                /**
                 * The target width in pixels of the `render.canvas` to be created.
                 *
                 * @property options.width
                 * @type number
                 * @default 800
                 */

                /**
                 * The target height in pixels of the `render.canvas` to be created.
                 *
                 * @property options.height
                 * @type number
                 * @default 600
                 */

                /**
                 * A flag that specifies if `render.bounds` should be used when rendering.
                 *
                 * @property options.hasBounds
                 * @type boolean
                 * @default false
                 */

                /**
                 * A `Bounds` object that specifies the drawing view region. 
                 * Rendering will be automatically transformed and scaled to fit within the canvas size (`render.options.width` and `render.options.height`).
                 * This allows for creating views that can pan or zoom around the scene.
                 * You must also set `render.options.hasBounds` to `true` to enable bounded rendering.
                 *
                 * @property bounds
                 * @type bounds
                 */

                /**
                 * The 2d rendering context from the `render.canvas` element.
                 *
                 * @property context
                 * @type CanvasRenderingContext2D
                 */

                /**
                 * The sprite texture cache.
                 *
                 * @property textures
                 * @type {}
                 */
            })();
        }, { "../body/Composite": 2, "../collision/Grid": 6, "../core/Common": 14, "../core/Events": 16, "../geometry/Bounds": 24, "../geometry/Vector": 26 }], 30: [function (require, module, exports) {
            /**
            * The `Matter.RenderPixi` module is an example renderer using pixi.js.
            * See also `Matter.Render` for a canvas based renderer.
            *
            * @class RenderPixi
            * @deprecated the Matter.RenderPixi module will soon be removed from the Matter.js core.
            * It will likely be moved to its own repository (but maintenance will be limited).
            */

            var RenderPixi = {};

            module.exports = RenderPixi;

            var Composite = require('../body/Composite');
            var Common = require('../core/Common');

            (function () {

                var _requestAnimationFrame, _cancelAnimationFrame;

                if (typeof window !== 'undefined') {
                    _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                        window.setTimeout(function () {
                            callback(Common.now());
                        }, 1000 / 60);
                    };

                    _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                }

                /**
                 * Creates a new Pixi.js WebGL renderer
                 * @method create
                 * @param {object} options
                 * @return {RenderPixi} A new renderer
                 * @deprecated
                 */
                RenderPixi.create = function (options) {
                    Common.log('RenderPixi.create: Matter.RenderPixi is deprecated (see docs)', 'warn');

                    var defaults = {
                        controller: RenderPixi,
                        engine: null,
                        element: null,
                        frameRequestId: null,
                        canvas: null,
                        renderer: null,
                        container: null,
                        spriteContainer: null,
                        pixiOptions: null,
                        options: {
                            width: 800,
                            height: 600,
                            background: '#fafafa',
                            wireframeBackground: '#222',
                            hasBounds: false,
                            enabled: true,
                            wireframes: true,
                            showSleeping: true,
                            showDebug: false,
                            showBroadphase: false,
                            showBounds: false,
                            showVelocity: false,
                            showCollisions: false,
                            showAxes: false,
                            showPositions: false,
                            showAngleIndicator: false,
                            showIds: false,
                            showShadows: false
                        }
                    };

                    var render = Common.extend(defaults, options),
                        transparent = !render.options.wireframes && render.options.background === 'transparent';

                    // init pixi
                    render.pixiOptions = render.pixiOptions || {
                        view: render.canvas,
                        transparent: transparent,
                        antialias: true,
                        backgroundColor: options.background
                    };

                    render.mouse = options.mouse;
                    render.engine = options.engine;
                    render.renderer = render.renderer || new PIXI.WebGLRenderer(render.options.width, render.options.height, render.pixiOptions);
                    render.container = render.container || new PIXI.Container();
                    render.spriteContainer = render.spriteContainer || new PIXI.Container();
                    render.canvas = render.canvas || render.renderer.view;
                    render.bounds = render.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: render.options.width,
                            y: render.options.height
                        }
                    };

                    // caches
                    render.textures = {};
                    render.sprites = {};
                    render.primitives = {};

                    // use a sprite batch for performance
                    render.container.addChild(render.spriteContainer);

                    // insert canvas
                    if (Common.isElement(render.element)) {
                        render.element.appendChild(render.canvas);
                    } else {
                        Common.log('No "render.element" passed, "render.canvas" was not inserted into document.', 'warn');
                    }

                    // prevent menus on canvas
                    render.canvas.oncontextmenu = function () {
                        return false;
                    };
                    render.canvas.onselectstart = function () {
                        return false;
                    };

                    return render;
                };

                /**
                 * Continuously updates the render canvas on the `requestAnimationFrame` event.
                 * @method run
                 * @param {render} render
                 * @deprecated
                 */
                RenderPixi.run = function (render) {
                    (function loop(time) {
                        render.frameRequestId = _requestAnimationFrame(loop);
                        RenderPixi.world(render);
                    })();
                };

                /**
                 * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
                 * @method stop
                 * @param {render} render
                 * @deprecated
                 */
                RenderPixi.stop = function (render) {
                    _cancelAnimationFrame(render.frameRequestId);
                };

                /**
                 * Clears the scene graph
                 * @method clear
                 * @param {RenderPixi} render
                 * @deprecated
                 */
                RenderPixi.clear = function (render) {
                    var container = render.container,
                        spriteContainer = render.spriteContainer;

                    // clear stage container
                    while (container.children[0]) {
                        container.removeChild(container.children[0]);
                    }

                    // clear sprite batch
                    while (spriteContainer.children[0]) {
                        spriteContainer.removeChild(spriteContainer.children[0]);
                    }

                    var bgSprite = render.sprites['bg-0'];

                    // clear caches
                    render.textures = {};
                    render.sprites = {};
                    render.primitives = {};

                    // set background sprite
                    render.sprites['bg-0'] = bgSprite;
                    if (bgSprite) container.addChildAt(bgSprite, 0);

                    // add sprite batch back into container
                    render.container.addChild(render.spriteContainer);

                    // reset background state
                    render.currentBackground = null;

                    // reset bounds transforms
                    container.scale.set(1, 1);
                    container.position.set(0, 0);
                };

                /**
                 * Sets the background of the canvas 
                 * @method setBackground
                 * @param {RenderPixi} render
                 * @param {string} background
                 * @deprecated
                 */
                RenderPixi.setBackground = function (render, background) {
                    if (render.currentBackground !== background) {
                        var isColor = background.indexOf && background.indexOf('#') !== -1,
                            bgSprite = render.sprites['bg-0'];

                        if (isColor) {
                            // if solid background color
                            var color = Common.colorToNumber(background);
                            render.renderer.backgroundColor = color;

                            // remove background sprite if existing
                            if (bgSprite) render.container.removeChild(bgSprite);
                        } else {
                            // initialise background sprite if needed
                            if (!bgSprite) {
                                var texture = _getTexture(render, background);

                                bgSprite = render.sprites['bg-0'] = new PIXI.Sprite(texture);
                                bgSprite.position.x = 0;
                                bgSprite.position.y = 0;
                                render.container.addChildAt(bgSprite, 0);
                            }
                        }

                        render.currentBackground = background;
                    }
                };

                /**
                 * Description
                 * @method world
                 * @param {engine} engine
                 * @deprecated
                 */
                RenderPixi.world = function (render) {
                    var engine = render.engine,
                        world = engine.world,
                        renderer = render.renderer,
                        container = render.container,
                        options = render.options,
                        bodies = Composite.allBodies(world),
                        allConstraints = Composite.allConstraints(world),
                        constraints = [],
                        i;

                    if (options.wireframes) {
                        RenderPixi.setBackground(render, options.wireframeBackground);
                    } else {
                        RenderPixi.setBackground(render, options.background);
                    }

                    // handle bounds
                    var boundsWidth = render.bounds.max.x - render.bounds.min.x,
                        boundsHeight = render.bounds.max.y - render.bounds.min.y,
                        boundsScaleX = boundsWidth / render.options.width,
                        boundsScaleY = boundsHeight / render.options.height;

                    if (options.hasBounds) {
                        // Hide bodies that are not in view
                        for (i = 0; i < bodies.length; i++) {
                            var body = bodies[i];
                            body.render.sprite.visible = Bounds.overlaps(body.bounds, render.bounds);
                        }

                        // filter out constraints that are not in view
                        for (i = 0; i < allConstraints.length; i++) {
                            var constraint = allConstraints[i],
                                bodyA = constraint.bodyA,
                                bodyB = constraint.bodyB,
                                pointAWorld = constraint.pointA,
                                pointBWorld = constraint.pointB;

                            if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA);
                            if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB);

                            if (!pointAWorld || !pointBWorld) continue;

                            if (Bounds.contains(render.bounds, pointAWorld) || Bounds.contains(render.bounds, pointBWorld)) constraints.push(constraint);
                        }

                        // transform the view
                        container.scale.set(1 / boundsScaleX, 1 / boundsScaleY);
                        container.position.set(-render.bounds.min.x * (1 / boundsScaleX), -render.bounds.min.y * (1 / boundsScaleY));
                    } else {
                        constraints = allConstraints;
                    }

                    for (i = 0; i < bodies.length; i++) {
                        RenderPixi.body(render, bodies[i]);
                    }for (i = 0; i < constraints.length; i++) {
                        RenderPixi.constraint(render, constraints[i]);
                    }renderer.render(container);
                };

                /**
                 * Description
                 * @method constraint
                 * @param {engine} engine
                 * @param {constraint} constraint
                 * @deprecated
                 */
                RenderPixi.constraint = function (render, constraint) {
                    var engine = render.engine,
                        bodyA = constraint.bodyA,
                        bodyB = constraint.bodyB,
                        pointA = constraint.pointA,
                        pointB = constraint.pointB,
                        container = render.container,
                        constraintRender = constraint.render,
                        primitiveId = 'c-' + constraint.id,
                        primitive = render.primitives[primitiveId];

                    // initialise constraint primitive if not existing
                    if (!primitive) primitive = render.primitives[primitiveId] = new PIXI.Graphics();

                    // don't render if constraint does not have two end points
                    if (!constraintRender.visible || !constraint.pointA || !constraint.pointB) {
                        primitive.clear();
                        return;
                    }

                    // add to scene graph if not already there
                    if (Common.indexOf(container.children, primitive) === -1) container.addChild(primitive);

                    // render the constraint on every update, since they can change dynamically
                    primitive.clear();
                    primitive.beginFill(0, 0);
                    primitive.lineStyle(constraintRender.lineWidth, Common.colorToNumber(constraintRender.strokeStyle), 1);

                    if (bodyA) {
                        primitive.moveTo(bodyA.position.x + pointA.x, bodyA.position.y + pointA.y);
                    } else {
                        primitive.moveTo(pointA.x, pointA.y);
                    }

                    if (bodyB) {
                        primitive.lineTo(bodyB.position.x + pointB.x, bodyB.position.y + pointB.y);
                    } else {
                        primitive.lineTo(pointB.x, pointB.y);
                    }

                    primitive.endFill();
                };

                /**
                 * Description
                 * @method body
                 * @param {engine} engine
                 * @param {body} body
                 * @deprecated
                 */
                RenderPixi.body = function (render, body) {
                    var engine = render.engine,
                        bodyRender = body.render;

                    if (!bodyRender.visible) return;

                    if (bodyRender.sprite && bodyRender.sprite.texture) {
                        var spriteId = 'b-' + body.id,
                            sprite = render.sprites[spriteId],
                            spriteContainer = render.spriteContainer;

                        // initialise body sprite if not existing
                        if (!sprite) sprite = render.sprites[spriteId] = _createBodySprite(render, body);

                        // add to scene graph if not already there
                        if (Common.indexOf(spriteContainer.children, sprite) === -1) spriteContainer.addChild(sprite);

                        // update body sprite
                        sprite.position.x = body.position.x;
                        sprite.position.y = body.position.y;
                        sprite.rotation = body.angle;
                        sprite.scale.x = bodyRender.sprite.xScale || 1;
                        sprite.scale.y = bodyRender.sprite.yScale || 1;
                    } else {
                        var primitiveId = 'b-' + body.id,
                            primitive = render.primitives[primitiveId],
                            container = render.container;

                        // initialise body primitive if not existing
                        if (!primitive) {
                            primitive = render.primitives[primitiveId] = _createBodyPrimitive(render, body);
                            primitive.initialAngle = body.angle;
                        }

                        // add to scene graph if not already there
                        if (Common.indexOf(container.children, primitive) === -1) container.addChild(primitive);

                        // update body primitive
                        primitive.position.x = body.position.x;
                        primitive.position.y = body.position.y;
                        primitive.rotation = body.angle - primitive.initialAngle;
                    }
                };

                /**
                 * Creates a body sprite
                 * @method _createBodySprite
                 * @private
                 * @param {RenderPixi} render
                 * @param {body} body
                 * @return {PIXI.Sprite} sprite
                 * @deprecated
                 */
                var _createBodySprite = function _createBodySprite(render, body) {
                    var bodyRender = body.render,
                        texturePath = bodyRender.sprite.texture,
                        texture = _getTexture(render, texturePath),
                        sprite = new PIXI.Sprite(texture);

                    sprite.anchor.x = body.render.sprite.xOffset;
                    sprite.anchor.y = body.render.sprite.yOffset;

                    return sprite;
                };

                /**
                 * Creates a body primitive
                 * @method _createBodyPrimitive
                 * @private
                 * @param {RenderPixi} render
                 * @param {body} body
                 * @return {PIXI.Graphics} graphics
                 * @deprecated
                 */
                var _createBodyPrimitive = function _createBodyPrimitive(render, body) {
                    var bodyRender = body.render,
                        options = render.options,
                        primitive = new PIXI.Graphics(),
                        fillStyle = Common.colorToNumber(bodyRender.fillStyle),
                        strokeStyle = Common.colorToNumber(bodyRender.strokeStyle),
                        strokeStyleIndicator = Common.colorToNumber(bodyRender.strokeStyle),
                        strokeStyleWireframe = Common.colorToNumber('#bbb'),
                        strokeStyleWireframeIndicator = Common.colorToNumber('#CD5C5C'),
                        part;

                    primitive.clear();

                    // handle compound parts
                    for (var k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                        part = body.parts[k];

                        if (!options.wireframes) {
                            primitive.beginFill(fillStyle, 1);
                            primitive.lineStyle(bodyRender.lineWidth, strokeStyle, 1);
                        } else {
                            primitive.beginFill(0, 0);
                            primitive.lineStyle(1, strokeStyleWireframe, 1);
                        }

                        primitive.moveTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);

                        for (var j = 1; j < part.vertices.length; j++) {
                            primitive.lineTo(part.vertices[j].x - body.position.x, part.vertices[j].y - body.position.y);
                        }

                        primitive.lineTo(part.vertices[0].x - body.position.x, part.vertices[0].y - body.position.y);

                        primitive.endFill();

                        // angle indicator
                        if (options.showAngleIndicator || options.showAxes) {
                            primitive.beginFill(0, 0);

                            if (options.wireframes) {
                                primitive.lineStyle(1, strokeStyleWireframeIndicator, 1);
                            } else {
                                primitive.lineStyle(1, strokeStyleIndicator);
                            }

                            primitive.moveTo(part.position.x - body.position.x, part.position.y - body.position.y);
                            primitive.lineTo((part.vertices[0].x + part.vertices[part.vertices.length - 1].x) / 2 - body.position.x, (part.vertices[0].y + part.vertices[part.vertices.length - 1].y) / 2 - body.position.y);

                            primitive.endFill();
                        }
                    }

                    return primitive;
                };

                /**
                 * Gets the requested texture (a PIXI.Texture) via its path
                 * @method _getTexture
                 * @private
                 * @param {RenderPixi} render
                 * @param {string} imagePath
                 * @return {PIXI.Texture} texture
                 * @deprecated
                 */
                var _getTexture = function _getTexture(render, imagePath) {
                    var texture = render.textures[imagePath];

                    if (!texture) texture = render.textures[imagePath] = PIXI.Texture.fromImage(imagePath);

                    return texture;
                };
            })();
        }, { "../body/Composite": 2, "../core/Common": 14 }] }, {}, [28])(28);
});; // unique key
var _attributeDictionarySingleton = Symbol('attributeDictionarySingleton');

/**
 * Attribute Dictionary Singleton Class
 * Attribute dictionary for property definitions
 */

var AttributeDictionarySingleton = function () {

    //#region Constructors

    function AttributeDictionarySingleton(attributeDictionarySingletonToken) {
        _classCallCheck(this, AttributeDictionarySingleton);

        if (_attributeDictionarySingleton !== attributeDictionarySingletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._rules = {};
        this._inheritance = {};
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(AttributeDictionarySingleton, [{
        key: "addRule",


        //#endregion

        /**
         *
         * @param context
         * @param propertyName
         * @param rule
         * @returns {boolean}
         */
        value: function addRule(context, propertyName, rule) {
            if (isObjectAssigned(context)) {
                context = context.toLowerCase();

                if (!isObjectAssigned(this._rules[context])) {
                    this._rules[context] = {};
                }

                this._rules[context][propertyName] = rule;

                return true;
            }

            return false;
        }

        /**
         *
         * @param context
         * @param propertyName
         * @returns {*}
         */

    }, {
        key: "getRule",
        value: function getRule(context, propertyName) {
            context = context.toLowerCase();

            // first check the first order rules:
            if (this._rules[context] && this._rules[context][propertyName]) {
                return this._rules[context][propertyName];
            }

            // maybe the parents have this rule?
            if (this._inheritance[context]) {
                // recursively try to get the rule from the parents:
                for (var i = 0; i < this._inheritance[context].length; ++i) {
                    var result = this.getRule(this._inheritance[context][i], propertyName);
                    if (result != null) {
                        return result;
                    }
                }
            }

            return null;
        }

        /**
         *
         * @param typeName
         * @param parent
         */

    }, {
        key: "inherit",
        value: function inherit(context, parent) {
            context = context.toLowerCase();
            parent = parent.toLowerCase();

            if (!isObjectAssigned(this._inheritance[context])) {
                this._inheritance[context] = [];
            }

            this._inheritance[context].push(parent);
        }

        //#endregion

    }], [{
        key: "instance",
        get: function get() {
            if (!this[_attributeDictionarySingleton]) {
                this[_attributeDictionarySingleton] = new AttributeDictionarySingleton(_attributeDictionarySingleton);
            }

            return this[_attributeDictionarySingleton];
        }
    }]);

    return AttributeDictionarySingleton;
}();

/**
 * Attribute Dictionary alias to Attribute Dictionary Singleton instance
 * Attribute dictionary for property definitions
 */


var AttributeDictionary = AttributeDictionarySingleton.instance;; /**
                                                                  * CallbackResponse Class
                                                                  */

var CallbackResponse = function () {

    //#region Constructors

    function CallbackResponse(params) {
        _classCallCheck(this, CallbackResponse);

        params = params || {};

        this.success = params.success;
        this.data = params.data || {};
    }

    //#endregion

    //#region Methods

    _createClass(CallbackResponse, [{
        key: "isSuccessful",
        value: function isSuccessful() {
            return this.success;
        }

        //#endregion

    }]);

    return CallbackResponse;
}();

; // alias for scarlett constants:
var SC = {
    WEBGL: "webgl",
    EXECUTION_PHASES: {
        WAITING: 0,
        UPDATE: 10,
        SCENE_UPDATE: 11,
        LATE_UPDATE: 12,
        RENDER: 13,
        SCENE_RENDER: 14,
        LATE_RENDER: 15
    },
    CONTENT_EXTENSIONS: {
        ATLAS: ".atl"
    },
    EVENTS: {
        CONTENT_ASSET_LOADED: "editor_updatePropertyEditorView"
    }
};

// function "quickies" holder
var sc = {};
; // unique key
var _contentLoaderSingleton = Symbol('contentLoaderSingleton');

/**
 * Content Loader Singleton Class
 */

var ContentLoaderSingleton = function () {

    //#region Constructors

    function ContentLoaderSingleton(contentLoaderSingletonToken) {
        _classCallCheck(this, ContentLoaderSingleton);

        if (_contentLoaderSingleton !== contentLoaderSingletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        // Cached files
        this._fileLoaded = {};
        this._fileAlias = {};

        // Cached images
        this._imgLoaded = {};
        this._imgAlias = {};

        // Cached audio
        this._audioLoaded = {};
        this._audioAlias = {};
    }

    //#endregion

    //#region Public Methods

    //#region Static Methods

    _createClass(ContentLoaderSingleton, [{
        key: "clear",


        //#endregion

        /**
         * Clears all loaded assets from the content loader
         */
        value: function clear() {
            this._imgLoaded = {};
            this._imgAlias = {};
            this._audioLoaded = {};
            this._audioAlias = {};
            this._fileLoaded = {};
            this._fileAlias = {};
        }

        /**
         * Loads several assets per category (audio, images, ..) and resolves after all are loaded
         * @param assets
         */

    }, {
        key: "load",
        value: function load(assets) {
            return new Promise(function (resolve, reject) {
                // result holder
                var result = {
                    success: [],
                    fail: []
                };

                // counters
                var toLoad = 0; // number of expected loaded assets
                var loaded = 0; // number of loaded assets

                function assetLoaded(asset, success) {
                    loaded += 1;

                    if (success) {
                        result.success.push(asset);
                    } else {
                        result.fail.push(asset);
                    }

                    if (loaded >= toLoad) {
                        resolve(result);
                    }
                }

                // load all images:
                assets.images = assets.images || [];
                assets.images.forEach(function (asset) {
                    if (!asset.path) {
                        return;
                    }

                    toLoad++; // count only supposedly valid assets

                    this.loadImage(asset.path, asset.alias).then(function () {
                        assetLoaded(asset, true);
                    }, function () {
                        assetLoaded(asset, false);
                    });
                }.bind(this));

                // load all images:
                assets.audio = assets.audio || [];
                assets.audio.forEach(function (asset) {
                    if (!asset.path) {
                        return;
                    }

                    toLoad++; // count only supposedly valid assets

                    this.loadAudio(asset.path, asset.alias).then(function () {
                        assetLoaded(asset, true);
                    }, function () {
                        assetLoaded(asset, false);
                    });
                }.bind(this));

                // load all images:
                assets.files = assets.files || [];
                assets.files.forEach(function (asset) {
                    if (!asset.path) {
                        return;
                    }

                    toLoad++; // count only supposedly valid assets

                    this.loadFile(asset.path, asset.alias).then(function () {
                        assetLoaded(asset, true);
                    }, function () {
                        assetLoaded(asset, false);
                    });
                }.bind(this));
            }.bind(this));
        }

        /**
         * Returns an image loaded by the given alias (if exists)
         * @param alias
         */

    }, {
        key: "getImage",
        value: function getImage(alias) {
            if (this._imgAlias.hasOwnProperty(alias)) {
                return this._imgLoaded[this._imgAlias[alias]];
            }
        }
    }, {
        key: "getSourcePath",
        value: function getSourcePath(alias) {
            if (this._imgAlias.hasOwnProperty(alias)) {
                return this._imgAlias[alias];
            }
            return null;
        }

        /**
         *
         * @param path
         * @param alias
         * @returns {Promise|Image} Image when successful
         */

    }, {
        key: "loadImage",
        value: function loadImage(path, alias) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                path = _this._enrichRelativePath(path);

                // is the image on cache?
                if (_this._imgLoaded.hasOwnProperty(path)) {
                    // the image is already cached. let's use it!
                    resolve(_this._imgLoaded[path]);
                } else {
                    (function () {
                        // the image is not in cache, we must load it:
                        var image = new Image();
                        image.src = path;
                        image.onload = function () {
                            // cache the loaded image:
                            _this._imgLoaded[path] = image;

                            if (alias) {
                                _this._imgAlias[alias] = path;
                            }

                            resolve(image);
                        };
                        image.onerror = function () {
                            // TODO: log this
                            reject();
                        };
                    })();
                }
            });
        }

        /**
         * Returns an audio loaded by the given alias (if exists)
         * @param alias
         */

    }, {
        key: "getAudio",
        value: function getAudio(alias) {
            if (this._audioAlias.hasOwnProperty(alias)) {
                return this._audioLoaded[this._audioAlias[alias]];
            }
        }

        /**
         * loads an audio file from a specified path into memory
         * @param path
         * @param alias
         * @returns {*}
         */

    }, {
        key: "loadAudio",
        value: function loadAudio(path, alias) {
            return new Promise(function (resolve, reject) {
                var _this2 = this;

                path = this._enrichRelativePath(path);

                // is the audio on cache?
                if (this._audioLoaded.hasOwnProperty(path)) {
                    // the audio is already cached. let's use it!
                    resolve(this._audioLoaded[path]);
                } else {
                    (function () {
                        var audio = new Audio();
                        audio.src = path;
                        audio.oncanplaythrough = function () {
                            // cache the loaded image:
                            this._audioLoaded[path] = audio;

                            if (alias) {
                                this._audioAlias[alias] = path;
                            }

                            resolve(audio);
                        }.bind(_this2);
                        audio.onerror = function () {
                            // TODO: log this
                            reject();
                        };
                    })();
                }
            }.bind(this));
        }

        /**
         * Returns a file loaded by the given alias (if exists)
         * @param alias
         */

    }, {
        key: "getFile",
        value: function getFile(alias) {
            if (this._fileAlias.hasOwnProperty(alias)) {
                return this._fileLoaded[this._fileAlias[alias]];
            }
        }

        /**
         * loads a file from a specified path into memory
         * @param path
         * @param alias
         * @returns {*}
         */

    }, {
        key: "loadFile",
        value: function loadFile(path, alias) {
            return new Promise(function (resolve, reject) {
                var _this3 = this;

                path = this._enrichRelativePath(path);

                // is the image on cache?
                if (this._fileLoaded.hasOwnProperty(path)) {
                    // the image is already cached. let's use it!
                    resolve(this._fileLoaded[path]);
                } else {
                    (function () {
                        var rawFile = new XMLHttpRequest();
                        //rawFile.overrideMimeType("application/json");
                        rawFile.open("GET", path, true);
                        rawFile.onreadystatechange = function () {
                            if (rawFile.readyState === 4 && rawFile.status == "200") {
                                // cache the loaded image:
                                this._fileLoaded[path] = rawFile.responseText;

                                if (alias) {
                                    this._fileAlias[alias] = path;
                                }

                                resolve(rawFile.responseText);
                            } else if (rawFile.readyState === 4 && rawFile.status != "200") {
                                reject();
                            }
                        }.bind(_this3);
                        rawFile.send(null);
                    })();
                }
            }.bind(this));
        }

        //#endregion

        //#region Private Methods

        /**
         *
         * @param path
         * @returns {*}
         * @private
         */

    }, {
        key: "_enrichRelativePath",
        value: function _enrichRelativePath(path) {
            // is this a relative path?
            if (GameManager.activeProjectPath && path.indexOf(GameManager.activeProjectPath) < 0) {
                path = GameManager.activeProjectPath + path;
            }

            return path;
        }

        //#endregion

    }], [{
        key: "instance",
        get: function get() {
            if (!this[_contentLoaderSingleton]) {
                this[_contentLoaderSingleton] = new ContentLoaderSingleton(_contentLoaderSingleton);
            }

            return this[_contentLoaderSingleton];
        }
    }]);

    return ContentLoaderSingleton;
}();

/**
 * Content Loader alias to Content Loader Singleton instance
 */


var ContentLoader = ContentLoaderSingleton.instance;; // unique key
var _eventManagerSingleton = Symbol('eventManagerSingleton');

/**
 * Event Manager Singleton Class
 */

var EventManagerSingleton = function () {

    //#region Constructors

    function EventManagerSingleton(eventManagerSingletonToken) {
        _classCallCheck(this, EventManagerSingleton);

        if (_eventManagerSingleton !== eventManagerSingletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
        this._handlers = {};
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(EventManagerSingleton, [{
        key: "subscribe",


        //#endregion

        /**
         *
         * @param topic
         * @param callback
         * @param context (optional)
         */
        value: function subscribe(topic, callback, context) {
            if (!this._handlers.hasOwnProperty(topic)) {
                this._handlers[topic] = [];
            }

            this._handlers[topic].push({
                callback: callback,
                context: context
            });
        }

        /**
         * Removes the subscription of a topic
         * @param topic
         * @param callback (for reference)
         */

    }, {
        key: "removeSubscription",
        value: function removeSubscription(topic, callback) {
            if (!this._handlers[topic]) {
                return;
            }

            for (var i = this._handlers[topic].length - 1; i >= 0; i--) {
                if (this._handlers[topic][i].callback == callback) {
                    this._handlers[topic].splice(i, 1);
                }
            }

            // no more subscriptions for this topic?
            if (this._handlers[topic].length == 0) {
                // nope... let's remove the topic then:
                delete this._handlers[topic];
            }
        }

        /**
         *
         * @param topic
         */

    }, {
        key: "emit",
        value: function emit(topic) {
            // get the remaining arguments (if exist)
            var args = [],
                i = void 0;
            if (arguments.length > 1) {
                for (i = 1; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
            }

            if (!this._handlers.hasOwnProperty(topic)) {
                return;
            }

            for (i = this._handlers[topic].length - 1; i >= 0; i--) {
                if (this._handlers[topic][i].callback) {
                    this._handlers[topic][i].callback.apply(this._handlers[topic][i].context, args);
                } else {
                    // this doesn't seem to exist anymore, let's remove it from the subscribers:
                    this._handlers[topic].splice(i, 1);
                }
            }
        }

        /**
         * Clears all subscriptions
         */

    }, {
        key: "clear",
        value: function clear() {
            this._handlers = {};
        }

        //#endregion

    }], [{
        key: "instance",
        get: function get() {
            if (!this[_eventManagerSingleton]) {
                this[_eventManagerSingleton] = new EventManagerSingleton(_eventManagerSingleton);
            }

            return this[_eventManagerSingleton];
        }
    }]);

    return EventManagerSingleton;
}();

/**
 * Event Manager alias to Event Manager Singleton instance
 */


var EventManager = EventManagerSingleton.instance;; /**
                                                    * Inserts an element at a desirable position
                                                    * @param index
                                                    * @param item
                                                    */
if (!Array.prototype.insert) {
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
}

/**
 * Ends Width Polyfill
 */

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

/**
 * Running the following code before any other code will create Array.isArray() if it's not natively available.
 */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

/**
 * Adds index of object to arrays, uses the object "equals()" function if available
 * @param search
 * @returns {number}
 */
Array.prototype.indexOfObject = function arrayObjectIndexOf(search) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (isEqual(this[i], search)) return i;
    }
    return -1;
};; /**
    *  Logger Class
    */

var Logger = function () {

    //#region Constructors

    function Logger(params) {
        _classCallCheck(this, Logger);

        params = params || {};

        // private properties:
        this._context = params.context || "Default";
    }

    //#endregion

    //#region Methods

    _createClass(Logger, [{
        key: "log",
        value: function log(message) {
            console.log(this._context + " | " + message);
        }
    }, {
        key: "warn",
        value: function warn(message) {
            console.warn(this._context + " | " + message);
        }
    }, {
        key: "error",
        value: function error(message) {
            console.error(this._context + " | " + message);
        }

        //#endregion

    }]);

    return Logger;
}();

// General Debug Logger


var debug = new Logger("Debug");; // unique key
var _setterDictionarySingleton = Symbol('setterDictionarySingleton');

/**
 * SetterDictionary Singleton Class
 * Attribute dictionary for property definitions
 */

var SetterDictionarySingleton = function () {

    //#region Constructors

    function SetterDictionarySingleton(setterDictionarySingletonToken) {
        _classCallCheck(this, SetterDictionarySingleton);

        if (_setterDictionarySingleton !== setterDictionarySingletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
        this._rules = {};
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(SetterDictionarySingleton, [{
        key: "addRule",


        //#endregion

        /**
         *
         * @param context
         * @param rule
         * @returns {boolean}
         */
        value: function addRule(context, rule) {
            if (isObjectAssigned(context)) {
                context = context.toLowerCase();
                this._rules[context] = rule;
                return true;
            }

            return false;
        }

        /**
         *
         * @param typeName
         * @returns {*}
         */

    }, {
        key: "getRule",
        value: function getRule(typeName) {
            typeName = typeName.toLowerCase();
            if (this._rules[typeName]) {
                return this._rules[typeName];
            }
        }
    }], [{
        key: "instance",
        get: function get() {
            if (!this[_setterDictionarySingleton]) {
                this[_setterDictionarySingleton] = new SetterDictionarySingleton(_setterDictionarySingleton);
            }

            return this[_setterDictionarySingleton];
        }
    }]);

    return SetterDictionarySingleton;
}();

/**
 * Setter Dictionary alias to Setter Dictionary Singleton instance
 * Attribute dictionary for property definitions
 */
var SetterDictionary = SetterDictionarySingleton.instance;; /**
                                                            * Scarlett @ DevTeam
                                                            * This javascript file will include global utility functions that can be called from any context
                                                            */

/**
 * This function will return true if there is something assigned to the given object and false if it isn't
 * @param obj
 * @returns {boolean}
 */
function isObjectAssigned(obj) {
    return typeof obj !== "undefined" && obj !== null;
}

/**
 * Validates if the given object is a string
 * @param obj
 * @returns {boolean}
 */
function isString(obj) {
    return typeof obj === "string";
}

/**
 * Validates if the given object is a number
 * @param obj
 * @returns {boolean}
 */
function isNumber(obj) {
    return typeof obj === "number";
}

/**
 * Validates if the given object is a game object
 * @param obj
 * @returns {boolean}
 */
function isGame(obj) {
    return obj instanceof Game;
}

/**
 * Validates if the given object is a game scene
 * @param obj
 * @returns {boolean}
 */
function isGameScene(obj) {
    return obj instanceof GameScene;
}

/**
 * Validates if the given object is a texture2d
 * @param obj
 * @returns {boolean}
 */
function isTexture2D(obj) {
    return obj instanceof Texture2D;
}

/**
 * Validates if the given object is a function
 * @param obj
 * @returns {boolean}
 */
function isFunction(obj) {
    return typeof obj === "function";
}

/**
 * Validates if the given object is a sprite
 * @param obj
 * @returns {boolean}
 */
function isSprite(obj) {
    return obj instanceof Sprite;
}

/**
 * Creates inheritance between classes by cloning the prototype
 * @param child
 * @param parent
 */
function inheritsFrom(child, parent) {
    child.prototype = Object.create(parent.prototype);
}

/**
 * Generates a unique natural number
 * @type {number}
 * @private
 */
var _SS_UID = 0;
function generateUID() {
    return ++_SS_UID;
}

/**
 * Capitalizes a string
 * @param string
 * @returns {*}
 */
function capitalize(string) {
    if (string.length >= 2) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else if (string.length == 1) {
        return string.charAt(0).toUpperCase();
    }
    return string;
}

/**
 * Split camel case
 * @param string
 * @returns {string}
 */
function splitCamelCase(string) {
    return string.replace(/([a-z](?=[A-Z]))/g, '$1 ');
}

/**
 * Gets the type of the object
 * @param object
 * @returns {*}
 */
function getType(object) {
    if (object === null) return "[object Null]"; // special case
    if (object.getType) return object.getType();
    return object.constructor.name || Object.prototype.toString.call(object);
}

/**
 * The following function compares both given objects applying the 'equal' function if it exist in the first
 * @param a
 * @param b
 */
function isEqual(a, b) {
    if (isFunction(a.equals)) {
        return a.equals(b);
    }

    return a === b;
}
; /**
  * Objectify utility class
  */

var Objectify = function () {

    //#region Static Properties

    //#endregion

    //#region Constructors

    function Objectify() {
        _classCallCheck(this, Objectify);
    }

    //#endregion

    //#region Static Methods

    /**
     * Objectify an array:
     * @param array
     */


    _createClass(Objectify, null, [{
        key: "array",
        value: function array(_array) {
            var result = [];
            _array.forEach(function (elem) {
                // this element has objectify implemented?
                if (isFunction(elem.objectify)) {
                    try {
                        var obj = Objectify.create(elem);
                        if (obj) {
                            result.push(obj);
                        }
                    } catch (ex) {
                        Objectify._logger.error("Failed to objectify element: " + ex);
                    }
                }
            });

            return result;
        }

        /**
         * Restores to the original state an array of objectified data
         * @param array
         */

    }, {
        key: "restoreArray",
        value: function restoreArray(array) {
            var result = [];
            array.forEach(function (elem) {
                if (elem._otype) {
                    result.push(Objectify.restore(elem, elem._otype));
                }
            });

            return result;
        }

        /**
         * Creates a valid JSON "stringify" data object
         * @param object
         * @param beautify
         */

    }, {
        key: "createDataString",
        value: function createDataString(object, beautify) {
            if (beautify) {
                return JSON.stringify(Objectify.create(object), null, 4);
            }

            return JSON.stringify(Objectify.create(object));
        }

        /**
         * Checks if a given object contains the objectify method
         * @param object
         */

    }, {
        key: "hasObjectify",
        value: function hasObjectify(object) {
            return isObjectAssigned(object) && isFunction(object.objectify);
        }

        /**
         * Creates an objectify valid data object
         * @param object
         */

    }, {
        key: "create",
        value: function create(object) {
            var type = getType(object);
            var result = void 0;

            // this object has objectify?
            if (Objectify.hasObjectify(object)) {
                result = object.objectify();
            } else {
                // nope, we can force to get the public properties then:
                result = JSON.parse(JSON.stringify(object));
            }

            result._otype = type;

            return result;
        }

        /**
         * Restores an object of a given type
         * @param data (the data to restore)
         * @param typeName (the name of the type to restore - optional if _otype is defined in data)
         */

    }, {
        key: "restore",
        value: function restore(data, typeName) {
            try {
                var type = isObjectAssigned(typeName) ? typeName : data._otype;
                type = eval(type);
                if (type && type.restore) {
                    return type.restore(data);
                }
            } catch (ex) {
                Objectify._logger.error("Failed to restore element: " + ex);
            }
        }

        /**
         * Restores an object from a string
         * @param jsonString
         * @param typeName
         */

    }, {
        key: "restoreFromString",
        value: function restoreFromString(jsonString, typeName) {
            return Objectify.restore(JSON.parse(jsonString), typeName);
        }

        /**
         * Extends the properties of the objA with the properties of objB
         * @param objA
         * @param objB
         * @returns {*}
         */

    }, {
        key: "extend",
        value: function extend(objA, objB) {
            Object.keys(objB).forEach(function (prop) {
                objA[prop] = objB[prop];
            });

            return objA;
        }

        //#endregion

    }]);

    return Objectify;
}();

//  TODO: place in constructor and add a static get for it? test in editor...


Objectify._logger = new Logger("Objectify");; /**
                                              * IO Path utility class
                                              */

var Path = function () {
    _createClass(Path, null, [{
        key: "_IS_WIN",


        //#region Static Properties

        /**
         *
         * @type {boolean}
         * @private
         */
        get: function get() {
            return navigator.platform.toLowerCase().indexOf('win') > -1;
        }

        /**
         * The appropriate system trailing slash
         * @type {string}
         * @public
         */

    }, {
        key: "TRAILING_SLASH",
        get: function get() {
            return Path._IS_WIN ? "\\" : "/";
        }

        //#endregion

        //#region Constructors

    }]);

    function Path() {
        _classCallCheck(this, Path);
    }

    //#endregion

    //#region Static Methods

    /**
     * Ensures this is a valid string directory (eg. ends with slash)
     * @param path
     * @returns {string}
     */


    _createClass(Path, null, [{
        key: "wrapDirectoryPath",
        value: function wrapDirectoryPath(path) {
            return path + (path.endsWith('/') || path.endsWith('\\') ? '' : Path.TRAILING_SLASH);
        }

        /**
         * Strips only the directory path (excludes file names)
         * @param path
         */

    }, {
        key: "getDirectory",
        value: function getDirectory(path) {
            var index = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
            return path.substring(0, index >= 0 ? index : path.length);
        }

        /**
         * Returns the directory name from a given path
         * @param path
         * @returns {string}
         */

    }, {
        key: "getDirectoryName",
        value: function getDirectoryName(path) {
            if (path.endsWith("/") || path.endsWith("\\")) {
                path = path.substring(0, path.length - 1);
            }

            var index = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
            return path.substring(index + 1, path.length);
        }

        /**
         * Gets a filename from a given path
         * @param path
         */

    }, {
        key: "getFilename",
        value: function getFilename(path) {
            var index = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
            return path.substring(index >= 0 && index < path.length - 1 ? index + 1 : 0, path.length);
        }

        /**
         * Gets a file extension from a given path
         * @param path
         */

    }, {
        key: "getFileExtension",
        value: function getFileExtension(path) {
            return path.substring(path.lastIndexOf('.'), path.length);
        }

        /**
         * Checks if pathA can be contained inside pathB
         * @param pathA
         * @param pathB
         */

    }, {
        key: "relativeTo",
        value: function relativeTo(pathA, pathB) {
            return Path.wrapDirectoryPath(pathA).indexOf(Path.wrapDirectoryPath(pathB)) === 0;
        }

        /**
         * Makes the full path relative to the base path
         * @param basePath
         * @param fullPath
         */

    }, {
        key: "makeRelative",
        value: function makeRelative(basePath, fullPath) {
            return fullPath.replace(Path.wrapDirectoryPath(basePath), "");
        }

        //#endregion

    }]);

    return Path;
}();

; /**
  * Created by Luis on 08/02/2017.
  */

// TODO: replace for extensions.js array insert? supports multiple arguments...
Array.prototype.insert = function (index) {
    this.splice.apply(this, [index, 0].concat(this.slice.call(arguments, 1)));
};

// TODO: place in another file?
String.prototype.insert = function (index, string) {
    if (index > 0) return this.substring(0, index) + string + this.substring(index, this.length);else return string + this;
};

/**
 * TextUtils Class
 */

var TextUtils = function () {
    function TextUtils() {
        _classCallCheck(this, TextUtils);
    }

    _createClass(TextUtils, null, [{
        key: "measureCharacterWidth",


        //#region Static Methods

        /**
         * Measures a given character's width based on the provided font style
         * @param {string} char character to measure
         * @param {FontStyle} fontStyle font style to measure with
         * @returns {number} the character width if valid and 0 if invalid
         * @public
         */
        value: function measureCharacterWidth(fontStyle, char) {
            // don't go further if parameters are invalid
            if (!fontStyle || !char) {
                return 0;
            }

            var scale = fontStyle.getScale();

            // if scale is invalid (0 or null)
            if (!scale) {
                return 0;
            }

            // retrieve character ID
            var charID = fontStyle.findCharID(char);

            // don't go further if char id is invalid
            if (charID === null) {
                return 0;
            }

            // calculate character 'width'
            // xadvance is based not only on the width but also on the padding, thus being used instead of width (?)
            var charWidth = fontStyle.getFontDescription().chars[charID].xadvance * scale;

            return charWidth;
        }

        /**
         * Measures the given text string width based on the provided font style
         * @param {FontStyle} fontStyle font style to measure with
         * @param {string} textStr text string to measure
         * @returns {number} the given text string width if valid and 0 if invalid
         * @public
         */

    }, {
        key: "measureTextWidth",
        value: function measureTextWidth(fontStyle, textStr) {
            // don't go further if parameters or scale are invalid
            if (!fontStyle || !textStr || !fontStyle.getScale()) {
                return 0;
            }

            // set initial width
            var width = 0;
            // set initial letter spacing (for the first character, basically)
            var currentLetterSpacing = 0;
            // just to keep track of reverting to the original letter spacing value, so we only do it once
            var revertedToOriginalValue = false;

            // iterate through every character
            for (var c = 0; c < textStr.length; c++) {
                // retrieve character at position c
                var char = textStr[c];

                // if there is already one or more valid characters, then we can use the actual letter spacing value
                if (!revertedToOriginalValue && width > 0) {
                    // revert to original value
                    currentLetterSpacing = fontStyle.getLetterSpacing();
                    // make sure we only enter this condition once
                    revertedToOriginalValue = true;
                }

                // store character's width temporarily
                var tempWidth = TextUtils.measureCharacterWidth(fontStyle, char);

                // if valid
                if (tempWidth > 0) {
                    // add its width
                    // if tempWidth was 0, adding letter spacing wouldn't make much sense.
                    width += tempWidth + currentLetterSpacing;
                }
            }

            // return total width
            return width;
        }
    }, {
        key: "wrapWordsShortVersion",
        value: function wrapWordsShortVersion(fontStyle, textStr, maxLineWidth) {
            var result = [];

            if (!fontStyle || !textStr || !maxLineWidth || maxLineWidth <= 0) {
                return result;
            }

            // retrieve words
            var words = textStr.split(' ');

            // no need to go further if there is only 1 word
            if (words.length == 1) {
                return words;
            }

            var whitespace = " ";
            // get first word and remove it from the array
            var currentLine = words.shift();

            // iterate through the words
            for (var w = 0; w < words.length; w++) {
                // retrieve word
                var word = words[w];

                // simulate line width with the current word and whitespaces in between
                var tempLine = currentLine + whitespace + word;

                var tempWidth = TextUtils.measureTextWidth(fontStyle, tempLine);

                if (tempWidth > maxLineWidth) {
                    result.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine += whitespace + word;
                }
            }

            // push last line
            result.push(currentLine);

            return result;
        }

        /**
         * Wraps the words of a given text depending on a maximum width and font style
         * @param {FontStyle} fontStyle font style to measure with
         * @param {string} textStr text string to wrap
         * @param {number} maxLineWidth maximum width per line
         * @param {boolean} characterWrap whether it should character wrap or not
         * @returns {Array} wrapped text in lines
         * @public
         */

    }, {
        key: "wrapWordsLongVersion",
        value: function wrapWordsLongVersion(fontStyle, textStr, maxLineWidth, characterWrap) {
            var result = [];

            if (!fontStyle || !textStr || !maxLineWidth || maxLineWidth <= 0) {
                return result;
            }

            // retrieve words
            var words = textStr.split(' ');

            // get first word and remove it from the array
            var currentLine = ""; //words.shift();
            // store its width
            var currentLineWordWidth = 0; //TextUtils.measureTextWidth(currentLine, scale);

            var whitespace = ""; // " ";
            var whitespaceWidth = 0; //TextUtils.measureCharacterWidth(whitespace, scale);
            // just to keep track of reverting whitespace to its original value (its real width)
            var revertedToOriginalValue = false;

            // iterate through the words
            for (var w = 0; w < words.length; w++) {
                // retrieve word
                var word = words[w];

                // just a way to not consider whitespace and its width (along with a possible letter spacing value)
                // if there aren't any characters or words already in the current line.
                if (!revertedToOriginalValue && currentLineWordWidth > 0) {
                    whitespace = " ";
                    // letter spacing also affects the whitespace width when there is at least 1 word
                    whitespaceWidth = TextUtils.measureCharacterWidth(fontStyle, whitespace) + fontStyle.getLetterSpacing();
                    // make sure we only enter this condition once (per line)
                    revertedToOriginalValue = true;
                }

                // calculate word width according to the text scale (not characters length!)
                var wordWidth = TextUtils.measureTextWidth(fontStyle, word);

                // TODO: think of a cleaner way of doing this? maybe wrapTextByCharacter shouldn't return line objects?
                if (characterWrap && wordWidth > maxLineWidth) {
                    var tempLine = currentLine + whitespace + word;

                    var characterWrappedLines = TextUtils.wrapTextByCharacter(fontStyle, tempLine, maxLineWidth);

                    // currentLine is the last line so maybe next word also fits
                    currentLine = characterWrappedLines.splice(-1, 1)[0].chars.join("");
                    currentLineWordWidth = TextUtils.measureTextWidth(fontStyle, currentLine);
                    // reset whitespace values as currentLineWordWidth can be 0... and would consider whitespace
                    // in the beginning of a new line, which we are trying to avoid (the reason of all this mess!)
                    whitespace = "";
                    whitespaceWidth = 0;
                    revertedToOriginalValue = false;

                    // push the others
                    for (var cline = 0; cline < characterWrappedLines.length; cline++) {
                        var characterLine = characterWrappedLines[cline].chars.join("");
                        result.push(characterLine);
                    }
                    // no need to go further in this iteration
                    continue;
                }

                // simulate line width with the current word, a whitespace in between and also extra line spacing if any
                var tempWidth = currentLineWordWidth + wordWidth + whitespaceWidth;

                if (tempWidth > maxLineWidth) {
                    result.push(currentLine);
                    currentLine = word;
                    currentLineWordWidth = wordWidth;
                    // reset whitespace values as currentLineWordWidth can be 0... and would consider whitespace
                    // in the beginning of a new line, which we are trying to avoid (the reason of all this mess!)
                    whitespace = "";
                    whitespaceWidth = 0;
                    revertedToOriginalValue = false;
                } else {
                    currentLine += whitespace + word;
                    currentLineWordWidth += whitespaceWidth + wordWidth;
                }
            }

            // push last line
            result.push(currentLine);

            return result;
        }

        /**
         * Wraps the characters of a given text depending on a maximum width and text scale
         * @param {FontStyle} fontStyle font style to measure with
         * @param {string} textStr text string to wrap
         * @param {number} maxLineWidth maximum width per line
         * @returns {Array} wrapped text in lines
         * @public
         */

    }, {
        key: "wrapTextByCharacter",
        value: function wrapTextByCharacter(fontStyle, textStr, maxLineWidth) {
            // create empty array
            var lines = [];

            // TODO: trim?
            // if parameters are invalid, no need to go further
            if (!fontStyle || !textStr || !maxLineWidth || maxLineWidth <= 0) {
                return lines;
            }

            // create first line, since it's sure to have some text
            lines.push({
                chars: [],
                width: 0
            });

            // set initial value for letter spacing (for the first character iteration, basically...)
            var currentLetterSpacing = 0;
            // just to keep track of reverting to letter spacing original value
            var revertedToOriginalValue = false;

            // iterate through text characters
            for (var c = 0; c < textStr.length; c++) {
                // retrieve text character
                var char = textStr[c];

                // store current line index
                var currentLine = lines.length - 1;

                // after the first (valid) character of current line, get the actual value of letter spacing
                if (!revertedToOriginalValue && lines[currentLine].width > 0) {
                    // revert to original value
                    currentLetterSpacing = fontStyle.getLetterSpacing();
                    // make sure we only enter this condition once (per line, thus the resets down below)
                    revertedToOriginalValue = true;
                }

                // retrieve character width
                var charWidth = TextUtils.measureCharacterWidth(fontStyle, char);

                // current width + char width + letter spacing if there is at least 1 character
                var tempWidth = lines[currentLine].width + charWidth + currentLetterSpacing;

                // if current line width + the current character width is > than the max width
                if (tempWidth > maxLineWidth) {
                    // create a new and empty line
                    lines.push({
                        chars: [],
                        width: 0
                    });

                    // update current line index
                    currentLine++;
                    // reset letter spacing!
                    currentLetterSpacing = 0;
                    // and the variable that keeps track of reverting to actual letter spacing value
                    revertedToOriginalValue = false;

                    // skip if the character is a whitespace
                    if (char === " ") {
                        continue;
                    }
                }

                // add character and its width to current line (plus letter spacing if there is at least 1 character)
                lines[currentLine].width += charWidth + currentLetterSpacing;
                lines[currentLine].chars.push(char);
            }

            return lines;
        }

        /**
         * Converts a given text into a Line Object, with an array of characters and the line total width
         * @param {FontStyle} fontStyle font style to measure with
         * @param {string} textStr text string to convert into a line object
         * @returns {{chars: Array, width: number}}
         * @public
         */

    }, {
        key: "convertTextStringToLineFormat",
        value: function convertTextStringToLineFormat(fontStyle, textStr) {
            // define empty line
            var line = {
                chars: Array(),
                width: 0
            };

            // return empty if any of the values or scale is invalid
            if (!fontStyle || !textStr || !fontStyle.getScale()) {
                return line;
            }

            // set line characters and width
            line.chars = textStr.split("");
            line.width = TextUtils.measureTextWidth(fontStyle, textStr);

            return line;
        }

        /**
         * Creates the definitive lines to draw onto the screen
         * @param {FontStyle} fontStyle font style to measure with
         * @param {string} textStr text string to draw
         * @param {number} maxLineWidth maximum line width
         * @param {boolean} wordWrap whether it should word wrap or not
         * @param {boolean} characterWrap whether it should character wrap or not
         * @returns {Array} text split into lines
         * @public
         */

    }, {
        key: "measureText",
        value: function measureText(fontStyle, textStr, maxLineWidth, wordWrap, characterWrap) {
            // create empty array
            var resultLines = [];

            // if parameters or scale are invalid, there is no need to go further
            if (!fontStyle || !textStr || !maxLineWidth || !fontStyle.getScale()) {
                return resultLines;
            }

            // create first line, since it's sure to have some text
            resultLines.push({
                chars: [],
                width: 0
            });

            // store original text
            var useText = textStr;

            // create array for user defined lines
            var userDefinedLines = [];

            // word wrap by inserting \n in the original text
            if (wordWrap) {
                // initialize resulting text
                var wrappedText = "";
                // split text into lines defined by the user
                userDefinedLines = useText.split(/(?:\r\n|\r|\n)/);

                // iterate through lines
                for (var l = 0; l < userDefinedLines.length; l++) {
                    // wrap line
                    var wrappedLine = TextUtils.wrapWordsLongVersion(fontStyle, userDefinedLines[l], maxLineWidth, characterWrap).join('\n');
                    // always insert a break at the end since the split gets rid of the user defined breaks...
                    wrappedLine = wrappedLine.insert(wrappedLine.length, "\n");
                    // concatenate to resulting wrapping text
                    wrappedText = wrappedText.concat(wrappedLine);
                }

                // assign useText to resulting wrapping text
                useText = wrappedText;
            }

            // split text into lines defined by the users (and also word wrapped now ;))
            userDefinedLines = useText.split(/(?:\r\n|\r|\n)/);

            // iterate through user defined lines (with special characters)
            for (var _l = 0; _l < userDefinedLines.length; _l++) {

                var userDefinedLine = userDefinedLines[_l];

                var preparedLines = [];

                // only perform character wrap if word wrap isn't enabled in the first place
                if (!wordWrap && characterWrap) {
                    preparedLines = TextUtils.wrapTextByCharacter(fontStyle, userDefinedLine, maxLineWidth);
                } else {
                    preparedLines.push(TextUtils.convertTextStringToLineFormat(fontStyle, userDefinedLine));
                }

                // extended result array (does not create a new array such as concat)
                Array.prototype.push.apply(resultLines, preparedLines);
            }

            return resultLines;
        }

        //#endregion

    }]);

    return TextUtils;
}();

; /**
  * General utility class
  */

var Utility = function Utility() {
    _classCallCheck(this, Utility);
};

; /**
  * Grid Extension Class
  */

var GridExt = function () {

    //#region Constructors

    function GridExt(params) {
        _classCallCheck(this, GridExt);

        params = params || {};

        if (!params.game) {
            throw "cannot create debug extension without game parameter";
        }

        // public properties:
        this.enabled = true;

        // private properties:
        this._game = params.game || null;
        this._gridSize = params.gridSize || 32;
        this._gridColor = params.gridColor || Color.Red;
        this._originLines = true;
        this._zoomMultiplier = 2;
        // TODO: maybe get a batch here?
        this._primitiveRender = new PrimitiveRender(params.game);
    }

    //#endregion

    //#region Methods

    /**
     *
     * @param enable
     */


    _createClass(GridExt, [{
        key: "setOriginLines",
        value: function setOriginLines(enable) {
            this._originLines = enable;
        }

        /**
         *
         * @param value
         */

    }, {
        key: "setGridSize",
        value: function setGridSize(value) {
            this._gridSize = value;
        }

        /**
         *
         */

    }, {
        key: "getGridSize",
        value: function getGridSize() {
            return this._gridSize;
        }

        /**
         *
         * @param color
         */

    }, {
        key: "setGridColor",
        value: function setGridColor(color) {
            this._gridColor = color;
        }

        /**
         *
         * @param delta
         */

    }, {
        key: "render",
        value: function render(delta) {
            // render a grid?
            if (this.enabled) {
                // I have an idea that can be great here..
                // create a global event for whenever the camera properties change (aka, calculate matrix is called), and store
                // the following calculations on event:
                var zoom = this._game.getActiveCamera().zoom;
                var floorZoom = Math.floor(zoom);

                //var gridSize = floorZoom > 1 ? this._gridSize * floorZoom : this._gridSize;
                var gridSize = this._gridSize;
                for (var i = 0; i < floorZoom - 1; i++) {
                    if (i % this._zoomMultiplier == 0) {
                        gridSize *= 2;
                    }
                }

                var upperGridSize = gridSize * 2;
                var screenResolution = this._game.getVirtualResolution();
                var offsetX = this._game.getActiveCamera().x - this._game.getActiveCamera().x % gridSize;
                var offsetY = this._game.getActiveCamera().y - this._game.getActiveCamera().y % gridSize;
                var zoomDifX = zoom * screenResolution.width * 2.0;
                var zoomDifY = zoom * screenResolution.height * 2.0;
                var howManyX = Math.floor((screenResolution.width + zoomDifX) / gridSize + 2);
                var howManyY = Math.floor((screenResolution.height + zoomDifY) / gridSize + 2);
                var alignedX = Math.floor(howManyX / 2.0) % 2 == 0;
                var alignedY = Math.floor(howManyY / 2.0) % 2 == 0;
                var left = -(screenResolution.width + zoomDifX) / 2;
                var right = (screenResolution.width + zoomDifX) / 2;
                var top = -(screenResolution.height + zoomDifY) / 2;
                var bottom = (screenResolution.height + zoomDifY) / 2;
                var dynColor = this._gridColor.clone();
                var color = null;

                if (zoom > 1) {
                    dynColor.a = 1 - zoom % this._zoomMultiplier / this._zoomMultiplier;
                }

                // horizontal shift ||||||||
                for (var x = 0; x < howManyX; x++) {
                    color = this._gridColor;
                    if ((x * gridSize + offsetX + (alignedX ? gridSize : 0)) % upperGridSize) {
                        color = dynColor;
                    }

                    this._primitiveRender.drawLine({
                        x: x * gridSize + left - left % gridSize + offsetX,
                        y: bottom + gridSize + offsetY
                    }, {
                        x: x * gridSize + left - left % gridSize + offsetX,
                        y: top - gridSize + offsetY
                    }, 1, color);
                }

                // vertical shift _ _ _ _ _
                for (var y = 0; y < howManyY; y++) {
                    color = this._gridColor;
                    if ((y * gridSize + offsetY + (alignedY ? gridSize : 0)) % upperGridSize) {
                        color = dynColor;
                    }

                    this._primitiveRender.drawLine({
                        x: right + this._gridSize + offsetX,
                        y: y * gridSize + top - top % gridSize + offsetY
                    }, {
                        x: left - gridSize + offsetX,
                        y: y * gridSize + top - top % gridSize + offsetY
                    }, 1, color);
                }

                // main "lines" (origin)
                if (this._originLines) {
                    // vertical
                    this._primitiveRender.drawRectangle(new Rectangle(-2, top - this._gridSize + offsetY, 4, screenResolution.height + zoomDifY), this._gridColor);

                    // horizontal
                    this._primitiveRender.drawRectangle(new Rectangle(left - this._gridSize + offsetX, -2, screenResolution.width + zoomDifX, 4), this._gridColor);
                }
            }
        }

        //#endregion

    }]);

    return GridExt;
}();

; /*
  Boundary Class
  */

var Boundary = function () {

    //#region Constructors

    /**
     * Boundary structure
     * @param {Vector2} topLeft
     * @param {Vector2} topRight
     * @param {Vector2} bottomRight
     * @param {Vector2} bottomLeft
     * @constructor
     */
    function Boundary(topLeft, topRight, bottomRight, bottomLeft) {
        _classCallCheck(this, Boundary);

        // public properties:
        this.topLeft = topLeft || new Vector2();
        this.topRight = topRight || new Vector2();
        this.bottomRight = bottomRight || new Vector2();
        this.bottomLeft = bottomLeft || new Vector2();
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Boundary, [{
        key: "getVertices",


        //#endregion

        /**
         * Returns all vertices in an array
         * @returns {Array.<{topLeft: Vector2, topRight: Vector2, bottomRight: Vector2, bottomLeft: Vector2}>}
         */
        value: function getVertices() {
            return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
        }

        /**
         * Calculate the normals of each boundary side and returns a object mapped with the values of each side
         * @returns {{top: Vector2, right: Vector2, bottom: Vector2, left: Vector2}}
         */

    }, {
        key: "getNormals",
        value: function getNormals() {
            return {
                top: new Vector2(this.topRight.x - this.topLeft.x, this.topRight.y - this.topLeft.y).normalLeft(),
                right: new Vector2(this.bottomRight.x - this.topRight.x, this.bottomRight.y - this.topRight.y).normalLeft(),
                bottom: new Vector2(this.bottomLeft.x - this.bottomRight.x, this.bottomLeft.y - this.bottomRight.y).normalLeft(),
                left: new Vector2(this.topLeft.x - this.bottomLeft.x, this.topLeft.y - this.bottomLeft.y).normalLeft()
            };
        }

        /**
         * Tests if the boundary is overlapping another
         * @param other
         * @returns {boolean}
         */

    }, {
        key: "overlapsWith",
        value: function overlapsWith(other) {
            return Boundary.overlap(this, other);
        }

        //#endregion

    }], [{
        key: "getMinMax",
        value: function getMinMax(boundary, norm) {
            var probeA = boundary.topRight.dot(norm);
            var probeB = boundary.bottomRight.dot(norm);
            var probeC = boundary.bottomLeft.dot(norm);
            var probeD = boundary.topLeft.dot(norm);

            return {
                max: Math.max(probeA, probeB, probeC, probeD),
                min: Math.min(probeA, probeB, probeC, probeD)
            };
        }

        /**
         * Tests if two boundaries are overlapping each other
         * @param {Boundary} boundaryA
         * @param {Boundary} boundaryB
         * @returns {boolean} whether the boundaries overlap
         */

    }, {
        key: "overlap",
        value: function overlap(boundaryA, boundaryB) {
            // the following collision detection is based on the separating axis theorem:
            // http://www.gamedev.net/page/resources/_/technical/game-programming/2d-rotated-rectangle-collision-r2604
            var normA = boundaryA.getNormals();
            var normB = boundaryB.getNormals();

            var p1 = void 0,
                p2 = void 0,
                normNode = void 0,
                norm = void 0;
            for (var i = 0; i < 4; i++) {
                normNode = i >= 2 ? normB : normA;
                norm = i % 2 == 0 ? normNode.bottom : normNode.right;
                p1 = Boundary.getMinMax(boundaryA, norm);
                p2 = Boundary.getMinMax(boundaryB, norm);

                if (p1.max < p2.min || p2.max < p1.min) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Creates a boundary object based on the given vector and adds the specified bulk dimension
         * @param {Vector2} vec
         * @param bulk
         * @returns {Boundary} a boundary based on the given vector and bulk
         */

    }, {
        key: "fromVector2",
        value: function fromVector2(vec, bulk) {
            var halfBulk = bulk / 2.0;
            return new Boundary(new Vector2(vec.x - halfBulk, vec.y - halfBulk), new Vector2(vec.x + halfBulk, vec.y - halfBulk), new Vector2(vec.x + halfBulk, vec.y + halfBulk), new Vector2(vec.x - halfBulk, vec.y + halfBulk));
        }
    }]);

    return Boundary;
}();

; /**
  * Math Helper utility Class
  */

var MathHelper = function () {
    _createClass(MathHelper, null, [{
        key: "PI",


        //#region Static Properties

        /**
         * PI value
         * @type {number}
         */
        get: function get() {
            return Math.PI;
        }

        /**
         * PI multiplied by two
         * @type {number}
         */

    }, {
        key: "PI2",
        get: function get() {
            return MathHelper.PI * 2.0;
        }

        /**
         * PI multiplied by four
         * @type {number}
         */

    }, {
        key: "PI4",
        get: function get() {
            return MathHelper.PI * 4.0;
        }

        /**
         * PI divided by two
         * @type {number}
         */

    }, {
        key: "PIo2",
        get: function get() {
            return MathHelper.PI / 2.0;
        }

        /**
         * PI divided by four
         * @type {number}
         */

    }, {
        key: "PIo4",
        get: function get() {
            return MathHelper.PI / 4.0;
        }

        //#endregion

        //#region Constructors

        /**
         * @constructor
         */

    }]);

    function MathHelper() {
        _classCallCheck(this, MathHelper);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     * Clamp a value between a min and max value
     * @param value
     * @param min
     * @param max
     */


    _createClass(MathHelper, null, [{
        key: "clamp",
        value: function clamp(value, min, max) {
            return value < min ? min : value > max ? max : value;
        }

        /**
         * Converts degree to radians
         * @param degrees
         */

    }, {
        key: "degToRad",
        value: function degToRad(degrees) {
            return degrees * 0.0174532925;
        }

        /**
         * Converts radians to degrees
         * @param radians
         */

    }, {
        key: "radToDeg",
        value: function radToDeg(radians) {
            return radians * 57.295779513;
        }

        /**
         * Normalize a given raw value between the internal [minNormalized, maxNormalized]
         * @param {number} rawValue the value to normalize
         * @param {number} minRaw the minimum raw value
         * @param {number} maxRaw the maximum raw value
         * @param {number} minNormalized the minimum normalized value
         * @param {number} maxNormalized the maximum normalized value
         */

    }, {
        key: "normalize",
        value: function normalize(rawValue, minRaw, maxRaw, minNormalized, maxNormalized) {
            var x = rawValue;
            var minX = minRaw;
            var maxX = maxRaw;
            var a = minNormalized;
            var b = maxNormalized;
            var denominator = maxX - minX;

            if (denominator === 0) {
                throw new Error("Division by 0 not allowed");
            }

            var numerator = x - minX;
            var normalizedValue = (b - a) * (numerator / denominator) + a;

            return normalizedValue;
        }

        //#endregion

        //#endregion

    }]);

    return MathHelper;
}();

; /**
  * Matrix3 class @ based on Tdl.Math
  * https://github.com/greggman/tdl/blob/master/tdl/math.js
  */

var Matrix3 = function () {

    /**
     * Class constructor
     * @param {Array|Float32Array=} array
     */
    function Matrix3(array) {
        _classCallCheck(this, Matrix3);

        if ((array instanceof Array || array instanceof Float32Array) && array.length === 9) {
            this._matrix = new Float32Array(array);
        } else {
            this._matrix = new Float32Array(9);
        }
    }

    /**
     * Copies the content of the current matrix to another
     * @param {Matrix3} outMatrix
     */


    _createClass(Matrix3, [{
        key: "copy",
        value: function copy(outMatrix) {
            if (outMatrix instanceof Matrix3) {
                outMatrix.setFromArray(this.asArray());
            }
        }

        /**
         *
         * @param {Array|Float32Array} array
         */

    }, {
        key: "setFromArray",
        value: function setFromArray(array) {
            if ((array instanceof Array || array instanceof Float32Array) && array.length === 9) {
                this._matrix = new Float32Array(array);
            }
        }

        /**
         * Returns a cloned Matrix
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Matrix3(this._matrix.asArray());
        }

        /**
         * Returns the matrix array value
         * @returns {Float32Array}
         */

    }, {
        key: "asArray",
        value: function asArray() {
            return this._matrix;
        }

        /**
         * Calculates the inverse matrix
         * @returns {Float32Array}
         */

    }, {
        key: "invert",
        value: function invert() {
            var t00 = this._matrix[1 * 3 + 1] * this._matrix[2 * 3 + 2] - this._matrix[1 * 3 + 2] * this._matrix[2 * 3 + 1];
            var t10 = this._matrix[0 * 3 + 1] * this._matrix[2 * 3 + 2] - this._matrix[0 * 3 + 2] * this._matrix[2 * 3 + 1];
            var t20 = this._matrix[0 * 3 + 1] * this._matrix[1 * 3 + 2] - this._matrix[0 * 3 + 2] * this._matrix[1 * 3 + 1];
            var d = 1.0 / (this._matrix[0 * 3 + 0] * t00 - this._matrix[1 * 3 + 0] * t10 + this._matrix[2 * 3 + 0] * t20);

            this._matrix[0] = d * t00;
            this._matrix[1] = -d * t10;
            this._matrix[2] = d * t20;
            this._matrix[3] = -d * (this._matrix[1 * 3 + 0] * this._matrix[2 * 3 + 2] - this._matrix[1 * 3 + 2] * this._matrix[2 * 3 + 0]);
            this._matrix[4] = d * (this._matrix[0 * 3 + 0] * this._matrix[2 * 3 + 2] - this._matrix[0 * 3 + 2] * this._matrix[2 * 3 + 0]);
            this._matrix[5] = -d * (this._matrix[0 * 3 + 0] * this._matrix[1 * 3 + 2] - this._matrix[0 * 3 + 2] * this._matrix[1 * 3 + 0]);
            this._matrix[6] = d * (this._matrix[1 * 3 + 0] * this._matrix[2 * 3 + 1] - this._matrix[1 * 3 + 1] * this._matrix[2 * 3 + 0]);
            this._matrix[7] = -d * (this._matrix[0 * 3 + 0] * this._matrix[2 * 3 + 1] - this._matrix[0 * 3 + 1] * this._matrix[2 * 3 + 0]);
            this._matrix[8] = d * (this._matrix[0 * 3 + 0] * this._matrix[1 * 3 + 1] - this._matrix[0 * 3 + 1] * this._matrix[1 * 3 + 0]);

            return this._matrix;
        }

        /**
         * Multiples the current Matrix3 by another Matrix3
         * @param matrix3
         */

    }, {
        key: "multiply",
        value: function multiply(matrix3) {
            var a00 = this._matrix[0 * 3 + 0];
            var a01 = this._matrix[0 * 3 + 1];
            var a02 = this._matrix[0 * 3 + 2];
            var a10 = this._matrix[1 * 3 + 0];
            var a11 = this._matrix[1 * 3 + 1];
            var a12 = this._matrix[1 * 3 + 2];
            var a20 = this._matrix[2 * 3 + 0];
            var a21 = this._matrix[2 * 3 + 1];
            var a22 = this._matrix[2 * 3 + 2];

            var b00 = matrix3[0 * 3 + 0];
            var b01 = matrix3[0 * 3 + 1];
            var b02 = matrix3[0 * 3 + 2];
            var b10 = matrix3[1 * 3 + 0];
            var b11 = matrix3[1 * 3 + 1];
            var b12 = matrix3[1 * 3 + 2];
            var b20 = matrix3[2 * 3 + 0];
            var b21 = matrix3[2 * 3 + 1];
            var b22 = matrix3[2 * 3 + 2];

            this._matrix[0] = a00 * b00 + a01 * b10 + a02 * b20;
            this._matrix[1] = a00 * b01 + a01 * b11 + a02 * b21;
            this._matrix[2] = a00 * b02 + a01 * b12 + a02 * b22;
            this._matrix[3] = a10 * b00 + a11 * b10 + a12 * b20;
            this._matrix[4] = a10 * b01 + a11 * b11 + a12 * b21;
            this._matrix[5] = a10 * b02 + a11 * b12 + a12 * b22;
            this._matrix[6] = a20 * b00 + a21 * b10 + a22 * b20;
            this._matrix[7] = a20 * b01 + a21 * b11 + a22 * b21;
            this._matrix[8] = a20 * b02 + a21 * b12 + a22 * b22;

            return this._matrix;
        }

        /**
         * Set Matrix identity
         * @returns {Float32Array}
         */

    }, {
        key: "identity",
        value: function identity() {
            this._matrix[0] = 1;
            this._matrix[1] = 0;
            this._matrix[2] = 0;
            this._matrix[3] = 0;
            this._matrix[4] = 1;
            this._matrix[5] = 0;
            this._matrix[6] = 0;
            this._matrix[7] = 0;
            this._matrix[8] = 1;

            return this._matrix;
        }
    }]);

    return Matrix3;
}();

; /**
  * Matrix4 class @ based on Tdl.Math
  * https://github.com/greggman/tdl/blob/master/tdl/math.js
  */

var Matrix4 = function () {

    /**
     * Class constructor
     * @param {Array|Float32Array=} array
     */
    function Matrix4(array) {
        _classCallCheck(this, Matrix4);

        if ((array instanceof Array || array instanceof Float32Array) && array.length === 16) {
            this._matrix = new Float32Array(array);
        } else {
            this._matrix = new Float32Array(16);
        }
    }

    /**
     * Copies the content of the current matrix to another
     * @param {Matrix4} outMatrix
     */


    _createClass(Matrix4, [{
        key: "copy",
        value: function copy(outMatrix) {
            if (outMatrix instanceof Matrix4) {
                outMatrix.setFromArray(this.asArray());
            }
        }

        /**
         *
         * @param {Array|Float32Array} array
         */

    }, {
        key: "setFromArray",
        value: function setFromArray(array) {
            if ((array instanceof Array || array instanceof Float32Array) && array.length === 16) {
                this._matrix = new Float32Array(array);
            }
        }

        /**
         * Returns a cloned Matrix
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Matrix4(this._matrix.asArray());
        }

        /**
         * Returns the matrix array value
         * @returns {Float32Array}
         */

    }, {
        key: "asArray",
        value: function asArray() {
            return this._matrix;
        }

        /**
         * Calculates the inverse matrix
         * @returns {Float32Array}
         */

    }, {
        key: "invert",
        value: function invert() {
            var tmp_0 = this._matrix[2 * 4 + 2] * this._matrix[3 * 4 + 3];
            var tmp_1 = this._matrix[3 * 4 + 2] * this._matrix[2 * 4 + 3];
            var tmp_2 = this._matrix[1 * 4 + 2] * this._matrix[3 * 4 + 3];
            var tmp_3 = this._matrix[3 * 4 + 2] * this._matrix[1 * 4 + 3];
            var tmp_4 = this._matrix[1 * 4 + 2] * this._matrix[2 * 4 + 3];
            var tmp_5 = this._matrix[2 * 4 + 2] * this._matrix[1 * 4 + 3];
            var tmp_6 = this._matrix[0 * 4 + 2] * this._matrix[3 * 4 + 3];
            var tmp_7 = this._matrix[3 * 4 + 2] * this._matrix[0 * 4 + 3];
            var tmp_8 = this._matrix[0 * 4 + 2] * this._matrix[2 * 4 + 3];
            var tmp_9 = this._matrix[2 * 4 + 2] * this._matrix[0 * 4 + 3];
            var tmp_10 = this._matrix[0 * 4 + 2] * this._matrix[1 * 4 + 3];
            var tmp_11 = this._matrix[1 * 4 + 2] * this._matrix[0 * 4 + 3];
            var tmp_12 = this._matrix[2 * 4 + 0] * this._matrix[3 * 4 + 1];
            var tmp_13 = this._matrix[3 * 4 + 0] * this._matrix[2 * 4 + 1];
            var tmp_14 = this._matrix[1 * 4 + 0] * this._matrix[3 * 4 + 1];
            var tmp_15 = this._matrix[3 * 4 + 0] * this._matrix[1 * 4 + 1];
            var tmp_16 = this._matrix[1 * 4 + 0] * this._matrix[2 * 4 + 1];
            var tmp_17 = this._matrix[2 * 4 + 0] * this._matrix[1 * 4 + 1];
            var tmp_18 = this._matrix[0 * 4 + 0] * this._matrix[3 * 4 + 1];
            var tmp_19 = this._matrix[3 * 4 + 0] * this._matrix[0 * 4 + 1];
            var tmp_20 = this._matrix[0 * 4 + 0] * this._matrix[2 * 4 + 1];
            var tmp_21 = this._matrix[2 * 4 + 0] * this._matrix[0 * 4 + 1];
            var tmp_22 = this._matrix[0 * 4 + 0] * this._matrix[1 * 4 + 1];
            var tmp_23 = this._matrix[1 * 4 + 0] * this._matrix[0 * 4 + 1];

            var t0 = tmp_0 * this._matrix[1 * 4 + 1] + tmp_3 * this._matrix[2 * 4 + 1] + tmp_4 * this._matrix[3 * 4 + 1] - (tmp_1 * this._matrix[1 * 4 + 1] + tmp_2 * this._matrix[2 * 4 + 1] + tmp_5 * this._matrix[3 * 4 + 1]);
            var t1 = tmp_1 * this._matrix[0 * 4 + 1] + tmp_6 * this._matrix[2 * 4 + 1] + tmp_9 * this._matrix[3 * 4 + 1] - (tmp_0 * this._matrix[0 * 4 + 1] + tmp_7 * this._matrix[2 * 4 + 1] + tmp_8 * this._matrix[3 * 4 + 1]);
            var t2 = tmp_2 * this._matrix[0 * 4 + 1] + tmp_7 * this._matrix[1 * 4 + 1] + tmp_10 * this._matrix[3 * 4 + 1] - (tmp_3 * this._matrix[0 * 4 + 1] + tmp_6 * this._matrix[1 * 4 + 1] + tmp_11 * this._matrix[3 * 4 + 1]);
            var t3 = tmp_5 * this._matrix[0 * 4 + 1] + tmp_8 * this._matrix[1 * 4 + 1] + tmp_11 * this._matrix[2 * 4 + 1] - (tmp_4 * this._matrix[0 * 4 + 1] + tmp_9 * this._matrix[1 * 4 + 1] + tmp_10 * this._matrix[2 * 4 + 1]);

            var d = 1.0 / (this._matrix[0 * 4 + 0] * t0 + this._matrix[1 * 4 + 0] * t1 + this._matrix[2 * 4 + 0] * t2 + this._matrix[3 * 4 + 0] * t3);

            var newMatrix = new Float32Array(16);
            newMatrix[0] = d * t0;
            newMatrix[1] = d * t1;
            newMatrix[2] = d * t2;
            newMatrix[3] = d * t3;
            newMatrix[4] = d * (tmp_1 * this._matrix[1 * 4 + 0] + tmp_2 * this._matrix[2 * 4 + 0] + tmp_5 * this._matrix[3 * 4 + 0] - (tmp_0 * this._matrix[1 * 4 + 0] + tmp_3 * this._matrix[2 * 4 + 0] + tmp_4 * this._matrix[3 * 4 + 0]));
            newMatrix[5] = d * (tmp_0 * this._matrix[0 * 4 + 0] + tmp_7 * this._matrix[2 * 4 + 0] + tmp_8 * this._matrix[3 * 4 + 0] - (tmp_1 * this._matrix[0 * 4 + 0] + tmp_6 * this._matrix[2 * 4 + 0] + tmp_9 * this._matrix[3 * 4 + 0]));
            newMatrix[6] = d * (tmp_3 * this._matrix[0 * 4 + 0] + tmp_6 * this._matrix[1 * 4 + 0] + tmp_11 * this._matrix[3 * 4 + 0] - (tmp_2 * this._matrix[0 * 4 + 0] + tmp_7 * this._matrix[1 * 4 + 0] + tmp_10 * this._matrix[3 * 4 + 0]));
            newMatrix[7] = d * (tmp_4 * this._matrix[0 * 4 + 0] + tmp_9 * this._matrix[1 * 4 + 0] + tmp_10 * this._matrix[2 * 4 + 0] - (tmp_5 * this._matrix[0 * 4 + 0] + tmp_8 * this._matrix[1 * 4 + 0] + tmp_11 * this._matrix[2 * 4 + 0]));
            newMatrix[8] = d * (tmp_12 * this._matrix[1 * 4 + 3] + tmp_15 * this._matrix[2 * 4 + 3] + tmp_16 * this._matrix[3 * 4 + 3] - (tmp_13 * this._matrix[1 * 4 + 3] + tmp_14 * this._matrix[2 * 4 + 3] + tmp_17 * this._matrix[3 * 4 + 3]));
            newMatrix[9] = d * (tmp_13 * this._matrix[0 * 4 + 3] + tmp_18 * this._matrix[2 * 4 + 3] + tmp_21 * this._matrix[3 * 4 + 3] - (tmp_12 * this._matrix[0 * 4 + 3] + tmp_19 * this._matrix[2 * 4 + 3] + tmp_20 * this._matrix[3 * 4 + 3]));
            newMatrix[10] = d * (tmp_14 * this._matrix[0 * 4 + 3] + tmp_19 * this._matrix[1 * 4 + 3] + tmp_22 * this._matrix[3 * 4 + 3] - (tmp_15 * this._matrix[0 * 4 + 3] + tmp_18 * this._matrix[1 * 4 + 3] + tmp_23 * this._matrix[3 * 4 + 3]));
            newMatrix[11] = d * (tmp_17 * this._matrix[0 * 4 + 3] + tmp_20 * this._matrix[1 * 4 + 3] + tmp_23 * this._matrix[2 * 4 + 3] - (tmp_16 * this._matrix[0 * 4 + 3] + tmp_21 * this._matrix[1 * 4 + 3] + tmp_22 * this._matrix[2 * 4 + 3]));
            newMatrix[12] = d * (tmp_14 * this._matrix[2 * 4 + 2] + tmp_17 * this._matrix[3 * 4 + 2] + tmp_13 * this._matrix[1 * 4 + 2] - (tmp_16 * this._matrix[3 * 4 + 2] + tmp_12 * this._matrix[1 * 4 + 2] + tmp_15 * this._matrix[2 * 4 + 2]));
            newMatrix[13] = d * (tmp_20 * this._matrix[3 * 4 + 2] + tmp_12 * this._matrix[0 * 4 + 2] + tmp_19 * this._matrix[2 * 4 + 2] - (tmp_18 * this._matrix[2 * 4 + 2] + tmp_21 * this._matrix[3 * 4 + 2] + tmp_13 * this._matrix[0 * 4 + 2]));
            newMatrix[14] = d * (tmp_18 * this._matrix[1 * 4 + 2] + tmp_23 * this._matrix[3 * 4 + 2] + tmp_15 * this._matrix[0 * 4 + 2] - (tmp_22 * this._matrix[3 * 4 + 2] + tmp_14 * this._matrix[0 * 4 + 2] + tmp_19 * this._matrix[1 * 4 + 2]));
            newMatrix[15] = d * (tmp_22 * this._matrix[2 * 4 + 2] + tmp_16 * this._matrix[0 * 4 + 2] + tmp_21 * this._matrix[1 * 4 + 2] - (tmp_20 * this._matrix[1 * 4 + 2] + tmp_23 * this._matrix[2 * 4 + 2] + tmp_17 * this._matrix[0 * 4 + 2]));

            this._matrix = newMatrix;

            return this._matrix;
        }

        /**
         * Multiples the current Matrix4 by another Matrix4
         * @param matrix4
         */

    }, {
        key: "multiply",
        value: function multiply(matrix4) {
            var a00 = this._matrix[0 * 4 + 0];
            var a01 = this._matrix[0 * 4 + 1];
            var a02 = this._matrix[0 * 4 + 2];
            var a03 = this._matrix[0 * 4 + 3];
            var a10 = this._matrix[1 * 4 + 0];
            var a11 = this._matrix[1 * 4 + 1];
            var a12 = this._matrix[1 * 4 + 2];
            var a13 = this._matrix[1 * 4 + 3];
            var a20 = this._matrix[2 * 4 + 0];
            var a21 = this._matrix[2 * 4 + 1];
            var a22 = this._matrix[2 * 4 + 2];
            var a23 = this._matrix[2 * 4 + 3];
            var a30 = this._matrix[3 * 4 + 0];
            var a31 = this._matrix[3 * 4 + 1];
            var a32 = this._matrix[3 * 4 + 2];
            var a33 = this._matrix[3 * 4 + 3];

            var b00 = matrix4[0 * 4 + 0];
            var b01 = matrix4[0 * 4 + 1];
            var b02 = matrix4[0 * 4 + 2];
            var b03 = matrix4[0 * 4 + 3];
            var b10 = matrix4[1 * 4 + 0];
            var b11 = matrix4[1 * 4 + 1];
            var b12 = matrix4[1 * 4 + 2];
            var b13 = matrix4[1 * 4 + 3];
            var b20 = matrix4[2 * 4 + 0];
            var b21 = matrix4[2 * 4 + 1];
            var b22 = matrix4[2 * 4 + 2];
            var b23 = matrix4[2 * 4 + 3];
            var b30 = matrix4[3 * 4 + 0];
            var b31 = matrix4[3 * 4 + 1];
            var b32 = matrix4[3 * 4 + 2];
            var b33 = matrix4[3 * 4 + 3];

            this._matrix[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
            this._matrix[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
            this._matrix[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
            this._matrix[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
            this._matrix[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
            this._matrix[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
            this._matrix[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
            this._matrix[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
            this._matrix[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
            this._matrix[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
            this._matrix[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
            this._matrix[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
            this._matrix[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
            this._matrix[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
            this._matrix[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
            this._matrix[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

            return this._matrix;
        }

        /**
         * Set Matrix identity
         * @returns {Float32Array}
         */

    }, {
        key: "identity",
        value: function identity() {
            this._matrix[0] = 1;
            this._matrix[1] = 0;
            this._matrix[2] = 0;
            this._matrix[3] = 0;
            this._matrix[4] = 0;
            this._matrix[5] = 1;
            this._matrix[6] = 0;
            this._matrix[7] = 0;
            this._matrix[8] = 0;
            this._matrix[9] = 0;
            this._matrix[10] = 1;
            this._matrix[11] = 0;
            this._matrix[12] = 0;
            this._matrix[13] = 0;
            this._matrix[14] = 0;
            this._matrix[15] = 1;

            return this._matrix;
        }

        /**
         *
         * @param left
         * @param right
         * @param bottom
         * @param top
         * @param near
         * @param far
         */

    }, {
        key: "orthographic",
        value: function orthographic(left, right, bottom, top, near, far) {
            this._matrix[0] = 2 / (right - left);
            this._matrix[1] = 0;
            this._matrix[2] = 0;
            this._matrix[3] = 0;
            this._matrix[4] = 0;
            this._matrix[5] = 2 / (top - bottom);
            this._matrix[6] = 0;
            this._matrix[7] = 0;
            this._matrix[8] = 0;
            this._matrix[9] = 0;
            this._matrix[10] = 1 / (near - far);
            this._matrix[11] = 0;
            this._matrix[12] = (left + right) / (left - right);
            this._matrix[13] = (bottom + top) / (bottom - top);
            this._matrix[14] = near / (near - far);
            this._matrix[15] = 1;

            return this._matrix;
        }

        /**
         * Rotates the matrix with the given array
         * @param axis
         * @param angle
         */

    }, {
        key: "rotate",
        value: function rotate(axis, angle) {
            var x = axis[0];
            var y = axis[1];
            var z = axis[2];
            var n = Math.sqrt(x * x + y * y + z * z);
            x /= n;
            y /= n;
            z /= n;

            var xx = x * x;
            var yy = y * y;
            var zz = z * z;
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var oneMinusCosine = 1 - c;

            var r00 = xx + (1 - xx) * c;
            var r01 = x * y * oneMinusCosine + z * s;
            var r02 = x * z * oneMinusCosine - y * s;
            var r10 = x * y * oneMinusCosine - z * s;
            var r11 = yy + (1 - yy) * c;
            var r12 = y * z * oneMinusCosine + x * s;
            var r20 = x * z * oneMinusCosine + y * s;
            var r21 = y * z * oneMinusCosine - x * s;
            var r22 = zz + (1 - zz) * c;

            var m00 = this._matrix[0 * 4 + 0];
            var m01 = this._matrix[0 * 4 + 1];
            var m02 = this._matrix[0 * 4 + 2];
            var m03 = this._matrix[0 * 4 + 3];
            var m10 = this._matrix[1 * 4 + 0];
            var m11 = this._matrix[1 * 4 + 1];
            var m12 = this._matrix[1 * 4 + 2];
            var m13 = this._matrix[1 * 4 + 3];
            var m20 = this._matrix[2 * 4 + 0];
            var m21 = this._matrix[2 * 4 + 1];
            var m22 = this._matrix[2 * 4 + 2];
            var m23 = this._matrix[2 * 4 + 3];

            this._matrix[0] = r00 * m00 + r01 * m10 + r02 * m20;
            this._matrix[1] = r00 * m01 + r01 * m11 + r02 * m21;
            this._matrix[2] = r00 * m02 + r01 * m12 + r02 * m22;
            this._matrix[3] = r00 * m03 + r01 * m13 + r02 * m23;
            this._matrix[4] = r10 * m00 + r11 * m10 + r12 * m20;
            this._matrix[5] = r10 * m01 + r11 * m11 + r12 * m21;
            this._matrix[6] = r10 * m02 + r11 * m12 + r12 * m22;
            this._matrix[7] = r10 * m03 + r11 * m13 + r12 * m23;
            this._matrix[8] = r20 * m00 + r21 * m10 + r22 * m20;
            this._matrix[9] = r20 * m01 + r21 * m11 + r22 * m21;
            this._matrix[10] = r20 * m02 + r21 * m12 + r22 * m22;
            this._matrix[11] = r20 * m03 + r21 * m13 + r22 * m23;

            return this._matrix;
        }

        /**
         * Scales the matrix with the given vector
         * @param {Array} vec [x, y, z]
         */

    }, {
        key: "scale",
        value: function scale(vec) {
            var v0 = vec[0];
            var v1 = vec[1];
            var v2 = vec[2];

            this._matrix[0] = v0 * this._matrix[0 * 4 + 0];
            this._matrix[1] = v0 * this._matrix[0 * 4 + 1];
            this._matrix[2] = v0 * this._matrix[0 * 4 + 2];
            this._matrix[3] = v0 * this._matrix[0 * 4 + 3];
            this._matrix[4] = v1 * this._matrix[1 * 4 + 0];
            this._matrix[5] = v1 * this._matrix[1 * 4 + 1];
            this._matrix[6] = v1 * this._matrix[1 * 4 + 2];
            this._matrix[7] = v1 * this._matrix[1 * 4 + 3];
            this._matrix[8] = v2 * this._matrix[2 * 4 + 0];
            this._matrix[9] = v2 * this._matrix[2 * 4 + 1];
            this._matrix[10] = v2 * this._matrix[2 * 4 + 2];
            this._matrix[11] = v2 * this._matrix[2 * 4 + 3];

            return this._matrix;
        }

        /**
         * Translates the matrix with the given vector
         * @param {Array} vec [x, y, z]
         */

    }, {
        key: "translate",
        value: function translate(vec) {
            var m00 = this._matrix[0 * 4 + 0];
            var m01 = this._matrix[0 * 4 + 1];
            var m02 = this._matrix[0 * 4 + 2];
            var m03 = this._matrix[0 * 4 + 3];
            var m10 = this._matrix[1 * 4 + 0];
            var m11 = this._matrix[1 * 4 + 1];
            var m12 = this._matrix[1 * 4 + 2];
            var m13 = this._matrix[1 * 4 + 3];
            var m20 = this._matrix[2 * 4 + 0];
            var m21 = this._matrix[2 * 4 + 1];
            var m22 = this._matrix[2 * 4 + 2];
            var m23 = this._matrix[2 * 4 + 3];
            var m30 = this._matrix[3 * 4 + 0];
            var m31 = this._matrix[3 * 4 + 1];
            var m32 = this._matrix[3 * 4 + 2];
            var m33 = this._matrix[3 * 4 + 3];
            var v0 = vec[0];
            var v1 = vec[1];
            var v2 = vec[2];

            this._matrix[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
            this._matrix[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
            this._matrix[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
            this._matrix[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

            return this._matrix;
        }
    }]);

    return Matrix4;
}();

;SetterDictionary.addRule("ray", ["origin", "direction"]);

/**
 * Ray Class (TODO: this class is not yet working!)
 */

var Ray = function () {

    //#region Constructors

    function Ray(origin, direction) {
        _classCallCheck(this, Ray);

        this.origin = 0;
        this.direction = 0;

        this.set(origin, direction);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Ray, [{
        key: "set",


        //#endregion

        value: function set(origin, direction) {
            this.origin = origin || 0;
            this.direction = direction || 0;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                origin: this.origin,
                direction: this.direction
            };
        }
    }, {
        key: "equals",
        value: function equals(obj) {
            return obj.origin === this.origin && obj.direction === this.direction;
        }
    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Ray(data.origin, data.direction);
        }
    }]);

    return Ray;
}();

;SetterDictionary.addRule("rectangle", ["x", "y", "width", "height"]);

/**
 * Rectangle class
 */

var Rectangle = function () {

    //#region Constructors

    function Rectangle(x, y, width, height) {
        _classCallCheck(this, Rectangle);

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.set(x, y, width, height);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Rectangle, [{
        key: "set",


        //#endregion

        value: function set(x, y, width, height) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 10;
            this.height = height || 10;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        }
    }, {
        key: "equals",
        value: function equals(obj) {
            return obj.x === this.x && obj.y === this.y && obj.width === this.width && obj.height === this.height;
        }
    }, {
        key: "unload",
        value: function unload() {}

        /**
         * Get the rectangle vertices based on the position and width/height
         * @returns {{topLeft: Vector2, topRight: Vector2, bottomRight: Vector2, bottomLeft: Vector2}}
         */

    }, {
        key: "getVertices",
        value: function getVertices() {
            return {
                topLeft: new Vector2(this.x, this.y),
                topRight: new Vector2(this.x + this.width, this.y),
                bottomRight: new Vector2(this.x + this.width, this.y + this.height),
                bottomLeft: new Vector2(this.x, this.y + this.height)
            };
        }

        /**
         * Checks if the rectangle is intersecting the given rectangle
         * @param {Rectangle} rectangle
         * @returns {boolean}
         */

    }, {
        key: "intersects",
        value: function intersects(rectangle) {
            return rectangle.x <= this.x + this.width && this.x <= rectangle.x + rectangle.width && rectangle.y <= this.y + this.height && this.y <= rectangle.y + rectangle.height;
        }

        /**
         * Checks if the given rectangle is contained by the instance
         * @param {Rectangle} rectangle
         */

    }, {
        key: "contains",
        value: function contains(rectangle) {
            return rectangle.x >= this.x && rectangle.x + rectangle.width <= this.x + this.width && rectangle.y >= this.y && rectangle.y + rectangle.height <= this.y + this.height;
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Rectangle(data.x, data.y, data.width, data.height);
        }
    }, {
        key: "fromVectors",
        value: function fromVectors(vectorA, vectorB) {
            var x = void 0,
                y = void 0,
                width = void 0,
                height = void 0;

            if (vectorA.x > vectorB.x) {
                x = vectorB.x;
                width = Math.abs(vectorA.x - vectorB.x);
            } else {
                x = vectorA.x;
                width = Math.abs(vectorB.x - vectorA.x);
            }

            if (vectorA.y > vectorB.y) {
                y = vectorB.y;
                height = Math.abs(vectorA.y - vectorB.y);
            } else {
                y = vectorA.y;
                height = Math.abs(vectorB.y - vectorA.y);
            }

            return new Rectangle(x, y, width, height);
        }
    }]);

    return Rectangle;
}();

;SetterDictionary.addRule("vector2", ["x", "y"]);

/**
 * Vector2 Class for bi dimensional point references
 */

var Vector2 = function () {

    //#region Constructors

    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        this.x = 0;
        this.y = 0;

        this.set(x, y);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Vector2, [{
        key: "set",


        //#endregion

        value: function set(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                x: this.x,
                y: this.y
            };
        }
    }, {
        key: "equals",
        value: function equals(obj) {
            return obj.x === this.x && obj.y === this.y;
        }
    }, {
        key: "unload",
        value: function unload() {}

        /**
         * The magnitude, or length, of this vector.
         * The magnitude is the L2 norm, or Euclidean distance between the origin and
         * the point represented by the (x, y) components of this Vector object.
         * @returns {number} the magnitude
         */

    }, {
        key: "magnitude",
        value: function magnitude() {
            return Math.sqrt(this.sqrMagnitude());
        }

        /**
         * The square of the magnitude, or length, of this vector.
         * See http://docs.unity3d.com/ScriptReference/Vector3-sqrMagnitude.html
         * @returns {number} the squared magnitude
         */

    }, {
        key: "sqrMagnitude",
        value: function sqrMagnitude() {
            return this.x * this.x + this.y * this.y;
        }
    }, {
        key: "normalLeft",
        value: function normalLeft() {
            return new Vector2(this.y, -1 * this.x);
        }
    }, {
        key: "normalRight",
        value: function normalRight() {
            return new Vector2(-1 * this.y, this.x);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            return Vector2.normalize(this);
        }

        /**
         * The dot product of this vector with another vector.
         * @param vector
         * @returns {number}
         */

    }, {
        key: "dot",
        value: function dot(vector) {
            return this.x * vector.x + this.y * vector.y;
        }

        /**
         * Calculates the magnitude of the vector that would result from a regular 3D cross product of the input vectors,
         * taking their Z values implicitly as 0 (i.e., treating the 2D space as a plane in the 3D space).
         * The 3D cross product will be perpendicular to that plane, and thus have 0 X & Y components
         * (thus the scalar returned is the Z value of the 3D cross product vector).
         * @param vector
         */

    }, {
        key: "cross",
        value: function cross(vector) {
            return this.x * vector.y - this.y * vector.x;
        }

        /**
         * The distance between the point represented by this Vector
         * object and a point represented by the given Vector object.
         * @param {Vector2} vector
         * @returns {number}
         */

    }, {
        key: "distanceTo",
        value: function distanceTo(vector) {
            return Vector2.distance(this, vector);
        }
    }, {
        key: "multiply",
        value: function multiply(vector) {
            return Vector2.multiply(this, vector);
        }
    }, {
        key: "subtract",
        value: function subtract(vector) {
            return Vector2.subtract(this, vector);
        }
    }, {
        key: "add",
        value: function add(vector) {
            return Vector2.add(this, vector);
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Vector2(data.x, data.y);
        }
    }, {
        key: "add",
        value: function add(vectorA, vectorB) {
            return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
        }
    }, {
        key: "subtract",
        value: function subtract(vectorA, vectorB) {
            return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
        }
    }, {
        key: "multiply",
        value: function multiply(vectorA, vectorB) {
            return new Vector2(vectorA.x * vectorB.x, vectorA.y * vectorB.y);
        }

        /**
         * Normalizes the given vector, returning it
         * @param {Vector2} vector
         * @returns {Vector2} the same vector, normalized
         */

    }, {
        key: "normalize",
        value: function normalize(vector) {
            var val = 1.0 / vector.magnitude();
            vector.x *= val;
            vector.y *= val;

            return vector;
        }

        /**
         * The distance between the points represented by VectorA and VectorB
         * @param {Vector2} vectorA
         * @param {Vector2} vectorB
         * @returns {number} the distance
         */

    }, {
        key: "distance",
        value: function distance(vectorA, vectorB) {
            return Math.sqrt(Vector2.sqrDistance(vectorA, vectorB));
        }

        /**
         * The squared distance between the points represented by VectorA and VectorB
         * @param {Vector2} vectorA
         * @param {Vector2} vectorB
         * @returns {number} the squared distance
         */

    }, {
        key: "sqrDistance",
        value: function sqrDistance(vectorA, vectorB) {
            var v1 = vectorA.x - vectorB.x;
            var v2 = vectorA.y - vectorB.y;
            return v1 * v1 + v2 * v2;
        }
    }, {
        key: "transformMat4",
        value: function transformMat4(vec2, mat) {
            return new Vector2(mat[0] * vec2.x + mat[4] * vec2.y + mat[12], mat[1] * vec2.x + mat[5] * vec2.y + mat[13]);
        }
    }, {
        key: "transformMat3",
        value: function transformMat3(vec2, mat) {
            return new Vector2(mat[0] * vec2.x + mat[3] * vec2.y + mat[6], mat[1] * vec2.x + mat[4] * vec2.y + mat[7]);
        }
    }]);

    return Vector2;
}();

;SetterDictionary.addRule("vector3", ["x", "y", "z"]);

/**
 * Vector3 Class for tri dimensional point references
 */

var Vector3 = function () {

    //#region Constructors

    function Vector3(x, y, z) {
        _classCallCheck(this, Vector3);

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.set(x, y, z);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Vector3, [{
        key: "set",


        //#endregion

        value: function set(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            };
        }
    }, {
        key: "equals",
        value: function equals(obj) {
            return obj.x === this.x && obj.y === this.y && obj.z === this.z;
        }
    }, {
        key: "unload",
        value: function unload() {}

        /**
         * The magnitude, or length, of this vector.
         * The magnitude is the L2 norm, or Euclidean distance between the origin and
         * the point represented by the (x, y, z) components of this Vector object.
         * @returns {number}
         */

    }, {
        key: "magnitude",
        value: function magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**
         * The square of the magnitude, or length, of this vector.
         * See http://docs.unity3d.com/ScriptReference/Vector3-sqrMagnitude.html
         * @returns {number}
         */

    }, {
        key: "sqrMagnitude",
        value: function sqrMagnitude() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
         * The distance between the point represented by this Vector
         * object and a point represented by the given Vector object.
         * @param {Vector3} vector
         * @returns {number}
         */

    }, {
        key: "distanceTo",
        value: function distanceTo(vector) {
            return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y) + (this.z - vector.z) * (this.z - vector.z));
        }

        /**
         * The dot product of this vector with another vector.
         * @param {Vector3} vector
         * @returns {number}
         */

    }, {
        key: "dot",
        value: function dot(vector) {
            return this.x * vector.x + this.y * vector.y + this.z * vector.z;
        }

        /**
         * The cross product of this vector and the given vector.
         *
         * The cross product is a vector orthogonal to both original vectors.
         * It has a magnitude equal to the area of a parallelogram having the
         * two vectors as sides. The direction of the returned vector is
         * determined by the right-hand rule.
         * @param {Vector3} vector
         */

    }, {
        key: "cross",
        value: function cross(vector) {
            return new Vector3(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Vector3(data.x, data.y, data.z);
        }
    }]);

    return Vector3;
}();

;SetterDictionary.addRule("vector4", ["x", "y", "z", "w"]);

/**
 * Vector4 Class for tri dimensional point references
 */

var Vector4 = function () {

    //#region Constructors

    function Vector4(x, y, z, w) {
        _classCallCheck(this, Vector4);

        // just because they 'should' be declared here
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;

        this.set(x, y, z, w);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Vector4, [{
        key: "set",


        //#endregion

        value: function set(x, y, z, w) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
                w: this.w
            };
        }
    }, {
        key: "equals",
        value: function equals(obj) {
            return obj.x === this.x && obj.y === this.y && obj.z === this.z && obj.w === this.w;
        }
    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Vector4(data.x, data.y, data.z, data.w);
        }
    }]);

    return Vector4;
}();

; /**
  *    RigidBody Class
  */

var RigidBody = function () {

    //#region Constructors

    /**
     *
     * @param params
     */
    function RigidBody(params) {
        _classCallCheck(this, RigidBody);

        params = params || {};

        // public properties
        this.gameObject = null;

        // private properties
        this._isStatic = params.static || false;
        this._mass = params.mass || null;
        this._friction = params.friction || null;
        this._body = null;
    }

    //#endregion

    //#region Public Methods

    //#region Static Methods

    //#endregion

    _createClass(RigidBody, [{
        key: "setMass",
        value: function setMass(mass) {
            this._mass = mass;
            Matter.Body.setMass(this._body, this._mass);
        }
    }, {
        key: "getMass",
        value: function getMass() {
            return this.mass;
        }
    }, {
        key: "setGameObject",
        value: function setGameObject(gameObject) {
            this._sync();
        }
    }, {
        key: "onGameObjectDetach",
        value: function onGameObjectDetach() {
            this.gameObject.transform.clearPositionGetter();
            this.gameObject.transform.clearScaleGetter();
            this.gameObject.transform.clearRotationGetter();
        }
    }, {
        key: "onGameObjectPositionUpdated",
        value: function onGameObjectPositionUpdated(value) {
            if (isObjectAssigned(this._body)) {
                Matter.Body.setPosition(this._body, value);
            }
        }
    }, {
        key: "onGameObjectRotationUpdated",
        value: function onGameObjectRotationUpdated(value) {
            if (isObjectAssigned(this._body)) {
                Matter.Body.setAngle(this._body, value);
            }
        }
    }, {
        key: "onGameObjectScaleUpdated",
        value: function onGameObjectScaleUpdated(value) {
            if (isObjectAssigned(this._body)) {
                Matter.Body.scale(this._body, value.x, value.y);
            }
        }
    }, {
        key: "unload",
        value: function unload() {}
        // TODO: do this


        //#endregion

        //#region Private Methods

    }, {
        key: "_sync",
        value: function _sync() {
            var self = this;

            if (!isObjectAssigned(this.gameObject)) {
                return;
            }

            if (!isObjectAssigned(this._body)) {
                var pos = this.gameObject.transform.getPosition();

                // TODO assign the body based on the object
                var width = 1;
                var height = 1;

                if (isSprite(this.gameObject)) {
                    width = this.gameObject.getTexture().getWidth();
                    height = this.gameObject.getTexture().getHeight();
                }

                this._body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
                    isStatic: this._isStatic
                });

                Matter.World.add(GameManager.activeScene.getPhysicsWorld(), [this._body]);

                var objScale = this.gameObject.transform.getScale();
                Matter.Body.scale(this._body, objScale.x, objScale.y);

                this.gameObject.transform.overridePositionGetter(function () {
                    return {
                        x: self._body.position.x,
                        y: self._body.position.y
                    };
                });

                this.gameObject.transform.overrideRotationGetter(function () {
                    return self._body.angle;
                });
            }

            if (isObjectAssigned(this._mass)) {
                Matter.Body.setMass(this._body, this._mass);
            }

            if (isObjectAssigned(this._friction)) {
                this._body.friction = this._friction;
            }
        }

        //#endregion

    }]);

    return RigidBody;
}();

; /**
  * Content Object Class
  */

var ContentObject =

//#region Constructors

/**
 * @param params
 * @constructor
 */
function ContentObject(params) {
    _classCallCheck(this, ContentObject);
}

//#endregion

//#region Methods

//#endregion

;

; /**
  * Project File class
  */

var ProjectFile = function () {

    //#region Constructors

    /**
     *
     * @param params
     * @constructor
     */
    function ProjectFile(params) {
        _classCallCheck(this, ProjectFile);

        params = params || {};

        this.name = params.name || "New Project";
        this.settings = params.settings || {};
        this.editor = params.editor || {
            lastScene: null,
            layout: null
        };
        this.content = params.content || {};
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param data
     * @returns {ProjectFile}
     */


    _createClass(ProjectFile, null, [{
        key: "restore",
        value: function restore(data) {
            return new ProjectFile(data);
        }

        //#endregion

        //#endregion

    }]);

    return ProjectFile;
}();

; /**
  * Content Texture Atlas Class
  */

var TextureAtlas = function () {

    //#region Constructors

    /**
     * @param params
     * @constructor
     */
    function TextureAtlas(params) {
        _classCallCheck(this, TextureAtlas);

        params = params || {};

        // public properties:
        this.sourcePath = params.sourcePath || ""; // should be a relative path
        this.mapping = [];
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(TextureAtlas, [{
        key: "objectify",


        //#endregion

        value: function objectify() {
            return {
                sourcePath: this.sourcePath
            };
        }
    }, {
        key: "getType",
        value: function getType() {
            return "TextureAtlas";
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new TextureAtlas({
                sourcePath: data.sourcePath
            });
        }
    }]);

    return TextureAtlas;
}();

; /**
  * Camera2D class
  */

var Camera2D = function () {

    //#region Constructors

    /**
     *
     * @param x
     * @param y
     * @param viewWidth
     * @param viewHeight
     * @param zoom
     */
    function Camera2D(x, y, viewWidth, viewHeight, zoom) {
        _classCallCheck(this, Camera2D);

        // public properties:
        this.x = x || 0;
        this.y = y || 0;
        this.zoom = zoom || 1.0;
        this.viewWidth = viewWidth || 0;
        this.viewHeight = viewHeight || 0;

        // private properties:
        this._lastX = null;
        this._lastY = null;
        this._lastZoom = null;
        this._matrix = new Matrix4();
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param data
     * @returns {Camera2D}
     */


    _createClass(Camera2D, [{
        key: "calculateMatrix",


        //#endregion

        /**
         *
         * @returns {Float32Array}
         */
        value: function calculateMatrix() {
            // generate orthographic perspective:
            this._matrix.orthographic(this.x + -this.viewWidth * this.zoom / 2.0, this.x + this.viewWidth * this.zoom / 2.0, this.y + this.viewHeight * this.zoom / 2.0, this.y + -this.viewHeight * this.zoom / 2.0, 0.0, 1.0);

            this._lastX = this.x;
            this._lastY = this.y;
            this._lastZoom = this.zoom;

            return this._matrix.asArray();
        }

        /**
         *
         * @param viewWidth
         * @param viewHeight
         */

    }, {
        key: "setViewSize",
        value: function setViewSize(viewWidth, viewHeight) {
            this.viewWidth = viewWidth;
            this.viewHeight = viewHeight;

            // force the camera calculations
            this.calculateMatrix();
        }

        /**
         *
         * @returns {*|number}
         */

    }, {
        key: "getViewWidth",
        value: function getViewWidth() {
            return this.viewWidth;
        }

        /**
         *
         * @returns {*|number}
         */

    }, {
        key: "getViewHeight",
        value: function getViewHeight() {
            return this.viewHeight;
        }

        /**
         *
         * @returns {Float32Array}
         */

    }, {
        key: "getMatrix",
        value: function getMatrix() {
            // needs to have a new calculation?
            if (this.x != this._lastX || this.y != this._lastY || this._lastZoom != this.zoom) {
                return this.calculateMatrix();
            }

            return this._matrix.asArray();
        }

        /**
         *
         * @param screenX
         * @param screenY
         */

    }, {
        key: "screenToWorldCoordinates",
        value: function screenToWorldCoordinates(screenX, screenY) {
            // first we normalize the screen position:
            var x = 2.0 * screenX / this.viewWidth - 1.0;
            var y = 1.0 - 2.0 * screenY / this.viewHeight;

            // then we calculate and return the world coordinates:
            return Vector2.transformMat4(new Vector2(x, y), new Matrix4(this.getMatrix()).invert());
        }

        /**
         *
         */

    }, {
        key: "unload",
        value: function unload() {}

        /**
         *
         * @returns {{x: (*|number), y: (*|number), zoom: (*|number)}}
         */

    }, {
        key: "objectify",
        value: function objectify() {
            return {
                x: this.x,
                y: this.y,
                zoom: this.zoom
            };
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Camera2D(data.x, data.y, data.viewWidth, data.viewHeight, data.zoom);
        }
    }]);

    return Camera2D;
}();

;SetterDictionary.addRule("color", ["r", "g", "b", "a"]);

/**
 * Color Class
 */

var Color = function () {
    _createClass(Color, null, [{
        key: "CornflowerBlue",


        //#region Static Properties

        get: function get() {
            return Color.fromRGB(100.0, 149.0, 237.0);
        }
    }, {
        key: "Scarlet",
        get: function get() {
            return Color.fromRGB(255.0, 36.0, 0.0);
        }
    }, {
        key: "Red",
        get: function get() {
            return Color.fromRGB(255.0, 0.0, 0.0);
        }
    }, {
        key: "Green",
        get: function get() {
            return Color.fromRGB(0.0, 255.0, 0.0);
        }
    }, {
        key: "Blue",
        get: function get() {
            return Color.fromRGB(0.0, 0.0, 255.0);
        }
    }, {
        key: "White",
        get: function get() {
            return Color.fromRGB(255.0, 255.0, 255.0);
        }
    }, {
        key: "Black",
        get: function get() {
            return Color.fromRGB(0.0, 0.0, 0.0);
        }
    }, {
        key: "Gray",
        get: function get() {
            return Color.fromRGB(80.0, 80.0, 80.0);
        }
    }, {
        key: "Nephritis",
        get: function get() {
            return Color.fromRGB(39.0, 174.0, 96.0);
        }
    }, {
        key: "Wisteria",
        get: function get() {
            return Color.fromRGB(142.0, 68.0, 173.0);
        }
    }, {
        key: "Amethyst",
        get: function get() {
            return Color.fromRGB(155.0, 89.0, 182.0);
        }
    }, {
        key: "Carrot",
        get: function get() {
            return Color.fromRGB(230, 126, 34);
        }
    }, {
        key: "Pumpkin",
        get: function get() {
            return Color.fromRGB(211, 84, 0);
        }
    }, {
        key: "Orange",
        get: function get() {
            return Color.fromRGB(243, 156, 18);
        }
    }, {
        key: "SunFlower",
        get: function get() {
            return Color.fromRGB(241, 196, 15);
        }
    }, {
        key: "Alizarin",
        get: function get() {
            return Color.fromRGB(231, 76, 60);
        }

        //#endregion

        //#region Constructors

        /**
         * Sets Colors' values using either default ([0-1] or RGBA ([0-255] and alpha as [0-1]) format
         * @param {number} r red value ([0-1] vs [0-255])
         * @param {number} g green value ([0-1] vs [0-255])
         * @param {number} b blue value ([0-1] vs [0-255])
         * @param {number} a alpha value ([0-1])
         * @param {boolean} asRGBA whether it should consider the first 3 arguments to be in RGBA format
         * @constructor
         */

    }]);

    function Color(r, g, b, a, asRGBA) {
        _classCallCheck(this, Color);

        // default values (public)
        this.r = 0.0;
        this.g = 0.0;
        this.b = 0.0;
        this.a = 1.0;

        // set the properties with the given values
        this.setSpecial(r, g, b, a, asRGBA);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param data
     */


    _createClass(Color, [{
        key: "clone",


        //#endregion

        //#region Public Methods

        /**
         * Clones the color object, returning a copy of it
         * @returns {Color} copy of the color
         */
        value: function clone() {
            return new Color(this.r, this.g, this.b, this.a, false);
        }

        /**
         * Sets Colors' values using either default ([0-1] or RGBA ([0-255] and alpha as [0-1]) format
         * @param {number} r red value ([0-1] vs [0-255])
         * @param {number} g green value ([0-1] vs [0-255])
         * @param {number} b blue value ([0-1] vs [0-255])
         * @param {number} a alpha value ([0-1])
         * @param {boolean} asRGBA whether it should consider the first 3 arguments to be in RGBA format
         */

    }, {
        key: "setSpecial",
        value: function setSpecial(r, g, b, a, asRGBA) {

            // default values
            var currentColor = this;
            var maxRange = 1.0;

            // change current color and max range if chosen format is set to RGBA
            if (asRGBA === true) {
                currentColor = this.toRGBA();
                maxRange = 255.0;
            }

            // validate type and fall back to current color when needed
            r = isNumber(r) ? r : currentColor.r;
            g = isNumber(g) ? g : currentColor.g;
            b = isNumber(b) ? b : currentColor.b;
            a = isNumber(a) ? a : currentColor.a;

            // make sure the values are in the range
            this.r = MathHelper.clamp(r, 0.0, maxRange) / maxRange;
            this.g = MathHelper.clamp(g, 0.0, maxRange) / maxRange;
            this.b = MathHelper.clamp(b, 0.0, maxRange) / maxRange;
            this.a = MathHelper.clamp(a, 0.0, 1.0);
        }

        /**
         * Sets Colors' values using default format ([0-1], [0-1], [0-1], [0-1])
         * @param {number} r red value [0-1]
         * @param {number} g green value [0-1]
         * @param {number} b blue value [0-1]
         * @param {number} a alpha value [0-1]
         */

    }, {
        key: "set",
        value: function set(r, g, b, a) {
            this.setSpecial(r, g, b, a, false);
        }

        /**
         * Sets Colors' values using a RGBA format ([0-255], [0-255], [0-255], [0-1] format)
         * @param {number} r red value [0-255]
         * @param {number} g green value [0-255]
         * @param {number} b blue value [0-255]
         * @param {number} a alpha value [0-1]
         */

    }, {
        key: "setAsRGBA",
        value: function setAsRGBA(r, g, b, a) {
            this.setSpecial(r, g, b, a, true);
        }

        /**
         * Compares the color object ignoring the alpha color
         * @param {{r: number, g: number, b: number}} obj an object with red, green and blue values
         * @returns {boolean|null} whether the objects are equal or null if an invalid argument was provided
         */

    }, {
        key: "equalsIgnoreAlpha",
        value: function equalsIgnoreAlpha(obj) {

            // validate argument before testing
            if (!isNumber(obj.r) || !isNumber(obj.g) || !isNumber(obj.b)) {
                return null;
            }

            return obj.r === this.r && obj.g === this.g && obj.b === this.b;
        }

        /**
         * Compares the color object
         * @param {{r: number, g: number, b: number, a: number}} obj an object with red, green, blue and alpha values
         * @returns {boolean|null} whether the objects are equal or null if an invalid argument was provided
         */

    }, {
        key: "equals",
        value: function equals(obj) {

            // validate argument before testing
            if (!isNumber(obj.a)) {
                return null;
            }

            return this.equalsIgnoreAlpha(obj) && obj.a === this.a;
        }

        /**
         *
         */

    }, {
        key: "objectify",
        value: function objectify() {
            return {
                r: this.r,
                g: this.g,
                b: this.b,
                a: this.a
            };
        }

        /**
         * Converts Color format ([0-1], [0-1], [0-1], [0-1]) back to RGBA ([0-255], [0-255], [0-255], [0-1])
         * @returns {{r: number, g: number, b: number, a: number}} object with color in rgba format
         */

    }, {
        key: "toRGBA",
        value: function toRGBA() {
            return {
                r: this.r * 255,
                g: this.g * 255,
                b: this.b * 255,
                a: this.a
            };
        }

        /**
         * Converts the color to hexadecimal format, returning it
         * @returns {string} hexadecimal string
         */

    }, {
        key: "toHex",
        value: function toHex() {
            // convert back to RGBA format
            var rgba = this.toRGBA();
            // convert to Hex
            return Color.rgbToHex(rgba.r, rgba.g, rgba.b);
        }

        /**
         * Converts the color to an array, returning it
         * @returns {Array} array containing rgba values [r,g,b,a]
         */

    }, {
        key: "toArray",
        value: function toArray() {
            return [this.r, this.g, this.b, this.a];
        }

        /**
         * Converts the color to a Float32Array, returning it
         * @returns {Float32Array} array containing rgba values [r,g,b,a]
         */

    }, {
        key: "toFloat32Array",
        value: function toFloat32Array() {
            return new Float32Array([this.r, this.g, this.b, this.a]);
        }

        /**
         *
         */

    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Color(data.r, data.g, data.b, data.a, false);
        }

        /**
         * Attempts to create and retrieve a Color object given RGBA values
         * @param {number} red red value [0-255]
         * @param {number} green red value [0-255]
         * @param {number} blue red value [0-255]
         * @param {number} alpha red value [0-1]
         * @returns {Color|null} Color object if valid or null if invalid
         */

    }, {
        key: "fromRGBA",
        value: function fromRGBA(red, green, blue, alpha) {

            // no need to go further if arguments are invalid
            if (!isNumber(red) || !isNumber(green) || !isNumber(blue) || !isNumber(alpha)) {
                return null;
            }

            return new Color(red, green, blue, alpha, true);
        }

        /**
         * Attempts to create and retrieve a Color object given a hexadecimal value
         * @param {string} hex hexadecimal color
         * @returns {Color|null} Color object if valid or null if invalid
         */

    }, {
        key: "fromHex",
        value: function fromHex(hex) {

            // no need to go further if argument is invalid
            if (!isString(hex)) {
                return null;
            }

            // convert to RGBA
            var rgba = Color.hexToRGBA(hex);

            if (!rgba) {
                return null;
            }

            return Color.fromRGBA(rgba.r, rgba.g, rgba.b, rgba.a);
        }
    }, {
        key: "fromRGB",
        value: function fromRGB(red, green, blue) {
            return Color.fromRGBA(red, green, blue, 1.0);
        }
    }, {
        key: "random",
        value: function random(alpha) {
            alpha = !isNumber(alpha) ? 1.0 : alpha;
            return Color.fromRGBA(Math.random() * 255, Math.random() * 255, Math.random() * 255, alpha);
        }

        /*
         Based on http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
         */

        /**
         * Attempts to convert the given red, green and blue values to hexadecimal format
         * @param {number} r red value [0-255]
         * @param {number} g green value [0-255]
         * @param {number} b blue value [0-255]
         * @returns {string} hexadecimal string or an empty string if invalid arguments were provided
         */

    }, {
        key: "rgbToHex",
        value: function rgbToHex(r, g, b) {

            if (!isNumber(r) || !isNumber(g) || !isNumber(b)) {
                return "";
            }

            r = MathHelper.clamp(r, 0, 255);
            g = MathHelper.clamp(g, 0, 255);
            b = MathHelper.clamp(b, 0, 255);

            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        /**
         * Converts the given hexadecimal string to RGBA format ([0-255], [0-255], [0-255], [0-1])
         * @param {string} hex hexadecimal string
         * @returns {{r: number, g: number, b: number, a: number}|null} an object with rgba values or null if invalid
         */

    }, {
        key: "hexToRGBA",
        value: function hexToRGBA(hex) {
            // Expand shorthand form (e.g. "03F", "03F8" to full form (e.g. "0033FF", "0033FF88")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d]?)$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b, a) {
                return r + r + g + g + b + b + a + a;
            });

            // the last 2 digits (referent to alpha) are optional
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                // convert value to 0-1
                a: result[4] != 'undefined' ? parseInt(result[4], 16) / 255 : 1
            } : null;
        }
    }]);

    return Color;
}();

; /**
  * Created by Luis on 08/02/2017.
  */

/**
 * FontStyle Class
 */

var FontStyle = function () {

    //#region Constructors

    /**
     * @param fontDescription
     * @constructor
     */
    function FontStyle(fontDescription) {
        _classCallCheck(this, FontStyle);

        this._fontDescription = fontDescription;
        this._fontSize = 70;
        this._letterSpacing = 0;
        this._spread = 4;
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(FontStyle, [{
        key: "getFontDescription",


        //#endregion

        //#region Public Methods

        value: function getFontDescription() {
            return this._fontDescription;
        }
    }, {
        key: "setFontDescription",
        value: function setFontDescription(fontInfo) {

            // don't go further if fontInfo is invalid
            if (!isObjectAssigned(fontInfo)) {
                throw new Error("fontInfo needs to be valid.");
            }

            // TODO: make sure fontInfo follows bmfont format!

            return this._fontDescription = fontInfo;
        }
    }, {
        key: "getFontSize",
        value: function getFontSize() {
            return this._fontSize;
        }
    }, {
        key: "setFontSize",
        value: function setFontSize(size) {
            this._fontSize = size;
        }

        /**
         * Retrieves font style scale based on font size and font's description info size
         * @returns {number|null} font style scale or null if invalid
         */

    }, {
        key: "getScale",
        value: function getScale() {

            var metricsSize = this.getFontDescription().info.size;

            // TODO: possibly validated in setFontInfo instead?
            if (!metricsSize) {
                return null;
            }

            // calculate scale between generated font's size and the desired (font) size of the text
            var scale = this.getFontSize() / metricsSize;

            if (!scale || scale <= 0) {
                return null;
            }

            return scale;
        }
    }, {
        key: "getLetterSpacing",
        value: function getLetterSpacing() {
            return this._letterSpacing;
        }
    }, {
        key: "setLetterSpacing",
        value: function setLetterSpacing(spacing) {
            this._letterSpacing = spacing;
        }
    }, {
        key: "getSpread",
        value: function getSpread() {
            return this._spread;
        }
    }, {
        key: "setSpread",
        value: function setSpread(spread) {
            this._spread = spread;
        }

        /**
         *
         * @param {string} char character whose correspondent (font) ID is to be found (different from ascii code!)
         * @returns {number|null} font's character's ID or null if invalid
         * @public
         */

    }, {
        key: "findCharID",
        value: function findCharID(char) {

            var fontDescriptionChars = this.getFontDescription().chars;

            // make sure the parameter is valid
            if (!char || !fontDescriptionChars || fontDescriptionChars.length == 0) {
                return null;
            }
            // retrieve character's ascii code
            var charCode = char.charCodeAt(0);

            // if code is invalid, no need to go further
            if (!charCode) {
                return null;
            }

            // go through every character
            for (var i = 0; i < fontDescriptionChars.length; i++) {
                // store glyphID (Ascii Code)
                var glyphID = fontDescriptionChars[i].id;

                // skip if invalid
                if (!glyphID) {
                    continue;
                }

                // if that's the code we are looking for
                if (glyphID === charCode) {
                    // return the iteration number (the position of that character inside the array of characters)
                    return i;
                }
            }
            return null;
        }

        /**
         * Retrieves Kerning value between the given characters
         * @param {number} firstCharCode first character ascii code
         * @param {number} secondCharCode second character ascii code
         * @returns {number} kerning value or 0 if not found
         * @public
         */

    }, {
        key: "getKerning",
        value: function getKerning(firstCharCode, secondCharCode) {

            var fontDescriptionKernings = this.getFontDescription().kernings;

            if (!firstCharCode || !secondCharCode || !fontDescriptionKernings || !fontDescriptionKernings.length || fontDescriptionKernings.length === 0) {
                return 0;
            }

            // iterate through the kernings
            for (var i = 0; i < fontDescriptionKernings.length; i++) {
                var kern = fontDescriptionKernings[i];

                // skip if table is invalid
                if (!kern || !kern.first || !kern.second) {
                    continue;
                }

                // if there is a match
                if (kern.first === firstCharCode && kern.second === secondCharCode)
                    // return kerning
                    return kern.amount;
            }

            // return 0 if there is no match
            return 0;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                fontDescription: this.getFontDescription(),
                fontSize: this.getFontSize(),
                letterSpacing: this.getLetterSpacing(),
                spread: this.getSpread()
            };
        }

        //#endregion

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            var fontStyle = new FontStyle(data.fontDescription);

            fontStyle.setSpread(data.spread);
            fontStyle.setFontSize(data.fontSize);
            fontStyle.setLetterSpacing(data.letterSpacing);

            return fontStyle;
        }
    }]);

    return FontStyle;
}();

; /**
  * GameScene Class
  */

var Game = function () {

    //#region Constructors

    function Game(params) {
        _classCallCheck(this, Game);

        params = params || {};

        var DEFAULT_VIRTUAL_WIDTH = 800;
        var DEFAULT_VIRTUAL_HEIGHT = 640;

        // public properties:


        // private properties:
        this._renderContext = null;
        this._logger = new Logger("Game");
        this._initialized = false;
        this._gameScene = params.scene;
        this._totalElapsedTime = null;
        this._virtualResolution = null;
        this._shaderManager = null;
        this._executionPhase = SC.EXECUTION_PHASES.WAITING;
        this._physicsEngine = Matter.Engine.create();
        this._physicsEngine.enableSleeping = true;
        this._renderExtensions = {};
        this._paused = false;
        this._swapScene = null; // used to contain a temporary scene before swapping
        this._swappingScenes = false;
        this._inputHandlersBinded = false;

        Matter.Engine.run(this._physicsEngine);

        // set the default virtual resolution
        this.setVirtualResolution(DEFAULT_VIRTUAL_WIDTH, DEFAULT_VIRTUAL_HEIGHT);

        // the target container is defined?
        if (isString(params.target)) {
            this.setTarget(params.target);
        }
    }

    //#endregion

    //#region Public Methods

    /**
     *
     * @param name
     * @param extension
     */


    _createClass(Game, [{
        key: "addRenderExtension",
        value: function addRenderExtension(name, extension) {
            this._renderExtensions[name] = extension;
        }

        /**
         *
         * @param name
         */

    }, {
        key: "removeRenderExtension",
        value: function removeRenderExtension(name) {
            delete this._renderExtensions[name];
        }

        /**
         *
         */

    }, {
        key: "clearRenderExtensions",
        value: function clearRenderExtensions() {
            this._renderExtensions = [];
        }

        /**
         *
         * @returns {engine|*}
         */

    }, {
        key: "getPhysicsEngine",
        value: function getPhysicsEngine() {
            return this._physicsEngine;
        }
    }, {
        key: "pauseGame",
        value: function pauseGame() {
            this._paused = true;
        }
    }, {
        key: "resumeGame",
        value: function resumeGame() {
            this._paused = false;
        }
    }, {
        key: "getShaderManager",
        value: function getShaderManager() {
            return this._shaderManager;
        }
    }, {
        key: "getActiveCamera",
        value: function getActiveCamera() {
            return this._gameScene ? this._gameScene.getCamera() : null;
        }
    }, {
        key: "getExecutionPhase",
        value: function getExecutionPhase() {
            return this._executionPhase;
        }
    }, {
        key: "init",
        value: function init(params) {
            params = params || {};

            // context initialization
            if (!isObjectAssigned(this._canvas)) {
                this._logger.warn("Cannot initialize game, the render display target was not provided or is invalid.");
                return;
            }

            // request to begin the animation frame handling
            this._onAnimationFrame(0);

            // set this as the active game:
            GameManager.activeGame = this;

            if (!params.ignoreInputHandler) {
                this._bindInputHandlers();
            }

            this._initalized = true;
        }

        /**
         * Set this as the active game
         */

    }, {
        key: "setActive",
        value: function setActive() {
            GameManager.activeGame = this;
        }
    }, {
        key: "setVirtualResolution",
        value: function setVirtualResolution(width, height) {
            this._virtualResolution = {
                width: width,
                height: height
            };

            if (isObjectAssigned(this._renderContext)) {
                this._renderContext.setVirtualResolution(width, height);

                // update camera view size:
                this.getActiveCamera().setViewSize(width, height);
            }
        }
    }, {
        key: "refreshVirtualResolution",
        value: function refreshVirtualResolution() {
            this._renderContext.setVirtualResolution(this._virtualResolution.width, this._virtualResolution.height);

            var camera = this.getActiveCamera();
            if (camera) {
                camera.setViewSize(this._virtualResolution.width, this._virtualResolution.height);
            }
        }
    }, {
        key: "getVirtualResolution",
        value: function getVirtualResolution() {
            return this._virtualResolution;
        }
    }, {
        key: "getRenderContext",
        value: function getRenderContext() {
            return this._renderContext;
        }
    }, {
        key: "setTarget",
        value: function setTarget(target) {
            this._canvas = isString(target) ? document.getElementById(target) : null;

            if (isObjectAssigned(this._canvas)) {
                // OPTIONAL: for now there is only WebGL Context, add more if needed:
                // assign the render context..
                this._renderContext = new WebGLContext({
                    renderContainer: this._canvas
                });

                // setting the global active render as the one selected for this game:
                GameManager.renderContext = this._renderContext;
                this._shaderManager = new ShaderManager(this);

                this.refreshVirtualResolution();
            }
        }
    }, {
        key: "changeScene",
        value: function changeScene(scene) {
            if (!isGameScene(scene)) {
                return;
            }

            // is it safe to swap scenes now?
            if (this._executionPhase == SC.EXECUTION_PHASES.WAITING) {
                // flag the swapping state
                this._swappingScenes = true;

                if (this._gameScene) {
                    // unload the active scene:
                    this._gameScene.unload();
                }

                this._gameScene = scene;
                this._gameScene.setGame(this);

                GameManager.activeScene = scene;
                this.refreshVirtualResolution();

                // the user defined the game scene initialize function?
                if (isFunction(this._gameScene.initialize)) {
                    // call user defined update function:
                    this._gameScene.initialize();
                }

                this._swappingScenes = false;
            } else {
                // nope, store this scene to change in the next animation frame start
                this._swapScene = scene;
            }
        }
    }, {
        key: "getTotalElapsedTime",
        value: function getTotalElapsedTime() {
            return this._totalElapsedTime;
        }
    }, {
        key: "unload",
        value: function unload() {
            if (this._inputHandlersBinded) {
                this._unbindInputHandlers();
            }
        }

        //#endregion

        //#region Private Methods

        /**
         *
         * @private
         */

    }, {
        key: "_bindInputHandlers",
        value: function _bindInputHandlers() {
            window.addEventListener('keyup', this._keyUpListener.bind(this), false);
            window.addEventListener('keydown', this._keyDownListener.bind(this), false);
            this._inputHandlersBinded = true;
        }

        /**
         *
         * @private
         */

    }, {
        key: "_unbindInputHandlers",
        value: function _unbindInputHandlers() {
            window.removeEventListener('keyup', this._keyUpListener.bind(this), false);
            window.removeEventListener('keydown', this._keyDownListener.bind(this), false);
            this._inputHandlersBinded = false;
        }

        /**
         *
         * @param e
         * @private
         */

    }, {
        key: "_keyUpListener",
        value: function _keyUpListener(e) {
            var keys = [e.keyCode];

            if (e.ctrlKey) {
                keys.push(Keys.Ctrl);
            }

            if (e.shiftKey) {
                keys.push(Keys.Shift);
            }

            // update the keyboard data:
            Keyboard.instance.removeKeys(keys);
        }

        /**
         *
         * @param e
         * @private
         */

    }, {
        key: "_keyDownListener",
        value: function _keyDownListener(e) {
            var keys = [e.keyCode];

            if (e.ctrlKey) {
                keys.push(Keys.Ctrl);
            }

            if (e.shiftKey) {
                keys.push(Keys.Shift);
            }

            // update the keyboard data:
            Keyboard.instance.addKeys(keys);
        }

        /**
         *
         * @param timestamp
         * @private
         */

    }, {
        key: "_onAnimationFrame",
        value: function _onAnimationFrame(timestamp) {
            // is this the first run?
            if (this._totalElapsedTime === null) {
                this._totalElapsedTime = timestamp;
            }

            // any scene waiting to be swapped?
            if (this._swapScene && !this._swappingScenes) {
                this.changeScene(this._swapScene);
                this._swapScene = null;
            }

            // calculate the current delta time value:
            var delta = (timestamp - this._totalElapsedTime) / 1000;
            var self = this;
            this._totalElapsedTime = timestamp;

            if (!this._paused && isGameScene(this._gameScene) && !this._swappingScenes) {
                // handle the active game scene interactions here:

                // TODO: before release, add the try here..
                //try {
                // the user defined the game scene update function?
                if (isFunction(this._gameScene.update)) {
                    // call user defined update function:
                    this._executionPhase = SC.EXECUTION_PHASES.UPDATE;
                    this._gameScene.update(delta);
                }

                this._gameScene.sceneUpdate(delta);

                if (isFunction(this._gameScene.lateUpdate)) {
                    // call user defined update function:
                    this._executionPhase = SC.EXECUTION_PHASES.LATE_UPDATE;
                    this._gameScene.lateUpdate(delta);
                }

                this._gameScene.sceneLateUpdate(delta);

                // prepare the webgl context for rendering:
                this._gameScene.prepareRender();

                // render extensions?
                var renderExtensions = Object.keys(this._renderExtensions);
                renderExtensions.forEach(function (name) {
                    self._renderExtensions[name].render(delta);
                });

                // the user defined the game scene early-render function?
                if (isFunction(this._gameScene.render)) {
                    this._executionPhase = SC.EXECUTION_PHASES.RENDER;
                    this._gameScene.render(delta);
                }

                // call internal scene render function:
                this._executionPhase = SC.EXECUTION_PHASES.SCENE_RENDER;
                this._gameScene.sceneRender(delta);

                this._gameScene.flushRender();

                // the user defined the game scene pre-render function?
                if (isFunction(this._gameScene.lateRender)) {
                    this._executionPhase = SC.EXECUTION_PHASES.LATE_RENDER;
                    this._gameScene.lateRender(delta);
                    this._gameScene.flushRender();
                }

                //} catch (ex) {
                //    this._logger.error(ex);
                //}

                this._executionPhase = SC.EXECUTION_PHASES.WAITING;
            }

            // request a new animation frame:
            if (!this._paused) {
                requestAnimationFrame(this._onAnimationFrame.bind(this));
            } else {
                // when the game is paused it's a good idea to wait a few ms before requesting a new animation frame to
                // save some machine resources...
                setTimeout(function () {
                    requestAnimationFrame(self._onAnimationFrame.bind(self));
                }, 100);
            }
        }

        //#endregion

    }]);

    return Game;
}();

; /**
  * Game Manager static class
  */

var GameManager = function () {
    _createClass(GameManager, null, [{
        key: "renderContext",


        //#region Static Properties

        /**
         * The active render context
         * @type {renderContext}
         */
        get: function get() {
            return this._renderContext;
        }

        /**
         * The active render context
         * @type {renderContext}
         */
        ,
        set: function set(value) {
            this._renderContext = value;
        }
    }, {
        key: "activeScene",
        get: function get() {
            return this._activeScene;
        },
        set: function set(value) {
            this._activeScene = value;
        }
    }, {
        key: "activeProject",
        get: function get() {
            return this._activeProject;
        },
        set: function set(value) {
            this._activeProject = value;
        }
    }, {
        key: "activeGame",
        get: function get() {
            return this._activeGame;
        },
        set: function set(value) {
            this._activeGame = value;
        }
    }, {
        key: "activeProjectPath",
        get: function get() {
            return this._activeProjectPath;
        },
        set: function set(value) {
            this._activeProjectPath = value;
        }

        //#endregion

        //#region Constructors

    }]);

    function GameManager() {
        _classCallCheck(this, GameManager);
    }

    //#endregion

    return GameManager;
}();

;AttributeDictionary.addRule("gameobject", "transform", { ownContainer: true });
AttributeDictionary.addRule("gameobject", "_parent", { visible: false });

/**
 * GameObject class
 */

var GameObject = function () {

    //#region Constructors

    /**
     * @param {Object} params
     */
    function GameObject(params) {
        _classCallCheck(this, GameObject);

        params = params || {};

        // public properties:
        this.name = params.name || "GameObject";
        this.enabled = true;

        if (params.transform) {
            params.transform.gameObject = this;
        }

        this.transform = params.transform || new Transform({ gameObject: this });

        // private properties:
        this._uid = generateUID();
        this._parent = params.parent || null;
        this._children = params.children || [];
        this._components = params.components || [];
        this._transformMatrix = new Matrix4();
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(GameObject, [{
        key: "equals",


        //#endregion

        value: function equals(other) {
            if (other.getUID) {
                return this._uid === other.getUID();
            }

            return this === other;
        }
    }, {
        key: "getBaseWidth",
        value: function getBaseWidth() {
            return 1;
        }
    }, {
        key: "getBaseHeight",
        value: function getBaseHeight() {
            return 1;
        }
    }, {
        key: "getType",
        value: function getType() {
            return "GameObject";
        }
    }, {
        key: "getUID",
        value: function getUID() {
            return this._uid;
        }
    }, {
        key: "propagatePropertyUpdate",
        value: function propagatePropertyUpdate(property, value) {
            for (var i = 0; i < this._components.length; ++i) {
                if (this._components[i]["onGameObject" + property + "Updated"]) {
                    this._components[i]["onGameObject" + property + "Updated"](value);
                }
            }
        }

        /**
         * Resolves the GameObject transformation Matrix4
         * @returns {Float32Array}
         */

    }, {
        key: "getMatrix",
        value: function getMatrix() {
            this._transformMatrix.identity();
            this._transformMatrix.translate([this.transform.getPosition().x, this.transform.getPosition().y, 0]);

            return this._transformMatrix.asArray();
        }
    }, {
        key: "getParent",
        value: function getParent() {
            return this._parent;
        }
    }, {
        key: "removeParent",
        value: function removeParent() {
            if (this._parent) {
                this._parent.removeChild(this);
            } else {
                GameManager.activeScene.removeGameObject(this);
            }

            this._parent = null;
        }
    }, {
        key: "setParent",
        value: function setParent(gameObject) {
            if (!gameObject) {
                // since there is no game object specified we will try to look for a scene related to this game object
                // and then add it to the root hierarchy:
                if (GameManager.activeScene) {
                    GameManager.activeScene.addGameObject(this);
                }
            } else {
                // does the object has a parent?
                if (this.getParent() != null) {
                    this.getParent().removeChild(this);
                } else {
                    // maybe is part of a game scene root hierarchy? if so try to remove from that
                    if (GameManager.activeScene) {
                        GameManager.activeScene.removeGameObject(this);
                    }
                }

                gameObject.addChild(this);
            }
        }
    }, {
        key: "removeChild",
        value: function removeChild(gameObject) {
            for (var i = this._children.length - 1; i >= 0; i--) {
                if (this._children[i].getUID() == gameObject.getUID()) {
                    return this._children.splice(i, 1);
                }
            }
        }
    }, {
        key: "getChildren",
        value: function getChildren() {
            return this._children;
        }
    }, {
        key: "addChild",
        value: function addChild(gameObject, index) {
            // let's be safe, make sure to remove parent if any
            gameObject.removeParent();

            // update the object parent
            gameObject._parent = this;

            // add this to our children array
            if (isObjectAssigned(index)) {
                this._children.insert(index, gameObject);
            } else {
                this._children.push(gameObject);
            }
        }
    }, {
        key: "getHierarchyHash",
        value: function getHierarchyHash() {
            if (this._parent) {
                return this._parent.getHierarchyHash() + "." + this._uid;
            }
            return this._uid + "";
        }
    }, {
        key: "isChild",
        value: function isChild(gameObject) {
            // check if is a child simply by getting the hierarchy hash:
            var hierarchyHash = gameObject.getHierarchyHash().split("."); // this . x . y . z . other
            var thisIndex = hierarchyHash.indexOf(this._uid + ""),
                otherIndex = hierarchyHash.indexOf(gameObject.getUID() + "");
            return otherIndex > thisIndex && thisIndex >= 0;

            // this way takes away more resources:
            /*for (var i = 0; i < this._children.length; ++i) {
             if (this._children[i].equals(gameObject)) {
             return true;
             } else {
             if (this._children[i].isChild(gameObject)) {
             return true;
             }
             }
             }
             return false;*/
        }
    }, {
        key: "addComponent",
        value: function addComponent(component) {
            if (isFunction(component.setGameObject)) {
                component.setGameObject(this);
            }

            // set the related component game object:
            component.gameObject = this;

            this._components.push(component);
        }
    }, {
        key: "update",
        value: function update(delta) {
            if (!this.enabled) {
                return;
            }

            // update children:
            this._children.forEach(function (elem) {
                if (elem.update) {
                    elem.update(delta);
                }
            });

            this._components.forEach(function (component) {
                if (component.update) {
                    component.update(delta);
                }
            });
        }
    }, {
        key: "render",
        value: function render(delta, spriteBatch) {
            if (!this.enabled) {
                return;
            }

            // render children:
            this._children.forEach(function (elem) {
                if (elem.render) {
                    elem.render(delta, spriteBatch);
                }
            });

            this._components.forEach(function (component) {
                if (component.render) {
                    component.render(delta, spriteBatch);
                }
            });
        }
    }, {
        key: "getComponents",
        value: function getComponents() {
            return this._components;
        }
    }, {
        key: "getBoundary",
        value: function getBoundary(bulk) {
            var mat = this.getMatrix();
            var boundary = new Boundary(Vector2.transformMat4(new Vector2(0, 0), mat), Vector2.transformMat4(new Vector2(1, 0), mat), Vector2.transformMat4(new Vector2(1, 1), mat), Vector2.transformMat4(new Vector2(0, 1), mat));

            if (bulk) {
                boundary.topLeft.x -= bulk;
                boundary.topLeft.y -= bulk;
                boundary.topRight.x += bulk;
                boundary.topRight.y -= bulk;
                boundary.bottomRight.x += bulk;
                boundary.bottomRight.y += bulk;
                boundary.bottomLeft.x -= bulk;
                boundary.bottomLeft.y += bulk;
            }

            return boundary;
        }
    }, {
        key: "getRectangleBoundary",
        value: function getRectangleBoundary(bulk) {
            var vertices = this.getBoundary(bulk);

            // find the min and max width to form the rectangle boundary
            var minX = Math.min(vertices.topLeft.x, vertices.topRight.x, vertices.bottomLeft.x, vertices.bottomRight.x);
            var maxX = Math.max(vertices.topLeft.x, vertices.topRight.x, vertices.bottomLeft.x, vertices.bottomRight.x);
            var minY = Math.min(vertices.topLeft.y, vertices.topRight.y, vertices.bottomLeft.y, vertices.bottomRight.y);
            var maxY = Math.max(vertices.topLeft.y, vertices.topRight.y, vertices.bottomLeft.y, vertices.bottomRight.y);

            // return the generated rectangle:
            return new Rectangle(minX, minY, maxX - minX, maxY - minY);
        }
    }, {
        key: "collidesWith",
        value: function collidesWith(gameObject, bulk, bulkOther) {
            return this.getBoundary(bulk).overlapsWith(gameObject.getBoundary(bulkOther));
        }
    }, {
        key: "collidesWithPoint",
        value: function collidesWithPoint(point, bulk) {
            var boundaryA = this.getBoundary(bulk);
            var boundaryB = new Boundary(new Vector2(point.x, point.y), new Vector2(point.x + 1, point.y), new Vector2(point.x + 1, point.y + 1), new Vector2(point.x, point.y + 1));

            return Boundary.overlap(boundaryA, boundaryB);
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                name: this.name,
                transform: this.transform.objectify(),
                children: Objectify.array(this._children),
                components: Objectify.array(this._components)
            };
        }
    }, {
        key: "unload",
        value: function unload() {
            for (var i = 0; i < this._components.length; ++i) {
                if (isFunction(this._components[i].unload)) {
                    this._components[i].unload();
                }
            }
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new GameObject({
                name: data.name,
                transform: Transform.restore(data.transform),
                children: Objectify.restoreArray(data.children),
                components: Objectify.restoreArray(data.components)
            });
        }
    }]);

    return GameObject;
}();

;AttributeDictionary.addRule("gameScene", "_game", { visible: false });
AttributeDictionary.addRule("gameScene", "_gameObjects", { visible: false });
AttributeDictionary.addRule("gameScene", "_camera", { visible: false });
AttributeDictionary.addRule("gameScene", "_spriteBatch", { visible: false });

/**
 * GameScene class
 */

var GameScene = function () {

    //#region Constructors

    /**
     *
     * @param params
     */
    function GameScene(params) {
        _classCallCheck(this, GameScene);

        params = params || {};

        if (!params.game) {
            throw "cannot create a game scene without the game parameter";
        }

        // public properties:

        this.name = params.name || "GameScene";

        // private properties:
        this._uid = generateUID();
        this._game = params.game || null;
        this._backgroundColor = params.backgroundColor || Color.CornflowerBlue;
        this._gameObjects = params.gameObjects || [];
        // the default scene camera
        this._camera = params.camera || new Camera2D(0, 0, this._game.getVirtualResolution().width, this._game.getVirtualResolution().height);
        this._spriteBatch = new SpriteBatch(params.game);
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(GameScene, [{
        key: "getUID",


        //#endregion

        value: function getUID() {
            return this._uid;
        }
    }, {
        key: "getPhysicsWorld",
        value: function getPhysicsWorld() {
            return this._game.getPhysicsEngine().world;
        }
    }, {
        key: "getCamera",
        value: function getCamera() {
            return this._camera;
        }
    }, {
        key: "setGame",
        value: function setGame(game) {
            this._game = game;
        }
    }, {
        key: "getGame",
        value: function getGame() {
            return this._game;
        }
    }, {
        key: "setBackgroundColor",
        value: function setBackgroundColor(color) {
            this._backgroundColor = color;
        }
    }, {
        key: "getBackgroundColor",
        value: function getBackgroundColor() {
            return this._backgroundColor;
        }
    }, {
        key: "addGameObject",
        value: function addGameObject(gameObject, index) {
            // let's be safe, make sure to remove parent if any
            gameObject.removeParent();

            if (isObjectAssigned(index)) {
                this._gameObjects.insert(index, gameObject);
            } else {
                this._gameObjects.push(gameObject);
            }
        }
    }, {
        key: "getGameObjects",
        value: function getGameObjects() {
            return this._gameObjects;
        }
    }, {
        key: "removeGameObject",
        value: function removeGameObject(gameObject) {
            for (var i = this._gameObjects.length - 1; i >= 0; i--) {
                if (this._gameObjects[i].getUID() == gameObject.getUID()) {
                    return this._gameObjects.splice(i, 1);
                }
            }
        }

        /**
         * Returns an array with all the game objects of this scene. All child game objects are included.
         */

    }, {
        key: "getAllGameObjects",
        value: function getAllGameObjects() {
            var result = [];

            // TODO: make it a private function
            function recursive(gameObjects) {
                gameObjects.forEach(function (elem) {
                    result.push(elem);
                    recursive(elem.getChildren());
                });
            }

            recursive(this._gameObjects);

            return result;
        }
    }, {
        key: "prepareRender",
        value: function prepareRender() {
            var gl = this._game.getRenderContext().getContext();

            // set clear color and clear the screen:
            gl.clearColor(this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b, this._backgroundColor.a);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    }, {
        key: "sceneLateUpdate",
        value: function sceneLateUpdate(delta) {
            Matter.Engine.update(this._game.getPhysicsEngine(), 1000 / 60);
        }
    }, {
        key: "sceneUpdate",
        value: function sceneUpdate(delta) {
            // let's render all game objects on scene:
            for (var i = 0; i < this._gameObjects.length; i++) {
                this._gameObjects[i].update(delta);
            }
        }
    }, {
        key: "sceneRender",
        value: function sceneRender(delta) {
            // let's render all game objects on scene:
            for (var i = 0; i < this._gameObjects.length; i++) {
                this._gameObjects[i].render(delta, this._spriteBatch);
            }
        }
    }, {
        key: "flushRender",
        value: function flushRender() {
            // all draw data was stored, now let's actually render stuff into the screen!
            this._spriteBatch.flush();
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                name: this.name,
                camera: this._camera.objectify(),
                backgroundColor: this._backgroundColor.objectify(),
                gameObjects: Objectify.array(this._gameObjects)
            };
        }
    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new GameScene({
                game: GameManager.activeGame,
                backgroundColor: Color.restore(data.backgroundColor),
                camera: Camera2D.restore(data.camera),
                gameObjects: Objectify.restoreArray(data.gameObjects)
            });
        }
    }]);

    return GameScene;
}();

; /**
  * PrimitiveBatch class for on demand direct drawing
  */

var PrimitiveBatch = function () {

    //#region Constructors

    /**
     *
     * @param game
     */
    function PrimitiveBatch(game) {
        _classCallCheck(this, PrimitiveBatch);

        if (!isGame(game)) {
            throw error("Cannot create primitive render, the Game object is missing from the parameters");
        }

        // public properties:


        // private properties:
        this._game = game;
        this._gl = game.getRenderContext().getContext();
        this._primitiveShader = new PrimitiveShader();
        this._vertexBuffer = this._gl.createBuffer();
        this._colorBuffer = this._gl.createBuffer();

        this._rectangleVertexData = [];
        this._rectangleColorData = [];
        this._rectangleCount = 0;

        this._transformMatrix = new Matrix4();
        this._rectangleData = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
    }

    //#endregion

    //#region Methods

    _createClass(PrimitiveBatch, [{
        key: "unload",
        value: function unload() {
            this._gl.deleteBuffer(this._vertexBuffer);
            this._gl.deleteBuffer(this._colorBuffer);

            this._primitiveShader.unload();
        }
    }, {
        key: "begin",
        value: function begin() {
            //let gl = this._gl;
            // bind buffers
            //gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        }
    }, {
        key: "clear",
        value: function clear() {
            this._rectangleVertexData = [];
            this._rectangleColorData = [];
            this._rectangleCount = 0;
        }
    }, {
        key: "flush",
        value: function flush() {
            var gl = this._gl;
            var cameraMatrix = this._game.getActiveCamera().getMatrix();

            this._game.getShaderManager().useShader(this._primitiveShader);

            // draw rectangles?
            if (this._rectangleCount > 0) {
                // position buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, this._rectangleData, gl.STATIC_DRAW);

                gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
                gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

                // set uniforms
                gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, cameraMatrix);

                for (var i = 0; i < this._rectangleCount; i++) {
                    this._transformMatrix.identity();
                    this._transformMatrix.translate([this._rectangleVertexData[i].x, this._rectangleVertexData[i].y, 0]);
                    this._transformMatrix.scale([this._rectangleVertexData[i].width, this._rectangleVertexData[i].height, 0]);

                    gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, this._transformMatrix.asArray());
                    gl.uniform4f(this._primitiveShader.uniforms.uColor._location, this._rectangleColorData[i].r, this._rectangleColorData[i].g, this._rectangleColorData[i].b, this._rectangleColorData[i].a);

                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                }
            }

            this.clear();
        }
    }, {
        key: "drawPoint",
        value: function drawPoint(vector, size, color) {}
    }, {
        key: "storeRectangle",
        value: function storeRectangle(rectangle, color) {
            this._rectangleColorData.push(color);
            this._rectangleVertexData.push(rectangle);
            this._rectangleCount++;
        }
    }, {
        key: "drawLine",
        value: function drawLine(vectorA, vectorB, thickness, color) {}

        //#endregion

    }]);

    return PrimitiveBatch;
}();

; /**
  * PrimitiveRender class for on demand direct drawing
  */

var PrimitiveRender = function () {

    //#region Constructors

    /**
     *
     * @param game
     */
    function PrimitiveRender(game) {
        _classCallCheck(this, PrimitiveRender);

        if (!isGame(game)) {
            throw "Cannot create primitive render, the Game object is missing from the parameters";
        }

        // private properties:
        this._game = game;
        this._gl = game.getRenderContext().getContext();
        this._primitiveShader = new PrimitiveShader();
        this._vertexBuffer = this._gl.createBuffer();
        this._transformMatrix = new Matrix4();
        this._rectangleData = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
        this._pointData = new Float32Array([0.0, 0.0]);
    }

    //#endregion

    //#region Methods

    _createClass(PrimitiveRender, [{
        key: "unload",
        value: function unload() {
            this._gl.deleteBuffer(this._vertexBuffer);
            this._primitiveShader.unload();
        }
    }, {
        key: "drawPoint",
        value: function drawPoint(vector, size, color) {
            // TODO: refactor this method
            var gl = this._gl;

            this._game.getShaderManager().useShader(this._primitiveShader);

            // position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._pointData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, this._gl.FLOAT, false, 0, 0);

            // calculate transformation matrix:
            this._transformMatrix.identity();
            this._transformMatrix.translate([vector.x, vector.y, 0]);

            // set uniforms
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, this._game.getActiveCamera().getMatrix());
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, this._transformMatrix.asArray());
            gl.uniform4f(this._primitiveShader.uniforms.uColor._location, color.r, color.g, color.b, color.a);
            gl.uniform1f(this._primitiveShader.uniforms.uPointSize._location, size);

            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }, {
        key: "drawTriangle",
        value: function drawTriangle(vectorA, vectorB, vectorC, color) {
            var gl = this._gl;
            var transformMatrix = this._transformMatrix;

            this._game.getShaderManager().useShader(this._primitiveShader);

            var triangleData = new Float32Array([vectorA.x, vectorA.y, vectorB.x, vectorB.y, vectorC.x, vectorC.y]);

            // position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, triangleData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

            // calculate transformation matrix (if not provided):
            this._transformMatrix.identity();

            // set uniforms
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, this._game.getActiveCamera().getMatrix());
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, transformMatrix.asArray());
            gl.uniform4f(this._primitiveShader.uniforms.uColor._location, color.r, color.g, color.b, color.a);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
    }, {
        key: "drawCircle",
        value: function drawCircle(position, radius, iterations, color) {
            var gl = this._gl;

            this._game.getShaderManager().useShader(this._primitiveShader);

            var triangleData = [];
            for (var i = 0; i < iterations; i++) {
                triangleData.push(position.x + radius * Math.cos(i * MathHelper.PI2 / iterations));
                triangleData.push(position.y + radius * Math.sin(i * MathHelper.PI2 / iterations));
            }
            triangleData = new Float32Array(triangleData);

            // position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, triangleData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, this._gl.FLOAT, false, 0, 0);

            this._transformMatrix.identity();

            // set uniforms
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, this._game.getActiveCamera().getMatrix());
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, this._transformMatrix.asArray());
            gl.uniform4f(this._primitiveShader.uniforms.uColor._location, color.r, color.g, color.b, color.a);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, iterations);
        }
    }, {
        key: "drawRectangle",
        value: function drawRectangle(rectangle, color, rotation) {
            var gl = this._gl;
            var transformMatrix = this._transformMatrix;

            this._game.getShaderManager().useShader(this._primitiveShader);

            // position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._rectangleData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

            // calculate transformation matrix (if not provided):
            this._transformMatrix.identity();
            this._transformMatrix.translate([rectangle.x, rectangle.y, 0]);

            // rotate the rectangle?
            if (rotation) {
                this._transformMatrix.translate([rectangle.width / 2, rectangle.height / 2, 0]);
                this._transformMatrix.rotate([0.0, 0.0, 1.0], rotation);
                this._transformMatrix.translate([-rectangle.width / 2, -rectangle.height / 2, 0]);
            }

            this._transformMatrix.scale([rectangle.width, rectangle.height, 0]);

            // set uniforms
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, this._game.getActiveCamera().getMatrix());
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, transformMatrix.asArray());
            gl.uniform4f(this._primitiveShader.uniforms.uColor._location, color.r, color.g, color.b, color.a);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }, {
        key: "drawRectangleFromMatrix",
        value: function drawRectangleFromMatrix(matrix, color) {
            var gl = this._gl;

            this._game.getShaderManager().useShader(this._primitiveShader);

            // position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._rectangleData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

            // set uniforms
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, this._game.getActiveCamera().getMatrix());
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, matrix);
            gl.uniform4f(this._primitiveShader.uniforms.uColor._location, color.r, color.g, color.b, color.a);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }, {
        key: "drawLine",
        value: function drawLine(vectorA, vectorB, thickness, color) {
            var gl = this._gl;
            //gl.lineWidth(thickness); // not all implementations support this

            this._game.getShaderManager().useShader(this._primitiveShader);

            var pointData = new Float32Array([vectorA.x, vectorA.y, vectorB.x, vectorB.y]);

            // position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._primitiveShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._primitiveShader.attributes.aVertexPosition, 2, this._gl.FLOAT, false, 0, 0);

            this._transformMatrix.identity();

            // set uniforms
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uMatrix._location, false, this._game.getActiveCamera().getMatrix());
            gl.uniformMatrix4fv(this._primitiveShader.uniforms.uTransform._location, false, this._transformMatrix.asArray());
            gl.uniform4f(this._primitiveShader.uniforms.uColor._location, color.r, color.g, color.b, color.a);

            gl.drawArrays(gl.LINES, 0, 2);
        }

        //#endregion

    }]);

    return PrimitiveRender;
}();

; // unique key
var _scriptsSingleton = Symbol('scriptsSingleton');

/**
 * Scripts Singleton Class
 */

var ScriptsSingleton = function () {

    //#region Constructors

    function ScriptsSingleton(scriptsSingletonToken) {
        _classCallCheck(this, ScriptsSingleton);

        if (_scriptsSingleton !== scriptsSingletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._store = {};
    }

    //#endregion

    //#region Public Methods

    //#region Static Methods

    _createClass(ScriptsSingleton, [{
        key: "clear",


        //#endregion

        /**
         * Clear all the stored scripts
         */
        value: function clear() {
            this._store = {};
        }

        /**
         * Creates and stores a script code
         * @returns {ObjectComponent}
         */

    }, {
        key: "addScript",
        value: function addScript(name) {
            var script = function instance() {};
            this._store[name] = script;
            this._setupScript(script);
            return script;
        }

        /**
         * Generates and assigns a component to the given game object. The component is returned in the function call
         * @param scriptName
         * @param gameObject
         */

    }, {
        key: "assign",
        value: function assign(scriptName, gameObject) {
            var component = this.generateComponent(scriptName);
            gameObject.addComponent(component);
            return component;
        }

        /**
         * Generates a component from one stored script
         * @param scriptName
         */

    }, {
        key: "generateComponent",
        value: function generateComponent(scriptName) {
            if (!this._store[scriptName]) {
                return null;
            }

            var component = Object.create(this._store[scriptName].prototype);
            component._name = scriptName;

            // now we need to assign all the instance properties defined:
            var properties = this._store[scriptName].properties.getAll();
            var propertyNames = Object.keys(properties);

            if (propertyNames && propertyNames.length > 0) {
                propertyNames.forEach(function (propName) {
                    // assign the default value if exists:
                    component[propName] = properties[propName].default;
                });
            }

            return component;
        }

        //#endregion

        //#region Private Methods

        /**
         * Setup a script adding event handlers and such
         * @private
         */

    }, {
        key: "_setupScript",
        value: function _setupScript(script) {
            script.properties = {
                _store: {},
                _target: script,
                add: function add(name, attr) {
                    // save on the target's properties store the attributes:
                    this._store[name] = attr;
                },
                get: function get(name) {
                    return this._store[name];
                },
                getAll: function getAll() {
                    return this._store;
                }
            };
        }

        //#endregion

    }], [{
        key: "instance",
        get: function get() {
            if (!this[_scriptsSingleton]) {
                this[_scriptsSingleton] = new ScriptsSingleton(_scriptsSingleton);
            }

            return this[_scriptsSingleton];
        }
    }]);

    return ScriptsSingleton;
}();

/**
 *  Scripts alias to Scripts Singleton instance
 */


var Scripts = ScriptsSingleton.instance;

// aliases
// there is the need to do a binding because otherwise the reference to the original object would be lost
sc.addScript = Scripts.addScript.bind(Scripts);
sc.assignScript = Scripts.assign.bind(Scripts);; /**
                                                 * Sound class
                                                 */

var Sound = function () {

    //#region Constructors

    /**
     *
     * @param audio
     */
    function Sound(audio) {
        _classCallCheck(this, Sound);

        if (!isObjectAssigned(audio)) {
            throw new Error("Cannot create Sound without a valid audio source");
        }

        // private properties
        this._source = audio;
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param path
     * @returns {Promise}
     */


    _createClass(Sound, [{
        key: "setAudioSource",


        // TODO: static restore

        //#endregion

        /**
         *
         * @param audio
         */
        value: function setAudioSource(audio) {
            this._source = audio;
        }

        /**
         * plays the current audio source
         */

    }, {
        key: "play",
        value: function play() {
            this._source.play();
        }

        /**
         * pauses the current audio source
         */

    }, {
        key: "pause",
        value: function pause() {
            this._source.pause();
        }

        /**
         * stops the current audio source
         */

    }, {
        key: "stop",
        value: function stop() {
            this._source.pause();
            this._source.currentTime = 0;
        }

        /**
         * sets the current audio source loop behavior
         * @param loop
         */

    }, {
        key: "setLoop",
        value: function setLoop(loop) {
            this._source.loop = loop;
        }

        /**
         * sets the current audio source output volume (0 to 1)
         * @param volume
         */

    }, {
        key: "setVolume",
        value: function setVolume(volume) {
            this._source.volume = volume;
        }

        //#endregion

    }], [{
        key: "fromPath",
        value: function fromPath(path) {
            return new Promise(function (resolve, reject) {
                ContentLoader.loadAudio(path).then(function (audio) {
                    resolve(new Sound(audio));
                }, function () {
                    reject();
                });
            }.bind(this));
        }
    }]);

    return Sound;
}();

;AttributeDictionary.inherit("sprite", "gameobject");
AttributeDictionary.addRule("sprite", "_source", { displayName: "Source", editor: "filepath" });
AttributeDictionary.addRule("sprite", "_tint", { displayName: "Tint" });
AttributeDictionary.addRule("sprite", "_texture", { visible: false });
AttributeDictionary.addRule("sprite", "_wrapMode", { visible: false }); // temporary while we don't have cb's in editor
AttributeDictionary.addRule("sprite", "_atlasRegion", {
    displayName: "Region", available: function available() {
        return isObjectAssigned(this._atlas);
    }
});

/**
 * Sprite class
 */

var Sprite = function (_GameObject) {
    _inherits(Sprite, _GameObject);

    //#region Constructors

    /**
     * Class constructor
     * @param {Object} params
     */
    function Sprite(params) {
        _classCallCheck(this, Sprite);

        params = params || {};
        params.name = params.name || "Sprite";

        // private properties:
        var _this4 = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, params));

        _this4._source = "";
        _this4._atlasRegion = "";
        _this4._tint = params.tint || Color.fromRGB(255, 255, 255);
        _this4._textureWidth = 0;
        _this4._textureHeight = 0;
        _this4._origin = new Vector2(0.5, 0.5);
        _this4._wrapMode = WrapMode.CLAMP;
        _this4._atlas = null;

        _this4.setTexture(params.texture);
        return _this4;
    }

    //#endregion

    //#region Public Methods

    //#region Static Methods

    _createClass(Sprite, [{
        key: "getBaseWidth",


        //#endregion

        value: function getBaseWidth() {
            return this._textureWidth;
        }
    }, {
        key: "getBaseHeight",
        value: function getBaseHeight() {
            return this._textureHeight;
        }
    }, {
        key: "getMatrix",
        value: function getMatrix() {
            var x = void 0,
                y = void 0,
                width = void 0,
                height = void 0;

            x = this.transform.getPosition().x;
            y = this.transform.getPosition().y;
            width = this._textureWidth * this.transform.getScale().x;
            height = this._textureHeight * this.transform.getScale().y;

            this._transformMatrix.identity();

            if (this._wrapMode != WrapMode.REPEAT) {
                this._transformMatrix.translate([x - width * this._origin.x, y - height * this._origin.y, 0]);
            } else {
                this._transformMatrix.translate([-width * this._origin.x, -height * this._origin.y, 0]);
            }

            this._transformMatrix.translate([width * this._origin.x, height * this._origin.y, 0]);
            this._transformMatrix.rotate([0.0, 0.0, 1.0], this.transform.getRotation());
            this._transformMatrix.translate([-width * this._origin.x, -height * this._origin.y, 0]);
            this._transformMatrix.scale([width, height, 0]);

            return this._transformMatrix.asArray();
        }
    }, {
        key: "setWrapMode",
        value: function setWrapMode(wrapMode) {
            this._wrapMode = wrapMode;
        }
    }, {
        key: "getWrapMode",
        value: function getWrapMode() {
            return this._wrapMode;
        }
    }, {
        key: "setOrigin",
        value: function setOrigin(origin) {
            this._origin = origin;
        }
    }, {
        key: "getOrigin",
        value: function getOrigin() {
            return this._origin;
        }
    }, {
        key: "setTint",
        value: function setTint(color) {
            this._tint = color;
        }
    }, {
        key: "getTint",
        value: function getTint() {
            return this._tint;
        }
    }, {
        key: "setSource",
        value: function setSource(path) {
            this._source = path;

            if (path && path.length > 0) {
                var ext = Path.getFileExtension(path);

                if (ext == SC.CONTENT_EXTENSIONS.ATLAS) {
                    ContentLoader.loadFile(path).then(function (data) {
                        var atlas = Objectify.restoreFromString(data);

                        // is this a valid atlas?
                        if (atlas && isObjectAssigned(atlas.sourcePath)) {
                            // seems so!
                            this._atlas = atlas;
                            this._assignTextureFromPath(this._atlas.sourcePath);

                            // FIXME: change to a more appropriate event?
                            // this is currently being used so the property editor refreshes the view after the atlas
                            // is asynchronously loaded.
                            EventManager.emit(SC.EVENTS.CONTENT_ASSET_LOADED, path);
                        }
                    }.bind(this), function (err) {
                        console.log("failed");
                    });
                } else {
                    this._atlas = null;
                    this._assignTextureFromPath(path);
                }
            } else {
                this.setTexture(null);
            }
        }
    }, {
        key: "getAtlasRegion",
        value: function getAtlasRegion() {
            return this._atlasRegion;
        }
    }, {
        key: "setAtlasRegion",
        value: function setAtlasRegion(value) {
            this._atlasRegion = value;
        }
    }, {
        key: "getSource",
        value: function getSource() {
            return this._source;
        }
    }, {
        key: "getType",
        value: function getType() {
            return "Sprite";
        }
    }, {
        key: "getTexture",
        value: function getTexture() {
            return this._texture;
        }
    }, {
        key: "setTexture",
        value: function setTexture(texture) {
            // is this a ready texture?
            if (!texture || !texture.isReady()) {
                this._texture = null;
                this._textureWidth = 0;
                this._textureHeight = 0;
                return;
            }

            this._texture = texture;

            // cache the dimensions
            this._textureWidth = this._texture.getWidth();
            this._textureHeight = this._texture.getHeight();
        }
    }, {
        key: "render",
        value: function render(delta, spriteBatch) {
            if (!this.enabled) {
                return;
            }

            // just store the sprite to render on flush:
            spriteBatch.storeSprite(this);

            // parent render function:
            _get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), "render", this).call(this, delta, spriteBatch);
        }

        // functions:

    }, {
        key: "objectify",
        value: function objectify() {
            var superObjectify = _get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), "objectify", this).call(this);
            return Objectify.extend(superObjectify, {
                src: this._source,
                tint: this._tint.objectify()
            });
        }
    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

        //#region Private Methods

    }, {
        key: "_assignTextureFromPath",
        value: function _assignTextureFromPath(path) {
            Texture2D.fromPath(path).then(function (texture) {
                this.setTexture(texture);
            }.bind(this), function (error) {
                this.setTexture(null);
            }.bind(this));
        }

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            var sprite = new Sprite({
                name: data.name,
                transform: Transform.restore(data.transform),
                children: Objectify.restoreArray(data.children),
                components: Objectify.restoreArray(data.components)
            });

            sprite.setSource(data.src);

            return sprite;
        }
    }]);

    return Sprite;
}(GameObject);

; /**
  * SpriteBatch class
  */

var SpriteBatch = function () {

    //#region Constructors

    function SpriteBatch(game) {
        _classCallCheck(this, SpriteBatch);

        if (!isGame(game)) {
            throw new Error("Cannot create sprite render, the Game object is missing from the parameters");
        }

        // private properties:
        this._game = game;
        this._gl = game.getRenderContext().getContext();
        this._vertexBuffer = this._gl.createBuffer();
        this._texBuffer = this._gl.createBuffer();
        this._textureShader = new TextureShader();
        this._lastTexUID = -1;
        this._sprites = [];
        this._rectangleData = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
        /*
           Texture coordinates in WebGL goes like this:
           0,1----1,1
         #--------#
         #--------#
         #--------#
         0,0----1,0
           */
        this._textureData = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
    }

    //#endregion

    //#region Methods

    _createClass(SpriteBatch, [{
        key: "clear",
        value: function clear() {
            this._sprites = [];
        }
    }, {
        key: "storeSprite",
        value: function storeSprite(sprite) {
            this._sprites.push(sprite);
        }
    }, {
        key: "flush",
        value: function flush() {
            if (this._sprites.length == 0) {
                return;
            }

            var gl = this._gl;
            var cameraMatrix = this._game.getActiveCamera().getMatrix();

            this._game.getShaderManager().useShader(this._textureShader);

            // position buffer attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._rectangleData, gl.STATIC_DRAW);

            gl.enableVertexAttribArray(this._textureShader.attributes.aVertexPosition);
            gl.vertexAttribPointer(this._textureShader.attributes.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

            // texture attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, this._texBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._textureData, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(this._textureShader.attributes.aTextureCoord);
            gl.vertexAttribPointer(this._textureShader.attributes.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

            // set uniforms
            gl.uniformMatrix4fv(this._textureShader.uniforms.uMatrix._location, false, cameraMatrix);

            var texture = void 0,
                tint = void 0;
            for (var i = 0; i < this._sprites.length; i++) {
                texture = this._sprites[i].getTexture();

                if (texture && texture.isReady()) {
                    tint = this._sprites[i].getTint();

                    // for performance sake, consider if the texture is the same so we don't need to bind again
                    // TODO: maybe it's a good idea to group the textures somehow (depth should be considered)
                    // TODO: correct this when using textures outside spritebatch...
                    //if (this._lastTexUID != texture.getUID()) {
                    texture.bind();
                    this._lastTexUID = texture.getUID();
                    //}

                    switch (this._sprites[i].getWrapMode()) {
                        case WrapMode.REPEAT:
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                            break;

                        case WrapMode.CLAMP:
                        default:
                            break;
                    }

                    gl.uniformMatrix4fv(this._textureShader.uniforms.uTransform._location, false, this._sprites[i].getMatrix());

                    if (tint) {
                        gl.uniform4f(this._textureShader.uniforms.uColor._location, tint.r, tint.g, tint.b, tint.a);
                    }

                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                }
            }

            this.clear();
        }
    }, {
        key: "unload",
        value: function unload() {
            this._gl.deleteBuffer(this._vertexBuffer);
            this._gl.deleteBuffer(this._texBuffer);

            this._textureShader.unload();
        }

        //#endregion

    }]);

    return SpriteBatch;
}();

; /**
  * Created by Luis on 23/12/2016.
  */

/**
 * Stroke Class
 * Stroke is a combination of a color and its size
 */

var Stroke = function () {
    _createClass(Stroke, [{
        key: "getMaxSize",


        //#region Static Properties

        /**
         *
         * @returns {number}
         */
        value: function getMaxSize() {
            return this._maxSize;
        }

        /**
         *
         * @param {number} size
         */

    }, {
        key: "setMaxSize",
        value: function setMaxSize(size) {
            if (!isNumber(size)) {
                throw new Error("The given raw size is invalid");
            }
            this._maxSize = size;
        }

        //#endregion

        //#region Constructors

        /**
         * Stroke is a combination of a color and its size
         * @param {Color=} color stroke color
         * @param {number=} size size of the stroke
         * @constructor
         */

    }]);

    function Stroke(color, size) {
        _classCallCheck(this, Stroke);

        // stroke color
        this._color = color || Color.fromRGBA(0.0, 0.0, 0.0, 1.0);
        // stroke size
        this._size = size || 0.0;
        this._maxSize = 10;
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Stroke, [{
        key: "getColor",


        //#endregion

        //#region Public Methods

        value: function getColor() {
            return this._color;
        }

        /**
         * Sets stroke's color
         * @param {Color} color
         */

    }, {
        key: "setColor",
        value: function setColor(color) {

            if (color instanceof Color) {
                this._color = color.clone();
                return;
            }

            if (!isNumber(color.r) || !isNumber(color.g) || !isNumber(color.b) || !isNumber(color.a)) {
                throw new Error("The given stroke color is invalid");
            }

            this._color.set(color.r, color.g, color.b, color.a);
        }
    }, {
        key: "setOpacity",
        value: function setOpacity(alpha) {

            if (!isNumber(alpha)) {
                throw new Error("The given alpha is invalid");
            }

            var currentColor = this.getColor();

            this._color.set(currentColor.r, currentColor.g, currentColor.b, alpha);
        }
    }, {
        key: "getOpacity",
        value: function getOpacity() {
            return this.getColor().a;
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return this._size;
        }
    }, {
        key: "setSize",
        value: function setSize(size) {

            if (!isNumber(size)) {
                throw new Error("The given size is invalid");
            }

            size = MathHelper.clamp(size, 0, this.getMaxSize());

            this._size = size;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            return {
                color: this._color.objectify(),
                size: this.getSize()
            };
        }

        //#endregion

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Stroke(Color.restore(data.color), data.size);
        }
    }]);

    return Stroke;
}();

; /**
  * Created by Luis on 16/12/2016.
  */

AttributeDictionary.inherit("text", "gameobject");
AttributeDictionary.addRule("text", "_textureSrc", { displayName: "Image Src", editor: "filepath" });
AttributeDictionary.addRule("text", "_color", { displayName: "Color" });
AttributeDictionary.addRule("text", "_text", { displayName: "Text" });
AttributeDictionary.addRule("text", "_texture", { visible: false });

// TODO: remove this... use game object boundary?
var maxWidth = 500;

/**
 * Text class
 */

var Text = function (_GameObject2) {
    _inherits(Text, _GameObject2);

    _createClass(Text, null, [{
        key: "AlignType",


        //#region Static Properties

        get: function get() {
            return {
                LEFT: 'LEFT',
                CENTER: 'CENTER',
                RIGHT: 'RIGHT'
            };
        }

        //#endregion

        //#region Constructors

    }]);

    function Text(params) {
        _classCallCheck(this, Text);

        params = params || {};
        params.name = params.name || "Text";

        var _this5 = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, params));

        _this5._fontStyle = new FontStyle(params.font || {});
        _this5._fontStyle.setFontSize(params.fontSize || 70.0);
        _this5._fontStyle.setLetterSpacing(params.letterSpacing || 0);
        _this5._fontStyle.setSpread(params.spread || 4);

        _this5._wordWrap = params.wordWrap || true;
        _this5._characterWrap = params.characterWrap || true;
        _this5._alignType = params.alignType || Text.AlignType.LEFT;

        _this5._color = params.color || Color.fromRGBA(164, 56, 32, 1.0);
        _this5._text = params.text || "";

        _this5._gamma = params.gamma || 2.0;

        _this5._strokeEnabled = 1;
        _this5._stroke = new Stroke(Color.fromRGBA(186, 85, 54, 0.5), 0.0);

        _this5._dropShadowEnabled = 1;
        _this5._dropShadow = new Stroke(Color.fromRGBA(0, 0, 0, 1.0), 5.0);
        // raw max offset
        _this5._rawMaxDropShadowOffset = new Vector2(10, 10);
        // raw offset from -raw offset to +raw offset
        _this5._dropShadowOffset = new Vector2(7, 7);

        // either 0 or 1
        _this5._debug = 0;

        _this5._gl = GameManager.renderContext.getContext();

        _this5._setTextureParameters();

        _this5._vertexBuffer = null;
        _this5._textureBuffer = null;
        _this5._vertexIndicesBuffer = null;
        _this5._textShader = null;

        _this5._textureSrc = "";
        _this5._texture = null;
        _this5._textureWidth = 0;
        _this5._textureHeight = 0;
        // set text texture if defined
        _this5.setTexture(params.texture, "");
        return _this5;
    }

    //#endregion

    //#region Public Methods

    //#region Static Methods

    _createClass(Text, [{
        key: "render",


        //#endregion

        //#region Overridden Methods

        value: function render(delta, spriteBatch) {
            if (!this.enabled) {
                return;
            }

            // TODO: don't render if font or font's texture are not valid/defined?

            if (this.getTexture() === null) {
                return;
            }

            // get gl context
            var gl = this._gl;

            // use text shader
            GameManager.activeGame.getShaderManager().useShader(this._textShader);

            // enable shader attributes
            gl.enableVertexAttribArray(this._textShader.attributes.aPos);
            gl.enableVertexAttribArray(this._textShader.attributes.aTexCoord);

            // draw text
            this._drawText();

            var cameraMatrix = GameManager.activeGame.getActiveCamera().getMatrix();

            gl.uniformMatrix4fv(this._textShader.uniforms.uMatrix._location, false, cameraMatrix);
            gl.uniformMatrix4fv(this._textShader.uniforms.uTransform._location, false, this.getMatrix());

            // bind to texture unit 0
            gl.activeTexture(gl.TEXTURE0);
            this._texture.bind();
            // tell the shader which unit you bound the texture to. In this case it's to sampler 0
            gl.uniform1i(this._textShader.uniforms.uTexture._location, 0);

            // debug
            gl.uniform1f(this._textShader.uniforms.uDebug._location, this._debug);
            // stroke outline
            gl.uniform1f(this._textShader.uniforms.uOutline._location, this._strokeEnabled);
            // drop shadow
            gl.uniform1f(this._textShader.uniforms.uDropShadow._location, this._dropShadowEnabled);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.vertexAttribPointer(this._textShader.attributes.aPos, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._textureBuffer);
            gl.vertexAttribPointer(this._textShader.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0);

            // stroke color
            var strokeColor = this.getStroke().getColor();
            gl.uniform4fv(this._textShader.uniforms.uOutlineColor._location, [strokeColor.r, strokeColor.g, strokeColor.b, strokeColor.a]);
            // stroke size
            gl.uniform1f(this._textShader.uniforms.uOutlineDistance._location, this.getNormalizedStrokeSize());

            // drop shadow color
            var dropShadowColor = this.getDropShadow().getColor();
            gl.uniform4fv(this._textShader.uniforms.uDropShadowColor._location, [dropShadowColor.r, dropShadowColor.g, dropShadowColor.b, dropShadowColor.a]);
            // drop shadow stroke smoothing
            gl.uniform1f(this._textShader.uniforms.uDropShadowSmoothing._location, this.getNormalizedDropShadowSmoothing());
            // drop shadow offset (direction)
            var normalizedOffset = this.getNormalizedDropShadowOffset();
            gl.uniform2fv(this._textShader.uniforms.uDropShadowOffset._location, [normalizedOffset.x, normalizedOffset.y]);

            var color = this.getColor();
            // font color (tint)
            gl.uniform4fv(this._textShader.uniforms.uColor._location, [color.r, color.g, color.b, color.a]);
            //gl.uniform1f(this._textShader.uniforms.u_buffer._location, 0.50); // 192 / 255

            // gamma (smoothing) value (how sharp is the text in the edges)
            gl.uniform1f(this._textShader.uniforms.uGamma._location, this.getGamma() * 1.4142 / this.getFontSize());

            // draw the glyphs
            //gl.drawArrays(gl.TRIANGLES, 0, this._vertexBuffer.numItems);
            gl.drawElements(gl.TRIANGLES, this._vertexIndicesBuffer.numItems, gl.UNSIGNED_SHORT, 0);

            // parent render function
            _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), "render", this).call(this, delta, spriteBatch);
        }
    }, {
        key: "unload",
        value: function unload() {

            if (isObjectAssigned(this._vertexBuffer)) {
                this._gl.deleteBuffer(this._vertexBuffer);
            }
            if (isObjectAssigned(this._textureBuffer)) {
                this._gl.deleteBuffer(this._textureBuffer);
            }
            if (isObjectAssigned(this._vertexIndicesBuffer)) {
                this._gl.deleteBuffer(this._vertexIndicesBuffer);
            }

            if (isObjectAssigned(this._textShader)) {
                this._textShader.unload();
            }

            // TODO: add/remove when spritebatch is fixed? we need to unload this specific texture from memory!
            // spritebatch related...
            //this._gl.deleteBuffer(this._texBuffer);
            //this._textureShader.unload();
        }

        // TODO: rotate, scale... probably similar to sprite... think carefully about scaling?

    }, {
        key: "getMatrix",
        value: function getMatrix() {
            var x = void 0,
                y = void 0;

            x = this.transform.getPosition().x;
            y = this.transform.getPosition().y;

            this._transformMatrix.identity();

            //mat4.translate(this._transformMatrix, this._transformMatrix, [x, y, 0]);
            //mat4.rotate(this._transformMatrix, this._transformMatrix, this.transform.getRotation(), [0.0, 0.0, 1.0]);
            //mat4.translate(this._transformMatrix, this._transformMatrix, [-x, -y, 0]);

            this._transformMatrix.translate([x, y, 0]);

            return this._transformMatrix.asArray();
        }

        //#endregion

    }, {
        key: "getType",
        value: function getType() {
            // TODO: is it even needed? we could replace this method in gameobject by this.name
            return "Text";
        }
    }, {
        key: "getTexture",
        value: function getTexture() {
            return this._texture;
        }
    }, {
        key: "setTextureSrc",
        value: function setTextureSrc(path) {
            var _this6 = this;

            Texture2D.fromPath(path).then(function (texture) {
                // set WebGL texture parameters
                _this6._setTextureParameters();
                _this6.setTexture(texture);
            }, function (error) {
                _this6.setTexture(null, null);
            });
        }
    }, {
        key: "setTexture",
        value: function setTexture(texture) {
            // is this a ready texture?
            if (!texture || !texture.isReady()) {
                this._textureSrc = "";
                this._texture = null;
                this._textureWidth = 0;
                this._textureHeight = 0;
                return;
            }

            this._textureSrc = texture.getTextureSrc();
            this._texture = texture;

            // cache the dimensions
            this._textureWidth = this._texture.getWidth();
            this._textureHeight = this._texture.getHeight();

            this._vertexBuffer = this._gl.createBuffer();
            this._textureBuffer = this._gl.createBuffer();
            this._vertexIndicesBuffer = this._gl.createBuffer();
            this._textShader = new TextShader();

            this._gl.uniform2f(this._textShader.uniforms.uTexSize._location, this._textureWidth, this._textureHeight);
        }
    }, {
        key: "setColor",
        value: function setColor(color) {
            this._color = color;
        }
    }, {
        key: "getColor",
        value: function getColor() {
            return this._color;
        }

        /**
         * Sets the outline effect of the text
         * @param {Stroke} stroke outline effect of the text
         */

    }, {
        key: "setStroke",
        value: function setStroke(stroke) {
            this._stroke = stroke;
        }
    }, {
        key: "getStroke",
        value: function getStroke() {
            return this._stroke;
        }
    }, {
        key: "getDropShadow",
        value: function getDropShadow() {
            return this._dropShadow;
        }

        /**
         * Sets the drop shadow effect of the text
         * @param {Stroke} shadow drop shadow effect of the text
         */

    }, {
        key: "setDropShadow",
        value: function setDropShadow(shadow) {
            this._dropShadow = shadow;
        }
    }, {
        key: "setText",
        value: function setText(str) {
            this._text = str;
        }
    }, {
        key: "getText",
        value: function getText() {
            return this._text;
        }
    }, {
        key: "getFontStyle",
        value: function getFontStyle() {
            return this._fontStyle;
        }

        /**
         * Sets the font style
         * @param {FontStyle} fontStyle font style
         */

    }, {
        key: "setFontStyle",
        value: function setFontStyle(fontStyle) {
            this._fontStyle = fontStyle;
        }
    }, {
        key: "getDropShadowOffset",
        value: function getDropShadowOffset() {
            return this._dropShadowOffset;
        }

        /**
         *
         * @param {Vector2} offset the shadow offset vector
         */

    }, {
        key: "setDropShadowOffset",
        value: function setDropShadowOffset(offset) {
            if (!offset instanceof Vector2) {
                throw new Error("The given raw max drop shadow offset is invalid");
            }
            this._dropShadowOffset = offset;
        }
    }, {
        key: "getRawMaxDropShadowOffset",
        value: function getRawMaxDropShadowOffset() {
            return this._rawMaxDropShadowOffset;
        }
    }, {
        key: "setRawMaxDropShadowOffset",
        value: function setRawMaxDropShadowOffset(offset) {
            if (!offset instanceof Vector2) {
                throw new Error("The given raw max drop shadow offset is invalid");
            }
            this._rawMaxDropShadowOffset = offset;
        }
    }, {
        key: "getNormalizedStrokeSize",
        value: function getNormalizedStrokeSize() {
            // stroke size
            // max shader value is 0.5
            // in terms of raw values, we go from 0 to stroke's max size,
            // so we calculate the scaled value between 0 and max shader value
            var scaledValue = MathHelper.normalize(this.getStroke().getSize(), 0, this.getStroke().getMaxSize(), 0, 0.5);

            // revert the value, so 0 represents less stroke
            scaledValue = 0.5 - scaledValue;

            return scaledValue;
        }
    }, {
        key: "getNormalizedDropShadowSmoothing",
        value: function getNormalizedDropShadowSmoothing() {
            // drop shadow stroke (smoothing) size
            // (raw value = between 0 and 10) * (actual shader max value = 0.5) / (max raw value = 10)
            return MathHelper.normalize(this.getDropShadow().getSize(), 0, this.getDropShadow().getMaxSize(), 0, 0.5);
        }
    }, {
        key: "getNormalizedDropShadowOffset",
        value: function getNormalizedDropShadowOffset() {
            // x and y values have to be between spread (defined in Hiero) / texture size
            // e.g., 4 / 512
            // need to normalize between those values

            var dropShadowOffset = this.getDropShadowOffset();

            var normalizedX = MathHelper.normalize(dropShadowOffset.x, -1 * this.getRawMaxDropShadowOffset().x, this.getRawMaxDropShadowOffset().x, -1 * this.maxDropShadowOffsetX, this.maxDropShadowOffsetX);

            var normalizedY = MathHelper.normalize(dropShadowOffset.y, -1 * this.getRawMaxDropShadowOffset().y, this.getRawMaxDropShadowOffset().y, -1 * this.maxDropShadowOffsetY, this.maxDropShadowOffsetY);

            return new Vector2(normalizedX, normalizedY);
        }

        /*
         Just for API sake
         */

    }, {
        key: "setFontSize",
        value: function setFontSize(size) {
            this.getFontStyle().setFontSize(size);
        }
    }, {
        key: "getFontSize",
        value: function getFontSize() {
            return this.getFontStyle().getFontSize();
        }
    }, {
        key: "getLetterSpacing",
        value: function getLetterSpacing() {
            return this.getFontStyle().getLetterSpacing();
        }
    }, {
        key: "setLetterSpacing",
        value: function setLetterSpacing(value) {
            this.getFontStyle().setLetterSpacing(value);
        }

        /*
         End of 'for API Sake'
         */

    }, {
        key: "setGamma",
        value: function setGamma(gamma) {
            this._gamma = gamma;
        }
    }, {
        key: "getGamma",
        value: function getGamma() {
            return this._gamma;
        }
    }, {
        key: "setDebug",
        value: function setDebug(value) {

            value = MathHelper.clamp(value, 0, 1);

            this._debug = value;
        }
    }, {
        key: "getDebug",
        value: function getDebug() {
            return this._debug;
        }
    }, {
        key: "setDropShadowEnabled",
        value: function setDropShadowEnabled(value) {

            value = MathHelper.clamp(value, 0, 1);

            this._dropShadowEnabled = value;
        }
    }, {
        key: "getDropShadowEnabled",
        value: function getDropShadowEnabled() {
            return this._dropShadowEnabled;
        }
    }, {
        key: "setStrokeEnabled",
        value: function setStrokeEnabled(value) {

            value = MathHelper.clamp(value, 0, 1);

            this._strokeEnabled = value;
        }
    }, {
        key: "getStrokeEnabled",
        value: function getStrokeEnabled() {
            return this._strokeEnabled;
        }
    }, {
        key: "setWordWrap",
        value: function setWordWrap(wrap) {
            this._wordWrap = wrap;
        }
    }, {
        key: "getWordWrap",
        value: function getWordWrap() {
            return this._wordWrap;
        }
    }, {
        key: "setCharacterWrap",
        value: function setCharacterWrap(wrap) {
            this._characterWrap = wrap;
        }
    }, {
        key: "getCharacterWrap",
        value: function getCharacterWrap() {
            return this._characterWrap;
        }

        /**
         * Sets Text alignment
         * @param {Text.AlignType} alignType
         */

    }, {
        key: "setAlign",
        value: function setAlign(alignType) {
            this._alignType = alignType;
        }
    }, {
        key: "getAlign",
        value: function getAlign() {
            return this._alignType;
        }
    }, {
        key: "getTextureSrc",
        value: function getTextureSrc() {
            return this._textureSrc;
        }
    }, {
        key: "objectify",
        value: function objectify() {
            var superObjectify = _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), "objectify", this).call(this);
            return Objectify.extend(superObjectify, {
                fontStyle: this.getFontStyle().objectify(),
                wordWrap: this.getWordWrap(),
                characterWrap: this.getCharacterWrap(),
                alignType: this.getAlign(),
                color: this.getColor().objectify(),
                text: this.getText(),
                gamma: this.getGamma(),
                strokeEnabled: this.getStrokeEnabled(),
                stroke: this.getStroke().objectify(),
                dropShadowEnabled: this.getDropShadowEnabled(),
                dropShadow: this.getDropShadow().objectify(),
                rawMaxDropShadowOffset: this.getRawMaxDropShadowOffset().objectify(),
                dropShadowOffset: this.getDropShadowOffset().objectify(),
                debug: this.getDebug(),
                textureSrc: this.getTextureSrc()
            });
        }

        //#endregion

        //#region Private Methods

    }, {
        key: "_setTextureParameters",
        value: function _setTextureParameters() {
            var gl = this._gl;

            // the line below is already done when creating a Texture2D with content loader
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, this._texture.getImageData());
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }

        /**
         * Draws the text onto the screen
         * @private
         */

    }, {
        key: "_drawText",
        value: function _drawText() {
            var fontStyle = this.getFontStyle();

            if (!fontStyle) {
                return;
            }

            var fontDescription = fontStyle.getFontDescription();

            // don't go further if font description isn't valid either
            if (!fontDescription || !fontDescription.common || !fontDescription.common.lineHeight) {
                return;
            }

            // line height; falls back to font size
            var lineHeight = fontDescription.common.lineHeight || this.getFontSize();

            // text scale based on the font size
            var scale = fontStyle.getScale();

            // don't go further if scale is invalid
            if (!scale) {
                return;
            }

            // create the lines to draw onto the screen
            var lines = TextUtils.measureText(fontStyle, this.getText(), maxWidth, this.getWordWrap(), this.getCharacterWrap());

            // draws lines
            this._drawLines(lines, scale, lineHeight);
        }

        /**
         * Aligns a line according to its width and align type
         * @param {number} width width of the line to align
         * @returns {number} the aligned x position of the line
         * @private
         */

    }, {
        key: "_alignLine",
        value: function _alignLine(width) {

            // set return variable
            var x = void 0;

            // change beginning of the line depending on the chosen alignment
            switch (this.getAlign()) {
                case Text.AlignType.LEFT:
                    x = this.transform.getPosition().x;
                    break;
                case Text.AlignType.CENTER:
                    x = this.transform.getPosition().x + maxWidth / 2 - width / 2;
                    break;
                case Text.AlignType.RIGHT:
                    x = this.transform.getPosition().x + maxWidth - width;
                    break;
                // TODO: implement AlignType.JUSTIFIED using Knuth and Plass's algorithm
                // case FontStyle.AlignType.JUSTIFIED:
                default:
                    x = 0;
                    break;
            }

            return x;
        }

        /**
         * Draws the given text lines onto the screen
         * @param {Array} lines lines to draw
         * @param {number} scale scale of the text
         * * @param {number} lineHeight how much Y should increase to switch line
         * @private
         */

    }, {
        key: "_drawLines",
        value: function _drawLines(lines, scale, lineHeight) {

            // TODO: maybe throw new Error when simply returning? so errors can be seen in the console?
            // if parameters are invalid, no need to go further
            if (!lines || !scale || scale <= 0 || !lineHeight || lineHeight === 0) {
                return;
            }

            // retrieve webgl context
            var gl = this._gl;

            // create shader arrays, which are filled inside prepareLineToBeDrawn
            var vertexElements = [];
            var textureElements = [];
            var vertexIndices = [];

            // create pen with the screen coordinates, where (0,0) is the center of the screen
            var pen = {
                x: 0,
                y: this.transform.getPosition().y
            };

            for (var i = 0; i < lines.length; i++) {

                // align line accordingly
                pen.x = this._alignLine(lines[i].width);

                // retrieve line characters
                var line = lines[i].chars;

                // prepare to draw line
                this._prepareLineToBeDrawn(line, scale, pen, vertexElements, textureElements, vertexIndices);

                // update Y before drawing another line
                // TODO: no need to recalculate this value every time...
                pen.y += lineHeight * scale;
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexElements), gl.STATIC_DRAW);
            this._vertexBuffer.numItems = vertexElements.length / 2;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vertexIndicesBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
            this._vertexIndicesBuffer.numItems = vertexIndices.length;

            gl.bindBuffer(gl.ARRAY_BUFFER, this._textureBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureElements), gl.STATIC_DRAW);
            this._textureBuffer.numItems = textureElements.length / 2;
        }

        /**
         * Prepares a line to be drawn
         * @param {Array} line array of characters whose draw is to be prepared
         * @param {number} scale text desired scale
         * @param {{x: number, y:number}} pen pen to draw with
         * @param {Array} vertexElements array to store the characters vertices
         * @param {Array} textureElements array to store the characters texture elements
         * @param {Array} vertexIndices array to store the vertices indices
         * @private
         */

    }, {
        key: "_prepareLineToBeDrawn",
        value: function _prepareLineToBeDrawn(line, scale, pen, vertexElements, textureElements, vertexIndices) {

            var lastGlyphCode = 0;

            // iterate through line characters
            for (var i = 0; i < line.length; i++) {

                // retrieve line char
                var char = line[i];

                // prepare character to be drawn
                lastGlyphCode = this._createGlyph(char, scale, pen, lastGlyphCode, vertexElements, textureElements, vertexIndices);
            }
        }

        /**
         * Creates the necessary vertices and texture elements to draw a given character
         * @param {string} char character to prepare to draw
         * @param {number} scale text scale
         * @param {{x: number, y: number}} pen pen to draw with
         * @param {number} lastGlyphCode last drawn glyph ascii code
         * @param {Array} outVertexElements out array to store the characters vertices
         * @param {Array} outTextureElements out array to store the characters texture elements
         * @param {Array} outVertexIndices out array to store the vertices indices
         * @returns {number} drawn glyph ascii code or 0 if invalid
         * @private
         */

    }, {
        key: "_createGlyph",
        value: function _createGlyph(char, scale, pen, lastGlyphCode, outVertexElements, outTextureElements, outVertexIndices) {

            var fontStyle = this.getFontStyle();

            if (!fontStyle) {
                return 0;
            }

            var fontDescription = fontStyle.getFontDescription();

            // if font's description or any of the parameters is missing, no need to go further
            if (!fontDescription || !fontDescription.chars || !char || !scale || scale <= 0 || !pen || lastGlyphCode == null || !outVertexElements || !outTextureElements || !outVertexIndices) {
                return 0;
            }

            // retrieve char ID
            var charID = fontStyle.findCharID(char);

            // return if null
            if (charID === null) {
                return 0;
            }

            // retrieve font metrics
            var metrics = fontDescription.chars[charID];

            // retrieve character metrics
            var width = metrics.width;
            var height = metrics.height;
            var xOffset = metrics.xoffset;
            var yOffset = metrics.yoffset;
            var xAdvance = metrics.xadvance;
            var posX = metrics.x;
            var posY = metrics.y;
            var asciiCode = metrics.id;

            // set kerning initial value
            var kern = 0;

            // only prepare character to be drawn if width and height are valid
            if (width > 0 && height > 0) {
                // if a glyph was created before
                if (lastGlyphCode) {
                    // retrieve kerning value between last character and current character
                    kern = fontStyle.getKerning(lastGlyphCode, asciiCode);
                }

                // TODO: isn't there a way to reuse the indices?
                var factor = outVertexIndices.length / 6 * 4;

                outVertexIndices.push(0 + factor, 1 + factor, 2 + factor, 1 + factor, 2 + factor, 3 + factor);

                // Add a quad (= two triangles) per glyph.
                outVertexElements.push(pen.x + (xOffset + kern) * scale, pen.y + yOffset * scale, pen.x + (xOffset + kern + width) * scale, pen.y + yOffset * scale, pen.x + (xOffset + kern) * scale, pen.y + (height + yOffset) * scale, pen.x + (xOffset + kern + width) * scale, pen.y + (height + yOffset) * scale);

                /*              ___
                 |\           \  |
                 | \           \ |
                 |__\ and then  \|
                 */
                // example without scaling
                /*
                 var bottomLeftX = pen.x + horiBearingX;
                 var bottomLeftY = pen.y + horiBearingY;
                 vertexElements.push(
                 bottomLeftX, bottomLeftY, // bottom left
                 bottomLeftX + width, bottomLeftY, // bottom right
                 bottomLeftX, bottomLeftY + height, // top left
                   bottomLeftX + width, bottomLeftY, // bottom right
                 bottomLeftX, bottomLeftY + height, // top left
                 bottomLeftX + width, bottomLeftY + height // top right
                 );*/

                outTextureElements.push(posX, posY, posX + width, posY, posX, posY + height, posX + width, posY + height);
            }

            // TODO: not sure kern should actually be added to the pen or just help with the offset when drawing.
            pen.x = pen.x + fontStyle.getLetterSpacing() + (xAdvance + kern) * scale;

            // return the last glyph ascii code
            return asciiCode;
        }

        //#endregion

    }, {
        key: "maxDropShadowOffsetX",
        get: function get() {
            if (this._textureWidth !== 0 && this._fontStyle != null) {
                return this._fontStyle.getSpread() / this._textureWidth;
            }
            return 0;
        }
    }, {
        key: "maxDropShadowOffsetY",
        get: function get() {
            if (this._textureHeight !== 0 && this._fontStyle != null) {
                return this._fontStyle.getSpread() / this._textureHeight;
            }
            return 0;
        }
    }], [{
        key: "restore",
        value: function restore(data) {
            var superRestore = _get(Text.__proto__ || Object.getPrototypeOf(Text), "restore", this).call(this, data);

            var text = new Text();
            text.setFontStyle(FontStyle.restore(data.fontStyle));
            text.setWordWrap(data.wordWrap);
            text.setCharacterWrap(data.characterWrap);
            text.setAlign(data.alignType);
            text.setColor(Color.restore(data.color));
            text.setText(data.text);
            text.setGamma(data.gamma);
            text.setStrokeEnabled(data.strokeEnabled);
            text.setStroke(Stroke.restore(data.stroke));
            text.setDropShadowEnabled(data.dropShadowEnabled);
            text.setDropShadow(Stroke.restore(data.dropShadow));
            text.setRawMaxDropShadowOffset(Vector2.restore(data.rawMaxDropShadowOffset));
            text.setDropShadowOffset(Vector2.restore(data.dropShadowOffset));
            text.setDebug(data.debug);

            text.setTextureSrc(data.textureSrc);

            return Objectify.extend(text, superRestore);
        }
    }]);

    return Text;
}(GameObject);

; /**
  * Texture2D class
  */

var Texture2D = function () {

    //#region Constructors

    /**
     * @param {Image} image
     */
    function Texture2D(image) {
        _classCallCheck(this, Texture2D);

        if (!isObjectAssigned(image)) {
            throw new Error("Cannot create Texture2D without an image source");
        }

        // private properties:
        this._uid = generateUID();
        this._source = image;
        this._texture = null;
        this._textureSrc = image.src;
        this._gl = GameManager.renderContext.getContext();

        // Prepare the webgl texture:
        this._texture = this._gl.createTexture();

        // binding
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);

        // Set the parameters so we can render any size image.
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);

        // Upload the image into the texture.
        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._source);

        //this._gl.bindTexture(gl.TEXTURE_2D, null);

        this._hasLoaded = true;
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param path
     * @returns {Promise}
     */


    _createClass(Texture2D, [{
        key: "getUID",


        //#endregion

        /**
         *
         * @returns {Number}
         */
        value: function getUID() {
            return this._uid;
        }

        /**
         *
         */

    }, {
        key: "bind",
        value: function bind() {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        }

        /**
         *
         * @param {Image} imageData
         */

    }, {
        key: "setImageData",
        value: function setImageData(imageData) {
            this._source = imageData;
            this._textureSrc = imageData.src;
        }

        /**
         *
         * @returns {Image}
         */

    }, {
        key: "getImageData",
        value: function getImageData() {
            return this._source;
        }
    }, {
        key: "getTextureSrc",
        value: function getTextureSrc() {
            return this._textureSrc;
        }

        /**
         * Gets the texture width
         * @returns {Number}
         */

    }, {
        key: "getWidth",
        value: function getWidth() {
            return this._source.width;
        }

        /**
         * Gets the texture height
         * @returns {Number}
         */

    }, {
        key: "getHeight",
        value: function getHeight() {
            return this._source.height;
        }

        /**
         * Gets the Texture
         * @returns {WebGLTexture|*|null}
         */

    }, {
        key: "getTexture",
        value: function getTexture() {
            return this._texture;
        }

        /**
         *
         * @returns {boolean}
         */

    }, {
        key: "isReady",
        value: function isReady() {
            return this._hasLoaded;
        }

        /**
           */

    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

    }], [{
        key: "fromPath",
        value: function fromPath(path) {
            return new Promise(function (resolve, reject) {
                ContentLoader.loadImage(path).then(function (image) {
                    resolve(new Texture2D(image));
                }, function () {
                    reject();
                });
            }.bind(this));
        }
    }]);

    return Texture2D;
}();

;AttributeDictionary.addRule("transform", "gameObject", { visible: false });

/**
 * Transform class
 */

var Transform = function () {

    //#region Constructors

    /**
     * @param params
     */
    function Transform(params) {
        _classCallCheck(this, Transform);

        params = params || {};

        // public properties:
        this.gameObject = params.gameObject || null;

        // private properties:
        this._position = params.position || new Vector2();
        this._rotation = params.rotation || 0.0;
        this._scale = params.scale || new Vector2(1.0, 1.0);

        this._overridePositionFunction = null;
        this._overrideRotationFunction = null;
        this._overrideScaleFunction = null;
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    /**
     *
     * @param data
     * @returns {Transform}
     */


    _createClass(Transform, [{
        key: "clearPositionGetter",


        //#endregion

        /**
         *
         */
        value: function clearPositionGetter() {
            this._overridePositionFunction = null;
        }

        /**
         *
         */

    }, {
        key: "clearRotationGetter",
        value: function clearRotationGetter() {
            this._overrideRotationFunction = null;
        }

        /**
         *
         */

    }, {
        key: "clearScaleGetter",
        value: function clearScaleGetter() {
            this._overrideScaleFunction = null;
        }

        /**
         *
         * @param overrideFunction
         */

    }, {
        key: "overridePositionGetter",
        value: function overridePositionGetter(overrideFunction) {
            this._overridePositionFunction = overrideFunction;
        }

        /**
         *
         * @param overrideFunction
         */

    }, {
        key: "overrideScaleGetter",
        value: function overrideScaleGetter(overrideFunction) {
            this._overrideScaleFunction = overrideFunction;
        }

        /**
         *
         * @param overrideFunction
         */

    }, {
        key: "overrideRotationGetter",
        value: function overrideRotationGetter(overrideFunction) {
            this._overrideRotationFunction = overrideFunction;
        }

        /**
         *
         * @param position
         */

    }, {
        key: "lookAt",
        value: function lookAt(position) {
            var direction = this.getPosition().subtract(position).normalize();
            this.setRotation(Math.atan2(direction.y, direction.x));
        }

        /**
         *
         * @param x
         * @param y
         */

    }, {
        key: "setPosition",
        value: function setPosition(x, y) {
            this._position.set(x, y);
            this.gameObject.propagatePropertyUpdate("Position", this._position);
        }

        /**
         *
         * @returns {*}
         */

    }, {
        key: "getPosition",
        value: function getPosition() {
            if (isFunction(this._overridePositionFunction)) {
                return this._overridePositionFunction();
            }

            return this._position;
        }

        /**
         *
         * @param x
         * @param y
         */

    }, {
        key: "translate",
        value: function translate(x, y) {
            var curPos = this.getPosition();
            this.setPosition(curPos.x + (x || 0), curPos.y + (y || 0));
        }

        /**
         *
         * @param value
         */

    }, {
        key: "rotate",
        value: function rotate(value) {
            this.setRotation(this.getRotation() + (value || 0));
        }

        /**
         *
         * @param x
         * @param y
         */

    }, {
        key: "scale",
        value: function scale(x, y) {
            var curScale = this.getScale();
            this.setPosition(curScale.x + (x || 0), curScale.y + (y || 0));
        }

        /**
         *
         * @param value
         */

    }, {
        key: "setRotation",
        value: function setRotation(value) {
            this._rotation = value;
            this.gameObject.propagatePropertyUpdate("Rotation", this._rotation);
        }

        /**
         *
         * @returns {*}
         */

    }, {
        key: "getRotation",
        value: function getRotation() {
            if (isFunction(this._overrideRotationFunction)) {
                return this._overrideRotationFunction();
            }

            return this._rotation;
        }

        /**
         *
         * @param x
         * @param y
         */

    }, {
        key: "setScale",
        value: function setScale(x, y) {
            this._scale.set(x, y || x);
            this.gameObject.propagatePropertyUpdate("Scale", this._scale);
        }

        /**
         *
         * @returns {*}
         */

    }, {
        key: "getScale",
        value: function getScale() {
            if (isFunction(this._overrideScaleFunction)) {
                return this._overrideScaleFunction();
            }

            return this._scale;
        }

        /**
         *
         * @returns {Transform}
         */

    }, {
        key: "clone",
        value: function clone() {
            return Transform.restore(this.objectify());
        }

        /**
         *
         * @returns {{position: {x, y}, rotation: (*|number), scale: {x, y}}}
         */

    }, {
        key: "objectify",
        value: function objectify() {
            return {
                position: this._position.objectify(),
                rotation: this._rotation,
                scale: this._scale.objectify()
            };
        }

        /**
         *
         */

    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

    }], [{
        key: "restore",
        value: function restore(data) {
            return new Transform({
                position: Vector2.restore(data.position),
                rotation: data.rotation,
                scale: Vector2.restore(data.scale)
            });
        }
    }]);

    return Transform;
}();

;var WrapMode = {
    CLAMP: 0,
    REPEAT: 1
};; // unique key
var _keyboardSingleton = Symbol('keyboardSingleton');

/**
 * Global Keyboard handler
 */

var Keyboard = function () {

    //#region Constructors

    function Keyboard(keyboardSingletonToken) {
        _classCallCheck(this, Keyboard);

        if (_keyboardSingleton !== keyboardSingletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
        this._keys = [];
    }

    //#endregion

    //#region Methods

    //#region Static Methods

    _createClass(Keyboard, [{
        key: "removeKey",


        //#endregion


        value: function removeKey(key) {
            var idx = this._keys.indexOf(key);
            if (idx >= 0) {
                this._keys.splice(idx, 1);
            }
        }
    }, {
        key: "removeKeys",
        value: function removeKeys(keys) {
            keys.forEach(function (key) {
                this.removeKey(key);
            }.bind(this));
        }
    }, {
        key: "addKey",
        value: function addKey(key) {
            if (this._keys.indexOf(key) < 0) {
                this._keys.push(key);
            }
        }
    }, {
        key: "addKeys",
        value: function addKeys(keys) {
            keys.forEach(function (key) {
                this.addKey(key);
            }.bind(this));
        }
    }, {
        key: "setKeys",
        value: function setKeys(keys) {
            this._keys = keys;
        }
    }, {
        key: "clearKeys",
        value: function clearKeys() {
            this._keys = [];
        }
    }, {
        key: "getState",
        value: function getState() {
            return new KeyboardState(this._keys);
        }

        /**
         * Gets if the given key is currently being pressed
         * @param key
         * @returns {boolean}
         */

    }, {
        key: "isKeyDown",
        value: function isKeyDown(key) {
            return this._keys.indexOf(key) >= 0;
        }

        /**
         * Gets if the given key is not currently being pressed
         * @param key
         * @returns {boolean}
         */

    }, {
        key: "isKeyUp",
        value: function isKeyUp(key) {
            return this._keys.indexOf(key) < 0;
        }

        //#endregion

    }], [{
        key: "instance",
        get: function get() {
            if (!this[_keyboardSingleton]) {
                this[_keyboardSingleton] = new Keyboard(_keyboardSingleton);
            }

            return this[_keyboardSingleton];
        }
    }]);

    return Keyboard;
}();

; /**
  * Keyboard state Class
  */

var KeyboardState = function () {

    //#region Constructors

    /**
     * @param keys
     */
    function KeyboardState(keys) {
        _classCallCheck(this, KeyboardState);

        // now we copy the values to our state array.
        this._keys = [];
        keys.forEach(function (key) {
            this._keys.push(key);
        }.bind(this));
    }

    //#endregion

    //#region Methods

    /**
     * Gets the keys currently being pressed
     * @returns {Array}
     */


    _createClass(KeyboardState, [{
        key: "getKeys",
        value: function getKeys() {
            return this._keys;
        }

        /**
         * Gets if the given key is currently being pressed
         * @param key
         * @returns {boolean}
         */

    }, {
        key: "isKeyDown",
        value: function isKeyDown(key) {
            return this._keys.indexOf(key) >= 0;
        }

        /**
         * Gets if the given key is not currently being pressed
         * @param key
         * @returns {boolean}
         */

    }, {
        key: "isKeyUp",
        value: function isKeyUp(key) {
            return this._keys.indexOf(key) < 0;
        }

        //#endregion

    }]);

    return KeyboardState;
}();

; /**
  *  Keys Class
  */

var Keys = function Keys() {
    _classCallCheck(this, Keys);
};

/**
 *  Static Properties
 */


Keys.Backspace = 8;
Keys.Tab = 9;
Keys.Enter = 13;
Keys.Shift = 16;
Keys.Ctrl = 17;
Keys.Alt = 18;
Keys.Pause = 19;
Keys.Break = 19;
Keys.CapsLock = 20;
Keys.Escape = 27;
Keys.PageUp = 33;
Keys.PageDown = 34;
Keys.End = 35;
Keys.Home = 36;
Keys.LeftArrow = 37;
Keys.UpArrow = 38;
Keys.RightArrow = 39;
Keys.DownArrow = 40;
Keys.Insert = 45;
Keys.Delete = 46;
Keys.Space = 32;
Keys.D0 = 48;
Keys.D1 = 49;
Keys.D2 = 50;
Keys.D3 = 51;
Keys.D4 = 52;
Keys.D5 = 53;
Keys.D6 = 54;
Keys.D7 = 55;
Keys.D8 = 56;
Keys.D9 = 57;
Keys.A = 65;
Keys.B = 66;
Keys.C = 67;
Keys.D = 68;
Keys.E = 69;
Keys.F = 70;
Keys.G = 71;
Keys.H = 72;
Keys.I = 73;
Keys.J = 74;
Keys.K = 75;
Keys.L = 76;
Keys.M = 77;
Keys.N = 78;
Keys.O = 79;
Keys.P = 80;
Keys.Q = 81;
Keys.R = 82;
Keys.S = 83;
Keys.T = 84;
Keys.U = 85;
Keys.V = 86;
Keys.W = 87;
Keys.X = 88;
Keys.Y = 89;
Keys.Z = 90;
Keys.LeftWindowKey = 91;
Keys.RightWindowKey = 92;
Keys.SelectKey = 93;
Keys.NumPad0 = 96;
Keys.NumPad1 = 97;
Keys.NumPad2 = 98;
Keys.NumPad3 = 99;
Keys.NumPad4 = 100;
Keys.NumPad5 = 101;
Keys.NumPad6 = 102;
Keys.NumPad7 = 103;
Keys.NumPad8 = 104;
Keys.NumPad9 = 105;
Keys.Multiply = 106;
Keys.Add = 107;
Keys.Subtract = 109;
Keys.DecimalPoint = 110;
Keys.Divide = 111;
Keys.F1 = 112;
Keys.F2 = 113;
Keys.F3 = 114;
Keys.F4 = 115;
Keys.F5 = 116;
Keys.F6 = 117;
Keys.F7 = 118;
Keys.F8 = 119;
Keys.F9 = 120;
Keys.F10 = 121;
Keys.F11 = 122;
Keys.F12 = 123;
Keys.NumLock = 144;
Keys.ScrollLock = 145;
Keys.SemiColon = 186;
Keys.EqualSign = 187;
Keys.Comma = 188;
Keys.Dash = 189;
Keys.Period = 190;
Keys.ForwardSlash = 191;
Keys.GraveAccent = 192;
Keys.OpenBracket = 219;
Keys.BackSlash = 220;
Keys.CloseBraket = 221;
Keys.SingleQuote = 222;
; /**
  * WebGLContext Class
  */

var WebGLContext = function () {

    //#region Constructors

    function WebGLContext(params) {
        _classCallCheck(this, WebGLContext);

        params = params || {};

        // public properties:

        // private properties:
        this._logger = new Logger("WebGLContext");
        this._canvas = null;
        this._gl = null;

        if (isObjectAssigned(params.renderContainer)) {
            this.assignContextFromContainer(params.renderContainer);
        }
    }

    //#endregion

    //#region Methods

    _createClass(WebGLContext, [{
        key: "setVirtualResolution",
        value: function setVirtualResolution(width, height) {
            if (isObjectAssigned(this._gl)) {
                this._canvas.width = width;
                this._canvas.height = height;

                this._gl.viewport(0, 0, width, height);
            }
        }
    }, {
        key: "assignContextFromContainer",
        value: function assignContextFromContainer(canvas) {
            // let's try to get the webgl context from the given container:
            // alpha is set to false to avoid webgl picking up the canvas color and place it on the alpha channel
            // see: http://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
            var gl = this._gl = canvas.getContext("experimental-webgl", { alpha: false }) || canvas.getContext("webgl", { alpha: false }) || canvas.getContext("webkit-3d", { alpha: false }) || canvas.getContext("moz-webgl", { alpha: false });

            if (!isObjectAssigned(this._gl)) {
                this._logger.warn("WebGL not supported, find a container that does (eg. Chrome, Firefox)");
                return;
            }

            this._canvas = canvas;

            // disable gl functions:
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.DEPTH_TEST);

            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

            // enable gl functions:
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }
    }, {
        key: "getName",
        value: function getName() {
            return SC.WEBGL;
        }
    }, {
        key: "getContext",
        value: function getContext() {
            return this._gl;
        }
    }, {
        key: "unload",
        value: function unload() {}

        //#endregion

    }]);

    return WebGLContext;
}();

; /**
  * WebGL Utils class
  *
  * Some boilerplate code fetched from Gregg Tavares webgl utilities
  * http://webglfundamentals.org/webgl/resources/webgl-utils.js
  */

var WebGLUtils = function () {

    //#region Constructors

    function WebGLUtils() {
        _classCallCheck(this, WebGLUtils);

        // private fields
        this._logger = new Logger("WebGLUtils");
    }

    //#endregion

    //#region Methods

    /**
     * Compiles a shader
     * @param gl
     * @param shaderSource
     * @param shaderType
     */


    _createClass(WebGLUtils, [{
        key: "_compileShader",
        value: function _compileShader(gl, shaderSource, shaderType) {
            // Create the shader object
            var shader = gl.createShader(shaderType);

            // Load the shader source
            gl.shaderSource(shader, shaderSource);

            // Compile the shader
            gl.compileShader(shader);

            // Check the compile status
            var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compiled) {
                // Something went wrong during compilation; get the error
                var lastError = gl.getShaderInfoLog(shader);

                this._logger.error("Error compiling shader '" + shader + "':" + lastError);

                gl.deleteShader(shader);

                return null;
            }

            return shader;
        }

        /**
         * Creates a program from 2 shaders.
         * @param gl
         * @param vertexShader
         * @param fragmentShader
         * @returns {WebGLProgram}
         */

    }, {
        key: "createProgram",
        value: function createProgram(gl, vertexShader, fragmentShader) {
            // create a program.
            var program = gl.createProgram();

            // attach the shaders.
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);

            // link the program.
            gl.linkProgram(program);

            // Check if it linked.
            var success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!success) {
                // something went wrong with the link
                this._logger.error("Program filed to link:" + gl.getProgramInfoLog(program));
                // TEST: gl.getError() has more info?
            }

            return program;
        }

        /**
         * Creates a shader from the script string
         * @param gl
         * @param script
         * @param shaderType
         * @returns {null}
         */

    }, {
        key: "createShader",
        value: function createShader(gl, script, shaderType) {
            // If we didn't pass in a type, use the 'type' from
            // the script tag.
            var glShaderType = void 0;
            if (shaderType === "vertex") {
                glShaderType = gl.VERTEX_SHADER;
            } else if (shaderType === "fragment") {
                glShaderType = gl.FRAGMENT_SHADER;
            } else if (!shaderType) {
                this._logger.warn("Shader type not set, discarding..");
                return null;
            }

            return this._compileShader(gl, script, glShaderType);
        }

        /**
         * Creates a shader from the content of a script tag
         * @param gl
         * @param scriptId
         * @param shaderType
         */

    }, {
        key: "createShaderFromScript",
        value: function createShaderFromScript(gl, scriptId, shaderType) {
            // look up the script tag by id.
            var shaderScriptElem = document.getElementById(scriptId);
            if (!shaderScriptElem) {
                this._logger.warn("Unknown script target element, discarding..");
                return null;
            }

            // extract the contents of the script tag.
            this.createShader(gl, shaderScriptElem.text, shaderType);
        }

        /**
         * Creates a program based on both vertex and fragment given scripts
         * @param gl
         * @param vertexScript
         * @param fragmentScript
         */

    }, {
        key: "createProgramFromScripts",
        value: function createProgramFromScripts(gl, vertexScript, fragmentScript) {
            var vshader = this.createShader(gl, vertexScript, "vertex");
            var fshader = this.createShader(gl, fragmentScript, "fragment");

            if (isObjectAssigned(vshader) && isObjectAssigned(fshader)) {
                return this.createProgram(gl, vshader, fshader);
            } else {
                this._logger.warn("Could not create program because scripts could not be compiled, discarding..");
            }

            // clean up shaders
            gl.deleteShader(vshader);
            gl.deleteShader(fshader);

            return null;
        }

        /**
         * Creates a program based on both vertex and fragment given elements
         * @param gl
         * @param vertexScriptId
         * @param fragmentScriptId
         */

    }, {
        key: "createProgramFromScriptElements",
        value: function createProgramFromScriptElements(gl, vertexScriptId, fragmentScriptId) {
            var vshader = this.createShaderFromScript(gl, vertexScriptId, "vertex");
            var fshader = this.createShaderFromScript(gl, fragmentScriptId, "fragment");

            if (isObjectAssigned(vshader) && isObjectAssigned(fshader)) {
                return this.createProgram(gl, vshader, fshader);
            } else {
                this._logger.warn("Could not create program because scripts could not be compiled, discarding..");
            }

            // clean up shaders
            gl.deleteShader(vshader);
            gl.deleteShader(fshader);

            return null;
        }

        //#endregion

    }]);

    return WebGLUtils;
}();

/* for simplicity sake, add a global instance of the webgl utils */


var glu = new WebGLUtils();

; /**
  * Shader Class
  * Some cool code ideas were applied from Pixi.JS Shader class
  */

var Shader = function () {

    //#region Constructors

    function Shader(vertexScript, fragmentScript, uniforms, attributes) {
        _classCallCheck(this, Shader);

        if (!isObjectAssigned(vertexScript) || !isObjectAssigned(fragmentScript)) {
            throw new Error("Vertex and Fragment scripts are required to create a shader, discarding..");
        }

        if (!isObjectAssigned(GameManager.renderContext)) {
            throw new Error("The WebGL render context is not yet set, can't create shader.");
        }

        // public properties:
        this.uniforms = uniforms || {};
        this.attributes = attributes || {};

        // private properties:
        this._gl = GameManager.renderContext.getContext();
        this._program = null;
        this._vertexScript = vertexScript;
        this._fragmentScript = fragmentScript;
        this._textureCount = 1;
        this._uid = generateUID();

        this.setup();
    }

    //#endregion

    //#region Methods

    /**
     * Setup shader logic
     */


    _createClass(Shader, [{
        key: "setup",
        value: function setup() {
            if (this.compile()) {
                var shaderManager = GameManager.activeGame.getShaderManager();
                if (shaderManager) {
                    shaderManager.useShader(this);
                } else {
                    this._gl.useProgram(this._program);
                }

                // cache some script locations:
                this.cacheUniformLocations(Object.keys(this.uniforms));
                this.cacheAttributeLocations(Object.keys(this.attributes));
            } else {
                debug.error("Shader setup failed");
            }
        }

        /**
         * Compiles the shader and generates the shader program
         * @returns {boolean}
         */

    }, {
        key: "compile",
        value: function compile() {
            var program = glu.createProgramFromScripts(this._gl, this._vertexScript, this._fragmentScript);

            if (isObjectAssigned(program)) {
                this._program = program;

                return true;
            } else {
                program = null;
            }

            return false;
        }

        /**
         * Gets the unique id of this shader instance
         */

    }, {
        key: "getUID",
        value: function getUID() {
            return this._uid;
        }

        /**
         * Cache the uniform locations for faster re-utilization
         * @param keys
         */

    }, {
        key: "cacheUniformLocations",
        value: function cacheUniformLocations(keys) {
            for (var i = 0; i < keys.length; ++i) {
                var type = _typeof(this.uniforms[keys[i]]);

                if (type !== "object") {
                    debug.warn("Shader's uniform " + keys[i] + " is not an object.");
                    continue;
                }

                this.uniforms[keys[i]]._location = this._gl.getUniformLocation(this._program, keys[i]);
            }
        }

        /**
         * Cache the attribute locations for faster re-utilization
         * @param keys
         */

    }, {
        key: "cacheAttributeLocations",
        value: function cacheAttributeLocations(keys) {
            for (var i = 0; i < keys.length; ++i) {
                this.attributes[keys[i]] = this._gl.getAttribLocation(this._program, keys[i]);
            }
        }

        /**
         * Syncs all the uniforms attached to this shader
         */

    }, {
        key: "syncUniforms",
        value: function syncUniforms() {
            this._textureCount = 1;

            for (var key in this.uniforms) {
                this.syncUniform(this.uniforms[key]);
            }
        }

        /**
         * Synchronizes/updates the values for the given uniform
         * @param uniform
         */

    }, {
        key: "syncUniform",
        value: function syncUniform(uniform) {
            var location = uniform._location;
            var value = uniform.value;
            var gl = this._gl;

            // depending on the uniform type, WebGL has different ways of synchronizing values
            // the values can either be a Float32Array or JS Array object
            switch (uniform.type) {
                case 'b':
                case 'bool':
                    gl.uniform1i(location, value ? 1 : 0);
                    break;
                case 'i':
                case '1i':
                    gl.uniform1i(location, value);
                    break;
                case '2i':
                    gl.uniform2i(location, value[0], value[1]);
                    break;
                case '3i':
                    gl.uniform3i(location, value[0], value[1], value[2]);
                    break;
                case '4i':
                    gl.uniform4i(location, value[0], value[1], value[2], value[3]);
                    break;
                case 'f':
                case '1f':
                    gl.uniform1f(location, value);
                    break;
                case '2f':
                    gl.uniform2f(location, value[0], value[1]);
                    break;
                case '3f':
                    gl.uniform3f(location, value[0], value[1], value[2]);
                    break;
                case '4f':
                    gl.uniform4f(location, value[0], value[1], value[2], value[3]);
                    break;
                case 'm2':
                case 'mat2':
                    // TODO: implement matrix2 transpose
                    gl.uniformMatrix2fv(location, uniform.transpose, value);
                    break;
                case 'm3':
                case 'mat3':
                    // TODO: implement matrix3 transpose
                    gl.uniformMatrix3fv(location, uniform.transpose, value);
                    break;
                case 'm4':
                case 'mat4':
                    // TODO: implement matrix4 transpose
                    gl.uniformMatrix4fv(location, uniform.transpose, value);
                    break;
                case 'tex':
                    if (!isTexture2D(uniform.value) || !uniform.value.isReady()) {
                        debug.warn("Could not assign texture uniform because the texture isn't ready.");
                        break;
                    }

                    gl.activeTexture(gl["TEXTURE" + this._textureCount]);

                    var texture = uniform.value.getImageData()._glTextures[gl.id];

                    // the texture was already sampled?
                    if (!isObjectAssigned(texture)) {
                        // TODO: do stuff here? :D
                    }

                    break;
                default:
                    debug.warn("Unknown uniform type: " + uniform.type);
                    break;
            }
        }
    }, {
        key: "getProgram",
        value: function getProgram() {
            return this._program;
        }
    }, {
        key: "initSampler2D",
        value: function initSampler2D(uniform) {
            if (!isTexture2D(uniform.value) || !uniform.value.isReady()) {
                debug.warn("Could not initialize sampler2D because the texture isn't ready.");
                return;
            }

            var imgData = uniform.value.getImageData();
            var texture = imgData.baseTexture;
        }
    }, {
        key: "unload",
        value: function unload() {
            // clean up program using WebGL flow
            this._gl.deleteProgram(this._program);
        }

        //#endregion

    }]);

    return Shader;
}();

; /**
  * ShaderManager class
  */

var ShaderManager = function () {

    //#region Constructors

    /**
     * @param game
     * @constructor
     */
    function ShaderManager(game) {
        _classCallCheck(this, ShaderManager);

        // private variables
        this._game = game;
        this._gl = this._game.getRenderContext().getContext();
        this._activeShader = null;
    }

    //#endregion

    //#region Methods

    _createClass(ShaderManager, [{
        key: "unload",
        value: function unload() {}
    }, {
        key: "useShader",
        value: function useShader(shader) {
            // is this the same shader that is being used?
            if (!isObjectAssigned(this._activeShader) || this._activeShader.getUID() !== shader.getUID()) {
                this._activeShader = shader;
                this._gl.useProgram(shader.getProgram());
            }
        }

        //#endregion

    }]);

    return ShaderManager;
}();

; /**
  * Created by Luis on 16/12/2016.
  */

/**
 * TestShader Class
 */

var TestShader = function (_Shader) {
    _inherits(TestShader, _Shader);

    _createClass(TestShader, null, [{
        key: "shaderContent",
        get: function get() {
            return {
                vertex: [
                // an attribute will receive data from a buffer
                'attribute vec4 a_position;',

                // all shaders have a main function
                'void main() {',
                // gl_Position is a special variable a vertex shader
                // is responsible for setting
                'gl_Position = a_position;', '}'].join('\n'),
                fragment: [
                // fragment shaders don't have a default precision so we need
                // to pick one. mediump is a good default
                'precision mediump float;', 'void main() {',
                // gl_FragColor is a special variable a fragment shader
                // is responsible for setting
                'gl_FragColor = vec4(1, 0, 0.5, 1);', '}'].join('\n'),
                uniforms: {},
                attributes: {
                    a_position: 0
                }
            };
        }
    }]);

    function TestShader() {
        _classCallCheck(this, TestShader);

        var content = TestShader.shaderContent;

        return _possibleConstructorReturn(this, (TestShader.__proto__ || Object.getPrototypeOf(TestShader)).call(this, content.vertex, content.fragment, content.uniforms, content.attributes));
    }

    return TestShader;
}(Shader);

; /**
  * Created by Luis on 16/12/2016.
  */

/**
 * TextShader Class
 */

var TextShader = function (_Shader2) {
    _inherits(TextShader, _Shader2);

    _createClass(TextShader, null, [{
        key: "shaderContent",
        get: function get() {
            return {
                vertex: ['attribute vec2 aPos;', 'attribute vec2 aTexCoord;', 'uniform mat4 uMatrix;', 'uniform mat4 uTransform;', 'uniform vec2 uTexSize;', 'varying vec2 vTexCoord;', 'void main() {', '   gl_Position = uMatrix * uTransform * vec4(aPos, 0, 1);', '   vTexCoord = aTexCoord / uTexSize;', '}'].join('\n'),
                fragment: ['#ifdef GL_ES', '   precision mediump float;', '#endif', 'uniform sampler2D uTexture;', 'uniform vec4 uColor;', 'uniform float uGamma;', 'uniform float uOutlineDistance;', 'uniform vec4 uOutlineColor;', 'uniform vec4 uDropShadowColor;', 'uniform float uDropShadowSmoothing;', 'uniform vec2 uDropShadowOffset;', 'uniform float uDebug;', 'uniform float uDropShadow;', 'uniform float uOutline;', 'varying vec2 vTexCoord;', 'void main() {', '   float distance = texture2D(uTexture, vTexCoord).a;', '   vec4 finalColor = uColor;', '   if (uDebug > 0.0) {', '       gl_FragColor = vec4(distance, distance, distance, 1);', '       return;', '   }',
                // outline effect
                '   if (uOutline > 0.0) {', '       float outlineFactor = smoothstep(0.5 - uGamma, 0.5 + uGamma, distance);', '       vec4 color = mix(uOutlineColor, uColor, outlineFactor);', '       float alpha = smoothstep(uOutlineDistance - uGamma, uOutlineDistance + uGamma, distance);', '       finalColor = vec4(color.rgb, color.a * alpha);', '   } else {', '       float alpha = smoothstep(0.5 - uGamma, 0.5 + uGamma, distance);', '       finalColor = vec4(uColor.rgb, uColor.a * alpha);', '   }',
                // drop shadow effect
                //'     float alpha = smoothstep(0.5 - uGamma, 0.5 + uGamma, distance);',
                //'     vec4 text = vec4(uColor.rgb, uColor.a * alpha);',
                '   if (uDropShadow > 0.0) {', '       float shadowDistance = texture2D(uTexture, vTexCoord - uDropShadowOffset).a;', '       float shadowAlpha = smoothstep(0.5 - uDropShadowSmoothing, 0.5 + uDropShadowSmoothing, shadowDistance);', '       vec4 shadow = vec4(uDropShadowColor.rgb, uDropShadowColor.a * shadowAlpha);',
                //      inner effect is the other way around... text, shadow
                '       gl_FragColor = mix(shadow, finalColor, finalColor.a);', '       return;', '   }', '   gl_FragColor = finalColor;', '}'].join('\n'),
                uniforms: {
                    uMatrix: { type: 'mat4', value: new Float32Array(16) },
                    uTransform: { type: 'mat4', value: new Float32Array(16) },
                    uTexture: { type: 'tex', value: 0 },
                    uTexSize: { type: '1i', value: 24 },
                    uColor: [1.0, 0.0, 0.0, 1.0],
                    uOutlineColor: [1.0, 1.0, 1.0, 1.0],
                    uDropShadowColor: [0.0, 0.0, 0.0, 1.0],
                    uDropShadowSmoothing: { type: '1i', value: 0 },
                    uDropShadowOffset: [0.0, 0.0],
                    uOutlineDistance: { type: '1i', value: 0 },
                    uGamma: { type: '1i', value: 0 },
                    uDebug: { type: '1i', value: 1 },
                    uDropShadow: { type: '1i', value: 1 },
                    uOutline: { type: '1i', value: 1 }
                },
                attributes: {
                    aPos: 0,
                    aTexCoord: 0
                }
            };
        }
    }]);

    function TextShader() {
        _classCallCheck(this, TextShader);

        var content = TextShader.shaderContent;

        return _possibleConstructorReturn(this, (TextShader.__proto__ || Object.getPrototypeOf(TextShader)).call(this, content.vertex, content.fragment, content.uniforms, content.attributes));
    }

    return TextShader;
}(Shader);

; /**
  * TextureShader Class
  */

var TextureShader = function (_Shader3) {
    _inherits(TextureShader, _Shader3);

    _createClass(TextureShader, null, [{
        key: "shaderContent",
        get: function get() {
            return {
                vertex: ['precision mediump float;', 'attribute vec2 aVertexPosition;', 'attribute vec2 aTextureCoord;', 'uniform mat4 uMatrix;', 'uniform mat4 uTransform;', 'varying vec2 vTextureCoord;', 'void main(void){', '   gl_Position = uMatrix * uTransform * vec4(aVertexPosition, 0.0, 1.0);', '   vTextureCoord = aTextureCoord;', '}'].join('\n'),
                fragment: ['precision mediump float;', 'varying vec2 vTextureCoord;', 'varying vec4 vColor;', 'uniform sampler2D uSampler;', 'uniform vec4 uColor;', 'void main(void){', '   gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;', '}'].join('\n'),
                uniforms: {
                    uSampler: { type: 'tex', value: 0 },
                    uMatrix: { type: 'mat4', value: new Float32Array(16) },
                    uTransform: { type: 'mat4', value: new Float32Array(16) },
                    uColor: [1.0, 1.0, 1.0, 1.0]
                },
                attributes: {
                    aVertexPosition: 0,
                    aTextureCoord: 0
                }
            };
        }
    }]);

    function TextureShader() {
        _classCallCheck(this, TextureShader);

        var content = TextureShader.shaderContent;

        return _possibleConstructorReturn(this, (TextureShader.__proto__ || Object.getPrototypeOf(TextureShader)).call(this, content.vertex, content.fragment, content.uniforms, content.attributes));
    }

    return TextureShader;
}(Shader);

; /**
  * PrimitiveShader Class
  */

var PrimitiveShader = function (_Shader4) {
    _inherits(PrimitiveShader, _Shader4);

    _createClass(PrimitiveShader, null, [{
        key: "shaderContent",
        get: function get() {
            return {
                vertex: ['attribute vec2 aVertexPosition;', 'uniform mat4 uMatrix;', 'uniform mat4 uTransform;', 'uniform float uPointSize;', 'void main(void) {', '   gl_PointSize = uPointSize;', '   gl_Position = uMatrix * uTransform * vec4(aVertexPosition, 0.0, 1.0);', '}'].join('\n'),
                fragment: ['precision mediump float;', 'uniform vec4 uColor;', 'void main(void) {', '   gl_FragColor = uColor;', '}'].join('\n'),
                uniforms: {
                    uMatrix: { type: 'mat4', value: new Float32Array(16) },
                    uTransform: { type: 'mat4', value: new Float32Array(16) },
                    uColor: [0.0, 0.0, 0.0, 1.0],
                    uPointSize: { type: '1i', value: 2 }
                },
                attributes: {
                    aVertexPosition: 0
                }
            };
        }
    }]);

    function PrimitiveShader() {
        _classCallCheck(this, PrimitiveShader);

        var content = PrimitiveShader.shaderContent;

        return _possibleConstructorReturn(this, (PrimitiveShader.__proto__ || Object.getPrototypeOf(PrimitiveShader)).call(this, content.vertex, content.fragment, content.uniforms, content.attributes));
    }

    return PrimitiveShader;
}(Shader);
