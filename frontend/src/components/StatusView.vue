<template>
    <v-container>
        <v-card>
            <v-container>
                <svg id="app" width="800" height="600"></svg>
                <div>
                    <h1>Nodes Counts <span id="nodeCount">0</span></h1>
                </div>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    import * as d3 from 'd3'
    import data from '@/data'
    var collector = [],
        analyzer = [],
        storage = [];
    export default {
        data() {
            return {
                route: window.location.hash,
                message: "hello",
                collector: [],
                analyzer: [],
                storage: []

            }
        },
        created() {
            this.init()
            // this.setData()
        },
        mounted() {
            this.setData()
        },
        methods: {
            reversedMessage: function () {
                return this.message.split('').reverse().join('')
            },
            init() {
                data.forEach(function (node, i) {
                    if (node.type == 'collector')
                        collector.push(node);
                    if (node.type == 'analyzer')
                        analyzer.push(node);
                    if (node.type == 'storage')
                        storage.push(node);
                });

            },
            setData() {
                var format = d3.format(",d");
                d3.select("#nodeCount")
                    .transition()
                    .duration(2500)
                    .on("start", function repeat() {
                        d3.active(this)
                            .tween("text", function () {
                                var that = d3.select(this),
                                    i = d3.interpolateNumber(that.text().replace(/,/g, ""), data.length);
                                return function (t) {
                                    that.text(format(i(t)));
                                };
                            })
                            .transition()
                            .delay(1500)
                            .on("start", repeat);
                    });
                /////////////////////////////// create node
                var node = d3.select("svg")
                    .selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("r", function (d) {
                        return d.r
                    })
                    .attr("fill", function (d) {
                        return d.color
                    })
                    .attr("id", function (d) {
                        return d.uuid
                    })
                    .attr("type", function (d) {
                        return d.type
                    })
                    .attr("stroke", "black")
                    .attr("cx", 400)
                    .attr("cy", 300)
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
                    .on('click', function (d) {
                        nodeData(d);
                    })
                d3.select("svg").style("opacity", 1e-6)
                    .transition()
                    .duration(1000)
                    .style("opacity", 1);
                ///////////////////////////////////////////////////////////

                var simulation = d3.forceSimulation()
                    .force("collide",
                        d3.forceCollide()
                        .radius(function (d) {
                            return d.r + 1.5
                        })
                        .strength(1.0)
                        .iterations(16))
                    .force("charge", d3.forceManyBody().strength(5))
                    .force("x", d3.forceX().strength(1).x(function (d) {
                        var hash = window.location.hash.split("&");
                        if (hash.length == 1) {

                            if (hash[0] == "#sort") {
                                return d.forcex;
                            } else if (hash[0] == "") {
                                return 400;
                            }
                        } else if (hash.length == 2) {
                            if (hash[1] == d.uuid) {
                                return d.movex;
                            }
                            if (hash[0] == "#sort") {
                                return d.forcex + 1000;
                            } else if (hash[0] == "#") {
                                return 400 + 1000;
                            }
                        }
                    }))
                    .force("y", d3.forceY().strength(1).y(function (d) {
                        var hash = window.location.hash.split("&");
                        if (hash.length == 1) {

                            if (hash[0] == "#sort") {
                                return d.forcey;
                            } else if (hash[0] == "") {
                                return 300;
                            }
                        } else if (hash.length == 2) {
                            if (hash[1] == d.uuid) {
                                return d.movey;
                            }
                            if (hash[0] == "#sort") {
                                return d.forcey + 1000;
                            } else if (hash[0] == "#") {
                                return 300 + 1000;
                            }
                        }
                    }));
                restart();
                d3.select("svg")
                    .on("wheel.zoom", changeMode);

                function restart() {
                    simulation
                        .nodes(data)
                        .on("tick", ticked)
                    simulation.alpha(1).restart();

                }

                function ticked() {
                    node
                        .attr("cx", function (d) {
                            return d.x;
                        })
                        .attr("cy", function (d) {
                            return d.y;
                        });
                }

                function changeMode() {
                    var hash = window.location.hash.split("&");
                    if (hash.length == 1) {
                        if (hash[0] == "") {
                            window.location = "#sort";
                            restart();
                        } else if (hash[0] == "#sort") {
                            window.location = "#";
                            restart();
                        }
                    }
                }

                function nodeData(n) {
                    var hash = window.location.hash.split("&");
                    if (hash[0] == "") hash[0] = "#";

                    if (hash.length == 1) {

                        window.location = hash[0] + "&" + n.uuid;
                        d3.select("svg").append("text")
                            .attr("x", "50")
                            .attr("y", "70")
                            .text(n.type.charAt(0).toUpperCase() + n.type.slice(1) + "   " + n.uuid)
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "20px");
                        d3.select("svg").append("text")
                            .attr("x", "50")
                            .attr("y", "120")
                            .text("All Rank 3/150")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "20px");
                        d3.select("svg").append("text")
                            .attr("x", "50")
                            .attr("y", "140")
                            .text("Node Rank   1/50")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "20px");
                        d3.select("svg").append("text")
                            .attr("x", "50")
                            .attr("y", "170")
                            .text("Contribution 8999")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", "20px");
                    } else if (hash.length == 2) {
                        window.location = hash[0]
                        d3.select("text").remove();
                        d3.select("text").remove();
                        d3.select("text").remove();
                        d3.select("text").remove();
                    }
                    restart();
                }

                function dragstarted(d) {
                    if (!d3.event.active) {
                        simulation.alphaTarget(0.3).restart();

                    }
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(d) {
                    d.fx = d3.event.x;
                    d.fy = d3.event.y;
                }

                function dragended(d) {
                    if (!d3.event.active) {
                        simulation.alphaTarget(0);
                    }
                    d.fx = null;
                    d.fy = null;
                }
            }
        }
    }
</script>

<style>
    div text {
        font: 500 50x/500px "Helvetica Neue";
        margin: 0;
    }
</style>