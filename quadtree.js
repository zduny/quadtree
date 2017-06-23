if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Quadtree'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Quadtree'.");
}
var Quadtree = function (_, Kotlin) {
  'use strict';
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Pair = Kotlin.kotlin.Pair;
  var lazy = Kotlin.kotlin.lazy_klfg04$;
  Tree$Node.prototype = Object.create(Tree.prototype);
  Tree$Node.prototype.constructor = Tree$Node;
  Tree$Nil.prototype = Object.create(Tree.prototype);
  Tree$Nil.prototype.constructor = Tree$Nil;
  function Property(value) {
    this.value = value;
  }
  Property.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Property',
    interfaces: []
  };
  Property.prototype.component1 = function () {
    return this.value;
  };
  Property.prototype.copy_11rb$ = function (value) {
    return new Property(value === void 0 ? this.value : value);
  };
  Property.prototype.toString = function () {
    return 'Property(value=' + Kotlin.toString(this.value) + ')';
  };
  Property.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Property.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.value, other.value))));
  };
  function main$step($receiver, x) {
    return new Vector2(step_0($receiver.x, x.x), step_0($receiver.y, x.y));
  }
  function main$createQuadTree$leaf() {
    return new Tree$Node(new Property(0.0), listOf([Tree$Nil_getInstance(), Tree$Nil_getInstance(), Tree$Nil_getInstance(), Tree$Nil_getInstance()]));
  }
  function main$createQuadTree$nilOrTree(closure$depth, closure$createQuadTree, closure$leaf) {
    return function () {
      return Math.random() > 1.0 / Math.pow(closure$depth, 1.5) ? closure$createQuadTree(closure$depth - 1 | 0) : closure$leaf();
    };
  }
  function main$createQuadTree(depth) {
    var leaf = main$createQuadTree$leaf;
    var nilOrTree = main$createQuadTree$nilOrTree(depth, main$createQuadTree, leaf);
    return depth === 0 ? leaf() : new Tree$Node(new Property(0.0), listOf([nilOrTree(), nilOrTree(), nilOrTree(), nilOrTree()]));
  }
  function main$resize(closure$canvas, closure$middle) {
    return function () {
      var dpi = window.devicePixelRatio;
      closure$canvas.width = floor(closure$canvas.clientWidth * dpi);
      closure$canvas.height = floor(closure$canvas.clientHeight * dpi);
      closure$middle.v = new Vector2(closure$canvas.width / 2.0, closure$canvas.height / 2.0);
    };
  }
  function main$draw(closure$c) {
    return function closure$draw($receiver, position, width) {
      if (Kotlin.isType($receiver, Tree$Nil))
        return;
      else if (Kotlin.isType($receiver, Tree$Node)) {
        var half = width / 2;
        closure$c.lineWidth = 1.0;
        closure$c.strokeStyle = 'black';
        closure$c.beginPath();
        closure$c.rect(floor(position.x - half) + 0.5, floor(position.y - half) + 0.5, floor(width), floor(width));
        if (Kotlin.isType($receiver, Tree$Node)) {
          closure$c.fillStyle = 'rgba(255,255,0,' + $receiver.value.value;
          closure$c.fill();
        }
        closure$c.stroke();
        var halfHalf = half / 2.0;
        closure$draw($receiver.children.get_za3lpa$(0), position.plus_xliypu$(new Vector2(-halfHalf, -halfHalf)), half);
        closure$draw($receiver.children.get_za3lpa$(1), position.plus_xliypu$(new Vector2(halfHalf, -halfHalf)), half);
        closure$draw($receiver.children.get_za3lpa$(2), position.plus_xliypu$(new Vector2(-halfHalf, halfHalf)), half);
        closure$draw($receiver.children.get_za3lpa$(3), position.plus_xliypu$(new Vector2(halfHalf, halfHalf)), half);
      }
    };
  }
  function main$intersect$intersect(b, r) {
    var tx1 = (b.topLeft.x - r.origin.x) * r.directionInverse.x;
    var tx2 = (b.bottomRight.x - r.origin.x) * r.directionInverse.x;
    var t0x = Math.min(tx1, tx2);
    var t1x = Math.max(tx1, tx2);
    var ty1 = (b.topLeft.y - r.origin.y) * r.directionInverse.y;
    var ty2 = (b.bottomRight.y - r.origin.y) * r.directionInverse.y;
    var t0y = Math.min(ty1, ty2);
    var t1y = Math.max(ty1, ty2);
    return new Pair(new Vector2(t0x, t0y), new Vector2(t1x, t1y));
  }
  function main$intersect$firstNode(t0, tm) {
    if (t0.x > t0.y) {
      if (tm.y < t0.x)
        return 2;
      else
        return 0;
    }
     else {
      if (tm.x < t0.y)
        return 1;
      else
        return 0;
    }
  }
  function main$intersect$newNode(tm, x, y) {
    if (tm.x < tm.y)
      return x;
    else
      return y;
  }
  function main$intersect$procSubtree(closure$visitor, closure$firstNode, closure$a, closure$newNode) {
    return function closure$procSubtree($receiver, t0, t1) {
      var tmp$;
      var tm = t0.plus_xliypu$(t1).div_14dthe$(2.0);
      if (Kotlin.isType($receiver, Tree$Node)) {
        closure$visitor($receiver);
        if (!$receiver.isLeaf) {
          var currNode = closure$firstNode(t0, tm);
          do {
            tmp$ = currNode;
            if (tmp$ === 0) {
              closure$procSubtree($receiver.children.get_za3lpa$(closure$a.v), t0, tm);
              currNode = closure$newNode(tm, 1, 2);
            }
             else if (tmp$ === 1) {
              closure$procSubtree($receiver.children.get_za3lpa$(1 ^ closure$a.v), new Vector2(tm.x, t0.y), new Vector2(t1.x, tm.y));
              currNode = closure$newNode(new Vector2(t1.x, tm.y), 4, 3);
            }
             else if (tmp$ === 2) {
              closure$procSubtree($receiver.children.get_za3lpa$(2 ^ closure$a.v), new Vector2(t0.x, tm.y), new Vector2(tm.x, t1.y));
              currNode = closure$newNode(new Vector2(tm.x, t1.y), 3, 4);
            }
             else if (tmp$ === 3) {
              closure$procSubtree($receiver.children.get_za3lpa$(3 ^ closure$a.v), tm, t1);
              currNode = 4;
            }
          }
           while (currNode < 4);
        }
      }
    };
  }
  function main$intersect($receiver, position, width, ray, visitor) {
    var intersect_0 = main$intersect$intersect;
    var half = width / 2;
    var box = new AABB2(position.plus_xliypu$(new Vector2(-half, -half)), position.plus_xliypu$(new Vector2(half, half)));
    var intersection = intersect_0(box, ray);
    var tmp$ = intersection;
    var t0 = tmp$.component1()
    , t1 = tmp$.component2();
    var tmin = Math.max(t0.x, t0.y);
    var tmax = Math.min(t1.x, t1.y);
    var a = {v: 0};
    if (ray.direction.x < 0) {
      a.v = a.v | 1;
    }
    if (ray.direction.y < 0) {
      a.v = a.v | 2;
    }
    if (tmax >= tmin) {
      var firstNode = main$intersect$firstNode;
      var newNode = main$intersect$newNode;
      var procSubtree = main$intersect$procSubtree(visitor, firstNode, a, newNode);
      procSubtree($receiver, t0, t1);
    }
    return intersection;
  }
  function main$clearTree($receiver) {
    if (Kotlin.isType($receiver, Tree$Node)) {
      $receiver.value.value = 0.0;
      var tmp$;
      tmp$ = $receiver.children.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        main$clearTree(element);
      }
    }
  }
  function main$draw$lambda(closure$a) {
    return function (it) {
      if (it.isLeaf)
        it.value.value = closure$a.v;
      closure$a.v += 0.01;
    };
  }
  function main$draw_0(closure$c, closure$canvas, closure$point1, closure$point2, closure$tree, closure$clearTree, closure$middle, closure$intersect, closure$draw) {
    return function () {
      closure$c.clearRect(0.0, 0.0, closure$canvas.width, closure$canvas.height);
      var ray = toRay(new Segment2(closure$point1.v, closure$point2.v));
      closure$clearTree(closure$tree);
      var a = {v: 0.1};
      var intersection = closure$intersect(closure$tree, closure$middle.v, 512.0, ray, main$draw$lambda(a));
      var tmp$ = intersection;
      var t0 = tmp$.component1()
      , t1 = tmp$.component2();
      var tmin = Math.max(t0.x, t0.y);
      var tmax = Math.min(t1.x, t1.y);
      if (tmax >= tmin) {
        var pmin = ray.times_14dthe$(tmin);
        var pmax = ray.times_14dthe$(tmax);
        closure$c.fillStyle = 'green';
        closure$c.beginPath();
        closure$c.arc(pmin.x, pmin.y, 4.0, 0.0, 2 * Math.PI);
        closure$c.fill();
        closure$c.fillStyle = 'red';
        closure$c.beginPath();
        closure$c.arc(pmax.x, pmax.y, 4.0, 0.0, 2 * Math.PI);
        closure$c.fill();
      }
      closure$draw(closure$tree, closure$middle.v, 512.0);
      closure$c.fillStyle = 'navy';
      closure$c.beginPath();
      closure$c.arc(ray.origin.x, ray.origin.y, 10.0, 0.0, 2 * Math.PI);
      closure$c.fill();
      closure$c.beginPath();
      closure$c.arc(closure$point2.v.x, closure$point2.v.y, 2.0, 0.0, 2 * Math.PI);
      closure$c.fill();
      closure$c.strokeStyle = 'navy';
      closure$c.lineWidth = 1.0;
      closure$c.beginPath();
      closure$c.moveTo(ray.origin.x, ray.origin.y);
      var t = ray.times_14dthe$(10000.0);
      closure$c.lineTo(t.x, t.y);
      closure$c.stroke();
    };
  }
  function main$lambda(closure$resize, closure$draw) {
    return function (it) {
      closure$resize();
      closure$draw();
    };
  }
  function main$lambda_0(closure$point1, closure$point2, closure$draw) {
    return function (it) {
      var tmp$;
      Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : Kotlin.throwCCE();
      var p = new Vector2(it.clientX, it.clientY);
      if (it.button !== Kotlin.toShort(0))
        closure$point1.v = p;
      else
        closure$point2.v = p;
      closure$draw();
    };
  }
  function main$lambda_1(it) {
    it.preventDefault();
  }
  function main(args) {
    var tmp$, tmp$_0;
    var step = main$step;
    var createQuadTree = main$createQuadTree;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    var c = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : Kotlin.throwCCE();
    var middle = {v: new Vector2(canvas.width / 2.0, canvas.height / 2.0)};
    var resize = main$resize(canvas, middle);
    var draw = main$draw(c);
    var intersect = main$intersect;
    var tree = createQuadTree(5);
    var point1 = {v: new Vector2(100.0, 100.0)};
    var point2 = {v: new Vector2(250.0, 200.0)};
    var clearTree = main$clearTree;
    var draw_0 = main$draw_0(c, canvas, point1, point2, tree, clearTree, middle, intersect, draw);
    window.addEventListener('resize', main$lambda(resize, draw_0));
    canvas.onmouseup = main$lambda_0(point1, point2, draw_0);
    canvas.oncontextmenu = main$lambda_1;
    resize();
    draw_0();
  }
  function Tree() {
  }
  function Tree$Node(value, children) {
    Tree.call(this);
    this.value = value;
    this.children = children;
    this.isLeaf$delegate = lazy(Tree$Node$isLeaf$lambda(this));
  }
  Object.defineProperty(Tree$Node.prototype, 'isLeaf', {
    get: function () {
      var $receiver = this.isLeaf$delegate;
      new Kotlin.PropertyMetadata('isLeaf');
      return $receiver.value;
    }
  });
  function Tree$Node$isLeaf$lambda(this$Node) {
    return function () {
      var tmp$;
      tmp$ = this$Node.children.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (!Kotlin.equals(element, Tree$Nil_getInstance()))
          return false;
      }
      return true;
    };
  }
  Tree$Node.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Node',
    interfaces: [Tree]
  };
  function Tree$Nil() {
    Tree$Nil_instance = this;
    Tree.call(this);
  }
  Tree$Nil.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Nil',
    interfaces: [Tree]
  };
  var Tree$Nil_instance = null;
  function Tree$Nil_getInstance() {
    if (Tree$Nil_instance === null) {
      new Tree$Nil();
    }
    return Tree$Nil_instance;
  }
  Tree.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Tree',
    interfaces: []
  };
  function AABB2(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }
  AABB2.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'AABB2',
    interfaces: []
  };
  AABB2.prototype.component1 = function () {
    return this.topLeft;
  };
  AABB2.prototype.component2 = function () {
    return this.bottomRight;
  };
  AABB2.prototype.copy_5e7l48$ = function (topLeft, bottomRight) {
    return new AABB2(topLeft === void 0 ? this.topLeft : topLeft, bottomRight === void 0 ? this.bottomRight : bottomRight);
  };
  AABB2.prototype.toString = function () {
    return 'AABB2(topLeft=' + Kotlin.toString(this.topLeft) + (', bottomRight=' + Kotlin.toString(this.bottomRight)) + ')';
  };
  AABB2.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.topLeft) | 0;
    result = result * 31 + Kotlin.hashCode(this.bottomRight) | 0;
    return result;
  };
  AABB2.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.topLeft, other.topLeft) && Kotlin.equals(this.bottomRight, other.bottomRight)))));
  };
  function inside($receiver, box) {
    return $receiver.x > box.topLeft.x && $receiver.y > box.topLeft.y && $receiver.x < box.bottomRight.x && $receiver.y < box.bottomRight.y;
  }
  function toRadians($receiver) {
    return $receiver * Math.PI / 180;
  }
  function toDegrees($receiver) {
    return $receiver * 180 / Math.PI;
  }
  function clamp($receiver, min, max) {
    return Math.max(min, Math.min(max, $receiver));
  }
  function floor($receiver) {
    return Math.floor($receiver);
  }
  function ceil($receiver) {
    return Math.ceil($receiver);
  }
  function round($receiver) {
    return Math.round($receiver);
  }
  function step_0($receiver, x) {
    return x < $receiver ? 0.0 : 1.0;
  }
  function modulo($receiver, m) {
    return ($receiver % m + m | 0) % m;
  }
  function modulo_0($receiver, m) {
    return ($receiver % m + m) % m;
  }
  function nextHighestPowerOf2($receiver) {
    var v = $receiver;
    v = v - 1 | 0;
    v = v | v >> 1;
    v = v | v >> 2;
    v = v | v >> 4;
    v = v | v >> 8;
    v = v | v >> 16;
    v = v + 1 | 0;
    return v;
  }
  function Ray2(origin, direction) {
    this.origin = origin;
    this.direction = direction.normalized;
    this.directionInverse$delegate = lazy(Ray2$directionInverse$lambda(this));
  }
  Object.defineProperty(Ray2.prototype, 'directionInverse', {
    get: function () {
      var $receiver = this.directionInverse$delegate;
      new Kotlin.PropertyMetadata('directionInverse');
      return $receiver.value;
    }
  });
  Ray2.prototype.times_14dthe$ = function (t) {
    return this.origin.plus_xliypu$(this.direction.times_14dthe$(t));
  };
  Ray2.prototype.equals = function (other) {
    var tmp$, tmp$_0, tmp$_1;
    if (this === other)
      return true;
    Kotlin.isType(tmp$ = other, Ray2) ? tmp$ : Kotlin.throwCCE();
    if (!((tmp$_0 = this.origin) != null ? tmp$_0.equals(other.origin) : null))
      return false;
    if (!((tmp$_1 = this.direction) != null ? tmp$_1.equals(other.direction) : null))
      return false;
    return true;
  };
  Ray2.prototype.hashCode = function () {
    var result = this.origin.hashCode();
    result = (31 * result | 0) + this.direction.hashCode() | 0;
    return result;
  };
  Ray2.prototype.toString = function () {
    return 'Ray2(origin=' + this.origin + ', direction=' + this.direction + ')';
  };
  function Ray2$directionInverse$lambda(this$Ray2) {
    return function () {
      return new Vector2(1 / this$Ray2.direction.x, 1 / this$Ray2.direction.y);
    };
  }
  Ray2.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Ray2',
    interfaces: []
  };
  function Ray3(origin, direction) {
    this.origin = origin;
    this.direction = direction.normalized;
    this.directionInverse$delegate = lazy(Ray3$directionInverse$lambda(this));
  }
  Object.defineProperty(Ray3.prototype, 'directionInverse', {
    get: function () {
      var $receiver = this.directionInverse$delegate;
      new Kotlin.PropertyMetadata('directionInverse');
      return $receiver.value;
    }
  });
  Ray3.prototype.times_14dthe$ = function (t) {
    return this.origin.plus_xliypv$(this.direction.times_14dthe$(t));
  };
  Ray3.prototype.equals = function (other) {
    var tmp$, tmp$_0, tmp$_1;
    if (this === other)
      return true;
    Kotlin.isType(tmp$ = other, Ray3) ? tmp$ : Kotlin.throwCCE();
    if (!((tmp$_0 = this.origin) != null ? tmp$_0.equals(other.origin) : null))
      return false;
    if (!((tmp$_1 = this.direction) != null ? tmp$_1.equals(other.direction) : null))
      return false;
    return true;
  };
  Ray3.prototype.hashCode = function () {
    var result = this.origin.hashCode();
    result = (31 * result | 0) + this.direction.hashCode() | 0;
    return result;
  };
  Ray3.prototype.toString = function () {
    return 'Ray3(origin=' + this.origin + ', direction=' + this.direction + ')';
  };
  function Ray3$directionInverse$lambda(this$Ray3) {
    return function () {
      return new Vector3(1 / this$Ray3.direction.x, 1 / this$Ray3.direction.y, 1 / this$Ray3.direction.z);
    };
  }
  Ray3.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Ray3',
    interfaces: []
  };
  function toRay($receiver) {
    return new Ray2($receiver.p1, $receiver.p2.minus_xliypu$($receiver.p1));
  }
  function toRay_0($receiver) {
    return new Ray3($receiver.p1, $receiver.p2.minus_xliypv$($receiver.p1));
  }
  function distance($receiver, ray) {
    return cross(Vector3_0(ray.direction), Vector3_0($receiver.minus_xliypu$(ray.origin))).length;
  }
  function distance_0($receiver, ray) {
    return cross(ray.direction, $receiver.minus_xliypv$(ray.origin)).length;
  }
  function Segment2(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  Segment2.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Segment2',
    interfaces: []
  };
  Segment2.prototype.component1 = function () {
    return this.p1;
  };
  Segment2.prototype.component2 = function () {
    return this.p2;
  };
  Segment2.prototype.copy_5e7l48$ = function (p1, p2) {
    return new Segment2(p1 === void 0 ? this.p1 : p1, p2 === void 0 ? this.p2 : p2);
  };
  Segment2.prototype.toString = function () {
    return 'Segment2(p1=' + Kotlin.toString(this.p1) + (', p2=' + Kotlin.toString(this.p2)) + ')';
  };
  Segment2.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.p1) | 0;
    result = result * 31 + Kotlin.hashCode(this.p2) | 0;
    return result;
  };
  Segment2.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.p1, other.p1) && Kotlin.equals(this.p2, other.p2)))));
  };
  function Segment3(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  Segment3.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Segment3',
    interfaces: []
  };
  Segment3.prototype.component1 = function () {
    return this.p1;
  };
  Segment3.prototype.component2 = function () {
    return this.p2;
  };
  Segment3.prototype.copy_n53ggq$ = function (p1, p2) {
    return new Segment3(p1 === void 0 ? this.p1 : p1, p2 === void 0 ? this.p2 : p2);
  };
  Segment3.prototype.toString = function () {
    return 'Segment3(p1=' + Kotlin.toString(this.p1) + (', p2=' + Kotlin.toString(this.p2)) + ')';
  };
  Segment3.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.p1) | 0;
    result = result * 31 + Kotlin.hashCode(this.p2) | 0;
    return result;
  };
  Segment3.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.p1, other.p1) && Kotlin.equals(this.p2, other.p2)))));
  };
  function Vector2(x, y) {
    Vector2$Companion_getInstance();
    if (x === void 0)
      x = 0.0;
    if (y === void 0)
      y = 0.0;
    this.x = x;
    this.y = y;
  }
  function Vector2$Companion() {
    Vector2$Companion_instance = this;
    this.zero = new Vector2();
    this.up = new Vector2(0.0, 1.0);
    this.down = this.up.unaryMinus();
    this.right = new Vector2(1.0, 0.0);
    this.left = this.right.unaryMinus();
  }
  Vector2$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector2$Companion_instance = null;
  function Vector2$Companion_getInstance() {
    if (Vector2$Companion_instance === null) {
      new Vector2$Companion();
    }
    return Vector2$Companion_instance;
  }
  Object.defineProperty(Vector2.prototype, 'lengthSquared', {
    get: function () {
      return this.x * this.x + this.y * this.y;
    }
  });
  Object.defineProperty(Vector2.prototype, 'length', {
    get: function () {
      return Math.sqrt(this.lengthSquared);
    }
  });
  Object.defineProperty(Vector2.prototype, 'normalized', {
    get: function () {
      return this.div_14dthe$(this.length);
    }
  });
  Object.defineProperty(Vector2.prototype, 'angle', {
    get: function () {
      var angle_2 = Math.atan2(this.y, this.x);
      if (angle_2 < 0)
        angle_2 += 2 * Math.PI;
      return angle_2;
    }
  });
  Vector2.prototype.plus_xliypu$ = function (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  };
  Vector2.prototype.minus_xliypu$ = function (v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  };
  Vector2.prototype.unaryMinus = function () {
    return new Vector2(-this.x, -this.y);
  };
  Vector2.prototype.times_14dthe$ = function (s) {
    return new Vector2(this.x * s, this.y * s);
  };
  Vector2.prototype.div_14dthe$ = function (s) {
    return new Vector2(this.x / s, this.y / s);
  };
  Vector2.prototype.toString = function () {
    return '[ ' + this.x + ', ' + this.y + ' ]';
  };
  Vector2.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vector2',
    interfaces: []
  };
  Vector2.prototype.component1 = function () {
    return this.x;
  };
  Vector2.prototype.component2 = function () {
    return this.y;
  };
  Vector2.prototype.copy_lu1900$ = function (x, y) {
    return new Vector2(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Vector2.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Vector2.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function Vector3(x, y, z) {
    Vector3$Companion_getInstance();
    if (x === void 0)
      x = 0.0;
    if (y === void 0)
      y = 0.0;
    if (z === void 0)
      z = 0.0;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  function Vector3$Companion() {
    Vector3$Companion_instance = this;
    this.zero = new Vector3();
    this.up = new Vector3(0.0, 1.0, 0.0);
    this.down = this.up.unaryMinus();
    this.right = new Vector3(1.0, 0.0, 0.0);
    this.left = this.right.unaryMinus();
    this.forward = new Vector3(0.0, 0.0, -1.0);
    this.back = this.forward.unaryMinus();
  }
  Vector3$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector3$Companion_instance = null;
  function Vector3$Companion_getInstance() {
    if (Vector3$Companion_instance === null) {
      new Vector3$Companion();
    }
    return Vector3$Companion_instance;
  }
  Object.defineProperty(Vector3.prototype, 'r', {
    get: function () {
      return this.x;
    }
  });
  Object.defineProperty(Vector3.prototype, 'g', {
    get: function () {
      return this.y;
    }
  });
  Object.defineProperty(Vector3.prototype, 'b', {
    get: function () {
      return this.z;
    }
  });
  Object.defineProperty(Vector3.prototype, 'lengthSquared', {
    get: function () {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  });
  Object.defineProperty(Vector3.prototype, 'length', {
    get: function () {
      return Math.sqrt(this.lengthSquared);
    }
  });
  Object.defineProperty(Vector3.prototype, 'normalized', {
    get: function () {
      return this.div_14dthe$(this.length);
    }
  });
  Vector3.prototype.plus_xliypv$ = function (v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  };
  Vector3.prototype.minus_xliypv$ = function (v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  };
  Vector3.prototype.unaryMinus = function () {
    return new Vector3(-this.x, -this.y, -this.z);
  };
  Vector3.prototype.times_14dthe$ = function (s) {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  };
  Vector3.prototype.div_14dthe$ = function (s) {
    return new Vector3(this.x / s, this.y / s, this.z / s);
  };
  Vector3.prototype.toString = function () {
    return '[ ' + this.x + ', ' + this.y + ', ' + this.z + ' ]';
  };
  Vector3.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vector3',
    interfaces: []
  };
  Vector3.prototype.component1 = function () {
    return this.x;
  };
  Vector3.prototype.component2 = function () {
    return this.y;
  };
  Vector3.prototype.component3 = function () {
    return this.z;
  };
  Vector3.prototype.copy_yvo9jy$ = function (x, y, z) {
    return new Vector3(x === void 0 ? this.x : x, y === void 0 ? this.y : y, z === void 0 ? this.z : z);
  };
  Vector3.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.z) | 0;
    return result;
  };
  Vector3.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.z, other.z)))));
  };
  function Vector4(x, y, z, w) {
    if (x === void 0)
      x = 0.0;
    if (y === void 0)
      y = 0.0;
    if (z === void 0)
      z = 0.0;
    if (w === void 0)
      w = 1.0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  Object.defineProperty(Vector4.prototype, 'r', {
    get: function () {
      return this.x;
    }
  });
  Object.defineProperty(Vector4.prototype, 'g', {
    get: function () {
      return this.y;
    }
  });
  Object.defineProperty(Vector4.prototype, 'b', {
    get: function () {
      return this.z;
    }
  });
  Object.defineProperty(Vector4.prototype, 'a', {
    get: function () {
      return this.w;
    }
  });
  Object.defineProperty(Vector4.prototype, 'lengthSquared', {
    get: function () {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
  });
  Object.defineProperty(Vector4.prototype, 'length', {
    get: function () {
      return Math.sqrt(this.lengthSquared);
    }
  });
  Object.defineProperty(Vector4.prototype, 'normalized', {
    get: function () {
      return this.div_14dthe$(this.length);
    }
  });
  Vector4.prototype.plus_xliypw$ = function (v) {
    return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  };
  Vector4.prototype.minus_xliypw$ = function (v) {
    return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  };
  Vector4.prototype.unaryMinus = function () {
    return new Vector4(-this.x, -this.y, -this.z, -this.w);
  };
  Vector4.prototype.times_14dthe$ = function (s) {
    return new Vector4(this.x * s, this.y * s, this.z * s, this.w * s);
  };
  Vector4.prototype.div_14dthe$ = function (s) {
    return new Vector4(this.x / s, this.y / s, this.z / s, this.w / s);
  };
  Vector4.prototype.toString = function () {
    return '[ ' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ' ]';
  };
  Vector4.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vector4',
    interfaces: []
  };
  Vector4.prototype.component1 = function () {
    return this.x;
  };
  Vector4.prototype.component2 = function () {
    return this.y;
  };
  Vector4.prototype.component3 = function () {
    return this.z;
  };
  Vector4.prototype.component4 = function () {
    return this.w;
  };
  Vector4.prototype.copy_6y0v78$ = function (x, y, z, w) {
    return new Vector4(x === void 0 ? this.x : x, y === void 0 ? this.y : y, z === void 0 ? this.z : z, w === void 0 ? this.w : w);
  };
  Vector4.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.z) | 0;
    result = result * 31 + Kotlin.hashCode(this.w) | 0;
    return result;
  };
  Vector4.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.z, other.z) && Kotlin.equals(this.w, other.w)))));
  };
  function dot($receiver, v) {
    return $receiver.x * v.x + $receiver.y * v.y;
  }
  function dot_0(v1, v2) {
    return dot(v1, v2);
  }
  function lerp(v1, v2, alpha) {
    return v2.minus_xliypu$(v1).times_14dthe$(alpha).plus_xliypu$(v1);
  }
  function angle(v1, v2) {
    var theta = dot_0(v1, v2) / Math.sqrt(v1.lengthSquared * v2.lengthSquared);
    return Math.acos(clamp(theta, -1.0, 1.0));
  }
  function distance_1(v1, v2) {
    return v2.minus_xliypu$(v1).length;
  }
  function dot_1($receiver, v) {
    return $receiver.x * v.x + $receiver.y * v.y + $receiver.z * v.z;
  }
  function dot_2(v1, v2) {
    return dot_1(v1, v2);
  }
  function cross_0(v1, v2) {
    return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
  }
  function cross($receiver, v) {
    return cross_0($receiver, v);
  }
  function lerp_0(v1, v2, alpha) {
    return v2.minus_xliypv$(v1).times_14dthe$(alpha).plus_xliypv$(v1);
  }
  function angle_0(v1, v2) {
    var theta = dot_2(v1, v2) / Math.sqrt(v1.lengthSquared * v2.lengthSquared);
    return Math.acos(clamp(theta, -1.0, 1.0));
  }
  function distance_2(v1, v2) {
    return v2.minus_xliypv$(v1).length;
  }
  function dot_3($receiver, v) {
    return $receiver.x * v.x + $receiver.y * v.y + $receiver.z * v.z + $receiver.w * v.w;
  }
  function dot_4(v1, v2) {
    return dot_3(v1, v2);
  }
  function lerp_1(v1, v2, alpha) {
    return v2.minus_xliypw$(v1).times_14dthe$(alpha).plus_xliypw$(v1);
  }
  function angle_1(v1, v2) {
    var theta = dot_4(v1, v2) / Math.sqrt(v1.lengthSquared * v2.lengthSquared);
    return Math.acos(clamp(theta, -1.0, 1.0));
  }
  function distance_3(v1, v2) {
    return v2.minus_xliypw$(v1).length;
  }
  function Vector3_0(v, z) {
    if (z === void 0)
      z = 0.0;
    return new Vector3(v.x, v.y, z);
  }
  function Vector4_0(v, w) {
    if (w === void 0)
      w = 1.0;
    return new Vector4(v.x, v.y, v.z, w);
  }
  function Vector4_1(v, z, w) {
    if (z === void 0)
      z = 0.0;
    if (w === void 0)
      w = 1.0;
    return new Vector4(v.x, v.y, z, w);
  }
  var package$pl = _.pl || (_.pl = {});
  var package$dzduniak = package$pl.dzduniak || (package$pl.dzduniak = {});
  var package$quadtree = package$dzduniak.quadtree || (package$dzduniak.quadtree = {});
  package$quadtree.Property = Property;
  package$quadtree.main_kand9s$ = main;
  Tree.Node = Tree$Node;
  Object.defineProperty(Tree, 'Nil', {
    get: Tree$Nil_getInstance
  });
  package$quadtree.Tree = Tree;
  var package$math = package$quadtree.math || (package$quadtree.math = {});
  package$math.AABB2 = AABB2;
  package$math.inside_w8aevs$ = inside;
  package$math.toRadians_yrwdxr$ = toRadians;
  package$math.toDegrees_yrwdxr$ = toDegrees;
  package$math.clamp_nig4hr$ = clamp;
  package$math.floor_yrwdxr$ = floor;
  package$math.ceil_yrwdxr$ = ceil;
  package$math.round_yrwdxr$ = round;
  package$math.step_38ydlf$ = step_0;
  package$math.modulo_dqglrj$ = modulo;
  package$math.modulo_38ydlf$ = modulo_0;
  package$math.nextHighestPowerOf2_s8ev3n$ = nextHighestPowerOf2;
  package$math.Ray2 = Ray2;
  package$math.Ray3 = Ray3;
  package$math.toRay_sk5kbh$ = toRay;
  package$math.toRay_sk5kam$ = toRay_0;
  package$math.distance_11qzdu$ = distance;
  package$math.distance_w70iny$ = distance_0;
  package$math.Segment2 = Segment2;
  package$math.Segment3 = Segment3;
  Object.defineProperty(Vector2, 'Companion', {
    get: Vector2$Companion_getInstance
  });
  package$math.Vector2 = Vector2;
  Object.defineProperty(Vector3, 'Companion', {
    get: Vector3$Companion_getInstance
  });
  package$math.Vector3 = Vector3;
  package$math.Vector4 = Vector4;
  package$math.dot_pjo30r$ = dot;
  package$math.dot_5e7l48$ = dot_0;
  package$math.lerp_1vmy8m$ = lerp;
  package$math.angle_5e7l48$ = angle;
  package$math.distance_5e7l48$ = distance_1;
  package$math.dot_2zmyk7$ = dot_1;
  package$math.dot_n53ggq$ = dot_2;
  package$math.cross_n53ggq$ = cross_0;
  package$math.cross_2zmyk7$ = cross;
  package$math.lerp_mxat0s$ = lerp_0;
  package$math.angle_n53ggq$ = angle_0;
  package$math.distance_n53ggq$ = distance_2;
  package$math.dot_viy055$ = dot_3;
  package$math.dot_jcpjxg$ = dot_4;
  package$math.lerp_navhoy$ = lerp_1;
  package$math.angle_jcpjxg$ = angle_1;
  package$math.distance_jcpjxg$ = distance_3;
  package$math.Vector3_d8hjl8$ = Vector3_0;
  package$math.Vector4_bp2itx$ = Vector4_0;
  package$math.Vector4_mr4hay$ = Vector4_1;
  Kotlin.defineModule('Quadtree', _);
  main([]);
  return _;
}(typeof Quadtree === 'undefined' ? {} : Quadtree, kotlin);
