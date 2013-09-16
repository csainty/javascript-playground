var byNatural = function (a, b) {
	return a === b ? 0 : a < b ? -1 : 1;
}
var byEveness = function (a, b) {
	return byNatural(a % 2, b % 2);
}
var byThree = function (a, b) {
	return byNatural(a % 3, b % 3);
}

var a = function() { return [5,3,2,1,4,8,6,7,9,10] };

function match(a1, a2) {
	var result = (function() {if (a1.length !== a2.length) return false;

	for (var i = 0; i < a1.length; i++){
		if (a1[i]!==a2[i]) return false;
	}
	return true;})();

	console.log(result);
	if (!result) {
		console.log("Got " + a1 + " - Expected " + a2);
	}
}

function sortBy(fn, reverseSort) {
    var sortFn = function (first, second) {
        return fn(first, second) * (reverseSort ? -1 : 1);
    };

    sortFn.thenBy = function (thenFn, thenReverseSort) {
        return sortBy(function (first, second) {
            var result = sortFn(first, second);
            if (result === 0) {
                result = thenFn(first, second) * (thenReverseSort ? -1 : 1);
            }
            return result;
        });
    };

    return sortFn;
}

match(a().sort(sortBy(byNatural)), [1,2,3,4,5,6,7,8,9,10]);
match(a().sort(sortBy(byNatural, true)), [10,9,8,7,6,5,4,3,2,1]);
match(a().sort(sortBy(byEveness)), [2,4,8,6,10,5,3,1,7,9]);
match(a().sort(sortBy(byEveness).thenBy(byNatural)), [2,4,6,8,10,1,3,5,7,9]);
match(a().sort(sortBy(byEveness, true).thenBy(byNatural)), [1,3,5,7,9,2,4,6,8,10]);
match(a().sort(sortBy(byEveness, true).thenBy(byNatural, true)), [9,7,5,3,1,10,8,6,4,2]);
match(a().sort(sortBy(byThree).thenBy(byNatural)), [3,6,9,1,4,7,10,2,5,8]);
match(a().sort(sortBy(byThree).thenBy(byNatural, true)), [9,6,3,10,7,4,1,8,5,2]);
match(a().sort(sortBy(byEveness).thenBy(byThree).thenBy(byNatural, true)), [6,10,4,8,2,9,3,7,1,5]);