'use strict';
var _ = require('underscore');

//genome 基因組
//每個基因組會對應到一個變數
//基因組的值是二進位的 ex: [0,1,0,1]=5
function calculateGenome(genome) {
	var result = 0;
	for (var i = 0, max = genome.length; i < max; i++) {
		result += Math.pow(2, i) * genome[i];
	}
	return result;
}

var Chromosome = function(args) {
	// var args = Array.prototype.slice.call(arguments, 0),
	var i, max;
	this.genomeCount = args.length;
	this.totalGenome = [];
	for (i = 0, max = args.length; i < max; i++) {
		this['x' + i + 'genome'] = args[i];
		this['x' + i] = calculateGenome(args[i]);
		this.totalGenome = this.totalGenome.concat(args[i])
	}
};

Chromosome.prototype.changeGene = function(index, anotherChromosome) {
	var gene = anotherChromosome.totalGenome[index];
	var newTotalGenome = this.totalGenome.slice(0);
	newTotalGenome[index] = gene;

	var newGenomeCollection = getGenomeCollection(this, newTotalGenome);
	return new Chromosome(newGenomeCollection);
};

Chromosome.prototype.mutation = function() {
	// var gene = anotherChromosome.totalGenome[index];
	var index = Math.floor(Math.random() * this.totalGenome.length);
	var newTotalGenome = this.totalGenome.slice(0);

	if (newTotalGenome[index] == 1) {
		newTotalGenome[index] = 0;
	} else {
		newTotalGenome[index] = 1;
	}

	var newGenomeCollection = getGenomeCollection(this, newTotalGenome);
	return new Chromosome(newGenomeCollection);
};


function getGenomeCollection(chromosome, totalGenome) {
	var currentIndex = 0,
		newGenomeCollection = [];
	for (var i = 0; i < chromosome.genomeCount; i++) {
		var length = chromosome['x' + i + 'genome'].length;
		var newGenome = totalGenome.slice(currentIndex, currentIndex + length);
		newGenomeCollection.push(newGenome);
		currentIndex += length;
	}
	return newGenomeCollection;
}

module.exports = Chromosome;