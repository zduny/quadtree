package pl.dzduniak.quadtree.math

class Ray2(val origin: Vector2, direction: Vector2) {
    val direction = direction.normalized
    val directionInverse: Vector2 by lazy { Vector2(1 / this.direction.x, 1 / this.direction.y) }

    operator fun times(t: Double) = origin + direction * t

    override fun equals(other: Any?): Boolean {
        if (this === other) return true

        other as Ray2

        if (origin != other.origin) return false
        if (direction != other.direction) return false

        return true
    }

    override fun hashCode(): Int {
        var result = origin.hashCode()
        result = 31 * result + direction.hashCode()
        return result
    }

    override fun toString(): String {
        return "Ray2(origin=$origin, direction=$direction)"
    }
}

class Ray3(val origin: Vector3, direction: Vector3) {
    val direction = direction.normalized
    val directionInverse: Vector3 by lazy { Vector3(1 / this.direction.x, 1 / this.direction.y, 1 / this.direction.z) }

    operator fun times(t: Double) = origin + direction * t

    override fun equals(other: Any?): Boolean {
        if (this === other) return true

        other as Ray3

        if (origin != other.origin) return false
        if (direction != other.direction) return false

        return true
    }

    override fun hashCode(): Int {
        var result = origin.hashCode()
        result = 31 * result + direction.hashCode()
        return result
    }

    override fun toString(): String {
        return "Ray3(origin=$origin, direction=$direction)"
    }
}

fun Segment2.toRay() = Ray2(this.p1, this.p2 - this.p1)
fun Segment3.toRay() = Ray3(this.p1, this.p2 - this.p1)

fun Vector2.distance(ray: Ray2) = (Vector3(ray.direction) cross Vector3(this - ray.origin)).length
fun Vector3.distance(ray: Ray3) = (ray.direction cross (this - ray.origin)).length