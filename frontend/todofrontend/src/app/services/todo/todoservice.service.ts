import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { MatTableDataSource } from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {


  public todoTitle = "";
  public todoDescription = "";
  public condition = true;
  totalpages : any = 0
  userData: any = [];
  public done_count = 0
  public todo_count = 0
  public undoList = []
  public doneList = []
  public dataSource: any
  public totalItems: number = 0
  limit = 50
  page = 1
  buttonArray : any


  public searchValue: string = ''
  public searchResults: any = []
  public searchPage = 1 
  public searchLimit = 20
  public totalNumberOfPages = 0
  public totalSearchedItems = 0
  public totalCompleteSearchedItems = 0
  public totalIncompleteSearchItems = 0
  public searchActiveCondition = false

  constructor(public HttpClient: HttpService) { }
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
        if (res.items.length > 0) this.getUserList()
      }),
      error: (err => {
        console.log(err)
      })
    })
  }

  getUserList() {
    this.HttpClient.get('get-todo', this.limit, this.page).subscribe((resp: any) => {
      if (resp.items.length == 0) {
        this.setUserData(resp.todos)
        this.checkUndone()
        this.statistics()
      }

      this.setUserData(resp.items.reverse())
      this.page = resp.pagination.page
      this.totalpages = resp.pagination.totalPages
      this.totalItems = resp.totalItems
      this.checkUndone()
      this.statistics()
    })
  }

  handleNext = async () => {
    this.page = this.page + 1
    this.getUserList()
  }

  handlePrevious(): any {
    this.page = this.page - 1
    this.getUserList()
  }

  handleNextSearchPage = () => {
    this.searchPage = this.searchPage + 1
    this.handleSearch()
  }
  handlePreviousSearchPage = () =>{
    this.searchPage = this.searchPage -1
    this.handleSearch()
  }

  public deleteTodo(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.HttpClient.delete(`delete-todo/${id}`).subscribe({
        next: ((res: any) => {
          if (res.items.length > 0) this.getUserList()
          this.statistics()

        }),
        error: (err => {
          console.log(err)
        })

      })
    }
  }

  completeToDo(id: string) {
    this.HttpClient.update(`complete-todo/${id}`, '').subscribe({
      next: ((res: any) => {
        if (res.items.length > 0) this.getUserList()
      }), error: (err => {
        console.log(err)
      })
    })
  }

  undoTodo(id: string) {

    this.HttpClient.update(`undo-todo/${id}`, '').subscribe({
      next: ((res: any) => {
        if (res.items.length > 0) this.getUserList()
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


  handleSearch() {
    let body = {
      'title': this.searchValue
    }

    this.HttpClient.search('search-todo', body , this.searchLimit, this.searchPage).subscribe({
      next: ((res: any) => {
        console.log(res.pagination['page'])
        this.searchResults = res.items
        this.totalSearchedItems = res.numberOfItems
        this.totalNumberOfPages = res.pagination['totalPages']
        this.buttonArray = Array.from({length :this.totalNumberOfPages}, (_, index) => index + 1);
      
      }),
      error: ((err: any) => {
        console.log(err)
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
  activatePage(page : number){
    this.searchPage = page
    this.handleSearch()


  }
}