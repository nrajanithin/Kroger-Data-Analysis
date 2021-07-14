var line = {
    legend:{
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
    xaxis:{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
        title: {
          text: 'Month'
        }
      },
    stroke:{
        curve: 'smooth',
        width:2
      },
    title:{
        text: 'Sales v/s Month',
        align: 'left'
      },
    markers:{
        size: 1,
        strokeColors: ['#9c0f08', '#91db1a','#faa200', '#f714ba'],
        strokeWidth: 6
      },
    grid:{
        borderColor: '#e7e7e7',
        row: {
          colors: ['#FFFFFF', '#FFFFFF','#FFFFFF', '#FFFFFF'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
    colors:['#9c0f08', '#91db1a','#faa200', '#f714ba'],
    Chart:{
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      }
}
var dchart = {
    type: 'donut',
    width: 380
};
var dtitle = {
    text: 'SPEND v/s INCOME RANGE',
    align: 'left'
};
var dresponse = [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
var barOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  }
var pharma = {
    Chart:{
        width: 380,
        type: 'pie'
    },
    title:{
        text: 'PHARMA v/s REGION',
        align: 'left'
      },
    responsive:[{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    
  }
exports.line = line;
exports.pharma = pharma;
exports.barOptions = barOptions;
exports.dchart = dchart;
exports.dtitle = dtitle;
exports.dresponse = dresponse;