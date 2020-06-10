function BinarySearchTree(value){
	return {
		value: value, 
		left: undefined, 
		right: undefined
	}
}

var insert = function (tree, value){
	if(tree.value > value){
		if (tree.left) {
			insert(tree.left, value)
		} else {
			tree.left = BinarySearchTree(value);
		}
	} else if(tree.value <= value){
		if (tree.right) {
			insert(tree.right, value)
		} else {
			tree.right = BinarySearchTree(value);
		}
	} 
};

var breadthFirstTraversal = function(tree, cbFunc){
	var queue = [tree];
	while (queue.length) {
		var currentNode = queue.shift(); 
		cbFunc(currentNode.value);
		if(currentNode.left) {
			queue.push(currentNode.left);
		}
		if(currentNode.right) {
			queue.push(currentNode.right);
		}
	}
};

var inverse = function(tree){
	var temp = tree.left;
	tree.left = tree.right;
	tree.right = temp;
	if(tree.left) {
		inverse(tree.left);
	}
	if(tree.right) {
		inverse(tree.right);
	}
};
