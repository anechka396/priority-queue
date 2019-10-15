class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left && this.right) return;
		if(!this.left) {
			this.left = node;
			node.parent = this;
		} else {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(node === this.left) {
			this.left = null;
			node.parent = null;
		} else if(node === this.right) {
			this.right = null;
			node.parent = null;
		} else {
			throw Error;
		}
	}

	remove() {
		if(this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent) {
			var left = this.left;
			var right = this.right;
			var curParent = this.parent;
			var curGrandParent = this.parent.parent;
			
			if(curGrandParent)
				curGrandParent.left === curParent ? (curGrandParent.left = this) : (curGrandParent.right = this);
			this.parent = curGrandParent;
			
			if(this === curParent.left) {
				this.left = curParent;
				this.right = curParent.right;
				if (this.right) this.right.parent = this;
			} else {
				this.right = curParent;
				this.left = curParent.left;
				if (this.left) this.left.parent = this;
			}
			
			curParent.left = left;
			curParent.right = right;
			curParent.parent = this;
			
			if(left) left.parent = curParent;
			if(right) right.parent = curParent;
		}
	}
}

module.exports = Node;
