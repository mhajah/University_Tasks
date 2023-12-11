package algorithms;

public interface Dictionary<T extends Comparable<T>> {
    void insert(T value);
    void remove(T value);
    boolean search(T value);
    T min() throws IllegalStateException;
    T max() throws IllegalStateException;
    int size();
    void clear();
}
