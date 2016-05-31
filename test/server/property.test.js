'use strict';

var path = require("path");
var fs = require("fs");
var moment = require("moment");

// Require the test framework modules 
var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// Require the Workflow class 
var Workflow = require("../../index.js");

// Get the test workflow configuration file
var filePath = path.join(__dirname, '../mangaungProperty.json');
var config = fs.readFileSync(filePath, { encoding: 'utf-8' });

// Create the workflow constrctor instance
var workflow = new Workflow('1234', '5678', config);

// Workflow: Test case #1
describe('# Test Case (No2): Mangaung property workflow.', function(){
	describe('- Step 1. User ( capturer ) opens the workflow sub process form interface, and registers the a property.', function(){
		it('Should return ')
		// What workflow method should be called??
		
	});
})