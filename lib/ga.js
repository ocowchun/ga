var Chromosome = require('./chromosome');
var rouletteWheelSelection = require('./rouletteWheelSelection');
var onePointCrossoverMethod = require('./onePointCrossoverMethod');
var _ = require('underscore');

// console.log(new Chromosome([0, 1, 0, 1]))


function excute(amount, generationRule) {
	// amount = 5;
	var chromosomeCollection = initChromosomeCollection(amount, generationRule);
	var i = 0;
	while (i < 100) {
		console.log('excute');
		chromosomeCollection = nextGeneration(chromosomeCollection);
		i++;
		var b = findBest(chromosomeCollection, fitness)
		showAnswer(b);
	}

}

function showAnswer(chromosome) {
	// console.log(chromosome);
	var x1 = (chromosome.x0 + 0) / 1024 * 4;
	var x2 = (chromosome.x1 + 0) / 1024 * 6;

	//obj: 375x1-25x1^2+700x2-(200/3)*x2^2
	var f = 375 * x1 - 25 * Math.pow(x1, 2) + 700 * x2 - (200 / 3) * Math.pow(x2, 2)
		//con: X1+2X2+4X3  <= 40

	console.log("x1:" + x1);
	console.log("x2:" + x2);
	console.log("obj:" + f);
}

// 選擇初始生命種群
function initChromosomeCollection(amount, generationRule) {
	var collection = [];
	for (var i = 0; i < amount; i++) {
		var chromosome = generationRule();
		collection.push(chromosome);
	}
	return collection;
}

//產生下一代
function nextGeneration(collection) {


	var chromosomePool = selection(collection);

	var result = crossover(chromosomePool);


	result = mutation(result);

	var b = findBest(collection, fitness)
	result.push(b);
	return result;
}


// 選擇下一個種群的候選人
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
	var crossoverPool;

	var group = _.groupBy(chromosomePool, function(num) {
		return Math.random() < crossoverRate ? "crossover" : "others";
	});
	crossoverPool = group["crossover"];
	var newChromosomeCollection = group["others"] || [];

	var couples = mapping(crossoverPool);

	_.each(couples, function(c) {
		newChromosomeCollection = newChromosomeCollection.concat(onePointCrossoverMethod(c[0], c[1]));
	});
	// return newChromosomeCollection.concat(otherChromosomeCollection);
	return newChromosomeCollection;
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

function mutation(chromosomePool) {
	var mutationRate = 0.1;
	var mutationPool, otherChromosomeCollection;
	var newChromosomeCollection;
	var group = _.groupBy(chromosomePool, function(num) {
		return Math.random() < mutationRate ? "mutation" : "others";
	});
	mutationPool = group["mutation"];
	newChromosomeCollection = group["others"];

	_.each(mutationPool, function(c) {
		newChromosomeCollection.push(c.mutation());
	});

	return newChromosomeCollection;
}


var cc = excute(30, generationChromoSome)
	// console.log(cc)
	// var g = mutation(cc);
	// console.log(g.length);
	// var c1=new Chromosome([[ 1, 1, 1, 1, 1, 1, 1 ]]);
	// var f=fitness(c1);
	// console.log(f);

// 適應函數(Fitness Function)：對染色體進行評估給予一個適應性指標
function fitness(chromosome) {
	// console.log(chromosome);
	var x1 = (chromosome.x0 + 0) / 1024 * 4;
	var x2 = (chromosome.x1 + 0) / 1024 * 6;

	//obj: 375x1-25x1^2+700x2-(200/3)*x2^2
	var f = 375 * x1 - 25 * Math.pow(x1, 2) + 700 * x2 - (200 / 3) * Math.pow(x2, 2)
		//con: X1+2X2+4X3  <= 40
	if ((3 * x1 + 2 * x2) > 18) {
		f = 0;
	}



	return 4000 + f;


}

function generationChromoSome() {
	var genomes1 = generateGenomes(10),
		genomes2 = generateGenomes(10);
	// for (var i = 0; i < 10; i++) {
	// 	var bit = Math.floor(Math.random() * 2);
	// 	genomes1.push(bit);
	// }

	return new Chromosome([genomes1, genomes2]);
}

function generateGenomes(length) {
	var genomes = [];
	for (var i = 0; i < length; i++) {
		var bit = Math.floor(Math.random() * 2);
		genomes.push(bit);
	}
	return genomes;
}

function findBest(chromosomeCollection, fitness) {
	var obj = _.max(chromosomeCollection, function(c) {
		return fitness(c);
	});
	return obj;
}