var ints = [1,2,3,4,5,6,7,8,9,10];

var Enumerable = (function () {

	var Iterator = function (iterator) {
		this.iterator = iterator;
	};
	Iterator.prototype.next = function () {
		return this.iterator();
	};
	Iterator.prototype.toArray = function () {
		var result = [],
			item;

		while ((item = this.next()) !== undefined) {
			result.push(item);
		}
		return result;
	};
	Iterator.prototype.where = function (predicate) {
		var iterator = this.iterator;

		this.iterator = function () {
			var item = iterator();
			while (item !== undefined && !predicate(item)) { item = iterator(); }
			return item;
		};

		return this;
	};
	Iterator.prototype.map = function (map) {
		var iterator = this.iterator;

		this.iterator = function () {
			var item = iterator();
			if (item === undefined) {
				return item;
			}
			return map(item);
		};

		return this;
	};
	Iterator.prototype.take = function (count) {
		var iterator = this.iterator,
			index = 0;

		this.iterator = function () {
			while (index < count) { index++; return iterator(); }
			return undefined;
		};

		return this;
	};
	Iterator.prototype.skip = function (count) {
		var iterator = this.iterator,
			index = 0;

		this.iterator = function () {
			while (index < count) { index += 1; iterator(); }
			return iterator();
		};

		return this;
	};


	return {
		FromArray: function (array) {
			var iterator = (function () {
				var index = 0;
				return function () {
					return array[index++];
				}
			}());

			return new Iterator(iterator);
		},
		Range: function (min, max) {
			var iterator = (function () {
				var current = min;
				return function () {
					while (current <= max) {
						return current++;
					}
					return undefined;
				}
			}());

			return new Iterator(iterator);
		}
	};
}());



console.log(Enumerable.FromArray(ints).toArray());
console.log(Enumerable.Range(1, 5).toArray());
console.log(Enumerable.FromArray(ints).where(function (x) { return x % 2 === 0; }).toArray());
console.log(Enumerable.FromArray(ints).where(function (x) { return x % 2 === 1; }).map(function (x) { return x * 2; }).toArray());
console.log(Enumerable.FromArray(ints).take(3).toArray());
console.log(Enumerable.FromArray(ints).skip(3).skip(2).take(2).toArray());