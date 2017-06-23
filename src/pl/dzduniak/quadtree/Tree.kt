package pl.dzduniak.quadtree

sealed class Tree<out T> {
    class Node<T>(val value: T, val children: List<Tree<T>>) : Tree<T>() {
        val isLeaf: Boolean by lazy {
            children.forEach {
                if (it != Nil)
                    return@lazy false
            }

            return@lazy true
        }
    }
    object Nil : Tree<Nothing>()
}