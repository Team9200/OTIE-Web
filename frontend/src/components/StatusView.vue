<template>
    <v-container>
        <v-card>
            <v-container>
                <div>
                    <h1>Nodes Counts <span id="nodeCount">0</span></h1>
                </div>
                <svg id="app" width="1100" height="530"></svg>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    import * as d3 from 'd3';
    //import data from '@/data';
    import {
        APIService
    } from '../api/APIService';
    import {
        forEach
    } from 'p-iteration';


    const apiService = new APIService();

    let collector = [],
        analyzer = [],
        storage = [];

    export default {
        data() {
            return {
                collector: 0,
                analyzer: 0,
                storage: 0,

            }
        },
        created() {

            this.init();

        },
        mounted() {

        },
        methods: {

            async init() {

                let nodeDatas = [];

                await apiService.getUser().then(async (response) => {

                    const data = response.message;

                    await forEach(data, async (node) => {

                        let userTmp = {};

                        userTmp.publickey = node.publickey;
                        userTmp.name = node.username;
                        userTmp.type = node.nodetype;
                        userTmp.x = 825;
                        userTmp.y = 365;
                        userTmp.cont = node.contribution;
                        userTmp.r = 8 + ((node.contribution) /100)
                        userTmp.type = node.nodetype;

                        if (node.nodetype == 'Collector') {
                            
                            userTmp.color = '#03d6a8';
                            userTmp.forcex = 262;
                            userTmp.forcey = 132;
                            this.collector += 1;

                        } 
                        else if (node.nodetype == 'Analyzer') {

                            userTmp.color = '#2683ff';
                            userTmp.forcex = 525;
                            userTmp.forcey = 265;
                            this.analyzer += 1;
                        }
                        else if (node.nodetype == 'Storage') {

                            userTmp.color = "#8c25ea";
                            userTmp.forcex = 788;
                            userTmp.forcey = 398;
                            this.storage += 1;

                        }
                        nodeDatas.push(userTmp);

                    });

                });
                console.log(nodeDatas);
                this.setData(nodeDatas);
                this.number(nodeDatas);
            },
            number(data) {

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
            },
            setData(data) {


                var tooltip = d3.select("body")
                    .append("div")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
                    .style("display", "none")
                    .style("color", "white")
                    .style("padding", "8px")
                    .style("text-align", "center")
                    .style("background-color", "rgba(0, 0, 0, 0.75)")
                    .style("border-radius", "6px")
                    .style("font", "14px sans-serif")
                    .text("tooltip");

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
                        return d.publickey
                    })
                    .attr("type", function (d) {
                        return d.type
                    })
                    .attr("stroke", "black")
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended))
                    .on('click', function (d) {
                        nodeData(d);
                    })
                    .on("mouseover", function (d) {

                        tooltip.html(d.type + "<br>Username: " + d.name + "<br>Contribution: "+d.cont);
                        tooltip.style("visibility", "visible");
                        tooltip.style("display", "inline");
                    }).on("mousemove", function () {
                        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX +
                            10) + "px");
                    })
                    .on("mouseout", function () {
                        return tooltip.style("visibility", "hidden");
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
                            return d.r + 1.5 // 구의 척력 반경  
                        })
                        .strength(1.0) // 강도
                        .iterations(16)) // 몰라 
                    .force("charge", d3.forceManyBody().strength(5)) // 인력 
                    .force("x", d3.forceX().strength(1.5).x(function (d) { // 힘이 발생하는 위치.

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
                    .attr("cx", 910)
                    .attr("cy", 10)
                    .attr("strock", "black")
                    .attr("fill", "#03d6a8")

                svg.append("circle")
                    .attr("r", 9)
                    .attr("cx", 910)
                    .attr("cy", 40)
                    .attr("strock", "black")
                    .attr("fill", "#2683ff")

                svg.append("circle")
                    .attr("r", 9)
                    .attr("cx", 910)
                    .attr("cy", 70)
                    .attr("strock", "black")
                    .attr("fill", "#8c25ea")

                svg.append("text")
                    .text("Collector Node")
                    .attr("x", "930")
                    .attr("y", "14")

                svg.append("text")
                    .text("Analyzer Node")
                    .attr("x", "930")
                    .attr("y", "44")


                svg.append("text")
                    .text("Stroage Node")
                    .attr("x", "930")
                    .attr("y", "74")

                svg.append("text")
                    .text(this.collector)
                    .attr("x", "1030")
                    .attr("y", "14")


                svg.append("text")
                    .text(this.analyzer)
                    .attr("x", "1030")
                    .attr("y", "44")

                svg.append("text")
                    .text(this.storage)
                    .attr("x", "1030")
                    .attr("y", "74")

                svg.append("text")
                    .text("구의 크기는 시스템 기여도에 비례합니다.")
                    .attr("x", "0")
                    .attr("y", "480")

                svg.append("text")
                    .text("마우스 휠을 통해 정렬이 가능합니다.")
                    .attr("x", "0")
                    .attr("y", "500")

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

                    location.href = 'profile?type=' + n.type.toLowerCase() + '&name=' + n.publickey;

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
<style>
    circle:hover {
        opacity: 0.4;
        cursor: pointer;
    }
</style>