import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Task Assign To User';
  subscription: Subscription[] = [];
  type = 'PieChart';
  data = [];
  options = {
    height: 200,
    pieSliceText: 'none',
    color: ''
  };
  width = 400;
  height = 400;
  chartData = [];
  filterArray = [];
  constructor(
    private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.setChartData();
    this.cdr.detectChanges();
  }


  setChartData() {
    this.subscription.push(this.taskService.getChart().subscribe((res: any) => {
      res.data.forEach(element => {
        Object.values(element).forEach(ele => {
          this.chartData.push(ele);
        })
      });
      const result = [...this.chartData.reduce((mp, o) => {
        if (!mp.has(o._id)) mp.set(o._id, { ...o, count: 0 });
        mp.get(o._id).count++;
        return mp;
      }, new Map).values()];
      this.filterArray = result
      result.forEach(element => {
        this.data.push([element.email, element.count]);
      });
    }));

  }
  onSelect(event) {
    const index = event.selection[0].row;
    const user = this.filterArray[index];
    this.router.navigate(['/task'], { queryParams: { assignee: user.email, color: user.color } });
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
