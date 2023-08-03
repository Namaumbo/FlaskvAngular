import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {


  public todoTitle = "";
  public todoDescription = "";
  public condition = true;
  public successfulDelete = false;
  public successfulUpdate = false



  totalpages: any = 0
  userData: any = [];


  incompleteItems: any = [];
  totalIncompleteList: any = 0
  totalIncompleteItems: any = 0
  incompletePage: any = 1


  completeItems: any = [];
  totalCompletedList: any = 0
  totalCompleteItems: any = 0
  completedPage: any = 1

  public done_count = 0
  public todo_count = 0
  public undoList = []
  public doneList = []
  public dataSource: any
  public totalItems: number = 0
  limit = 50
  page = 1
  buttonArray: any

  public searchValue: string = ''
  public searchResults: any = []
  public searchPage = 1
  public searchLimit = 20
  public totalNumberOfPages = 0
  public totalSearchedItems = 0
  public totalCompleteSearchedItems = 0
  public totalIncompleteSearchItems = 0
  public searchActiveCondition = false
  public pages: any = []
  public noItemErr : string = ''

  constructor(public HttpClient: HttpService, public router: Router ) { }
  setUserData(data: any) {
    this.userData = data
  }

  statistics() {
    this.undoList = this.userData.filter((item: any) => {
      return item['completed'] == false
    })
    this.doneList = this.userData.filter((item: any) => {
      return item['completed'] == true
    })
  }
  checkUndone() {
    this.doneList = this.userData.filter((item: any) => {
      return item['completed'] == true
    })
  }
  addTodoToUser(title: string, description: string) {

    let body = {
      "title": title,
      "description": description
    }
    return this.HttpClient.post('add-todo', body).subscribe({
      next: ((res: any) => {
        if (res.items.length > 0) this.getTodoList()
      }),
      error: (err => {
        console.log(err)
      })
    })
  }

  getTodoList() {
    this.HttpClient.get('get-todo', this.limit, this.page).subscribe((resp: any) => {
      if (resp.items.length == 0) {
        this.setUserData(resp.todos)
        this.checkUndone()
        this.statistics()
      }

      this.setUserData(resp.items)
      this.page = resp.pagination.page
      setTimeout(() => {
        this.totalpages = this.pagination(this.page, resp.pagination.totalPages)
      }, 500)
      this.totalItems = resp.totalItems
      this.checkUndone()
      this.statistics()
    })
  }



  getIncompleteList() {
    this.HttpClient.get('get-incomplete', this.limit, this.incompletePage).subscribe((res: any) => {
      if (res.items.length > 0) {
        this.incompleteItems = res.items
        this.totalIncompleteItems = res.totalNumber
        setTimeout(() => {
          this.totalIncompleteList = this.pagination(this.incompletePage, res.pagination.totalPages)
        }, 500)
      }
    })

  }

  handleNextIncompletePage(): any {
    this.incompletePage = this.incompletePage + 1
    this.getIncompleteList()

  }

  handlePreviousIncompletePage(): any {
    this.incompletePage = this.incompletePage - 1
    this.getIncompleteList()

  }
  currentIncompletePage(page: number) {
    window.scrollTo(0, 300);
    this.incompletePage = page
    this.getIncompleteList()
  }

  handleNextCompletePage(): any {
    this.completedPage = this.completedPage + 1
    this.getCompleteList()

  }

  handlePreviousCompletePage(): any {
    this.completedPage = this.completedPage - 1
    this.getCompleteList()

  }

  currentCompletePage(page: number) {
    window.scrollTo(0, 100);
    this.completedPage = page
    this.getCompleteList()
  }

  getCompleteList() {
    this.HttpClient.get('get-done', this.limit, this.completedPage).subscribe((res: any) => {
      if (res.items.length > 0) {
        this.completeItems = res.items
        setTimeout(() => {
          this.totalCompletedList = this.pagination(this.completedPage, res.pagination.totalPages)
        }, 500)
      }
      this.totalCompleteItems = res.totalNumber

    })
  }

  handleNext = async () => {
    this.page = this.page + 1
    this.getTodoList()
  }

  handlePrevious(): any {
    this.page = this.page - 1
    this.getTodoList()
  }

  handleNextSearchPage = () => {
    this.searchPage = this.searchPage + 1
    this.handleSearch()
  }
  handlePreviousSearchPage = () => {
    this.searchPage = this.searchPage - 1
    this.handleSearch()
  }

  deleteTodo(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.successfulDelete = true
      this.HttpClient.delete(`delete-todo/${id}`).subscribe({
        next: ((res: any) => {
          if (res.items.length > 0) {
            // this.searchResults = res.item
            this.getTodoList()
            this.getCompleteList()
            this.getIncompleteList()
          }
          this.successfulDelete = false
          
          this.statistics()
          alert('successfully deleted')
          this.handleSearch()
        }),
        error: (err => {
          this.noItemErr = 'dsfs'
          console.log(err)
        })

      })

    }
  }


  completeToDo(id: string) {
    this.successfulUpdate = true
    this.HttpClient.update(`complete-todo/${id}`, '').subscribe({
      next: ((res: any) => {
        if (res.items.length > 0) {
          this.successfulUpdate = false
          // this.searchResults = res.items
          this.getTodoList()
          this.getCompleteList()
          this.getIncompleteList()
          this.handleSearch()

        }
      }), error: (err => {
        console.log(err)
      })
    })
  }

  undoTodo(id: string) {
    this.successfulUpdate = true
    this.HttpClient.update(`undo-todo/${id}`, '').subscribe({
      next: ((res: any) => {
        if (res.items.length > 0) {
          this.successfulUpdate = false
          // this.searchResults = res.items
          this.getTodoList()
          this.getCompleteList()
          this.getIncompleteList()
          this.handleSearch()
        
        }
      }),
      error: (err => {
        console.log(err)
      })
    })
  }

  handleModal(item: any) {

    const myTitle = document.getElementById('title')
    const myDescription = document.getElementById('description')
    myTitle!.innerHTML = item['title']
    myDescription!.innerHTML = item['description']

  }


 handleSearchInput(): boolean{
    let condn : boolean = false

    if(this.searchValue.length  == 0){
      alert('search input empty')
      condn = true
    } 
    else{
      this.router.navigate(['/search'])
    }
    return condn
  }

  handleSearch() {
 
      let body = {
        'title': this.searchValue.trim()
      }
      setTimeout(() => {
        this.pages = this.pagination(this.searchPage, this.totalNumberOfPages)
      }, 500)
  
      this.HttpClient.search('search-todo', body, this.searchLimit, this.searchPage).subscribe({
        next: ((res: any) => {
          
          this.searchResults = res.items
          if(res.items.length > 0){
            this.totalSearchedItems = res.numberOfItems
            this.totalNumberOfPages = res.pagination['totalPages']
  
          }
          else{
            this.noItemErr = 'No Item with that name'
  
          }
  
        }),
        error: ((err: any) => {
          this.noItemErr = err.error.massage
        })
      })  

  
}

  handleSearchAndOriginal(): boolean {
    if (this.searchValue.length) {
      return true
    }
    else {
      this.searchResults = []
      return false
    }
  }
  activatePage(page: number) {

    window.scrollTo(0, 300);
    this.searchPage = page
    this.handleSearch()
  }

  currentPage(page: number) {
    window.scrollTo(0, 300);
    this.page = page
    this.getTodoList()
  }

  pagination(c: any, m: any) {
    let current = c
    let last = m
    let delta = 2
    let left = current - delta
    let right = current + delta + 1
    let range = []
    let rangeWithDots = []
    let l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i < right) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }


}
