/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart'], function (oj, ko, $) {


    function ExampleComponentModel(context) {
        var self = this;

        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        var emplslist = [{name: "Ismael Sciarra", job: "IT_PROG", salary: 7700},
                         {name: "Jose Manuel", job: "IT_PROG", salary: 4800},
                         {name: "Nancy Greenberg", job: "SA_MAN", salary: 12008},
                         {name: "Diana Lorentz", job: "SA_MAN", salary: 4200},
                         {name: "Daniel Faviet", job: "SA_MAN", salary: 19000}];

        /* chart data */
        var pieSeries = [];

        emplslist.forEach (function (element) {
          pieSeries.push({name: element.name, items: [element.salary]});
        });

        self.pieSeriesValue = ko.observableArray(pieSeries);

        self.synchEmplsChart = function(jobKey) {
          pieSeries = [];

          emplslist.forEach (function (element) {
            if (element.job === jobKey) {
              pieSeries.push({name: element.name, items: [element.salary]});
            }
          });

          if (pieSeries.length === 0) {
            emplslist.forEach (function (element) {
              pieSeries.push({name: element.name, items: [element.salary]});
            });
          }

          self.pieSeriesValue(pieSeries);
        };

        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };

    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});
