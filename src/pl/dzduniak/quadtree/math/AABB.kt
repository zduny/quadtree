package pl.dzduniak.quadtree.math

data class AABB2(val topLeft: Vector2, val bottomRight: Vector2)

infix fun Vector2.inside(box: AABB2) =
        this.x > box.topLeft.x && this.y > box.topLeft.y && this.x < box.bottomRight.x && this.y < box.bottomRight.y