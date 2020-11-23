import { Component, OnInit } from '@angular/core';
import {GoogleCharts} from 'google-charts';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html'
})
export class PlayComponent implements OnInit {
  activeUrl:string = "How to play";
  pageTitle:string = "How to play";
  backgroundImage:string = 'assets/images/01.jpg';
  constructor() { }

  ngOnInit(): void {
    GoogleCharts.load(this.drawChart);
  }

 drawChart() {

    // Standard google charts functionality is available as GoogleCharts.api after load
    const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Chart thing', 'Chart amount'],
        ['Prize Pool', 85],
        ['Token holder\'s rewards', 10],
        ['Operating, marketing, development', 5]
    ]);
    const options = {'width':635, 'height':400, 'pieHole':0.4, 'backgroundColor':'#303265', 'legend':{position: 'right', alignment:'center', textStyle: {color: 'white', fontSize: 14}}, 'chartArea':{left:0,top:50,width:'100%',height:'75%'}};
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'));
    pie_1_chart.draw(data, options);
}

}
