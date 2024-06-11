import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastService } from './toast-service';

import { circle, latLng, tileLayer } from 'leaflet';

import { BestSelling, Recentelling, TopSelling, nftfeaturedData, nftpopularData, nftrecentData, nfttopCollectionData, statData } from 'src/app/core/data';
import { ChartType } from './dashboard.model';
import { featuredModel, popularModel, recentModel, topCollectionModel } from './nft.model';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Ecommerce Component
 */
export class DashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  analyticsChart!: ChartType;
  BestSelling: any;
  TopSelling: any;
  RecentSelling: any;
  SalesCategoryChart!: ChartType;
  statData!: any;
  currentDate: any;
  // Current Date
  // currentDate: Date = new Date();

  basicBarChart: any;
  basicColumnChart: any;
  basicHeatmapChart: any;
  simpleDonutChart: any;
  TopPages: any;
  isRTL: any = true;

  
    featuredData!: featuredModel[];
    recentData!: recentModel[];
    topCollectionData!: topCollectionModel[];
    popularData!: popularModel[];

    MarketplaceChart: any;
    popularityChart: any;
    minichart1: any;
    minichart2: any;
    minichart3: any;
    minichart4: any;
    minichart5: any;
    minichart6: any;
    minichart7: any;
    minichart8: any;

    // set the current year
    year: number = new Date().getFullYear();
    private _trialEndsAt: any;
    private _diff?: any;
    _days?: number;
    _hours?: number;
    _minutes?: number;
    _seconds?: number;


  constructor(public toastService: ToastService) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.currentDate = { from: firstDay, to: lastDay }
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Dashboard', active: true }
    ];

    if (sessionStorage.getItem('toast')) {
      this.toastService.show('Logged in Successfull.', { classname: 'bg-success text-center text-white', delay: 5000 });
      sessionStorage.removeItem('toast');
    }

    /**
    * Fetches the data
    */
    this.fetchData();

    // Chart Color Data Get Function
    this._analyticsChart('["--vz-light", "--vz-primary", "--vz-secondary"]');

    
        // Chart Color Data Get Function
        this._basicBarChart('["--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-secondary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary", "--vz-primary"]');
        this._basicColumnChart('["--vz-primary", "--vz-light"]');
        this._basicHeatmapChart('["--vz-secondary", "--vz-primary"]');
        this._simpleDonutChart('["--vz-primary", "--vz-warning", "--vz-info"]');

        

        this._marketplaceChart('["--vz-primary","--vz-secondary", " --vz-light"]');
        this._popularityChart('["--vz-success", "--vz-secondary"]');
        this._minichart1Chart('["--vz-danger"]');
        this._minichartsuccessChart('["--vz-success"]');

        // Date Set
        this._trialEndsAt = "2023-12-31";

        /**
         * Count date set
         */
        interval(1000).pipe(map((x) => {
            this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
        })).subscribe((x) => {
            this._days = this.getDays(this._diff);
            this._hours = this.getHours(this._diff);
            this._minutes = this.getMinutes(this._diff);
            this._seconds = this.getSeconds(this._diff);
        });
  }

  
        num: number = 0;
        option = {
        startVal: this.num,
        useEasing: true,
        duration: 2,
        decimalPlaces: 2,
        };
    
    /**
     * Day Set
     */
    getDays(t: number) {
        return Math.floor(t / (1000 * 60 * 60 * 24));
    }

    /**
     * Hours Set
     */
    getHours(t: number) {
        return Math.floor((t / (1000 * 60 * 60)) % 24);
    }

    /**
     * Minutes set
     */
    getMinutes(t: number) {
        return Math.floor((t / 1000 / 60) % 60);
    }

    /**
     * Secound set
     */
    getSeconds(t: number) {
        return Math.floor((t / 1000) % 60);
    }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
 * Sales Analytics Chart
 */
  setrevenuevalue(value: any) {
    if (value == 'all') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }]
    }
    if (value == '1M') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [24, 75, 16, 98, 19, 41, 52, 34, 28, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [99.25, 28.58, 98.74, 12.87, 107.54, 94.03, 11.24, 48.57, 22.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [28, 22, 17, 27, 21, 11, 5, 9, 17, 29, 12, 15]
      }]
    }
    if (value == '6M') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 75, 66, 78, 29, 41, 32, 44, 58, 52, 43, 77]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [109.25, 48.58, 38.74, 57.87, 77.54, 84.03, 31.24, 18.57, 92.57, 42.36, 48.51, 56.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [12, 22, 17, 27, 1, 51, 5, 9, 7, 29, 12, 35]
      }]
    }
    if (value == '1Y') {
      this.analyticsChart.series = [{
        name: 'Orders',
        type: 'area',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Earnings',
        type: 'bar',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Refunds',
        type: 'line',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }]
    }
  }

  private _analyticsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.analyticsChart = {
      chart: {
        height: 370,
        type: "line",
        toolbar: {
          show: false,
        },
        style: {
          direction: 'rtl'
        }
      },
      stroke: {
        curve: "straight",
        dashArray: [0, 0, 8],
        width: [2, 0, 2.2],
      },
      colors: colors,
      series: [{
        name: "Orders",
        type: "area",
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: "Earnings",
        type: "bar",
        data: [
          89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57,
        ],
      },
      {
        name: "Refunds",
        type: "line",
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],

      }],
      fill: {
        opacity: [0.1, 0.9, 1],
      },
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
      markers: {
        size: [0, 0, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: -2,
          bottom: 15,
          left: 10,
        },
      },
      legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
          width: 9,
          height: 9,
          radius: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          barHeight: "70%",
        },
      },
    };
  }

 

  /**
  * Fetches the data
  */
  private fetchData() {
    this.BestSelling = BestSelling;
    this.TopSelling = TopSelling;
    this.RecentSelling = Recentelling;
    this.statData = statData;
    
    this.featuredData = nftfeaturedData;
    this.recentData = nftrecentData;
    this.topCollectionData = nfttopCollectionData;
    this.popularData = nftpopularData;
  }

  /**
  * Sale Location Map
  */
  options = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: 0,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  layers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];

  
  // num: number = 0;
  // option = {
  //   startVal: this.num,
  //   useEasing: true,
  //   duration: 2,
  //   decimalPlaces: 2,
  // };

  /**
  * Swiper Vertical  
   */
  Vertical = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    vertical: true // Enable vertical sliding
  };

  /**
   * Recent Activity
   */
  toggleActivity() {
    const recentActivity = document.querySelector('.layout-rightside-col');
    if (recentActivity != null) {
      recentActivity.classList.toggle('d-none');
    }

    if (document.documentElement.clientWidth < 1700) {
      const recentActivity = document.querySelector('.layout-rightside-col');
      if (recentActivity != null) {
        recentActivity.classList.add('d-block');
        recentActivity.classList.remove('d-none');
      }
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    const recentActivity = document.querySelector('.layout-rightside-col');
    if (recentActivity != null) {
      recentActivity.classList.remove('d-block');
    }
  }


  
    /**
   * Basic Bar Chart
   */
    private _basicBarChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.basicBarChart = {
          series: [{
              data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
              name: 'Sessions',
          }],
          chart: {
              type: 'bar',
              height: 400,
              direction: 'rtl',
              toolbar: {
                  show: false,
              }
          },
          plotOptions: {
              bar: {
                  borderRadius: 4,
                  horizontal: true,
                  distributed: true,
                  dataLabels: {
                      position: 'top',
                  },
              }
          },
          dataLabels: {
              enabled: true,
              offsetX: 32,
              style: {
                  fontSize: '12px',
                  fontWeight: 400,
                  colors: ['#adb5bd']
              }
          },
          colors: colors,
          legend: {
              show: false,
          },
          grid: {
              show: false,
          },
          xaxis: {
              categories: ['India', 'United States', 'China', 'Indonesia', 'Russia', 'Bangladesh', 'Canada', 'Brazil', 'Vietnam', 'UK'],
          },
      };
  }


  /**
  * Basic Column Chart data
  */
  setcolumnchartvalue(x: any) {
      if (x == 'all') {
          this.basicColumnChart.series = [{
              name: 'Last Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }, {
              name: 'Current Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }]
      }
      if (x == '1M') {
          this.basicColumnChart.series = [{
              name: 'Last Year',
              data: [25.3, 12.5, 20.2, 18.5, 40.4, 25.4, 15.8, 22.3, 19.2, 25.3, 12.5, 20.2]
          }, {
              name: 'Current Year',
              data: [25.3, 12.5, 20.2, 18.5, 40.4, 25.4, 15.8, 22.3, 19.2, 25.3, 12.5, 20.2]
          }]
      }
      if (x == '6M') {
          this.basicColumnChart.series = [{
              name: 'Last Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }, {
              name: 'Current Year',
              data: [25.3, 12.5, 20.2, 18.5, 40.4, 25.4, 15.8, 22.3, 19.2, 25.3, 12.5, 20.2]
          }]
      }
      if (x == '1Y') {
          this.basicColumnChart.series = [{
              name: 'Last Year',
              data: [25.3, 12.5, 20.2, 18.5, 40.4, 25.4, 15.8, 22.3, 19.2, 25.3, 12.5, 20.2]
          }, {
              name: 'Current Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }]
      }
  }

  /**
 * Basic Column Charts
 */
  private _basicColumnChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.basicColumnChart = {
          series: [{
              name: 'Last Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }, {
              name: 'Current Year',
              data: [36.2, 22.4, 38.2, 30.5, 26.4, 30.4, 20.2, 29.6, 10.9, 36.2, 22.4, 38.2]
          }],
          chart: {
              type: 'bar',
              height: 306,
              stacked: true,
              toolbar: {
                  show: false,
              }
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '20%',
                  borderRadius: 6,
              },
          },
          dataLabels: {
              enabled: false,
          },
          legend: {
              show: true,
              position: 'bottom',
              horizontalAlign: 'center',
              fontWeight: 400,
              fontSize: '8px',
              offsetX: 0,
              offsetY: 0,
              markers: {
                  width: 9,
                  height: 9,
                  radius: 4,
              },
          },
          stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
          },
          grid: {
              show: false,
          },
          colors: colors,
          xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              axisTicks: {
                  show: false,
              },
          },
          //   yaxis: {
          //   opposite:this.isRTL
          //   },
          fill: {
              opacity: 1

          },
          tooltip: {
              y: {
                  formatter: function (val: any) {
                      return "$ " + val + " thousands"
                  }
              }
          }
      };
  }

  /**
* Basic Heatmap Chart
*/
  private _basicHeatmapChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.basicHeatmapChart = {
          series: [{
              name: 'Sat',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          },
          {
              name: 'Fri',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          },
          {
              name: 'Thu',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          },
          {
              name: 'Wed',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          },
          {
              name: 'Tue',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          },
          {
              name: 'Mon',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          },
          {
              name: 'Sun',
              data: this.generateData(18, {
                  min: 0,
                  max: 90
              })
          }
          ],
          chart: {
              height: 400,
              type: 'heatmap',
              offsetX: 0,
              offsetY: -8,
              toolbar: {
                  show: false
              }
          },
          dataLabels: {
              enabled: false
          },
          legend: {
              show: true,
              horizontalAlign: 'center',
              offsetX: 0,
              offsetY: 20,
              markers: {
                  width: 20,
                  height: 6,
                  radius: 2,
              },
              itemMargin: {
                  horizontal: 12,
                  vertical: 0
              },
          },
          colors: colors,
          plotOptions: {
              heatmap: {
                  colorScale: {
                      ranges: [{
                          from: 0,
                          to: 50,
                          name: '0-50',
                          color: colors[0]
                      },
                      {
                          from: 51,
                          to: 100,
                          name: '51-00',
                          color: colors[1]
                      },
                      ]
                  }
              }
          },
          tooltip: {
              y: [{
                  formatter: function (y: any) {
                      if (typeof y !== "undefined") {
                          return y.toFixed(0) + "k";
                      }
                      return y;
                  }
              }]
          },
      };
  }

  /**
* Simple Donut Chart
*/
  private _simpleDonutChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.simpleDonutChart = {
          series: [78.56, 105.02, 42.89],
          labels: ["Desktop", "Mobile", "Tablet"],
          chart: {
              type: "donut",
              height: 219,
          },
          plotOptions: {
              pie: {
                  donut: {
                      size: "76%",
                  },
              },
          },
          dataLabels: {
              enabled: false,
          },
          legend: {
              show: false,
              position: 'bottom',
              horizontalAlign: 'center',
              offsetX: 0,
              offsetY: 0,
              markers: {
                  width: 20,
                  height: 6,
                  radius: 2,
              },
              itemMargin: {
                  horizontal: 12,
                  vertical: 0
              },
          },
          stroke: {
              width: 0
          },
          yaxis: {
              labels: {
                  formatter: function (value: any) {
                      return value + "k" + " Users";
                  }
              },
              tickAmount: 4,
              min: 0
          },
          colors: colors
      };
  }
    /**
   * Series Data
   */
    private generateData(count: number, yrange: { max: number; min: number; }) {
      var i = 0;
      var series = [];
      while (i < count) {
          var x = "w" + (i + 1).toString();
          var y =
              Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

          series.push({
              x: x,
              y: y
          });
          i++;
      }
      return series;
  }

    /**
    * Basic Bar Chart data
    */
    selectvalue(x: any) {
        if (x == 'all') {
            this.basicBarChart.series = [{
                data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
                name: 'Sessions',
            }]
        }
        if (x == '1M') {
            this.basicBarChart.series = [{
                data: [200, 640, 490, 255, 50, 689, 800, 420, 85, 589],
                name: 'Sessions',
            }]
        }
        if (x == '6M') {
            this.basicBarChart.series = [{
                data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
                name: 'Sessions',
            }]
        }
    }

    
    /**
    * Market Place Chart
    */
    setmarketplacevalue(value: any) {
      if (value == 'all') {
          this.MarketplaceChart.series = [{
              name: "Artwork",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          },
          {
              name: "Auction",
              data: [40, 120, 83, 45, 31, 74, 35, 34, 78]
          },
          {
              name: "Creators",
              data: [95, 35, 20, 130, 64, 22, 43, 45, 31]
          }]
      }
      if (value == '1M') {
          this.MarketplaceChart.series = [{
              name: "Artwork",
              data: [20, 31, 25, 41, 59, 72, 69, 91, 148]
          },
          {
              name: "Auction",
              data: [50, 60, 103, 35, 41, 104, 35, 34, 58]
          },
          {
              name: "Creators",
              data: [95, 35, 20, 130, 64, 22, 43, 45, 31]
          }]
      }
      if (value == '6M') {
          this.MarketplaceChart.series = [{
              name: "Artwork",
              data: [50, 21, 15, 61, 59, 62, 69, 91, 148]
          },
          {
              name: "Auction",
              data: [50, 12, 83, 45, 91, 54, 35, 34, 88]
          },
          {
              name: "Creators",
              data: [85, 45, 70, 130, 94, 12, 23, 45, 31]
          }]
      }
      if (value == '1Y') {
          this.MarketplaceChart.series = [{
              name: "Artwork",
              data: [70, 21, 35, 21, 49, 62, 69, 31, 148]
          },
          {
              name: "Auction",
              data: [90, 120, 23, 45, 71, 74, 35, 24, 88]
          },
          {
              name: "Creators",
              data: [95, 35, 20, 130, 64, 22, 43, 45, 31]
          }]
      }
  }

  private _marketplaceChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.MarketplaceChart = {
          series: [{
              name: "Artwork",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          },
          {
              name: "Auction",
              data: [40, 120, 83, 45, 31, 74, 35, 34, 78]
          },
          {
              name: "Creators",
              data: [95, 35, 20, 130, 64, 22, 43, 45, 31]
          }],
          chart: {
              height: 350,
              type: 'line',
              zoom: {
                  enabled: false
              },
              toolbar: {
                  show: false
              }
          },
          dataLabels: {
              enabled: false
          },
          stroke: {
              curve: 'smooth',
              width: 3
          },
          colors: colors,
          xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
      };
  }

  /**
  * Market Place Chart
  */
  private _popularityChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.popularityChart = {
          series: [{
              name: 'Like',
              data: [12.45, 16.2, 8.9, 11.42, 12.6, 18.1, 18.2, 14.16]
          }, {
              name: 'Share',
              data: [-11.45, -15.42, -7.9, -12.42, -12.6, -18.1, -18.2, -14.16]
          }],
          chart: {
              type: 'bar',
              height: 260,
              stacked: true,
              toolbar: {
                  show: false
              },
          },
          plotOptions: {
              bar: {
                  columnWidth: '20%',
                  borderRadius: [4, 4]
              },
          },
          colors: colors,
          fill: {
              opacity: 1
          },
          dataLabels: {
              enabled: false,
              textAnchor: 'top',
          },
          yaxis: {
              labels: {
                  show: false,
                  formatter: function (y: any) {
                      return y.toFixed(0) + "%";
                  }
              }
          },
          legend: {
              position: 'top',
              horizontalAlign: 'right',
          },
          xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              labels: {
                  rotate: -90
              }
          }
      };
  }

  /**
  * Danger Mini Chart
  */
  private _minichart1Chart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.minichart1 = {
          series: [{
              data: [25, 66, 41, 89, 63, 25, 44, 12]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };

      // mini chart 2
      this.minichart2 = {
          series: [{
              data: [50, 15, 35, 62, 23, 56, 44, 12]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };

      // mini chart 3
      this.minichart3 = {
          series: [{
              data: [25, 35, 35, 89, 63, 25, 44, 12]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };

      // mini chart 6
      this.minichart6 = {
          series: [{
              data: [50, 15, 35, 62, 23, 56, 44, 12]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };

      // mini chart 8
      this.minichart8 = {
          series: [{
              data: [45, 53, 24, 89, 63, 60, 36, 50]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };
  }

  /**
  * Success Mini Chart
  */
  private _minichartsuccessChart(colors: any) {
      colors = this.getChartColorsArray(colors);
      this.minichart4 = {
          series: [{
              data: [50, 15, 20, 34, 23, 56, 65, 41]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };

      // mini chart 5 
      this.minichart5 = {
          series: [{
              data: [45, 53, 24, 89, 63, 60, 36, 50]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };

      // mini chart 7
      this.minichart7 = {
          series: [{
              data: [50, 15, 20, 34, 23, 56, 65, 41]
          }],
          chart: {
              type: 'line',
              width: 80,
              height: 30,
              sparkline: {
                  enabled: true
              }

          },
          colors: colors,
          stroke: {
              curve: 'smooth',
              width: 2.3,
          },
          tooltip: {
              fixed: {
                  enabled: false
              },
              x: {
                  show: false
              },
              y: {
                  title: {
                      formatter: function (seriesName: any) {
                          return ''
                      }
                  }
              },
              marker: {
                  show: false
              }
          }
      };
  }

    /**
     * Swiper Responsive setting
     */
    public Responsive = {
      infinite: true,
      slidesToShow: 3,
      autoplay: true,
      dots: false,
      arrows: false
  };

  /**
   * Top CollectionSwiper Responsive setting
   */
  public collection = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false
  };
  
}
