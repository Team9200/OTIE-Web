<template>
    <v-container>
        <v-card>
            <v-container>
                <svg id="app" width="1050" height="530"></svg>
                <div>
                    <h1>Nodes Counts <span id="nodeCount">0</span></h1>
                </div>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>

    import * as d3 from 'd3';
    import data from '@/data';
    import { APIService } from '../api/APIService';

    const apiService = new APIService();
   
    let collector = [],
        analyzer = [],
        storage = [];

    export default {
        data() {
            return {
                route: window.location.hash,
                message: "hello",
                collector: [],
                analyzer: [],
                storage: [],

            }
        },
        created() {

            this.init();

        },
        mounted() {

            this.setData();

        },
        methods: {

            reversedMessage: function () {

                return this.message.split('').reverse().join('');

            },
            init() {

                apiService.getStorage().then(response => {
          
                    console.log(response.message);
        
                });

            },
            setData() {

                // Counting number

                let format = d3.format(",d");

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


                // Create Bubble.

                let node = d3.select("svg")
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
                    });
                // svg style.

                d3.select("svg").style("opacity", 1e-6)
                    .transition()
                    .duration(1000)
                    .style("opacity", 1);


                // Bubble force

                let simulation = d3.forceSimulation()
                    .force("collide",
                        d3.forceCollide()
                        .radius(function (d) {
                            return d.r + 1.5                                // 구의 척력 반경  
                        })
                        .strength(1.0)                                      // 강도
                        .iterations(16))                                    // 몰라 
                    .force("charge", d3.forceManyBody().strength(5))        // 인력 
                    .force("x", d3.forceX().strength(1.5).x(function (d) {    // 힘이 발생하는 위치.

                        const hash = window.location.hash.split("&");

                        if (hash.length == 1) {                       

                            if (hash[0] == "#sort") {

                                return d.forcex;
                            
                            } else if (hash[0] == "") {
                             
                                return 525;
                            
                            }

                        }
                    }))
                    .force("y", d3.forceY().strength(1.5).y(function (d) {

                        const hash = window.location.hash.split("&");

                        if (hash.length == 1) {

                            if (hash[0] == "#sort") {

                                return d.forcey;

                            } else if (hash[0] == "") {

                                return 265;

                            }
                        }
                    }));

                // 도움말. 

                let svg = d3.select("svg");

                svg.append("circle")
                    .attr("r", 9)
                    .attr("cx", 930)
                    .attr("cy", 30)
                    .attr("strock", "black")
                    .attr("fill", "#03d6a8")

                svg.append("circle")
                    .attr("r", 9)
                    .attr("cx", 930)
                    .attr("cy", 60)
                    .attr("strock", "black")
                    .attr("fill", "#8c25ea")
                
                svg.append("circle")
                    .attr("r", 9)
                    .attr("cx", 930)
                    .attr("cy", 90)
                    .attr("strock", "black")
                    .attr("fill", "#2683ff")

                svg.append("text")
                    .text("Analyzer Node")
                    .attr("x", "950")
                    .attr("y", "64")

                svg.append("text")
                    .text("Stroage Node")
                    .attr("x", "950")
                    .attr("y", "94")

                svg.append("text")
                    .text("Collector Node")
                    .attr("x", "950")
                    .attr("y", "34")

                // start

                restart();

                function restart() {
                    simulation
                        .nodes(data)
                        .on("tick", ticked)
                    simulation.alpha(1).restart();

                }


                // click event.

                d3.select("svg")
                    .on("wheel.zoom", changeMode);

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


                // 변경되는 좌표 적용.

                function ticked() {
                    node
                        .attr("cx", function (d) {
                            return d.x;
                        })
                        .attr("cy", function (d) {
                            return d.y;
                        });
                }

                // node click event

                function nodeData(n) {

                    location.href='profile?type=analyzer&name=김기홍';

                }

                // drag events

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
