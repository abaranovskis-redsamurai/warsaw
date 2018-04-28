/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcollectiontabledatasource', 'ojs/ojmodule', 'ojs/ojchart'], function (oj, ko, $) {


    function ExampleComponentModel(context) {
        var self = this;

        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        self.restBackEndUrl = "http://host/restapp/rest/1/Jobs?onlyData=true";
        self.salSeriesValue = ko.observableArray();
        self.salGroupsValue = ko.observableArray();

        self.createModel = function () {
            var ModelData = oj.Model.extend({
                urlRoot: self.restBackEndUrl,
                idAttribute: 'JobId'
            });
            return new ModelData();
        };

        self.createCollection = function () {
            var CollectionData = oj.Collection.extend({
                url: self.restBackEndUrl,
                fetchSize: -1,
                model: this.createModel()
            });
            return new CollectionData();
        };

        self.jobsData = self.createCollection();

        self.jobsData.fetch({
            success: function (collection, response) {
                var minSal = [];
                var maxSal = [];
                var jobTitles = [];
                for (var i = 0; i < collection.size(); i++) {
                  minSal.push(collection.at(i).attributes.MinSalary);
                  maxSal.push(collection.at(i).attributes.MaxSalary);
                  jobTitles.push(collection.at(i).attributes.JobId);
                }

                var salSeries = [{name: 'Maximum', items: maxSal}, {name: 'Minimum', items: minSal}];

                self.salSeriesValue(salSeries);
                self.salGroupsValue(jobTitles);
            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });

        self.selectionListener = function(event) {
          var params = {
            'bubbles': true,
            'detail': {'value': event.detail.selectionData[0].groupData[0]}
          };
          self.composite.dispatchEvent(new CustomEvent('jobSelection', params));
        }

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
