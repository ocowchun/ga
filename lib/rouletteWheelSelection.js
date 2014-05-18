var Chromosome = require('./chromosome');
var _ = require('underscore');

// http://en.wikipedia.org/wiki/Roulette_wheel_selection
function RouletteWheel(fitness) {
	var roulette = [];
	var chromosomeCollection = [];
	var currentScore = 0;

	this.add = function(chromosome) {
		currentScore += fitness(chromosome);
		roulette.push(currentScore);
		chromosomeCollection.push(chromosome);
	}

	this.get = function() {
		target = Math.random() * currentScore;
		return getChromosome(target);
	}

	var getChromosome = function(target) {

		var result = chromosomeCollection[0];
		var isStop = false,
			current = 0;
		while (!isStop) {
			if (target < roulette[current]) {
				result = chromosomeCollection[current];
				isStop = true;
				console.log('fuck');
			} else {
				isStop = current == roulette.length;
			}
			current++;
		}
		return result;
	}
}

//輪盤法
function rouletteWheelSelection(collection, fitness) {
	var r = new RouletteWheel(fitness);
	_.each(collection, function(c) {
		r.add(c);
	});
	return r;
}

module.exports = rouletteWheelSelection;
