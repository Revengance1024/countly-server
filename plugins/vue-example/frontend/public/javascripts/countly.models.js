/*global $, countlyCommon, Vue, _ */

(function(countlyVueExample) {

    countlyVueExample.initialize = function() {};

    countlyVueExample.factory = {
        getEmpty: function(fields) {
            fields = fields || {};
            var original = {
                _id: null,
                name: '',
                field1: '',
                field2: '',
                description: '',
                status: false,
                selectedProps: [],
                visibility: 'private'
            };
            return _.extend(original, fields);
        }
    };

    countlyVueExample.getVuexModule = function() {
        return {
            name: "vueExample",
            module: {
                namespaced: true,
                state: {
                    records: [],
                    randomNumbers: [],
                    pieData: {
                        "dp": [
                            {"data": [[0, 20]], "label": "Test1", "color": "#52A3EF"},
                            {"data": [[0, 10]], "label": "Test2", "color": "#FF8700"},
                            {"data": [[0, 50]], "label": "Test3", "color": "#0EC1B9"}
                        ]
                    },
                    lineData: {
                        "dp": [
                            {"data": [[-1, null], [0, 20], [1, 10], [2, 40], [3, null]], "label": "Value", "color": "#52A3EF"},
                        ],
                        "ticks": [[-1, ""], [0, "Test1"], [1, "Test2"], [2, "Test3"], [3, ""]]
                    },
                    barData: {
                        "dp": [
                            {"data": [[-1, null], [0, 20], [1, 10], [2, 40], [3, null]], "label": "Value", "color": "#52A3EF"},
                        ],
                        "ticks": [[-1, ""], [0, "Test1"], [1, "Test2"], [2, "Test3"], [3, ""]]
                    },
                    id: 0
                },
                getters: {
                    records: function(state) {
                        return state.records;
                    },
                    randomNumbers: function(state) {
                        return state.randomNumbers;
                    },
                    pieData: function(state) {
                        return state.pieData;
                    },
                    barData: function(state) {
                        return state.barData;
                    },
                    lineData: function(state) {
                        return state.lineData;
                    }
                },
                mutations: {
                    saveRecord: function(state, obj) {
                        if (obj._id !== null) {
                            state.records = state.records.filter(function(val) {
                                return val._id !== obj._id;
                            }).concat(obj);
                        }
                        else {
                            obj._id = state.id;
                            state.records.push(obj);
                            state.id++;
                        }
                    },
                    deleteRecordById: function(state, _id) {
                        state.records = state.records.filter(function(val) {
                            return val._id !== _id;
                        });
                    },
                    setStatus: function(state, obj) {
                        var target = state.records.filter(function(val) {
                            return val._id === obj._id;
                        });
                        if (target.length > 0) {
                            Vue.set(target[0], "status", obj.value);
                        }
                    },
                    setRandomNumbers: function(state, obj) {
                        state.randomNumbers = [obj, obj.map(function(x) {
                            return x / 2;
                        })];
                    }
                },
                actions: {
                    updateRandomArray: function(context) {
                        return $.when($.ajax({
                            type: "GET",
                            url: countlyCommon.API_URL + "/o",
                            data: {
                                app_id: countlyCommon.ACTIVE_APP_ID,
                                method: 'get-random-numbers'
                            }
                        })).then(function(json) {
                            context.commit("setRandomNumbers", json);
                        }, function() {
                            /* handle error */
                        });
                    }
                }
            }
        };
    };

})(window.countlyVueExample = window.countlyVueExample || {});