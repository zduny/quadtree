package pl.dzduniak.quadtree.math

import kotlin.js.Math

fun Double.toRadians() = this * Math.PI / 180
fun Double.toDegrees() = this * 180 / Math.PI
fun Double.clamp(min: Double, max: Double) = Math.max(min, Math.min(max, this))
fun Double.floor() = Math.floor(this)
fun Double.ceil() = Math.ceil(this)
fun Double.round() = Math.round(this)
fun Double.step(x: Double) = if (x < this) 0.0 else 1.0
fun Int.modulo(m: Int) = ((this % m) + m) % m
fun Double.modulo(m: Double) = ((this % m) + m) % m

fun Int.nextHighestPowerOf2(): Int {
    var v = this

    v--
    v = v or (v shr 1)
    v = v or (v shr 2)
    v = v or (v shr 4)
    v = v or (v shr 8)
    v = v or (v shr 16)
    v++

    return v
}