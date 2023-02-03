import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryModule } from 'src/app/features/home/domain/models/category.module';
import { GetAllCategoryUseCase } from 'src/app/features/home/domain/usecases/get-all-category';

@Component({
  selector: 'app-list-of-category',
  templateUrl: './list-of-category.html',
  styleUrls: ['./list-of-category.scss'],
})
export class ListOfCateogryComponent implements OnInit {
  @Input() categories!: CategoryModule[];
  @Input() loading: boolean = false;
  @Output() onClick = new EventEmitter<CategoryModule>();

  constructor(private getAllCategory: GetAllCategoryUseCase) { }

  ngOnInit() {
    this.loading = true;
    this.getAllCategory.execute().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error(error),
      complete: () => this.loading = false
    });
  }

  chooseCategory(category: CategoryModule) {
    this.onClick.emit(category);
  }

}
