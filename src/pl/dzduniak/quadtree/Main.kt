package pl.dzduniak.quadtree

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.MouseEvent
import kotlin.js.Math.random
import pl.dzduniak.quadtree.math.*
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math
import kotlin.js.Math.max
import kotlin.js.Math.min
import kotlin.js.Math.pow

data class Property<T>(var value: T)

fun main(args: Array<String>) {
    fun Vector2.step(x: Vector2) = Vector2(this.x.step(x.x), this.y.step(x.y))

    fun createQuadTree(depth: Int): Tree<Property<Double>> {
        fun leaf() = Tree.Node(Property(0.0), listOf(Tree.Nil, Tree.Nil, Tree.Nil, Tree.Nil))
        fun nilOrTree() = if (random() > 1.0 / pow(depth.toDouble(), 1.5)) createQuadTree(depth - 1) else leaf()
        return if (depth == 0) leaf() else
            Tree.Node(Property(0.0), listOf(nilOrTree(), nilOrTree(), nilOrTree(), nilOrTree()))
    }

    val canvas = document.getElementById("canvas") as HTMLCanvasElement
    val c = canvas.getContext("2d") as CanvasRenderingContext2D

    var middle = Vector2(canvas.width / 2.0, canvas.height / 2.0)
    fun resize() {
        val dpi = window.devicePixelRatio

        canvas.width = (canvas.clientWidth * dpi).floor()
        canvas.height = (canvas.clientHeight * dpi).floor()
        middle = Vector2(canvas.width / 2.0, canvas.height / 2.0)
    }


    fun Tree<Property<Double>>.draw(position: Vector2, width: Double) {
        when (this) {
            is Tree.Nil -> return
            is Tree.Node -> {
                val half = width / 2
                c.lineWidth = 1.0
                c.strokeStyle = "black"
                c.beginPath()
                c.rect((position.x - half).floor() + .5, (position.y - half).floor() + .5,
                        width.floor().toDouble(), width.floor().toDouble())
                if (this is Tree.Node) {
                    c.fillStyle = "rgba(255,255,0,${this.value.value}"
                    c.fill()
                }
                c.stroke()

                val halfHalf = half / 2.0
                children[0].draw(position + Vector2(-halfHalf, -halfHalf), half)
                children[1].draw(position + Vector2(halfHalf, -halfHalf), half)
                children[2].draw(position + Vector2(-halfHalf, halfHalf), half)
                children[3].draw(position + Vector2(halfHalf, halfHalf), half)
            }
        }
    }

    fun <T> Tree<T>.intersect(position: Vector2, width: Double, ray: Ray2, visitor: (Tree.Node<T>) -> Unit): Pair<Vector2, Vector2> {
        fun intersect(b: AABB2, r: Ray2): Pair<Vector2, Vector2> {
            val tx1 = (b.topLeft.x - r.origin.x) * r.directionInverse.x
            val tx2 = (b.bottomRight.x - r.origin.x) * r.directionInverse.x

            val t0x = min(tx1, tx2)
            val t1x = max(tx1, tx2)

            val ty1 = (b.topLeft.y - r.origin.y) * r.directionInverse.y
            val ty2 = (b.bottomRight.y - r.origin.y) * r.directionInverse.y

            val t0y = min(ty1, ty2)
            val t1y = max(ty1, ty2)

            return Pair(Vector2(t0x, t0y), Vector2(t1x, t1y))
        }

        val half = width / 2
        val box = AABB2(position + Vector2(-half, -half), position + Vector2(half, half))

        val intersection = intersect(box, ray)
        val (t0, t1) = intersection
        val tmin = max(t0.x, t0.y)
        val tmax = min(t1.x, t1.y)

        var a = 0
        if (ray.direction.x < 0) {
            a = a or 1
        }
        if (ray.direction.y < 0) {
            a = a or 2
        }

        if (tmax >= tmin) {
            fun firstNode(t0: Vector2, tm: Vector2): Int {
                if (t0.x > t0.y) {
                    if (tm.y < t0.x) return 2
                    else return 0
                } else {
                    if (tm.x < t0.y) return 1
                    else return 0
                }
            }

            fun newNode(tm: Vector2, x: Int, y: Int): Int {
                if (tm.x < tm.y) return x
                else return y
            }

            fun Tree<T>.procSubtree(t0: Vector2, t1: Vector2) {
                val tm = (t0 + t1) / 2.0

                if (this is Tree.Node) {
                    visitor(this)

                    if (!this.isLeaf) {
                        var currNode = firstNode(t0, tm)
                        do {
                            when (currNode) {
                                0 -> {
                                    children[a].procSubtree(t0, tm)
                                    currNode = newNode(tm, 1, 2)
                                }
                                1 -> {
                                    children[1 xor a].procSubtree(Vector2(tm.x, t0.y), Vector2(t1.x, tm.y))
                                    currNode = newNode(Vector2(t1.x, tm.y), 4, 3)
                                }
                                2 -> {
                                    children[2 xor a].procSubtree(Vector2(t0.x, tm.y), Vector2(tm.x, t1.y))
                                    currNode = newNode(Vector2(tm.x, t1.y), 3, 4)
                                }
                                3 -> {
                                    children[3 xor a].procSubtree(tm, t1)
                                    currNode = 4
                                }
                            }
                        } while (currNode < 4);
                    }
                }
            }

            this.procSubtree(t0, t1)
        }

        return intersection
    }

    val tree = createQuadTree(5)
    var point1 = Vector2(100.0, 100.0)
    var point2 = Vector2(250.0, 200.0)

    fun Tree<Property<Double>>.clearTree() {
        when (this) {
            is Tree.Node -> {
                this.value.value = 0.0
                children.forEach { it.clearTree() }
            }
        }
    }

    fun draw() {
        c.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())

        val ray = Segment2(point1, point2).toRay()

        tree.clearTree()
        var a = 1.0
        val intersection = tree.intersect(middle, 512.0, ray) {
            if (it.isLeaf)
                it.value.value = a
            a -= 0.01
        }

        val (t0, t1) = intersection

        val tmin = max(t0.x, t0.y)
        val tmax = min(t1.x, t1.y)

        if (tmax >= tmin) {
            val pmin = ray * tmin
            val pmax = ray * tmax

            c.fillStyle = "green"
            c.beginPath()
            c.arc(pmin.x, pmin.y, 4.0, 0.0, 2 * Math.PI)
            c.fill()

            c.fillStyle = "red"
            c.beginPath()
            c.arc(pmax.x, pmax.y, 4.0, 0.0, 2 * Math.PI)
            c.fill()
        }

        tree.draw(middle, 512.0)

        c.fillStyle = "navy"
        c.beginPath()
        c.arc(ray.origin.x, ray.origin.y, 10.0, 0.0, 2 * Math.PI)
        c.fill()

        c.beginPath()
        c.arc(point2.x, point2.y, 2.0, 0.0, 2 * Math.PI)
        c.fill()

        c.strokeStyle = "navy"
        c.lineWidth = 1.0
        c.beginPath()
        c.moveTo(ray.origin.x, ray.origin.y)
        val t = ray * 10000.0
        c.lineTo(t.x, t.y)
        c.stroke()
    }

    window.addEventListener("resize", {
        resize()
        draw()
    })

    canvas.onmouseup = {
        it as MouseEvent

        val p = Vector2(it.clientX.toDouble(), it.clientY.toDouble())
        if (it.button != 0.toShort())
            point1 = p
        else
            point2 = p

        draw()
    }

    canvas.oncontextmenu = {
        it.preventDefault()
    }

    resize()
    draw()
}