function Tree(val, left, right) {
    this.left = left;
    this.right = right;
    this.val = val;
}

Tree.prototype[Symbol.iterator] = function () {
    let queue = [this];
    return {
        next: function () {
            if (queue.length === 0) return { done: true }

            if (queue[0].right) queue.push(queue[0].right);
            if (queue[0].left) queue.push(queue[0].left);
            let myValue = queue.shift();

            return {
                value: myValue.val,
                done: false
            }
        }
    }
}

var root1 = new Tree(1,
    new Tree(2, new Tree(3)), new Tree(4));
//      drzewo 1
//        1
//       / \
//      2   4
//     /   
//    3

var root2 = new Tree(1, 
    new Tree(2, 
        new Tree(3), 
        new Tree(4)), 
    new Tree(5));
//      drzewo 2
//        1
//       / \
//      2   5
//     / \  
//    3   4

console.log("Drzewo 1:")
for (var e of root1) {
    console.log(e);
}
console.log("Drzewo 2:")
for (var e of root2) {
    console.log(e);
}

