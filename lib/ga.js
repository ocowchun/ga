var Chromosome = require('./chromosome');
var rouletteWheelSelection = require('./rouletteWheelSelection');
var onePointCrossoverMethod = require('./onePointCrossoverMethod');

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


function crossover() {

}

// var cc=initChromosomeCollection(30,generationChromoSome)
// console.log(cc)

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
	return new Chromosome(genomes);
}