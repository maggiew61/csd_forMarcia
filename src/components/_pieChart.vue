<template>
  <transition name="fade">
    <div class="chartBox lineChart">
      <div v-if="title" class="flow-text title">{{title}}</div>
      <div :ref="id" class="chartPlace" :data-chart-id="id"  :style="{'min-height': height}"></div>
    </div>
  </transition>
</template>


<script>
import * as d3 from 'd3';

export default {
  // name: 'lineChart',
  data() {
    return {
      loading: false,
      el: null,
      chartData: [],
      highlight: '', // legend
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    title: String,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.init();
    this.renderData();
    this.renderChart();
  },
  watch: {
    data() {
      this.highlight = '';
      this.renderData();
      this.renderChart();
    },
    options() {
      if (!this.config.legend) {
        this.highlight = this.options.highlight;
      }
    },
    highlight() {
      this.renderData();
      this.renderChart();
    },
  },
  computed: {
    total() {
      return d3.sum(this.chartData, (data => d3.sum(data.data, d => d.value)));
    },
    maxValue() {
      return d3.max(this.chartData, (data => d3.max(data.data, d => d.value)));
    },
    minValue() {
      return d3.min(this.chartData, (data => d3.min(data.data, d => d.value)));
    },
    allLegend() {
      return this.data.map(d => d.name);
    },
    allAxis() {
      const axis = [];
      for (let i = 0; i < this.chartData.length; i += 1) {
        for (let j = 0; j < this.chartData[i].data.length; j += 1) {
          if (axis.indexOf(this.chartData[i].data[j].axis) < 0) {
            axis.push(this.chartData[i].data[j].axis);
          }
        }
      }
      return axis;
    },
    config() {
      const myConfig = {
        tooltip: true,
        legend: true,
        XaxisUnit: '',
        YaxisUnit: '',
        outerRadius: 100,
        innerRadius: 0,
        textOffset: 2.4,
        clickfn: null,
        color: d3.scaleOrdinal(d3.schemeCategory10),
      };
      // Import custom options
      if (this.options) {
        const keys = Object.keys(this.options);
        for (let i = 0; i < keys.length; i += 1) {
          myConfig[keys[i]] = this.options[keys[i]];
        }
      }
      return myConfig;
    },
  },
  methods: {
    init() {
      this.el = d3.select(this.$refs[this.id]);
    },
    renderData() {
      const dataSet = [];
      if (!this.highlight) {
        const data = JSON.parse(JSON.stringify(this.data));
        for (let i = 0; i < data.length; i += 1) {
          const obj = {
            name: data[i].name,
            data: data[i].data.map((d, index) => {
              d.parent = data[i].name;
              return d;
            }),
          };
          dataSet.push(obj);
        }
      } else {
        const oridata = JSON.parse(JSON.stringify(this.data));
        const data = oridata.filter(d => d.name === this.highlight);
        const dataleft = oridata.filter(d => d.name !== this.highlight);
        for (let j = 0; j < dataleft.length; j += 1) {
          data.push(dataleft[j]);
        }
        for (let i = 0; i < data.length; i += 1) {
          const obj = {
            name: data[i].name,
            data: data[i].data.map((d, index) => {
              d.parent = data[i].name;
              return d;
            }),
          };
          dataSet.push(obj);
        }
      }
      this.chartData = dataSet;// .slice().sort((a, b) => a.value < b.value);
    },
    renderChart() {
      const id = this.id;
      const el = this.el;
      el.html('');
      const config = this.config;
      const BBRect = el.node().getBoundingClientRect();
      const width = BBRect.width; // 圖表大小
      const height = BBRect.height; // 圖表大小
      const chartData = this.chartData;
      const padding = {
        top: 15,
        bottom: 35,
        right: 35,
        left: 35,
      };
      const regionWidth = width - padding.right - padding.left;
      const regionHeight = height - padding.top - padding.bottom;
      const maxValue = this.maxValue;
      const outerRadius = config.outerRadius;
      const innerRadius = config.innerRadius;
      function translation(x, y) {
        return `translate(${x}, ${y})`;
      }
       // wrap text function
      function wrap(text, textWidth) {
        text.each(function () {
          const tt = d3.select(this);
          const words = tt.text().split(/\s+/).reverse();
          const lineHeight = 1.1; // ems
          const y = tt.attr('y');
          const dy = parseFloat(tt.attr('dy'));
          tt.text(null);
          for (let i = 0; i < words.length; i += 1) {
            tt.append('tspan')
              .attr('x', 0)
              .attr('y', y)
              .attr('dy', (dy + (lineHeight * i)) + 'em')
              .text(words[i]);
          }
        });
      }
      const tooltip = el.append('div')
        .classed('chart-tooltip', true);
      const legendSet = el.append('div')
            .classed('legendSet', true)
            .append('ul');
      const div = el.append('div')
        .classed('chart', true);
      const svg = div.append('svg')
        .attr('width', width)
        .attr('height', height);
      const g = svg.append('g')
        .attr('transform', translation((width - regionWidth) / 2, (height - regionHeight) / 2));
      // legend
      if (this.config.legend) {
        const legend = legendSet.selectAll('li')
         .data(this.allLegend)
         .enter()
         .append('li')
         .attr('class', (d, i) => 'bar-chart-series bar-chart-series-' + i)
         .style('display', 'inline-block')
         .style('padding', '4px')
         .style('cursor', 'pointer')
         .style('opacity', (d) => {
           let opacity = 1;
           if (d === this.highlight || !this.highlight) {
             opacity = 1;
           } else {
             opacity = 0.3;
           }
           return opacity;
         })
         .on('click', (d, i) => {
           const className = `.chartPlace[data-chart-id="${this.id}"]`;
           if (this.highlight === d) {
             this.highlight = '';
             this.renderData();
             this.renderChart();
           } else {
             this.highlight = d;
             this.renderData();
             this.renderChart();
           }
         });
        legend.append('span')
         .classed('colorBlock', true)
         .style('background', (d, i) => config.color(d))
         .style('width', '12px')
         .style('height', '12px')
         .style('display', 'inline-block')
         .style('margin', '0px 5px');
        legend.append('span')
         .classed('legendBlock', true)
         .html((d, i) => d);
      }
      const pie = d3.pie().value(d => d.data[0].value).sort(null);
      const arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
      const arcs = g.selectAll('g.arc')
        .data(pie(chartData))
        .enter()
        .append('g')
        .attr('class', ((d, i) => 'arc pie-chart-series pie-chart-series-' + i))
        .attr('transform', translation(regionWidth / 2, regionHeight / 2))
        .style('opacity', 1)
        .style('cursor', 'pointer')
        .on('mouseover', (d, i) => {
          const point = `.chartPlace[data-chart-id="${id}"] path.pie-chart-series-${i}`;
          const node = d3.select(point);
          node.classed('hover', true);
          node.style('opacity', 0.8);
          let tooltipStr = '';
          if (d.data.data[0].info) {
            tooltipStr = d.data.data[0].info.map(dd => `<div><span class="label">${dd[0]} :</span> <span class="value">${dd[1]}</span></div>`).join('');
          } else {
            tooltipStr = `<div>${d.axis}</div> <div>${d.value}</div>`;
          }
          tooltip.html(tooltipStr);
          tooltip.classed('active', true);
          tooltip
           .transition(200)
           .style('opacity', 1);
        })
        .on('mouseout', (d, i) => {
          const point = '.chartPlace[data-chart-id="' + this.id + '"] path.pie-chart-series-' + i;
          const node = d3.select(point);
          node.classed('hover', false);
          tooltip.classed('active', false);
          g.selectAll('path')
           .transition(200)
           .style('opacity', 1);
        })
        .on('mousemove', (d) => {
          tooltip
            .style('top', (d3.event.pageY + 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px');
        })
        .on('click', (d) => {
          if (config.clickfn) {
            config.clickfn(d);
          }
        });
      // Draw arc paths
      arcs.append('path')
         .attr('fill', (d, i) => config.color(d.data.name))
        .attr('class', ((d, i) => 'arc pie-chart-series pie-chart-series-' + i))
        .transition()
        .duration(800)
        .attrTween('d', (d) => {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return (t => arc(interpolate(t)));
        });
        // var c = arc.centroid(d);
                    // return translation(c[0] * 1.41  ,  c[1] * 1.41)
      arcs.append('text')
        .attr('transform', (d) => {
          const x = arc.centroid(d)[0] * config.textOffset;
          const y = arc.centroid(d)[1] * config.textOffset;
          return translation(x, y);
        })
        .attr('text-anchor', 'middle')
        .style('fill', '#356669')
        .attr('opacity', 0)
        .style('font-size', '14px')
        .text(d => Math.round((d.value / this.total) * 100) + '%')
        .transition()
        .duration(800)
        .delay((d, i) => (200 * i) + 400)
        .attr('opacity', 1);
    },
  },
};

</script>

<style lang="scss" scrope>
  .title{
    padding: 15px;
  }
</style>
