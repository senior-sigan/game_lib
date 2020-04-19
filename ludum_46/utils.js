function distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function randint(min_, max_) {
    return (Math.random() * max_ + min_) >> 0;
}

function randChoice(array) {
    return array[randint(0, array.length)];
}

function intersectAABB(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

function forEach(collection, lambda) {
    if (Array.isArray(collection)) {
        collection.forEach(lambda);
        return;
    }
    if (isObject(collection)){
        Object.keys(collection).forEach(function (key, index) {
            lambda(collection[key], key, index);
        });
        return;
    }
    trace("WARNING: forEach over type ", typeof(collection));
}

function find(what, collection, key) {
    var res = [];
    if (!key) {
        key = function(el) {
            return el;
        }
    }
    forEach(collection, function(value){
        if (what === key(value)) {
            res.push(value);
        }
    });
    return res;
}

function findOne(collection, predicate) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (predicate(collection[i])) {
                return collection[i];
            }
        }
        return;
    }
    if (isObject(collection)) {
        var keys = Object.keys(collection);
        for (var i = 0; i <keys.length; i++) {
            if (predicate(collection[keys[i]])) {
                return collection[keys[i]];
            }
        }
        return;
    }
    trace("WARNING: findOne over type ", typeof(collection));
}

function isObject(test) {
    return typeof(test) === 'object'
}

function toJson(object) {
    var str = "";
    forEach(object, function (value, key) {
        str += key + ": " + value + ", ";
    });

    return '{' + str + '}';
}

function len(collection) {
    if (Array.isArray(collection)) return collection.length;
    return Object.keys(collection).length;
}

function Animation(frames, animationSpeed, initTime) {
    this.frames = frames;
    this.currentFrame = 0;
    this.time = initTime;
    this.animationSpeed = animationSpeed;
}

Animation.prototype.update = function () {
    this.time += DELTA_TIME;
    if (this.time >= this.animationSpeed) {
        this.time = 0;
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }
    return this.frames[this.currentFrame];
}

function _build_id_generator() {
    var _ID_ = 0;
    return function () {
        _ID_++;
        return _ID_;
    }
}

function draw_sprite_with_border(obj, x, y, offset) {
    if (!offset) {
        offset = 1;
    }
    draw_rect(x, y, obj.width + offset * 2, obj.height + offset * 2, 1);
    draw_sprite(obj.sprite, x + offset, y + offset);
    return {
        width: obj.width + offset * 2,
        height: obj.height + offset * 2
    }
}

function concat(collections) {
    var res = {};
    collections.forEach(function(collection) {
        utils.forEach(collection, function(value, key) {
           res[key] = value;
        });
    });
    return res;
}

module.exports = {
    nextID: _build_id_generator(),
    Animation: Animation,
    randChoice: randChoice,
    randint: randint,
    intersectAABB: intersectAABB,
    distance: distance,
    forEach: forEach,
    len: len,
    draw_sprite_with_border: draw_sprite_with_border,
    find: find,
    findOne: findOne,
    toJson: toJson,
    concat: concat
}