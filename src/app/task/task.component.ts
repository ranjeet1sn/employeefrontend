import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';
import { TaskService } from '../shared/services/task.service';
import { AddTaskComponent } from '../shared/add-task/add-task.component';
import { TaskDetailComponent } from '../shared/task/task.component';
import {
  startOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StatusBoxComponent } from '../shared/status-box/status-box.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: ElementRef;
  view: CalendarView = CalendarView.Month;
  @ViewChild(MatSort) sort: MatSort;
  CalendarView = CalendarView;
  postSizeOptions = [2, 5, 10, 15];
  viewDate: Date = new Date();
  totalPost: number ;
  postPerPage: number = 2;
  currentPage: number = 1;
  showCalendar = false;
  events: CalendarEvent[] = [];
  subscription: Subscription[] = [];
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();
  isAdmin: boolean = false;
  config:{};
  tasks = [];
  deleteArray = [];
  assignee: string;
  userColor: string;
  assignTo: FormControl;
  displayedColumns: string[] = ['select', 'name', 'description', 'assginedto', 'priority', 'date', 'status'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private taskService: TaskService,
    private _bottomSheet: MatBottomSheet,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      if (Object.keys(res).length > 0) {
        this.assignee = res['assignee'];
        this.userColor = res['color'];
        this.assignTo = new FormControl(this.assignee)
        this.getTask(this.postPerPage, this.currentPage, this.assignee);
      }
      else {
        this.getTask(this.postPerPage, this.currentPage);
      }
    });
    this.showSpinner();
    this.isAdmin = this.authService.isAdmin;
    this.subscription.push(this.authService.checkAdmin.subscribe(res => {
      if (res) {
        this.isAdmin = res;
      }
      else {
        this.isAdmin = res;
      }
    }));

  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getAssignee(obj1, obj2) {
    return obj1 === obj2;
  }

  getTask(postPerPage, currentPage, assignee?) {
    this.events = [];
    this.deleteArray = [];
    this.showSpinner();
    this.subscription.push(this.taskService.getAllTask(postPerPage, currentPage, assignee).subscribe((res: any) => {
      this.totalPost = res.totalPost;
      this.config = {
        id: 'basicPaginate',
        itemsPerPage: postPerPage,
        currentPage: currentPage,
        totalItems: this.totalPost
      };
      
      
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      res.data.forEach(element => {
        const obj = {
          start: startOfDay(new Date(element.date)),
          title: element.name,
          color: element.assignee.color,
          meta: {
            id: element._id,
            email: element.assignee.email
          }
        }
        this.events.push(obj);
      });
    }))
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.taskService.addTask(res).subscribe(res => {
          this.getTask(this.postPerPage, this.currentPage);
        })
      }
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }




  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onShowCalender(e) {
    this.showCalendar = e.checked
  }



  removeFilter(event) {
    this.assignee = null;
    this.getTask(this.postPerPage, this.currentPage, this.assignee);
    this.router.navigate([], { queryParams: {} })
  }
  openBottomSheet(): void {
    this._bottomSheet.open(TaskDetailComponent);
  }

  onPageChange(event) {
    console.log(event);
    
    this.currentPage = event.pageIndex + 1;
    this.postPerPage = event.pageSize;
    this.getTask(this.postPerPage, this.currentPage);
  }

  deleteEmployee(id: string) {
    const text = 'Are You Sure You Want To Delete This Task?';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.taskService.deleteTask(id).subscribe(res => {
          this.getTask(this.postPerPage, this.currentPage);
        })
      }

    })
  }
  public downloadPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 25, 25, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('task.pdf');
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  addStatus() {
    this.dialog.open(StatusBoxComponent)
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  getPage(event){
   console.log(event);
   
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any) {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onChange(event) {
    this.deleteArray.push(event._id);
    const text = `Are You Sure You Want To Delete This ${this.deleteArray.length} Task?`;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.subscription.push(this.taskService.deleteTask(this.deleteArray).subscribe(res => {
          this.toastr.success(`${this.deleteArray.length} Task Deleted Successfully`);
          this.getTask(this.postPerPage, this.currentPage);

        }));
      }

    });
  }
}
