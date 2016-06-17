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
describe('# TEST CASE: PROPERTY WORKFLOW', function(){
	
})