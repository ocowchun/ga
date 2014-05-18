var Chromosome = require('./chromosome');
var rouletteWheelSelection = require('./rouletteWheelSelection');
var onePointCrossoverMethod = require('./onePointCrossoverMethod');
var _ = require('underscore');

// console.log(new Chromosome([0, 1, 0, 1]))


// 選擇初始生命種群
function initChromosomeCollection(amount, generationRule) {
	var collection = [];
	for (var i = 0; i < amount; i++) {
		var chromosome = generationRule();
		collection.push(chromosome);
	}
	return collection;
}

// 選擇下一個種群
function selection(collection) {
	var chromosomePool = [],
		rouletteWheel = rouletteWheelSelection(collection, fitness);

	_(collection.length).times(function() {
		chromosomePool.push(rouletteWheel.get());
	});

	return chromosomePool;
}


function crossover(chromosomePool) {
	var crossoverRate = 0.8;
	var crossoverPool, otherChromosomeCollection;
	var newChromosomeCollection = [];
	var group = _.groupBy(chromosomePool, function(num) {
		return Math.random() < 0.8 ? "crossover" : "others";
	});
	crossoverPool = group["crossover"];
	otherChromosomeCollection = group["others"];

	var couples = mapping(crossoverPool);

	_.each(couples, function(c) {
		newChromosomeCollection = newChromosomeCollection.concat(onePointCrossoverMethod(c[0], c[1]));
	});
	return newChromosomeCollection.concat(otherChromosomeCollection);
}

//兩兩一對
function mapping(chromosomeCollection) {
	var result = [];
	var max = Math.floor(chromosomeCollection.length / 2);
	for (var i = 0; i < max; i++) {
		var start = i * 2;
		var end = start + 2;
		result.push(chromosomeCollection.slice(start, end));
	}
	if (_.last(result).length != 2) {
		result.pop();
	}
	return result;
}

// function 

function mutation(chromosomePool) {
	var mutationRate = 0.1;
	var mutationPool, otherChromosomeCollection;
	var newChromosomeCollection = [];
	var group = _.groupBy(chromosomePool, function(num) {
		return Math.random() < 0.8 ? "mutation" : "others";
	});
	mutationPool = group["mutation"];
	otherChromosomeCollection = group["others"];

	
}


var cc = initChromosomeCollection(30, generationChromoSome)
	// console.log(cc)
var g = crossover(cc);
console.log(g.length);


// 適應函數(Fitness Function)：對染色體進行評估給予一個適應性指標
function fitness(chromosome) {

	var x1 = chromosome.x0 + 0;
	return Math.pow(x1, 3);
}

function generationChromoSome() {
	var genomes = [];
	for (var i = 0; i < 7; i++) {
		var bit = Math.floor(Math.random() * 2);
		genomes.push(bit);
	}
	return new Chromosome([genomes]);
}



// var g1 = _.groupBy([1, 2, 3, 4, 5, 6, 7]

// 		console.log(g1)