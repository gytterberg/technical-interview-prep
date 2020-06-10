// LINKED LIST CODE

function LinkedList(head) {
	this.head = head;
}

function Node(value) {
	this.value = value
	this.next = null;
}

LinkedList.prototype.addToTail = function(node) {
	this.getTail().next = node;
}

// STEP 1 DOES INTERSETION EXIST (CONSTANT SPACE)

LinkedList.prototype.getTail = function() {
 	var traverse = function(head) {
		if (!head.next) {
			return head
		} else {
			return traverse(head.next)
		}		
	}
	return traverse(this.head)
}


function isIntersection(linkedList1, linkedList2) {
	return linkedList1.getTail() === linkedList2.getTail();
}

// STEP 2 FIND INTERSECTION NODE

LinkedList.prototype.getTailAndSize = function(){
	if (this.head === null) {
		return null
	}
	var size = 1

	current = this.head
	while (current.next !== null) {
		current = current.next;
		size++;
	}

	return [current, size]
}

LinkedList.prototype.getNthNode = function(nthNode) {
	 var traverse = function(head, currentCount, maxCount) {
		if (!head.next || currentCount === maxCount ) {
			return head
		} else {
			return traverse(head.next, currentCount + 1, maxCount)
		}		
	}
	return traverse(this.head, 0, nthNode)
}

function findIntersection(linkedList1, linkedList2) {
	if (linkedList1.head === null || linkedList2.head === null) {
		return null
	}
	var longer,	shorter, difference;
	var intersectionNode = null;

	var [tail1, size1] = linkedList1.getTailAndSize()
	var [tail2, size2] = linkedList2.getTailAndSize()

	// If no intersection
	if (tail1 !== tail2) {
		return null
	}

	if (size1 > size2) {
		longer = linkedList1
		shorter = linkedList2
		difference = size1 - size2
	} else {
		longer = linkedList2
		shorter = linkedList1
		difference = size2 - size1
	}

	var longerRunner = longer.getNthNode(difference)
	var shorterRunner = shorter.head

	// We know that this loop conditiom MUST become falsy because we tested above that the linked lists intersect
	while (shorterRunner !== longerRunner) {
		shorterRunner = shorterRunner.next;
		longerRunner = longerRunner.next;
	}
	// return either node because they point to the same intersecting node
	return longerRunner
}

var LL1 = new LinkedList(new Node(1));
LL1.addToTail(new Node(2))
LL1.addToTail(new Node(3))
LL1.addToTail(new Node(4))
LL1.addToTail(new Node(5))
LL1.addToTail(new Node(6))

var LL2 = new LinkedList(new Node(1));
LL2.addToTail(new Node(2))
LL2.addToTail(new Node(3))
LL2.addToTail(LL1.head.next.next.next.next)

console.log(findIntersection(LL1, LL2))

