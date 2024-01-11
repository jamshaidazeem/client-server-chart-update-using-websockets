import { Component, AfterViewInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { ChartService } from './services/chart.service';
import { WebSocketService } from './services/web-socket.service';
import { catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'client';
  intervals = [
    { label: '1s', value: 1 },
    { label: '5s', value: 5 },
    { label: '10s', value: 10 },
    { label: '30s', value: 30 },
    { label: '1m', value: 60 },
  ];

  public selectedInterval = this.intervals[0].value;
  public chart!: Chart;

  constructor(
    private chartService: ChartService,
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.webSocket$
      .pipe(
        catchError((err) => {
          // reset interval on error
          this.selectedInterval = 1;
          return throwError(() => new Error(err));
        }),
        retry({ delay: 5_000 }),
        takeUntilDestroyed()
      )
      .subscribe((value: string) => {
        this.chartService.addItem(
          this.chart,
          this.selectedInterval,
          parseInt(value)
        );
      });
  }

  ngAfterViewInit(): void {
    this.chart = this.chartService.createChart();
  }

  onUpdateInterval = (intervalValue: number) => {
    this.selectedInterval = intervalValue;
    this.webSocketService.sendIntervalToWebSocketServer(this.selectedInterval);
  };
}
