const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this._size++;
	}

	pop() {
		if(!this.isEmpty()) {
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			this._size--;
			return detached.data;
		}
	}

	detachRoot() {
		var root = this.root;
		var rootIndex = this.parentNodes.indexOf(root);
		if(rootIndex != -1) this.parentNodes.splice(rootIndex, 1);
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.isEmpty()) {
			var lastInserted = this.parentNodes.pop();
			
			lastInserted.left = detached.left;
		    lastInserted.right = detached.right;
		    if (lastInserted.left) 
				lastInserted.left.parent = lastInserted;
		    if (lastInserted.right) 
				lastInserted.right.parent = lastInserted;
			
			lastInserted.remove();
			this.root = lastInserted;
		}
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this.root === null && this.parentNodes.length === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	insertNode(node) {
		if(this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
		}
		if (this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();
	}

	shiftNodeUp(node) {
		var parent = node.parent;
		if(parent && (parent.priority < node.priority)) {
			var indexOfNode = this.parentNodes.indexOf(node);
			var indexOfParentNode = this.parentNodes.indexOf(parent);
			if(indexOfNode != -1) {
				indexOfParentNode != -1 ? this.swap(this.parentNodes, indexOfNode, indexOfParentNode) : this.parentNodes[indexOfNode] = parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else {
			if(this.root.parent) this.root = node;
		}
	}

	shiftNodeDown(node) {
		
	}
	
	swap(arr, a, b){  
		var temp;  
		temp = arr[a];  
		arr[a] = arr[b];  
		arr[b] = temp;  
	}  
}

module.exports = MaxHeap;
