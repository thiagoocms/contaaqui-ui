import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';
import {CategoryModel} from './category.model';
import {AuthDataService} from '../auth/auth-data.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class CategoryService extends BaseService<CategoryModel, number> {
  constructor(http: HttpClient, authDataService: AuthDataService) {
    super(http, 'v1/categories', authDataService);
  }
}
