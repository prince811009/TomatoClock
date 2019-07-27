<template>
  <div class="analyticsViewWrapper">
    <section class="focusBlock">
      <div class="blockHeader">
        <h2 class="blockTitle">FOCUS TIME</h2>
      </div>
      <div class="blockBody">
        <div class="todayCount"></div>
        <div class="weekCount"></div>
      </div>
    </section>
    <section class="chartBlock">
      <div class="blockHeader">
        <h2 class="blockTitle">CHART</h2>
      </div>
      <div class="blockBody">
        <tomato-chart />
      </div>
    </section>
  </div>
</template>

<script>
import TomatoChart from '../components/ClockChart.vue';

export default {
  components: { TomatoChart },
  data: () => ({
  }),
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.analyticsViewWrapper {
  width: 100%;
  height: 100%;
  background-color: #003164;
  padding: 48px 10%;
  display: flex;
  // align-items: center;
  flex-direction: column;
  justify-content: space-between;
  .focusBlock {
    flex: 0 0 160px;
    padding: 0 20px;
    max-width: 445px;
  }
  .chartBlock {
    flex: 0 0 160px;
    padding: 0 20px;
    max-width: 445px;
    .blockBody {
      // height: 100px;
    }
  }
  .blockHeader {
    flex: 0 0 40px;
    display: flex;
    padding: 10px;
    color: #FF4384;
    background-color: #225385;
    margin-bottom: 20px;
    text-indent: 5px;
    .blockTitle {
      flex: 1;
    }
  }
}
</style>


