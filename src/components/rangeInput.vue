<template>
  <div class="inputWrap">
    <div class="rangeInput" v-if="!mutiple">
      <input type="range" :min="min" :max="max" v-model="value" @change="valued()">
    </div>
    <div class="rangeInput" v-if="mutiple">
      <div class="rangeInputwrap">
        <span class="rangeInputBar"></span>
        <span class="range" :style="{'width': width + '%', 'left': startPosition + '%'}"></span>
        <input type="range" class="mutipleInput" :min="min" :max="max" v-model="value"
              @change="valued()">
        <input type="range" class="mutipleInput" :min="min" :max="max" v-model="value2"
              @change="valued()">
      </div>
    </div>
  </div>
</template>


<script>

export default {
  // name: 'rangeInput',
  data() {
    return {
      value: 0,
      value2: 0,
    };
  },
  props: {
    mutiple: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    minValue() {
      return Math.min(this.value, this.value2);
    },
    maxValue() {
      return Math.max(this.value, this.value2);
    },
    ranges() {
      return (this.max - this.min) / 100;
    },
    startPosition() {
      let p = 0;
      if (this.mutiple) {
        p = this.minValue / this.ranges;
      } else {
        p = 0;
      }
      return p;
    },
    width() {
      let w = 0;
      if (this.mutiple) {
        w = Math.abs(this.value - this.value2) / this.ranges;
      } else {
        w = this.value / this.ranges;
      }
      return w;
    },
  },
  methods: {
    valued() {
      let value = this.value;
      if (this.mutiple) {
        value = [this.minValue, this.maxValue];
        this.$emit('input', value);
      } else {
        this.$emit('input', value);
      }
    },
  },
};

</script>

<style  lang="scss" scoped>
  .rangeInput{
    position: relative;
    margin: 5px auto;
    min-height: 33px;
  }
  .mutipleInput{
    position: absolute;
    border: none;
  }
  input[type=range].mutipleInput::-webkit-slider-runnable-track {
    background: none;
    // z-index: -1;
  }
  .rangeInputwrap{
    position: relative;
  }
  .rangeInputBar{
    position: absolute;
    background: #c2c0c2;
    height: 4px;
    width: 100%;
    top: 16px;
  }
  .range{
    position: absolute;
    background: #198;
    height: 4px;
    top: 16px;
  }
</style>
