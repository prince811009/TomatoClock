<Bar />

<script>
import { mapState } from 'vuex';
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  components: {
    Bar
  },
  data: () => ({
    chartdata: {
      datasets: [
        {
          label: 'Tomatoes',
          backgroundColor: ['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#FF4384'],
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            barThickness: 24,
            gridLines: {
              offsetGridLines: false
            },
          }
        ],
        yAxes: [
          {
            gridLines: {
              offsetGridLines: false
            },
          }
        ]
      }
    }
  }),
  computed: {
    ...mapState(['todosAll']),
  },
  mounted () {
    // get date info
    let m = new Date().getMonth() + 1;
    let d = new Date().getDate();
    // generate date
    let counter = 7;
    let labelArr = [];
    let _d = d;
    let _c = counter;
    while (_c > 0) {
      labelArr.push(`${m}/${_d}`);
      _d -= 1;
      _c -= 1;
    }
    this.chartdata.labels = labelArr;
    // generate count
    const obj = {};
    this.todosAll.forEach(todo => {
      if (todo.done) {
        if (obj[todo.finishDate]) obj[todo.finishDate] += 1;
        else obj[todo.finishDate] = 1;  
      }
    });
    const displayLabel = labelArr.reverse();
    this.chartdata.datasets[0].data = displayLabel.map(item => {
      return obj[item] ? obj[item] : 0;
    })
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style lang="scss" scoped>

</style>


