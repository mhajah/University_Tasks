package algorithms;

public class BST <T extends Comparable<T>> implements Dictionary<T>
{
    public class Node <T extends Comparable<T>>
    {
        public Node<T> left, right, parent;
        public T data;

        public Node(T data)
        {
            left=null;
            right=null;
            parent=null;
            this.data=data;
        }
    }

    private Node<T> root;
    int size;


    public BST() {
        root=null;
        size=0;
    }

    public int size() {
        return size;
    }

    public void clear() {
        root=null; size=0;
    }

    public boolean search(T data)
    {
        return searchRecursive(root, data);
    }

    private boolean searchRecursive(Node<T> node, T data)
    {
        if (node == null)
        {
            return false;
        }

        int comparisonResult = data.compareTo(node.data);

        if (comparisonResult == 0)
        {
            return true;
        }
        else if (comparisonResult < 0)
        {
            return searchRecursive(node.left, data);
        }
        else
        {
            return searchRecursive(node.right, data);
        }
    }

    public T min()
    {
        Node<T> x=root;
        while (x.left!=null)
        {
            x=x.left;
        }
        return x.data;
    }

    public T max()
    {
        Node<T> x=root;
        while(x.right!=null)
        {
            x=x.right;
        }
        return x.data;
    }

    public void insert(T data)
    {

        root = insertRecursive(root, data);
        size++;
    }

    private Node<T> insertRecursive(Node<T> node, T data)
    {
        if (node == null)
        {
            return new Node<>(data);
        }

        int compareRes = data.compareTo(node.data);
        if (compareRes < 0)
        {
            node.left = insertRecursive(node.left, data);
            node.left.parent = node;
        }
        else if (compareRes > 0)
        {
            node.right = insertRecursive(node.right, data);
            node.right.parent = node;
        }

        return node;
    }


    public void remove(T data)
    {
        root = removeRecursive(root, data);
        size--;
    }

    private Node<T> removeRecursive(Node<T> node, T data)
    {
        if (node == null)
        {
            return null;
        }

        int comparisonResult = data.compareTo(node.data);

        if (comparisonResult < 0)
        {
            node.left = removeRecursive(node.left, data);
        }
        else if (comparisonResult > 0)
        {
            node.right = removeRecursive(node.right, data);
        }
        else
        {
            if (node.left == null)
            {
                return node.right;
            }
            else if (node.right == null)
            {
                return node.left;
            }

            node.data = findMin(node.right).data;
            node.right = removeRecursive(node.right, node.data);
        }

        return node;
    }

    private Node<T> findMin(Node<T> node)
    {
        while (node.left != null)
        {
            node = node.left;
        }
        return node;
    }

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        toStringHelper(root, stringBuilder, 0, "root");
        return stringBuilder.toString();
    }

    private void toStringHelper(Node node, StringBuilder stringBuilder, int indentLevel, String drzewo) {
        if (node != null) {
            for (int i = 0; i < indentLevel; i++) {
                stringBuilder.append("  ");
            }

            stringBuilder.append(drzewo).append("=> ").append(node.data).append("\n");

            toStringHelper(node.left, stringBuilder, indentLevel + 1, "lewe");
            toStringHelper(node.right, stringBuilder, indentLevel + 1, "prawe");
        }
    }
}
