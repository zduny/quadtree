package pl.dzduniak.quadtree.math

import kotlin.js.Math

data class Vector2(val x: Double = .0, val y: Double = .0) {
    companion object {
        val zero = Vector2()
        val up = Vector2(.0, 1.0)
        val down = -up
        val right = Vector2(1.0, .0)
        val left = -right
    }

    val lengthSquared: Double
        get() = x * x + y * y
    val length: Double
        get() = Math.sqrt(lengthSquared)
    val normalized: Vector2
        get() = this / length
    val angle: Double
        get() {
            var angle = Math.atan2(this.y, this.x)
            if (angle < 0) angle += 2 * Math.PI
            return angle
        }

    operator fun plus(v: Vector2) = Vector2(x + v.x, y + v.y)
    operator fun minus(v: Vector2) = Vector2(x - v.x, y - v.y)
    operator fun unaryMinus() = Vector2(-x, -y)
    operator fun times(s: Double) = Vector2(x * s, y * s)
    operator fun div(s: Double) = Vector2(x / s, y / s)

    override fun toString(): String {
        return "[ $x, $y ]"
    }
}

data class Vector3(val x: Double = .0, val y: Double = .0, val z: Double = .0) {
    companion object {
        val zero = Vector3()
        val up = Vector3(.0, 1.0, .0)
        val down = -up
        val right = Vector3(1.0, .0, .0)
        val left = -right
        val forward = Vector3(.0, .0, -1.0)
        val back = -forward
    }

    val r: Double
        get() = x
    val g: Double
        get() = y
    val b: Double
        get() = z

    val lengthSquared: Double
        get() = x * x + y * y + z * z
    val length: Double
        get() = Math.sqrt(lengthSquared)
    val normalized: Vector3
        get() = this / length

    operator fun plus(v: Vector3) = Vector3(x + v.x, y + v.y, z + v.z)
    operator fun minus(v: Vector3) = Vector3(x - v.x, y - v.y, z - v.z)
    operator fun unaryMinus() = Vector3(-x, -y, -z)
    operator fun times(s: Double) = Vector3(x * s, y * s, z * s)
    operator fun div(s: Double) = Vector3(x / s, y / s, z / s)

    override fun toString(): String {
        return "[ $x, $y, $z ]"
    }
}

data class Vector4(val x: Double = .0, val y: Double = .0, val z: Double = .0, val w: Double = 1.0) {
    val r: Double
        get() = x
    val g: Double
        get() = y
    val b: Double
        get() = z
    val a: Double
        get() = w

    val lengthSquared: Double
        get() = x * x + y * y + z * z + w * w
    val length: Double
        get() = Math.sqrt(lengthSquared)
    val normalized: Vector4
        get() = this / length

    operator fun plus(v: Vector4) = Vector4(x + v.x, y + v.y, z + v.z, w + v.w)
    operator fun minus(v: Vector4) = Vector4(x - v.x, y - v.y, z - v.z, w - v.w)
    operator fun unaryMinus() = Vector4(-x, -y, -z, -w)
    operator fun times(s: Double) = Vector4(x * s, y * s, z * s, w * s)
    operator fun div(s: Double) = Vector4(x / s, y / s, z / s, w / s)

    override fun toString(): String {
        return "[ $x, $y, $z, $w ]"
    }
}

infix fun Vector2.dot(v: Vector2) = this.x * v.x + this.y * v.y
fun dot(v1: Vector2, v2: Vector2) = v1 dot v2
fun lerp(v1: Vector2, v2: Vector2, alpha: Double) = (v2 - v1) * alpha + v1
fun angle(v1: Vector2, v2: Vector2): Double {
    val theta = dot(v1, v2) / Math.sqrt(v1.lengthSquared * v2.lengthSquared)
    return Math.acos(theta.clamp(-1.0, 1.0))
}

fun distance(v1: Vector2, v2: Vector2) = (v2 - v1).length

infix fun Vector3.dot(v: Vector3) = this.x * v.x + this.y * v.y + this.z * v.z
fun dot(v1: Vector3, v2: Vector3) = v1 dot v2
fun cross(v1: Vector3, v2: Vector3) = Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x)
infix fun Vector3.cross(v: Vector3) = cross(this, v)
fun lerp(v1: Vector3, v2: Vector3, alpha: Double) = (v2 - v1) * alpha + v1
fun angle(v1: Vector3, v2: Vector3): Double {
    val theta = dot(v1, v2) / Math.sqrt(v1.lengthSquared * v2.lengthSquared)
    return Math.acos(theta.clamp(-1.0, 1.0))
}

fun distance(v1: Vector3, v2: Vector3) = (v2 - v1).length

infix fun Vector4.dot(v: Vector4) = this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
fun dot(v1: Vector4, v2: Vector4) = v1 dot v2
fun lerp(v1: Vector4, v2: Vector4, alpha: Double) = (v2 - v1) * alpha + v1
fun angle(v1: Vector4, v2: Vector4): Double {
    val theta = dot(v1, v2) / Math.sqrt(v1.lengthSquared * v2.lengthSquared)
    return Math.acos(theta.clamp(-1.0, 1.0))
}

fun distance(v1: Vector4, v2: Vector4) = (v2 - v1).length

fun Vector3(v: Vector2, z: Double = 0.0) = Vector3(v.x, v.y, z)
fun Vector4(v: Vector3, w: Double = 1.0) = Vector4(v.x, v.y, v.z, w)
fun Vector4(v: Vector2, z: Double = 0.0, w: Double = 1.0) = Vector4(v.x, v.y, z, w)