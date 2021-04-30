import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EmailComponent } from '../email/email.component';
import { EmployeeComponent } from '../employee/employee.component';
import { PostService } from '../shared/services/post.service';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: false }) content: ElementRef;
  employees = [];
  subscription: Subscription[] = [];
  postSizeOptions = [2, 5, 10, 15];
  totalPost: number = 10;
  postPerPage: number = 2;
  currentPage: number = 1;
  url: any;
  config = {};
  constructor(
    private dialog: MatDialog,
    private service: PostService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    this.route.queryParams.subscribe((res) => {
      if (Object.keys(res).length > 0) {
        this.currentPage = res['currentPage'];
        this.postPerPage = res['postPerPage'];
        this.getEmployee(this.postPerPage, this.currentPage);
      } else {
        this.getEmployee(this.postPerPage, this.currentPage);
      }
    });
  }

  getEmployee(postPerPage, currentPage) {
    this.subscription.push(
      this.service.getPost(currentPage, postPerPage).subscribe((res: any) => {
        this.employees = res.data;
        this.totalPost = res.totalPost;
        this.config = {
          id: 'basicPaginate',
          itemsPerPage: this.postPerPage,
          currentPage: this.currentPage,
          totalItems: this.totalPost,
        };
      })
    );
  }

  editEmployee(item) {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      data: {
        id: item._id,
        email: item.email,
        name: item.name,
        image: item.image,
        age: item.age,
        department: item.department,
        gender: item.gender,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmployee(this.postPerPage, this.currentPage);
      }
    });
  }

  removeEmployee(id) {
    const text = 'Are You Sure You Want To Delete Employee?';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.subscription.push(
          this.service.deleteUser(id).subscribe((res) => {
            this.getEmployee(this.postPerPage, this.currentPage);
          })
        );
      }
    });
  }

  onAddEmployee() {
    const dialogRef = this.dialog.open(EmployeeComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.getEmployee(this.postPerPage, this.currentPage);
    });
  }

  onPageChange(event) {
    this.currentPage = event;
    this.router.navigate([], {
      queryParams: {
        currentPage: this.currentPage,
        postPerPage: this.postPerPage,
      },
    });
    this.getEmployee(this.postPerPage, this.currentPage);
  }

  sendEmail(email) {
    const dialogRef = this.dialog.open(EmailComponent, {
      data: {
        email: email,
      },
    });
  }
  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  public downloadPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      },
    };

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers,
    });

    doc.save('test.pdf');
  }

  onSearch(value) {
    this.service
      .getPost(this.currentPage, this.postPerPage, value)
      .subscribe((res: any) => {
        this.employees = res.data;
        this.totalPost = res.totalPost;
      });
  }
}
